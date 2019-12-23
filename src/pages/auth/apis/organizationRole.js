import request from './request'

// 新增或者修改组织角色
export const handleOrganizationRole = (organizationId, data, config) =>
    request(
        {
            method: 'post',
            url: `/api/identity/organizationRole/organization/${organizationId}`,
            data
        },
        config
    )

// 查询组织角色
export const getOrganizationRole = organizationId =>
    request({
        method: 'get',
        url: `/api/identity/organizationRole/organization/${organizationId}`
    })
