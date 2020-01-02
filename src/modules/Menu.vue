<template>
    <keep-alive :include="cachedViews">
        <router-view :key="$route.path"></router-view>
    </keep-alive>
</template>

<script>
export default {
    computed: {
        cachedViews() {
            // 开发环境把标签缓存去掉
            // return process.env.NODE_ENV !== 'production' ? [] : this.$store.getters.cachedViews
            return this.$store.getters.cachedViews
        }
    }
}
</script>

<style></style>
