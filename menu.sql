DROP TABLE IF EXISTS `t_id_resource`;
CREATE TABLE `t_id_resource` (
`id` char(32) NOT NULL,
`created_at` datetime DEFAULT NULL COMMENT '创建时间',
`modified_at` datetime DEFAULT NULL COMMENT '更新时间',
`created_by` char(32) DEFAULT NULL COMMENT '创建人',
`modified_by` char(32) DEFAULT NULL COMMENT '更新人',
`version` int(11) DEFAULT NULL COMMENT '版本（乐观锁）',
`is_delete` int(11) DEFAULT NULL COMMENT '逻辑删除',
`code` varchar(150) NOT NULL COMMENT '编码',
`name` varchar(50) DEFAULT NULL COMMENT '名称',
`title` varchar(50) DEFAULT NULL COMMENT '标题',
`icon` varchar(50) DEFAULT NULL COMMENT '图标',
`uri` varchar(250) DEFAULT NULL COMMENT '路径',
`sort` int(11) DEFAULT NULL COMMENT '排序',
`parent_id` char(32) DEFAULT NULL COMMENT '父id',
`type` char(50) DEFAULT NULL COMMENT '类型',
`has_data_scope` int(11) DEFAULT NULL COMMENT '是否需要控制数据权限',
`component_path` varchar(250) DEFAULT NULL COMMENT '组件路径',
`component_name` varchar(100) DEFAULT NULL COMMENT '组件名称',
`redirect_uri` varchar(250) DEFAULT NULL COMMENT '重定向路径',
`full_screen` int(11) DEFAULT NULL COMMENT '全屏',
`hidden` int(11) DEFAULT NULL COMMENT '隐藏',
PRIMARY KEY (`id`),
UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资源';
INSERT INTO `t_id_resource` VALUES ('062acb662b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-platform-index','index','中央控制台',null,'index',null,'0347c2c32b6b11eab9f1f4b520008912','MENU',null,'pages/identity/views/platform',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('0347c2c32b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-platform','platform','首页','el-icon-s-platform','/platform','1','f5723efc2b6a11eab9f1f4b520008912','MENU',null,'modules/layout',null,'/platform/index',0,0)
;INSERT INTO `t_id_resource` VALUES ('0f07d11e2b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-system-resource-create','create','新增',null,null,'1','0b537e312b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('127580232b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-system-resource-edit','edit','编辑',null,null,'1','0b537e312b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('0b537e312b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-system-resource','resource','资源管理',null,'resource','1','08b64e602b6b11eab9f1f4b520008912','MENU',1,'pages/identity/views/system/resource',null,null,0,null)
;INSERT INTO `t_id_resource` VALUES ('28edb2952b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-system-principal','principal','系统用户管理',null,'principal','2','08b64e602b6b11eab9f1f4b520008912','MENU',null,'pages/identity/views/system/principal',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('23a4817c2b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-system-organization','organization','系统组织管理',null,'organization','3','08b64e602b6b11eab9f1f4b520008912','MENU',null,'pages/identity/views/system/organization',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('269150312b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-system-role','role','系统角色管理',null,'role','4','08b64e602b6b11eab9f1f4b520008912','MENU',null,'pages/identity/views/system/role',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('08b64e602b6b11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity-system','system','系统管理',null,'/system','2','f5723efc2b6a11eab9f1f4b520008912','MENU',null,'modules/layout',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('f5723efc2b6a11eab9f1f4b520008912','2019-12-31 10:04:20','2019-12-31 10:04:20','Pink丶缤','Pink丶缤',null,null,'identity','identity','系统统一身份认证',null,'/identity',null,null,'MODULE',null,null,null,null,null,null)
