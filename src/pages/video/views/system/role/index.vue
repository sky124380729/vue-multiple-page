<template>
    <section>
        <m-table title="角色管理" :page="false" :fetch-data="fetchData" :queryArr="queryArr" ref="mTable">
            <template #buttons>
                <el-button type="text" icon="el-icon-plus" size="mini" @click="handle()">新增</el-button>
            </template>
            <el-table-column label="角色编码" prop="code" sortable="custom"></el-table-column>
            <el-table-column label="角色名称" prop="name"></el-table-column>
            <el-table-column label="角色描述" prop="note"></el-table-column>
            <el-table-column label="操作" class-name="operate" align="center" width="180px">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="handle(row.id)">编辑</el-button>
                    <el-button type="text" @click="setupMenu(row.id)">设置菜单</el-button>
                    <el-button type="text" class="danger" @click="remove(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </m-table>

        <m-dialog title="角色管理" :model.sync="model" :visible.sync="roleVisible" :rules="rules" @submit="submitRole" :submit-loading="roleSubmitLoading" :number="1">
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

        <el-dialog title="设置菜单" :visible.sync="authVisible" width="720px" @closed="authClosed">
            <el-tabs type="card">
                <el-tab-pane v-for="(system, index) in menuList" :label="system.title" :key="index">
                    <el-tree
                        v-loading="treeLoading"
                        :data-parent-id="system.id"
                        node-key="id"
                        :default-expanded-keys="defaultKeys"
                        :check-strictly="checkStrictly"
                        show-checkbox
                        accordion
                        :expand-on-click-node="false"
                        ref="menuTree"
                        :data="system.children"
                        :props="defaultProps"
                    >
                        <div class="custom-tree-node" slot-scope="{ node, data }">
                            <div class="main">
                                <el-tag v-if="node.data.type === 'BUTTON'" size="mini" type="success">按钮项</el-tag>
                                <el-tag v-else-if="node.data.name !== 'index'" size="mini" type="primary">菜单项</el-tag>
                                <el-tag v-else size="mini" type="danger">必选项</el-tag>
                                <span>{{ node.label }}</span>
                            </div>
                            <el-radio-group v-if="(node.indeterminate || node.checked) && data.hasDataScope === 'TRUE'" v-model="dataScope[data.id]" size="mini">
                                <el-radio-button label="ALL">全部</el-radio-button>
                                <el-radio-button label="BRANCH">分公司</el-radio-button>
                                <el-radio-button label="SUBORDINATE">个人及其下属</el-radio-button>
                            </el-radio-group>
                        </div>
                    </el-tree>
                </el-tab-pane>
            </el-tabs>
            <template #footer>
                <el-button size="mini" @click="authVisible = false">返回</el-button>
                <el-button size="mini" type="primary" :loading="setupMenuLoading" @click="setupMenuSubmit">提交</el-button>
            </template>
        </el-dialog>
    </section>
</template>

<script>
import { fetchRoleList, createRole, updateRole, getRole, removeRole, handleRoleResource, getRoleResource, getResourceTree } from '@/pages/identity/apis'
export default {
    name: 'system-role',
    data() {
        return {
            queryArr: [{ key: 'name', tag: 'el-input', label: '名称' }],
            roleVisible: false,
            authVisible: false,
            roleSubmitLoading: false,
            setupMenuLoading: false,
            treeLoading: false,
            checkStrictly: false,
            roleId: null,
            dataScope: {},
            defaultKeys: [],
            rules: {
                code: { required: true, message: '此项为必填项' },
                name: { required: true, message: '此项为必填项' }
            },
            defaultProps: {
                children: 'children',
                disabled({ name }) {
                    return name === 'index'
                },
                label({ title }) {
                    return title
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
        async handle(id) {
            if (id) {
                const res = await getRole(id)
                if (!res) return
                this.model = res.content
            }
            this.roleVisible = true
        },
        // 获取所有name为index的节点
        getDefaultCheckedKeys() {
            let list = []
            const getChecked = data => {
                data.forEach(curr => {
                    curr.children && curr.children.length && getChecked(curr.children)
                    curr.name === 'index' && list.push(curr.id)
                })
            }
            getChecked(this.menuList)
            return list
        },
        async setupMenu(id) {
            this.roleId = id
            this.authVisible = true
            this.treeLoading = true
            const res = await getRoleResource(id)
            this.treeLoading = false
            if (!res) return
            const checkedKeys = res.content
                .reduce((prev, curr) => {
                    prev.push(curr.resourceId)
                    this.$set(this.dataScope, curr.resourceId, curr.dataScope)
                    return prev
                }, [])
                .concat(this.getDefaultCheckedKeys())
            this.checkStrictly = true
            this.$nextTick(() => {
                this.$refs.menuTree.forEach(menu => {
                    menu.setCheckedKeys(checkedKeys)
                })
                // this.defaultKeys = checkedKeys 暂时先不展开吧
                this.checkStrictly = false
            })
        },
        async getAllMenu() {
            const res = await getResourceTree()
            if (!res) return
            this.menuList = res.content
        },
        async setupMenuSubmit() {
            const menuList = this.$refs.menuTree.reduce((prev, menu) => {
                const list = menu
                    .getCheckedNodes()
                    .concat(menu.getHalfCheckedNodes())
                    .map(v => ({
                        resourceId: v.id,
                        dataScope: this.dataScope[v.id] || 'ALL'
                    }))
                prev = prev.concat(list)
                // 如果选中了任何一条数据，则把该系统的id也提交
                if (list.length) {
                    prev.push({
                        resourceId: menu.$el.dataset.parentId,
                        dataScope: 'ALL'
                    })
                }
                return prev
            }, [])
            this.setupMenuLoading = true
            const res = await handleRoleResource(this.roleId, menuList)
            this.setupMenuLoading = false
            if (!res) return
            this.authVisible = false
        },
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
            const id = this.model.id
            this.roleSubmitLoading = true
            const res = await (id ? updateRole(id, this.model) : createRole(this.model))
            this.roleSubmitLoading = false
            if (!res) return
            this.$refs.mTable.refresh()
            this.roleVisible = false
        },
        authClosed() {
            this.dataScope = {}
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
            .el-tag {
                margin-right: 10px;
            }
            .hidden {
                color: lightgray;
            }
        }
    }
}
</style>
