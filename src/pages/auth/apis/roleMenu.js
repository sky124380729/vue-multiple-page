import request from './request'

// 新增或者修改角色菜单
export const handleMenu = (roleId, data, config) =>
    request(
        {
            method: 'post',
            url: `/api/identity/roleMenu/role/${roleId}`,
            data
        },
        config
    )

// 角色菜单单个查询
export const getRoleMenu = roleId =>
    request({
        method: 'get',
        url: `/api/identity/roleMenu/role/${roleId}`
    })
