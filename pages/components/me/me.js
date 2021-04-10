// pages/me/me.js
//获取应用实例
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    score: {
      type: Number,
      default: 100
    }
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,

    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    // score: 10,
  },
  lifetimes: {
    attached(){
      // console.log("me")
      if (app.globalData.userInfo) {
        // console.log('xx', app.globalData.userInfo)
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
        // console.log(this.data.hasUserInfo)
      } else if (this.data.canIUse){
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          // console.log(this.data.hasUserInfo)
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        // console.log(this.data.hasUserInfo)
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }
    }
  },
  methods: {
    getUserInfo: function(e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
})
