import axios from 'axios'
import store from '../store'
import router from '../router'
import Cookies from 'js-cookie'
import { Message } from 'element-ui'

export const baseURL = '/test'

const SERVER_CODE = new Map([
    [
        200,
        res => {
            return Promise.resolve(res)
        }
    ],
    [
        201,
        res => {
            Message.success(res.message)
            return Promise.resolve(res)
        }
    ],
    [
        207,
        res => {
            Message.error(res.message)
            return Promise.reject(res)
        }
    ],
    [
        208,
        res => {
            Message.success(res.message)
            return Promise.resolve(res)
        }
    ],
    [
        209,
        res => {
            Message.error(res.message)
            return Promise.reject(res)
        }
    ],
    [
        210,
        res => {
            Message.success(res.message)
            return Promise.resolve(res)
        }
    ],
    [
        211,
        res => {
            Message.error(res.message)
            return Promise.reject(res)
        }
    ],
    [
        212,
        res => {
            Message.error(res.message)
            return Promise.reject(res)
        }
    ],
    [
        204,
        res => {
            Message.error(res.message)
            return Promise.reject(res)
        }
    ],
    [
        500,
        res => {
            Message.error(res.message)
            return Promise.reject(res)
        }
    ],
    [
        506,
        res => {
            Message.error(res.message)
            return Promise.reject(res)
        }
    ]
])

const HTTP_CODE = new Map([
    [
        400,
        () => {
            Message.error('400，参数错误!')
        }
    ],
    [
        401,
        () => {
            Message.error('授权失败，请重新登录!')
            store.dispatch('logout').then(() => {
                router.push('/login')
            })
        }
    ],
    [
        403,
        () => {
            Message.error('拒绝访问!')
        }
    ],
    [
        404,
        e => {
            Message.error(`接口地址错误，不存在接口：'${e.data.path}'`)
        }
    ],
    [
        500,
        () => {
            Message.error('服务器发生错误，请联系管理员!')
        }
    ],
    [
        503,
        () => {
            Message.error('Service Unavailable!')
        }
    ],
    [
        504,
        () => {
            Message.error('接口发布中，请稍后再试...')
        }
    ]
])
// loading处理函数
const loadingFun = (loading, vm, flag) => {
    if (!loading || !vm) return
    loading.split(',').forEach(v => {
        vm[v] = flag
    })
}

const myHttp = (options, config = {}) => {
    const service = axios.create({
        baseURL: baseURL,
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
