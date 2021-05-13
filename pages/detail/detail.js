// pages/detail/detail.js
import {
  ajaxPOST,
} from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garbage: null,
    classification: null,
    message: null,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let data = {
      garbage_id: options.id
    }
    let result = await ajaxPOST(app.gUrl, data, 'id_garbage/')
    // console.log(result)
    this.setData({
      garbage: result.data.garbage_name,
      classification: result.data.classification_name,
      message: result.data.suggest
    })
  },
  tapError(){
    this.setData({
      isShow: true
    })
  }
})