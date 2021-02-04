// pages/category/category.js
const sideBarData = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'
];

const nameData = [
  ['安冉', '艾浩宇'],
  ['白昕玥', '包博坤'],
  ['陈麟', '曹毛毛'],
  ['邓波光', '董睿希'],
  ['鄂卓烆', '洱惜文'],
  ['冯月滢', '范源'],
  ['郭若诗', '高薇竹'],
  ['黄琪琪', '胡纩鸯'],
  ['蒋馥蔓', '金倜厅'],
  ['孔薇竹', '康艳霞'],
  ['李舒旬', '刘笑'],
  ['马亦', '孟熠彤'],
  ['倪靓', '牛彗伶'],
  ['欧玉兰', '欧阳漂泊'],
  ['潘静', '皮文涛'],
  ['钱卫国', '秦健容'],
  ['任倩倩', '荣盈盈'],
  ['孙桢', '沈业轩'],
  ['陶小树', '唐子翊'],
  ['吴洁立', '王紫耘'],
  ['许子豪', '谢亚希'],
  ['杨思远', '尤庭亮'],
  ['赵容', '周承瑶']
];

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
    changeScrollTop(e){
      // console.log(e)
      this.setData({
        toView: e.detail.scrollPageToLocation - 60
      })
    }
  }
})