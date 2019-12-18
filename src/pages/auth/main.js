import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import directives from './directive' // 全局指令
import plugins from 'utils/plugins' // 全局方法
import 'utils/prototype' // 原型链扩展
import 'element-ui/lib/theme-chalk/index.css'
import 'styles/index.scss'
import 'components' // 全局组件
import './router/permission' // 权限管理

Vue.config.productionTip = false
Vue.use(directives)
Vue.use(plugins)

Vue.use(ElementUI, {
    size: 'small',
    zIndex: 2000
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
