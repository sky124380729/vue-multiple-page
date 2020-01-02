# vue-multiple-page

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run dev
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## TIPS

### 关于菜单配置

```javascript
{
	"id": "0347c2c32b6b11eab9f1f4b520008912", // 建议使用数据库生成id =必填=
    "title": "中央控制台", //菜单的名称 =必填=
    "name": "platform",  // 菜单的name,前端路由用 =必填=
    "icon": "el-icon-s-platform", // 图标 =非必填=
    "uri": "/platform", // 路径，对应菜单的路径 =菜单项和带跳转的按钮项必填=
    "redirectUri": "/platform/index", // 路由重定向 =非必填=
    "hidden": "FALSE", // 该项在左侧菜单树是否显示 =非必填=
    "fullScreen": "FALSE"， // 该路由是否打开即全屏 =非必填=
	"hasDataScope":"FALSE", // 数据权限范围，后台控制用 =非必填=
	"componentPath": "modules/layout", // 路由对应的前端页面的路径 =菜单项和带跳转的按钮项必填=
    "type":"MENU", // 该项是的类型，分为[MODULE:'系统'，MENU:'菜单',BUTTON:'按钮']， =必填=
    "chidlren":[], // 子项，和以上结构相同
}
```

- 页面只有二级菜单，在配置前端路由的时候，不管页面是一级菜单还是二级菜单，需要配置到三级路由，请遵循mock/menu.json的配置方式。例如中央控制台只有一级菜单的情况下，需要redirect到对应的三级菜单。

- 为了方便后期维护和扩展，在配置路由的时候，重定向指向的菜单name一定是index

- 配置路由的时候，name值一定是必填项，且同级的name不能重复，路由对应的页面的name必须与路由定义的name保持一致，为了使页面能够缓存

- 菜单在前端维护在mock/menu.json下，为了方便前端进行配置，可以用`npm run menu`命令生产SQL语句，配置到数据库中


