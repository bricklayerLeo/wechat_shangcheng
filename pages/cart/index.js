import { request } from '../../request/index.js'
import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    let cart = wx.getStorageSync('cart') || []

    // const allChecked = cart.length != 0 ? cart.every(w => w.checked) : false
    let allChecked = true
    this.setCart(cart)

    let addressStorage = wx.getStorageSync('address');

    this.setData({
      address: addressStorage,
    })


  },
  //options(Object)
  onLoad: function (options) {
  },
  handlePay() {
    let { address, cart } = this.data
    if (cart.length === 0) {
      showToast({ title: '请选购商品' })
      return
    }
    if (Object.keys(address).length === 0) {
      showToast({ title: '请选收货地址' })
      return
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  },
  handleItemAllCheck() {
    let { cart, allChecked } = this.data
    let totalPrice = 0
    let totalNum = 0
    allChecked = !allChecked
    cart.forEach(e => {
      if (allChecked) {
        e.checked = true
        totalPrice += e.num * e.goods_price,
          totalNum += e.num
      } else {
        e.checked = false
        totalPrice = 0
        totalNum = 0
      }
    })
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  handleItemNumEdit(e) {
    let { operation, id } = e.currentTarget.dataset

    const { cart } = this.data
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(async e => {
      if (e.goods_id === id) {
        // operation === -1 ? e.num-- : e.num++
        if (e.num === 1 && operation === -1) {
          console.log(e.num, 'e.num')
          const res = await showModal({ content: '你是否要删除?' })
          if (res.confirm) {

            cart.splice(cart.indexOf(e), 1);
            this.setData({
              cart
            })
            wx.setStorageSync('cart', cart);
          } else {
            e.num = 1
            this.setCart(cart);
          }
        } else {
          operation === -1 ? e.num-- : e.num++
        }




      }
      totalPrice += e.num * e.goods_price,
        totalNum += e.num
    })

    this.setData({
      cart,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  handeItemChange(e) {
    const goods_id = e.currentTarget.dataset.id
    let { cart } = this.data
    let index = cart.findIndex(v => v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked

    this.setCart(cart)
    // wx.setStorageSync('cart', cart);
  },
  setCart(cart) {
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price,
          totalNum += v.num
        // allChecked = true

      } else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false

    this.setData({
      cart,
      totalNum,
      totalPrice,
      allChecked
    })
    wx.setStorageSync('cart', cart);
  },
  async handleChooseAddress() {
    try {
      const res = await getSetting()
      const scopeAddress = res.authSetting["scope.address"]
      if (scopeAddress === false) {
        await openSetting()
        //  const res2= await chooseAddress()
      }
      const result1 = await chooseAddress()
      this.setData({
        address: {
          userName: result1.userName,
          telNumber: result1.telNumber,
          all: result1.provinceName + result1.cityName + result1.countyName + result1.detailInfo
        }
      })
      wx.setStorageSync('address', this.data.address);
    } catch (e) {
      console.log(e)
    }

    // wx.getSetting({
    //   success: (result) => {
    //     console.log(result);
    //     const scopeAddress = result.authSetting["scope.address"]
    //     if(scopeAddress===true||scopeAddress===undefined){
    //       wx.chooseAddress({
    //         success: (result1)=>{
    //           this.setData({
    //             address:{
    //               userName:result1.userName,
    //               telNumber:result1.telNumber,
    //               all:result1.provinceName+result1.cityName+result1.countyName+result1.detailInfo

    //             }
    //           })
    //           wx.setStorageSync('address', this.data.address);
    //         },
    //       });
    //     }else if(scopeAddress===false){
    //       console.log('sss')
    //       wx.openSetting({
    //         success: (result2)=>{
    //           wx.chooseAddress({
    //             success: (result3)=>{

    //             },
    //           });
    //         },
    //       });
    //     }
    //   },
    //   fail: (err) => {
    //     reject(err);
    //   }
    // });

  },
});

