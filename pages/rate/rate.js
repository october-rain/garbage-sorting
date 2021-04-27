import {
  ajax,
  ajaxPOST,
} from '../../utils/util'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userRankData: null
  },

  onGoToRank(){
    wx.vibrateShort()
    wx.navigateTo({
      url: '/pages/rank/rank',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    const data = {
      openid: app.userData.openid
    }
    // console.log(data)
    const res = await ajaxPOST(app.gUrl, data, 'my_rank/')
    // console.log(res)
    this.setData({
      userRankData: res.data
    })
  },
})