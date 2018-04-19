    // pages/my/my.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        patientId :"",
        userInfo: {},
        patientInfo: {},
        IsRead:true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            patientId: options.patientId,
            IsRead: options.IsRead
        });
        wx.setStorageSync("newpatient" + this.data.patientId, false);
        console.log(this.data.patientId);
    },
    onEvaluateTap: function (e) {
        wx.navigateTo({
            url: "/pages/evaluate/evaluate?patientId=" + this.data.patientId
    });
    },
    onMessageTap: function (e) {
        wx.navigateTo({
            url: "/pages/dialogue/dialogue?patientId=" + this.data.patientId
        });
    },
    onRecordTap: function(e) {
        wx.navigateTo({
            url: "/pages/chart/chart?patientId=" + this.data.patientId
        });
    },
    onReportTap: function (e) {
        wx.navigateTo({
            url: "/pages/chart/reportchart?patientId=" + this.data.patientId
        });
    },
    onDiseaseDiagnosisTap: function (e) {
        wx.navigateTo({
            url: "/pages/diseaseDiagnosis/diseaseDiagnosis?patientId=" + this.data.patientId
        });
    },
    onContactUsTap: function (e) {
        wx.navigateTo({
            url: "/pages/contactUs/contactUs"
        })
    },
    onEvaluateHitoryTap: function (e) {
        wx.navigateTo({
            url: "/pages/evaluate/hitory?patientId=" + this.data.patientId
        });
    },
    onEvaluateDrugTap: function (e) {
        wx.navigateTo({
            url: "/pages/patient/drug?patientId=" + this.data.patientId
        });
    },
    onHistoryDrugTap: function (e) {
        wx.navigateTo({
            url: "/pages/patient/historyDrug?patientId=" + this.data.patientId
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
        this.setData({ userInfo: app.globalData.user });
        var url = app.globalData.urls.user.getPatientInfo+"/"+this.data.patientId;
        util.http(url,
        res => {
            //合并收缩压舒张压数据
            //var recordListGroup = res.Result.MyRecord;
            debugger;
            var patientInfo = JSON.parse(res.Result);
            wx.setStorageSync("patientInfo"+this.data.patientId, patientInfo);
            debugger;
            this.setData({
              
                patientInfo: patientInfo,
                age:util.jsGetAge(patientInfo.patientBaseInfo.Birthday)
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
    onExceptTap: function() {
        wx.navigateTo({
            url: "/pages/patient/exceptInfo?patientId=" + this.data.patientId
        });
    },
    onTeleTap: function (e) {
      wx.makePhoneCall({
        phoneNumber: e.target.dataset.mobile, //此号码并非真实电话号码，仅用于测试  
        success: function () {
          console.log("拨打电话成功！")
        },
        fail: function () {
          console.log("拨打电话失败！")
        }
      })  
    },
})