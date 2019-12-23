<template>
    <section>
        <m-table title="角色管理" :page="false" :fetch-data="fetchData" :queryArr="queryArr" ref="mTable">
            <template #buttons>
                <el-button type="success" size="mini" @click="handle()">新增</el-button>
            </template>
            <el-table-column label="角色编码" prop="code" sortable="custom"></el-table-column>
            <el-table-column label="角色名称" prop="name"></el-table-column>
            <el-table-column label="角色描述" prop="note"></el-table-column>
            <el-table-column label="操作" class-name="operate">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="handle(row.id)">编辑</el-button>
                    <el-button type="text" @click="setupMenu(row)">设置菜单</el-button>
                    <el-button type="text" class="danger" @click="remove(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </m-table>

        <m-dialog title="角色管理" :model.sync="model" :visible.sync="roleVisible" @submit="submitRole" :submit-loading="roleSubmitLoading" :number="1">
            <el-form-item label="角色编码：" prop="code">
                <m-input v-model="model.code"></m-input>
            </el-form-item>
            <el-form-item label="角色名称：" prop="name">
                <m-input v-model="model.name"></m-input>
            </el-form-item>
            <el-form-item label="角色描述：" prop="note">
                <m-input type="textarea" v-model="model.note"></m-input>
            </el-form-item>
        </m-dialog>

        <el-dialog title="设置菜单" :visible.sync="authVisible" width="720px">
            <el-tabs type="card">
                <el-tab-pane label="系统统一认证">
                    <el-tree show-checkbox :data="menuList" :props="defaultProps">
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                            <span>{{ node.label }}</span>
                            <el-checkbox-group v-if="showBtnList(node, data)" v-model="permission[data.id]" @hook:destroyed="clearPermission(data.id)">
                                <el-checkbox v-for="btn of data.btnList" :label="btn.id" :key="btn.id">{{ btn.title }}</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-tree>
                </el-tab-pane>
                <el-tab-pane label="系统A"></el-tab-pane>
                <el-tab-pane label="系统B"></el-tab-pane>
                <el-tab-pane label="系统C"></el-tab-pane>
            </el-tabs>
            <template #footer>
                <el-button size="mini" @click="authVisible = false">返回</el-button>
                <el-button size="mini" type="primary" :loading="setupMenuLoading" @click="setupMenuSubmit">提交</el-button>
            </template>
        </el-dialog>
    </section>
</template>

<script>
import { fetchRoleList, createRole, updateRole, getRole, removeRole } from '@/pages/auth/apis/role'
export default {
    name: 'system-role',
    data() {
        return {
            queryArr: [{ key: 'name', tag: 'el-input', ph: '请输入名称' }],
            roleVisible: false,
            authVisible: false,
            roleSubmitLoading: false,
            setupMenuLoading: false,
            permission: {},
            defaultProps: {
                children: 'children',
                label(data) {
                    return data.title
                }
            },
            model: {},
            menuList: []
        }
    },
    created() {
        this.getAllMenu()
    },
    methods: {
        fetchData(options) {
            return fetchRoleList(options)
        },
        showBtnList(node, data) {
            return node.checked && data.btnList
        },
        clearPermission(id) {
            this.permission[id] = []
        },
        async handle(id) {
            if (id) {
                const res = await getRole(id)
                if (!res) return
                this.model = res.content
            }
            this.roleVisible = true
        },
        async setupMenu() {
            this.authVisible = true
        },
        async getAllMenu() {
            const { default: res } = await import('@/mock/menu')
            const filterMenu = menuList => {
                return menuList.filter(menu => {
                    if (menu.children && menu.children.length) {
                        if (menu.children.every(v => v.type === 'BUTTON')) {
                            this.$set(this.permission, menu.id, [])
                            menu.btnList = menu.children
                            menu.children = []
                        } else {
                            menu.children = filterMenu(menu.children)
                        }
                    }
                    return menu.hidden !== 'TRUE'
                })
            }
            this.menuList = filterMenu(res)
        },
        setupMenuSubmit() {},
        remove(id) {
            this.$confirm('确认要删除吗?', '提示', {
                type: 'error'
            })
                .then(() => {
                    removeRole(id).then(() => {
                        this.$refs.mTable.refresh()
                    })
                })
                .catch(() => {})
        },
        async submitRole() {
            const config = {
                vm: this,
                loading: 'roleSubmitLoading'
            }
            const id = this.model.id
            const res = await (id ? updateRole(id, this.model, config) : createRole(this.model, config))
            if (!res) return
            this.$refs.mTable.refresh()
            this.roleVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.el-tree {
    margin-top: 10px;
    ::v-deep {
        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
            .el-checkbox {
                margin-right: 15px;
            }
        }
    }
}
</style>
