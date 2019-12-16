<template>
    <el-date-picker v-model="mValue" v-on="$listeners" v-bind="$attrs" type="date" placeholder="选择日期"></el-date-picker>
</template>

<script>
export default {
    name: 'mDatePicker',
    inheritAttrs: false,
    props: {
        value: {
            required: false
        }
    },
    watch: {
        value(val) {
            this.mValue = val
        }
    },
    data() {
        return {
            mValue: this.value
        }
    }
}
</script>

<style></style>
