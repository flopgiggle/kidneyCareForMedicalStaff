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
        allSelectedDrugs:[],
        allDrugs: [],
        CKD: [{ Name: '1期', Id: '1' }, { Name: '2期', Id: '2' }, { Name: '3期', Id: '3' }, { Name: '4期', Id: '4' }, { Name: '5期', Id: '5' }],
        CKDIndex: -1,
        date: util.getNowFormatDate(),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var patientInfo = wx.getStorageSync("patientInfo" + options.patientId);
        this.setData({
            patientId: options.patientId,
            patientInfo: patientInfo,
        });
    },
    formSubmit: function (e) {
        var postData = [];
        for (var item of this.data.allSelectedDrugs) {
            postData.push({
                DrugCode: item.DrugCode,
                DrugName: item.DrugName,
                PatientId: this.data.patientId,
                Remark: e.detail.value[item.DrugCode],
                RecordTime: this.data.date
            });
        }
        var url = app.globalData.urls.drugs.savePatientDrugs;
        util.httpPost(url,
        {
            RecordTime: this.data.date,
            Drugs: postData,
            PatientId:this.data.patientId
        },
            res => {
                wx.navigateBack({
                    delta: 1
                });
            });
    },
    yfCheckboxChange: function (e) {

        var allSelectedDrugs = [];
        //设置选中的药品
        this.processDrugs(drugs => {
            var drugsCheckStatus = false;
            for (var a of e.detail.value) {
                if (drugs.DrugCode === a) {
                    drugsCheckStatus = true;
                }
            }
            drugs.Checked = drugsCheckStatus;
            if (drugs.Checked) {
                allSelectedDrugs.push(drugs);
            }
        });
        this.setData({ allDrugs: this.data.allDrugs, allSelectedDrugs: allSelectedDrugs });
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
     * 遍历所有药物的处理函数
     */
    processDrugs: function(processFun) {
        for (var item of this.data.allDrugs) {
            for (var innerItem of item.GroupTowList) {
                for (var drugs of innerItem.DrugsList) {
                    processFun(drugs);
                }
            }
        }
    },
    inputBlurChange: function (e) {
        var currentDrugCode = e.target.id;
        for (var oneDrugs of this.data.allSelectedDrugs) {
            if (oneDrugs.DrugCode === currentDrugCode) {
                oneDrugs.Remark = e.detail.value;
            }
        }
        this.processDrugs(drugs => {
            if (drugs.DrugCode === currentDrugCode) {
                drugs.Remark = e.detail.value;
            }
        });
        this.setData({ allDrugs: this.data.allDrugs, allSelectedDrugs: this.data.allSelectedDrugs });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var url = app.globalData.urls.drugs.getAllDrugs;
        util.http(url,
            res => {
                var result = JSON.parse(res.Result);
                this.setData({
                    allDrugs: result
                });
                var allSelectedDrugs = [];
                //选中病人的当前用药情况
                if (this.data.patientInfo.drugs) {
                    
                    this.processDrugs(drugs => {
                        var drugsCheckStatus = false;
                        var remark = "";
                        for (var a of this.data.patientInfo.drugs) {
                            if (drugs.DrugCode === a.DrugCode) {
                                drugsCheckStatus = true;
                                remark = a.Remark;
                                allSelectedDrugs.push(a);
                            }
                        }
                        drugs.Checked = drugsCheckStatus;
                        drugs.Remark = remark;
                    });
                }
                this.setData({
                    allDrugs: this.data.allDrugs,
                    allSelectedDrugs: allSelectedDrugs
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
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            date: e.detail.value
        });
    },
    onGroupTap: function (e) {
        //设置展开收缩药物大类面板
        var group = e.currentTarget.dataset.group;
        var dataGroup = _.find(this.data.allDrugs, item => { return item.GroupName === group.GroupName });
        dataGroup.IsFold = !dataGroup.IsFold;
        this.setData({ allDrugs: this.data.allDrugs });
    },
})