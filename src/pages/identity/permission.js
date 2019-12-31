import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import Cookies from 'js-cookie'
import screenfull from 'screenfull'

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
                    Cookies.remove('token')
                    next({ path: '/login' })
                    NProgress.done()
                }
            } else {
                next()
                // 全屏参数判断该页面是否全屏
                if (!screenfull.isEnabled) return
                if (to.meta && to.meta.fullScreen === 'TRUE') {
                    screenfull.request().catch(() => null)
                } else {
                    if (screenfull.isFullscreen) {
                        screenfull.exit()
                    }
                }
            }
        }
    } else {
        next(to.path !== '/login' ? { path: '/login' } : true)
    }
})

router.afterEach(() => {
    NProgress.done()
})
