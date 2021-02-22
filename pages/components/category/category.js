// pages/category/category.js
import {
  ajax
} from '../../../utils/util'
// const app = getApp()
const sideBarData = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  //, 'other'
];

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    nameData: Array
  },
  data: {
    // nameData,
    sideBarData,
  },
  methods: {
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
  },
})