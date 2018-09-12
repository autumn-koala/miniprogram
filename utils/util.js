const showLoading = page => {
  // wx.showLoading({
  //   title: '玩命加载中',
  //   mask: true
  // })
  page.setData({
    loading:true
  })
}

const hideLoading = page =>{
  // wx.hideLoading();
  page.setData({
    loading:false
  })
}
module.exports = {
  showLoading : showLoading,
  hideLoading : hideLoading
}