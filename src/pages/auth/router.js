/* import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/auth/',
    routes: [
        {
            path: '/',
            component: Layout
        }
    ]
})
router.beforeEach((to, from, next) => {
    next()
})

export default router */

import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout'
import Login from 'modules/Login'
import NotFound from 'modules/NotFound'
import NoPermission from 'modules/NoPermission'
// import modules from './modules'
// import common from './common' // 引入通用模块

Vue.use(Router)

// fixed NavigationDuplicated Problem
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const createRouter = () =>
    new Router({
        mode: 'history',
        base: '/auth/',
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            {
                path: '/',
                redirect: '/platform'
            },
            {
                path: '/noPermission',
                component: NoPermission
            },
            {
                path: '/login',
                component: Login
            }
        ]
    })

const router = createRouter()

// 重置路由方法
export const resetRouter = () => {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

// 动态路由
export const asyncRouter = [
    {
        path: '*',
        redirect: '/404',
        meta: { always: true }
    },
    {
        path: '/404',
        component: NotFound,
        meta: { always: true }
    },
    {
        path: '/platform',
        component: Layout,
        redirect: '/platform/index',
        name: 'platform',
        meta: { title: '首页', icon: 'el-icon-s-home', menu: true, always: true },
        children: [
            {
                path: 'index',
                name: 'platform-index',
                component: () => import('./views/platform'),
                meta: { title: '中央控制台', always: true }
            }
        ]
    }
    // {
    //     path: '/system',
    //     component: Layout,
    //     name: 'system',
    //     meta: { title: '系统管理', icon: 'el-icon-menu', menu: true },
    //     children: modules.system
    // },
    // {
    //     path: '/test',
    //     component: Layout,
    //     name: 'test',
    //     meta: { title: '组件测试', icon: 'el-icon-menu', menu: true },
    //     children: modules.test
    // }
]

export default router
