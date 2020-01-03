<template>
    <section>
        <div class="org">
            <div class="org__left">
                <m-sticky :sticky-top="96" :z-index="2">
                    <div class="operate">
                        <span class="title">组织信息</span>
                        <div class="buttonList">
                            <el-tooltip content="新增" placement="bottom">
                                <el-button type="primary" circle icon="el-icon-plus" size="mini" @click="handle('CREATE')"></el-button>
                            </el-tooltip>
                            <el-tooltip content="编辑" placement="bottom">
                                <el-button type="warning" :disabled="!treeCurrentRow.id" circle icon="el-icon-edit" size="mini" @click="handle('EDIT')"></el-button>
                            </el-tooltip>
                            <el-tooltip content="授权" placement="bottom">
                                <el-button type="success" :disabled="treeCurrentRow.type !== 'position'" circle icon="el-icon-key" size="mini" @click="auth"></el-button>
                            </el-tooltip>
                            <el-tooltip content="删除" placement="bottom">
                                <el-button type="danger" disabled circle icon="el-icon-delete" size="mini"></el-button>
                            </el-tooltip>
                        </div>
                    </div>
                </m-sticky>
                <el-tree
                    :data="orgTree"
                    icon-class="el-icon-s-promotion"
                    :expand-on-click-node="false"
                    default-expand-all
                    @current-change="currentChange"
                    highlight-current
                    :props="treeProps"
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <el-tag v-if="data.type === 'department'" type="primary" size="mini">部门</el-tag>
                        <el-tag v-else-if="data.type === 'position'" type="success" size="mini">职位</el-tag>
                        <span>{{ node.label }}</span>
                    </span>
                </el-tree>
            </div>
            <div class="org__right">
                <m-table title="用户信息" :fetch-data="fetchPrincipalList" ref="principalTable">
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column label="姓名" prop="name"></el-table-column>
                    <el-table-column label="登录名" prop="code"></el-table-column>
                    <el-table-column label="职务" prop="workType"></el-table-column>
                    <el-table-column label="手机号码" prop="mobile"></el-table-column>
                    <el-table-column label="邮箱" prop="email"></el-table-column>
                    <el-table-column label="状态"></el-table-column>
                </m-table>
            </div>
        </div>
        <m-dialog
            title="组织信息"
            :visible.sync="orgVisible"
            :rules="rules"
            label-width="90px"
            :model.sync="model"
            :number="1"
            @submit="orgSubmit"
            :submit-loading="orgSubmitLoading"
        >
            <el-form-item label="名称：" prop="name">
                <m-input v-model="model.name"></m-input>
            </el-form-item>
            <el-form-item label="编码：" prop="code">
                <m-input v-model="model.code"></m-input>
            </el-form-item>
            <el-form-item label="类型：" prop="type">
                <el-radio-group v-model="model.type">
                    <el-radio-button label="department">部门</el-radio-button>
                    <el-radio-button label="position">职位</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="model.type === 'position'" label="上级职位：" prop="parentPositionId">
                <m-select v-model="model.parentPositionId" :options="[]"></m-select>
            </el-form-item>
            <el-form-item label="排序：" prop="sort">
                <m-input type="number" v-model="model.sort"></m-input>
            </el-form-item>
            <el-form-item label="描述：" prop="note">
                <m-input type="textarea" v-model="model.note"></m-input>
            </el-form-item>
        </m-dialog>

        <el-dialog title="组织授权" :visible.sync="authVisible" width="720px" @closed="authClosed">
            <el-table :data="roleList" row-key="id" ref="roleTable" @selection-change="selectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="角色编码" prop="code"></el-table-column>
                <el-table-column label="角色名称" prop="name"></el-table-column>
                <el-table-column label="角色描述" prop="note"></el-table-column>
            </el-table>
            <template #footer>
                <el-button size="mini" @click="authVisible = false">返回</el-button>
                <el-button size="mini" type="primary" :loading="authSubmitLoading" @click="authSubmit">提交</el-button>
            </template>
        </el-dialog>
    </section>
</template>

<script>
import { getOrganizationTree, createOrganization, updateOrganization, getOrganization } from '@/pages/identity/apis/organization'
import { fetchRoleList } from '@/pages/identity/apis/role'
import { fetchPrincipalPage } from '@/pages/identity/apis/principal'
import { getOrganizationRole, handleOrganizationRole } from '@/pages/identity/apis/organizationRole'
export default {
    name: 'system-organization',
    data() {
        return {
            orgVisible: false,
            authVisible: false,
            orgSubmitLoading: false,
            authSubmitLoading: false,
            treeCurrentRow: {},
            treeCurrentId: null,
            editType: null,
            model: {},
            rules: {
                name: { required: true, message: '该项为必填项' },
                code: { required: true, message: '该项为必填项' },
                type: { required: true, message: '该项为必填项', trigger: 'change' },
                sort: { required: true, message: '该项为必填项' }
            },
            orgTree: [],
            roleList: [],
            checkList: [],
            treeProps: {
                label: 'name',
                children: 'children'
            }
        }
    },
    created() {
        this.getTreeData()
        this.getRoleList()
    },
    methods: {
        async getTreeData() {
            const res = await getOrganizationTree()
            if (!res) return
            this.orgTree = [res.content]
        },
        async getRoleList() {
            const res = await fetchRoleList()
            if (!res) return
            this.roleList = res.content
        },
        async handle(type) {
            this.editType = type
            if (type === 'EDIT') {
                const res = await getOrganization(this.treeCurrentId)
                if (!res) return
                this.model = res.content
            }
            this.orgVisible = true
        },
        authClosed() {
            this.$refs.roleTable.clearSelection()
        },
        currentChange(data) {
            this.treeCurrentRow = data
            this.treeCurrentId = data.id
            this.$refs.principalTable.refresh()
        },
        selectionChange(val) {
            this.checkList = val.map(v => v.id)
        },
        fetchPrincipalList(options) {
            return fetchPrincipalPage({
                ...options,
                organizationId: this.treeCurrentId
            })
        },
        async orgSubmit() {
            if (this.editType === 'CREATE') {
                this.orgSubmitLoading = true
                const res = await createOrganization({
                    ...this.model,
                    parentId: this.treeCurrentId
                })
                this.orgSubmitLoading = false
                if (!res) return
            } else {
                this.orgSubmitLoading = true
                const res = await updateOrganization(this.treeCurrentId, this.model)
                this.orgSubmitLoading = false
                if (!res) return
            }
            this.getTreeData()
            this.orgVisible = false
        },
        async auth() {
            this.authVisible = true
            const res = await getOrganizationRole(this.treeCurrentId)
            if (!res && !res.content) return
            const roleIdList = res.content.map(v => v.roleId)
            this.$nextTick(() => {
                this.roleList.forEach(item => {
                    if (roleIdList.indexOf(item.id) !== -1) {
                        this.$refs.roleTable.toggleRowSelection(item, true)
                    }
                })
            })
        },
        async authSubmit() {
            this.authSubmitLoading = true
            const res = await handleOrganizationRole(this.treeCurrentId, this.checkList)
            this.authSubmitLoading = false
            if (!res) return
            this.authVisible = false
        }
    }
}
</script>

<style lang="scss" scoped>
.org {
    display: flex;
    &__left {
        flex: 2;
        min-width: 400px;
        margin-right: 20px;
        box-shadow: 0 0 5px 1px rgba(0, 21, 41, 0.08);
        .operate {
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            align-items: center;
            border-bottom: 2px solid #01c0c8;
            padding: 4.5px 12px;
            .title {
                font-weight: 600;
                color: #4a6076;
            }
        }
        .el-tree {
            margin-top: 15px;
            padding: 0 10px 10px;
            .custom-tree-node {
                font-size: 14px;
                .el-tag {
                    margin-right: 10px;
                }
            }
        }
    }
    &__right {
        flex: 5;
    }
}
</style>
