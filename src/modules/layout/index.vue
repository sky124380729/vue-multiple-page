<template>
    <div class="layout" :class="{ collapse }">
        <Sidebar />
        <div class="layout__box">
            <Navbar />
            <NavTags />
            <AppMain />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import NavTags from './NavTags'
import AppMain from './AppMain'
export default {
    name: 'layout',
    computed: {
        ...mapState(['collapse'])
    },
    created() {
        let { base = null } = this.$router.options
        base = base.replace(/\//g, '')

        import(`./theme-${base}.scss`)
            .then(res => {
                this.$message.success('layout主题应用成功')
            })
            .catch(() => {
                this.$message.error('当前layout未设置主题')
            })
    },
    components: {
        Sidebar,
        Navbar,
        NavTags,
        AppMain
    }
}
</script>

<style lang="scss" src="./layout.scss"></style>
