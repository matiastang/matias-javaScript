/*
 * @Author: tangdaoyong
 * @Date: 2021-02-05 14:38:28
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-05 14:40:18
 * @Description: 生成随机颜色
 */
// TODO: - 生成有bug，toString(16)有可能只有一位，需要处理
// 1.rgb()颜色值
      function rgbColor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let rgb = `rgb(${r},${g},${b})`;
        return rgb;
      }
// 2.rgba()颜色值
      function rgbaColor(){
        let r = Math.floor(Math.random()*256);
        let g = Math.floor(Math.random()*256);
        let b = Math.floor(Math.random()*256);
        let a = Math.random().toFixed(2);
        let rgba = `rgba(${r},${g},${b},${a})`;
        return rgba;
      }
// 3.16进制颜色值
      function color16(){
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
        return color;
      }
// 4.数组拼接法
    var colorArr=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
 
    function random(min,max){
	  if(isNaN(min) || isNaN(max)){
		return null;
	  }
	  if(min > max){
		min ^= max;
		max ^= min;
		min ^= max;
	  }
	  return (Math.random() * (max - min) | 0) + min;
	}
 
	function arrColor(){
	  var color="#";
	  for(var i=0;i<6;i++){
	    color += colorArr[random(0,16)];
	  }
	  return color;
	}
// 5.随机数生产法
      function randomNumColor(){
        var color="#";
        for(var i=0;i<6;i++){
          color += (Math.random()*16 | 0).toString(16);
        }
        return color;
      }
// 6.16进制随机数生成法
    function color(){
        return "#"+ (Math.random() * 0x1000000 | 0).toString(16)
    }
