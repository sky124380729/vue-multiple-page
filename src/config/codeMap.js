// import store from './store'
import Cookie from 'js-cookie'
import { Message } from 'element-ui'

export const SERVER_CODE = new Map([
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
        204,
        res => {
            return Promise.resolve(res)
        }
    ],
    [
        207,
        res => {
            Message.error(res.message)
            return Promise.resolve(null)
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
            return Promise.resolve(null)
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
            return Promise.resolve(null)
        }
    ],
    [
        212,
        res => {
            Message.error(res.message)
            return Promise.resolve(null)
        }
    ],
    [
        500,
        res => {
            Message.error(res.message)
            return Promise.resolve(null)
        }
    ],
    [
        506,
        res => {
            Message.error(res.message)
            return Promise.resolve(null)
        }
    ]
])

export const HTTP_CODE = new Map([
    [
        400,
        () => {
            Message.error('400，参数错误!')
        }
    ],
    [
        401,
        (_, router) => {
            Message.error('授权失败，请重新登录!')
            if (!router) return
            Cookie.remove('token')
            router.push('/login')
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
