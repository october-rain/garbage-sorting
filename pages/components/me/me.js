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
      // console.log(app.globalData)
      if (app.globalData.userInfo) {
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
      wx.getUserProfile({
        desc: '用于记录个人的笔记积分等信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorage({
            data: res.userInfo,
            key: 'userInfo',
          })
          if(!app.userData.User) {
            const registerData = {
              openid: app.userData.openid,
              name: res.userInfo.nickName,
              url: res.userInfo.avatarUrl
            }
            wx.request({
              url: app.gUrl + 'set_user/',
              data: registerData,
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: res => {
                console.log(res)
              }
            })
          }
        }
      })
    
    },
    goToRank: function(){
      wx.vibrateShort()
      wx.navigateTo({
        url: '/pages/rate/rate',
      })
    },
    tapFeedback(){
      wx.vibrateShort()
    },
    goToDeveloper(){
      wx.vibrateShort()
      wx.navigateTo({
        url: '/pages/developer/developer',
      })
    }
  }
})
