var util = require('utils/util.js');
var host = "http://localhost:11662";
//var host = "https://30861365.qcloud.la";
var baseUri = host+"/api/";
App({
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        doubanBase: "https://api.douban.com",
        host: host,
        picUrl: host + "/upload/",
        openId: "oSqUB0XRxeZzn-iTpaXkenjXV0hE",
        //openId: "",
        patientAlreadyBind:"111",
        user: "",
        wxUserInfo:"",
        urls: {
            user: {
                regist: baseUri + "user/regist",
                update: baseUri + "user/updateUserInfo",
                getCurrentDayInfoList: baseUri + "user/getCurrentDayInfoList/",
                reportChart: baseUri + "user/getReportHistory/",
                recordChart: baseUri + "user/getMyRecordHistory/",
                getUserForMedical: baseUri + "user/getUserForMedical/",
                getPatientList: baseUri + "user/getPatientList",
                getPatientInfo: baseUri + "user/getPatientInfo",
                updatePatientDisease: baseUri + "user/updatePatientDisease",
                getMyRecordHistoryByPatientId: baseUri + "user/getMyRecordHistoryByPatientId/",
                getReportHistoryByPatientId: baseUri + "user/getReportHistoryByPatientId/",
                addPatientCourseEvaluate: baseUri + "user/addPatientCourseEvaluate/",
                getPatientCourseEvaluate: baseUri + "user/getPatientCourseEvaluate/",
                updateProfile: baseUri + "user/updateProfile", 
                getExcpetRecordInfoList: baseUri + "user/getExcpetRecordInfoList/", 
                getHospitalSelectInfo: baseUri + "user/getHospitalSelectInfo/"
            },
            record: {
                add: baseUri + "record/add",
            },
            addReport: {
                add: baseUri + "record/addReport",
            },
            message: {
                sendMessage: baseUri + "message/sendMessage",
                getMessage: baseUri + "message/getMessage",
                getMessageForPatient: baseUri + "message/getMessageForPatient",
            }

        }
    },
    onLaunch: function() {
        //wx.login({
        //    success: res => {
        //       // "http://localhost:11662/";
        //        var url = baseUri + "user/getUserInfo/" +
        //            res.code; //"https://api.weixin.qq.com/sns/jscode2session?appid=wx941fffa48c073a0d&secret=1b71efd31775ec025045185b951e0296&js_code=" + res.code + "&grant_type=authorization_code";
        //        //util.http(url,
        //        //    res => {
        //        //        this.globalData.openId = 1234567;
        //        //        this.globalData.user = res.Result;
        //        //        //判定用户是否已注册,未注册则不能使用该app，需要跳转到注册页面
        //        //        if (this.globalData.user.Status === 0 || this.globalData.user.Status == null) {
        //        //            wx.navigateTo({
        //        //                url: "/pages/register/register"
        //        //            });
        //        //        } else {
        //        //            wx.switchTab({
        //        //                url: "/pages/currentDayInfo/currentDayInfo"
        //        //            });
        //        //        }
        //        //    });
        //    }
        //});
    }
});

