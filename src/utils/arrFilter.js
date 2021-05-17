/**
 * Created by liyinhuan on 2017/6/20.
 */
export function filterArr(arrStr) {
    if (typeof arrStr === 'string') { // 将字符串转换成数组
        try {
            return JSON.parse(arrStr);
        } catch (e) {
            return [];
        }
    }
    return arrStr;
}

export function filterString(arrStr) {
    if (arrStr instanceof Array) { // 将数组转换成字符串
        try {
            return JSON.stringify(arrStr);
        } catch (e) {
            return [];
        }
    }
    return arrStr;
}

/**
 * 获取到tr的class
 * @returns {string}
 * @isAdd 是否处于新增状态
 * @editId 当前正在修改的id
 * @itemId 数据列表中每项的id
 */
export function getTrClass(isAdd, editId, itemId) {
    let className = '';
    if (isAdd) {
        className = 'disabled';
    } else if (editId === '') {
        className = '';
    } else if (editId !== '' && itemId === editId) {
        className = 'tableActive';
    } else {
        className = 'disabled';
    }
    return className;
}

/**
 * 格式化后台传递过来的tree结构
 * @param tree
 */
export function conversionTree(tree) {
    // 格式化后台传递过来的数据
    let classesStr = JSON.stringify(tree);
    let classesNew = classesStr
            .replace(/\"id\"/ig, '"value"')
            .replace(/\"name\"/ig, '"label"')
            .replace(/\"childList\"/ig, '"children"');
    return JSON.parse(classesNew);
}

/**
 * 向session中写入值
 * @param name
 * @param value
 */
export function saveSession(name, value) {
    if (((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0))) {
        document.cookie = name + '=' + value;
    } else {
        sessionStorage.setItem(name, value);
    }
}

/**
 * 读取session的值
 * @param name
 * @returns {*}
 */
export function getSession(name) {
    let returnValue = '';
    if (((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0))) {
        let cName = name + '=';
        let cookieArr = document.cookie.split(';');
        for (let i = 0; i < cookieArr.length; i++)
        {
            let itemInfo = cookieArr[i].trim();
            if (itemInfo.indexOf(cName) === 0) {
                returnValue = itemInfo.substring(cName.length, itemInfo.length);
            }
        }
    } else {
        returnValue = sessionStorage.getItem(name);
    }
    return returnValue;
}

/**
 * 移除session中的值
 * @param name
 */
export function removeSession(name) {
    if (((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0))) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    } else {
        sessionStorage.removeItem(name);
    }
}

export function fmtStatus(value) {
    switch (value) {
        case 'LEGAL':
            return '法定代表人';
        case 'INVEST':
            return '投资';
        case 'DIRECTOR':
            return '董事';
        case 'SUPERVISOR':
            return '监事';
        case 'EXECUTIVE':
            return '高管';
    }
}

export function fmtName(value) {
    switch (value) {
        case 'relatedParties1d':
            return '一度关联总数';
        case 'shareholders':
            return '一度关联股东数';
        case 'nonNaturalPersons1d':
            return '一度关联法人数';
        case 'nonIndividualShareholders':
            return '一度关联法人股东数';
        case 'subsidiaries':
            return '一度关联投资目标数';
        case 'naturalPersons1d':
            return '一度自然人数';
        case 'naturalPersonsProportion1d':
            return '一度关联自然人比例';
        case 'indiShareProportion':
            return '一度关联自然人股东比例';
        case 'individualShareholders':
            return '一度关联自然人股东数';
        case 'relatedParties2d':
            return '二度关联总数';
        case 'nonNaturalPersons2d':
            return '二度关联法人数';
        case 'naturalPersons2d':
            return '二度关联自然人人数';
        case 'naturalPersonsProportion2d':
            return '二度关联自然人比例';
        case 'relatedParties3d':
            return '三度关联总数';
        case 'nonNaturalPersons3d':
            return '三度关联法人数';
        case 'naturalPersons3d':
            return '三度关联自然人数';
        case 'naturalPersonsProportion3d':
            return '三度关联自然人数比例';
        case 'investchainCounter':
            return '投资链关联数';
    }
}
export function fmtType(value) {
    switch (value) {
        case 1:
            return '较低';
        case 2:
            return '中';
        case 3:
            return '较高';
        case 4:
            return '高';
    }
}
// 时间戳转日期
export function timestampToTime(timestamp) {
    // var date = new Date(timestamp * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const addZero = (s) => +s < 10 ? `0${s}` : s;
    const date = new Date(timestamp),
        Y = date.getFullYear() + '-',
        M = addZero((date.getMonth() + 1)) + '-',
        D = addZero(date.getDate()) + ' ',
        h = addZero(date.getHours()) + ':',
        m = addZero(date.getMinutes()) + ':',
        s = addZero(date.getSeconds());
    return Y + M + D + h + m + s;
}
// 判断关联图谱缩放
export function scaleData(nodesSize) {
    var data;
    if (nodesSize <= 100) {
        data = 1;
    }
    if (nodesSize > 100 && nodesSize <= 150) {
        data = 0.9;
    }
    if (nodesSize > 150 && nodesSize <= 200) {
        data = 0.8;
    }
    if (nodesSize > 200 && nodesSize <= 500 ) {
        data = 0.65;
    }
    if (nodesSize > 500 && nodesSize < 1000) {
        data = 0.6;
    }
    if (nodesSize >= 1000 && nodesSize < 2000) {
        data = 0.4;
    } 
    if (nodesSize >= 2000 && nodesSize < 3000) {
        data = 764.1 / nodesSize;
    } 
    if (nodesSize >= 3000) {
        data = 1200.1 / nodesSize;
    }  
    if (data > 1) {
        data = 1;
    } 
    return data;
}

// 去掉所有空格

export function Trim(str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, '');
    if (is_global.toLowerCase() === 'g') {
        result = result.replace(/\s/g, '');
    }
    return result;
}