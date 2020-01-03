import request from './request'

// 新增或者修改组织角色
export const handleOrganizationRole = (organizationId, data) => request.post(`organizationRole/organization/${organizationId}`, data)

// 查询组织角色
export const getOrganizationRole = organizationId => request.get(`organizationRole/organization/${organizationId}`)
