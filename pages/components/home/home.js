// pages/home/home.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '/image/swiper/man-woman-putting-garbage-containers-illustration-sorting-recycling-waste-concept.jpg'
    }, {
      id: 1,
      type: 'image',
      url: '/image/swiper/family-mother-father-son-face-masks-holding-happy-smiling-planet-earth.jpg',
    }, {
      id: 2,
      type: 'image',
      url: '/image/swiper/people-clean-park.jpg'
    }, {
      id: 3,
      type: 'image',
      url: '/image/swiper/people-urban-park-recycling-waste-illustration-man-woman-hold-placards-with-recycle-sign.jpg'
    }, {
      id: 4,
      type: 'image',
      url: '/image/swiper/smiling-people-putting-garbage-containers.jpg'
    }, {
      id: 5,
      type: 'image',
      url: '/image/swiper/reduce-reuse-recycle-banner-template-men-holding-waste-eco-friendly-lifestyle-concept.jpg'
    }],
    // modalName: 'viewModal'
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },

  methods: {
    DotStyle(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    //滚动过程中触发
    scroll(e) {
      // console.log(e.detail.scrollTop)
      this.setData({
        scrollTop: e.detail.scrollTop
      });
    },
    changeScrollTop(e) {
      // console.log(e)
      this.setData({
        toView: e.detail.scrollPageToLocation - 60
      })
    }
  }
})