<template>
    <div class="layout__side">
        <img class="logo" src="~imgs/logo.png" alt="" />
        <el-scrollbar wrapClass="wrapper-y">
            <el-menu :collapse="collapse" :background-color="color_theme" text-color="#fff" active-text-color="#01C0C8" unique-opened :default-active="activePath">
                <sidebar-item v-for="item in menuList" :key="item.name" :data="item"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters, mapState } from 'vuex'
import { color_theme } from '@/styles/variables.scss'
export default {
    name: 'sidebar',
    data() {
        return {
            color_theme
        }
    },
    computed: {
        ...mapGetters(['menuList', 'collapse']),
        // eslint-disable-next-line vue/return-in-computed-property
        activePath() {
            // 只要有隐藏项就取上一级的name
            const { matched } = this.$route
            for (let i = matched.length - 1; i >= 0; i--) {
                const { name, meta } = matched[i]
                if (meta.hidden === 'TRUE') {
                    continue
                }
                return name
            }
        }
    },
    components: {
        SidebarItem
    }
}
</script>
