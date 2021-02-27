// pages/voice/voice.js
const recorderManager = wx.getRecorderManager() //初始化音频管理器
let innerAudioContext = wx.createInnerAudioContext() //创建内部 audio 上下文对象 // 注意不能使用 const

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnWidth: 180,
    btnHeight: 180
  },
  tapBtnStart() {
    this.setData({
      btnHeight: 200,
      btnWidth: 200
    })
    recorderManager.start({
      format: 'mp3'
    })
  },
  tapBtnEnd() {
    this.setData({
      btnWidth: 180,
      btnHeight: 180
    })
    let that = this
    recorderManager.stop()
    recorderManager.onStop(function (res) {
      // 停止录音之后，把录取到的音频放在res.tempFilePath
      that.setData({
        audioSrc: res.tempFilePath
      })
      console.log(res.tempFilePath)
    });
  },
  play(){
    innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.onError((res) => {
      console.error(res)
    })
    innerAudioContext.src = this.data.audioSrc;  // 这里可以是录音的临时路径
    innerAudioContext.play()
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