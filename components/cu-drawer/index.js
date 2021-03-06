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
    scrollLeft: 0,
    noteCount: 1,
    _note: '',
    notes: ['这里可以记录一些学习成果，如下所示','示例：干电池属于干垃圾'],
    dialogShow: false
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
    },
    addNote(){
      this.setData({
        dialogShow: true
      })
    }, 
    deleteNote(e){
      const index = e.currentTarget.dataset.id
      this.data.notes.splice(index, 1)
      this.setData({
        notes: this.data.notes
      })
    },
    inputValue(e){
      console.log(e)
    },
    inputBlur(e){
      console.log(e.detail.value)
      this.data.notes.push(e.detail.value)
    },
    onConfirmTap(e){
      // setTimeout(() => {
      //   wx.showToast({
      //     title: '点击了确定～',
      //     icon: 'none'
      //   });
      // }, 100);
      this.setData({
        notes: this.data.notes
      })
    },
    // 取消按钮
    onCancelTap() {
      // setTimeout(()=> {
      //   wx.showToast({
      //     title: '点击了取消～',
      //     icon: 'none'
      //   });
      // },100);
    },
  }
})
