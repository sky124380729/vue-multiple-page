<template>
    <keep-alive include="index">
        <component :is="comp" :id="id" :view="view"></component>
    </keep-alive>
</template>
<script>
import { compBus } from '@/mixins'
import Index from './test-list'
import Opt from './test-opt'
export default {
    name: 'test-multiple',
    mixins: [compBus],
    components: {
        Index,
        Opt
    }
}
</script>
