/*
 * @Descripttion: 
 * @version: 
 * @Author: matias tang
 * @Date: 2020-09-17 11:23:03
 * @LastEditors: matias tang
 * @LastEditTime: 2020-09-17 15:37:07
 */
/**
 * @name: 
 * @test: test font
 * @msg: 
 * @param {type} 
 * @return {type} 
 */
// TODO: - 优化
// FIXME:- 注意(只是测试,没问题)
// MARK:- 提示、说明
// function getURLParameters() {

//     var nowurl = window.location.href;
//     var urlParameters = {}
//     var parameters = nowurl.replace(/[?&]+([^?&=]+)=([^?&]+)/gi, function (one, two, three, four, five) {
//         urlParameters[two] = decodeURI(three)
//         return two + '->' + three;
//     });
//     return urlParameters
// }
/**
 * @name: 获取当前URL参数的对象
 * @test: test font
 * @msg: 
 * @param {type} 
 * @return {type} 
 */
window.location.parameters = () => {
    return mtGetURLParameters(this.href)
}

/**
 * @name: 获取当前URL参数的对象
 * @test: ./test/Jest/URL.test.js mtGetURLParameters test
 * @msg: 
 * @param {当前URL} 
 * @return {参数对象} 
 */
const mtGetURLParameters = url => (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce((a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),{});

export {
    mtGetURLParameters
}