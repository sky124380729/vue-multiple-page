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
                    <el-button type="text" @click="auth(row)">授权</el-button>
                    <el-button type="text" class="danger" @click="remove(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </m-table>

        <m-dialog title="角色管理" :model.sync="model" :visible.sync="roleVisible" @submit="submit" :submit-loading="roleSubmitLoading" :number="1">
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

        <el-dialog title="角色授权" :visible.sync="authVisible"> </el-dialog>
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
            model: {}
        }
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
        auth(row) {
            this.authVisible = true
            console.log(row)
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
        async submit() {
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

<style lang="scss" scoped></style>
