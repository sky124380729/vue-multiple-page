<script>
export default {
    name: 'mSearch',
    props: {
        title: String,
        queryArr: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            conditions: {},
            icon: 'fa fa-ravelry'
        }
    },
    computed: {
        // 如果全部内容都不能清除的话则不显示清空按钮
        showClearBtn() {
            return !this.queryArr.every(v => v.clearable === false)
        }
    },
    async created() {
        if (!this.queryArr.length) return
        for (let v of this.queryArr) {
            // 执行init方法
            typeof v.init === 'function' && (await v.init())
            // 设置响应属性
            v.key && this.$set(this.conditions, v.key, v.value)
        }
    },
    render(createElement) {
        // 定义查询的node节点
        const searchArea = this.queryArr.length ? (
            <div class='m-search__search'>
                {this.queryArr.map(v => {
                    return createElement(
                        v.tag,
                        {
                            class: 'm-search__item',
                            style: {
                                width: (v.width || 200) + 'px'
                            },
                            attrs: {
                                placeholder: v.ph
                            },
                            props: {
                                value: this.conditions[v.key],
                                size: 'mini',
                                // 快捷选项
                                clearable: v.clearable !== false,
                                editable: v.editable || false,
                                // 组件自己的props选项
                                ...v.props
                            },
                            on: {
                                input: val => {
                                    this.conditions[v.key] = val
                                }
                            }
                        },
                        this.setChildren(v, createElement)
                    )
                })}
                <el-button class='m-search__btn' size='mini' type='primary' on-click={this.sendQuery}>
                    查询
                </el-button>
                {this.showClearBtn && (
                    <el-button class='m-search__btn' size='mini' type='danger' on-click={this.sendClear}>
                        清空
                    </el-button>
                )}
            </div>
        ) : null
        // 定义slot
        const slotArea = this.$scopedSlots.default ? <div class='m-search__slots'>{this.$scopedSlots.default()}</div> : null
        return (
            <div class={{ 'm-search': true, noTitle: !this.title }}>
                <div class='m-search__title'>
                    <i class='icon' class={this.icon} />
                    <span>{this.title}</span>
                </div>
                <div class='m-search__opt'>
                    {searchArea}
                    {slotArea}
                </div>
            </div>
        )
    },
    renderError(createElement, err) {
        return createElement('pre', { style: { color: 'pink' } }, err.stack)
    },
    methods: {
        sendQuery() {
            this.$emit('getConditions', this.conditions)
        },
        sendClear() {
            this.queryArr.forEach(v => {
                if (v.clearable !== false) {
                    this.conditions[v.key] = null
                }
            })
            this.$emit('getConditions', this.conditions)
        },
        setChildren(v, createElement) {
            if (!v.tag.includes('el-select')) return v.tag
            if (!v.options) return []
            return v.options.map(o =>
                createElement('el-option', {
                    props:
                        typeof o === 'object'
                            ? o
                            : {
                                  label: o,
                                  value: o
                              }
                })
            )
        }
    }
}
</script>

<style lang="scss" scoped>
.m-search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 8px;
    overflow: hidden;
    border-bottom: 2px solid #01c0c8;
    box-shadow: 0 0 5px 1px rgba(0, 21, 41, 0.08);
    &__title {
        color: #4a6076;
        font-weight: 600;
    }
    &__opt {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__item {
        margin-right: 10px;
    }
    &__slots {
        margin-left: 10px;
    }
}
.m-search.noTitle {
    box-shadow: none;
    border-bottom: none;
    .m-search__title {
        display: none;
    }
}
</style>
