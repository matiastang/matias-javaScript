/*
 * @Author: matiastang
 * @Date: 2023-07-04 15:26:07
 * @LastEditors: matiastang
 * @LastEditTime: 2023-07-04 15:50:46
 * @FilePath: /aigle-web/src/utils/extensions/numberExtension.ts
 * @Description: Number Extension
 */
Number.prototype.numberMathRound = function (len = 0) {
  const left = this as number
  const lenNumber = 10 ** len
  const result = Math.round(left * lenNumber) / lenNumber
  return result
}

Number.prototype.numberFloor = function (len = 0) {
  const left = this as number
  const lenNumber = 10 ** len
  const result = Math.floor(left * lenNumber) / lenNumber
  return result
}

Number.prototype.numberCeil = function (len = 0) {
  const left = this as number
  const lenNumber = 10 ** len
  const result = Math.ceil(left * lenNumber) / lenNumber
  return result
}

Number.prototype.numberInt = function (len = 0) {
  const left = this as number
  const lenNumber = 10 ** len
  const result = parseInt('' + left * lenNumber) / lenNumber
  return result
}

Number.prototype.numberToFixed = function (len = 0) {
  return Number(this.toFixed(len))
}

Number.prototype.numberMatch = function (len = 0) {
  let regExp = RegExp(`^\\d+(?=\\.\\d{0,${len}})?`)
  let one = this.toString().match(regExp)
  // console.log(one)
  return Number(one)
}
