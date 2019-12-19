import Vue from 'vue'
import Router from 'vue-router'
import Login from 'modules/Login'
import NoPermission from 'modules/NoPermission'

Vue.use(Router)

// Fixed NavigationDuplicated Problem
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

export default router
