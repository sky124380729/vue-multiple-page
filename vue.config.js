/* 
    =============== 注意事项 ===============
    1.本项目是多页应用，且路由使用的是historty模式，所以请不要修改publicPath的值
    2.nginx配置类似于如下
    location /home {
        try_files $uri $uri/ /home.html;
        root html;
    }
*/

'use strict'
const glob = require('glob')
const path = require('path')
let pages = {}
function resolve(dir) {
    return path.join(__dirname, dir)
}
glob.sync('./src/pages/**/main.js').forEach(path => {
    const chunk = path.split('./src/pages/')[1].split('/main.js')[0]
    pages[chunk] = {
        entry: path,
        template: 'public/index.html',
        title: chunk,
        chunks: ['chunk-vendors', 'chunk-common', chunk]
    }
})
module.exports = {
    pages,
    chainWebpack: config => {
        config.resolve.alias
            .set('modules', resolve('src/global/modules'))
            .set('config', resolve('src/global/config'))
            .set('components', resolve('src/global/components'))
            .set('styles', resolve('src/global/styles'))
            .set('imgs', resolve('src/assets/imgs'))
            .set('pages', resolve('src/pages'))
    },
    devServer: {
        // index: 'index.html',
        open: true,
        openPage: 'home',
        host: '',
        port: 9988,
        https: false,
        hotOnly: false,
        proxy: null // 设置代理
    }
}

console.log(process.env.NODE_ENV)
