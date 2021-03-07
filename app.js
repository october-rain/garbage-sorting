App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        console.log(res)
        const data = {
          code: res.code
        }
        wx.request({
          url: this.gUrl + 'gar_login/',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: 'POST',
          data: data,
          success: res => {
            console.log(res)
            this.userData = res.data
            // 定义回调函数
            if (this.checkLoginReadyCallback) {
              this.checkLoginReadyCallback(res);
            }
          },
          fail: res => {
            console.log(res)
          }
        })
      }
    })
    // console.log(loginRes)


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        console.log(e)
        this.globalData.windowHeight = e.windowHeight
        this.globalData.windowWidth = e.windowWidth
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  // gUrl: 'http://192.168.1.102:8000/',
  gUrl: 'https://ruangong.tian999.top/'
})