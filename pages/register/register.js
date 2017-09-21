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
        jobTitleForDoctor: [{ UserName: '住院医师', Id: '1' }, { UserName: '主治医师', Id: '2' }, { UserName: '副主任医师', Id: '3' }, { UserName: '主任医师', Id: '4' }],
        jobTitleForNures: [{ UserName: '初级护士', Id: '10' }, { UserName: '初级护师', Id: '11' }, { UserName: '主管护师', Id: '12' }, { UserName: '副主任护师', Id: '13' }, { UserName: '主任护师', Id: '14' }],
        jobTitle: [{ UserName: '住院医师', Id: '1' }, { UserName: '主治医师', Id: '2' }, { UserName: '副主任医师', Id: '3' }, { UserName: '主任医师', Id: '4' }],
        duty: [{ UserName: '医生', Id: '2' }, { UserName: '护士', Id: '3' }],
        disease: [{ Name: '肾衰竭', Id: '1' }, { Name: '肾小球肾炎', Id: '2' }],
        CKD: [{ Name: '1期', Id: '1' }, { Name: '2期', Id: '2' }, { Name: '3期', Id: '3' }, { Name: '4期', Id: '4' }, { Name: '5期', Id: '5' }],
        sexIndex: -1,
        jobTitleIndex: -1,
        dutyIndex: -1,
        CKDIndex: -1,
        diseaseIndex: -1,
        birthday: '2017-01-01',
        multiArray: [['四川省', '云南省'], ['成都市', '绵阳市', '德阳市', '攀枝花市', '宜宾市'], ['四川大学华西医院', '省医院']],
        multiIndex: [0, 0, 0],
        userInfo: {},
        disabled:false,
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
        var jobTitle = [];
        if (e.detail.value == 0) {
            jobTitle = this.data.jobTitleForDoctor;
        } else {
            jobTitle = this.data.jobTitleForNures;
        }

        this.setData({
            jobTitle: jobTitle,
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
    getHospitalSelectInfo: function (province, city) {
        var url = app.globalData.urls.user.getHospitalSelectInfo + province + "/" + city;
        util.http(url,
            res => {
                var result = JSON.parse(res.Result);
                //result.allDoctors.push({ UserName: '未收录', Id: '-100' });
                //result.allNurses.push({ UserName: '未收录', Id: '-100' });
                this.setData({
                    multiArray: [result.provinces, result.citys, result.hospital],
                });
            });
    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        var provice = this.data.multiIndex[0];
        var city = this.data.multiIndex[1];
        var hospital = this.data.multiIndex[2];
        if (e.detail.column == 0) {
            provice = e.detail.value;
        }

        if (e.detail.column == 1) {
            city = e.detail.value;
        }

        if (e.detail.column == 2) {
            hospital = e.detail.value;
        }

        var provicesIndex = this.data.multiArray[0][provice].Id;
        var cityIndex = this.data.multiArray[1][city].Id;
        if (e.detail.column != 2) {
            this.getHospitalSelectInfo(provicesIndex, cityIndex);
        }
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiIndex: [provice, city, hospital]
        };
        this.setData(data);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //默认查询四川成都地区的医院
        this.getHospitalSelectInfo("510000", "510100");
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);
        console.log(e.detail.value.phoneNum);
        //UserName Password UserType BelongToHospital Sex MobilePhone Birthday OpenId Status BelongToNurse BelongToDoctor
        if (e.detail.value.name.length < 2) {
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
            BelongToHospital: this.data.multiArray[2][this.data.multiIndex[2]].Id,
            Sex: this.data.sex[this.data.sexIndex].Id,
            UserType: this.data.duty[this.data.dutyIndex].Id,
            IdCard: e.detail.value.idCard,
            OpenId: app.globalData.openId,
            JobTitle: this.data.jobTitle[this.data.jobTitleIndex].Id,
            UserId: userId,
            Profile: e.detail.value.profile,
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

        if (app.globalData.user.UserType) {
            wx.setNavigationBarTitle({
                title: '个人档案'
            })
            var jobTitle = [];
            if (app.globalData.user.UserType == 2) {
                jobTitle = this.data.jobTitleForDoctor;
            } else {
                jobTitle = this.data.jobTitleForNures;
            }
            this.setData({
                jobTitle: jobTitle,
            });
        }

        this.setData({
                userInfo: app.globalData.user,
                sexIndex: this.getIndexValue(app.globalData.user.Sex, this.data.sex),
                birthday: app.globalData.user.Birthday ? app.globalData.user.Birthday : '2017-01-01',
                dutyIndex: this.getIndexValue(app.globalData.user.UserType, this.data.duty),
                jobTitleIndex: this.getIndexValue(app.globalData.user.JobTitle, this.data.jobTitle),
                disabled: app.globalData.user.UserType?true:false,
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