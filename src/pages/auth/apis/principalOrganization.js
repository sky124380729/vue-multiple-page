import request from './request'

// 新增或者修改用户组织
export const handlePrincipalOrganization = (principalId, data, config) =>
    request(
        {
            method: 'post',
            url: `/api/identity/principalOrganization/principal/${principalId}`,
            data
        },
        config
    )

// 用户组织单个查询
export const getPrincipalOrganization = (principalId, config) =>
    request(
        {
            method: 'get',
            url: `/api/identity/principalOrganization/principal/${principalId}`
        },
        config
    )
