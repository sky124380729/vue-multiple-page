import request from './request'

// 新增或者修改用户组织
export const handlePrincipalOrganization = (principalId, data) => request.post(`principalOrganization/principal/${principalId}`, data)

// 用户组织单个查询
export const getPrincipalOrganization = principalId => request.get(`principalOrganization/principal/${principalId}`)
