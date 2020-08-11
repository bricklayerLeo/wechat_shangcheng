//Page Object
import { request } from '../../request/index'
Page({
  data: {
    swiperList: [],
    guide: [],
    floorList: []
  },
  onLoad: function (options) {
    this.getSwiperList()
    this.getGuide()
    this.getFloorList()
  },
  async getSwiperList() {
    const res = await request({
      url: '/home/swiperdata',
    })
    this.setData({
      swiperList: res.data.message
    })

  },
  async getGuide() {
    const res = await request({
      url: '/home/catitems',
    })
    this.setData({
      guide: res.data.message
    })
  },
  async getFloorList() {
    const res = await request({
      url: '/home/floordata',
    })
    this.setData({
      floorList: res.data.message
    })
  },

  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});