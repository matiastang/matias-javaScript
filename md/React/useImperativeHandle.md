<!--
 * @Author: matiastang
 * @Date: 2022-07-18 13:56:42
 * @LastEditors: matiastang
 * @LastEditTime: 2022-07-18 14:01:10
 * @FilePath: /matias-javaScript/md/React/useImperativeHandle.md
 * @Description: 
-->
[React中父组件如何调用子组件的方法？useImperativeHandle就够了](https://juejin.cn/post/7103749617308663816)
[React父组件调用子组件属性和方法](http://wmm66.com/index/article/detail/id/245.html)

子组件暴露自身的属性和方法

父组件使用ref绑定对应的子组件。调用即可

类组件绑定ref示例

import React from 'react'
import Child from './Child'

export default class Parent extends React.Component {
  // ...
  render() {
    return (
      <div>
        <Child ref={ref => this.refChild = ref} />
        {/* ... */}
      </div>
    )
  }
}
函数组件绑定ref示例
import React, { useRef } from 'react'
import Child from './Child'

export default function Parent(props) {
  const refChild = useRef(null)
  // ...
  return (
    <div>
      <Child ref={refChild} />
      {/* ... */}
    </div>
  )
}

## 子组件为类组件
当子类为类组件时，比较简单，无需特殊处理。

子类的实例可以直接调用类属性和方法。

这是ES6固有的语法

// 子组件为类组件时 - 示例代码
import React from 'react'

export default class Child extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1,
      name: 'wmm66'
    }
  }
  addCount = (step) => {
    this.setState((state, props) => {
      return { count: state.count + step }
    })
  }
  render() {
    const { count, name } = this.state
    return (
      <div>
        <div>{count} -- {name}</div>
        <button onClick={this.addCount.bind(this, 2)}>加2</button>
      </div>
    )
  }
}

// 父组件调用子组件示例
console.log('child count: ', this.refChild.state.count)
this.refChild.addCount(3)

## 子组件为函数组件
当子类为函数组件时，需要使用React.forwardRef包裹。

并用React.useImperativeHandle将需要访问的属性和方法暴露出去

// 子组件为函数组件时 - 示例代码
import React, { useState, useImperativeHandle, forwardRef } from 'react'

const Child = forwardRef(function _Child(props, ref) {
  // 将外部需要访问的属性和方法暴露出去
  useImperativeHandle(ref, () => ({
    count,
    addCount,
  }))

  const [count, setCount] = useState(1)
  const [name, setName] = useState('wmm66')

  const addCount = (step) => {
    setCount(count + step)
  }

  return (
    <div>
      <div>{count} -- {name}</div>
      <button onClick={() => addCount(2)}>加2</button>
    </div>
  )
})

export default Child

// 父组件调用子组件示例
console.log('child count: ', refChild.current.count)
refChild.current.addCount(step)

```ts
/*
 * @Author: matiastang
 * @Date: 2022-05-31 18:40:10
 * @LastEditors: matiastang
 * @LastEditTime: 2022-06-25 13:25:47
 * @FilePath: /papillon-web-matias/src/pages/user/login/components/CaptchaInput/index.tsx
 * @Description: 验证码输入框
 */
import { memo, useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import { Input, message, Spin } from 'antd'
import { getCaptcha } from '@/services/login/api'
import classNames from 'classnames'
import styles from './index.less'

export type CaptchaInputType = {
    className?: string
    style?: React.CSSProperties
    onChange: (uuid: string | null, code: string) => void
}

const CaptchaInput = forwardRef<{ refresh: () => void}, CaptchaInputType>((props, ref) => {
    const { className, style } = props

    const [loading, setLoading] = useState(false)
    const [captchaImg, setCaptchaImg] = useState<string | null>(null)
    const [captchaCode, setCaptchaCode] = useState('')
    const [captchaUUID, setCaptchaUUID] = useState<string | null>(null)

    useEffect(() => {
        refreshCaptcha()
    }, [])

    useEffect(() => {
        props.onChange && props.onChange(captchaUUID, captchaCode)
    }, [captchaCode, captchaUUID])

    useImperativeHandle(ref, () => ({
        refresh: refreshCaptcha
    }))

    /**
     * 获取图形验证码
     */
    const refreshCaptcha = () => {
        setLoading(true)
        getCaptcha().then(res => {
            if (!res) {
                return
            }
            const data = res.data
            if (!data) {
                return
            }
            const img = data.img
            if (img) {
                setCaptchaImg(img)
            }
            const uuid = data.uuid
            if (uuid) {
                setCaptchaUUID(uuid)
            }
        }).catch(err => {
            message.error(err)
        })
        .finally(() => setLoading(false))
    }

    return <div className={classNames([styles.contents, className])} style={style}>
        <Input
            prefix={
                <img className={styles.prefixIcon} src={ require('@/static/img/verify-icon.svg') }></img>
            }
            placeholder="请输入验证码"
            allowClear={true}
            onChange={(e) => setCaptchaCode(e.target.value)}
        ></Input>
        <div className={styles.captcha} onClick={refreshCaptcha}>
            <Spin spinning={loading} style={{ height: 40, width: 82 }}>
                {
                    captchaImg && <img className={styles.img} src={`data:image/png;base64,${captchaImg}`} />
                }
            </Spin>
        </div>
    </div>
})

export default memo(CaptchaInput)
```
```ts
import CaptchaInput from '../CaptchaInput'

const captchaRef = useRef<{ refresh: () => void} | null>(null)

if (captchaRef) {
    captchaRef.current && captchaRef.current.refresh()
}
<CaptchaInput
    ref={captchaRef}
    onChange={(uuid, code) => {
        setCaptchaUUID(uuid)
        setCaptchaCode(code)
    }}
></CaptchaInput>
```