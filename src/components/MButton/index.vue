<template>
    <el-button v-on="$listeners" v-bind="$attrs" :loading="myLoading" @click="myClick">
        <slot></slot>
    </el-button>
</template>

<script>
export default {
    name: 'mButton',
    inheritAttrs: false,
    props: {
        loading: Boolean,
        debounce: {
            type: [Boolean, Number]
        }
    },
    data() {
        return {
            timer: 0,
            myLoading: this.loading
        }
    },
    watch: {
        loading(flag) {
            this.myLoading = flag
        }
    },
    methods: {
        myClick() {
            if (!this.debounce) return
            this.myLoading = true
            clearTimeout(this.timer)
            this.timer = setTimeout(
                () => {
                    this.myLoading = false
                },
                typeof this.debounce === 'boolean' ? 500 : this.debounce
            )
        }
    }
}
</script>
