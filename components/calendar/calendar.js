Component({
  //初始默认为当前日期
  properties: {
    defaultValue: {
      type: String,
      value: ''
    },
    //星期数组
    weekText: {
      type: Array,
      value: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    },
    lastMonth: {
      type: String,
      value: '◀'
    },
    nextMonth: {
      type: String,
      value: '▶'
    }
  },

  // 组件的初始数据
  data: {
    //当月格子
    thisMonthDays: [],
    //上月格子
    empytGridsBefore: [],
    //下月格子
    empytGridsAfter: [],
    //显示日期
    title: '',
    //格式化日期
    format: '',

    year: 0,
    month: 0,
    date: 0,
    toggleType: 'large',
    scrollLeft: 0,
    //常量 用于匹配是否为当天
    YEAR: 0,
    MONTH: 0,
    DATE: 0,

    MIN_YEAR: 1891,
    MAX_YEAR: 2100,
    lunarInfo: [
      [0, 2, 9, 21936], [6, 1, 30, 9656], [0, 2, 17, 9584], [0, 2, 6, 21168], [5, 1, 26, 43344], [0, 2, 13, 59728],
      [0, 2, 2, 27296], [3, 1, 22, 44368], [0, 2, 10, 43856], [8, 1, 30, 19304], [0, 2, 19, 19168], [0, 2, 8, 42352],
      [5, 1, 29, 21096], [0, 2, 16, 53856], [0, 2, 4, 55632], [4, 1, 25, 27304], [0, 2, 13, 22176], [0, 2, 2, 39632],
      [2, 1, 22, 19176], [0, 2, 10, 19168], [6, 1, 30, 42200], [0, 2, 18, 42192], [0, 2, 6, 53840], [5, 1, 26, 54568],
      [0, 2, 14, 46400], [0, 2, 3, 54944], [2, 1, 23, 38608], [0, 2, 11, 38320], [7, 2, 1, 18872], [0, 2, 20, 18800],
      [0, 2, 8, 42160], [5, 1, 28, 45656], [0, 2, 16, 27216], [0, 2, 5, 27968], [4, 1, 24, 44456], [0, 2, 13, 11104],
      [0, 2, 2, 38256], [2, 1, 23, 18808], [0, 2, 10, 18800], [6, 1, 30, 25776], [0, 2, 17, 54432], [0, 2, 6, 59984],
      [5, 1, 26, 27976], [0, 2, 14, 23248], [0, 2, 4, 11104], [3, 1, 24, 37744], [0, 2, 11, 37600], [7, 1, 31, 51560],
      [0, 2, 19, 51536], [0, 2, 8, 54432], [6, 1, 27, 55888], [0, 2, 15, 46416], [0, 2, 5, 22176], [4, 1, 25, 43736],
      [0, 2, 13, 9680], [0, 2, 2, 37584], [2, 1, 22, 51544], [0, 2, 10, 43344], [7, 1, 29, 46248], [0, 2, 17, 27808],
      [0, 2, 6, 46416], [5, 1, 27, 21928], [0, 2, 14, 19872], [0, 2, 3, 42416], [3, 1, 24, 21176], [0, 2, 12, 21168],
      [8, 1, 31, 43344], [0, 2, 18, 59728], [0, 2, 8, 27296], [6, 1, 28, 44368], [0, 2, 15, 43856], [0, 2, 5, 19296],
      [4, 1, 25, 42352], [0, 2, 13, 42352], [0, 2, 2, 21088], [3, 1, 21, 59696], [0, 2, 9, 55632], [7, 1, 30, 23208],
      [0, 2, 17, 22176], [0, 2, 6, 38608], [5, 1, 27, 19176], [0, 2, 15, 19152], [0, 2, 3, 42192], [4, 1, 23, 53864],
      [0, 2, 11, 53840], [8, 1, 31, 54568], [0, 2, 18, 46400], [0, 2, 7, 46752], [6, 1, 28, 38608], [0, 2, 16, 38320],
      [0, 2, 5, 18864], [4, 1, 25, 42168], [0, 2, 13, 42160], [10, 2, 2, 45656], [0, 2, 20, 27216], [0, 2, 9, 27968],
      [6, 1, 29, 44448], [0, 2, 17, 43872], [0, 2, 6, 38256], [5, 1, 27, 18808], [0, 2, 15, 18800], [0, 2, 4, 25776],
      [3, 1, 23, 27216], [0, 2, 10, 59984], [8, 1, 31, 27432], [0, 2, 19, 23232], [0, 2, 7, 43872], [5, 1, 28, 37736],
      [0, 2, 16, 37600], [0, 2, 5, 51552], [4, 1, 24, 54440], [0, 2, 12, 54432], [0, 2, 1, 55888], [2, 1, 22, 23208],
      [0, 2, 9, 22176], [7, 1, 29, 43736], [0, 2, 18, 9680], [0, 2, 7, 37584], [5, 1, 26, 51544], [0, 2, 14, 43344],
      [0, 2, 3, 46240], [4, 1, 23, 46416], [0, 2, 10, 44368], [9, 1, 31, 21928], [0, 2, 19, 19360], [0, 2, 8, 42416],
      [6, 1, 28, 21176], [0, 2, 16, 21168], [0, 2, 5, 43312], [4, 1, 25, 29864], [0, 2, 12, 27296], [0, 2, 1, 44368],
      [2, 1, 22, 19880], [0, 2, 10, 19296], [6, 1, 29, 42352], [0, 2, 17, 42208], [0, 2, 6, 53856], [5, 1, 26, 59696],
      [0, 2, 13, 54576], [0, 2, 3, 23200], [3, 1, 23, 27472], [0, 2, 11, 38608], [11, 1, 31, 19176], [0, 2, 19, 19152],
      [0, 2, 8, 42192], [6, 1, 28, 53848], [0, 2, 15, 53840], [0, 2, 4, 54560], [5, 1, 24, 55968], [0, 2, 12, 46496],
      [0, 2, 1, 22224], [2, 1, 22, 19160], [0, 2, 10, 18864], [7, 1, 30, 42168], [0, 2, 17, 42160], [0, 2, 6, 43600],
      [5, 1, 26, 46376], [0, 2, 14, 27936], [0, 2, 2, 44448], [3, 1, 23, 21936], [0, 2, 11, 37744], [8, 2, 1, 18808],
      [0, 2, 19, 18800], [0, 2, 8, 25776], [6, 1, 28, 27216], [0, 2, 15, 59984], [0, 2, 4, 27424], [4, 1, 24, 43872],
      [0, 2, 12, 43744], [0, 2, 2, 37600], [3, 1, 21, 51568], [0, 2, 9, 51552], [7, 1, 29, 54440], [0, 2, 17, 54432],
      [0, 2, 5, 55888], [5, 1, 26, 23208], [0, 2, 14, 22176], [0, 2, 3, 42704], [4, 1, 23, 21224], [0, 2, 11, 21200],
      [8, 1, 31, 43352], [0, 2, 19, 43344], [0, 2, 7, 46240], [6, 1, 27, 46416], [0, 2, 15, 44368], [0, 2, 5, 21920],
      [4, 1, 24, 42448], [0, 2, 12, 42416], [0, 2, 2, 21168], [3, 1, 22, 43320], [0, 2, 9, 26928], [7, 1, 29, 29336],
      [0, 2, 17, 27296], [0, 2, 6, 44368], [5, 1, 26, 19880], [0, 2, 14, 19296], [0, 2, 3, 42352], [4, 1, 24, 21104],
      [0, 2, 10, 53856], [8, 1, 30, 59696], [0, 2, 18, 54560], [0, 2, 7, 55968], [6, 1, 27, 27472], [0, 2, 15, 22224],
      [0, 2, 5, 19168], [4, 1, 25, 42216], [0, 2, 12, 42192], [0, 2, 1, 53584], [2, 1, 21, 55592], [0, 2, 9, 54560]
    ],
  },
  ready: function () {
    this.today();
  },

  methods: {


    //计算2个阳历日期之间的天数
    //@param year 阳历年
    //@param month
    //@param day
    //@param l_month 阴历正月对应的阳历月份
    //@param l_day  阴历初一对应的阳历天
    betweenSolarDays: function (year, month, day, l_month, l_day) {
      var time1 = new Date(year + "-" + month + "-" + day).getTime(),
        time2 = new Date(year + "-" + l_month + "-" + l_day).getTime();
      return Math.ceil((time1 - time2) / 24 / 3600 / 1000);
    },
    lunarYearMonths: function (year) {
      var monthData = this.lunarMonths(year);
      var res = [];
      var temp = 0;
      var yearData = this.data.lunarInfo[year - this.data.MIN_YEAR];
      var len = (yearData[0] == 0 ? 12 : 13);
      for (var i = 0; i < len; i++) {
        temp = 0;
        for (var j = 0; j <= i; j++) {
          temp += monthData[j];
        }
        res.push(temp);
      }
      return res;
    },
    //农历月份天数数组
    lunarMonths: function (year) {
      var yearData = this.data.lunarInfo[year - this.data.MIN_YEAR];
      var leapMonth = yearData[0];
      var bit = (+yearData[3]).toString(2);
      var months = [];
      for (var i = 0; i < bit.length; i++) {
        months[i] = bit.substr(i, 1);
      }

      for (var k = 0, len = 16 - months.length; k < len; k++) {
        months.unshift('0');
      }

      months = months.slice(0, (leapMonth == 0 ? 12 : 13));
      for (var i = 0; i < months.length; i++) {
        months[i] = +months[i] + 29;
      }
      return months;
    },
    //获取闰月
    //@param year 农历年份
    leapMonth: function (year) {
      var yearData = this.data.lunarInfo[year - this.data.MIN_YEAR];
      return yearData[0];
    },
    //农历每年的天数
    //@param year 农历年份
    lunarYearDays: function (year) {
      var monthArray = this.lunarYearMonths(year);
      var len = monthArray.length;
      return (monthArray[len - 1] == 0 ? monthArray[len - 2] : monthArray[len - 1]);
    },
    //中文月份
    chineseMonth: function (month) {
      var monthHash = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
      return monthHash[month];
    },
    //天干地支年
    lunarYear: function (year) {
      var gan = ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
        zhi = ['申', '酉', '戌', '亥', '子', '丑', '寅', '卯', '辰', '巳', '午', '未'],
        str = year.toString().split("");
      return gan[str[3]] + zhi[year % 12];
    },
    //生肖年
    zodiacYear: function (year) {
      var zodiac = ['猴', '鸡', '狗', '猪', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊'];
      return zodiac[year % 12];
    },
    //中文日期
    chineseNumber: function (num) {
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
    },


    getMsg: function (year, month, day) {

      var yearData = this.data.lunarInfo[year - this.data.MIN_YEAR];

      if (2020 == this.MIN_YEAR && month <= 2 && day <= 9) {
        return [1891, 1, 1, '辛卯', '兔', '正月', '初一'];
      }

      return this.getValue(2020, this.betweenSolarDays(year, month, day, yearData[1], yearData[2]));
    },

    //根据距离正月初一的天数计算阴历日期
    //@param year 阳历年
    //@param between 天数
    getValue: function (year, between) {
      var lunarArray = [], yearMonth = [], t = 0, e = 0, leapMonth = 0, m = '';
      if (between == 0) {
        t = 1;
        e = 1;
        m = '正月';
      } else {
        year = between > 0 ? year : (year - 1);
        yearMonth = this.lunarYearMonths(year);
        leapMonth = this.leapMonth(year);
        between = between > 0 ? between : (this.lunarYearDays(year) + between);
        for (var i = 0; i < 13; i++) {
          if (between == yearMonth[i]) {
            t = i + 2;
            e = 1;
            break;
          } else if (between < yearMonth[i]) {
            t = i + 1;
            e = between - ((yearMonth[i - 1]) ? yearMonth[i - 1] : 0) + 1;
            break;
          }
        }

        m = (leapMonth != 0 && t == leapMonth + 1)
          ? ('闰'==this.chineseMonth(t - 1))
          : this.chineseMonth(((leapMonth != 0 && leapMonth + 1 < t) ? (t - 1) : t));
      }
      lunarArray.push(year, t, e); //年 月 日
      lunarArray.push(this.lunarYear(year),
        this.zodiacYear(year),
        m,
        this.chineseNumber(e)); //天干地支年 生肖年 月份 日
      lunarArray.push(leapMonth); //闰几月
      return lunarArray;
    },


    //滚动模式
    //当年当月当天 滚动到制定日期 否则滚动到当月1日
    scrollCalendar(year, month, date) {
      console.log(year, month, date)
      var lunarday = this.getMsg(year, month, date);
      var that = this, scrollLeft = 0;
      wx.getSystemInfo({
        success(res) {
          //切换月份时 date为0
          if (date == 0) {
            scrollLeft = 0;
            //切换到当年当月 滚动到当日
            if (year == that.data.YEAR && month == that.data.MONTH) {
              scrollLeft = that.data.DATE * 45 - res.windowWidth / 2 - 22.5;
            }
          } else {
            // 点选具体某一天 滚到到指定日期
            scrollLeft = date * 45 - res.windowWidth / 2 - 22.5;
          }

          that.setData({
            scrollLeft: scrollLeft,
            thedayLunarday: lunarday[3] + "年 " + lunarday[5] + lunarday[6]
          })
        }
      })
    },

    //初始化
    display: function (year, month, date) {
      this.setData({
        year,
        month,
        date,
        title: year + '年' + this.zero(month) + '月'
      })
      this.createDays(year, month);
      this.createEmptyGrids(year, month);

      //滚动模糊 初始界面
      this.scrollCalendar(year, month, date);
    },
    //默认选中当天 并初始化组件
    today: function () {

      let DATE = this.data.defaultValue ? new Date(this.data.defaultValue) : new Date(),

        year = DATE.getFullYear(),
        month = DATE.getMonth() + 1,
        date = DATE.getDate(),
        select = year + '-' + this.zero(month) + '-' + this.zero(date);

      var lunarday = this.getMsg(year, month, date);

      this.setData({
        format: select,
        select: select,
        year: year,
        month: month,
        date: date,
        YEAR: year,
        MONTH: month,
        DATE: date,
        thedayLunarday: lunarday[3] + "年 " + lunarday[5] + lunarday[6]
      })

      console.log(this.data.thedayLunarday);

      //初始化日历组件UI
      this.display(year, month, date);
    },

    //选择 并格式化数据
    select: function (e) {
      let date = e.currentTarget.dataset.date,
        select = this.data.year + '-' + this.zero(this.data.month) + '-' + this.zero(date);

      this.setData({
        title: this.data.year + '年' + this.zero(this.data.month) + '月' + this.zero(date) + '日',
        select: select,
        year: this.data.year,
        month: this.data.month,
        date: date,
      });

      //滚动日历到选中日期
      this.scrollCalendar(this.data.year, this.data.month, date);
    },
    //上个月
    lastMonth: function () {
      let month = this.data.month == 1 ? 12 : this.data.month - 1;
      let year = this.data.month == 1 ? this.data.year - 1 : this.data.year;
      //初始化日历组件UI
      this.display(year, month, 0);
    },
    //下个月
    nextMonth: function () {
      let month = this.data.month == 12 ? 1 : this.data.month + 1;
      let year = this.data.month == 12 ? this.data.year + 1 : this.data.year;
      //初始化日历组件UI
      this.display(year, month, 0);
    },
    //获取当月天数
    getThisMonthDays: function (year, month) {
      return new Date(year, month, 0).getDate();
    },
    // 绘制当月天数占的格子
    createDays: function (year, month) {
      let thisMonthDays = [],

        days = this.getThisMonthDays(year, month);

      for (let i = 1; i <= days; i++) {

        thisMonthDays.push({
          Lunarday: this.getMsg(this.data.year, this.data.month, i)[6],
          date: i,
          dateFormat: this.zero(i),
          monthFormat: this.zero(month),
          week: this.data.weekText[new Date(Date.UTC(year, month - 1, i)).getDay()]
        });
      }

      this.setData({
        thisMonthDays
      })
    },
    //获取当月空出的天数
    createEmptyGrids: function (year, month) {
      let week = new Date(Date.UTC(year, month - 1, 1)).getDay(),
        empytGridsBefore = [],
        empytGridsAfter = [],
        emptyDays = (week == 0 ? 7 : week);
      //当月天数
      var thisMonthDays = this.getThisMonthDays(year, month);
      //上月天数
      var preMonthDays = month - 1 < 0
        ? this.getThisMonthDays(year - 1, 12)
        : this.getThisMonthDays(year, month - 1);

      //空出日期
      for (let i = 1; i <= emptyDays; i++) {
        empytGridsBefore.push(preMonthDays - (emptyDays - i));
      }

      var after = (42 - thisMonthDays - emptyDays) - 7 >= 0
        ? (42 - thisMonthDays - emptyDays) - 7
        : (42 - thisMonthDays - emptyDays);
      for (let i = 1; i <= after; i++) {
        empytGridsAfter.push(i);
      }
      this.setData({
        empytGridsAfter,
        empytGridsBefore
      })
    },

    //补全0
    zero: function (i) {
      return i >= 10 ? i : '0' + i;
    },
  }
})