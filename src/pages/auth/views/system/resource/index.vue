<template>
    <section>
        <el-alert type="success" title="资源管理" description="取的是定义的路由元信息中menu为true的信息"></el-alert>
        <el-tree :data="menuList" :props="defaultProps" :render-content="renderContent"></el-tree>
    </section>
</template>

<script>
export default {
    name: 'system-resource',
    data() {
        return {
            defaultProps: {
                children: 'children',
                label(data) {
                    return data.meta && data.meta.title
                }
            }
        }
    },
    computed: {
        menuList() {
            function filterMenu(menu) {
                return menu.filter(item => {
                    if (item.children && item.children.length) {
                        return filterMenu(item.children)
                    }
                    if (item.meta && item.meta.btnList) {
                        let arr = []
                        for (const [k, v] of Object.entries(item.meta.btnList)) {
                            arr.push({ name: k, meta: { title: v }, isBtn: true })
                        }
                        item.children = arr
                    }
                    return item
                })
            }
            return filterMenu(this.$deepClone(this.$store.getters.menuList))
        }
    },
    methods: {
        renderContent(h, { node, data }) {
            return (
                <p class='custom-tree-node'>
                    <span class={{ isBtn: data.isBtn }}>{node.label}</span>
                    <span class='name'>{data.name}</span>
                </p>
            )
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/variables';
.el-tree {
    width: 600px;
    margin-top: 10px;
    ::v-deep {
        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
            .name {
                color: $-color--theme;
            }
            .isBtn {
                color: rgb(255, 208, 75);
            }
        }
    }
}
</style>
