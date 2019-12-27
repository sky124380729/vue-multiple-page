import axios from 'axios'
import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'
import { HTTP_CODE, SERVER_CODE } from 'config/codeMap'
import devUrl from 'config/baseUrl'

export const baseURL = `${devUrl}/api/identity/`

HTTP_CODE.set(401, () => {
    Message.error('授权失败，请重新登录!')
    store.dispatch('logout').then(() => {
        router.push('/login')
    })
})

// loading处理函数
const loadingFun = (loading, vm, flag) => {
    if (!loading || !vm) return
    loading.split(',').forEach(v => {
        vm[v] = flag
    })
}

const myHttp = (options, config = {}) => {
    const service = axios.create({
        baseURL,
        timeout: 5000
    })
    // 请求拦截器
    service.interceptors.request.use(
        request => {
            const token = Cookies.get('token')
            token && (request.headers['authorization'] = token)
            loadingFun(config.loading, config.vm, true)
            return request
        },
        error => {
            Message.error(error)
        }
    )
    // 返回拦截器
    service.interceptors.response.use(
        ({ data: res }) => {
            const code = res && res.code
            loadingFun(config.loading, config.vm, false)
            return SERVER_CODE.get(code)(res)
        },
        error => {
            const { response: res = {} } = error
            loadingFun(config.loading, config.vm, false)
            HTTP_CODE.get(res.status)(res)
            return Promise.reject(error)
        }
    )
    return service(options, config).catch(() => null)
}

export default myHttp
