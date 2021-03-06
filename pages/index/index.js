import {
  ajax,
  ajaxPOST,
  formatData
} from '../../utils/util'

Page({
  data: {
    PageCur: 'me',
    popupShow: false,
    cBtn: {
      width: 120,
      height: 120
    },
    vBtn: {
      width: 120,
      height: 120
    }
  },
  async onLoad(options) {
    let res
    if (!wx.getStorageSync('all_garbage')) {
      res = await ajax('getAllgarbage/')
      console.log(res)
      res = formatData(res.data)
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
    console.log(this.data.nameData)
  },
  onShow(){
    this.setData({
      popupShow: false
    })
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
  searchFocus(e){
    this.setData({
      LargeSearchBox: true,
      popupShow: false,
    })
  },
  searchBlur(){
    this.setData({
      LargeSearchBox: false,
      popupShow: false,
    })
  },
  async searchConfirm(e){
    console.log(e)
    const data = {message: e.detail.value}
    let res = await ajaxPOST('https://ruangong.tian999.top/', data, 'findgarbage/')
    console.log(res)
  },
  tapCamera(){
    this.setData({
      cBtn: {
        width: 110,
        height: 110
      }
    })
  },
  tapVoice(){
    this.setData({
      vBtn: {
        width: 110,
        height: 110
      }
    })
  },
  tapCameraEnd(){
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
  tapVoiceEnd(){
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