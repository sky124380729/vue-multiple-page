<template>
    <section>
        <m-input v-model="xxx"></m-input>
        <el-button type="primary" @click="go">go</el-button>
    </section>
</template>

<script>
export default {
    name: 'test-pages',
    data() {
        return {
            xxx: null
        }
    },
    methods: {
        go() {
            this.$router.push({ name: 'test-pages-edit', params: { id: 1 } })
        }
    }
}
</script>

<style></style>
