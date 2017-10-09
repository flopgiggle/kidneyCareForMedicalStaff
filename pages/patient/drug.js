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
        debugger;
        var postData = [];
        for (var item of this.data.allSelectedDrugs) {
            postData.push({ DrugCode: item.DrugCode, DrugName: item.DrugsName, PatientId: this.data.patientId, Remark: e.detail.value[item.DrugCode] });
        }
        var url = app.globalData.urls.drugs.savePatientDrugs;
        util.httpPost(url, postData, res => {
            debugger;
            wx.navigateBack({
                delta: 1
            });
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
                //选中病人的当前用药情况
                if (this.data.patientInfo.drugs) {
                    this.processDrugs(drugs => {
                        var drugsCheckStatus = false;
                        var remark = "";
                        for (var a of this.data.patientInfo.drugs) {
                            if (drugs.DrugCode === a.DrugCode) {
                                drugsCheckStatus = true;
                                remark = a.Remark;
                            }
                        }
                        drugs.Checked = drugsCheckStatus;
                        drugs.Remark = remark;
                    });
                }
                this.setData({
                    allDrugs: this.data.allDrugs
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