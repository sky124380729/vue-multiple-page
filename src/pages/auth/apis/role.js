import request from './request'

// 新增角色
export const createRole = (data, config) => {
    request(
        {
            method: 'post',
            url: '/api/identity/role/',
            data
        },
        config
    )
}
// 查询角色列表
export const fetchRoleList = (params, config) =>
    request(
        {
            method: 'get',
            url: '/api/identity/role/list',
            params
        },
        config
    )
