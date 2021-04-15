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
    hotShow: true 
  },
  async onLoad(options) {
    console.log('load')
    let res
    if (!wx.getStorageSync('all_garbage')) {
      res = await ajax('getAllgarbage/')
      console.log(res)
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
        console.log(app.userData)
        that.setData({
          userScore: app.userData.score
        })
      };
    }

  },
  onShow() {
    console.log('show')
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
        console.log(app.userData)
        that.setData({
          userScore: app.userData.score,
          popupShow: false
        })
      }
    }
  },
  NavChange(e) {
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
    this.setData({
      modalName: e.detail.modal
    })
  },
  onShowPopupTap(e) {
    this.setData({
      popupShow: true
    })

  },
  searchFocus(e) {
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
    console.log(res)
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
    this.setData({
      cBtn: {
        width: 110,
        height: 110
      }
    })
  },
  tapVoice() {
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
})