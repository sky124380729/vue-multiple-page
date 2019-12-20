import request from './request'

// 新增用户
export const createPrincipal = (data, config) =>
    request(
        {
            method: 'post',
            url: '/api/identity/principal/',
            data
        },
        config
    )

// 修改用户
export const updatePrincipal = (id, data, config) =>
    request(
        {
            method: 'put',
            url: `/api/identity/principal/${id}`,
            data
        },
        config
    )

// 查询用户
export const getPrincipal = (id, config) =>
    request(
        {
            method: 'get',
            url: `/api/identity/principal/${id}`
        },
        config
    )

// 用户分页查询
export const fetchPrincipalPage = params =>
    request({
        method: 'get',
        url: '/api/identity/principal/page',
        params
    })
