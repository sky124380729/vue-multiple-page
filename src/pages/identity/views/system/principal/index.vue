<template>
    <section>
        <m-table title="用户管理" :fetch-data="fetchData" :queryArr="queryArr" ref="mTable">
            <template #buttons>
                <el-button type="success" size="mini" @click="handle()">新增</el-button>
            </template>
            <el-table-column label="登录名" prop="code" sortable="custom"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="手机" prop="mobile"></el-table-column>
            <el-table-column label="邮箱" prop="email"></el-table-column>
            <el-table-column label="职业类型" prop="workType"></el-table-column>
            <el-table-column label="描述" prop="note"></el-table-column>
            <el-table-column label="操作" class-name="operate" align="center" width="180px">
                <template slot-scope="{ row }">
                    <el-button type="text" v-permission="'edit'" @click="handle(row.id)">编辑</el-button>
                    <el-button type="text" @click="setupOrganization(row.id)">选择组织</el-button>
                    <el-button type="text" class="danger" @click="remove(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </m-table>

        <m-dialog :visible.sync="principalVisible" title="用户信息" :rules="rules" :model.sync="model" @submit="submit" :submit-loading="submitLoading">
            <el-form-item label="登录名：" prop="code">
                <m-input v-model="model.code" :disabled="!!model.id"></m-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="name">
                <m-input v-model="model.name"></m-input>
            </el-form-item>
            <el-form-item label="手机：" prop="mobile">
                <m-input v-model="model.mobile"></m-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
                <m-input v-model="model.email"></m-input>
            </el-form-item>
            <el-form-item label="职业类型：" prop="workType">
                <m-input v-model="model.workType"></m-input>
            </el-form-item>
            <el-form-item label="描述：" prop="note">
                <m-input type="textarea" v-model="model.note"></m-input>
            </el-form-item>
        </m-dialog>

        <el-dialog title="职位信息" :visible.sync="orgVisible" width="720px" @closed="orgDialogClosed">
            <el-tree
                v-loading="treeLoading"
                :data="orgTree"
                :props="treeProps"
                ref="organizationTree"
                check-strictly
                show-checkbox
                @check="checkNode"
                @check-change="checkChange"
                :default-expanded-keys="defaultKeys"
                node-key="id"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <div class="main">
                        <el-tag v-if="data.type === 'department'" type="primary" size="mini">部门</el-tag>
                        <el-tag v-else-if="data.type === 'position'" type="success" size="mini">职位</el-tag>
                        <span>{{ node.label }}</span>
                    </div>
                    <el-radio v-if="data.type === 'position' && treeCheckList.indexOf(data.id) !== -1" v-model="mainPositionId" :label="data.id">主要职位</el-radio>
                </span>
            </el-tree>
            <div slot="footer">
                <el-button @click="orgVisible = false">返回</el-button>
                <el-button type="primary" @click="submitOrg" :loading="submitOrgLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getPrincipal, createPrincipal, updatePrincipal, fetchPrincipalPage } from '@/pages/identity/apis/principal'
import { getOrganizationTree } from '@/pages/identity/apis/organization'
import { handlePrincipalOrganization, getPrincipalOrganization } from '@/pages/identity/apis/principalOrganization'

export default {
    name: 'system-principal',
    data() {
        return {
            queryArr: [{ key: 'name', tag: 'el-input', label: '请输入姓名' }],
            principalVisible: false,
            orgVisible: false,
            submitLoading: false,
            submitOrgLoading: false,
            treeLoading: false,
            mainPositionId: null,
            model: {},
            principalId: null,
            orgTree: [],
            treeCheckList: [],
            defaultKeys: [],
            treeProps: {
                label: 'name',
                children: 'children',
                disabled: data => {
                    return data.type !== 'position'
                }
            },
            rules: {
                code: { required: true, message: '此项为必填项' },
                name: { required: true, message: '此项为必填项' }
            }
        }
    },
    created() {
        this.getTreeData()
    },
    methods: {
        fetchData(options) {
            return fetchPrincipalPage(options)
        },
        async getTreeData() {
            const res = await getOrganizationTree()
            if (!res) return
            this.orgTree = [res.content]
        },
        async handle(id) {
            if (id) {
                const res = await getPrincipal(id)
                if (!res) return
                this.model = res.content
            }
            this.principalVisible = true
        },
        async setupOrganization(id) {
            this.orgVisible = true
            this.principalId = id
            const res = await getPrincipalOrganization(id, { vm: this, loading: 'treeLoading' })
            if (!res) return
            const { content } = res
            const checkList = content.reduce((prev, curr) => {
                prev.push(curr.organizationId)
                curr.isMain === 'TRUE' && (this.mainPositionId = curr.organizationId)
                return prev
            }, [])
            this.$refs.organizationTree.setCheckedKeys(checkList)
            this.defaultKeys = checkList
            this.treeCheckList = checkList
        },
        remove() {
            this.$message.info('暂未开放')
        },
        checkNode(data, node) {
            this.treeCheckList = node.checkedNodes.map(item => item.id)
        },
        checkChange(data, flag) {
            // 没有选择主要岗位的时候选中一个岗位就设置为主要岗位
            flag && this.mainPositionId === null && (this.mainPositionId = data.id)
        },
        async submit() {
            const config = {
                vm: this,
                loading: 'submitLoading'
            }
            const id = this.model.id
            const res = await (id ? updatePrincipal(id, this.model, config) : createPrincipal(this.model, config))
            if (!res) return
            this.$refs.mTable.refresh()
            this.principalVisible = false
        },
        async submitOrg() {
            const checkList = this.$refs.organizationTree.getCheckedNodes()
            if (!checkList.length) return this.$message.warning('请选择职位')
            const principalOrganizationDTOList = checkList.map(item => ({
                organizationId: item.id,
                isMain: item.id === this.mainPositionId ? 'TRUE' : 'FALSE'
            }))
            const res = await handlePrincipalOrganization(this.principalId, principalOrganizationDTOList, {
                vm: this,
                loading: 'submitOrgLoading'
            })
            if (!res) return
            this.orgVisible = false
        },
        orgDialogClosed() {
            this.mainPositionId = null
            this.treeCheckList = []
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-tag {
        margin-right: 10px;
    }
}
</style>
