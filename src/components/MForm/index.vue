<script>
export default {
    name: 'mForm',
    inheritAttrs: false,
    props: {
        // 一行显示几个
        number: {
            type: Number,
            default: 3
        },
        labelWidth: {
            type: String,
            default: '35%'
        }
    },
    render() {
        const itemList = (this.$scopedSlots.default && this.$scopedSlots.default()) || []
        const form = (
            <el-form
                {...{
                    props: this.$attrs,
                    on: this.$listeners
                }}
                label-position='right'
                label-width={this.labelWidth}
                ref='mForm'
                class={['m-form', { 'm-form--mini': this.number > 3 }]}
            >
                <el-row style={{ margin: '0 auto', width: this.number === 1 ? '50%' : this.number === 2 ? '75%' : '100%' }}>
                    {itemList.map(vnode => (
                        <el-col span={24 / this.number}>{vnode}</el-col>
                    ))}
                </el-row>
                <div class='center'>{this.$scopedSlots.buttons && this.$scopedSlots.buttons()}</div>
            </el-form>
        )
        return form
    },
    methods: {
        validate() {
            return new Promise(resolve => {
                this.$refs.mForm.validate(valid => {
                    if (valid) {
                        resolve(true)
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss">
/* .m-form {
    .el-input,
    .el-select,
    .el-date-editor,
    .el-textarea {
        width: 260px;
    }
}
.m-form--mini {
    .el-input,
    .el-select,
    .el-date-editor,
    .el-textarea {
        width: 220px;
    }
}

@media screen and (max-width: 1366px) {
    .m-form {
        .el-input,
        .el-select,
        .el-date-editor,
        .el-textarea {
            width: 200px;
        }
    }
    .m-form--mini {
        .el-input,
        .el-select,
        .el-date-editor,
        .el-textarea {
            width: 130px;
        }
    }
} */
</style>
