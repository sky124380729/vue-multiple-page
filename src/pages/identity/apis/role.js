import request from './request'

// 新增角色
export const createRole = data => request.post('role/', data)

// 删除角色
export const removeRole = id => request.delete(`role/${id}`)

// 更新角色
export const updateRole = (id, data) => request.put(`role/${id}`, data)

// 角色单个查询
export const getRole = id => request.get(`role/${id}`)

// 角色列表查询
export const fetchRoleList = params => request.get('role/list', { params })

// 角色分页查询
export const fetchRolePage = params => request.get('role/page', { params })
