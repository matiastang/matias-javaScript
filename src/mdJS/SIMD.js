/*
 * @Author: tangdaoyong
 * @Date: 2021-02-07 11:52:49
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-07 11:53:04
 * @Description: SIMD
 */
var a = SIMD.Float32x4(1, 2, 3, 4);
var b = SIMD.Float32x4(5, 6, 7, 8);
var c = SIMD.Float32x4.add(a,b); // Float32x4[6,8,10,12]