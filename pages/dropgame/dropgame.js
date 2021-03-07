// pages/dropgame/dropgame.js
import {
  getRandomGarbage,
  ajaxPOST, ajax
} from '../../utils/util'
const data = wx.getStorageSync('all_garbage')
const app = getApp()
// const query = wx.createSelectorQuery()
let interval
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gameControl: true,
    garbageName: "",
    garbageTop: 0,
    garbageLeft: null,
    garbageRight: null,
    isHidden: 'hidden',
    score: 0,
    _garbageClass: '',
    _position: 2
  },
  onControlGameStart() {
    this.setData({
      gameControl: this.data.gameControl ? false : true
    })
    debugger
    console.log('onControlGameStart')
    this.cycleExecute()
  },
  onControlGameEnd() {
    clearInterval(interval)
    this.setData({
      gameControl: this.data.gameControl ? false : true,
      isHidden: 'hidden'
    })
  },
  onControlGameLeft() {
    if (this.data._position > 1) {
      this.data._position -= 1
      this.setData({
        garbageLeft: this.data.garbageLeft - 25
      })
    }
    // })
  },
  onControlGameRight() {
    if (this.data._position < 4) {
      this.data._position += 1
      this.setData({
        garbageLeft: this.data.garbageLeft + 25
      })
    }
    // })
  },
  createGarbage() {
    const garbage = getRandomGarbage(data)
    console.log(garbage)
    this.data._position = 2
    this.data._garbageClass = garbage.classification_name
    this.setData({
      garbageName: garbage.garbage_name,
      garbageLeft: 25,
      garbageTop: 2,
      isHidden: 'visible'
    })
  },
  calScore() {
    const pos = this.data._position
    if (pos == 4) {
      return '有害垃圾'
    } else if (pos == 3) {
      return '干垃圾'
    } else if (pos == 2) {
      return '湿垃圾'
    } else {
      return '可回收垃圾'
    }
  },
  cycleExecute() {
    console.log('cycleExecute')
    this.createGarbage()
    console.log('createGarbage')
    // let garbage
    interval = setInterval(() => {
      if (this.data.garbageTop > 80) {
        let gclass = this.data._garbageClass
        console.log(gclass, this.calScore())
        if (gclass === this.calScore()) {

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
        garbageTop: this.data.garbageTop + 0.15
      })
    }, 10);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    console.log('hide')
    const data = {openid: app.userData.openid, score: this.data.score}
    app.userData.score = this.data.score
    const res = await ajaxPOST(app.gUrl, data, 'score_garbage/')
    console.log(res)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  async onUnload() {
    console.log('unload')
    const data = {openid: app.userData.openid, score: this.data.score}
    app.userData.score = this.data.score
    const res = await ajaxPOST(app.gUrl, data, 'score_garbage/')
    console.log(res)
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