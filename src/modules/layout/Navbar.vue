<template>
    <div class="layout__nav">
        <!-- 左侧按钮组 -->
        <div class="layout__nav-left">
            <i class="icon" :class="navIconClass" @click="setCollapse(!collapse)"></i>
            <!-- 面包屑导航 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item v-for="item in breadList" :key="item.path">{{ item.meta && item.meta.title }}</el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>

            <!-- 菜单导航 -->
        </div>
        <!-- 右侧按钮组 -->
        <div class="layout__nav-right">
            <!-- <m-select class="search" size="mini" remote filterable :remote-method="querySearch" :options="options" placeholder="请输入菜单名"></m-select> -->
            <el-autocomplete class="search" size="mini" v-model="routeSearch" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="goPath" clearable>
                <i class="el-icon-search el-input__icon" slot="suffix"></i>
            </el-autocomplete>
            <img class="avatar" src="~imgs/logox.jpg" alt="" />
            <el-dropdown trigger="click" @command="navCommand">
                <span class="el-dropdown-link">Pink丶缤<i class="el-icon-arrow-down el-icon--right"></i> </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {
            options: [],
            routeSearch: ''
        }
    },
    computed: {
        menuList() {
            let arr = []
            const getRoute = (routes, basePath = '', isRoot = true) => {
                routes.forEach(route => {
                    if (!isRoot || route.name === 'platform') {
                        arr.push({
                            value: route.meta && route.meta.title,
                            path: isRoot ? route.path : basePath + '/' + route.path
                        })
                    }
                    if (route.children && route.children.length) {
                        getRoute(route.children, route.path, false)
                    }
                })
            }
            getRoute(this.$store.getters.menuList)
            return arr
        },
        collapse() {
            return this.$store.state.collapse
        },
        breadList() {
            // 如果有重定向，则是由于没有子菜单(因此过滤掉)
            /* return this.$route.matched.filter(route => !route.redirect) */
            return this.$route.matched
        },
        navIconClass() {
            return `el-icon-s-${this.collapse ? 'unfold' : 'fold'}`
        }
    },
    methods: {
        querySearch(queryString, cb) {
            let results = queryString ? this.menuList.filter(this.createFilter(queryString)) : this.menuList
            // 调用 callback 返回建议列表的数据
            cb(results)
        },
        goPath(route) {
            this.$router.push(route.path)
        },
        createFilter(queryString) {
            return routes => {
                return routes.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            }
        },
        navCommand(command) {
            if (command === 'setting') {
                this.$message.info('敬请期待~')
            } else if (command === 'logout') {
                this.$store.dispatch('logout').then(() => {
                    this.$router.push('/login')
                })
            }
        },
        setCollapse(flag) {
            this.$store.commit('SET_COLLAPSE', flag)
        }
    }
}
</script>
