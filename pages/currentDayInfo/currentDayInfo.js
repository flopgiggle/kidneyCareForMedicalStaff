// pages/infolist/infolist.js
var app = getApp();
var util = require('../../utils/util.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchDate: util.getNowFormatDate(),
        myRecord: [],
        myReport: [],
        app: {},
        patientList: [],
        currentYear: new Date().getFullYear()
    },
    onGoToBindTap: function(e) {
        wx.navigateTo({
            url: "/pages/register/register"
        });
    },
    onPatientTap: function (e) {
        wx.navigateTo({
            url: "/pages/patient/patientDetail?patientId=" + e.currentTarget.dataset.patient.patientId
        });
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            searchDate: e.detail.value
        });
        this.loadList();
    },
    onAddHospitalRecordTap: function (event) {
        wx.navigateTo({
            url: "/pages/uploadReport/uploadReport"
        });
    },
    onMyselfRecordTap: function (event) {
        wx.navigateTo({
            url: "/pages/record/add"
        });
    },
    //onReportTap: function () {
    //    wx.navigateTo({
    //        url: "/pages/uploadReport/uploadReport"
    //    });
    //},
    onRecordTap: function () {
        wx.navigateTo({
            url: "/pages/chart/chart"
        });
    },
    onDialogueTap: function () {
        wx.navigateTo({
            url: "/pages/dialogue/dialogue"
        });
    },
    onReportTap: function () {
        wx.navigateTo({
            url: "/pages/chart/reportchart"
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.wxLoginProcess.bind(this);
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
        this.setData({
            searchDate: util.getNowFormatDate(),
        });
        var theApp = app;
        
        wx.login({
            success: this.wxLoginProcess
        });



        //this.loadList();

    },

    wxLoginProcess: function(res) {
        //var url = baseUri + "user/getUserInfo/" +res.code; 
        var url = app.globalData.urls.user.getUserForMedical;
        var postData= {
            Code: res.code,
            OpenId: app.globalData.openId
        }
        util.httpPost(url,postData,
            res => {
                app.globalData.user = res.Result;
                app.globalData.openId = res.Result.OpenId;
                this.setData({
                    app: app,
                });
                //判定用户是否已注册,未注册则不能使用该app，需要跳转到注册页面
                if (app.globalData.user.Status === 0 || app.globalData.user.Status == null) {
                    wx.navigateTo({
                        url: "/pages/register/register"
                    });
                } else {
                    //wx.switchTab({
                    //    url: "/pages/currentDayInfo/currentDayInfo"
                    //});
                    this.loadList();
                }
            });
    },
    loadList: function () {
        if (app.globalData.openId==="") {
            console.log("openId获取失败");
            return;
        }
        var url = app.globalData.urls.user.getPatientList;
        var postData = {
            UserId: app.globalData.user.Id,
            UserType: app.globalData.user.UserType
        }
        util.httpPost(url, postData,
            res => {
                //合并收缩压舒张压数据
                //var recordListGroup = res.Result.MyRecord;
                var result = JSON.parse(res.Result);
                for (var oneItem of result) {
                    debugger;
                    if (wx.getStorageSync("newpatient" + oneItem.patientId) !== false) {
                        oneItem.IsNew = true;
                    } else {
                        oneItem.IsNew = false;
                    }
                }

                this.setData({
                    patientList: result
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

    }
})