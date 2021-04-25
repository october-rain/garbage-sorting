// pages/question/question.js
import {
  getRandomGarbage,
  ajaxPOST
} from '../../utils/util'
const app = getApp()
// const data = wx.getStorageSync('all_garbage')
const map = new Map()
map.set('1', '可回收垃圾')
map.set('2', '干垃圾')
map.set('3', '湿垃圾')
map.set('4', '有害垃圾')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    garbage: "",
    garbageName: "",
    toastShow: false
  },

  createGarbage() {
    const data = wx.getStorageSync('all_garbage')
    const garbage = getRandomGarbage(data)
    this.data.garbage = garbage
    this.setData({
      garbageName: garbage.garbage_name
    })
  },
  selectAnswer(e) {
    const res = map.get(e.currentTarget.dataset.id)
    if (res === this.data.garbage.classification_name) {
      this.setData({
        score: this.data.score + 2,
        toastShow: true,
        toastTitle: "回答正确 +2 分",
        toastIcon: "success"
      })
    } else {
      this.setData({
        score: this.data.score - 1,
        toastShow: true,
        toastTitle: `回答错误 -1 分, 正确答案是: ${this.data.garbage.classification_name}`,
        toastIcon: 'error'
      })
    }
    setTimeout(() => {
      this.createGarbage()
    }, 200)
  },
  skip() {
    this.createGarbage()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createGarbage()
    this.setData({
      score: app.userData.score
    })
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
  async onHide() {
    const data = {
      openid: app.userData.openid,
      score: this.data.score
    }
    app.userData.score = this.data.score
    await ajaxPOST(app.gUrl, data, 'score_garbage/')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  async onUnload() {
    const data = {
      openid: app.userData.openid,
      score: this.data.score
    }
    app.userData.score = this.data.score
    await ajaxPOST(app.gUrl, data, 'score_garbage/')
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