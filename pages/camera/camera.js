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
    let that = this;
    let res
    try {
      res = await wx.chooseImage({
        count: 1,
      });
      // console.log(res)
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
      let result = await ajaxPOST(app.gUrl, data, 'img_garbage/')
      // console.log(result.data)
      result = result.data
      result.newslist.forEach(element => {
        const res = that.recognizeGarbage(element.lajitype)
        element.classification = res
      });
      that.setData({
        garbage_data: result.newslist
      })
    } catch (error) {
      console.log(error)
    }
  },
  TapCameraAgain() {
    wx.vibrateShort()
    this.tapCamera()
  },
  recognizeGarbage(type){
    switch (type) {
      case 0:
        return '可回收垃圾'
      case 1: 
        return '有害垃圾'
      case 2: 
        return '湿垃圾'
      case 3: 
        return '干垃圾'
      case 4:
        return '无法识别'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tapCamera()
  },
})