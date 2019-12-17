<template>
    <div class="layout" :class="{ collapse }">
        <Sidebar />
        <div class="layout__box">
            <Navbar />
            <NavTags />
            <AppMain />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import NavTags from './NavTags'
import AppMain from './AppMain'
export default {
    name: 'layout',
    computed: {
        ...mapState(['collapse'])
    },
    components: {
        Sidebar,
        Navbar,
        NavTags,
        AppMain
    }
}
</script>
