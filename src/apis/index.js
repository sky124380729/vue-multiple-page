// 此处放的是所有页面的公共接口

import axios from 'axios'
import devUrl from 'config/baseUrl'
import Cookies from 'js-cookie'

// 登录
export const login = data =>
    axios({
        baseURL: devUrl,
        method: 'post',
        url: `/api/identity/principal/login`,
        data
    })

// 查询模块下，已授权的资源树
export const getModuleResource = moduleCode =>
    axios({
        baseURL: devUrl,
        method: 'get',
        headers: {
            authorization: Cookies.get('token')
        },
        url: `/api/identity/resource/tree/${moduleCode}/module/grant`
    })
