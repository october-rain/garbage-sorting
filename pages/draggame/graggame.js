// pages/draggame/graggame.js
import {
  getRandomGarbage, ajaxPOST
} from '../../utils/util'
// const data = wx.getStorageSync('all_garbage')
const app = getApp()
const windowHeight = app.globalData.windowHeight
const windowWidth = app.globalData.windowWidth
let startPoint;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garbageName: "",
    _garbageClass: '',
    score: 0,
    x: 50,
    y: 50,
    buttonTop: windowHeight / 2 - 10,
    buttonLeft: windowWidth / 2 - 10
  },
  buttonStart: function (e) {
    console.log(e)
    startPoint = e.touches[0]
  },
  buttonMove: function (e) {
    let endPoint = e.touches[e.touches.length - 1]
    // console.log(endPoint)
    let translateX = endPoint.clientX - startPoint.clientX
    let translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint
    let buttonTop = this.data.buttonTop + translateY
    let buttonLeft = this.data.buttonLeft + translateX

    this.setData({
      buttonTop: buttonTop,
      buttonLeft: buttonLeft
    })
  },
  buttonEnd: function (e) {
    console.log(e)
    let endPoint = e.changedTouches[e.changedTouches.length - 1]
    let x = endPoint.clientX
    let y = endPoint.clientY
    const name = this.calScore(x, y)
    if(name) {
      let gclass = this.data._garbageClass
      if(gclass === name) {
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
          toastTitle: `回答错误 -1 分, 正确答案是: ${gclass}`,
          toastIcon: 'error'
        })
      }
      this.createGarbage()
    }
    this.setData({
      buttonTop: app.globalData.windowHeight / 2 - 10,
      buttonLeft: app.globalData.windowWidth / 2 - 10
    })
  },
  calScore(x, y){
    // console.log(x, y, windowWidth * 0.35, windowHeight * 0.15)
    if(x < windowWidth * 0.38 && y < windowHeight * 0.25){
      return "可回收垃圾"
    } else if (x > windowWidth * 0.62 && y < windowHeight * 0.25) {
      return "有害垃圾" 
    } else if (x < windowWidth * 0.38 && y > windowHeight * 0.75) {
      return "湿垃圾"
    } else if( x > windowWidth * 0.62 && y > windowHeight * 0.75) {
      return "干垃圾" 
    } else {
      return false
    }
  },
  createGarbage() {
    const data = wx.getStorageSync('all_garbage')
    const garbage = getRandomGarbage(data)
    // console.log(garbage)
    this.data._garbageClass = garbage.classification_name
    this.setData({
      garbageName: garbage.garbage_name,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createGarbage()
    // console.log('load', app.userData.score)
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
    const data = {openid: app.userData.openid, score: this.data.score}
    app.userData.score = this.data.score
    await ajaxPOST(app.gUrl, data, 'score_garbage/')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  async onUnload() {
    const data = {openid: app.userData.openid, score: this.data.score}
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