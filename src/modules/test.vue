<template>
    <section>
        <m-search title="sss" :queryArr="queryArr"></m-search>

        <el-popover>
            <el-form label-width="72px" label-position="right" size="mini">
                <el-form-item label="角色名称">
                    <el-input v-model="model.x"></el-input>
                </el-form-item>
                <el-form-item label="角色编码">
                    <el-input v-model="model.y"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="text" slot="reference" icon="el-icon-search">高级查询</el-button>
        </el-popover>
    </section>
</template>

<script>
export default {
    data() {
        return {
            model: {},
            queryArr: [
                { key: 'x', label: 'x', tag: 'el-input' },
                { key: 'y', label: '角色名称', tag: 'el-input', senior: true },
                { key: 'z', label: '角色编码', tag: 'el-input' }
            ]
        }
    }
}
</script>

<style></style>
