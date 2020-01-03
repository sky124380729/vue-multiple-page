import request from '../request'

// 新增或者修改角色菜单
export const handleRoleResource = (roleId, data) => request.post(`roleResource/role/${roleId}`, data)

// 角色菜单单个查询
export const getRoleResource = roleId => request.get(`roleResource/role/${roleId}`)
