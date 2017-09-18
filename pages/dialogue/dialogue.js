// pages/dialogue/dialogue.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allData: [],
        user: {},
        patientId: "",
        message: "",
        wxUserInfo: "",
        patientInfo:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
      var patientInfo = wx.getStorageSync("patientInfo" + options.patientId);
      this.setData({
          patientId: options.patientId,
          wxUserInfo: app.globalData.wxUserInfo,
          patientInfo: patientInfo,
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
      this.loadList();
  },
  loadList: function () {
      //if (app.globalData.openId === "") {
      //    console.log("openId获取失败");
      //    return;
      //}
      var url = app.globalData.urls.message.getMessageForPatient;

      var postData = {
          Index: 1,
          PageSize: 1000,
          UserId: app.globalData.user.Id,
          PatientId: this.data.patientId,
      }

      util.httpPost(url, postData, res => {
          this.setData({
              allData:res.Result,
              user:app.globalData.user,
          });
          var pages = getCurrentPages();
          var currPage = pages[pages.length - 1];   //当前页面
          var prevPage = pages[pages.length - 2];  //上一个页面

          //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
          prevPage.setData({
              IsRead: true
          });


      });
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
  
  },
  formSubmite: function (e) {
      if (e.detail.value.message < 2) {
          wx.showModal({
              title: '提示',
              content: '消息发送不能少于2个字符',
              success: function (res) {
                  if (res.confirm) {
                      console.log('用户点击确定');
                  } else if (res.cancel) {
                      console.log('用户点击取消');
                  }
              }
          });
          return;
      }

      var postData = {
          Message: e.detail.value.message,
          FromUser: app.globalData.user.Id,
          ToUser: this.data.patientId
      };

      util.httpPost(app.globalData.urls.message.sendMessage, postData, res => {
          wx.showModal({
              title: '提示',
              content: '提交成功',
              success: res => {
                  if (res.confirm) {
                      console.log('用户点击确定');
                  } else if (res.cancel) {
                      console.log('用户点击取消');
                  }
                  this.setData({message:""});
                  this.loadList();
              }
          });


      });
  }
})