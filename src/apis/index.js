// 此处放的是所有页面的公共接口

import axios from 'axios'
import baseUrl from 'config/baseUrl'

// 登录
export const login = data => axios.post(`${baseUrl}/api/identity/principal/login`, data)
// 查询模块下，已授权的资源树
export const getModuleResource = moduleCode => axios.get(`${baseUrl}/api/identity/resource/tree/${moduleCode}/module/grant`)
