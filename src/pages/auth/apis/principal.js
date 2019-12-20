import request from './request'

// 用户分页查询
export const fetchPrincipalPage = params => {
    return request({
        method: 'get',
        url: '/api/identity/principal/page',
        params
    })
}
