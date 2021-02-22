// pages/category/category.js
import {
  ajax
} from '../../../utils/util'
const app = getApp()
const sideBarData = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  //, 'other'
];
const data1 = [
  [{
      "garbage_id": 1,
      "garbage_name": "1号电池（无汞）",
      "classification_name": "干垃圾"
    },
    {
      "garbage_id": 2,
      "garbage_name": "3.5英寸软盘",
      "classification_name": "干垃圾"
    },
  ],
  [{
      "garbage_id": 1,
      "garbage_name": "1号电池（无汞）",
      "classification_name": "干垃圾"
    },
    {
      "garbage_id": 2,
      "garbage_name": "3.5英寸软盘",
      "classification_name": "干垃圾"
    },
  ],
  [{
      "garbage_id": 1,
      "garbage_name": "1号电池（无汞）",
      "classification_name": "干垃圾"
    },
    {
      "garbage_id": 2,
      "garbage_name": "3.5英寸软盘",
      "classification_name": "干垃圾"
    },
  ],
]
console.log("2",app.allGarbage)
const nameData = app.allGarbage

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    nameData,
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
  lifetimes: {
    created() {
      // const data = app.allGarbage
      // this.setData({
      //   nameData: data1
      // })
      console.log(this.data.nameData)
    }
  }
})