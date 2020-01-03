import request from '../request'

// 新增用户
export const createPrincipal = data => request.post('principal/', data)

// 修改用户
export const updatePrincipal = (id, data) => request.put(`principal/${id}`, data)

// 查询用户
export const getPrincipal = id => request.get(`principal/${id}`)

// 用户分页查询
export const fetchPrincipalPage = params => request.get('principal/page', { params })
