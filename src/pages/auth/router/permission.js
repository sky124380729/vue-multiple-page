import router from './index.js'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import Cookies from 'js-cookie'

router.beforeEach(async (to, from, next) => {
    const token = Cookies.get('token')
    NProgress.start()
    if (token) {
        // 如果已经处于登录状态，跳到登录页重定向到首页
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else {
            //没有菜单则拉取菜单
            if (!store.state.authorized) {
                try {
                    router.addRoutes(await store.dispatch('setAccessRoutes'))
                    next({ ...to, replace: true })
                } catch (e) {
                    Message.error(e.message || '发生错误')
                    NProgress.done()
                }
            } else {
                next()
            }
        }
    } else {
        next(to.path !== '/login' ? { path: '/login' } : true)
    }
})

router.afterEach(() => {
    NProgress.done()
})
