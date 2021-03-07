// pages/camera/camera.js
import {
  ajaxPOST
} from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_path: '../../image/swiper/family-mother-father-son-face-masks-holding-happy-smiling-planet-earth.jpg',
    img_hidden: true
  },

  async tapCamera() {
    console.log(1)
    let that = this;
    let res
    try {
      res = await wx.chooseImage({
        count: 1,
      });
      console.log(res)
      // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
      let filePath = res.tempFilePaths[0];
      //将刚才选的照片/拍的 放到下面view视图中
      that.setData({
        img_path: filePath, //把照片路径存到变量中，
        img_hidden: false //让展示照片的view显示
      })
      // 以下两行注释的是同步方法， 不过我不太喜欢用。
      let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
      const data = {
        base64: base64
      }
      const result = await ajaxPOST(app.gUrl, data, 'img_garbage/')
      console.log(result)
    } catch (error) {
      console.log(error)
    }

    // let res = await wx.chooseImage({
    //   count: 1,
    // });
    // console.log(res)
    // // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
    // let filePath = res.tempFilePaths[0];
    // //将刚才选的照片/拍的 放到下面view视图中
    // that.setData({
    //   img_path: filePath, //把照片路径存到变量中，
    //   img_hidden: false //让展示照片的view显示
    // })
    // // 以下两行注释的是同步方法， 不过我不太喜欢用。
    // let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
    // const data = {
    //   base64: base64
    // }
    // const result = await ajaxPOST('http://192.168.1.100:8000/', data, 'img_garbage/')
    // console.log(result)

  },
  TapCameraAgain() {
    this.tapCamera()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tapCamera()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})