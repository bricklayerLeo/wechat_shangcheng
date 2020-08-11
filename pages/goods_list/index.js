import { request } from '../../request/index.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
      tabs:[
          {
              id:0,
              value:'综合',
              isActive:true
          },
          {
            id:1,
            value:'销量',
            isActive:false
        },

        {
            id:2,
            value:'价格',
            isActive:false
        },
      ],
      goodsList:[]
    },
queryParams:{
 query:'',
 cid:'',
 pagenum:1,
 pagesize:10
},
totalPages:1,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     console.log(options)
     this.queryParams.cid=options.cid
     this.getGoodsList()
    //  console.log(this.data.tabs)
    },
    changeItem(e){
        let a = this.data.tabs
       a.forEach(w=>{
            w.isActive=false
           if( e.detail.index === w.id){
               w.isActive=true
           }
       })
       this.setData({
           tabs:a
       })
       console.log('a',a)
    },
    async getGoodsList(){
      const res = await request({url:'/goods/search',data:this.queryParams})
      const total=res.data.message.total;
      // 计算总页数
      this.totalPages=Math.ceil(total/this.queryParams.pagesize);
      console.log(res.data.message,'res')
      this.setData({
          goodsList:[...this.data.goodsList,...res.data.message.goods]
      })
      wx.stopPullDownRefresh() //关闭下拉刷新 数据到了 立马停止
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onReachBottom(){
        //  1 判断还有没有下一页数据
          if(this.queryParams.pagenum>=this.totalPages){
            // 没有下一页数据
            //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
            wx.showToast({ title: '没有下一页数据' });
              
          }else{
            // 还有下一页数据
            //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
            this.queryParams.pagenum++;
            this.getGoodsList();
          }
        },
        // 下拉刷新事件 
        onPullDownRefresh(){
          // 1 重置数组
          this.setData({
            goodsList:[]
          })
          // 2 重置页码
          this.queryParams.pagenum=1;
          // 3 发送请求
          this.getGoodsList();
        }
,
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})