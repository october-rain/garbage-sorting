// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_path: '../../image/swiper/family-mother-father-son-face-masks-holding-happy-smiling-planet-earth.jpg',
    img_hidden: true
  },

  tapCamera() {
    console.log(1)
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        console.log(res)
        // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        let filePath = res.tempFilePaths[0];
        //将刚才选的照片/拍的 放到下面view视图中
        that.setData({
          img_path: filePath, //把照片路径存到变量中，
          img_hidden: false //让展示照片的view显示
        })

        // 转 base 64
        wx.getFileSystemManager().readFile({
          filePath: filePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
          }
        })
        //以下两行注释的是同步方法，不过我不太喜欢用。
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)
      },
      fail: function (error) {
        wx.navigateBack({
          delta: 1,
        })
      },
      complete: function () {

      }
    });

  },
  TapCameraAgain() {
    this.tapCamera()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.tapCamera()
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