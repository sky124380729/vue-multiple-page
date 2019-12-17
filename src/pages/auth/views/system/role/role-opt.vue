<template>
    <div>
        <p>Opt.vue</p>
        <el-button @click="back">返回</el-button>
        <el-input :disabled="view" v-model="test"></el-input>
        <el-button @click="get">获取</el-button>
    </div>
</template>

<script>
import { compOpt } from '@/mixins'
export default {
    mixins: [compOpt],
    data() {
        return {
            test: null
        }
    },
    methods: {
        back() {
            this.switchPage('Index')
        },
        get() {
            console.log(this.$route.params)
        }
    },
    created() {
        console.log(this.id)
    }
}
</script>
