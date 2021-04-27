// pages/game/game.js
const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    isShow: false
  },
  methods: {
    onGoToGame(e){
      wx.vibrateShort()
      if(!app.globalData.userInfo) {
        this.setData({
          isShow: true 
        })
        return
      }
      const id = e.currentTarget.dataset.id
      switch(id){
        case '1':
          wx.navigateTo({
            url: '/pages/dropgame/dropgame',
          })
          break
        case '2':
          wx.navigateTo({
            url: '/pages/draggame/graggame',
          })
          break
        case '3':
          wx.navigateTo({
            url: '/pages/question/question',
          })
          break
      }
    },
    onConfirmTap(){
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
    
    }
  }
})