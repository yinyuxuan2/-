//index.js
//获取应用实例
const app = getApp()
var mytimer =null;


Page({
  data: {
    isClicked:false,
    l:'欢迎来到博饼小游戏',
    left1: 'd.png',
    left2: 'd.png',
    right1: 'd.png',
    right2: 'd.png',
    mid1: 'd.png',
    mid2: 'd.png',
    opacity:0,
    threshold:50,
    
    yixiu:32,
    erju:16,
    sijin:8,
    sanhong:4,
    duitang:2,
    zhuangyuan:1,

    winH:50,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var that=this;
    wx.onCompassChange(function (res) {
      //debugger
      if(res.direction>100){
        console.log("=======" + res.direction + ",mytimer=" + mytimer);
        if (mytimer==null){
          that.yaoyiyao();
        }
      }

    })
    wx.startCompass();

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  yaoyiyao:function(){
    
    var idx=0;
    var that=this;
    var tmp1;var tmp2;var tmp3; var tmp4 ;var tmp5; var tmp6;
    
    mytimer = setInterval(function () {
      idx++;
      tmp1 = that.randomNum(1, 6);
      tmp2 = that.randomNum(1, 6);
      tmp3 = that.randomNum(1, 6);
      tmp4 = that.randomNum(1, 6);
      tmp5 = that.randomNum(1, 6);
      tmp6 = that.randomNum(1, 6);
      var opacity = that.data.opacity + 0.1;
      if (opacity > 0.5) {
        opacity = 0;
      }
      console.log("idx=" + idx + ",opacity=" + opacity);
      var a=tmp1,b=tmp2,c=tmp3,d=tmp4,e=tmp5,f=tmp6;
      // debugger
      that.setData({
        left1: tmp1 + ".png",
        left2: tmp2 + ".png",
        right1: tmp3 + ".png",
        right2: tmp4 + ".png",
        mid1: tmp5 + ".png",
        mid2: tmp6 + ".png",
        opacity: opacity,
        isClicked:true
      });
       if (idx >= 10) {
       
        clearInterval(mytimer);
        mytimer=0;
        console.log("...mytimer="+mytimer) ;
    

        var NumberArr = [];
        NumberArr.push(a,b,c,d,e,f);
        var level = {
          one: '状元插金花！',
          two: '六红六子', // 六子
          three: '五红五子', // 五子
          four: '普通状元',
          five: '对堂',
          six: '三红',
          seven: '四进',
          eight: '二举',
          nine: '一秀',
          ten: '没有奖哦亲~~~~~'
       },
       this_level; 
      
        NumberArr.sort();
        var isfour = 0;
        for (var i = 0; i < NumberArr.length; i++) {
          if (NumberArr[i] == 4) {
              isfour = isfour + 1;
          }
      } 
      switch (isfour) {
        case 1:
            for (var i = 0; i < NumberArr.length; i++) {
                //存储当前相同的数量，判断是否为四进
                var ContrastArr = [];
                for (var j = 0; j < NumberArr.length; j++) {
                    if (NumberArr[i] == NumberArr[j]) {
                        ContrastArr.push(NumberArr[j]);
                    }
                }
            }
            // 等到上面遍历执行完再进行判断属于哪个级别
            if (ContrastArr.length === 4) {
                this_level = level.seven; //四进
                if(that.data.sijin>0){
                  var sijin0=that.data.sijin-1;
                  that.setData({
                    sijin:sijin0
                    });
                }
                break;
            } else if (ContrastArr.length === 5) {
                this_level = level.three; //五红
                break;
            } else if (ContrastArr.length === 6) {
                this_level = level.two; //六红
                break;
            } else {
                // 判断一下，是 "对堂"" or ”一秀“，对堂就是顺子，123456，一秀就是一个只有4；
                var isContinuityArray = false;
                var array = NumberArr;
                var arrayCount = array.length;
                for (var i = 0; i < arrayCount; i++) {
                    var currentArr = Number(array[i]) + 1;
                    var nestArr = Number(array[i + 1]);
                    if (i + 1 == arrayCount) {
                        currentArr = Number(array[i]);
                        nestArr = Number(array[i]);
                    }
                    if (currentArr != nestArr) {
                        isContinuityArray = false;
                        break;
                    } else {
                        isContinuityArray = true;
                    }
                }
                if (isContinuityArray) {
                    this_level = level.five;
                    if(that.data.duitang>0){
                      var duitang0=that.data.duitang-1;
                      that.setData({
                        duitang:duitang0
                        });
                    }
                    break;
                } else {
                    this_level = level.nine;
                    if(that.data.yixiu>0){
                      var yixiu0=that.data.yixiu-1;
                      that.setData({
                        yixiu:yixiu0
                        });
                    }
                    break;
                }
            };
            break;
        case 2:
            for (var i = 0; i < NumberArr.length; i++) {
                var ContrastArr = [];
                for (var j = 0; j < NumberArr.length; j++) {
                    if (NumberArr[i] == NumberArr[j]) {
                        ContrastArr.push(NumberArr[j]);
                    }
                }
                // 判断是 4进 or 二举
                if (ContrastArr.length === 4) {
                    this_level = level.seven;
                    if(that.data.sijin>0){
                      var sijin0=that.data.sijin-1;
                      that.setData({
                        sijin:sijin0
                        });
                    }
                    break;
                } else {
                    this_level = level.eight;
                    
                }
            };
            break;
        case 3:
            this_level = level.six;
            if(that.data.sanhong>0){
              var sanhong0=that.data.sanhong-1;
              that.setData({
               sanhong:sanhong0
                });
            }
            break;
        case 4:
            // 判断是 "普通状元" or "状元插金花"，普通就是4个四，插金花就是  4个四 + 2个1 ；
            var one = 0;
            for (var i = 0; i < NumberArr.length; i++) {
                if (NumberArr[i] === 1) {
                    one = one + 1;
                }
            }
            if (one == 2) {
                this_level = level.one; // 插金花
            } else {
                this_level = level.four; //普通状元
            }
            break;
        case 5:
            this_level = level.three; // 五红五子
            break;
        case 6:
            this_level = level.two; //六红六子
            break;
        default:
            // 就是页面都没有四,来判断是否属于 “五子” 和 “六子” 和 “四进” 中的哪一种;
            for (var i = 0; i < NumberArr.length; i++) {
                var ContrastArr = [];
                for (var j = 0; j < NumberArr.length; j++) {
                    if (NumberArr[i] == NumberArr[j]) {
                        ContrastArr.push(NumberArr[j]);
                    }
                }
                if (ContrastArr.length === 4) {
                    this_level = level.seven; //四进
                    if(that.data.sijin>0){
                      var sijin0=that.data.sijin-1;
                      that.setData({
                        sijin:sijin0
                        });
                    }
                    break;
                } else if (ContrastArr.length === 5) {
                    this_level = level.three; //五子
                    break;
                } else if (ContrastArr.length === 6) {
                    this_level = level.two; //六子
                    break;
                } else {
                    this_level = level.ten;
                }
            };
            break;  }
            if(this_level===level.nine)
            {if(that.data.erju>0){
              var erju0=that.data.erju-1;
              that.setData({
                erju:erju0
                });
            }}

            that.setData({
              isClicked:false,
              l:this_level
              });

      }
    }, 100);

         
  },
  clickMe:function() {
    
    this.yaoyiyao();
   

  },

  
  //生成从minNum到maxNum的随机数
  randomNum: function (minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        break;
      default:
        return 0;
    }
  },
 
  onShareAppMessage: function(ops){
    let item={
      id:this.id,
      pid:this.infoList.user.id
    }
    console.log('id+++pid',item)
    return{
      title:'邀请好友助力',
      path :'/pages/index/index?jump=123',
      success:(res)=>{
        console.log("转发成功："+JSON.stringify(res));
      },
      fail:function(res){
        console.log("转发失败："+JSON.stringify(res));
      }
    }
  },
  submit: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {
 
  },
 
 
  close_mask: function () {
    this.setData({
      showModal: false
    })
  },


});