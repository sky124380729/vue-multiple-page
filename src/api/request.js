import axios from 'axios'
import { SUCCESS_OK, BASE_URL, TIME_OUT } from '@/constant'
import Cookies from 'js-cookie'
import { Message, MessageBox } from 'element-ui'

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
            // store.commit('LOGOUT')
            setTimeout(() => {
                // router.push('/login')
            }, 2000)
            break
        case 404:
            Message.error('接口地址错误，请联系管理员!')
            break
        case 500:
            Message.error('服务器发生错误,请联系管理员!')
            break
        case 504:
            Message.error('504，接口发布中...')
            break
        default:
            break
    }
}

// 普通http请求
const myHttp = (method, url, config = {}) => {
    // 创建实例
    const service = axios.create({
        baseURL: BASE_URL, // 基准地址
        timeout: TIME_OUT // 超时时间
    })

    // 请求拦截器
    service.interceptors.request.use(
        request => {
            // 如果当前有token，则请求头加上token
            const token = Cookies.get('token')
            token && (request.headers['authorization'] = token)
            // loading处理
            loadingFun(config.loading, config.vm, true)
            // 返回
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
            // loading处理
            loadingFun(config.loading, config.vm, false)
            // 处理返回结果
            if (code === SUCCESS_OK) {
                if (config.msg) {
                    Message({
                        type: code === SUCCESS_OK ? 'success' : 'error',
                        message: typeof config.msg === 'string' ? config.msg : rs.msg
                    })
                }
                return Promise.resolve(rs)
            } else {
                Message.error(rs.msg)
                return Promise.reject(rs)
            }
        },
        error => {
            const { response: res = {} } = error
            // loading处理
            loadingFun(config.loading, config.vm, false)
            // 错误处理
            codeCb(res.status, res.data.error)
            return Promise.reject(error)
        }
    )
    return service({
        method: method,
        url: url,
        ...config
    })
}
export default myHttp

export const request = {
    get(url, { msg = false, ...config } = {}) {
        return myHttp('get', url, {
            ...config,
            msg
        }).catch(() => {})
    },
    post(url, { msg = true, data = {}, ...config } = {}) {
        return myHttp('post', url, {
            ...config,
            data,
            msg
        }).catch(() => {})
    },
    put(url, { msg = true, data = {}, ...config } = {}) {
        return myHttp('put', url, {
            ...config,
            data,
            msg
        }).catch(() => {})
    },
    delete(url, id, { msg = true, confirm = true, ...config } = {}) {
        if (confirm) {
            return new Promise(resolve => {
                MessageBox.confirm('确认删除吗?', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        resolve(myHttp('delete', url + id + 'id', { ...config, msg }).catch(() => {}))
                    })
                    .catch(() => {})
            })
        } else {
            return myHttp('delete', url + id + 'id', { ...config, msg }).catch(() => {})
        }
    },
    download(url, filename = '未定义文件名.xlsx', data = {}) {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method: 'post',
                data,
                headers: {
                    authorization: Cookies.get('token')
                },
                baseURL: BASE_URL,
                responseType: 'blob'
            })
                .then(({ data: file }) => {
                    const link = document.createElement('a')
                    link.style.display = 'none'
                    link.setAttribute('download', filename)
                    link.setAttribute('href', URL.createObjectURL(new Blob([file])))
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    resolve()
                })
                .catch(error => {
                    const { response: res = {} } = error
                    // 错误处理
                    codeCb(res.status, res.statusText)
                    reject()
                })
        })
    }
}
