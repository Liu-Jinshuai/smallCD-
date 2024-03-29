let calculate = require('moon-time')
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
  },
  ready: function () {
    this.today();
    
  },

  methods: {

    getMsg: function (year, month, day) {

      if(!(year&&month&&day))return;
      let moonday = calculate({
        year,
        month,
        day
      })
      

      let arr = [moonday.year,moonday.monthC,moonday.day,moonday.lunarYear,moonday.zodiac,moonday.monthC,moonday.dayC];

      return arr;
    },

    //滚动模式
    //当年当月当天 滚动到制定日期 否则滚动到当月1日
    scrollCalendar(year, month, date) {
      var lunarday = this.getMsg(year, month, date);
      if(!lunarday)return;
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

          that.triggerEvent('solarAndLunar', {
            solar: year + "年" + month + "月" + date + "日",
            lunar: lunarday[3] + "年 " + lunarday[5] + lunarday[6]
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