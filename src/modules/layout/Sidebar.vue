<template>
    <div class="layout__side">
        <img class="logo" src="~imgs/logo.png" @click="goHome" alt="" />
        <el-scrollbar wrapClass="wrapper-y">
            <el-menu :collapse="collapse" text-color="#fff" unique-opened :default-active="activePath">
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
    methods: {
        goHome() {
            location.href = '/home'
        }
    },
    components: {
        SidebarItem
    }
}
</script>
