// pages/join/join.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: null,
    p: 1,
    bigimg: [],
    goods: null,
    smallimg: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    util.showLoading(this);
    wx.request({
      url: 'http://fecshop.appserver.fancyecommerce.com/catalog/category/index',
      data: {
        'categoryId': '57bea0e3f656f275313bf56e'
      },
      header: {
        'fecshop-uuid': '073f1b10-9f73-11e8-af84-00163e021360',
        "fecshop-lang":'zh'
      },
      success: res => {
        util.hideLoading(this);
        this.setData({
          products: res.data.data.products,
          totalPage: res.data.data.page_count
        })
      },
      fail: () => {
        this.setData({
          p: this.data.p - 1
        })
      }
    }),
      wx.request({
        url: 'http://fecshop.appserver.fancyecommerce.com/cms/home/index',
        header: {
          'fecshop-uuid': '6fa1a662-9f84-11e8-9f37-00163e021360',
          'fecshop-lang': 'zh'
        },
        success: res => {
          console.log(res.data)
          this.setData({
            bigimg: res.data.data.advertiseImg.bigImgList,
            smallimg: res.data.data.advertiseImg.smallImgList
            ,
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      p: this.data.p + 1,
      wait: true
    })
    if (this.data.p > this.data.totalPage) {
      this.setData({
        p: this.data.totalPage
      })
      return;
    }
    wx.request({
      url: 'http://fecshop.appserver.fancyecommerce.com/catalog/category/product',
      data: {
        'categoryId': '57bea0e3f656f275313bf56e',
        "p": this.data.p
      },
      header: {
        'fecshop-uuid': '073f1b10-9f73-11e8-af84-00163e021360'
      },
      success: res => {
        util.hideLoading(this);
        this.setData({
          wait: false,
          products: this.data.products.concat(res.data.data.products)
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})