import request from './request'

// 组织树查询
export const getOrganizationTree = () => request.get('organization/tree')

// 新增组织
export const createOrganization = data => request.post('organization/', data)

// 删除组织
export const removeOrganization = id => request.delete(`organization/${id}`)

// 更新组织
export const updateOrganization = (id, data) => request.put(`organization/${id}`, data)

// 组织单个查询
export const getOrganization = id => request.get(`organization/${id}`)

// 组织列表查询
export const fetchOrganizationList = params => request.get('organization/list', { params })

// 组织分页查询
export const fetchOrganizationPage = params => request.get('organization/page', { params })
