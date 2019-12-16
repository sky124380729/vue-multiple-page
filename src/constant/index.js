const DEV_MODE_URL = '/qi'
// api请求基准地址
export const BASE_URL = process.env.NODE_ENV === 'production' ? '/pf-mes-api' : DEV_MODE_URL

// 栏目默认图标
export const ICON_DEFAULT = 'fa-ravelry'

// 请求超时时间(ms)
export const TIME_OUT = 20000

// api请求正确吗
export const SUCCESS_OK = 200
