import {
  ajax,
  formatData
} from '../../utils/util'

Page({
  data: {
    PageCur: 'home',
    show: false,

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
      show: true
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
  // }
})