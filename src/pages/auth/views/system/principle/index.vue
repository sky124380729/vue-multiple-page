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
            <el-table-column label="操作" class-name="operate">
                <template slot-scope="{ row }">
                    <el-button type="text" @click="handle(row.id)">编辑</el-button>
                    <el-button type="text" @click="setupOrganization(row)">选择组织</el-button>
                    <el-button type="text" class="danger" @click="remove(row.id)">删除</el-button>
                </template>
            </el-table-column>
        </m-table>

        <m-dialog :visible.sync="principleVisible" title="用户信息" :rules="rules" :model.sync="model" @submit="submit" :submit-loading="submitLoading">
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

        <el-dialog title="选择组织" :visible.sync="orgVisible"> </el-dialog>
    </section>
</template>

<script>
import { getPrincipal, createPrincipal, updatePrincipal, fetchPrincipalPage } from '@/pages/auth/apis/principal'
export default {
    name: 'system-principle',
    data() {
        return {
            queryArr: [{ key: 'name', tag: 'el-input', ph: '请输入姓名' }],
            principleVisible: false,
            orgVisible: false,
            submitLoading: false,
            model: {},
            rules: {}
        }
    },
    methods: {
        fetchData(options) {
            return fetchPrincipalPage(options)
        },
        async handle(id) {
            if (id) {
                const res = await getPrincipal(id)
                if (!res) return
                this.model = res.content
            }
            this.principleVisible = true
        },
        setupOrganization(row) {
            this.orgVisible = true
            console.log(row)
        },
        remove(id) {
            console.log(id)
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
            this.principleVisible = false
        }
    }
}
</script>

<style lang="scss" scoped></style>
