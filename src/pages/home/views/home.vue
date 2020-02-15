<template>
    <div class="home">
        <div class="home__header">
            <div class="logo">
                <img src="~imgs/proLogo.png" alt="" />
                <span>新世纪智慧社区管理系统</span>
            </div>
            <ul class="navs">
                <li v-for="nav in linkList" :key="nav.path">
                    <a class="nav" @click="goPath(nav)">{{ nav.des }}</a>
                </li>
            </ul>
            <div class="opt">
                <img src="~imgs/logox.jpg" alt="" />
                <el-dropdown trigger="click" @command="navCommand">
                    <span class="el-dropdown-link">Pink丶缤<i class="el-icon-arrow-down el-icon--right"></i> </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="home__body">
            <div class="home__body__left body__body--child">
                <div class="left__top container">
                    <p class="title">园区概况</p>
                    <ul class="info">
                        <li>
                            <p class="subtitle">建筑面积（平米）</p>
                            <p class="number">94600</p>
                        </li>
                        <li>
                            <p class="subtitle">监控占用（台）</p>
                            <p class="number">1600</p>
                        </li>
                        <li>
                            <p class="subtitle">能耗单位</p>
                            <p class="number">28</p>
                        </li>
                    </ul>
                    <p class="nav">停车位统计</p>
                    <ul class="progress">
                        <li>
                            <el-progress type="circle" :percentage="25" color="#1890FF" :stroke-width="10"></el-progress>
                            <p><i class="dotted dotted--blue"></i>停车位</p>
                        </li>
                        <li>
                            <el-progress type="circle" :percentage="25" color="#FABF42" :stroke-width="10"></el-progress>
                            <p><i class="dotted dotted--yellow"></i>已用车位</p>
                        </li>
                        <li>
                            <el-progress type="circle" :percentage="25" color="#E4523C" :stroke-width="10"></el-progress>
                            <p><i class="dotted dotted--red"></i>剩余车位</p>
                        </li>
                    </ul>
                </div>
                <div class="left__middle container">
                    <div class="middle__left">
                        <p class="subtitle">今日客流量（人次）</p>
                        <p class="number">232,425</p>
                        <el-table>
                            <el-table-column label="门号" prop="x"></el-table-column>
                            <el-table-column label="人次" prop="y"></el-table-column>
                        </el-table>
                    </div>
                    <div class="middle__right">
                        <p class="subtitle">今日车流量（车次）</p>
                        <p class="number">38,782</p>
                        <el-table>
                            <el-table-column label="门号" prop="x"></el-table-column>
                            <el-table-column label="人次" prop="y"></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="left__bottom container">
                    <p class="title">故障维修统计</p>
                    <v-chart autoresize :options="maintenanceOption"></v-chart>
                </div>
            </div>

            <div class="home__body__middle body__body--child"></div>
            <div class="home__body__right body__body--child">
                <div class="right__top container">
                    <p class="title">报警</p>
                    <div class="top__content">
                        <div class="top__left">
                            <p class="nav">概览</p>
                            <ul class="info">
                                <li>
                                    <p class="subtitle">报警总数</p>
                                    <p class="number">35</p>
                                </li>
                                <li>
                                    <p class="subtitle">已处理</p>
                                    <p class="number">17</p>
                                </li>
                                <li>
                                    <p class="subtitle">未处理</p>
                                    <p class="number">8</p>
                                </li>
                            </ul>
                        </div>
                        <div class="top__right">
                            <p class="nav">告警处理状态</p>
                            <v-chart autoresize :options="alarmOption"></v-chart>
                        </div>
                    </div>
                </div>
                <div class="right__bottom container">
                    <p class="title">能耗总览</p>
                    <el-row class="pie">
                        <el-col :span="11">
                            <p class="nav">电量统计</p>
                            <v-chart autoresize :options="electricityOption"></v-chart>
                        </el-col>
                        <el-col :span="11" :offset="1">
                            <p class="nav">水量统计</p>
                            <v-chart autoresize :options="waterOption"></v-chart>
                        </el-col>
                    </el-row>
                    <el-row class="line">
                        <v-chart autoresize :options="lineOption"></v-chart>
                    </el-row>
                    <el-row class="bar">
                        <v-chart autoresize :options="barOption"></v-chart>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            linkList: [
                { path: '/identity', des: '统一身份认证系统' },
                { path: '/consumer', des: '终端用户' },
                { path: '/guard', des: '门禁' },
                { path: '/video', des: '视频' }
            ],
            maintenanceOption: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} min ({d}%)'
                },
                legend: {
                    x: 'center',
                    bottom: '15%',
                    data: ['维修中', '已恢复', '故障'],
                    itemWidth: 8,
                    itemHeight: 8,
                    itemGap: 20,
                    icon: 'circle',
                    textStyle: {
                        fontSize: 12,
                        color: '#999'
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['30%', '45%'],
                        center: ['50%', '40%'],
                        avoidLabelOverlap: false,
                        selectedMode: 'single',
                        color: ['#FABF42', '#1890FF', '#E4523C'],
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: [
                            { value: 335, name: '维修中' },
                            { value: 310, name: '已恢复' },
                            { value: 234, name: '故障' }
                        ]
                    }
                ]
            },
            alarmOption: {
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c} min ({d}%)'
                },
                legend: {
                    x: 'center',
                    bottom: '15%',
                    data: ['门禁', '消防', '周界', '视频监控', '其它'],
                    itemWidth: 8,
                    itemHeight: 8,
                    icon: 'circle',
                    textStyle: {
                        fontSize: 10,
                        color: '#999'
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['20%', '30%'],
                        center: ['50%', '30%'],
                        avoidLabelOverlap: false,
                        selectedMode: 'single',
                        color: ['#47D3D2', '#FAAD14', '#1890FF', '#FA541C', '#9C2BDD'],
                        label: {
                            normal: {
                                show: true
                            }
                        },
                        data: [
                            { value: 335, name: '门禁' },
                            { value: 310, name: '消防' },
                            { value: 234, name: '周界' },
                            { value: 234, name: '视频监控' },
                            { value: 234, name: '其它' }
                        ]
                    }
                ]
            },
            electricityOption: {
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{b}: {c} min ({d}%)'
                // },
                legend: {
                    x: 'center',
                    bottom: '10%',
                    data: ['2016', '2017', '2018', '2019'],
                    itemWidth: 8,
                    itemHeight: 8,
                    icon: 'circle',
                    textStyle: {
                        fontSize: 10,
                        color: '#999'
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['55%', '70%'],
                        center: ['50%', '35%'],
                        avoidLabelOverlap: false,
                        color: ['#47D3D2', '#FAAD14', '#1890FF', '#FA541C', '#9C2BDD'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                formatter: ['{num|{d}%}', '{bt|{b}}'].join('\n'),
                                rich: {
                                    num: {
                                        fontSize: 20,
                                        lineHeight: 40,
                                        color: '#333'
                                    },
                                    bt: {
                                        fontSize: 12,
                                        color: '#999'
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            { value: 335, name: '2016' },
                            { value: 310, name: '2017' },
                            { value: 234, name: '2018' },
                            { value: 234, name: '2019' }
                        ]
                    }
                ]
            },
            waterOption: {
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{b}: {c} min ({d}%)'
                // },
                legend: {
                    x: 'center',
                    bottom: '10%',
                    data: ['2016', '2017', '2018', '2019'],
                    itemWidth: 8,
                    itemHeight: 8,
                    icon: 'circle',
                    textStyle: {
                        fontSize: 10,
                        color: '#999'
                    }
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['55%', '70%'],
                        center: ['50%', '35%'],
                        avoidLabelOverlap: false,
                        color: ['#47D3D2', '#FAAD14', '#1890FF', '#FA541C', '#9C2BDD'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                formatter: ['{num|{d}%}', '{bt|{b}}'].join('\n'),
                                rich: {
                                    num: {
                                        fontSize: 20,
                                        lineHeight: 40,
                                        color: '#333'
                                    },
                                    bt: {
                                        fontSize: 12,
                                        color: '#999'
                                    }
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            { value: 335, name: '2016' },
                            { value: 310, name: '2017' },
                            { value: 234, name: '2018' },
                            { value: 234, name: '2019' }
                        ]
                    }
                ]
            },
            lineOption: {
                grid: {
                    top: '15%',
                    bottom: '15%',
                    left: '10%'
                },
                legend: {
                    x: 'center',
                    y: 'top',
                    textStyle: {
                        fontSize: 10,
                        color: '#999'
                    },
                    data: ['当月电量(千万时)', '当月水量(吨)']
                },
                xAxis: {
                    type: 'category',
                    data: ['12/03', '12/04', '12/05', '12/06', '12/07', '12/08', '12/09']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: '当月电量(千万时)',
                        type: 'line',
                        lineStyle: {
                            color: '#1890FF'
                        },
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    },
                    {
                        name: '当月水量(吨)',
                        type: 'line',
                        lineStyle: {
                            color: '#FAAD14'
                        },
                        data: [120, 232, 301, 334, 90, 430, 220]
                    }
                ]
            },
            barOption: {
                grid: {
                    top: '15%',
                    bottom: '15%',
                    left: '10%'
                },
                tooltip: {},
                legend: {
                    x: 'center',
                    y: 'top',
                    textStyle: {
                        fontSize: 10,
                        color: '#999'
                    },
                    data: ['当月电量(千万时)', '当月水量(吨)']
                },
                xAxis: {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                },
                yAxis: {
                    type: 'value'
                },
                color: ['#1890FF', '#FAAD14'],
                series: [
                    {
                        name: '电量(千万时)',
                        type: 'bar',
                        stack: '总量',
                        data: [820, 932, 901, 934, 1290, 1330, 1320, 901, 934, 1290, 1330, 1320]
                    },
                    {
                        name: '水量(吨)',
                        type: 'bar',
                        stack: '总量',
                        data: [120, 232, 301, 334, 90, 430, 220, 120, 232, 301, 334, 90]
                    }
                ]
            }
        }
    },
    methods: {
        goPath(item) {
            location.href = item.path
        },
        navCommand(command) {
            if (command === 'setting') {
                this.$message.info('敬请期待~')
            } else if (command === 'logout') {
                this.$store.dispatch('logout').then(() => {
                    this.$router.push('/login')
                })
            }
        }
    }
}
</script>

<style lang="scss" src="./home.scss"></style>
