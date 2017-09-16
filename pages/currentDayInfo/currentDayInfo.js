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


        wx.getUserInfo({
            success: res => {
                debugger;
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.wxUserInfo = res.userInfo;

                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res);
                }
            }
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
        wx.showLoading({
            title: '加载中',
        });
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
            },true);
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
        wx.showLoading({
            title: '加载中',
        });
        util.httpPost(url, postData,
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