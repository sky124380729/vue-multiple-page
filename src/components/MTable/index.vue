<template>
    <div class="m-table" :class="{ hasSearch: queryArr.length }">
        <m-sticky :sticky-top="96" :z-index="2">
            <m-search :queryArr="queryArr" :title="title" @getConditions="getConditions">
                <slot name="buttons"></slot>
            </m-search>
        </m-sticky>
        <el-table v-bind="$attrs" v-on="$listeners" ref="elTable" :data="tableList" :stripe="stripe" @sort-change="sortChange" v-loading="loading">
            <slot></slot>
        </el-table>
        <div class="m-table__bottom">
            <div class="m-table__bottom-left">
                <slot name="bottom"></slot>
            </div>
            <div class="m-table__bottom-right">
                <el-pagination
                    v-if="page"
                    :total="total"
                    :current-page.sync="currentPage"
                    :page-size="pageSize"
                    @current-change="getList('current-change')"
                    @size-change="sizeChange"
                    layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { generateUUID } from '@/utils/tools'
export default {
    name: 'mTable',
    inheritAttrs: false,
    props: {
        // 接口地址
        api: {
            type: String
        },
        // 是否带有查询条件
        queryArr: {
            type: Array,
            default: () => []
        },
        // 标题
        title: {
            type: String,
            default: '未定义标题'
        },
        // 是否有斑马线
        stripe: {
            type: Boolean,
            default: true
        },
        // 是否有分页
        page: {
            type: Boolean,
            default: true
        },
        // 是否有刷新按钮
        renovate: {
            type: Boolean,
            default: true
        },
        // 默认的查询条件
        queryObj: {
            type: Object,
            default: () => ({})
        },
        // 排序规则
        sortRules: {
            type: [Array, String],
            default: 'createdAt,desc'
        }
    },
    data() {
        return {
            conditions: {}, // 查询条件
            total: 0, // 总条数
            totalPages: 0, // 总页数
            currentPage: 1, // 当前页码
            pageSize: 10, // 每页显示多少条
            tableList: [], // 列表数据
            loading: false, // 加载中
            getted: false, // 是否请求完了数据
            sortStr: this.sortRules // 排序信息
        }
    },
    watch: {
        api() {
            // 接口地址变更，从第一页重新开始查
            this.currentPage = 1
            this.getList('api')
        },
        totalPages(page) {
            // 修复最后一页只有一条的情况下删除该条导致不请求上一页数据的bug
            if (page !== 0 && this.currentPage === page + 1) {
                this.currentPage--
                this.getList('totalPages')
            }
        }
    },
    created() {
        !this.getted && this.getList('created')
        this.getted = true
    },
    activated() {
        !this.getted && this.getList('activated')
        this.getted = true
    },
    deactivated() {
        this.getted = false
    },
    methods: {
        async getList() {
            // 给定API的时候展示真实的数据
            if (this.api) {
                const res = await this.$http_post(this.api, {
                    data: {
                        ...this.conditions,
                        ...this.queryObj
                    },
                    params: {
                        page: this.currentPage - 1,
                        size: this.pageSize,
                        sort: this.sortStr
                    },
                    self: this,
                    loading: 'loading'
                })
                if (!res) return
                const {
                    content: { content, totalElements, totalPages }
                } = res
                this.tableList = content
                this.total = totalElements
                this.totalPages = totalPages
            } else {
                // 否则给一些测试数据做填充
                const testForm = {
                    id: generateUUID()
                }
                if (!this.$slots.default) return
                const data = this.$slots.default.filter(v => v.tag && v.tag.indexOf('ElTableColumn') !== -1).map(v => v.componentOptions.propsData)
                data.forEach(v => {
                    if (v.prop && v.label) {
                        if (v.label.includes('时间')) {
                            testForm[v.prop] = new Date().format('yyyy-MM-dd hh:mm:ss')
                        } else if (v.label.includes('日期')) {
                            testForm[v.prop] = new Date().format('yyyy-MM-dd')
                        } else {
                            testForm[v.prop] = '测试数据测试数据'
                        }
                    }
                })
                this.loading = true
                this.tableList = []
                console.log('%c创建测试数据...', 'color:yellowgreen')
                const NUM = Math.ceil(Math.random() * 10)
                setTimeout(() => {
                    let i = -1
                    while (++i < NUM) {
                        this.tableList.push(testForm)
                    }
                    this.total = NUM
                    this.totalPages = NUM / 10
                    this.loading = false
                }, 500)
            }
        },
        refresh() {
            this.getList('refresh')
        },
        getConditions(conditions) {
            this.conditions = conditions
            this.getList('getConditions')
        },
        sortChange({ prop, order }) {
            if (order === null) {
                this.sortStr = this.sortRules
            } else {
                this.sortStr = `${prop},${order === 'ascending' ? 'asc' : 'desc'}`
            }
            this.getList('sortChange')
        },
        sizeChange(pageSize) {
            this.pageSize = pageSize
            this.currentPage = 1
            this.getList('sizeChange')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~styles/mixins';
.m-table {
    position: relative;
    overflow: hidden;
    &__bottom {
        display: flex;
        height: 60px;
        justify-content: space-between;
        align-items: center;
    }
    .m-search {
        margin-bottom: 15px;
    }
    .el-table {
        margin-top: 15px;
    }
    .renovate {
        position: absolute;
        top: 75px;
        right: 18px;
        font-size: 20px;
        font-weight: bold;
        color: #b79ba8;
        transition: color 0.6s;
        cursor: pointer;
        &:hover {
            color: $-color--primary;
        }
    }
}
</style>
