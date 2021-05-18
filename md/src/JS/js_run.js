// buf2hex: function (buffer) { // buffer is an ArrayBuffer
//     return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
//   }

//   hextoString: function (hex) {
//     var arr = hex.split("")
//     var out = ""
//     for (var i = 0; i < arr.length / 2; i++) {
//       var tmp = "0x" + arr[i * 2] + arr[i * 2 + 1]
//       var charValue = String.fromCharCode(tmp);
//       out += charValue
//     }
//     return out
//   }

//   stringtoHex: function (str) {
//     var val = "";
//     for (var i = 0; i < str.length; i++) {
//       if (val == "")
//         val = str.charCodeAt(i).toString(16);
//       else
//         val += str.charCodeAt(i).toString(16);
//     }
//     val += "0a"
//     return val
//   }


const numberExtention = require('./NumberExtention')

let number = 10.124
console.log(number.numberToFixed(2))
console.log(number.numberMathRound(2))
console.log(number.numberMatch(2))

let numberTwo = 10.125
console.log(numberTwo.numberToFixed(2))
console.log(numberTwo.numberMathRound(2))
console.log(numberTwo.numberMatch(2))

let numberThree = 10
console.log(numberThree.numberToFixed(2))
console.log(numberThree.numberMathRound(2))
console.log(numberThree.numberMatch(2))