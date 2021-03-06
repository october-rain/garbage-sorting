// pages/camera/camera.js
import {
  ajaxPOST
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_path: '../../image/swiper/family-mother-father-son-face-masks-holding-happy-smiling-planet-earth.jpg',
    img_hidden: true
  },

  async tapCamera() {
    console.log(1)
    let that = this;
    let res = await wx.chooseImage({
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
            // console.log('data:image/png;base64,' + res.data)

            const data = {key: '222552c49b9c2c270a34b1614fe25608', img: res.data}
            wx.request({
              url: 'https://api.tianapi.com/txapi/imglajifenlei/index',
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
      }
    });

    // console.log(res)
    // let filePath = res.tempFilePaths[0];
    // //将刚才选的照片/拍的 放到下面view视图中
    // that.setData({
    //   img_path: filePath, //把照片路径存到变量中，
    //   img_hidden: false //让展示照片的view显示
    // })

    // // 转 base 64
    // let base64 = wx.getFileSystemManager().readFileSync(filePath, 'base64')
    // console.log(base64)

    // const data = {key: '222552c49b9c2c270a34b1614fe25608', img: base64}
    // let ajax = await ajaxPOST('http://api.tianapi.com/txapi/imglajifenlei/index', data)
    // console.log(ajax)
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