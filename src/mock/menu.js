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
                    },
                    {
                        id: generateUUID(),
                        code: '',
                        title: '删除',
                        name: 'edit',
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
                        title: '上传',
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
                type: 'MENU',
                fullScreen: 'TRUE'
            },
            {
                id: generateUUID(),
                path: 'test',
                code: '',
                title: '多页测试',
                name: 'test',
                icon: null,
                uri: 'test',
                componentPath: 'pages/auth/views/system/test/test-bus',
                hidden: false,
                sort: 0,
                children: [],
                type: 'MENU',
                fullScreen: ''
            },
            {
                id: generateUUID(),
                path: 'organization',
                code: '',
                title: '系统组织管理',
                name: 'organization',
                icon: null,
                uri: 'organization',
                componentPath: 'pages/auth/views/system/organization',
                hidden: false,
                sort: 0,
                children: [],
                type: 'MENU',
                fullScreen: ''
            },
            {
                id: generateUUID(),
                path: 'role',
                code: '',
                title: '角色管理',
                name: 'role',
                icon: null,
                uri: 'role',
                componentPath: 'pages/auth/views/system/role',
                hidden: false,
                sort: 0,
                children: [],
                type: 'MENU',
                fullScreen: ''
            },
            {
                id: generateUUID(),
                path: 'principle',
                code: '',
                title: '用户管理',
                name: 'principle',
                icon: null,
                uri: 'principle',
                componentPath: 'pages/auth/views/system/principle',
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
