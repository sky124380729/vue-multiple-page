<template>
    <section class="resource">
        <el-card :header="menu.title" v-for="menu in menuList" :key="menu.id">
            <el-tree :data="menu.children" :props="defaultProps">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <div class="main">
                        <el-tag v-if="node.data.type === 'MENU'" size="mini" type="primary">菜单</el-tag>
                        <el-tag v-else-if="node.data.type === 'BUTTON'" size="mini" type="success">按钮</el-tag>
                        <el-tag v-if="node.data.hidden === 'TRUE'" size="mini" type="warning">隐藏项</el-tag>
                        <span><i :class="data.icon"></i> {{ node.label }}</span>
                    </div>
                </div>
            </el-tree>
        </el-card>

        <p>
            <el-button type="primary" @click="go('create')">新增</el-button>
            <el-button type="primary" @click="go('edit')">编辑</el-button>
            <el-button type="primary" @click="go('view')">查看</el-button>
        </p>
    </section>
</template>

<script>
import { getResourceTree } from '@/pages/identity/apis/resource'
export default {
    name: 'system-resource',
    data() {
        return {
            menuList: [],
            defaultProps: {
                children: 'children',
                label(data) {
                    return data.title
                }
            }
        }
    },
    created() {
        this.getAllMenu()
    },
    methods: {
        go(type) {
            if (type === 'create') {
                this.$router.push({ name: this.$options.name + '-' + type })
            } else {
                this.$router.push({ name: this.$options.name + '-' + type, params: { id: 1 } })
            }
        },
        async getAllMenu() {
            const { content: res } = await getResourceTree()
            this.menuList = res
        }
    }
}
</script>

<style lang="scss" scoped>
.resource {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
}
.el-tree {
    margin-top: 10px;
    ::v-deep {
        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
            .el-tag {
                margin-right: 10px;
            }
            .hidden {
                color: lightgray;
            }
        }
    }
}
</style>
