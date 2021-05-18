/*
 * @Descripttion: 
 * @version: 
 * @Author: matias tang
 * @Date: 2020-09-25 11:24:40
 * @LastEditors: matias tang
 * @LastEditTime: 2020-09-25 14:17:13
 */
// [IOS设备机型的识别](https://blog.csdn.net/github_37373329/article/details/84990706)
/*
js获取设备信息有以下几种方式

使用浏览器的userAgent获取（对安卓有效）
通过屏幕尺寸判断，但是这种方式只能粗粒度的得到一组设备，不能细粒度区分。如6s和7/8 的屏幕宽高比都是一样的，所以没办法做到最细粒度区分
通过CPU压力测试，不稳定，精度不高，不推荐
获取GPU信息检测设备，该方法在iOS12.2之前没问题，但是在iOS12.2之后，苹果删除了这个信息，只能拿到Apple GPU这个标识
最后一种方式，也是目前有效的一种方法，通过webGL 信息获取，[参考这篇博客]()
*/
let canvas, gl, glRenderer, models,iosDevices = {
    "Apple A7 GPU": {
        1136: ["iPhone 5", "iPhone 5s"],
        2048: ["iPad Air", "iPad Mini 2", "iPad Mini 3"]
    },

    "Apple A8 GPU": {
        1334: ["iPhone 6"],
        2208: ["iPhone 6 Plus"],
        2048: ["iPad Air 2", "iPad Mini 4"]
    },

    "Apple A9 GPU": {
        1136: ["iPhone SE"],
        1334: ["iPhone 6s"],
        2208: ["iPhone 6s Plus"],
    },

    "Apple A10 GPU": {
        1334: ["iPhone 7"],
        2208: ["iPhone 7 Plus"]
    },

    "Apple A11 GPU": {
        1334: ["iPhone 8"],
        2208: ["iPhone 8 Plus"],
        2436: ["iPhone X"],
    },

    "Apple A12 GPU": {
        2436: ["iPhone XS"],
        2688: ["iPhone XS MAX"],
        1792: ["iphone XR"]
    },
}

function isIPhoneX(fn){
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isIOS) {    	
        if (screen.height == 812 && screen.width == 375){
    	    //是iphoneX
        }else{
        	//不是iphoneX
        } 
    }
}

/**
 * @name: 判断安卓
 * @test: test font
 * @msg: 
 * @param {type} 
 * @return {type} 
 */
const isAndroid = () => {
    let u = navigator.userAgent
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        if (window.ShowFitness !== undefined) return true
    }
    return false
}

/**
 * @name: 判断设备为 ios
 * @test: test font
 * @msg: 
 * @param {type} 
 * @return {type} 
 */
const isIos = () => {
    var u = navigator.userAgent
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        return true
    }
    return false
    // let u = navigator.userAgent
    // let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
    // return isIOS
}

/**
 * @name: 判断设备为 微信浏览器
 * @test: test font
 * @msg: 
 * @param {type} 
 * @return {type} 
 */
const isWX = () => {
    let ua = window.navigator.userAgent,
    app = window.navigator.appVersion;
    // alert('浏览器版本: ' + app + '\n' + '用户代理: ' + ua);
    // if(!!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
    //     // ios端 
    //     console.log('ios端');
    // }
    // else if(ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
    //     // android端 
    //     console.log('android端');
    // }
    if (ua.match(/MicroMessenger/i) == 'MicroMessenger') {
        // 微信浏览器 
        console.log('微信浏览器');
        return true
    }
    return false
}

/**
 * @name: 判断iOS系统版本
 * @test: test font
 * @msg: 
 * @param {type} 
 * @return {type} 
 */
const iphoneVersion = () => {
    if (!isIos()) {
        return navigator.userAgent
    }
    let userAgent = window.navigator.userAgent
    let str = userAgent.toLowerCase(); 
    let version =str.match(/cpu iphone os (.*?) like mac os/);
    return version[1].replace(/_/g,".")
}

const iphoneModelsFromRenderer = () => {
    /*
    要找到确切的GPU型号名称，renderer.js必须将其包含在HTML中，例如：

    <script src="renderer.js" type="text/javascript" async></script>
    然后，要获取GPU型号名称，只需调用getRenderer传递回调函数的函数来处理结果：

    getRenderer(function(renderer) { console.log(renderer); } );
    默认情况下，CPU基准测试功能处于禁用状态，因为它可能需要几秒钟才能完成。要启用CPU基准测试，请传递tak.js脚本的同源URL。

    getRenderer(function(renderer) { console.log(renderer); }, "tak.js" );
    请注意，除非设备是它知道的Apple设备，否则“ getRenderer”功能将始终返回“未知”。如果您还想获取非Apple设备的渲染器名称，则可以将getRenderer与前面描述的WebGL查询结合使用：

    getRenderer(function (value) {
        if (value == 'Unknown') {
            var canvas = document.createElement("canvas");
            if (canvas != null) {
                var context = canvas.getContext("webgl") ||
                    canvas.getContext("experimental-webgl");
                if (context) {
                    var info = context.getExtension("WEBGL_debug_renderer_info");
                    if (info) {
                        value = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
                    }
                }
            }
        }                
        console.log(value);
    });
        */
    getRenderer(function (value) {
        debugger
        if (value == 'Unknown') {
            var canvas = document.createElement("canvas");
            if (canvas != null) {
                var context = canvas.getContext("webgl") ||
                    canvas.getContext("experimental-webgl");
                if (context) {
                    var info = context.getExtension("WEBGL_debug_renderer_info");
                    if (info) {
                        value = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
                    }
                }
            }
        }                
        console.log(value);
    })
}

const iphoneModels = () => {
    if (!isIos()) {
        return ['not ios']
    }
    let renderer= _GLRenderer()
    // iOS12.2之后,苹果删除了这个信息，只能拿到Apple GPU这个标识
    alert(renderer)
    let device = iosDevices[renderer]
    alert(device)
    if (device != undefined) {
        let deviceModel = device[_screenWidth()];
        if (deviceModel != undefined) {
            models = deviceModel
        }
    } else {
        models = ['unknown']
    }
    alert(models)
    return models
}

const _screenWidth = () => {
    console.log(Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1))
    return Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1)
}

const _canvas = () => {
    if (canvas == null) {
        canvas = document.createElement('canvas')
    }
    return canvas
}

const _gl = () => {
    if (gl == null) {
        gl = _canvas().getContext('experimental-webgl')
    }
    return gl
}

const _GLRenderer = () => {
    if (glRenderer == null) {
        let debugInfo = _gl().getExtension('WEBGL_debug_renderer_info');
        glRenderer = debugInfo == null ? 'unknown' : _gl().getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    }
    console.log(glRenderer);
    return glRenderer;
}

export {
    isAndroid,
    isIos,
    isWX,
    iphoneVersion,
    iphoneModels,
    iphoneModelsFromRenderer
}