import {
  ajax,
  ajaxPOST,
  formatData
} from '../../utils/util'

const app = getApp()

Page({
  data: {
    PageCur: 'home',
    popupShow: false,
    cBtn: {
      width: 120,
      height: 120
    },
    vBtn: {
      width: 120,
      height: 120
    },
    userScore: 100,
    LargeSearchBox: false,
    hotShow: true ,
    isShow: false
  },
  async onLoad(options) {
    let res
    if (!wx.getStorageSync('all_garbage')) {
      res = await ajax('getAllgarbage/')
      res = formatData(res.data)
      // res = res.data
      // console.log(res)
      wx.setStorage({
        data: res,
        key: 'all_garbage',
      })
    } else {
      res = wx.getStorageSync('all_garbage')
    }
    this.setData({
      nameData: res
    })
    // console.log(this.data.nameData)
    let that = this;
    //判断onLaunch是否执行完毕
    if (app.userData) {
      that.setData({
        userScore: app.userData.score
      })
    } else {
      app.checkLoginReadyCallback = res => {
        //登陆成功后自己希望执行的，和上面一样
        // console.log(app.userData)
        that.setData({
          userScore: app.userData.score
        })
      };
    }

  },
  onShow() {
    let that = this;
    //判断onLaunch是否执行完毕
    if (app.userData) {
      that.setData({
        userScore: app.userData.score,
        popupShow: false
      })
    } else {
      app.checkLoginReadyCallback = res => {
        //登陆成功后自己希望执行的，和上面一样
        // console.log(app.userData)
        that.setData({
          userScore: app.userData.score,
          popupShow: false
        })
      }
    }
  },
  NavChange(e) {
    wx.vibrateShort()
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    // console.log(this.data.PageCur)
  },
  onShareAppMessage() {
    return {
      title: '垃圾分类小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
  changeDrawer(e) {
    // console.log(e.detail.modal)
    wx.vibrateShort()
    this.setData({
      modalName: e.detail.modal
    })
  },
  onShowPopupTap(e) {
    wx.vibrateShort()
    if(!app.globalData.userInfo) {
      this.setData({
        isShow: true 
      })
      return
    }
    this.setData({
      popupShow: true
    })

  },
  searchFocus(e) {
    wx.vibrateShort()
    this.setData({
      LargeSearchBox: true,
      popupShow: false,
    })
  },
  searchBlur() {
    this.setData({
      LargeSearchBox: false,
      popupShow: false,
    })
  },
  async searchConfirm(e) {
    console.log(e)
    const data = {
      message: e.detail.value
    }
    let res = await ajaxPOST(app.gUrl, data, 'findgarbage/')
    // console.log(res)
    this.setData({
      hotShow:false,
      searchData: res.data
    })
  },
  searchClear(){
    this.setData({
      hotShow: true
    })
  },
  tapCamera() {
    wx.vibrateShort()
    this.setData({
      cBtn: {
        width: 110,
        height: 110
      }
    })
  },
  tapVoice() {
    wx.vibrateShort()
    this.setData({
      vBtn: {
        width: 110,
        height: 110
      }
    })
  },
  tapCameraEnd() {
    this.setData({
      cBtn: {
        width: 120,
        height: 120
      }
    })
    wx.navigateTo({
      url: '/pages/camera/camera',
    })
  },
  tapVoiceEnd() {
    this.setData({
      vBtn: {
        width: 120,
        height: 120
      }
    })
    wx.navigateTo({
      url: '/pages/voice/voice',
    })
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
})