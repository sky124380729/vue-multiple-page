import request from './request'

// 组织树查询
export const getOrganizationTree = () =>
    request({
        method: 'get',
        url: '/api/identity/organization/tree'
    })

// 新增组织
export const createOrganization = (data, config) =>
    request(
        {
            method: 'post',
            url: '/api/identity/organization/',
            data
        },
        config
    )

// 删除组织
export const removeOrganization = id =>
    request({
        method: 'delete',
        url: `/api/identity/organization/${id}`
    })

// 更新组织
export const updateOrganization = (id, data, config) => {
    console.log(config)
    return request(
        {
            method: 'put',
            url: `/api/identity/organization/${id}`,
            data
        },
        config
    )
}

// 组织单个查询
export const getOrganization = id =>
    request({
        method: 'get',
        url: `/api/identity/organization/${id}`
    })

// 组织列表查询
export const fetchOrganizationList = (params, config) =>
    request(
        {
            method: 'get',
            url: '/api/identity/organization/list',
            params
        },
        config
    )

// 组织分页查询
export const fetchOrganizationPage = params =>
    request({
        method: 'get',
        url: '/api/identity/organization/page',
        params
    })
