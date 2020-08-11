import { request } from '../../request/index.js'

Page({
  data: {
    cates: [],
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0
  },
  //options(Object)
  onLoad: function (options) {
    const cates = wx.getStorageSync('cates')

    if (!cates) {
      this.getCates()
    } else {
      // console.log('aaaa', Date.now() - cates.time > 1000 * 10)
      // console.log(' Date.now', Date.now)
      // console.log('cates.time', cates.time)


      if (Date.now() - cates.time > 1000 * 10) {
        this.getCates()
      } else {
        this.setData({
          leftMenuList: cates.data.map(e => e.cat_name),
          rightContent: cates.data[0].children
        })
      }
    }
    // this.getCates()
  },
  handleItem(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index,
      rightContent: this.data.cates[e.currentTarget.dataset.index].children
    })

  },
  async getCates() {
    const res = await request({ url: '/categories' })
    console.log('res', res)
    wx.setStorageSync('cates', { time: Date.now(), data: res.data.message })
    this.setData({
      cates: res.data.message,
      leftMenuList: res.data.message.map(e => e.cat_name),
      rightContent: res.data.message[0].children
    })

  }
});


