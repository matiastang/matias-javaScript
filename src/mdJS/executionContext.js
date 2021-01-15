/*
 * @Author: tangdaoyong
 * @Date: 2021-01-15 10:39:15
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-01-15 10:43:39
 * @Description: 执行上下文（Execution context）测试
 */

console.log(a);
var a = 1;
console.log(a);
function fun() {
    console.log(a);
    var a = 2;
    console.log(a);
    console.log(b);// let 没有变量提示，声明前为：暂死区域。使用会报错。
    let b = 3;
}
fun();