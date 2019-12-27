// 此处放的是所有页面的公共接口

import request from '@/config/request'

export const login = data => request.post('/api/identity/principal/login', data)

// 查询模块下，已授权的资源树
export const getModuleResource = moduleCode =>
    request({
        method: 'get',
        url: `/api/identity/resource/tree/${moduleCode}/module/grant`
    })
