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
        index: 'home.html', //默认启动serve 打开index页面
        open: process.platform === 'darwin',
        host: '',
        port: 9988,
        https: false,
        hotOnly: false,
        proxy: null // 设置代理
    }
}
