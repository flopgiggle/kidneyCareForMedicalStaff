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
        patientInfo: {},
        items: [
            { name: 'USA', value: '美国23232' },
            { name: 'CHN', value: '中国sdfsdfsdf', checked: 'true' },
            { name: 'BRA', value: '巴西ffffffffffffffffffffff' },
            { name: 'JPN', value: '日本ssdf' },
            { name: 'ENG', value: '英国asddddddd' },
            { name: 'TUR', value: '法国dddddddddddddd' },
        ],
        disease: [
            { coursCode: '1-1', checked: false, term: 'term1', name: '肾脏的基本结构与功能' },
            { coursCode: '1-2', checked: false, term: 'term1', name: '肾脏病常见症状体征' },
            { coursCode: '1-3', checked: false, term: 'term1', name: '肾脏病的常见检查' },
            { coursCode: '1-4', checked: false, term: 'term1', name: '肾脏病重要指标的参考值' },
            { coursCode: '1-5', checked: false, term: 'term1', name: '肾穿刺活检术介绍' },
            { coursCode: '1-6', checked: false, term: 'term1', name: '激素类药物的护理指导' },
            { coursCode: '1-7', checked: false, term: 'term1', name: '肾脏病日常生活保健和预防' },
            { coursCode: '1-8', checked: false, term: 'term1', name: '定期随访的意义和必要性' },
            { coursCode: '1-9', checked: false, term: 'term1', name: '慢性肾脏病能医好吗' },
            { coursCode: '2-1', checked: false, term: 'term2', name: 'CKD的定义和分期' },
            { coursCode: '2-2', checked: false, term: 'term2', name: 'CKD的自然病程简介' },
            { coursCode: '2-3', checked: false, term: 'term2', name: 'CKD重要指标的监测' },
            { coursCode: '2-4', checked: false, term: 'term2', name: 'CKD致病危险因素介绍' },
            { coursCode: '2-5', checked: false, term: 'term2', name: '高血压及其危害' },
            { coursCode: '2-6', checked: false, term: 'term2', name: '高血脂及其危害' },
            { coursCode: '2-7', checked: false, term: 'term2', name: '高血糖及其危害' },
            { coursCode: '2-8', checked: false, term: 'term2', name: '高尿酸血症及其危害' },
            { coursCode: '3-1', checked: false, term: 'term3', name: '简介慢性肾衰竭' },
            { coursCode: '3-2', checked: false, term: 'term3', name: '慢性肾衰竭的常见症状体征' },
            { coursCode: '3-3', checked: false, term: 'term3', name: '加速肾功能恶化的危险因素' },
            { coursCode: '3-4', checked: false, term: 'term3', name: '如何定期监测病情变化' },
            { coursCode: '3-5', checked: false, term: 'term3', name: '肾衰常用药物介绍' },
            { coursCode: '3-6', checked: false, term: 'term3', name: 'CKD患者能结婚吗' },
            { coursCode: '4-1', checked: false, term: 'term4', name: '感染对肾衰竭的影响' },
            { coursCode: '4-2', checked: false, term: 'term4', name: '肾性贫血的表现和防治' },
            { coursCode: '4-3', checked: false, term: 'term4', name: '肾性骨病的表现和防治' },
            { coursCode: '4-4', checked: false, term: 'term4', name: '肾性高血压的治疗和监测' },
            { coursCode: '4-5', checked: false, term: 'term4', name: '慢性肾功能衰竭的其它并发症及预防' },
            { coursCode: '4-6', checked: false, term: 'term4', name: '透析时机的选择' },
            { coursCode: '4-7', checked: false, term: 'term4', name: '肾脏替代治疗方式的选择' },
            { coursCode: '4-8', checked: false, term: 'term4', name: '透析通路介绍' },
            { coursCode: '5-1', checked: false, term: 'term5', name: '紧急就医时机的把握' },
            { coursCode: '5-2', checked: false, term: 'term5', name: '慢性肾功能衰竭的并发症及预防' },
            { coursCode: '5-3', checked: false, term: 'term5', name: '肾脏替代治疗方式的选择' },
            { coursCode: '5-4', checked: false, term: 'term5', name: '透析通路介绍（AVF/Cuff/PD）' },
            { coursCode: '5-5', checked: false, term: 'term5', name: '透析的相关并发症' },
            { coursCode: '5-6', checked: false, term: 'term5', name: '肾移植准备事项及流程' }

        ],
        CKD: [{ Name: 'I期', Id: '1' }, { Name: 'II期', Id: '2' }, { Name: 'III期', Id: '3' }, { Name: 'IV期', Id: '4' }, { Name: 'V期', Id: '5' }],
        CKDIndex: -1
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

    }
})