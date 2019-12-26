// 此处放的是所有页面的公共接口

import axios from 'axios'
import devUrl from 'config/baseUrl'

// 登录
export const login = data =>
    axios({
        baseURL: devUrl,
        method: 'post',
        url: `/api/identity/principal/login`,
        data
    })
