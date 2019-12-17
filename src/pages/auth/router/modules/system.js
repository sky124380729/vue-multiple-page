export default [
    {
        path: 'resource',
        component: () => import(/* webpackChunkName: "resource" */ '../../views/system/resource'),
        name: 'system-resource',
        meta: {
            title: '资源管理',
            menu: true,
            btnList: {
                append: '新增',
                edit: '编辑',
                view: '查看'
            }
        }
    },
    {
        path: 'permission',
        component: () => import(/* webpackChunkName: "permission" */ '../../views/system/permission'),
        name: 'system-permission',
        meta: {
            title: '权限管理',
            menu: true,
            btnList: {
                append: '新增',
                edit: '编辑',
                view: '查看'
            }
        }
    }
]
