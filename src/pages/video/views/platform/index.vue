<template>
    <section class="fullscreen platform">
        <div class="platform__left">
            <div class="platform__left__top box">
                <p class="title">实施人流量（人次）</p>
                <v-chart autoresize :options="barOption"></v-chart>
            </div>
            <div class="platform__left__bottom box">
                <p class="title">今日人流量统计</p>
                <div class="chart-box">
                    <p class="nav">当前人流量统计</p>
                    <div class="content">
                        <el-progress type="circle" :stroke-width="15" :percentage="25"></el-progress>
                    </div>
                </div>
                <div class="chart-box">
                    <p class="nav">每小时人流量</p>
                    <v-chart autoresize :options="barOption2"></v-chart>
                </div>
            </div>
        </div>
        <div class="platform__middle box">
            <p class="title">视频监控系统</p>
            <ul class="content">
                <li v-for="(video, index) in videos" :key="index">
                    <img src="~imgs/video.jpg" alt="" />
                </li>
            </ul>
        </div>
        <div class="platform__right">
            <div class="platform__right__top box">
                <p class="title">实时车流量（车次）</p>
                <v-chart autoresize :options="barOption"></v-chart>
            </div>
            <div class="platform__right__bottom box">
                <p class="title">今日车流量统计</p>
                <div class="chart-box">
                    <p class="nav">当前车流量统计</p>
                    <div class="content">
                        <el-progress type="circle" :stroke-width="15" :percentage="25"></el-progress>
                    </div>
                </div>
                <div class="chart-box">
                    <p class="nav">每小时车流量</p>
                    <v-chart autoresize :options="barOption2"></v-chart>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import echarts from 'echarts'
import vChart from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
export default {
    name: 'platform',
    components: {
        vChart
    },
    data() {
        return {
            tableData: new Array(9).fill({ a: '348796', b: '南2门', c: '2019/07/12 14:05', d: '成功' }),
            videos: new Array(12),
            pieOption: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} min ({d}%)'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['35%', '55%'],
                        avoidLabelOverlap: false,
                        selectedMode: 'single',
                        color: ['#58AFFF', '#FA541C', '#FAAD14'],
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: [
                            { value: 335, name: '正常通行' },
                            { value: 310, name: '失败' },
                            { value: 234, name: '其他' }
                        ]
                    }
                ]
            },
            barOption: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '20%',
                    right: '10%',
                    bottom: '10%',
                    top: 0
                    // containLabel: true
                },
                axisLine: {
                    show: false
                },
                xAxis: {
                    show: false,
                    type: 'value',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data: ['东一门', '西一门', '南一门', '北一门', '东二门', '西二门']
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            barBorderRadius: 10,
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                                { offset: 0, color: '#2F54EB' },
                                { offset: 1, color: '#58AFFF' }
                            ])
                        },
                        data: [100, 200, 50, 300, 222, 57]
                    }
                ]
            },
            barOption2: {
                grid: {
                    top: '15%',
                    bottom: '15%',
                    left: '15%'
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ['8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时']
                },
                yAxis: {
                    type: 'value'
                },
                color: ['#58AFFF'],
                series: [
                    {
                        type: 'bar',
                        data: [82, 93, 90, 34, 90, 30, 20, 91, 34, 12, 33, 20]
                    }
                ]
            }
        }
    }
}
</script>

<style lang="scss" src="./index.scss"></style>
