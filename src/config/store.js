// 这里用于放一些全局配置
import Cookie from 'js-cookie'
const commonStore = () => ({
    state: {
        collapse: false, // 菜单栏是否收缩
        authorized: false, // 是否拉取了授权菜单
        accsessRoutes: [], // 已注册的路由
        permissionBtns: [], // 有权限的按钮
        navTags: [], // 标签导航列表
        cachedViews: [] // 缓存的页面
    },
    getters: {
        cachedViews: state => state.cachedViews,
        accsessRoutes: state => state.accsessRoutes,
        // 菜单栏(过滤掉hidden)
        menuList: state => {
            const filterMenus = menus => {
                return menus.filter(item => {
                    if (item.children && item.children.length) {
                        item.children = filterMenus(item.children)
                    }
                    return item.meta && !item.meta.hidden
                })
            }
            return filterMenus(state.accsessRoutes)
        },
        navTags: state => state.navTags
    },
    mutations: {
        SET_ACCSESS_ROUTES(state, accsessRoutes) {
            state.authorized = true
            state.accsessRoutes = accsessRoutes
        },
        SET_PERMISSION_BTNS(state, btns) {
            state.permissionBtns = btns
        },
        SET_COLLAPSE(state, flag) {
            state.collapse = flag
        },
        // 添加tag导航，以及存储cache
        ADD_NAVTAGS: (state, route) => {
            // 如果导航列表里面已经有该标签，则不添加
            if (state.navTags.find(item => item.path === route.path)) return
            // 添加tag标签导航
            state.navTags.push(route)
            // 添加缓存列表(目前采用name的方式进行缓存)
            state.cachedViews.push(route.name)
        },
        // 删除tag导航，以及存储的cache
        DEL_NAVTAGS: (state, route) => {
            // 删除tag标签
            for (const [index, item] of state.navTags.entries()) {
                if (item.path === route.path) {
                    state.navTags.splice(index, 1)
                    break
                }
            }
            // 删除缓存
            for (const i of state.cachedViews) {
                if (i === route.name) {
                    const index = state.cachedViews.indexOf(i)
                    state.cachedViews.splice(index, 1)
                    break
                }
            }
        },
        // 删除缓存
        DEL_NAVTAG_CACHE: (state, name) => {
            for (const i of state.cachedViews) {
                if (i === name) {
                    const index = state.cachedViews.indexOf(i)
                    state.cachedViews.splice(index, 1)
                    break
                }
            }
        },
        // 删除其他标签
        DEL_OTHER_NAVTAGS: (state, route) => {
            // 删除tag标签
            for (const [index, item] of state.navTags.entries()) {
                if (item.path === route.path) {
                    state.navTags = state.navTags.slice(index, index + 1)
                    break
                }
            }
            // 删除缓存
            for (const i of state.cachedViews) {
                if (i === route.name) {
                    const index = state.cachedViews.indexOf(i)
                    state.cachedViews = state.cachedViews.slice(index, index + 1)
                    break
                }
            }
        },
        // 删除全部tag，以及存储的chace
        DEL_ALL_NAVTAGS: state => {
            state.navTags = []
            state.cachedViews = []
        },
        // 退出登录
        LOGOUT: state => {
            /* TODO: 调用后台退出登录接口 */
            state.navTags = []
            state.cachedViews = []
            Cookie.remove('token')
        }
    },
    actions: {
        setAccessRoutes: ({ commit }) => {
            // 生产可访问的路由表
            const createRouter = routes => {
                return routes.reduce((prev, item) => {
                    if (item.isButton === 'TRUE') return
                    let obj = {
                        path: item.uri,
                        component: () => import(`@/${item.componentPath}`),
                        name: item.name,
                        meta: {
                            title: item.code,
                            icon: item.icon,
                            hidden: item.hidden,
                            screenfull: item.screenfull
                        },
                        children: item.children && item.children.length ? createRouter(item.children) : []
                    }
                    item.redirect && (obj.redirect = item.redirect)
                    prev.push(obj)
                    return prev
                }, [])
            }
            // 生产权限按钮表
            const createPermissionBtns = routes => {
                return routes.reduce((prev, curr) => {
                    if (curr.isButton === 'TRUE') {
                        prev.push(curr.name)
                    }
                    if (curr.children && curr.children.length) {
                        return createPermissionBtns(curr.children)
                    }
                    return prev
                }, [])
            }

            return new Promise(resolve => {
                // TODO:假装我这个nameList是异步获取的,嘿嘿
                import('@/mock/menu').then(({ default: router }) => {
                    const accessRoutes = createRouter(router)
                    console.log(router)
                    const permissionBtns = createPermissionBtns(router)
                    console.log(permissionBtns)
                    commit('SET_ACCSESS_ROUTES', accessRoutes)
                    commit('SET_PERMISSION_BTNS', permissionBtns)
                    resolve(accessRoutes)
                })
            })
        },
        logout: ({ commit }) => {
            return new Promise(resolve => {
                commit('LOGOUT')
                resolve()
            })
        }
    }
})

export default commonStore
