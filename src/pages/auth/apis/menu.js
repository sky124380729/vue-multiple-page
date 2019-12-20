import request from './request'

export const getMenuTree = () =>
    request({
        type: 'get',
        url: '/api/identity/menu/tree'
    })
