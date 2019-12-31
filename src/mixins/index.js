// bus页面混入
export const compBus = {
    provide() {
        return {
            bus: this
        }
    },
    data(vm) {
        const {
            $route: { query }
        } = vm
        return {
            comp: (query && query.comp) || 'Index',
            id: query && query.id,
            view: query && query.view
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
        $switchPage(comp, id = null, view = false) {
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
    data(vm) {
        const { page } = vm
        return {
            id: page.id,
            view: page.view
        }
    },
    ...compCommon
}
