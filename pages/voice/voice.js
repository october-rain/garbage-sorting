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
    btnHeight: 180,
    voiceMsg: '识别结果',
    isRecord: true
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
      // console.log(res.tempFilePath)
      wx.uploadFile({
        url: app.gUrl + 'yuyin_garbage/',
        filePath: res.tempFilePath,
        name: 'filename',
        success(res) {
          let data = JSON.parse(res.data)
          console.log(data)
          const message = data.message
          data = data.data 
          const len = data.length
          if (len < 1) {
            that.setData({
              voiceMsg: "没找到！换个词试试"
            })
          } else if (len > 10) {
            that.setData({
              voiceMsg: "没听清哦！"
            })
          } else {
            that.setData({
              garbageMsg: data,
              voiceMsg: message,
              isRecord: false
            })
          }
          // wx.request({
          //   url: app.gUrl + 'findgarbage/',
          //   method: 'POST',
          //   header: {
          //     "Content-Type": "application/x-www-form-urlencoded"
          //   },
          //   data: data,
          //   success: function(e){
          //     console.log(e)
          // const len = e.data.length
          // if(len < 1) {
          //   that.setData({
          //     voiceMsg: "没找到！换个词试试"
          //   })
          // } else if(e.data.length > 10) {
          //   that.setData({
          //     voiceMsg: "没听清哦！"
          //   })
          // } else {
          //   that.setData({
          //     garbageMsg: e.data,
          //     voiceMsg: data.message,
          //     isRecord: false
          //   })
          // }
          //   },
          //   fail: function(e){
          //     console.log(e)
          //   }
          // })

        }
      })
    });
  },
  TapVoiceAgain() {
    this.setData({
      isRecord: true,
      // voiceMsg: "识别结果"
    })
  }

})