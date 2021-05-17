import classnames from 'classnames';
import isEqual from 'fast-deep-equal';

// 内部函数, 用于判断对象类型
function _getClass(object) {
    return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
}

export function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

export function isArray(obj) {
    return _getClass(obj).toLowerCase() === 'array';
}

export function isString(obj) {
    return _getClass(obj).toLowerCase() === 'string';
}

export function isDate(obj) {
    return _getClass(obj).toLowerCase() === 'date';
}

export function isObject(obj) {
    return _getClass(obj).toLowerCase() === 'object';
}

export function isNumber(obj) {
    return _getClass(obj).toLowerCase() === 'number';
}

export function isFormData(obj) {
    return (typeof FormData !== 'undefined') && (obj instanceof FormData);
}

export function isFile(obj) {
    return _getClass(obj).toLowerCase() === 'file';
}

export function isBlob(obj) {
    return _getClass(obj).toLowerCase() === 'blob';
}

export function isFunction(obj) {
    return _getClass(obj).toLowerCase() === 'function';
}

export function isStream(obj) {
    return isObject(obj) && isFunction(obj.pipe);
}

export function isURLSearchParams(obj) {
    return typeof URLSearchParams !== 'undefined' && obj instanceof URLSearchParams;
}

export function isIE() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf('compatible') > -1 &&
        userAgent.indexOf('MSIE') > -1) {
        return true;
    }
    return false;
}

export function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    // document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
    document.cookie = name + '=' + encodeURI(value);
}

export function getCookie(name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(name + '=');
        if (c_start !== -1) {
            c_start = c_start + name.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end === -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
}

export function clearCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
        }
    }
}

/**
 * @desc 判断参数是否为空, 包括null, undefined, [], '', {}
 * @param {object} obj 需判断的对象
 */
export function isEmpty(obj) {
    var empty = false;

    if (obj === null || obj === undefined) {    // null and undefined
        empty = true;
    } else if ((isArray(obj) || isString(obj)) && obj.length === 0) {
        empty = true;
    } else if (isObject(obj)) {
        var hasProp = false;
        for (let prop in obj) {
            if (prop) {
                hasProp = true;
                break;
            }
        }
        if (!hasProp) {
            empty = true;
        }
    }
    return empty;
}
/**
 * @desc 判断参数是否不为空
 */
export function isNotEmpty(obj) {
    return !isEmpty(obj);
}

/**
 * @desc 判断参数是否为空字符串, 比isEmpty()多判断字符串中有空格的情况, 如: '   '.
 * @param {string} str 需判断的字符串
 */
export function isBlank(str) {
    if (isEmpty(str)) {
        return true;
    } else if (isString(str) && str.trim().length === 0) {
        return true;
    }
    return false;
}

/**
 * @desc 判断参数是否不为空字符串
 */
export function isNotBlank(obj) {
    return !isBlank(obj);
}

/**
 * @desc 生成一个随机id
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * @desc 根据对象和传入的对象value属性的值, 查询value对应的name值
 * @param {object} obj 需遍历的对象
 * @param {string} value 需搜索的value属性的值
 * @demo USER = {
 *           A: {
 *               name: '普通会员',
 *               value: 0
 *           },
 *           B: {
 *               name: 'VIP会员',
 *               value: 1
 *           }
 *       }
 */
export function searchNameByVal(obj, value) {
    if (isEmpty(obj) || isEmpty(value)) {
        return '';
    }

    for (let prop in obj) {
        if (obj[prop].value === value) {
            return obj[prop].name;
        }
    }
}

export function signKeyWords(str, words = [], color = '#00AFE3') {
    if (words.length < 1) { return str; }

    var map = {}, reg, items;
    var regStr = `(${words.join('|')})`;

    words.forEach(function(e) {
        e !== '' && (map[e] = true);
    });
    reg = new RegExp(regStr, 'g');

    items = str.replace(reg, '#$1#').split(/#+/);

    var result = [];

    for (var i = 0; i < items.length; i++) {
        if (items[i] === '') { continue; }
        if (map[items[i]]) {
            result.push(`<strong style="color: ${color};">${items[i]}</strong>`);
        } else {
            result.push(`<span>${items[i]}</span>`);
        }
    }

    return result.join('');
}

export function getTagClassName(name) {
    var blueTag = false;
    if (name.indexOf('存续') !== -1 || name.indexOf('在营') !== -1 || name.indexOf('登记') !== -1 || name.indexOf('在业') !== -1) {
        blueTag = true;
    }
    return classnames({ 'tag': true, 'tag-blue': blueTag, 'tag-red': !blueTag });
}

/**
 * @desc 通过URL搜索对象获取url参数, 如www.xxx.com?a=1&b=2, getURLParam('a') return 1
 */
export function getURLParam(name) {
    if (isBlank(name)) {
        return;
    }
    // var urlQuery = getURLQuery();
    var urlQuery = getQueryParams();
    return urlQuery[name];
}
export function dateFormat(formatDate) {
    return formatDate.replace(/(.{4})(.{2})/, '$1-$2-');
}

export function monthPlus(formatDate, num, showDay) { // 月份加一个月
    let date = new Date(formatDate);
    let month = date.getMonth() + num;
    date.setMonth(month);
    let temMonth = date.getMonth() + 1;
    temMonth = temMonth > 9 ? temMonth : '0' + temMonth;
    return showDay ? `${date.getFullYear()}-${temMonth}-${date.getDate()}` : `${date.getFullYear()}-${temMonth}`;
}
/*
* 获取 url 参数，因为 this.props.location.query 不能得到带有 # 的参数，所以添加此方法
* */
export function getQueryParams() {
    let obj = {}, name, value;
    let str = location.href;
    let num = str.indexOf('?');
    str = str.substr(num + 1);
    const arr = str.split('&');
    for (let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=');
        if (num > 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            obj[name] = value;
        }
    }
    return obj;
}
/**
 * 检查元素是否在数组中
 * @param arr
 * @param obj
 * @returns {boolean}
 */
export function contains(arr, obj) {
    let i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return true;
        }
    }
    return false;
}

/**
 * 生成随机整数
 * @param min
 * @param max
 * @constructor
 */
export function random(min, max) {
    min = min || -90;
    max = max || 90;
    return min + Math.floor(Math.random() * (max - min));
}

/**
 * 指定位置插入字符串
 * @param str
 * @param flg
 * @param sn
 * @returns {string}
 */
export function insert_flg(str, flg, sn) {
    let newstr = '';
    for (let i = 0; i < str.length; i += sn) {
        let tmp = str.substring(i, i + sn);
        newstr += tmp + flg;
    }
    return newstr;
}

export const dataURLtoBlob = (dataurl) => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};
// 浅对比
export function shouldUpdate(last = {}, next = {}) {
    if (typeof last !== typeof next) {
        return true;
    }

    for (let key in next) {
        let lastVal = last[key];
        let nextVal = next[key];

        if (!isEqual(lastVal, nextVal)) {
            return true;
        }
    }
    return false;
}

/**
 * 根据url判断是哪个页面
 * @return {[type]} [description]
 */
export function GetPageByUrl() {
    let promPage = location.href;
    let pageInfo = '';
    if (promPage === '/') {
        pageInfo = '登录';
    }
    if (promPage.includes('/main')) {
        if (promPage.includes('/main/overall')) {
            pageInfo = '首页';
        } else if (promPage.includes('/main/search')) {
            pageInfo = '搜索';
        } 
        // else if (promPage.includes('/main/detail')) {
        //     pageInfo = '企业页面'; // '企业页面';
        // } 
        else if (promPage.includes('/main/userContent/attention')) {
            pageInfo = '用户中心我的关注';
        } else if (promPage.includes('/main/userContent/blackList')) {
            pageInfo = '用户中心我的黑名单';
        } else if (promPage.includes('/main/userContent/report')) {
            pageInfo = '用户中心我的报告';
        } else if (promPage.includes('/main/analysis')) {
            pageInfo = '智能检索分析';
        } else if (promPage.includes('/main/specialEvent')) {
            pageInfo = '特征事件预警';
        } else if (promPage.includes('/main/mistakeRule')) {
            pageInfo = '企业违规预警';
        } else if (promPage.includes('/main/monitor')) {
            pageInfo = '重点企业实时监控';
        }
    }
    return pageInfo;
}

export function DownLoadIframe(url) {
    let getIframeDom = document.getElementById('iframe_down');
    if (getIframeDom === null) {
        let iframe = document.createElement('iframe');
        iframe.id = 'iframe_down';
        document.body.appendChild(iframe);
        iframe.src = url;
    } else {
        getIframeDom.src = url;
    }
}

/**
 * @desc 函数防抖，让某个函数在上一次执行后，满足等待某个时间内不再触发此函数后再执行，而在这个等待时间内再次触发此函数，等待时间会重新计算。
 * 解决频繁发生的事件，比如
 * 1.window 的 resize、scroll
 * 2.mousedown、mousemove
 * 3.keyup、keydown
 * 试用场景：输入框搜索，滚动懒加载图片
 * @param {fun} 需要进行函数防抖的函数
 * @param {wait} 参数wait则是需要等待的时间，单位为毫秒
 * @param {immediate} immediate参数如果为true，则debounce函数会在调用时立刻执行一次function，而不需要等到wait这个时间后，
 */
export function debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function() {
        var context = this;
        var args = arguments;
        
        if (timeout) {
            clearTimeout(timeout);
        }

        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;

            if (callNow) {
                result = func.apply(context, args);
            }

            timeout = setTimeout(function() {
                // timeout 为 null 的时候 callNow 才为 true.
                timeout = null;
            }, wait);
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        }
        return result;
    };

    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

// 判断浏览器
export function getWeb() {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return 'IE';
    }
    if (navigator.userAgent.indexOf('Firefox') !== -1) {
        return 'Firefox';
    }
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
        return 'Chrome';
    }
    if (navigator.userAgent.indexOf('Safari') !== -1) {
        return 'Safari';
    }
}

// a-a 格式转小驼峰
export function convertToCamelCase(str) {
    if (typeof str !== 'string') {return '';}
    var strArr = str.trim().split('-');
    strArr = strArr.map((s, index) => {
        if (index === 0) {
            s = s[0].toLowerCase() + s.substring(1);
        } else if (index !== 0 && s !== '') {
            s = s[0].toUpperCase() + s.substring(1);
        }
        return s;
    });
    return strArr.join('');
}

// 根据圆点、半径、角度，计算圆边上一点坐标
export function  computedPointCoordinate(x, y, r, angle) {
    let pointX = x + r * Math.cos(angle * Math.PI / 180);
    let pointY = y + r * Math.sin(angle * Math.PI / 180);
    return [Math.round(pointX), Math.round(pointY)];
}

// 由em rem等定义可知，字体or其他元素大小仅与原始宽度以及现有宽度有关且成正比例
// sourceWidth设计图宽 width传入宽度
export function getComputedSize(width, sourceWidth, sourceSize) {
    return width / sourceWidth * sourceSize;
}

export function addOrderNumber(data, pageNum = 1, pageSize = 10) {
    return data.map((item, index) => {
        item._key = (pageNum - 1) * pageSize + index + 1;
        return item;
    });
}

// 实现一个深拷贝
// 可实现undefined, null, 空数组，symbol, date, RegExp, 原型链，循环引用的拷贝
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null);
export function cloneDeep(target, hash = new WeakMap()) {
    // 判断是否是复杂数据类型
    if (target.constructor === RegExp) { // 正则
        return new RegExp(target);
    }
    if (target.constructor === Date) { // 日期
        return new Date(target);
    }
    if (hash.has(target)) { // 是对自身的引用，返回缓存的值
        return hash.get(target);
    }
    let allDesc = Object.getOwnPropertyDescriptors(target); // 获取所有属性
    // 根据原型创建新对象
    let cloneObj = Object.create(Object.getPrototypeOf(target), allDesc);
    hash.set(target, cloneObj);
    // 遍历目标对象，判断是否有复杂属性的值，实现clone
    for (let key of Reflect.ownKeys(target)) { 
        cloneObj[key] = (isComplexDataType(target[key]) && typeof target[key] !== 'function') ? cloneDeep(target[key], hash) : target[key];
    }
    return cloneObj;
}

/**
 * 字符串首部大小写
 * @param {string} str 字符串
 * @param {bool} upper 大小写
 * @param {string} len 首部长度
 * @returns 首部大小写后的字符串
 */
export function prefixToUpperAndLowerCase(str, len = 1, upper = true) {
    if (!isString(str)) {
        return '-1';
    }
    if (str.length < len) {
        return str;
    }
    if (upper) {
        return str.slice(0, len).toUpperCase() + str.slice(len);
    }
    return str.slice(0, len).toLowerCase() + str.slice(len);
}

/**
 * @description: 字符串首部大写
 * @param {String} str 字符串
 * @param {number} len 首部长度
 * @return {String} 首部大写后的字符串
 */
export function prefixToUpperCase(str, len = 1) {
    return prefixToUpperAndLowerCase(str, len);
}

/**
 * @description: 字符串首部小写
 * @param {String} str 字符串
 * @param {number} len 首部长度
 * @return {String} 首部小写后的字符串
 */
export function prefixToLowerCase(str, len = 1) {
    return prefixToUpperAndLowerCase(str, len, false);
}

/**
 * @description: 对象拼接为url参数字符串
 * @param {string|number|bool} urlParams 参数对象
 * @param {symbol} key 键
 * @return {string} 参数字符串
 */
export function getURLParamsForm(urlParams, key) {
    let params = '';
    // 只处理判断中的类型
    if (!isObject(urlParams) && !isString(urlParams) && !isNumber(urlParams) && !isBlob(urlParams)) {
        return params;
    }
    // 非Object
    if (!isObject(urlParams)) {
        if (isNotEmpty(key)) {
            return `&${key}=${encodeURIComponent(param)}`;
        }
        return params;
    }
    // 递归获取参数
    for (const key in urlParams) {
        if (Object.hasOwnProperty.call(urlParams, key)) {
            const value = urlParams[key];
            params += getURLParamsForm(value, key);
        }
    }
    // 去掉首部可能的&
    if (params.startsWith('&')) {
        return params.substr(1);
    }
    return params;
}