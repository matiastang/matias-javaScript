/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 16:39:02
 * @LastEditTime: 2021-05-13 13:44:24
 * @LastEditors: tangdaoyong
 * * bbdBar 柱状图
 * bbdRadar 雷达图
 * bbdPie 饼状图
 * bbdLine 折线图
 * bbdWaterPolo 水球仪
 * bbdmap 地图
 * bbdGauge 仪表盘
 * scatterBase 气泡图
 */
import React from 'react';
import findIndex from 'lodash/findIndex';
import { insert_flg } from 'utils/util';
import echarts from 'echarts';
import emitter from 'utils/emitter';
const CHATBBD = {
    bbdRadar: function(params, callBack) {
        let RadarChart = echarts.init(document.getElementById(params.chartName));
        let seriesData = [];
        RadarChart.showLoading();
        for (let i = 0; i < params.series.length; i++) {
            let seriesItem = {
                type: 'radar',
                name: '',
                data: [
                    {
                        value: params.series[i],
                        // name: params.legend[i],
                        areaStyle: {
                            normal: {
                                color: 'rgba(255, 255, 255, 0.5)'
                            }
                        },
                        symbolSize: 0
                    }
                ]
            };
            seriesData.push(seriesItem);
        }
        let options = {
            color: params.color,
            title: {
                text: params.title,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                }
            },
            legend: {
                show: params.legendShow === undefined ? true : params.legendShow,
                data: params.legend === undefined ? [] : params.legend
            },
            tooltip: {
                extraCssText: 'box-shadow: 2px 0 10px 0 rgba(0,0,0,0.12)',
                backgroundColor: 'rgba(255,255,255,0.8)',
                textStyle: {
                    color: '#333333',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                formatter: function(param, s) {
                    let dataArr = params.indicator.map(item => {
                        return item.name + ':' + item.value;
                    });
                    return dataArr.join('<br/>');
                },
                padding: [10, 10, 10, 10]
            },
            radar: {
                nameGap: 3, // 指示器名称和指示器轴的距离
                radius: '55%',
                shape: 'circle', // 雷达图绘制类型，支持 'polygon' 和 'circle'。
                splitArea: {
                    areaStyle: {
                        color: [
                            'rgba(255, 255, 255, 0.9)',
                            'rgba(213, 242, 250, 1)',
                            'rgba(158, 236, 255, 1)',
                            'rgba(85, 195, 254, 1)',
                            'rgba(2, 168, 254, 1)'
                        ],
                        shadowColor: 'rgba(255, 255, 255, 0.3)',
                        shadowBlur: 10
                    }
                },
                triggerEvent: true,
                axisLabel: {
                    textStyle: {
                        show: true,
                        align: 'center',
                        color: 'red'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.7)', // 中间的米字线
                        type: 'dashed' // 米字线类型
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.7)' // 中间的米字线
                    }
                },
                name: {
                    textStyle: {
                        color: '#999'
                    },
                    formatter: function(value, indicator) {
                        // indicator.name + '\n  (' + indicator.value + ')分'
                        return `${indicator.name}\n${indicator.value}分`;
                    }
                },
                indicator: params.indicator
            },
            series: seriesData
        };
        RadarChart.hideLoading();
        ECHART_ROOM.push(RadarChart);
        RadarChart.setOption(options);
        window.addEventListener('resize', () => {
            RadarChart.resize();
        });
        RadarChart.on('mouseover', function(param) {
            param.event.event.preventDefault();
            if (param.targetType === 'axisName') {
                let tipDemo = document.getElementById('radar-lable-tip');
                let offsetX = param.event.offsetX;
                let offsetY = param.event.offsetY;
                let newX = offsetX;
                let newY = offsetY;
                if (offsetX >= 250) {
                    newX = offsetX - 190;
                }

                if (newY >= 250) {
                    newY = offsetY - 170;
                } else {
                    newY = offsetY + 20;
                }
                tipDemo.innerHTML = params.tipsText[param.name.split('\n')[0]];
                tipDemo.style.top = newY + 'px';
                tipDemo.style.left = newX + 'px';
                tipDemo.style.display = 'block';
            }
        });
        RadarChart.on('mouseout', function(param) {
            if (param.targetType === 'axisName') {
                param.event.event.preventDefault();
                let tipDemo = document.getElementById('radar-lable-tip');
                tipDemo.innerHTML = '';
                tipDemo.style.display = 'none';
            }
        });
        RadarChart.on('click', function(param) {
            if (param.targetType === 'axisName') {
                let name = param.name.split('\n')[0];
                emitter.emit('SCANNING_NAME', name);
            }
        });
    },
    bbdLine: function(params, callBack) {
        let LineChart = echarts.init(document.getElementById(params.chartName));
        let gradientColor = params.gradientColor === undefined ? [
            [{ offset: 0, color: 'rgb(244, 250, 254)' }, { offset: 1, color: 'rgb(130, 201, 238)' }],
            [{ offset: 0, color: '#258dee' }, { offset: 1, color: '#258dee' }],
            [{ offset: 0, color: '#74c6f5' }, { offset: 1, color: '#74c6f5' }]
        ] : params.gradientColor; // 渐变颜色
        let lineColor = ['#0c5ec2', '#258dee', '#74c6f5'];
        let seriesData = [];

        for (let i = 0; i < params.series.length; i++) {
            let item = {
                type: 'line',
                symbol: params.symbol === undefined ? 'emptyCircle' : params.symbol,
                symbolSize: params.symbolSize === undefined ? 4 : params.symbolSize,
                showSymbol: params.showSymbol === undefined ? true : params.showSymbol,
                smooth: params.smooth === undefined ? true : params.smooth, // 是否平滑显示
                name: params.legend[i],
                stack: params.stack === undefined ? null : params.stack,
                lineStyle: {
                    normal: {
                        type: 'solid',
                        color: params.lineStyleColor === undefined ? lineColor[i] : params.lineStyleColor[i],
                        opacity: params.lineStyleOpacity === undefined ? '0.5' : params.lineStyleOpacity,
                        width: params.lineStyleWidth === undefined ? 2 : params.lineStyleWidth
                    }
                },
                itemStyle: {
                    normal: params.itemStyle === undefined ? {
                        shadowColor: 'rgba(255, 255, 255, 0.5)',
                        shadowBlur: 5
                    } : params.itemStyle
                },
                cursor: 'pointer',
                data: params.series[i]
            };
            if (params.graphic) {
                item.areaStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, gradientColor[i])
                    }
                };
            }
            seriesData.push(item);
        }
        let options = {
            color: params.colors || ['#24a9ee', '#ffdb6b', '#fe6321'],
            title: {
                text: params.title,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                left: '30%'
            },
            grid: {
                height: params.height || 'auto',
                width: params.width || 'auto',
                left: params.left || '10%',
                top: params.top || 60,
                right: params.right || '10%',
                bottom: params.bottom || 60
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: params.tooltipTrigger === undefined ? 'none' : params.tooltipTrigger, // 默认为直线，可选为：'line' | 'shadow'
                    lineStyle: {
                        color: 'rgba(192, 224, 248, .8)'
                    },
                    snap: true
                },
                backgroundColor: 'rgba(255,255,255,1)',
                extraCssText: 'box-shadow: 2px 0 10px 0 rgba(0,0,0,0.12)',
                // formatter: '{b}:{c}',
                textStyle: {
                    color: '#333333',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '14'
                },
                padding: [10, 10, 10, 10],
                formatter: function(param) {
                    let info = '';
                    if (params.specialFormatter === 'gaugeTendChart') {
                        let newDate = param[0].name.substring(0, 4) + '-' + param[0].name.substring(4, 6);
                        info = `<div class="gaugeTendTip">
                                <p class="title">${newDate}</p>
                                <p class="tipMsg">口碑值：
                                    <span>${param[0].value > 0 ? '+' + param[0].value : param[0].value} </span>
                                </p>
                                <p  class="tipMsg">总体舆情情感：
                                    <span >${param[0].value > 0 ? '正面' : param[0].value === 0 ? '中性' : '负面'} </span>
                                </p>
                            <div>`;
                    } else if (params.specialFormatter === 'averageProfit') {
                        params.isCountry ?
                            info = `<div class="mapTooltip pieTooltip">
                                <p class = "title" style="font-size: 14px"><b>${param[0].name}</b></p>
                                <p style="text-align: left;font-size: 14px">${param[0].seriesName}<span class = "colorBlue" style="color:${param[0].color}">${param[0].value}%</span></p>
                            <div>` :
                            info = `<div class="mapTooltip pieTooltip">
                                <p class = "title" style="font-size: 14px"><b>${param[0].name}</b></p>
                                <p style="text-align: left;font-size: 14px">${param[1].seriesName}<span class = "colorBlue" style="color:${param[1].color}">${param[1].value}% </span></p>
                                <p style="text-align: left;font-size: 14px">${param[0].seriesName}<span class = "colorBlue" style="color:${param[0].color}">${param[0].value}%</span></p>
                            <div>`;
                    } else if (params.specialFormatter === 'eventLineChart') {
                        let data = param[0].data;
                        let newDate = data.news_pubdate.substring(0, 4) + '-' + data.news_pubdate.substring(4, 6) + '-' + data.news_pubdate.substring(6, 8);
                        info = `<div class="mapTooltip">
                                <p >${newDate}</p>
                                <p >舆情总量：${data.news_all_count}</p>
                                <p >负面舆情数：${data.news_minus_count}</p>
                                <p >正面舆情数：${data.news_positive_count}</p>
                                <p >中性舆情数：${data.news_middle_count}</p>
                            <div>`;
                    } else if (params.specialFormatter === 'eventTrend') {
                        info = `<div class ="mapTooltip pieTooltip">
                                    <p>${param[0].name}：<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                            <div>`;
                    } else if (params.specialFormatter === 'detailTrend') {
                        info = '<div style="text-align: left;"><span>' + param[0].name + '</span><br/>';
                        for (let i = 0; i < param.length; i++) {
                            let spanCorlor = '<span style=color:' + params.colors[i] + '>' + param[i].value + '</span><br/>';
                            info += param[i].seriesName + ' :&nbsp;' + spanCorlor;
                        }
                        info += '</div>';
                    } else if (params.specialFormatter === 'recrutment') {
                        info = '<div class="mapTooltip">' + param[0].name + '<br/>';
                        for (let i = 0; i < param.length; i++) {
                            let spanCorlor = '<span style=color:' + params.colors[i] + '>' + param[i].value + '</span><br/>';
                            info += param[i].seriesName + ' :&nbsp;' + spanCorlor;
                        }
                        info += '</div>';
                    } else {
                        params.isCountry ?
                            info = `<div class = "mapTooltip pieTooltip">
                            <p class = "title"><b>${param[0].name}</b></p>
                            <p>${params.labelName}<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                        <div>` :
                            info = `<div class = "mapTooltip pieTooltip">
                                <p class = "title"><b>${param[0].name}</b></p>
                                <p>${param[1].seriesName}${params.labelName}<span class = "color-yellow">${param[1].value} </span>${params.unit ? params.unit : ''}</p>
                                <p>${param[0].seriesName}${params.labelName}<span class = "color-yellow">${param[0].value} </span>${params.unit ? params.unit : ''}</p>
                            <div>`;
                    }
                    return info;
                }
            },
            legend: {
                data: params.legend,
                show: params.legendShow === undefined ? true : params.legendShow,
                itemWidth: params.regionLegend === undefined ? 6 : 25,
                itemHeight: params.regionLegend === undefined ? 6 : 14,
                icon: params.legendIcon === undefined ? null : params.legendIcon,
                top: '5%',
                left: params.legendLeft,
                right: params.legendRight,
                textStyle: {
                    color: '#999',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: 'microsoft yahei',
                    fontSize: '12'
                }
            },
            xAxis: {
                position: params.xPosition === undefined ? null : params.xPosition,
                name: params.xName === undefined ? null : params.xName,
                nameGap: 10,
                nameLocation: 'end',
                nameTextStyle: {
                    color: '#333',
                    fontStyle: 'normal',
                    fontWeight: 'bold',
                    fontFamily: 'sans-serif',
                    fontSize: 12
                },
                boundaryGap: params.xBoundaryGap === undefined ? true : params.xBoundaryGap,
                data: params.xAxis,
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.showSplitLine === undefined ? false : params.showSplitLine
                },
                axisLine: {
                    show: params.axisLineShow === undefined ? true : params.axisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#f2f2f2' : params.axisLineColor
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: params.labelTextColor === undefined ? '#333333' : params.labelTextColor
                    },
                    interval: params.interval === undefined ? 'auto' : params.interval,
                    rotate: params.rotate === undefined ? 0 : params.rotate,
                    align: params.align === undefined ? null : params.align,
                    verticalAlign: 'top'
                }
            },
            yAxis: {
                max: params.max === undefined ? null : params.max,
                min: params.min === undefined ? null : params.min,
                name: params.yAxisName === undefined ? '' : params.yAxisName,
                splitNumber: params.ySplitNumber === undefined ? null : params.ySplitNumber,
                nameTextStyle: {
                    color: params.nameTextColor || '#666',
                    fontSize: 12
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: params.showySplitLine === undefined ? true : params.showySplitLine, // 横坐标的间隔横线
                    lineStyle: {
                        color: params.splitLineColor === undefined ? 'rgba(242,242,242,0.9)' : params.splitLineColor
                    }
                },
                axisLine: {
                    show: params.yxisLineShow === undefined ? true : params.yxisLineShow,
                    lineStyle: {
                        width: 1,
                        color: params.axisLineColor === undefined ? '#f2f2f2' : params.axisLineColor
                    }
                },
                axisLabel: {
                    formatter: params.transformYAxis === undefined ? '{value}' : '{value}%',
                    show: true,
                    textStyle: {
                        color: params.labelTextColor === undefined ? '#333333' : params.labelTextColor
                    }
                },
                splitArea: {
                    show: params.splitAreaShow === undefined ? false : params.splitAreaShow,
                    areaStyle: {
                        color: ['#fafdff']
                    }
                }
            },
            series: seriesData
        };
        ECHART_ROOM.push(LineChart);
        LineChart.clear();
        LineChart.setOption(options);
        window.addEventListener('resize', () => {
            LineChart.resize();
        });
        return LineChart;
    },
    bbdWave: function(params, callBack) {
        let waveChart = echarts.init(document.getElementById(params.chartName));
        let options = {
            series: [
                {
                    animation: true,
                    waveAnimation: true,
                    type: 'liquidFill',
                    data: [0.45, 0.40],
                    color: params.color ? params.color : ['#9BD2F3', '#9BCAF2'],
                    backgroundStyle: {
                        color: params.backgroundColor ? params.backgroundColor : '#0299e2'
                    },
                    center: ['50%', '50%'],
                    radius: '100%',
                    amplitude: 8,
                    label: {
                        normal: {
                            formatter: function() {
                                return params.title ? params.title : '';
                            },
                            textStyle: {
                                fontSize: params.fontSize ? params.fontSize : 14,
                                color: '#000',
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                fontFamily: 'microsoft yahei'
                            },
                            position: ['50%', '40%']
                        }
                    },
                    outline: {
                        itemStyle: {
                            borderColor: '#e35140',
                            borderWidth: 0
                        },
                        borderDistance: 0
                    },
                    itemStyle: {
                        normal: {
                            backgroundColor: '#0293DC'
                        },
                        emphasis: {
                            backgroundColor: '#0293DC'
                        }
                    }
                }
            ]
        };
        ECHART_ROOM.push(waveChart);
        waveChart.setOption(options);
        window.addEventListener('resize', () => {
            waveChart.resize();
        });
    }
};

export default CHATBBD;