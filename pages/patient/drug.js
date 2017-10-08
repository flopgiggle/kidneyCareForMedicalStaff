// pages/diseaseDiagnosis/diseaseDiagnosis.js
var app = getApp();
var util = require('../../utils/util.js');
var _ = require('../../utils/undercore.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        patientId: "",
        checkedList: [],
        patientInfo: {},
        allDrugs: [],
        CKD: [{ Name: '1期', Id: '1' }, { Name: '2期', Id: '2' }, { Name: '3期', Id: '3' }, { Name: '4期', Id: '4' }, { Name: '5期', Id: '5' }],
        CKDIndex: -1,
        date: util.getNowFormatDate(),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //var allDiease = this.data.disease;
        //var patientInfo = wx.getStorageSync("patientInfo" + options.patientId);
        ////设置选中的疾病

        //for (var item of patientInfo.disease) {
        //    for (var dataItem of allDiease) {
        //        if (item.DiseaseCode == dataItem.diseaseCode) {
        //            dataItem.checked = true;
        //        }
        //    }
        //}
        this.setData({
            patientId: options.patientId,
        });
    },
    onSaveTap: function (e) {
        wx.navigateBack({
            delta: 1
        });
    },
    yfCheckboxChange: function (e) {
        //var allDisease = e.detail.value;
        ////设置选中的疾病
        //var allDiease = this.data.disease;
        //for (var item of allDisease) {
        //    for (var dataItem of allDiease) {
        //        if (item == dataItem.diseaseCode) {
        //            dataItem.checked = true;
        //        } else {
        //            dataItem.checked = false;
        //        }
        //    }
        //}
        var contentCheckedList = [];

        e.detail.value.forEach(a => {
            this.data.disease.forEach(b => {
                if (a === b.coursCode) {
                    contentCheckedList.push(b);
                }
            });
        });


        wx.setStorageSync("contentCheckedList" + this.data.patientId, contentCheckedList);
        //this.setData({ checkedList: e.detail.value});
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    },
    bindCKDChange: function (e) {
        this.setData({
            CKDIndex: e.detail.value
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
        var url = app.globalData.urls.drugs.getAllDrugs;
        debugger;
        util.http(url,
            res => {
                var result = JSON.parse(res.Result);
                this.setData({
                    allDrugs: result
                });
            });

        var checkedList = wx.getStorageSync("contentCheckedList" + this.data.patientId);
        for (var oneContent of this.data.disease) {
            for (var oneChedked of checkedList) {
                if (oneChedked.coursCode === oneContent.coursCode) {
                    oneContent.checked = true;
                    break;
                } else {
                    oneContent.checked = false;
                }
            };
        };
        this.setData({ disease: this.data.disease});
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
    onGroupTap: function (e) {
        //设置展开收缩药物大类面板
        var group = e.currentTarget.dataset.group;
        var dataGroup = _.find(this.data.allDrugs, item => { return item.GroupName === group.GroupName });
        dataGroup.IsFold = !dataGroup.IsFold;
        this.setData({ allDrugs: this.data.allDrugs });
    },
})