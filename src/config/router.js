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

const createRouter = base =>
    new Router({
        mode: 'history',
        base: `/${base}/`,
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

export default createRouter
