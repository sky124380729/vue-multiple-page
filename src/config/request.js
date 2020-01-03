import axios from 'axios'
import Cookies from 'js-cookie'
import baseURL from 'config/baseUrl'
import { Message } from 'element-ui'
import { HTTP_CODE, SERVER_CODE } from 'config/codeMap'

const createHttp = (option = {}) => {
    const service = axios.create({
        ...option,
        baseURL: baseURL + option.baseURL
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
            return code ? SERVER_CODE.get(code)(res) : Promise.reject(res)
        },
        error => {
            const { response: res = {} } = error
            HTTP_CODE.get(res.status)(res)
            return Promise.reject(error)
        }
    )
    return service
}

// 系统管理API
// export const httpIdentity = createHttp({
//     baseURL: `${baseURL}/api/identity/`,
//     timeout: 10000
// })

export default createHttp
