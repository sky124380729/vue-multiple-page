<template>
    <div class="layout__side">
        <img class="logo" src="~imgs/logo.png" alt="" />
        <el-scrollbar wrapClass="wrapper-y">
            <!--
                default-active="$route.path" 路径等于当前路由，可以让路由在跳转的时候对应高亮
                unique-opened 是否只保持一个菜单展开
             -->
            <el-menu :collapse="collapse" background-color="#162338" text-color="#fff" active-text-color="#01C0C8" router unique-opened :default-active="activePath">
                <sidebar-item v-for="item in menuList" :key="item.name" :data="item"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'
export default {
    name: 'sidebar',
    computed: {
        ...mapGetters(['menuList']),
        collapse() {
            return this.$store.state.collapse
        },
        activePath() {
            // 如果是以/index结尾的，则去掉
            return this.$route.path.replace(/(.*)\/index$/, '$1')
        }
    },
    components: {
        SidebarItem
    }
}
</script>
