// pages/voice/voice.js
const app = getApp()
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
      duration: 60000,
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000,
      format: 'PCM',
    })
  },
  async tapBtnEnd() {
    this.setData({
      btnWidth: 180,
      btnHeight: 180
    })
    let that = this
    recorderManager.stop()
    await recorderManager.onStop(function (res) {
      // 停止录音之后，把录取到的音频放在res.tempFilePath
      that.setData({
        audioSrc: res.tempFilePath,
        fileSize: res.fileSize
      })
      console.log(res.tempFilePath)

      // wx.getFileSystemManager().readFile({
      //   filePath: res.tempFilePath, //选择语音返回的相对路径
      //   encoding: 'base64', //编码格式
      //   success: res => { //成功的回调
      //     console.log(res)
      //     // console.log(that.data.fileSize)
      //     const data = {bs: res.data ,filesize: that.data.fileSize}
      //     const result = ajaxPOST('http://192.168.1.100:8000/', data, 'yuyin_garbage/')
      //     console.log(result)
      //   }
      // })
      
      wx.uploadFile({
        url: app.gUrl + 'yuyin_garbage/',
        filePath: res.tempFilePath,
        name: 'filename',
        success (res){
          const data = res.data
          //do something
          console.log(res)
        }
      })
    });
  },
  play() {
    innerAudioContext = wx.createInnerAudioContext();
    innerAudioContext.onError((res) => {
      console.error(res)
    })
    innerAudioContext.src = this.data.audioSrc; // 这里可以是录音的临时路径
    innerAudioContext.play()
  },

})