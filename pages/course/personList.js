// pages/infolist/infolist.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseId: "",
        apointment: "",
        signin: "",
        searchDate: util.getNowFormatDate(),
        myRecord: [],
        myReport: [],
        app: {},
        patientList: [],
        currentYear: new Date().getFullYear()
    },
    onPatientTap: function (e) {
        //wx.navigateTo({
        //    url: "/pages/patient/patientDetail?patientId=" + e.currentTarget.dataset.patient.patientId + "&IsRead=" + e.currentTarget.dataset.patient.IsRead
        //});
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        debugger;
        this.setData({
            courseId: options.courseId,
            apointment: options.apointment,
            signin: options.signin,
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
        
        var url = app.globalData.urls.course.allSiginPersonList + this.data.courseId;
        debugger;
        wx.showLoading({
            title: '加载中',
        });
        util.http(url,
            res => {
                //合并收缩压舒张压数据
                //var recordListGroup = res.Result.MyRecord;
                //var result = JSON.parse(res.Result);
                var result = res.Result;
                for (var oneItem of result) {
                    oneItem.age = util.jsGetAge(oneItem.Birthday);
                    if (wx.getStorageSync("newpatient" + oneItem.patientId) !== false) {
                        oneItem.IsNew = true;
                    } else {
                        oneItem.IsNew = false;
                    }
                }
                wx.setNavigationBarTitle({
                    title: '学员名单(预约' + this.data.apointment + " 签到" + this.data.signin +")"
                });
                wx.hideLoading();
                this.setData({
                    patientList: result
                });
            },true);
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