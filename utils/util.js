function convertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(1);
        }
        else {
            array.push(0);
        }
    }
    return array;
}

function http(url, callBack,noShowMask) {
    if (!!!noShowMask) {
        wx.showLoading({
            title: '加载中',
        });
    }

    wx.request({
        url: url,
        method: 'GET',
        header: {
            "Content-Type": "json",
            'openId': '',
            'userId': getApp().globalData.user ? getApp().globalData.user.Id : "",
        },
        success: function (res) {
            callBack(res.data);
            if (!!!noShowMask) {
                wx.hideLoading();
            }
        },
        fail: function (error) {
            wx.showToast({
                title: '获取信息失败',
                icon: 'loading',
                duration: 1000
            });
            wx.hideLoading();
            console.log(error);
        }
    });
}

function app() {
    return getApp();
}

function httpPost(url, data, callBack, noShowMask) {
    if (!!!noShowMask) {
        wx.showLoading({
            title: '加载中',
        });
    }
    wx.request({
        url: url,
        method: 'POST',
        data: data,
        header: {
            'content-type': 'application/json',
            'openId': '',
            'userId': getApp().globalData.user ? getApp().globalData.user.Id:"",
        },
        success: function (res) {
            callBack(res.data);
            if (!!!noShowMask) {
                wx.hideLoading();
            }
        },
        fail: function (error) {
            wx.showToast({
                title: '获取信息失败',
                icon: 'loading',
                duration: 1000
            });
            wx.hideLoading();
            console.log(error);
        }
    });
}

function convertToCastString(casts) {
    var castsjoin = "";
    for (var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + " / ";
    }
    return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
    var castsArray = []
    for (var idx in casts) {
        var cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast);
    }
    return castsArray;
}

//需要查找原始对象,id,对应的选项索引值
function getIndexValue(orgValue, collect) {
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
}

function getNowFormatDate(newDate) {

    var date;
    if (newDate) {
        date = newDate;
    } else {
        date = new Date();
    }

    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    //+ " " + date.getHours() + seperator2 + date.getMinutes()
    //+ seperator2 + date.getSeconds();
    return currentdate;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
function formatDate (fmt,date) { //author: meizz 
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function jsGetAge(strBirthday) {
    if (!!!strBirthday) {
        return "";
    }

    var returnAge;
    var strBirthdayArr= strBirthday.split("-");  
    var birthYear = strBirthdayArr[0];  
    var birthMonth = strBirthdayArr[1];  
    var birthDay = strBirthdayArr[2];  
      
    var d = new Date();  
    var nowYear = d.getFullYear();  
    var nowMonth = d.getMonth() + 1;  
    var nowDay = d.getDate();  
      
    if(nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁  
    }  
    else{  
        var ageDiff = nowYear - birthYear ; //年之差  
        if(ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差  
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
            else {
                var monthDiff = nowMonth - birthMonth;//月之差  
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
        }  
        else  
        {  
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
        }
    }  
      
    return returnAge;//返回周岁年龄  

}


function getPreMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中月的天数  
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
        year2 = parseInt(year2) - 1;
        month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
}

/** 
 * 获取下一个月 
 * 
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25 
 */
function getNextMonth(date) {
    var arr = date.split('-');
    var year = arr[0]; //获取当前日期的年份  
    var month = arr[1]; //获取当前日期的月份  
    var day = arr[2]; //获取当前日期的日  
    var days = new Date(year, month, 0);
    days = days.getDate(); //获取当前日期中的月的天数  
    var year2 = year;
    var month2 = parseInt(month) + 1;
    if (month2 == 13) {
        year2 = parseInt(year2) + 1;
        month2 = 1;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
        day2 = days2;
    }
    if (month2 < 10) {
        month2 = '0' + month2;
    }

    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
} 

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http: http,
    httpPost: httpPost,
    convertToCastString: convertToCastString,
    convertToCastInfos: convertToCastInfos,
    getNowFormatDate: getNowFormatDate,
    app: app,
    getIndexValue: getIndexValue,
    jsGetAge: jsGetAge,
    getPreMonth: getPreMonth,
    formatDate: formatDate
}