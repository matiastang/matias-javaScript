
# Lodash中assign、extend、merge 的区别

`Lodash`中`assign`，`extend`，`merge` 函数，这三个函数用起来很相似，都是合并源对象的属性到目标对象中。
既然都是合并对象，它们之间到底有什么区别呢？

## assign

[assign](http://lodash.think2011.net/assign)
```js
_.assign(object, [sources])
```
分配来源对象的可枚举属性到目标对象上。 来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。

注意: 这方法会改变源对象，参考自 Object.assign.

## extend

[assignIn](http://lodash.think2011.net/assignIn)

```js
extend(object, [sources])
```
* 在 `3.x` 版本中，`extend` 是 `assign` 的别名，它们的作用是一模一样的。
* 在 `4.x` 版本中，`extend` 是 `assignIn` 的别名，和 `assign` 有点区别。

`assignIn` 这个方法类似 `_.assign`。 除了它会遍历并继承来源对象的属性。

## merge

[merge](http://lodash.think2011.net/merge)
```js
_.merge(object, [sources])
```
merge 也和 assign 类似，不同的地方在于 merge 遇到相同属性的时候，如果属性值为纯对象(plain object)或者集合(collection)时，不是用后面的属性值去覆盖前面的属性值，而是会把前后两个属性值合并。
如果源对象的属性值为 undefined，则会忽略该属性。

## 总结

###  相同之处

* 都可以用来合并对象
* 都会修改原来的对象 (如果原来的对象是作为函数的第一个参数的话)

### 不同之处

`assign` 函数不会处理原型链上的属性，也不会合并相同的属性，而是用后面的属性值覆盖前面的属性值
`extend`

* 3.x 版本中和 assign 一样
* 4.x 版本中会合并原型链上的属性

`merge` 遇到相同属性名的时候，如果属性值是纯对象或集合的时候，会合并属性值