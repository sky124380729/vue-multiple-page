const files = require.context('.', true, /\.js$/)
let modules = {}
files.keys().forEach(key => {
    if (key === './index.js') return
    const module = key.replace(/\.\/(.*)\.js/, '$1')
    modules[module] = files(key).default
})
export default modules
