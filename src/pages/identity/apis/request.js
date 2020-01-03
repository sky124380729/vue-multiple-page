import createHttp from 'config/request'

export default createHttp({
    baseURL: '/api/identity/',
    timeout: 10000
})
