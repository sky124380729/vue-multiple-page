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
INSERT INTO `t_id_resource` VALUES ('7c4476637c38409ca865a799eb0dcfa0',null,null,null,null,null,null,'identity-platform-index','index','中央控制台',null,null,null,null,'MENU',null,'pages/identity/views/platform',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa1',null,null,null,null,null,null,'identity-platform','platform','首页',null,null,null,null,'MENU',null,'modules/layout',null,'/platform/index',0,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa4',null,null,null,null,null,null,'identity-system-resource-create','create','新增',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa5',null,null,null,null,null,null,'identity-system-resource-edit','edit','编辑',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa3',null,null,null,null,null,null,'identity-system-resource','resource','资源管理',null,null,null,null,'MENU',1,'pages/identity/views/system/resource',null,null,0,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa7',null,null,null,null,null,null,'identity-system-permission-create','create','新增',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa8',null,null,null,null,null,null,'identity-system-permission-edit','edit','编辑',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa9',null,null,null,null,null,null,'identity-system-permission-delete','delete','删除',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb0',null,null,null,null,null,null,'identity-system-permission-upload','upload','上传',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa6',null,null,null,null,null,null,'identity-system-permission','permission','权限管理',null,null,null,null,'MENU',null,'pages/identity/views/system/permission',null,null,1,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb1',null,null,null,null,null,null,'identity-system-test','test','多页测试',null,null,null,null,'MENU',null,'pages/identity/views/system/test/test-bus',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb2',null,null,null,null,null,null,'identity-system-organization','organization','系统组织管理',null,null,null,null,'MENU',null,'pages/identity/views/system/organization',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb3',null,null,null,null,null,null,'identity-system-role','role','系统角色管理',null,null,null,null,'MENU',null,'pages/identity/views/system/role',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb4',null,null,null,null,null,null,'identity-system-principal','principal','系统用户管理',null,null,null,null,'MENU',null,'pages/identity/views/system/principal',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa2',null,null,null,null,null,null,'identity-system','system','系统管理',null,null,null,null,'MENU',null,'modules/layout',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfa0',null,null,null,null,null,null,'identity','identity','系统统一身份认证',null,null,null,null,'MODULE',null,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475632228409ca865a799eb0dcfb6',null,null,null,null,null,null,'a-platform-index','index','中央控制台',null,null,null,null,'MENU',null,'pages/identity/views/platform',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb6',null,null,null,null,null,null,'a-platform','platform','首页A',null,null,null,null,'MENU',null,'modules/layout',null,'/platform/index',0,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb9',null,null,null,null,null,null,'a-system-resource-create','create','新增',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc0',null,null,null,null,null,null,'a-system-resource-edit','edit','编辑',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb8',null,null,null,null,null,null,'a-system-resource','resource','资源管理',null,null,null,null,'MENU',null,'pages/identity/views/system/resource',null,null,0,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc2',null,null,null,null,null,null,'a-system-permission-create','create','新增',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc3',null,null,null,null,null,null,'a-system-permission-edit','edit','编辑',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc4',null,null,null,null,null,null,'a-system-permission-delete','delete','删除',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc5',null,null,null,null,null,null,'a-system-permission-upload','upload','上传',null,null,'1',null,'BUTTON',0,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc1',null,null,null,null,null,null,'a-system-permission','permission','权限管理',null,null,null,null,'MENU',null,'pages/identity/views/system/permission',null,null,1,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc6',null,null,null,null,null,null,'a-system-test','test','多页测试',null,null,null,null,'MENU',null,'pages/identity/views/system/test/test-bus',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc7',null,null,null,null,null,null,'a-system-organization','organization','系统组织管理',null,null,null,null,'MENU',null,'pages/identity/views/system/organization',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc8',null,null,null,null,null,null,'a-system-role','role','系统角色管理',null,null,null,null,'MENU',null,'pages/identity/views/system/role',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfc9',null,null,null,null,null,null,'a-system-principal','principal','系统用户管理',null,null,null,null,'MENU',null,'pages/identity/views/system/principal',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb7',null,null,null,null,null,null,'a-system','system','系统管理A',null,null,null,null,'MENU',null,'modules/layout',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('7c4475637c38409ca865a799eb0dcfb5',null,null,null,null,null,null,'a','a','系统A',null,null,null,null,'MODULE',null,null,null,null,null,null)
