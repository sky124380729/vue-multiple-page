<template>
    <el-select v-on="$listeners" v-bind="$attrs" :loading="loading" :value="value" @change="valChange">
        <el-option v-for="(i, d) in selectList" :key="i.value + d" :label="i.label" :value="i.value"></el-option>
    </el-select>
</template>

<script>
export default {
    name: 'mSelect',
    inheritAttrs: false,
    props: {
        mValue: [String, Number],
        options: {
            type: Array,
            default: () => []
        },
        lookup: String,
        initData: Function
    },
    model: {
        prop: 'mValue',
        event: 'mChange'
    },
    data() {
        return {
            value: this.mValue,
            loading: false,
            selectList: this.options
        }
    },
    watch: {
        mValue(val) {
            this.value = val
        },
        options(arr) {
            this.selectList = arr
        }
    },
    methods: {
        valChange(val) {
            this.$emit('mChange', val)
        }
    },
    async created() {
        // 对于数据字典的处理
        if (this.lookup) {
            const lookup = this.$store.getters.dict(this.lookup)
            for (const [k, v] of Object.entries(lookup)) {
                this.selectList.push({
                    label: v,
                    value: k
                })
            }
            return
        }
        // 初始化执行函数
        if (typeof this.initData === 'function') {
            this.loading = true
            this.selectList = await this.initData()
            this.loading = false
            return
        }
    }
}
</script>
