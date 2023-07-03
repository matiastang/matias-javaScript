<!--
 * @Author: tangdaoyong
 * @Date: 2021-02-05 15:00:47
 * @LastEditors: tangdaoyong
 * @LastEditTime: 2023-04-09 15:33:07
 * @Description: Proxy 详解
-->

# Proxy 详解

`Vue 3.0`中使用`Proxy`替代`Object.defineProperty()`实现响应式。

[MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
[Proxy 详解](https://mp.weixin.qq.com/s/Nvp_N4Sj0PlBqXjTis7UCQ)
[MDN Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

Proxy和deﬁneProperty的区别
// 构建一个代理对象 第一个参数：需要代理的目标对象
const personProxy = new Proxy(person, {
  // 监视属性读取
  get (target, property) {} // 代理的目标对象 外部访问的属性名

  // 监视属性设置
  set (target, property, value) {} // 代理的目标对象 外部访问的属性名 写入的属性名
})
Proxy 更强大。Object.defineProperty() 只能监视属性的读写，Proxy 能监视到更多对象操作，如 deleteProperty、has等等
Proxy对数组对象的监视支持更好。以往想通过 Object.defineProperty() 去监视数组操作，最常见的一种方式时通过 重写数组 的操作方法（通过自定义的方法 去覆盖掉 数组原先对象的push、shift等方法 以此去 劫持对应这个方法调用的过程）但 Proxy 内部会自动根据 push 等操作去推算出它应该所处的下标
Proxy 是以非侵入的方式监管了对象的读写。也就是说已经定义好的对象，不需要对对象本身做任何操作 就可以监视到内部成员的读写，而 Object.defineproperty() 就要求我们必须通过 特定方式单独定义对象中需要被监视的属性