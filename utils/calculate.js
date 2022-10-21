(function (global, calculate) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = calculate() :
        typeof define === 'function' && define.amd ? define(calculate) :
            (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.moonTime = calculate());
})(this, (function () {
    'use strict';

    const MAXYEAR = 2100;
    const MINYEAR = 2000;
    const MAXMONTH = 12;
    const MINMONTH = 1;
    const MAXDAY = 31;
    const MINDAY = 1;

    const time = [
        [2, 25, 30, '1-2-10-11', '3467'],
        [1, 7, 29, '12', '67', '4'],
        [2, 18, 29, '12-1-2', '78'],
        [2, 29, 30, '1245', '8-9-10-11'],
        [1, 10, 30, '34', '', '2'],
        [2, 21, 29, '67', '', ''],
        [1, 2, 29, '89', '', '7'],
        [2, 13, 30, '12-8-9-10', '1245', ''],
        [2, 23, 29, '12-1-9-10', '2356', ''],
        [1, 6, 30, '12', '3-4-5.-6', '5'],
        [2, 17, 30, '12-1', '67', ''],
        [2, 27, 29, '12-1-3-4', '78', ''],
        [1, 8, 29, '34', '', '4'],
        [2, 20, 30, '56', '', ''],
        [1, 0, 29, '89', '', '9'],
        [2, 11, 29, '789', '34', ''],
        [2, 22, 30, '89', '45', ''],
        [1, 4, 30, '', '56', '6'],
        [2, 15, 30, '12-0', '56', ''],
        [2, 26, 30, '12-1', '6-7-9-10', ''],
        [1, 7, 30, '234', '67', '4'],
        [2, 18, 29, '23', '', ''],
        [2, 29, 30, '56', '', ''],
        [1, 10, 30, '4578', '2.-3', '2'],
        [2, 20, 29, '7-8-10-11', '34', ''],
        [1, 2, 29, '9-10', '45', '6'],
        [1, 13, 30, '9-10', '4578', ''],
        [2, 24, 30, '1-2-10-11', '5689', ''],
        [1, 5, 29, '123', '5.-6-8-9', '5'],
        [2, 17, 30, '12', '9-10', ''],
        [2, 28, 30, '12-4-5', '', ''],
        [1, 8, 29, '2367', '1', '3'],
        [2, 19, 30, '6-7-9-10', '23', ''],
        [1, 1, 30, '9-10-11', '34', '11'],
        [2, 11, 29, '9-10', '34', ''],
        [2, 22, 29, '12-1-9-10', '4578', ''],
        [1, 4, 30, '12', '5678', '6'],
        [2, 16, 30, '12-1-2', '5689', ''],
        [2, 26, 29, '12-1-2', '9-10', ''],
        [1, 7, 29, '1245', '', '5'],
        [2, 17, 29, '3489', '12-0', ''],
        [2, 29, 30, '6-7-9-10', '12-1', ''],
        [1, 10, 30, '89', '2.-3', '2'],
        [2, 21, 30, '12-8-9', '3467', ''],
        [1, 2, 30, '1', '4-5-7.-7', '7'],
        [2, 14, 30, '12-1', '4578', ''],
        [2, 25, 30, '12-1', '89', ''],
        [1, 6, 30, '134', '89', '5'],
        [2, 16, 29, '2356', '9-10', ''],
        [2, 28, 30, '5689', '', ''],
        [1, 8, 29, '78', '', '3'],
        [2, 19, 30, '78', '2356', ''],
        [2, 30, 30, '12-9-10', '3467', '8'],
        [2, 12, 30, '12-0', '3467', ''],
        [2, 23, 30, '12-2-3', '4578', ''],
        [1, 4, 30, '23', '78', '6'],
        [2, 15, 30, '123', '89', ''],
        [2, 26, 29, '23', '', ''],
        [1, 7, 29, '6-7-9-10', '', '4'],
        [2, 17, 29, '9-10', '12-0', ''],
        [2, 28, 30, '9-10-11', '2356', ''],
        [1, 10, 29, '1-2-9-10', '3.-3-5-6', '3'],
        [2, 21, 30, '1-2-10-11', '3467', ''],
        [1, 2, 29, '12', '7.-7-', '7'],
        [2, 13, 29, '12-1-2', '78', ''],
        [2, 25, 30, '1245', '89', ''],
        [1, 6, 30, '45', '', '5'],
        [2, 16, 29, '67', '', ''],
        [2, 27, 30, '6-7-9-10', '45', ''],
        [1, 9, 30, '8-9-10', '4.-5', '4'],
        [2, 19, 29, '9-10', '56', ''],
        [1, 1, 30, '12-1', '67', '8'],
        [2, 12, 30, '12-1', '67', ''],
        [2, 23, 29, '12-1-3-4', '78', ''],
        [1, 4, 29, '34', '', '6'],
        [2, 15, 30, '56', '', ''],
        [2, 25, 29, '89', '', ''],
        [1, 7, 29, '789', '4.-4', '4'],
        [2, 18, 30, '89', '45', ''],
        [2, 29, 30, '12-0', '56', ''],
        [1, 10, 30, '1', '5689', '3'],
        [2, 22, 30, '12-2-3', '6-7-9-10', ''],
        [1, 3, 30, '234', '5-6-9-10', '7'],
        [2, 14, 30, '12-2-3', '', ''],
        [2, 24, 30, '56', '', ''],
        [1, 6, 30, '5.-5-7-8', '34', '5'],
        [2, 16, 29, '78', '34', ''],
        [2, 27, 30, '10-11', '45', ''],
        [1, 8, 30, '9-10', '4.-5-7-8', '4'],
        [2, 20, 30, '12', '567', ''],
        [1, 1, 29, '123', '6-7-8.-9', '8'],
        [2, 12, 30, '12', '9-10', ''],
        [2, 23, 30, '1245', '', ''],
        [1, 4, 29, '2-3-6.-7', '1', '6'],
        [2, 15, 30, '6-7-9-10', '12-1', ''],
        [2, 25, 29, '9-10-11', '34', ''],
        [1, 6, 29, '8-9-10', '4.-4-6-7', '4'],
        [2, 18, 29, '12-1-9-10', '456', ''],
        [2, 29, 29, '12-1-2', '567', ''],
        [1, 11, 30, '1234', '5689', '2'],
        [2, 21, 29, '12-1-2', '9-10', '']
    ]

    let zodiacYear = function (year) {
        var zodiac = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
        return zodiac[year % 12];
    }

    var lunarYearMeth = function (year) {
        var gan = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            zhi = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'],
            str = year.toString().split("");
        return gan[str[3]] + zhi[year % 12];
    }

    var chineseNumber = function (num) {
        var res;
        var dateHash = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        if (num <= 10) {
            res = '初' + dateHash[num];
        } else if (num > 10 && num < 20) {
            res = '十' + dateHash[num - 10];
        } else if (num == 20) {
            res = "二十";
        } else if (num > 20 && num < 30) {
            res = "廿" + dateHash[num - 20];
        } else if (num == 30) {
            res = "三十";
        }
        return res;
    }

    var chineseMonth = function (num, bool) {
        var res;
        var dateHash = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        if (num <= 10) {
            res = dateHash[num];
        } else if (num > 10 && num < 20) {
            res = '十' + dateHash[num - 10];
        }
        return (bool ? '闰' : '') + res + '月';
    }

    var getConsecutiveMonths = function (msg) {

        if (!msg) return [];

        if (String(msg).indexOf('-') != -1) {

            return String(msg).split('-')

        } else {
            let str = String(msg);

            let arr = []

            for (let i = 0; i < str.length; i++) {

                arr.push(str[i])

            }
            return arr;
        }
    }
    function calculate(obj) {

        if (typeof obj == 'object' && !Array.isArray(obj)) {

        } else {
            throw 'Only receive object type data'
        }

        if (obj.year > MAXYEAR || obj.year < MINYEAR || obj.month > MAXMONTH || obj.month < MINMONTH || obj.day > MAXDAY || obj.day < MINDAY) {

            throw 'Only receive data from 2000-2100, 1-12 months, 1-31 days'

        }

        let theYear = (obj.year) % MINYEAR;

        let ruleArr = time[theYear]

        let nowDay = parseInt((new Date(`${obj.year}/${obj.month}/${obj.day}`) - new Date(`${obj.year}/1/1`)) / (24 * 60 * 60 * 1000)) + 1

        let nowYear = ruleArr[0] > 0 ? obj.year-- : obj.year

        let month = 12 + 1 - ruleArr[0];

        let oldDay = ruleArr[2] - ruleArr[1] + 1;

        let thirtyMon = getConsecutiveMonths(ruleArr[3]);

        let twentyNineMon = getConsecutiveMonths(ruleArr[4]);

        let nowMonth = 0;

        let isThirty = ruleArr[2] == 30 ? true : false

        let leapMonth = ruleArr[5] ? ruleArr[5] : undefined;

        let isLeapMonth = false;

        let getMonth = function () {

            if (month + 1 > 12) {

                obj.year += 1;

                month = 1;

                isLeapMonth = false;

            } else if (leapMonth) {

                if (month == leapMonth) {

                    obj.leapMonth = month;

                    leapMonth = null;

                    isLeapMonth = true;

                } else {

                    month += 1;

                    isLeapMonth = false;

                }
            } else {

                month += 1;

                isLeapMonth = false;

            }
        }

        let getIsThirty = function () {

            if (thirtyMon.find(e => e == month)) {

                if (isLeapMonth) {

                    if (thirtyMon.find(e => String(e) == String(month + '.'))) {

                        isThirty = true;

                    } else {

                        isThirty = !isThirty;

                    }
                } else if (thirtyMon.find(e => String(e) == String(month))) {

                    isThirty = true;

                } else {

                    isThirty = !isThirty;

                }
            } else if (ruleArr[4] && twentyNineMon.find(e => e == month)) {

                if (isLeapMonth) {

                    if (twentyNineMon.find(e => String(e) == String(month + '.'))) {

                        isThirty = false;

                    } else {

                        isThirty = !isThirty;

                    }
                } else if (twentyNineMon.find(e => String(e) == String(month))) {

                    isThirty = false;

                } else {

                    isThirty = !isThirty;

                }
            } else {

                isThirty = !isThirty;

            }
        }

        let clear = function () {

            getMonth = null;

            getIsThirty = null;
        }

        if (nowDay > oldDay) {

            nowDay -= oldDay;

            if (month + 1 > 12) {

                obj.year += 1;

                month = 1;

            } else {

                month += 1;

            }

            getIsThirty();

            while (true) {

                //30/29
                if (nowDay > (isThirty ? 30 : 29)) {

                    nowDay -= (isThirty ? 30 : 29)

                    getMonth();

                    getIsThirty();

                } else {
                    break;
                }
            }

            clear();
            clear = null;

            return Object.assign(obj, {

                month: month <= obj.leapMonth ? '闰' + obj.leapMonth : month,

                day: nowDay,

                zodiac: zodiacYear(obj.year),

                lunarYear: lunarYearMeth(obj.year),

                dayC: chineseNumber(nowDay),

                monthC: chineseMonth(month, obj.leapMonth)

            })
        } else {

            clear();
            clear = null;

            return Object.assign(obj, {

                month,

                day: ruleArr[1] + nowDay - 1,

                zodiac: zodiacYear(obj.year),

                lunarYear: lunarYearMeth(obj.year),

                dayC: chineseNumber(ruleArr[1] + nowDay - 1),

                monthC: chineseMonth(month)

            })
        }
    }

    return calculate;

}))