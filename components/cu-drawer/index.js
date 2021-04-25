// components/cu-tabbar/drawer/index.js
const app = getApp()
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
    dialogShow: false,
    isShow: false
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
      if(!app.globalData.userInfo) {
        this.setData({
          isShow: true 
        })
        return
      }
      this.setData({
        dialogShow: true
      })
    }, 
    deleteNote(e){
      const index = e.currentTarget.dataset.id
      if(this.data.notes.length > 1) {
        this.data.notes.splice(index, 1)
        this.setData({
          notes: this.data.notes
        })
      } else {
        this.setData({
          notes: []
        })
      }
    },
    inputBlur(e){
      console.log(e.detail.value)
      this.data.inputValue = e.detail.value
      e.detail.value = ''
      // this.data.notes.push(e.detail.value)
    },
    onConfirmTap(e){
      if(!this.data.inputValue) return 
      this.data.notes.push(this.data.inputValue)
      this.setData({
        notes: this.data.notes 
      })
    },
    onConfirmTapLogin(){
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.setStorage({
            data: res.userInfo,
            key: 'userInfo',
          })
          console.log(app.userData.User)
          if(!app.userData.User) {
            const registerData = {
              openid: app.userData.openid,
              name: res.userInfo.nickName,
              url: res.userInfo.avatarUrl
            }
            wx.request({
              url: app.gUrl + 'set_user/',
              data: registerData,
              method: 'POST',
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              success: res => {
                console.log(res)
              }
            })
          }
        }
      })
    
    }
  }
})
