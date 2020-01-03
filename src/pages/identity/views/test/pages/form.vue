<template>
    <section>
        <el-input v-model="x"></el-input>
        <el-button @click="go">返回</el-button>
    </section>
</template>

<script>
export default {
    name: 'test-pages-edit',
    data() {
        return {
            x: null
        }
    },
    methods: {
        go() {
            this.$router.back()
        }
    }
}
</script>

<style></style>
