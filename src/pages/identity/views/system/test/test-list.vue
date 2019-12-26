<template>
    <div>
        <p>Index.vue</p>
        <el-input v-model="test"></el-input>
        <el-button @click="go">试试</el-button>
    </div>
</template>

<script>
import { compIndex } from '@/mixins'
export default {
    mixins: [compIndex],
    data() {
        return {
            test: null
        }
    },
    methods: {
        go() {
            this.switchPage('Opt', '1212')
        }
    }
}
</script>
