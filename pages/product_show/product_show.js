// pages/product_show/product_show.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    product:null,
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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
    wx.request({
      url: 'http://fecshop.appserver.fancyecommerce.com/catalog/product/index',
      data:{
        product_id: this.data.id 
      },
      header:{
        "fecshop-uuid": "073f1b10-9f73-11e8-af84-00163e021360",
        "fecshop-lang": 'zh'
      },
      success:res=>{
        util.hideLoading(this);
        this.setData({
          product:res.data.data.product
        })
      }
    })
  },

  addcart: function () {
    util.showLoading(this);
    wx.request({
      url:'http://fecshop.appserver.fancyecommerce.com/checkout/cart/add',
      method:'POST',
      data:{
        'product_id':this.data.id,
        'qty':'1'
      },
      header:{
        'Content-Type':'application/x-www-form-urlencoded',
        "fecshop-uuid": "073f1b10-9f73-11e8-af84-00163e021360"
      },
      success:res=>{
        util.hideLoading(this);
        wx.showToast({
          title: '加入购物车成功',
          icon:'none'
        })
      }
    })
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