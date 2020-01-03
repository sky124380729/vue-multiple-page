const files = require.context('./modules', false, /\.js$/)

files.keys().forEach(key => {
    for (const [k, v] of Object.entries(files(key))) {
        exports[k] = v
    }
})
