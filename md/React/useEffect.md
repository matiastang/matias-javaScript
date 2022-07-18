<!--
 * @Author: matiastang
 * @Date: 2022-07-18 13:51:06
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-18 13:52:37
 * @FilePath: /matias-javaScript/md/React/useEffect.md
 * @Description: 
-->
[useEffect](https://blog.csdn.net/weixin_36766850/article/details/121566931)

第二个参数是空，挂载和更新都渲染。当是[]，挂载渲染。

当[数据]

当依赖是基础数据类型时，挂载和更新渲染

当依赖是引用类型,数组和对象时，会一直渲染 ，因为useEffect是浅层对比，每次比较返回的结果都是false

解决办法：

A={a:1,b:1}

useEffect(()=>{},[A]

1、依赖改为设置对象或者数组中的某个值，如useEffect(()=>{},[A.a]

2、使用usePrevious,利用useRef能保存上一次渲染内容的办法

import React, {useState, useRef,useEffect} from 'react'
 
function usePrevious<T>(state: T, compare?: (prev: T | undefined, next: T) => boolean): T | undefined {
  const ref = useRef<T>();
 
  useEffect(() => {
    const needUpdate = typeof compare === 'function' ? compare(ref.current, state) : true;
    if (needUpdate) {
      ref.current = state;
    }
  });
 
  return ref.current;
}
 
function A(props){
    const [obj,setObj]=useState({a:1,b:1})
    const preObj=usePrevious(obj)
 
     useEffect(() => {
         if(preObj && preObj.a !=obj.a)
            console.log(obj.a)
     },[obj]);
 
    return (
        <></>
    )
}
usePrevious 方法转载作者：倒影
链接：https://juejin.cn/post/6952118323559530504
来源：稀土掘金
 3、使用

yarn add --save use-deep-compare-effect

useDeepCompareEffect(
  function() {
    // effect操作
  },
  [obj]
);
方法4：

1、当依赖为数组时，通过useRef解决。

const {current:dep}=useRef(['dep'])
2、当依赖为对象时，使用useMemo,只有依赖关系发生变化时，才会重新计算记忆化的值。

const obj=useMemo(()=>({
name:'app'
}),[])
3、函数作为依赖，使用useCallback返回memoized版本的回调，只有依赖关系发生变化时才会改变。

const func=useCallbak(()=>{
        return '1'

},[])