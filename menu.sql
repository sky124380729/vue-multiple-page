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
INSERT INTO `t_id_resource` VALUES ('abeadec32d3711eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-platform-index-index','index','中央控制台',null,'index',null,'062acb662b6b11eab9f1f4b520008912','MENU',null,'pages/identity/views/platform',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('062acb662b6b11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-platform-index','index','中央控制台',null,'index',null,'0347c2c32b6b11eab9f1f4b520008912','MENU',null,'modules/Menu',null,'/platform/index/index',null,1)
;INSERT INTO `t_id_resource` VALUES ('0347c2c32b6b11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-platform','platform','中央控制台','el-icon-s-platform','/platform',null,'f5723efc2b6a11eab9f1f4b520008912','MENU',null,'modules/layout',null,'/platform/index',0,0)
;INSERT INTO `t_id_resource` VALUES ('fdb2a3ed2d0711eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-resource-index','index','列表',null,'index',null,'0b537e312b6b11eab9f1f4b520008912','MENU',0,'pages/identity/views/system/resource/index',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('0b537e312b6b11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-resource','resource','系统资源管理',null,'resource',null,'08b64e602b6b11eab9f1f4b520008912','MENU',1,'modules/Menu',null,'/system/resource/index',0,null)
;INSERT INTO `t_id_resource` VALUES ('e163d52e2d2e11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-principal-index','index','列表',null,'index',null,'28edb2952b6b11eab9f1f4b520008912','MENU',0,'pages/identity/views/system/principal',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('ff4c93ff2d2e11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-principal-create','create','新增',null,null,'1','28edb2952b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('02f16ecb2d2f11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-principal-edit','edit','编辑',null,null,'2','28edb2952b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('0d2b81b52d2f11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-principal-delete','delete','删除',null,null,'3','28edb2952b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('15f9a2332d2f11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-principal-setOrg','setOrg','选择组织',null,null,'4','28edb2952b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('28edb2952b6b11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-principal','principal','系统用户管理',null,'principal','1','08b64e602b6b11eab9f1f4b520008912','MENU',null,'modules/Menu',null,'/system/principal/index',null,0)
;INSERT INTO `t_id_resource` VALUES ('162935c82d3011eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-organization-index','index','主页',null,'index',null,'23a4817c2b6b11eab9f1f4b520008912','MENU',0,'pages/identity/views/system/organization',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('23a4817c2b6b11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-organization','organization','系统组织管理',null,'organization','2','08b64e602b6b11eab9f1f4b520008912','MENU',null,'modules/Menu',null,'/system/organization/index',null,0)
;INSERT INTO `t_id_resource` VALUES ('4028acae2d3011eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-role-index','index','列表',null,'index',null,'269150312b6b11eab9f1f4b520008912','MENU',0,'pages/identity/views/system/role',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('440e54022d3011eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-role-create','create','新增',null,null,'1','269150312b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('476f8c522d3011eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-role-edit','edit','编辑',null,null,'2','269150312b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('4a790b362d3011eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-role-delete','delete','删除',null,null,'3','269150312b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('4d6a8fab2d3011eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-role-setMenu','setMenu','设置菜单',null,null,'4','269150312b6b11eab9f1f4b520008912','BUTTON',0,null,null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('269150312b6b11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system-role','role','系统角色管理',null,'role','3','08b64e602b6b11eab9f1f4b520008912','MENU',null,'modules/Menu',null,'/system/role/index',null,0)
;INSERT INTO `t_id_resource` VALUES ('08b64e602b6b11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-system','system','系统管理',null,'/system','1','f5723efc2b6a11eab9f1f4b520008912','MENU',null,'modules/layout',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('a53b863c2d3411eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-test-pages-index','index','主页',null,'index',null,'96e39da92d3411eab9f1f4b520008912','MENU',0,'pages/identity/views/test/pages/index',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('6d88d15a2d3611eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-test-pages-edit','edit','编辑',null,'edit/:id','1','96e39da92d3411eab9f1f4b520008912','BUTTON',0,'pages/identity/views/test/pages/form',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('96e39da92d3411eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-test-pages','pages','多页跳转测试',null,'pages',null,'d100580d2d3411eab9f1f4b520008912','MENU',1,'modules/Menu',null,'/test/pages/index',0,null)
;INSERT INTO `t_id_resource` VALUES ('d100580d2d3411eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity-test','test','组件测试',null,'/test','2','f5723efc2b6a11eab9f1f4b520008912','MENU',null,'modules/layout',null,null,null,0)
;INSERT INTO `t_id_resource` VALUES ('f5723efc2b6a11eab9f1f4b520008912','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'identity','identity','系统统一身份认证',null,'/identity',null,null,'MODULE',null,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('e0100ce44fa511ea8b42525400e825a8','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'guard-platform-index-index','index','中央控制台',null,'index',null,'dc48d1874fa511ea8b42525400e825a8','MENU',null,'pages/guard/views/platform',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('dc48d1874fa511ea8b42525400e825a8','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'guard-platform-index','index','中央控制台',null,'index',null,'5e02bf9a4fa511ea8b42525400e825a8','MENU',null,'modules/Menu',null,'/platform/index/index',null,1)
;INSERT INTO `t_id_resource` VALUES ('5e02bf9a4fa511ea8b42525400e825a8','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'guard-platform','platform','中央控制台','el-icon-s-platform','/platform',null,'42b37c684fa511ea8b42525400e825a8','MENU',null,'modules/layout',null,'/platform/index',0,0)
;INSERT INTO `t_id_resource` VALUES ('42b37c684fa511ea8b42525400e825a8','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'guard','guard','门禁',null,'/guard','1',null,'MODULE',null,null,null,null,null,null)
;INSERT INTO `t_id_resource` VALUES ('39f6cf5d4fa611ea8b42525400e825a8','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'video-platform-index-index','index','中央控制台',null,'index',null,'369c5f424fa611ea8b42525400e825a8','MENU',null,'pages/video/views/platform',null,null,null,1)
;INSERT INTO `t_id_resource` VALUES ('369c5f424fa611ea8b42525400e825a8','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'video-platform-index','index','中央控制台',null,'index',null,'33cb63b14fa611ea8b42525400e825a8','MENU',null,'modules/Menu',null,'/platform/index/index',null,1)
;INSERT INTO `t_id_resource` VALUES ('33cb63b14fa611ea8b42525400e825a8','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'video-platform','platform','中央控制台','el-icon-s-platform','/platform',null,'2b82bc314fa611ea8b42525400e825a8','MENU',null,'modules/layout',null,'/platform/index',0,0)
;INSERT INTO `t_id_resource` VALUES ('2b82bc314fa611ea8b42525400e825a8','2020-02-15 11:50:09','2020-02-15 11:50:09','Pink丶缤','Pink丶缤',null,null,'video','video','视频',null,'/video','2',null,'MODULE',null,null,null,null,null,null)
