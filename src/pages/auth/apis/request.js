import axios from 'axios'
import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'

// loading处理函数
const loadingFun = (loading, vm, flag) => {
    if (!loading || !vm) return
    loading.split(',').forEach(v => {
        vm[v] = flag
    })
}
// 状态码处理
const codeCb = (code, error) => {
    // 提示信息
    switch (code) {
        case 400:
            Message.error(error)
            break
        case 401:
            Message.error('页面超时，请重新登录!')
            store.dispatch('logout').then(() => {
                router.push('/login')
            })
            break
        case 404:
            Message.error('接口地址错误，请联系管理员!')
            break
        case 500:
            Message.error('服务器发生错误,请联系管理员!')
            break
        case 504:
            Message.error('接口发布中，请稍后再试...')
            break
        default:
            break
    }
}

const myHttp = (options, config = {}) => {
    const service = axios.create({
        baseURL: '/test',
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
        response => {
            const rs = response.data
            const code = rs && rs.code
            loadingFun(config.loading, config.vm, false)
            if (code === 200) {
                if (config.msg !== undefined) {
                    Message({
                        type: code === 200 ? 'success' : 'error',
                        message: typeof config.msg === 'string' ? config.msg : rs.message
                    })
                }
                return Promise.resolve(rs)
            } else {
                Message.error(rs.message)
                return Promise.reject(rs)
            }
        },
        error => {
            const { response: res = {} } = error
            loadingFun(config.loading, config.vm, false)
            codeCb(res.status, res.data.error)
            return Promise.reject(error)
        }
    )
    return service(options, config).catch(() => null)
}

export default myHttp
