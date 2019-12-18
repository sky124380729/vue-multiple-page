import { generateUUID } from 'utils/tools'
export default [
    {
        id: generateUUID(),
        code: '首页',
        name: 'platform',
        icon: 'el-icon-s-home',
        uri: '/platform',
        redirect: '/platform/index',
        hidden: '',
        componentPath: 'modules/layout',
        sort: 0,
        children: [
            {
                id: 'asdasdasd',
                code: '中央控制台',
                name: 'platform-index',
                icon: null,
                uri: 'index',
                componentPath: 'pages/auth/views/platform',
                hidden: true,
                sort: 0,
                // children: [{}],
                isButton: '',
                hasDataScope: ''
            }
        ],
        isButton: '',
        hasDataScope: ''
    },
    {
        id: generateUUID(),
        code: '系统管理',
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
                code: '资源管理',
                name: 'system-resource',
                icon: null,
                uri: 'resource',
                componentPath: 'pages/auth/views/system/resource',
                hidden: false,
                sort: 0,
                children: [
                    {
                        id: generateUUID(),
                        code: '新增',
                        name: 'append',
                        icon: null,
                        uri: null,
                        componentPath: null,
                        componentName: null,
                        sort: 1,
                        children: [],
                        isButton: 'TRUE',
                        hasDataScope: 'FALSE'
                    },
                    {
                        id: generateUUID(),
                        code: '编辑',
                        name: 'edit',
                        icon: null,
                        uri: null,
                        componentPath: null,
                        componentName: null,
                        sort: 1,
                        children: [],
                        isButton: 'TRUE',
                        hasDataScope: 'FALSE'
                    }
                ],
                isButton: '',
                hasDataScope: ''
            },
            {
                id: generateUUID(),
                path: 'permission',
                code: '权限管理',
                name: 'system-permission',
                icon: null,
                uri: 'permission',
                componentPath: 'pages/auth/views/system/permission',
                hidden: false,
                sort: 0,
                // children: [{}],
                isButton: '',
                hasDataScope: ''
            }
        ],
        isButton: '',
        hasDataScope: ''
    }
]
