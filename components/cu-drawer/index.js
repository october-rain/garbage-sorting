// components/cu-tabbar/drawer/index.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    modalName:{
      type: String,
      default: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 1,
    scrollLeft: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    changeDrawer(e) {
      // console.log(e.currentTarget.dataset.target)
      this.triggerEvent('changeDrawer', {
        modal: this.data.modalName ? null : e.currentTarget.dataset.target
      })
    },
    tabSelect(e) {
      console.log(e);
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    }
  }
})
