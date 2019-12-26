import request from './request'

// 获取资源树
export const getResourceTree = () =>
    request({
        type: 'get',
        url: '/api/identity/resource/tree'
    })
