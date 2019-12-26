import request from './request'

// 新增角色
export const createRole = (data, config) =>
    request(
        {
            method: 'post',
            url: 'role/',
            data
        },
        config
    )

// 删除角色
export const removeRole = id =>
    request({
        method: 'delete',
        url: `role/${id}`
    })

// 更新角色
export const updateRole = (id, data, config) =>
    request(
        {
            method: 'put',
            url: `role/${id}`,
            data
        },
        config
    )

// 角色单个查询
export const getRole = id =>
    request({
        method: 'get',
        url: `role/${id}`
    })

// 角色列表查询
export const fetchRoleList = (params, config) =>
    request(
        {
            method: 'get',
            url: 'role/list',
            params
        },
        config
    )

// 角色分页查询
export const fetchRolePage = params =>
    request({
        method: 'get',
        url: 'role/page',
        params
    })
