<template>
    <div class="sidebar-item">
        <!-- 有子菜单 -->
        <el-submenu @click="goPath(data)" :index="resolveIndex(data)" v-if="data.children && data.children.length">
            <template slot="title">
                <i :class="(data.meta && data.meta.icon) || 'el-icon-success'" class="icon"></i>
                <span slot="title">{{ data.meta && data.meta.title }}</span>
            </template>
            <sidebar-item v-for="child in data.children" :key="child.name" :data="child" :base-path="data.path" />
        </el-submenu>
        <!-- 没有子菜单 -->
        <el-menu-item @click="goPath(data)" :index="resolveIndex(data)" v-else>
            <i v-if="data.meta && data.meta.icon" :class="data.meta.icon" class="icon"></i>
            <span v-else class="subIcon">○</span>
            <span slot="title">{{ data.meta && data.meta.title }}</span>
        </el-menu-item>
    </div>
</template>

<script>
export default {
    name: 'sidebarItem',
    props: {
        data: Object,
        basePath: {
            type: String,
            default: ''
        }
    },
    methods: {
        goPath({ name }) {
            this.$router.push({ name })
        },
        // resolvePath(path) {
        //     const base = this.basePath === '' ? this.basePath : this.basePath + '/'
        //     return base + path
        // }
        // resolveIndex({ redirect, name }) {
        //     return redirect ? name + '-' + redirect.split('/').pop() : name
        // }
        resolveIndex(data) {
            /* if (data.meta.type === 'BUTTON') {
                const str = data.name
                return str.slice(0, str.lastIndexOf('-'))
            }
            return data.name */
            // if(data.redirect) {

            // }
            return data.name
        }
    }
}
</script>

<style lang="scss">
.icon {
    width: 16px;
    margin-right: 5px;
    text-align: center;
    font-size: 16px;
}
.subIcon {
    position: relative;
    top: -2px;
    font-size: 20px;
    margin-right: 6px;
}
</style>
