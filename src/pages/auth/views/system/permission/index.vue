<template>
    <section>
        <el-alert type="success" title="权限配置" description="在路由的meta对象中配置btnList,使用时请使用v-permission"></el-alert>
        <el-button type="primary" @click="visible = true" size="mini" class="mt20">点我</el-button>
        <el-dialog title="权限配置" :visible.sync="visible">
            <el-tree show-checkbox node-key="name" :data="permissionList" :props="defaultProps" ref="tree">
                <div class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <el-checkbox-group v-if="showBtnList(node, data)" v-model="permission[data.name]" @hook:destroyed="clearPermission(data.name)">
                        <el-checkbox v-for="btn in getBtnList(data)" :label="btn.value" :key="btn.value">{{ btn.label }}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </el-tree>
            <template #footer>
                <el-button type="primary" size="mini" @click="submit">提交</el-button>
                <el-button size="mini" @click="visible = false">取消</el-button>
            </template>
        </el-dialog>
    </section>
</template>

<script>
import { Encrypt, Decrypt } from '@/utils/secret'
export default {
    name: 'system-permission',
    data() {
        return {
            visible: false,
            permission: {},
            defaultProps: {
                children: 'children',
                label(data) {
                    return data.meta && data.meta.title
                }
            }
        }
    },
    computed: {
        permissionList() {
            const generateBtnList = menuList => {
                menuList.forEach(menu => {
                    if (menu.children && menu.children.length) {
                        generateBtnList(menu.children)
                    } else {
                        if (menu.meta && menu.meta.btnList) {
                            this.$set(this.permission, menu.name, [])
                        }
                    }
                })
                return menuList
            }
            return generateBtnList(this.$store.getters.menuList)
        }
    },
    methods: {
        clearPermission(name) {
            this.permission[name] = []
        },
        showBtnList(node, data) {
            return node.checked && data.meta && data.meta.btnList
        },
        getBtnList(data) {
            let list = []
            for (const [k, v] of Object.entries(data.meta.btnList)) {
                list.push({
                    label: v,
                    value: k
                })
            }
            return list
        },
        submit() {
            const arr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
            // 提交前记得加密
            const encrypt = arr.map(name => Encrypt(name))

            const decrypt = encrypt.map(name => Decrypt(name))

            this.$message.warning(`加密后:${encrypt}`)
            setTimeout(() => {
                this.$message.success(`解密后:${decrypt}`)
            }, 1000)
        }
    }
}
</script>

<style lang="scss" scoped>
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
        }
    }
}
</style>
