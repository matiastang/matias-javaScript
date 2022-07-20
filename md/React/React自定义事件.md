<!--
 * @Author: matiastang
 * @Date: 2022-07-20 11:14:49
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-20 16:33:05
 * @FilePath: /matias-javaScript/md/React/React自定义事件.md
 * @Description: React 自定义事件
-->

# React 自定义事件

[React里如何给普通dom标签注册自定义事件?](https://segmentfault.com/q/1010000014632851)

## 在<micro-app>标签所在的文件顶部添加polyfill

因为React不支持自定义事件，所以我们需要引入一个polyfill。

在<micro-app>标签所在的文件顶部添加polyfill，注释也要复制。
```jsx
/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
```
复制代码Error复制成功
开始使用
```jsx
<micro-app
  name='xx'
  url='xx'
  onCreated={() => console.log('micro-app元素被创建')}
  onBeforemount={() => console.log('即将被渲染')}
  onMounted={() => console.log('已经渲染完成')}
  onUnmount={() => console.log('已经卸载')}
  onError={() => console.log('渲染出错')}
/>
```

## EventEmitter

```jsx
var EventEmitter = require('events').EventEmitter;
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
 
let emitter = new EventEmitter();
 
class ListItem extends Component{
    static defaultProps = {
        checked: false
    };
    constructor(props){
        super(props);
    }
    render(){
        return (
            <li>
                <input type="checkbox" checked={this.props.checked} onChange={this.props.onChange} />
                <span>{this.props.value}</span>
            </li>
        );
    }
}
 
class List extends Component{
    constructor(props){
        super(props);
 
        this.state = {
            list: this.props.list.map(entry=>({
                text:entry.text,
                checked:entry.checked || false
            }))
        };
        console.log(this.state);
    }
 
    onItemChange(entry){
        const {list} = this.state;
        this.setState({
            list:list.map(prevEntry=>({
                text: prevEntry.text,
                checked:prevEntry.text === entry.text? !prevEntry.checked : prevEntry.checked
            }))
        });
		//这里触发事件
        emitter.emit('ItemChange',entry);
    }
    render(){
        return (
            <div>
                <ul>
                    {this.state.list.map((entry,index)=>{
                        return (<ListItem
                            key={`list-${index}`}
                            value = {entry.text}
                            checked = {entry.checked}
                            onChange = {this.onItemChange.bind(this, entry)}
                        />);
                    })}
                </ul>
            </div>
        );
    }
}
 
class App extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.itemChange = emitter.addListener('ItemChange',(msg,data)=>console.log(msg));//注册事件
    }
    componentWillUnmount(){
        emitter.removeListener(this.itemChange);//取消事件
    }
    render(){
        return (
            <List list={[{text:1},{text:2}]}/>
        )
    }
}
 
ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

## CustomEvent | Event

可以使用[CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent/CustomEvent)创建自定义事件

```js

// add an appropriate event listener
something.addEventListener("eureka", function(e) { process(e.detail) });

// create and dispatch the event
var event = new CustomEvent("eureka", {
  detail: {
    floatingBot: true
  }
});
obj.dispatchEvent(event);
```

## ref

React 中 DOM 元素 props 绑定的是 ReactDOM 的 SyntheticEvents 所以自定义的事件没法监听。可以结合 ref 在 componentDidMount 和 componentWillUnmount 中手动绑定和解绑。

在适当的生命周期里通过ref获得dom 然后再以dom.addEventListener("自定义事件名",...other)进行监听么