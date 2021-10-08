//index.js
//获取应用实例
const app = getApp()
var mytimer =null;

Page({
  

  data: {
    isClicked:false,
    l:'欢迎来到博饼小游戏',
    msg:'摇骰子',
    left1: 'd.png',
    left2: 'd.png',
    right1: 'd.png',
    right2: 'd.png',
    mid1: 'd.png',
    mid2: 'd.png',
    opacity:0,
    threshold:50,
    userInfo:'',
    winH:50,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    yixiunum:0,
    erjunum:0,
    sijinnum:0,
    sanhongnum:0,
    duitangnum:0,
    zhuangyuannum:0
  
  },
  //事件处理函数
  
   
  
  onLoad(){
     let user=wx.getStorageSync('user')
     this.setData({
       userInfo:user
     })
  },
  login(){
    
    console.log('点击事件执行了')
    wx.getUserProfile({
      desc: '必须授权才能使用',
      success:res=>{
        let user=res.userInfo
        wx.setStorageSync('user', user)
  console.log('成功',res)
  this.setData({
    userInfo:user
  })
  },
      fall:res=>{
        console.log('失败',res)
      }
    })
  
  },
  nologin(){
   this.setData({
     userInfo:''
   })
   wx.setStorageSync('user', null)
  },


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
    if(that.data.isClicked==false)
    {mytimer = setInterval(function () {
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
      if(idx>0){
        that.setData({
          msg:"等待中."
        });
      }
      if(idx>5){
        that.setData({
          msg:"等待中.."
        });
      }
      if(idx>10){
        that.setData({
          msg:"等待中..."
        });
      }
       if (idx >= 15) {
        that.setData({
          msg:"摇骰子"
        });
       
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
                    
                    break;
                } else {
                    this_level = level.nine;
                    
                    
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
                   
                    break;
                } else {
                    this_level = level.eight;
                    
                }
            };
            break;
        case 3:
            this_level = level.six;   
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
  

            that.setData({
              isClicked:false,
              l:this_level,
              });

              if(this_level === level.one){
                var z1=that.data.zhuangyuannum+1;
                that.setData({
                  zhuangyuannum:z1,
                  });
              }
              if(this_level === level.two){
                var z1=that.data.zhuangyuannum+1;
                that.setData({
                  zhuangyuannum:z1,
                  });
              }
              if(this_level === level.three){
                var z1=that.data.zhuangyuannum+1;
                that.setData({
                  zhuangyuannum:z1,
                  });
              }
              if(this_level === level.four){
                var z1=that.data.zhuangyuannum+1;
                that.setData({
                  zhuangyuannum:z1,
                  });
              }
              if(this_level === level.five){
                var z2=that.data.duitangnum+1;
                that.setData({
                  duitangnnum:z2,
                  });
              }
              if(this_level === level.six){
                var z3=that.data.sijinnum+1;
                that.setData({
                  sijinnum:z3,
                  });
              }
              if(this_level === level.seven){
                var z4=that.data.sanhongnum+1;
                that.setData({
                  sanhongnum:z4,
                  });
              }
              if(this_level === level.eight){
                var z5=that.data.erjunum+1;
                that.setData({
                  erjunum:z5,
                  });
              }
              if(this_level === level.nine){
                var z6=that.data.yixiunum+1;
                that.setData({
                  yixiunum:z6,
                  });
              }

      }
    }, 100);}

         
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
  upPgage:function(){
    wx.navigateTo({
      url: '/pages/index5/index5',
    })
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