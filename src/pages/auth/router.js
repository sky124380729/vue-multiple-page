import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/auth/',
    routes: [
        {
            path: '/',
            component: Home
        }
    ]
})
router.beforeEach((to, from, next) => {
    next()
})

export default router
