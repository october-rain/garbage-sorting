// pages/game/game.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  methods: {
    onGoToGame(e){
      const id = e.currentTarget.dataset.id
      switch(id){
        case '1':
          console.log(1)
          wx.navigateTo({
            url: '/pages/dropgame/dropgame',
          })
          break
        case '2':
          wx.navigateTo({
            url: '/pages/draggame/graggame',
          })
          break
        case '3':
          wx.navigateTo({
            url: '/pages/question/question',
          })
          break
      }
    }
  }
})