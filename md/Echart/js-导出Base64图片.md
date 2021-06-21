<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-21 14:45:42
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-21 14:50:22
 * @Description: js导出Base64图片
-->
# js导出Base64图片

```js
const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};

const downloadFile = (url, name = 'What\'s the fuvk') => {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', name);
    a.setAttribute('target', '_blank');
    let clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent('click', true, true);  
    a.dispatchEvent(clickEvent);
};

const downloadFileByBase64 = (base64, name) => {
    var myBlob = dataURLtoBlob(base64);
    var myUrl = URL.createObjectURL(myBlob);
    downloadFile(myUrl, name);
};
// 参数
downloadFileByBase64('data:image/png;base64,***');
```

`downloadFileByBase64`参数需要有前缀，如`data:image/png;base64,**`。如果`base64`数据没有前缀，需要确定文件类型，硬编码前缀。
```js
// JS转Base64之后的data类型
getBase64Type(type) {
    switch (type) {
        case 'txt': return 'data:text/plain;base64,';
        case 'doc': return 'data:application/msword;base64,';
        case 'docx': return 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,';
        case 'xls': return 'data:application/vnd.ms-excel;base64,';
        case 'xlsx': return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        case 'pdf': return 'data:application/pdf;base64,';
        case 'pptx': return 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,';
        case 'ppt': return 'data:application/vnd.ms-powerpoint;base64,';
        case 'png': return 'data:image/png;base64,';
        case 'jpg': return 'data:image/jpeg;base64,';
        case 'gif': return 'data:image/gif;base64,';
        case 'svg': return 'data:image/svg+xml;base64,';
        case 'ico': return 'data:image/x-icon;base64,';
        case 'bmp': return 'data:image/bmp;base64,';
    }
}
```
获取文件后缀
```js
getType(file) {
    var filename = file;
    var index1 = filename.lastIndexOf(".");
    var index2 = filename.length;
    var type = filename.substring(index1 + 1, index2);
    return type;
}
```