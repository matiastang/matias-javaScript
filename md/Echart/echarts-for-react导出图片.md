

# echarts-for-react

`echarts-for-react`库`ReactEcharts`组件画图，如果需要导出图片，需要使用`ref`获取到`echartsInstance`才能调用`echart`相关的`API`。
获取图片[echart getDataURL](https://echarts.apache.org/zh/api.html#echartsInstance.getDataURL)
**注意**: 如果渲染后马上获取，如果获取到的图片没有数据，则可能为：`echarts实例的配置项中配置了animation`，要么设置`animation: false`关闭动画，要么延迟获取图片。

```jsx
/* 
 * @Author: Ashima 
 * @Date: 2021-02-22 09:53:25  
 * @Description:  宏观分析-跨境资金流动预测 
 * @Last Modified by: Ashima
 * @Last Modified time: 2021-02-25 11:22:40
 */
import React, { useEffect, useState, useRef, Component } from 'react';
import styles from './toPredict.scss';
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import Cns from 'classnames';
import { Spin, Select, Icon } from 'antd';
import { isArray, isNotEmpty, isNumber } from 'utils/util';

const { Option } = Select;
/**
 * 宏观分析-跨境资金流动预测
 */
export default function ToPredict() {

    const bubbleChartRef = useRef(null);
    const [ bubbleOption, setBubbleOption] = useState(null);


    const setBubbleChart = () => {
        let data = [
            [[28604, 77, 17096869, 'Australia', 1990], [31163, 77.4, 27662440, 'Canada', 1990], [1516, 68, 1154605773, 'China', 1990], [13670, 74.7, 10582082, 'Cuba', 1990], [28599, 75, 4986705, 'Finland', 1990], [29476, 77.1, 56943299, 'France', 1990], [31476, 75.4, 78958237, 'Germany', 1990], [28666, 78.1, 254830, 'Iceland', 1990], [1777, 57.7, 870601776, 'India', 1990], [29550, 79.1, 122249285, 'Japan', 1990], [2076, 67.9, 20194354, 'North Korea', 1990], [12087, 72, 42972254, 'South Korea', 1990], [24021, 75.4, 3397534, 'New Zealand', 1990], [43296, 76.8, 4240375, 'Norway', 1990], [10088, 70.8, 38195258, 'Poland', 1990], [19349, 69.6, 147568552, 'Russia', 1990], [10670, 67.3, 53994605, 'Turkey', 1990], [26424, 75.7, 57110117, 'United Kingdom', 1990], [37062, 75.4, 252847810, 'United States', 1990]],
            [[44056, 81.8, 23968973, 'Australia', 2015], [43294, 81.7, 35939927, 'Canada', 2015], [13334, 76.9, 1376048943, 'China', 2015], [21291, 78.5, 11389562, 'Cuba', 2015], [38923, 80.8, 5503457, 'Finland', 2015], [37599, 81.9, 64395345, 'France', 2015], [44053, 81.1, 80688545, 'Germany', 2015], [42182, 82.8, 329425, 'Iceland', 2015], [5903, 66.8, 1311050527, 'India', 2015], [36162, 83.5, 126573481, 'Japan', 2015], [1390, 71.4, 25155317, 'North Korea', 2015], [34644, 80.7, 50293439, 'South Korea', 2015], [34186, 80.6, 4528526, 'New Zealand', 2015], [64304, 81.6, 5210967, 'Norway', 2015], [24787, 77.3, 38611794, 'Poland', 2015], [23038, 73.13, 143456918, 'Russia', 2015], [19360, 76.5, 78665830, 'Turkey', 2015], [38225, 81.4, 64715810, 'United Kingdom', 2015], [53354, 79.1, 321773631, 'United States', 2015]]
        ];
        let bubbleOption = {
            legend: {
                right: 10,
                data: ['1990', '2015'],
                show: false
            },
            xAxis: {
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#9EA9BC'
                },
                axisLine: {
                    lineStyle: {
                        color: '#9ea9bc'
                    }
                }
            },
            yAxis: {
                splitLine: {
                    lineStyle: { color: '#d8dce4' }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: '#9EA9BC'
                },
                axisLine: {
                    lineStyle: {
                        color: '#9ea9bc'
                    }
                },
                scale: true
            },
            series: [{
                name: '1990',
                data: data[0],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#9EA9BC',
                        formatter: function (param) {
                            return (param.data[3] + ' ' + param.data[2]);
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(120, 36, 50, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: '#FB947B'
                    }, {
                        offset: 1,
                        color: '#FB947B'
                    }])
                }
            }, {
                name: '2015',
                data: data[1],
                type: 'scatter',
                symbolSize: function (data) {
                    return Math.sqrt(data[2]) / 5e2;
                },
                emphasis: {
                    label: {
                        show: true,
                        color: '#9EA9BC',
                        formatter: function (param) {
                            return param.data[3];
                        },
                        position: 'top'
                    }
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                    shadowOffsetY: 5,
                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                        offset: 0,
                        color: '#2269E4'
                    }, {
                        offset: 1,
                        color: '#2269E4'
                    }])
                }
            }]
        };
        setBubbleOption(bubbleOption);
    };

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

    const selectChange = (value) => {
        if (value === '1') {
            const echartInstance = bubbleChartRef.current.getEchartsInstance();
            const opts = {
                // 导出的格式，可选 png, jpeg
                type: 'png',
                // 导出的图片分辨率比例，默认为 1。
                pixelRatio: '1',
                // 导出的图片背景色，默认使用 option 里的 backgroundColor
                backgroundColor: '#fff'
                // ,
                // // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
                // excludeComponents?: Array.<string>
            };
            const base64 = echartInstance.getDataURL(opts);
            downloadFileByBase64(base64);
        }
    };

    useEffect(() => {
        setBubbleChart();
    }, []);

    return (
        <div className={styles.toPredict}>
            <div className={styles.header}>指标分析</div>
            <div className={styles.line}>

                <div className={styles.right}>
                    <div className={styles.container}>
                        <div className={styles.title}>
                            <span>大宗商品指数</span>
                            <Select
                                className="skyThemeSelect"
                                defaultValue="all"
                                onChange={ selectChange }
                                suffixIcon={<Icon type="caret-down" style={{ fontSize: '12px' }} />}>
                                <Option value="all">全部行业</Option>
                                <Option value="1">有监督模型</Option>
                            </Select>
                        </div>
                        <div className={styles.chartContainer}>
                            {bubbleOption ?
                                <ReactEcharts
                                    ref={ bubbleChartRef }
                                    style={{ height: '100%', width: '100%' }}
                                    option={bubbleOption} /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```