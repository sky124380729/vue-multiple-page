import Vue from 'vue'
import Router from 'vue-router'
import Test from 'modules/Test.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: '/xxx/',
    routes: [
        {
            path: '/',
            component: Test
        },
        {
            path: '/a',
            component: () => import('./views/a')
        }
    ]
})
router.beforeEach((to, from, next) => {
    next()
})

export default router
