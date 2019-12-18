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
    css: {
        loaderOptions: {
            // 向所有 Sass 样式传入共享的全局变量
            sass: {
                prependData: `@import "~styles/variables.scss";`
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('modules', resolve('src/modules'))
            .set('config', resolve('src/config'))
            .set('components', resolve('src/components'))
            .set('styles', resolve('src/styles'))
            .set('utils', resolve('src/utils'))
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
        proxy: {
            '/test': {
                changeOrigin: true,
                target: 'http://172.16.10.153:8762',
                pathRewrite: {
                    '^/test': ''
                }
            }
        }
    }
}
