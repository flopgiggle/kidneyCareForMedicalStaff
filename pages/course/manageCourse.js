// pages/diseaseDiagnosis/diseaseDiagnosis.js
var app = getApp();
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        patientId: "",
        checkedList: [],
        courseList: {},
        CKD: [{ Name: '1期', Id: '1' }, { Name: '2期', Id: '2' }, { Name: '3期', Id: '3' }, { Name: '4期', Id: '4' }, { Name: '5期', Id: '5' }],
        CKDIndex: -1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            patientId: options.patientId,
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    onCourseTap: function (e) {
        wx.navigateTo({
            url: "/pages/course/courseDetail?courseId=" + e.currentTarget.dataset.course.Id
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var url = app.globalData.urls.course.getCourseList;
        util.http(url,
            res => {
            var courseList = JSON.parse(res.Result);
            courseList.forEach(a => {
                a.StartTimeString = util.formatDate("hh:mm", new Date(a.StartTime.replace("T", " ").replace("-", "/")));
                a.EndTimeString = util.formatDate("hh:mm", new Date(a.EndTime.replace("T", " ").replace("-", "/")));
                });

            this.setData({ courseList: courseList });
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

    }
})