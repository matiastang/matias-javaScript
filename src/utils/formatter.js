
import { directlyCity } from 'constants/common';
import { isString, isNumber, isEmpty } from './util';
import React from 'react';
/**
 * @description: 是否异常
 * @param {string | number} value
 * @return {boolean}
 */
export function isAnomaly(value) {
    return value === '' || value === undefined || value === null || value === '-';
}

/**
 * @description: 
 * @description: 省市区地址
 * @param {string} province 省 | 直辖市
 * @param {string} city 市
 * @param {string} area 区
 * @param {string} link 连接符
 * @param {string} placeholder 占位
 * @return {string}
 */
export function addressAnomaly(province, city, area, link = '', placeholder = '--') {
    if ((isAnomaly(province) || isDirectlyCity(province)) && isAnomaly(city) && isAnomaly(area)) {
        return placeholder;
    }
    let address = [];
    if (!isAnomaly(province) && !isDirectlyCity(province)) {
        address.push(province);
    }
    if (!isAnomaly(city)) {
        address.push(city);
    }
    if (!isAnomaly(area)) {
        address.push(area);
    }
    return address.join(link);
}

// 判断字段是否异常，‘--’
export function fieldAnomaly(value) {
    if (value === '' || value === undefined || value === null || value === '-') {
        return '--';
    }
    return value;
}
export function fieldHtml(value) {
    if (value === '' || value === undefined || value === null || value === '-') {
        return '--';
    }
    value = value.replace('\t', ' ');
    return <span dangerouslySetInnerHTML={{ __html: value }}></span>;
}
export function sliceStr(text, length) {
    if (!text) {
        return;
    }
    if (text.replace(/[\u4e00-\u9fa5]/g, 'aa').length <= length) {
        return text;
    } 
    var _length = 0;
    var outputText = '';
    for (var i = 0; i < text.length; i++) {
        if (/[\u4e00-\u9fa5]/.test(text[i])) {
            _length += 2;
        } else {
            _length += 1;
        }
        if (_length > length) {
            break;
        } else {
            outputText += text[i];
        }
    }
    return `${outputText}...`;
    
}
export function overtopOmit(str, num) {
    if (str && str.length > num) {
        return str.substring(0, num - 1) + '...';
    }
    return str;
}
export function toThousands(value) {
    if (Math.abs(value) < 1000) {
        return value;
    }
    let num = (value || 0).toString(), result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

export function isEmptyObject(data) {
    for (let item in data) {
        if (data.hasOwnProperty(item)) {
            return !1;
        }
    }
    return !0;
}

export function setScrollTop(scroll_top) {
    document.documentElement.scrollTop = scroll_top;
    window.pageYOffset = scroll_top;
    document.body.scrollTop = scroll_top;
}

export function sortArrJson(property, isAsc) {
    return function(obj1, obj2) {
        var value1 = obj1[property];
        var value2 = obj2[property];
        let data = value2 - value1;
        if (isAsc) {
            data = value1 - value2;     // 升序
        }
        return data;
    };
}

export function extendJson(source, target) {
    let newDate = [];
    for (var obj in source) {
        if (source.hasOwnProperty(obj)) {
            if (target[obj]) {
                newDate.push(target[obj]);
            } else {
                newDate.push({
                    date: obj,
                    industry: '',
                    name: '',
                    value: 0,
                    value2: 0
                });
            }
        }
    }
    return newDate;
}

export function windowOpenByUrl(url) {
    // let openWindowUrl = window.open();
    // openWindowUrl.location = url;
    window.open(url);
}

export function radarTip() {
    let radarTipArr = {
        '违规风险': '通过对企业行为是否违反所在行业的法律法规，对企业合规性进行风险评估。',
        '行业风险': '通过企业所在行业特有业务指标，如网络借贷行业的贷款余额、平均利率等，从不同行业经营对企业的经营风险进行度量。',
        '特征事件风险': '通过可定义的企业风险事件，企业是否发生需重点监控的特征风险事件进行特定风险识别。',
        '企业诚信风险': '通过目标公司及其核心关联公司所涉及的司法诉讼、行政处罚、失信被执行、被举报次数、负面舆情分析、信息披露程度等方面，全息衡量企业整体信誉风险。',
        '经营行为风险': '通过公司运营情况的指标，主要包括工商变更频率、招中标数量、资产抵质押程度、域名备案情况等方面对企业经营进行风险度量。',
        '综合实力风险': '通过企业股东类型、资本实力、人员结构与规模、知识产权拥有量、运营稳定性、公司所在地域经济运行整体情况等方面对企业基本面进行风险刻画。',
        // '静态关联方风险': '通过在特定时点解析目标企业股权结构合理性、核心控制人业务专注度、关联方关系地区分布，关联网络结构特征等方面，识别企业的反经济行为特征度。',
        '关联方风险': '通过在解析目标企业关联方图谱发展快慢、股权结构合理性、核心控制人业务专注度、关联方关系地区分布、关联网络结构特征等方面，识别企业的反经济行为特征度。',
        '舆情预警风险': '通过对企业的舆情信息进行分析，从网络舆情的热度、情感倾向等识别企业的负面舆情信息，进而评估企业的风险。'

    };
    return radarTipArr;
}

/**
 * 行业转换
 * @param  {[type]} industry [description]
 * @return {[type]}          [description]
 */
export function switchIndustryYW(industry) {
    switch (industry) {       
        case '典当' :
        case '融资租赁' :
        case '商业保理' :
        case '地方资产管理公司' :
        case '投资公司' :
        case '农民专业合作社' :
        case '社会众筹机构' :
        case 'ICO数字货币' :
        case '数字货币':
        case '支付' :
        case '新兴金融' :
            return 'xxjr';
        case '区域性股权市场' : 
        case '地方交易所' :   
        case '网络借贷' :
            return 'wljd';
        case '融资担保' :
            return 'rzdb';
        case '小额贷款' :
            return 'xedk';
        case '交易场所' :
            return 'jycs';
        case '私募基金' :
            return 'smjj';
        default :
            return 'other';
    }
}

/**
 * 行业转换
 * @param  {[type]} industry [description]
 * @return {[type]}          [description]
 */
export function switchIndustry(industry) {
    switch (industry) {
        case '新兴金融' :
        case '融资担保' :        
        case '典当' :
        case '融资租赁' :
        case '商业保理' :
        case '地方资产管理公司' :
        case '投资公司' :
        case '小额贷款' :
        case '农民专业合作社' :
        case '社会众筹机构' :
        case '数字货币' :
        case '支付' :
            return 'emerging';
        case '网络借贷' :
            return 'network';
        case '区域性股权市场' :
            return 'trading';
        case '地方交易所' :
            return 'trading';
        case '交易场所' :
            return 'trading';
        case '私募基金' :
            return 'private';
        default :
            return 'other';
    }
}

/**
 * 日期字符串转换
 * @param date
 * @returns {string}
 */
export function formatDate(date) {
    return date ? date.toString().substring(0, 4) + '年' + date.toString().substring(4, 6) + '月' + date.toString().substring(6, 8) + '日' : '';
}

/**
 * 日期字符串转换
 * @param date
 * @returns {string}
 */
export function formatDateline(date) {
    return date.toString().substring(0, 4) + '-' + date.toString().substring(4, 6) + '-' + date.toString().substring(6, 8);
}

/**
 * 日期字符串转换
 * @param date
 * @returns {string}
 */
export function formatDateShort(date) {
    return date.substring(0, 4) + '-' + date.substring(4, 6);
}

// 获取数组中最大最小值
export function getMaximin(arr, maximin) {
    if (maximin === 'max') {
        return Math.max.apply(Math, arr);
    }
    else if (maximin === 'min') {
        return Math.min.apply(Math, arr);
    }
}

export function fmtReportStatus(type) {
    switch (type) {
        case '-1':
            return '未申请';
        case '0':
            return '生成中';
        case '1':
            return '未下载';
        case '2':
            return '已下载';
    }
}

// 日期转换
export function fmtDateType(type) {
    switch (type) {
        case 1:
            return '查看日期';
        case 2:
            return '排查日期';
        case 3:
            return '处置日期';
    }
}

// 说明转换
export function fmtExplainType(type) {
    switch (type) {
        case 1:
            return '查看说明';
        case 2:
            return '排查说明';
        case 3:
            return '处置说明';
    }
}
// 判断是不是直辖市
export function isDirectlyCity(city) {
    return directlyCity.indexOf(city) !== -1;
}
// 千分位
export function thousands(num) {
    if (isNaN(parseFloat(num))) {
        return '0';
    }
    return ('' + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
}
