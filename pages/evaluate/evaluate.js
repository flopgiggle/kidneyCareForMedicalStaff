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
        date: util.getNowFormatDate(),
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
        var checkedList = wx.getStorageSync("contentCheckedList" + this.data.patientId);

        if (this.data.objectIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择患教对象',
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

        if (this.data.modeIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择患教方式',
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

        if (checkedList.length <= 0) {
            wx.showModal({
                title: '提示',
                content: '请选择患教内容',
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


        if (this.data.cognitionIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择认知评估',
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

        if (this.data.behaviorIndex < 0) {
            wx.showModal({
                title: '提示',
                content: '请选择行为评估',
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
        var courseInfo = "";
        var courseName = "";
        for (var item of checkedList) {
            courseInfo += item.coursCode + ",";
            courseName += item.name + ",";
        }
        var postData = {
            AttendingDates: this.data.date,
            BehaviorCode: this.data.behavior[this.data.behaviorIndex].Id,
            BehaviorName: this.data.behavior[this.data.behaviorIndex].name,
            CognitionCode: this.data.cognition[this.data.cognitionIndex].Id,
            CognitionName: this.data.cognition[this.data.cognitionIndex].name,
            CoursCode: courseInfo,
            CoursName: courseName,
            Mark: e.detail.value.mark,
            ModeCode: this.data.mode[this.data.modeIndex].Id,
            ModeName: this.data.mode[this.data.modeIndex].name,
            ObjectCode: this.data.object[this.data.objectIndex].Id,
            ObjectName: this.data.object[this.data.objectIndex].name,
            PatientId: this.data.patientId
        };

        util.httpPost(app.globalData.urls.user.addPatientCourseEvaluate, postData, res => {
            //清除患教内容
            wx.removeStorageSync("contentCheckedList" + this.data.patientId);
            wx.redirectTo({
                url: "/pages/evaluate/hitory?patientId=" + this.data.patientId
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