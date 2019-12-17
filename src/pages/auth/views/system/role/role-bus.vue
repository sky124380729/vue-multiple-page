<template>
    <keep-alive include="index">
        <component :is="comp" :id="id" :view="view"></component>
    </keep-alive>
</template>
<script>
import { compBus } from '@/mixins'
import Index from './role-list'
import Opt from './role-opt'
export default {
    name: 'system-role',
    mixins: [compBus],
    components: {
        Index,
        Opt
    }
}
</script>
