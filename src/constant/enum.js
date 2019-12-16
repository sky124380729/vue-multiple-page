// 后台枚举类

const enumMap = {
    // 设备运行状态
    EquipmentStatusEnum: {
        IN_SERVICE: {
            des: '运行',
            color: '#67C23A'
        },
        OUT_OF_SERVICE: {
            des: '待机',
            color: '#409EFF'
        },
        ALARM: {
            des: '报警',
            color: '#F56C6C'
        },
        END_SERVICE: {
            des: '关机',
            color: '#909399'
        },
        IN_MAINTENANCE: {
            des: '维修',
            color: '#01c0c8'
        }
    }
}

export const enumList = key => {
    const map = []
    for (const [k, v] of Object.entries(enumMap[key])) {
        map.push({
            label: v.des,
            value: k
        })
    }
    return map
}

export default enumMap
