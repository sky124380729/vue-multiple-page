<template>
    <section class="fullscreen platform">
        <div class="platform__left">
            <div class="platform__left__top box">
                <p class="title">当前刷卡列表</p>
                <el-input class="search" prefix-icon="el-icon-search" placeholder="请输入编号"></el-input>
                <div class="info">
                    <img src="~imgs/bg.png" alt="" />
                    <div class="row">
                        <el-row>编号：348796</el-row>
                        <el-row>
                            <el-col :span="12">持卡人：张三三</el-col>
                            <el-col :span="12">失败：5次</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">性别：男</el-col>
                            <el-col :span="12">成功：35次</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">住所：107</el-col>
                            <el-col :span="12">经常出入：东北门</el-col>
                        </el-row>
                    </div>
                </div>
                <el-table :data="tableData" size="mini">
                    <el-table-column label="编号" prop="a"></el-table-column>
                    <el-table-column label="门" prop="b"></el-table-column>
                    <el-table-column label="刷卡时间" prop="c" show-overflow-tooltip></el-table-column>
                    <el-table-column label="结果" prop="d"></el-table-column>
                </el-table>
            </div>
            <div class="platform__left__bottom box">
                <p class="title">门禁统计列表</p>
                <img class="route" src="~imgs/route.jpg" alt="" />
                <el-table :data="tableData" size="mini">
                    <el-table-column label="编号" prop="a"></el-table-column>
                    <el-table-column label="门" prop="b"></el-table-column>
                    <el-table-column label="刷卡时间" prop="c" show-overflow-tooltip></el-table-column>
                    <el-table-column label="结果" prop="d"></el-table-column>
                </el-table>
            </div>
        </div>
        <div class="platform__middle"></div>
        <div class="platform__right">
            <div class="platform__right__top box">
                <el-row>
                    <el-col :span="12">
                        <p class="subtitle">今日人流量（人次）</p>
                        <p class="number">2,425</p>
                    </el-col>
                    <el-col :span="12">
                        <p class="subtitle">本月人流量总计（人次）</p>
                        <p class="number">38,782</p>
                    </el-col>
                </el-row>
            </div>
            <div class="platform__right__middle box">
                <p class="title">门禁数据分析</p>
                <div class="chart-box">
                    <p class="nav">本日门禁数据统计</p>
                    <v-chart autoresize :options="pieOption"></v-chart>
                </div>
                <div class="chart-box">
                    <p class="nav">本月门禁数据统计</p>
                    <v-chart autoresize :options="pieOption"></v-chart>
                </div>
            </div>
            <div class="platform__right__bottom box">
                <p class="title">月度门禁打卡成功数据统计</p>
                <v-chart autoresize :options="barOption"></v-chart>
            </div>
        </div>
    </section>
</template>

<script>
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
                grid: {
                    top: '15%',
                    bottom: '15%',
                    left: '15%'
                },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
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
