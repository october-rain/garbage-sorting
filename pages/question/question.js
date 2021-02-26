// pages/question/question.js
import {
  getRandomGarbage
} from '../../utils/util'
const data = wx.getStorageSync('all_garbage')
const map = new Map()
map.set('1','可回收垃圾')
map.set('2','干垃圾')
map.set('3','湿垃圾')
map.set('4','有害垃圾')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    garbage: "",
    garbageName: "",
    toastShow: false
  },

  createGarbage() {
    const garbage = getRandomGarbage(data)
    this.data.garbage = garbage
    this.setData({
      garbageName: garbage.garbage_name
    })
  },
  selectAnswer(e) {
    const res = map.get(e.currentTarget.dataset.id)
    if(res === this.data.garbage.classification_name) {
      this.setData({
        count: this.data.count + 2,
        toastShow: true,
        toastTitle: "回答正确 +2 分",
        toastIcon: "success"
      })
    } else {
      this.setData({
        count: this.data.count - 1,
        toastShow: true,
        toastTitle: `回答错误 -1 分, 正确答案是: ${res}`,
        toastIcon: 'error'
      })
    }
    setTimeout(()=> {
      this.createGarbage()
    }, 200)
  },
  skip(){
    this.createGarbage()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createGarbage()
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