<template>
    <section>
        <m-table title="角色管理菜单" :queryArr="queryArr" ref="mTable" v-loading="loading">
            <template #buttons>
                <el-button type="success" size="mini" @click="handle()">新增</el-button>
            </template>
            <el-table-column label="角色编码"></el-table-column>
            <el-table-column label="角色名称"></el-table-column>
            <el-table-column label="角色描述"></el-table-column>
            <el-table-column label="操作" class-name="operate">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="handle(row)">编辑</el-button>
                    <el-button type="text" @click="auth(row)">授权</el-button>
                    <el-button type="text" class="danger" @click="remove(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </m-table>

        <el-dialog title="角色管理" :visible.sync="roleVisible"> </el-dialog>
        <el-dialog title="角色授权" :visible.sync="authVisible"> </el-dialog>
        <el-button :loading="loading">测试</el-button>
    </section>
</template>

<script>
import { fetchRoleList } from '../../../apis/role'
export default {
    name: 'system-role',
    data() {
        return {
            loading: false,
            queryArr: [{ key: 'x', tag: 'el-input', ph: '请输入查询条件' }],
            roleVisible: false,
            authVisible: false,
            model: {}
        }
    },
    methods: {
        handle(row = {}) {
            this.model = { ...row }
            this.roleVisible = true
        },
        auth(row) {
            this.authVisible = true
            console.log(row)
        },
        remove(id) {
            console.log(id)
        }
    },
    mounted() {
        fetchRoleList({}, { vm: this, loading: 'loading' })
    }
}
</script>

<style lang="scss" scoped></style>
