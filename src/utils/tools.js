/**
 * 生成UUID的值
 * @returns uuid
 */
export const generateUUID = () => {
    var d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
    return uuid
}

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param timeout
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, timeout = 300, ctx) => {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            timer = null
            fn.apply(ctx, args)
        }, timeout)
    }
}

/**
 * 对象深拷贝
 * @param obj
 * @returns obj
 * @constructor
 */
export const deepClone = obj => {
    if (!obj) return obj
    let result = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                result[key] = deepClone(obj[key]) // 递归复制
            } else {
                result[key] = obj[key]
            }
        }
    }
    return result
}
