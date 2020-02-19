# 微信小程序日历组件


## 1.引入

```html

{
  "usingComponents": {
    "calendar-week":"../components/calendar/calendar"
  }
}

```
使用
```javascript
//index.html

<calendar-week></calendar-week>

```
```javascript
//index.js

Page({
  data: {
    
  },
  solarAndLunar(e){
    this.setData({
      alltime:e.detail
    })
  }
 
})

```


## 2.界面

### 展示
![UI](https://raw.githubusercontent.com/17562105692/smallCD-/master/url-1.jpg)


## 3.反馈
### 解决方案
#### 如果有使用方面的错误，请进行反馈，并将为您提供相关解决方案，祝您使用愉快。