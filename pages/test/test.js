var startPoint;
const app = getApp()
Page({
  data: {
    buttonTop: app.globalData.windowHeight / 2 - 10,
    buttonLeft: app.globalData.windowWidth / 2 - 10
  },
  buttonStart: function (e) {
    console.log(e)
    startPoint = e.touches[0]
  },
  buttonMove: function (e) {
    var endPoint = e.touches[e.touches.length - 1]
    console.log(e)
    var translateX = endPoint.clientX - startPoint.clientX
    var translateY = endPoint.clientY - startPoint.clientY
    startPoint = endPoint
    var buttonTop = this.data.buttonTop + translateY
    var buttonLeft = this.data.buttonLeft + translateX

    this.setData({
      buttonTop: buttonTop,
      buttonLeft: buttonLeft
    })
  },
  buttonEnd: function (e) {
    this.setData({
      buttonTop: app.globalData.windowHeight / 2 - 10,
      buttonLeft: app.globalData.windowWidth / 2 - 10
    })
  }

})