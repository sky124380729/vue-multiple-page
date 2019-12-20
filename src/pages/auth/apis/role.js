import request from './request'

// 新增角色
export const createRole = (data, config) =>
    request(
        {
            method: 'post',
            url: '/api/identity/role/',
            data
        },
        config
    )

// 删除角色
export const removeRole = id =>
    request({
        method: 'delete',
        url: `/api/identity/role/${id}`
    })

// 更新角色
export const updateRole = (id, data, config) =>
    request(
        {
            method: 'put',
            url: `/api/identity/role/${id}`,
            data
        },
        config
    )

// 角色单个查询
export const getRole = id =>
    request({
        method: 'get',
        url: `/api/identity/role/${id}`
    })

// 角色列表查询
export const fetchRoleList = (params, config) =>
    request(
        {
            method: 'get',
            url: '/api/identity/role/list',
            params
        },
        config
    )

// 角色分页查询
export const fetchRolePage = params =>
    request({
        method: 'get',
        url: '/api/identity/role/page',
        params
    })
