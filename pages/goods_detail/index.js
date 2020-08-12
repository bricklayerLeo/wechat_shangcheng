import { request } from '../../request/index.js'

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  queryParams:{
    goods_id:''
  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetail(options.goods_id)
   },
  async getGoodsDetail(goods_id){
    const res = await request({url:'/goods/detail',data:{goods_id}})
    this.GoodsInfo = res.data.message;
    this.setData({
      goodsObj:{
        goods_name:res.data.message.goods_name,
        goods_price:res.data.message.goods_price,
        goods_introduce:res.data.message.goods_introduce.replace(/\.webp/,'.jpg'),
        pics:res.data.message.pics
      }
    })
  },
  handlePrevewImage(e){
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 2 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    });
  },
  handleCartAdd(){
    let cart = wx.getStorageSync('cart')||[]
  
  
    // let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);

    let index= cart.findIndex(v=>
      v.goods_id===this.GoodsInfo.goods_id
    )
    // let index = cart.indexOf()
    console.log(index)
    if(index===-1){
      this.GoodsInfo.num=1
      this.GoodsInfo.checked=true
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++
     
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户 手抖 疯狂点击按钮 
      mask: true
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})