// 这里用于放一些全局配置
import Cookie from 'js-cookie'
import NotFound from 'modules/NotFound'
import { getModuleResource } from '@/apis'
import { deepClone } from 'utils/tools'
const createStore = moduleCode => ({
    state: {
        collapse: false, // 菜单栏是否收缩
        authorized: false, // 是否拉取了授权菜单
        accsessRoutes: [], // 已注册的路由
        permissionBtns: [], // 有权限的按钮
        navTags: [], // 标签导航列表
        cachedViews: [] // 缓存的页面
    },
    getters: {
        collapse: state => state.collapse,
        cachedViews: state => state.cachedViews,
        accsessRoutes: state => state.accsessRoutes,
        // 菜单栏(过滤掉hidden)
        menuList: state => {
            const filterMenus = menus => {
                return menus.filter(item => {
                    if (item.children && item.children.length) {
                        item.children = filterMenus(item.children)
                    }
                    return item.meta && item.meta.hidden !== 'TRUE'
                })
            }
            return filterMenus(deepClone(state.accsessRoutes))
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
            state.navTags = []
            state.cachedViews = []
            Cookie.remove('token')
        }
    },
    actions: {
        setAccessRoutes: ({ commit }) => {
            // 生产可访问的路由表
            const createRouter = (routes, name = '') => {
                return routes.reduce((prev, item) => {
                    // 只要这个菜单有uri，则注册进去，可能是MENU，也可能是BUTTON
                    if (item.uri) {
                        let obj = {
                            path: item.uri,
                            component: () => import(`@/${item.componentPath}`),
                            name: (name + '-' + item.name).slice(1),
                            meta: {
                                title: item.title,
                                icon: item.icon,
                                hidden: item.hidden,
                                type: item.type,
                                fullScreen: item.fullScreen
                            },
                            children: item.children && item.children.length ? createRouter(item.children, name + '-' + item.name) : []
                        }
                        item.redirectUri && (obj.redirect = item.redirectUri)
                        prev.push(obj)
                    }
                    return prev
                }, [])
            }
            // 生产权限按钮表
            const createPermissionBtns = (routes, name = '') => {
                return routes.reduce((prev, curr) => {
                    if (curr.type === 'BUTTON') {
                        prev.push((name + '-' + curr.name).slice(1))
                    }
                    if (curr.children && curr.children.length) {
                        return createPermissionBtns(curr.children, name + '-' + curr.name)
                    }
                    return prev
                }, [])
            }

            return new Promise((resolve, reject) => {
                /* getModuleResource(moduleCode)
                    .then(({ content: router }) => {
                        const accessRoutes = createRouter(router.children).concat([
                            {
                                path: '*',
                                redirect: '/404'
                            },
                            {
                                path: '/404',
                                component: NotFound
                            }
                        ])
                        console.log(accessRoutes)
                        const permissionBtns = createPermissionBtns(router.children)
                        commit('SET_ACCSESS_ROUTES', accessRoutes)
                        commit('SET_PERMISSION_BTNS', permissionBtns)
                        resolve(accessRoutes)
                    })
                    .catch(error => {
                        reject(error)
                    }) */
                // 当数据库挂了的时候使用以下方法
                import('@/mock/menu.json')
                    .then(res => {
                        const router = res[0].children
                        const accessRoutes = createRouter(router)
                        console.log(accessRoutes)
                        const permissionBtns = createPermissionBtns(router)
                        commit('SET_ACCSESS_ROUTES', accessRoutes)
                        commit('SET_PERMISSION_BTNS', permissionBtns)
                        resolve(accessRoutes)
                    })
                    .catch(error => {
                        reject(error)
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

export default createStore
