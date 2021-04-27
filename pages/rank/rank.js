// pages/rank/rank.js
import {
  ajax,
  ajaxPOST,
  formatData
} from '../../utils/util'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rank: null 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const res = await ajax('get_rank')
    // console.log(res.data)
    this.setData({
      rank: res.data
    })
  },
})