import request from './request'

// 获取资源树
export const getResourceTree = () => request.get('resource/tree')
