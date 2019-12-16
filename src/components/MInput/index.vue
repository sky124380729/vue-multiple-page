<template>
    <el-input
        v-on="$listeners"
        v-bind="$attrs"
        :value="value"
        :type="type"
        @input.native="$emit('input', $event.target.value)"
        ref="elInput"
        :maxlength="max_length"
        :placeholder="ph"
        :show-word-limit="type === 'textarea'"
        :autosize="{ minRows: 3, maxRows: 6 }"
    >
        <template #append>
            <slot name="append"></slot>
        </template>
        <template #prepend>
            <slot name="prepend"></slot>
        </template>
    </el-input>
</template>

<script>
export default {
    name: 'mInput',
    inheritAttrs: false,
    props: {
        value: [String, Number],
        type: {
            type: String,
            default: 'text'
        }
    },
    computed: {
        max_length() {
            return this.$attrs.maxlength || (this.type === 'textarea' ? 200 : 50)
        },
        ph() {
            return this.$attrs.placeholder || '请输入'
        }
    },
    mounted() {}
}
</script>
