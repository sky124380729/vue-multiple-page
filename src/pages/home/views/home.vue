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
                        </div>
                    </div>
                </div>
                <div class="right__bottom container">
                    <p class="title">能耗总览</p>
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
                { path: '/home?a=1', des: '暂未开放~' },
                { path: '/home?b=1', des: '暂未开放~' }
            ]
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

<style lang="scss" src="../styles/home.scss"></style>
