import { deepClone } from '@/utils/tools'
import { request } from '@/api/request'

export default Vue => {
    // 深拷贝
    Vue.prototype.$deepClone = deepClone

    // 请求
    Vue.prototype.$http = request
}
