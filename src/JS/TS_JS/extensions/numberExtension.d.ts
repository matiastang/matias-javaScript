/*
 * @Author: matiastang
 * @Date: 2023-07-04 15:30:26
 * @LastEditors: matiastang
 * @LastEditTime: 2023-07-04 15:49:15
 * @FilePath: /aigle-web/src/utils/extensions/numberExtension.d.ts
 * @Description: Number Extension
 */
interface Number {
  numberMathRound: (len: number) => number
  numberFloor: (len: number) => number
  numberCeil: (len: number) => number
  numberInt: (len: number) => number
  numberToFixed: (len: number) => number
  numberMatch: (len: number) => number
}
