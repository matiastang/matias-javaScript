<!--
 * @Author: matiastang
 * @Date: 2022-07-25 10:34:43
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-25 11:01:50
 * @FilePath: /matias-javaScript/md/数据持久化/localStorage.md
 * @Description: localStorage
-->
# localStorage

[DOM 存储简介](https://docs.microsoft.com/zh-cn/previous-versions//cc197062(v=vs.85)?redirectedfrom=MSDN)

localStorage是无法跨域的，也无法让子域名继承父域名的localStorage数据

## 访问限制

每个域和子域都具有自己单独的本地存储区域。 域可以访问子域的存储区域，而子域也可以访问父域的存储区域。 例如， localStorage['example.com'] 可由 example.com 及其任何子域访问。 子域 localStorage['www.example.com'] 可由 example.com 访问，但不能由其他子域访问，如 mail.example.com。

<!-- 在主域中设置为Cookie-
```
document.cookie ="key=value;domain=.mydomain.com"
```
然后从任何主域或子域中获取数据并将其设置在localStorage上 -->

2个域mydomain.com和subdomain.mydomain.com只能在Set-Cookie头中明确指定域的情况下共享Cookie。 否则，cookie的范围仅限于请求主机。 （这被称为“仅限主机cookie”。）

例如，如果从subdomain.mydomain.com:Set-Cookie: name=value
然后，就不会将cookie发送给mydomain.com但是，如果使用以下内容，则在这两个域上都可以使用它：Set-Cookie: name=value; domain=mydomain.com
在RFC 2109，没有前导点的域意味着不能在子域上使用它，而只有一个前导点(.mydomain.com)允许跨子域使用。

然而，现代浏览器尊重更新的规范。RFC 6265，并将忽略任何前导点，这意味着您可以在子域和顶级域上使用cookie。

总之，如果像上面的第二个例子一样设置了一个cookie，那么mydomain.com它可以通过subdomain.mydomain.com，反之亦然。

## 大小限制

* localStorage 5MB+ 限制是指所有 value 的总大小限制。
* 单个 key 达到上限，无法继续设置其他 key。
* 超出上限会抛出 DOMException 错误，而不是替换。

## iframe 跨域访问

[跨域LocalStorage访问](https://github.com/ofirdagan/cross-domain-local-storage)

两个不同的域名的localStorage不能直接互相访问。那么如何在domain2.com中如何调用domain1.com的localStorage?

第一种
在domain2.com的页面中，嵌入一个src为domain1.com的iframe，此时这个iframe里可以调用domain1.com的localstorage。用postMessage方法实现页面与iframe之间的通信。
我们可以优化下iframe，我们可以在domain1.com中专门写一个负责共享localstorage的页面，这样可以防止无用的资源加载到iframe中。

第二种
利用cookie设置9999天的过期时间来实现，并且设置domain为同一站点。

$.cookie('historyArr', historyArr, {
	expires: 9999,
	path: '/',
	domain: 'XXX.com'
});
不过cookie这种方法会有不足，因为cookie机制的问题，有些http请求会携带本地cookie。