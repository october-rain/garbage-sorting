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
      format: 'pcm'
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
        audioSrc: res.tempFilePath
      })
      console.log(res.tempFilePath)
      // let binary = wx.getFileSystemManager().readFileSync(res.tempFilePath, 'binary') 
      // console.log(binary)
      // const data = {key: '222552c49b9c2c270a34b1614fe25608', say: binary, format: 'pcm'}
      // console.log(data)
      wx.getFileSystemManager().readFile({
        filePath: res.tempFilePath, //选择语音返回的相对路径
        encoding: 'binary', //编码格式
        success: res => { //成功的回调
          console.log(res.data)
          const data = {
            key: '222552c49b9c2c270a34b1614fe25608',
            say: res.data,
            format: 'wav'
          }
          wx.request({
            url: 'http://api.tianapi.com/txapi/voicelajifenlei/index',
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data,
            success: function (res) {
              if (res.data.code == 200) {
                console.log(res.data)
                that.setData({
                  content: res.data.newslist[0].content
                })
              } else {
                that.setData({
                  content: res.data.msg
                })
              }
            },
            fail: function (err) {
              console.log(err)
            }
          })
        },
        fail: res => {
          console.log(res)
        }
      })

    });

    // const data = {
    //   key: '222552c49b9c2c270a34b1614fe25608',
    //   img: this.data.audioSrc
    // }
    // wx.request({
    //   url: 'http://api.tianapi.com/txapi/voicelajifenlei/index',
    //   method: 'POST',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   data: data,
    //   success: function (res) {
    //     if (res.data.code == 200) {
    //       that.setData({
    //         content: res.data.newslist[0].content
    //       })
    //     } else {
    //       that.setData({
    //         content: res.data.msg
    //       })
    //     }
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })


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