// pages/dropgame/dropgame.js
import {
  getRandomGarbage
} from '../../utils/util'
const data = wx.getStorageSync('all_garbage')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gameControl: 'cuIcon-playfill',
    garbadgeName: ""
  },
  onControlGame() {
    this.setData({
      gameControl: this.data.gameControl === 'cuIcon-playfill' ? 'cuIcon-stop' : 'cuIcon-playfill'
    })
    this.createGarbage()
    const query = wx.createSelectorQuery()
    query.select('#garbage').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function(res){
      console.log(res)
      res[0].top       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
      console.log(res)
    })
  },
  createGarbage() {
    const garbage = getRandomGarbage(data)
    this.setData({
      garbadgeName: garbage.garbage_name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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