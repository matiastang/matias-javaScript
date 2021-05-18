/**
 * @name: 防抖函数
 * @test: test font
 * @msg: 
 * @param {type} 
 * @return {type} 
 */
const debounce = (fb, delay) => {
    let time = null;
    return () => {
        if (time !== null) {
            clearTimeout(time)
        }
        time = setTimeout(fb, delay)
    }
}

/**
 * @name: 节流（定时器）
 * @test: test font
 * @msg: 当第一次触发事件时，不会立即执行函数，而是在delay秒后才执行。而后再怎么频繁触发事件，也都是每delay时间才执行一次。
 * @param {type} 
 * @return {type} 
 */
const throttle_time = (fb, delay) => {
    let time = null;
    return function() {
        if (time !== null) {
            return
        }
        var context = this           
        var args = arguments
        time = setTimeout(function() {
            fb.apply(context, args)
            time = null
        }, delay)
    }
}

/**
 * @name: 节流（时间戳）
 * @test: test font
 * @msg: 当高频事件触发时，第一次会立即执行（事件绑定函数与真正触发事件的间隔大于delay），而后再怎么频繁地触发事件，也都是每delay时间才执行一次。
 * @param {type} 
 * @return {type} 
 */
const throttle_date = (fb, delay) => {
    let prev = Date.now()
    return function() {
        let now = Date.now()
        if (now - prev < delay) {
            return
        }
        let context = this           
        let args = arguments
        fb.apply(context, args)
    }
}

/**
 * @name: 节流（时间戳+定时器）
 * @test: test font
 * @msg: 当第一次触发事件时马上执行事件处理函数，最后一次触发事件后也还会执行一次事件处理函数。
 * @param {type} 
 * @return {type} 
 */
const throttle = (fb, delay) => {
    let time = null
    let startTime = Date.now()
    return function() {
        let nowTime = Date.now()
        let remaining = delay - (nowTime - startTime)
        let context = this           
        let args = arguments
        clearTimeout(time)
        if (remaining <= 0) {
            fb.apply(context, args)
            startTime = Date.now()
        } else {
            time = setTimeout(function() {
                fb.apply(context, args)
                startTime = Date.now()
            }, remaining)
        }
    }
}

// ES6

// 如何创建一个包含当前URL参数的对象
const mtGetURLParameters = url => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),{});


// 平滑滚动到页面顶部
// const scrollToTop = (element) => {
//     const c = $().scrollTop || document.body.scrollTop;
//     if (c > 0) {
//       window.requestAnimationFrame(scrollToTop);
//       window.scrollTo(0, c - c / 8);
//     }
// }

// 平滑滚动到页面顶部
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
}
/*
复制代码window.requestAnimationFrame() 告诉浏览器-你希望执行一个动画，并且要求浏览器在下一重绘之前调用指定的函数更新动画。该方法需要放置一个替换函数作为参数，该变量函数会在浏览器下一次重绘之前执行。
requestAnimationFrame：优势：由系统决定决定功能的执行时机。60Hz的刷新频率，然后每次刷新的间隔中会执行一次替换函数，不会引起丢帧，不会卡顿。
*/

/*
如何用js判断一个对象是不是Array
1.Array.isArray(obj) 调用数组的isArray方法
2.obj instanceof Array  判断对象是否是Array的实例
3.Object.prototype.toString.call(obj) ===‘[object Array]’  
    Object.prototype.toString方法会取得对象的一个内部属性［［Class］］，然后依据这个属性，返回一个类似于［object Array］的字符串作为结果，call用来改变toString的this指向为待检测的对象
4.判断对象是否有push等数组的一些方法。（这个方法有兼容问题，但也是一个简单易用的方法）
    
5.obj.constructor===Array   //true
*/
// console.log($('#activity-signup-modal-form').serialize())
// console.log($('#activity-signup-modal-form').serializeArray())
// let infoSignup = $('#activity-signup-modal-form').serializeObject()
// console.log(infoSignup)
// 表单对象
$.fn.serializeObject = function () {
  var ct = this.serializeArray();
  var obj = {};
  $.each(ct, function () {
      if (obj[this.name] !== undefined) {
          if (!obj[this.name].push) {
              obj[this.name] = [obj[this.name]];
          }
          obj[this.name].push(this.value || "");
      } else {
          obj[this.name] = this.value || "";
      }
  });
  return obj;
};

//扩展jquery的格式化方法
$.fn.parseForm=function(){
  var serializeObj={};
  var array=this.serializeArray();
  var str=this.serialize();
  $(array).each(function(){
      if(serializeObj[this.name]){
          if($.isArray(serializeObj[this.name])){
              serializeObj[this.name].push(this.value);
          }else{
              serializeObj[this.name]=[serializeObj[this.name],this.value];
          }
      }else{
          serializeObj[this.name]=this.value; 
      }
  });
  return serializeObj;
};

export {
    debounce,
    throttle_time,
    throttle_date,
    throttle
}