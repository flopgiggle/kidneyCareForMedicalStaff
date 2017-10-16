var sourceType = [['camera'], ['album'], ['camera', 'album']]
var sizeType = [['compressed'], ['original'], ['compressed', 'original']]
var app = getApp();
var util = require('../../utils/util.js');
// pages/uploadReport/uploadReport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        reportTypeIndex: -1,
        startTime: "14:00",
        endTime: "16:00",
        reportTypeId: -1,
        date: util.getNowFormatDate(),
        count: [1, 2, 3],
        countIndex: 2,
        imageList: []
    },
    bindReportTypeChange: function (e) {
        this.setData({
            reportTypeIndex: e.detail.value,
            reportTypeId: this.data.reportType[e.detail.value].Id
        });
    },
    chooseImage: function () {
        var that = this;
        wx.chooseImage({
            sourceType: sourceType[this.data.sourceTypeIndex],
            sizeType: sizeType[this.data.sizeTypeIndex],
            count: 5,
            success: function (res) {
                console.log(res);
                that.setData({
                    imageList: res.tempFilePaths
                });



            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        Date.prototype.Format = function (fmt) { //author: meizz
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(), 
                "h+": this.getHours(), 
                "m+": this.getMinutes(), 
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3), 
                "S": this.getMilliseconds() 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    },
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);

        if (this.data.reportTypeId == -1) {
            wx.showModal({
                title: '提示',
                content: '请选择报告类型',
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
            CourseName: e.detail.value.CourseName,
            Address: e.detail.value.Address,
            Date: this.data.date,
            StartTime: this.data.startTime,
            EndTime: this.data.endTime,
            Speaker: e.detail.value.Speaker,
            SpeakerInfo: e.detail.value.SpeakerInfo,
            CourseContent: e.detail.value.CourseContent,
            Type: 0,
            PicUrl: e.detail.value.PicUrl,
            PPTUrl: e.detail.value.PPTUrl,
        };
        util.httpPost(app.globalData.urls.course.createCourse, postData, res => {
            if (res.IsSuccess) {
                //开始上传图片
                if (this.data.imageList && this.data.imageList.length > 0) {
                    var reportId = res.Result;
                    this.uploadimg({
                        url: app.globalData.host+"/UploadHandler.ashx",
                        path: this.data.imageList,//这里是选取的图片的地址数组,
                        formData: {
                            'reportId': reportId
                        }
                    });
                }
            }
            
            wx.switchTab({
                url: "/pages/currentDayInfo/currentDayInfo"
            });
        });
        //e.detail.value.name;
        //e.detail.value.illInfo;
    },

    //多张图片上传
    uploadimg: function (data){
        var that= this,
            i=data.i ? data.i : 0,
            success=data.success ? data.success : 0,
            fail=data.fail ? data.fail : 0;

        wx.uploadFile({
            url: data.url,
            filePath: data.path[i],
            name: 'fileData',
            formData: { ...data.formData,num:i} ,
            success: (resp) => {
                success++;
                console.log(resp);
                console.log(i);
                //这里可能有BUG，失败也会执行这里
            },
            fail: (res) => {
                fail++;
                console.log('fail:' + i + "fail:" + fail);
            },
            complete: () => {
                console.log(i);
                i++;
                if (i === data.path.length) {   //当图片传完时，停止调用          
                    console.log('执行完毕');
                    console.log('成功：' + success + " 失败：" + fail);
                } else {
                    //若图片还没有传完，则继续调用函数
                    console.log(i);
                    data.i = i;
                    data.success = success;
                    data.fail = fail;
                    that.uploadimg(data);
                }

            }
        });
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            date: e.detail.value
        });
    },
    bindStartTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            startTime: e.detail.value
        });
    },
    bindEndTimeChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        this.setData({
            endTime: e.detail.value
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