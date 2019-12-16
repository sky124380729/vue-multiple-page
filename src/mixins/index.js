// bus页面混入
export const compBus = {
    provide() {
        return {
            bus: this
        }
    },
    data(vm) {
        const {
            $route: { params }
        } = vm
        return {
            comp: (params && params.comp) || 'Index',
            id: params && params.id,
            view: params && params.view
        }
    }
}

// 公共混入
const compCommon = {
    inject: {
        page: {
            from: 'bus',
            default: null
        }
    },
    methods: {
        switchPage(comp, id = null, view = false) {
            const { page } = this
            page.comp = comp
            page.id = id
            page.view = view
        }
    }
}

// bus主页混入
export const compIndex = {
    name: 'index',
    ...compCommon
}

// bus操作页混入
export const compOpt = {
    data() {
        return {
            id: this.page.id,
            view: this.page.view
        }
    },
    ...compCommon
}
