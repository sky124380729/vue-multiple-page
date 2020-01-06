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
        // 普通查询
        const normalSearch = this.queryArr.filter(v => !v.senior)
        // 高级查询
        const seniorSearch = this.queryArr.filter(v => v.senior)
        // 高级查询label宽度
        const seniorLabelWidth =
            seniorSearch.reduce((max, curr) => {
                const { label } = curr
                label.length > max && (max = label.length)
                return max
            }, 0) * 18
        // 高级查询的图标
        const seniorIcon = seniorSearch.some(v => !!this.conditions[v.key]) ? 'el-icon-s-help' : 'el-icon-help'
        // 定义查询的node节点
        const searchArea = (
            <div class='m-search'>
                {normalSearch.map(v =>
                    createElement(
                        v.tag,
                        {
                            class: 'm-search__item',
                            style: {
                                width: (v.width || 200) + 'px'
                            },
                            attrs: {
                                placeholder: (v.tag === 'el-input' ? '请输入' : '请选择') + v.label
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
                )}

                <el-button class='m-search__btn' size='mini' icon='el-icon-search' on-click={this.sendQuery}>
                    查询
                </el-button>

                {this.showClearBtn && (
                    <el-button class='m-search__btn danger' size='mini' icon='el-icon-delete' on-click={this.sendClear}>
                        重置
                    </el-button>
                )}

                {seniorSearch.length !== 0 && (
                    <el-popover class='m-search__senior' popper-class='senior-form'>
                        <el-form label-width={seniorLabelWidth + 'px'} label-position='right' size='mini'>
                            {seniorSearch.map(s =>
                                createElement(
                                    'el-form-item',
                                    {
                                        props: {
                                            label: s.label
                                        }
                                    },
                                    [
                                        createElement(s.tag, {
                                            attrs: {
                                                placeholder: (s.tag === 'el-input' ? '请输入' : '请选择') + s.label
                                            },
                                            props: {
                                                value: this.conditions[s.key],
                                                size: 'mini',
                                                // 快捷选项
                                                clearable: s.clearable !== false,
                                                editable: s.editable || false,
                                                // 组件自己的props选项
                                                ...s.props
                                            },
                                            on: {
                                                input: val => {
                                                    this.conditions[s.key] = val
                                                }
                                            }
                                        })
                                    ]
                                )
                            )}
                        </el-form>
                        <el-button size='mini' slot='reference' icon={seniorIcon}>
                            高级查询
                        </el-button>
                    </el-popover>
                )}
            </div>
        )
        return searchArea
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
            return v.options.map(o => createElement('el-option', { props: typeof o === 'object' ? o : { label: o, value: o } }))
        }
    }
}
</script>

<style lang="scss">
.m-search {
    display: flex;
    align-items: center;
    padding: 8px 0;
    overflow: hidden;
    box-shadow: 0 0 5px 1px rgba(0, 21, 41, 0.08);
    &__item {
        margin-right: 10px;
    }
    &__senior {
        margin: 0 10px;
    }
}
</style>
