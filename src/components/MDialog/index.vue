<template>
    <el-dialog custom-class="m-dialog" :title="title" :visible.sync="visible" :width="realWidth" :before-close="() => $emit('update:visible', false)" @close="close">
        <el-form ref="form" status-icon :model="model" :rules="rules" class="dialogForm" label-position="right" :label-width="realLabelWidth">
            <m-row :number="number">
                <slot></slot>
            </m-row>
        </el-form>
        <template #footer>
            <el-button size="mini" @click="$emit('update:visible', false)">返回</el-button>
            <el-button size="mini" v-if="$listeners.submit" type="primary" :loading="submitLoading" @click="submitForm">提交</el-button>
        </template>
    </el-dialog>
</template>

<script>
export default {
    name: 'MDialog',
    inheritAttrs: false,
    props: {
        title: String,
        visible: Boolean,
        submitLoading: Boolean,
        labelWidth: String,
        width: [String, Number],
        number: {
            type: Number,
            default: 2,
            validator(val) {
                return [1, 2, 3].indexOf(val) !== -1
            }
        },
        rules: {
            type: Object,
            default: () => ({})
        },
        model: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        realLabelWidth() {
            const map = new Map([[1, '110px'], [2, '110px'], [3, '110px']])
            return this.labelWidth || map.get(this.number)
        },
        realWidth() {
            const map = new Map([[1, '480px'], [2, '750px'], [3, '980px']])
            return this.width || map.get(this.number)
        }
    },
    methods: {
        close() {
            this.$refs.form.resetFields()
        },
        submitForm() {
            this.$refs.form.validate(valid => {
                if (!valid) return
                this.$emit('submit')
            })
        }
    }
}
</script>

<style lang="scss">
// mDialog样式修复
.m-dialog {
    .el-col {
        padding-right: 15px;
    }
    & > .el-dialog__footer {
        padding-right: 35px;
    }
}
</style>
