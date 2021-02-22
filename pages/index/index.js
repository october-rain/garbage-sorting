import {
  ajax,
  ajaxPOST,
  formatData
} from '../../utils/util'

Page({
  data: {
    PageCur: 'home',
    popupShow: false,
    // searchBox: 'popup-container'
    // searchBox: 'popup-large-container'
    // currentConf: {
    //   show: false,
    //   animation: 'show',
    //   zIndex: 99,
    //   contentAlign: 'center',
    // }

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
      console.log(1)
      console.log("1", res)
    } else {
      res = wx.getStorageSync('all_garbage')
      console.log(2)
    }
    this.setData({
      nameData: res
    })
    console.log(this.data.nameData)
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
  // onPopupTap() {
  //   const type = this.data.type;
  //   if (type === 6) {
  //     wx.showToast({
  //       title: '请点击按钮取消！',
  //       icon: 'none'
  //     });
  //   }
  // },
  searchFocus(e){
    this.setData({
      LargeSearchBox: true,
      popupShow: false
    })
  },
  async searchConfirm(e){
    console.log(e)
    const data = {message: e.detail.value}
    let res = await ajaxPOST('findgarbage/', data)
    console.log(res)
  }
})