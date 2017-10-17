//program run mode
//1.product for onlie product environment 
//2.test for onlie test environment
//3.local for local debug enviromnet
var runMode = "local";
var util = require('utils/util.js');
var _ = require('utils/undercore.js');
var host = {
    product: "https://30861365.qcloud.la",
    test: "https://77964003.qcloud.la",
    local: "http://localhost:11662",
}
var openId = {
    product: "",
    test: "",
    local: "ov3Ig0RPltiiQn9kLVcxwIVsj_RU",
}
var baseUri = host[runMode] + "/api/";
App({
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        doubanBase: "https://api.douban.com",
        host: host[runMode],
        picUrl: host + "/upload/",
        openId: openId[runMode],
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
                sendfeedback: baseUri + "message/sendfeedback",
            },
            drugs: {
                getAllDrugs: baseUri + "drugs/getAllDrugs",
                savePatientDrugs: baseUri + "drugs/savePatientDrugs",
                getHistoryDrugs: baseUri + "drugs/getHistoryDrugs/",
            },
            course: {
                createCourse: baseUri + "course/createCourse",
                uploadPic: baseUri + "course/uploadPic",
                uploadPPT: baseUri + "course/uploadPPT",
                getCourseList: baseUri + "course/getCourseList",
            }

        }
    },
    onLaunch: function() {

    }
});

