import axios from 'axios'
import Cookies from 'js-cookie'
import baseURL from 'config/baseUrl'
import { Message } from 'element-ui'
import { HTTP_CODE, SERVER_CODE } from 'config/codeMap'

const service = axios.create({
    baseURL,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    request => {
        const token = Cookies.get('token')
        token && (request.headers['authorization'] = token)
        return request
    },
    error => {
        Message.error(error)
    }
)
// 返回拦截器
service.interceptors.response.use(
    ({ data: res } = {}) => {
        const { code } = res
        return code !== undefined ? SERVER_CODE.get(code)(res) : res
    },
    error => {
        const { response: res = {} } = error
        HTTP_CODE.get(res.status)(res)
        return Promise.reject(error)
    }
)

export default service
