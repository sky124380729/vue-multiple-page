const { notEmpty } = require('../utils.js')
const path = require('path')

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
            choices: [
                {
                    name: 'create',
                    value: 'create',
                    checked: true
                },
                {
                    name: 'update',
                    value: 'update',
                    checked: true
                },
                {
                    name: 'get',
                    value: 'get',
                    checked: true
                },
                {
                    name: 'delete',
                    value: 'delete',
                    checked: true
                },
                {
                    name: 'fetchList',
                    value: 'fetchList',
                    checked: true
                },
                {
                    name: 'fetchPage',
                    value: 'fetchPage',
                    checked: true
                }
            ]
        }
    ],
    actions: data => {
        const types = data.types
        const filePath = path.join('src/pages', data.from, data.name + '.js')
        const actions = [
            {
                type: 'add',
                path: filePath,
                templateFile: 'template/apis/index.hbs',
                data: {
                    name: data.name,
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
