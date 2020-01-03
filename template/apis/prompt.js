const { notEmpty } = require('../utils.js')

const path = require('path')

// 选项框
const choices = ['create', 'update', 'get', 'delete', 'fetchList', 'fetchPage'].map(type => ({
    name: type,
    value: type,
    checked: true
}))

module.exports = {
    description: 'generate api template',
    prompts: [
        {
            type: 'directory',
            name: 'from',
            message: 'Please select the file storage address',
            basePath: path.join(__dirname, '../../src/pages')
        },
        {
            type: 'input',
            name: 'name',
            message: 'api name',
            validate: notEmpty('name')
        },
        {
            type: 'checkbox',
            name: 'types',
            message: 'api types',
            choices
        }
    ],
    actions: data => {
        const { name, from, types } = data
        const filePath = path.join('src/pages', from, name + '.js')
        const actions = [
            {
                type: 'add',
                path: filePath,
                templateFile: 'template/apis/index.hbs',
                data: {
                    name: name,
                    create: types.includes('create'),
                    update: types.includes('update'),
                    get: types.includes('get'),
                    delete: types.includes('delete'),
                    fetchList: types.includes('fetchList'),
                    fetchPage: types.includes('fetchPage')
                }
            }
        ]

        return actions
    }
}
