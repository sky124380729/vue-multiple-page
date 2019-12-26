import request from './request'

// 新增或者修改角色菜单
export const handleRoleResource = (roleId, data, config) =>
    request(
        {
            method: 'post',
            url: `roleResource/role/${roleId}`,
            data
        },
        config
    )

// 角色菜单单个查询
export const getRoleResource = (roleId, config) =>
    request(
        {
            method: 'get',
            url: `roleResource/role/${roleId}`
        },
        config
    )
