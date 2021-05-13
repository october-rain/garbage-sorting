App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
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
        // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          let user = wx.getStorageSync('userInfo')
          this.globalData.userInfo = user
        }
      },
      fail : res => {
        console.log(res)
      }
    })

    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        // console.log(e)
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
  gUrl: 'http://192.168.1.108:8000/',
  // gUrl: 'https://ruangong.tian999.top/'
})