import createHttp from 'config/request'
import router from '../router'

export default createHttp(
    {
        baseURL: '/api/identity/',
        timeout: 10000
    },
    router
)
