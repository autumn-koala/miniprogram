// pages/cart/cart.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // count:3,
    edit:false,
    loading:true,
    products:null,
    recList:[
      {
        img:'/images/456.jpg',
        name:'三只松鼠',
        price:'123'
      },
      {
        img: '/images/456.jpg',
        name: '三只松鼠222',
        price: '123'
      },
      {
        img: '/images/456.jpg',
        name: '三只松鼠333',
        price: '123'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  edit:function(){
    this.setData({
      edit:!this.data.edit
    })
  },
  getIndex:function(){
    wx.request({
      url: 'http://fecshop.appserver.fancyecommerce.com/checkout/cart/index',
      header: {
        "Fecshop-Uuid": "073f1b10-9f73-11e8-af84-00163e021360",
        'fecshop-lang': 'zh'
      },
      success: res => {
        util.hideLoading(this);
        if (res.data && res.data.code == '200') {
          if (res.data.data.cart_info) {
            this.setData({
              products: res.data.data.cart_info.products,
              selectProducts: res.data.data.cart_info.products.filter((ele)=>{
                return ele.active == 1;
              }),
            })
          } else {
            this.setData({
              products: null
            })
          }
        } else {
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          })
        }
      }
    })
  },



  /** 商品数量的增删减 */
  update:function(e){
    wx.showNavigationBarLoading();
    wx.request({
      url: 'http://fecshop.appserver.fancyecommerce.com/checkout/cart/updateinfo',
      method:'POST',
      data:{
        'up_type':e.currentTarget.dataset.type,
        'item_id':e.currentTarget.dataset.item_id
      },
      header:{
        'Content-Type':'application/x-www-form-urlencoded',
        "Fecshop-Uuid": "073f1b10-9f73-11e8-af84-00163e021360"
      },
      success:res=>{
        wx.hideNavigationBarLoading();
        this.getIndex();
      }
    })
  },
  /** 单个商品的选中与否 */ 
  selectOne:function(e){
    wx.showNavigationBarLoading();
    let s = e.currentTarget.dataset.active;
    let checked = s ? 0 : 1;
    wx.request({
      url: 'http://fecshop.appserver.fancyecommerce.com/checkout/cart/selectone',
      data:{
        'checked':checked,
        'item_id':e.currentTarget.dataset.item_id
      },
      header:{
        "Fecshop-Uuid": "073f1b10-9f73-11e8-af84-00163e021360"
      },
      success:res=>{
        wx.hideNavigationBarLoading();
        this.getIndex();
      }
    })
  },

  /** 全选按钮  */ 
  selectAll:function(e){
    wx.showNavigationBarLoading();
    let s = e.currentTarget.dataset.active;
    let checked = s ? 0 : 1;
    wx.request({
      url: 'http://fecshop.appserver.fancyecommerce.com/checkout/cart/selectall',
      data: {
        'checked': checked,
        'item_id': e.currentTarget.dataset.item_id
      },
      header: {
        "Fecshop-Uuid": "073f1b10-9f73-11e8-af84-00163e021360"
      },
      success: res => {
        wx.hideNavigationBarLoading();
        this.getIndex();
      }
    })
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
    util.showLoading(this);
    this.getIndex();
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