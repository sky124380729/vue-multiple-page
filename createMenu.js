const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// 导出的文件目录位置
const SQL_PATH = resolve('./menu.sql')

function createSQL(data, name = '', arr = []) {
    data.forEach(function(v) {
        if (v.children && v.children.length) {
            createSQL(v.children, name + '-' + v.name, arr)
        }
        arr.push({
            id: v.id,
            created_at: null,
            modified_at: null,
            created_by: null,
            modified_by: null,
            version: 0,
            is_delete: 0,
            code: (name + '-' + v.name).slice(1),
            name: v.name,
            title: v.title,
            icon: v.icon,
            uri: v.url,
            sort: v.sort,
            parent_id: v.parent_id,
            type: v.type,
            has_data_scope: v.hasDataScope,
            component_path: v.componentPath,
            component_name: v.componentName,
            redirect_uri: v.redirectUri,
            full_screen: v.fullScreen,
            hidden: v.hidden
        })
    })
    return arr
}

fs.readFile(resolve('src/mock/menu.json'), 'utf-8', (err, data) => {
    const menuList = createSQL(JSON.parse(data))
    const sql = menuList
        .map(sql => {
            let value = ''
            // eslint-disable-next-line no-unused-vars
            for (const [k, v] of Object.entries(sql)) {
                value += ','
                if (typeof v === 'boolean') {
                    value += v ? 1 : 0
                } else {
                    value += v ? `'${v}'` : null
                }
            }
            return 'INSERT INTO `t_id_resource` VALUES (' + value.slice(1) + ')' + '\n'
        })
        .join(';')
    const mySQL =
        'DROP TABLE IF EXISTS `t_id_resource`;' +
        '\n' +
        'CREATE TABLE `t_id_resource` (' +
        '\n' +
        '`id` char(32) NOT NULL,' +
        '\n' +
        "`created_at` datetime DEFAULT NULL COMMENT '创建时间'," +
        '\n' +
        "`modified_at` datetime DEFAULT NULL COMMENT '更新时间'," +
        '\n' +
        "`created_by` char(32) DEFAULT NULL COMMENT '创建人'," +
        '\n' +
        "`modified_by` char(32) DEFAULT NULL COMMENT '更新人'," +
        '\n' +
        "`version` int(11) DEFAULT NULL COMMENT '版本（乐观锁）'," +
        '\n' +
        "`is_delete` int(11) DEFAULT NULL COMMENT '逻辑删除'," +
        '\n' +
        "`code` varchar(150) NOT NULL COMMENT '编码'," +
        '\n' +
        "`name` varchar(50) DEFAULT NULL COMMENT '名称'," +
        '\n' +
        "`title` varchar(50) DEFAULT NULL COMMENT '标题'," +
        '\n' +
        "`icon` varchar(50) DEFAULT NULL COMMENT '图标'," +
        '\n' +
        "`uri` varchar(250) DEFAULT NULL COMMENT '路径'," +
        '\n' +
        "`sort` int(11) DEFAULT NULL COMMENT '排序'," +
        '\n' +
        "`parent_id` char(32) DEFAULT NULL COMMENT '父id'," +
        '\n' +
        "`type` char(50) DEFAULT NULL COMMENT '类型'," +
        '\n' +
        "`has_data_scope` int(11) DEFAULT NULL COMMENT '是否需要控制数据权限'," +
        '\n' +
        "`component_path` varchar(250) DEFAULT NULL COMMENT '组件路径'," +
        '\n' +
        "`component_name` varchar(100) DEFAULT NULL COMMENT '组件名称'," +
        '\n' +
        "`redirect_uri` varchar(250) DEFAULT NULL COMMENT '重定向路径'," +
        '\n' +
        "`full_screen` int(11) DEFAULT NULL COMMENT '全屏'," +
        '\n' +
        "`hidden` int(11) DEFAULT NULL COMMENT '隐藏'," +
        '\n' +
        'PRIMARY KEY (`id`),' +
        '\n' +
        'UNIQUE KEY `code` (`code`)' +
        '\n' +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资源';" +
        '\n' +
        sql
    fs.writeFile(SQL_PATH, mySQL, err => {
        if (err) console.log(err)
        console.log(chalk.cyanBright(`恭喜你，创建sql语句成功，位置：${SQL_PATH}`))
    })
})
