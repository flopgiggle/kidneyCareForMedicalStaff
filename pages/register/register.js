// pages/register/register.js
var app = getApp();
var util = require('../../utils/util.js');
//var lodash = require('../../utils/lodash.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        sex: [{ UserName: '男', Id: '0' }, { UserName: '女', Id: '1' }],
        jobTitle: [{ UserName: '住院医师', Id: '1' }, { UserName: '主治医师', Id: '2' }, { UserName: '副主任医师', Id: '3' }, { UserName: '主任医师', Id: '4' },
                   { UserName: '初级护士', Id: '10' }, { UserName: '初级护师', Id: '11' }, { UserName: '主管护师', Id: '12' }, { UserName: '副主任护师', Id: '13' }, { UserName: '主任护师', Id: '14' }],
        duty: [{ UserName: '医生', Id: '2' }, { UserName: '护士', Id: '3' }],
        disease: [{ Name: '肾衰竭', Id: '1' }, { Name: '肾小球肾炎', Id: '2' }],
        CKD: [{ Name: 'I期', Id: '1' }, { Name: 'II期', Id: '2' }, { Name: 'III期', Id: '3' }, { Name: 'IV期', Id: '4' }, { Name: 'V期', Id: '5' }],
        sexIndex: -1,
        jobTitleIndex: -1,
        dutyIndex: -1,
        CKDIndex: -1,
        diseaseIndex: -1,
        birthday: '2017-01-01',
        multiArray: [['四川省', '云南省'], ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'], ['四川大学华西医院', '省医院']],
        multiIndex: [0, 0, 0],
        userInfo: {},
    },
    //需要查找原始对象,id,对应的选项索引值
    getIndexValue: function(orgValue,collect) {
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
    bindDiseaseChange: function (e) {
        this.setData({
            diseaseIndex: e.detail.value
        });
    },
    bindCKDChange: function (e) {
        this.setData({
            CKDIndex: e.detail.value
        });
    },
    bindJobChange: function (e) {
        this.setData({
            jobTitleIndex: e.detail.value
        });
    },
    bindDutyChange: function (e) {

        this.setData({
            dutyIndex: e.detail.value
        });
    },
    bindSexChange: function (e) {
        this.setData({
            sexIndex: e.detail.value
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
            birthday: e.detail.value
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

        var userId = "";
        var url = "";
        if (app.globalData.user && app.globalData.user.Id) {
            userId = app.globalData.user.Id;
            url = app.globalData.urls.user.updateProfile;
        } else {
            url = app.globalData.urls.user.regist;
        }

        var postData = {
            UserName: e.detail.value.name,
            MobilePhone: e.detail.value.phoneNum,
            BelongToHospital: 1,
            Sex: this.data.sex[this.data.sexIndex].Id,
            UserType: this.data.duty[this.data.dutyIndex].Id,
            IdCard: e.detail.value.idCard,
            OpenId: app.globalData.openId,
            JobTitle: this.data.jobTitle[this.data.jobTitleIndex].Id,
            UserId: userId
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

        util.httpPost(url, postData, res => {
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
        if (app.globalData.user.userType == 2) {

        }

        if (app.globalData.user.userType == 3) {

        }
        this.setData({
                userInfo: app.globalData.user,
                sexIndex: this.getIndexValue(app.globalData.user.Sex, this.data.sex),
                birthday: app.globalData.user.Birthday ? app.globalData.user.Birthday : '2017-01-01',
                dutyIndex: this.getIndexValue(app.globalData.user.UserType, this.data.duty),
                jobTitleIndex: this.getIndexValue(app.globalData.user.JobTitle, this.data.jobTitle)
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