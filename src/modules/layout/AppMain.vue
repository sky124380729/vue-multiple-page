<template>
    <el-scrollbar wrapClass="wrapper-y app-main">
        <section class="layout__content">
            <transition name="el-fade-in-linear" mode="out-in">
                <keep-alive :include="cachedViews">
                    <router-view :key="$route.path"></router-view>
                </keep-alive>
            </transition>
        </section>
    </el-scrollbar>
</template>

<script>
export default {
    name: 'app-main',
    computed: {
        cachedViews() {
            // 开发环境把标签缓存去掉
            // return process.env.NODE_ENV !== 'production' ? [] : this.$store.getters.cachedViews
            return this.$store.getters.cachedViews
        }
    }
}
</script>
