import { request } from '../../request/index.js'

Page({
  data: {

  },
  //options(Object)
  onLoad: function (options) {
    console.log('111')

    this.getCates()
  },
  async getCates() {
    // request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' })
    const res = await request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' })
    console.log('res', res)
    this.setData({
      cates: res.data.message
    })

  }
});


// import { request } from '../../request/index.js'

// Page({

//   data: {
//     cates: []
//   },


  // onLoad: function (options) {
  //   console.log('111')

  //   this.getCates()
  // },
  // async getCates() {
  //   request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' })
  //   // const res = await request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories' })
  //   // console.log('res', res)
  //   // this.setData({
  //   //   cates: res.data.message
  //   // })

  // }


// })