<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-05 14:52:44
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2021-02-05 14:53:40
 * @Description: innerHTML、innerText和outerHTML、outerText的区别
-->
# innerHTML、innerText和outerHTML、outerText的区别

简单的说innerHTML和outerHTML、innerText与outerText的不同之处在于： 
1. innerHTML与outerHTML在设置对象的内容时包含的HTML会被解析，而innerText与outerText则不会。 
2. 在设置时，innerHTML与innerText仅设置标签内的文本，而outerHTML与outerText设置包括标签在内的文本。 