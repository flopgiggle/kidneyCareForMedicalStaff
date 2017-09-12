// pages/register/register.js
var app = getApp();
var util = require('../../utils/util.js');
//var lodash = require('../../utils/lodash.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        object: [{ name: '患者本人', Id: '0' }, { name: '患者家属', Id: '1' }],
        mode: [{ name: '门诊', Id: '1' }, { name: '电话', Id: '2' }, { name: '线上', Id: '3' }, { name: '线下', Id: '4' }],
        duty: [{ UserName: '医生', Id: '2' }, { UserName: '护士', Id: '3' }],
        cognition: [{ name: '完全了解能做到', Id: '1' }, { name: '完全了解做不到', Id: '2' }, { name: '部分了解', Id: '3' }, { name: '完全不了解', Id: '4' }],
        behavior: [{ name: '不愿接受', Id: '1' }, { name: '愿意接受', Id: '2' }, { name: '已改变中', Id: '3' }, { name: '维持持续', Id: '4' }],
        objectIndex: -1,
        modeIndex: -1,
        dutyIndex: -1,
        behaviorIndex: -1,
        cognitionIndex: -1,
        birthday: '2017-01-01',
        multiArray: [['四川省', '云南省'], ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'], ['四川大学华西医院', '省医院']],
        multiIndex: [0, 0, 0],
        userInfo: {},
        patientId:"",
        date: "2017-09-12",
        content: ""
    },
    //需要查找原始对象,id,对应的选项索引值
    getIndexValue: function (orgValue, collect) {
        if (orgValue) {
            var index = 0;
            for (var item of collect) {
                if (item.Id == orgValue) {
                    return index;
                }
                index++;
            }

            //var index = lodash.findIndex(collect, [id = orgValue]);

            //return index;
        } else {
            return -1;
        }
    },
    bindCognitionChange: function (e) {
        this.setData({
            cognitionIndex: e.detail.value
        });
    },
    onContentTap: function(e) {
        wx.navigateTo({
            url: "/pages/evaluate/content?patientId=" + this.data.patientId
    })
    },
    bindBehaviorChange: function (e) {
        this.setData({
            behaviorIndex: e.detail.value
        });
    },
    bindModeChange: function (e) {
        this.setData({
            modeIndex: e.detail.value
        });
    },
    bindDutyChange: function (e) {

        this.setData({
            dutyIndex: e.detail.value
        });
    },
    bindObjectChange: function (e) {
        this.setData({
            objectIndex: e.detail.value
        });
    },
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        })
    },
    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
        case 0:
            switch (data.multiIndex[0]) {
            case 0:
                data.multiArray[1] = ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'];
                data.multiArray[2] = ['四川大学华西医院', '省医院'];
                break;
            case 1:
                data.multiArray[1] = ['昆明市', '玉溪市'];
                data.multiArray[2] = ['昆明市医院', '昆明儿童医院', '昆明中心医院'];
                break;
            }
            data.multiIndex[1] = 0;
            data.multiIndex[2] = 0;
            break;
        case 1:
            switch (data.multiIndex[0]) {
            case 0:
                switch (data.multiIndex[1]) {
                case 0:
                    data.multiArray[2] = ['四川大学华西医院', '省医院'];
                    break;
                case 1:
                    data.multiArray[2] = ['绵阳医院'];
                    break;
                case 2:
                    data.multiArray[2] = ['德阳医院', '德阳医院1'];
                    break;
                case 3:
                    data.multiArray[2] = ['攀枝花医院', '攀枝花医院2', '攀枝花医院3'];
                    break;
                case 4:
                    data.multiArray[2] = ['宜宾医院1', '宜宾医院2', '宜宾医院3', '宜宾医院4'];
                    break;
                }
                break;
            case 1:
                switch (data.multiIndex[1]) {
                case 0:
                    data.multiArray[2] = ['昆明市医院', '昆明儿童医院', '昆明中心医院'];
                    break;
                case 1:
                    data.multiArray[2] = ['玉溪市医院', '玉溪儿童医院'];
                    break;
                }
                break;
            }
            data.multiIndex[2] = 0;
            console.log(data.multiIndex);
            break;
        }
        this.setData(data);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            patientId: options.patientId
        });
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log(e.detail.value.phoneNum);
        //UserName Password UserType BelongToHospital Sex MobilePhone Birthday OpenId Status BelongToNurse BelongToDoctor


        if (this.data.sexIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择性别',
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

        if (this.data.dutyIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择职务',
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

        if (this.data.jobTitleIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择职称',
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
            UserName: e.detail.value.name,
            MobilePhone: e.detail.value.phoneNum,
            BelongToHospital: 1,
            Sex: this.data.sex[this.data.sexIndex].Id,
            UserType: this.data.duty[this.data.dutyIndex].Id,
            IdCard: e.detail.value.idCard,
            OpenId: app.globalData.openId,
            JobTitle: this.data.jobTitle[this.data.jobTitleIndex].Id
        };


        if (postData.MobilePhone.length > 0 && postData.MobilePhone.length !== 11) {
            wx.showModal({
                title: '提示',
                content: '手机号格式不正确',
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

        if (postData.UserName.length < 2) {
            wx.showModal({
                title: '提示',
                content: '用户名不正确',
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

        util.httpPost(app.globalData.urls.user.regist, postData, res => {
            wx.switchTab({
                url: "/pages/currentDayInfo/currentDayInfo"
            });
        });
        //e.detail.value.illInfo;
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
        var content = "";
        var checkedList = wx.getStorageSync("contentCheckedList" + this.data.patientId);
        for (var item of checkedList) {
            content += item.coursCode + " ";
        }
        this.setData({ content: content });

        //    this.setData({
        //        sexIndex: this.getIndexValue(app.globalData.user.Sex,this.data.sex),
        //        docterIndex: this.getIndexValue(app.globalData.user.Patient.BelongToDoctor,this.data.docter),
        //        nurseIndex: this.getIndexValue(app.globalData.user.Patient.BelongToNurse, this.data.nurse),
        //        CKDIndex: this.getIndexValue(app.globalData.user.Patient.CKDLeave, this.data.CKD),
        //        diseaseIndex: this.getIndexValue(app.globalData.user.Patient.DiseaseType, this.data.disease),
        //        birthday: app.globalData.user.Patient.Birthday ? app.globalData.user.Patient.Birthday : '2017-01-01',
        //        userInfo: app.globalData.user
        //});

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