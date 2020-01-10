import store from './store'

export default Vue => {
    // 权限控制
    Vue.directive('permission', {
        inserted(el, binding, vnode) {
            // 获取this
            const { context: vm } = vnode
            // 获取绑定的值
            const name = vm.$options.name + '-' + binding.value
            // 获取权限表
            const {
                state: { permissionBtns }
            } = store
            // 如果没有权限那就移除
            if (permissionBtns.indexOf(name) === -1) {
                el.parentNode.removeChild(el)
            }
        }
    })
}
