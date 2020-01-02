<template>
    <div class="layout__side">
        <img class="logo" src="~imgs/logo.png" alt="" />
        <el-scrollbar wrapClass="wrapper-y">
            <el-menu :collapse="collapse" background-color="#162338" text-color="#fff" active-text-color="#01C0C8" unique-opened :default-active="activePath">
                <sidebar-item v-for="item in menuList" :key="item.name" :data="item"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters, mapState } from 'vuex'
export default {
    name: 'sidebar',
    computed: {
        ...mapGetters(['menuList', 'collapse']),
        activePath() {
            // 只要有隐藏项就取上一级的name
            const { meta, name } = this.$route
            return meta.hidden === 'TRUE' ? name.slice(0, name.lastIndexOf('-')) : name
        }
    },
    components: {
        SidebarItem
    }
}
</script>
