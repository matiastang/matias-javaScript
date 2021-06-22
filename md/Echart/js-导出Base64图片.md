<!--
 * @Author: tangdaoyong
 * @Date: 2021-06-21 14:45:42
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-06-21 16:59:25
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
```js
var ret="/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAB+AGYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD36iiigAooryj4k/Fo+HLmTSNFjSXUFAMk7EMkee2Ac7v8QfagTdj1Ka5t7fHnzxRZ6b3C5/Ouf1zx/wCGPDyn7fq8AkAB8qJvMcg9wo5r5K1TWdR1Wdpr+8nuZCS2ZXJxnrgdAPYUzS4BcXDJIPl2MR9cUrk8x77e/tA6HBftHbafd3NqpA80AKT9Aa7XRfiR";
          document.all['pic1'].src = "data:image/jpg;base64," + ret;  
//下载图片
        function download(){
                let imgData = "data:image/jpg;base64," + ret;  
                this.downloadFile('测试.png', imgData);
            }
      //下载
     function downloadFile(fileName, content) {
        let aLink = document.createElement('a');
        let blob = this.base64ToBlob(content); //new Blob([content]);

        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
        aLink.download = fileName;
        aLink.href = URL.createObjectURL(blob);

        // aLink.dispatchEvent(evt);
        aLink.click()
      }
      //base64转blob
      function base64ToBlob(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;

        let uInt8Array = new Uint8Array(rawLength);

        for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {type: contentType});
      }
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