import { generateUUID } from 'utils/tools'
export default [
    {
        id: generateUUID(),
        code: '',
        title: '首页',
        name: 'platform',
        icon: 'el-icon-s-home',
        uri: '/platform',
        redirect: '/platform/index',
        hidden: '',
        componentPath: 'modules/layout',
        fullScreen: 'FALSE',
        sort: 0,
        children: [
            {
                id: 'asdasdasd',
                code: '',
                title: '中央控制台',
                name: 'index',
                icon: null,
                uri: 'index',
                componentPath: 'pages/auth/views/platform',
                hidden: 'TRUE',
                sort: 0,
                type: 'MENU'
            }
        ],
        type: 'MENU'
    },
    {
        id: generateUUID(),
        code: '',
        title: '系统管理',
        name: 'system',
        icon: null,
        uri: '/system',
        hidden: '',
        componentPath: 'modules/layout',
        sort: 0,
        children: [
            {
                id: generateUUID(),
                path: 'resource',
                code: '',
                title: '资源管理',
                name: 'resource',
                icon: null,
                uri: 'resource',
                componentPath: 'pages/auth/views/system/resource',
                sort: 0,
                children: [
                    {
                        id: generateUUID(),
                        code: '',
                        title: '新增',
                        name: 'append',
                        icon: null,
                        uri: null,
                        componentPath: null,
                        componentName: null,
                        sort: 1,
                        children: [],
                        type: 'BUTTON',
                        hasDataScope: 'FALSE'
                    },
                    {
                        id: generateUUID(),
                        code: '',
                        title: '编辑',
                        name: 'edit',
                        icon: null,
                        uri: null,
                        componentPath: null,
                        componentName: null,
                        sort: 1,
                        children: [],
                        type: 'BUTTON',
                        hasDataScope: 'FALSE'
                    }
                ],
                fullScreen: 'FALSE',
                type: 'MENU'
            },
            {
                id: generateUUID(),
                path: 'permission',
                code: '',
                title: '权限管理',
                name: 'permission',
                icon: null,
                uri: 'permission',
                componentPath: 'pages/auth/views/system/permission',
                hidden: false,
                sort: 0,
                children: [],
                type: 'MENU',
                fullScreen: 'TRUE'
            },
            {
                id: generateUUID(),
                path: 'role',
                code: '',
                title: '角色管理',
                name: 'role',
                icon: null,
                uri: 'role',
                componentPath: 'pages/auth/views/system/role/role-bus',
                hidden: false,
                sort: 0,
                children: [],
                type: 'MENU',
                fullScreen: ''
            }
        ],
        type: 'MENU'
    }
]
