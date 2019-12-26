import Vue from 'vue'
import Vuex from 'vuex'
import commonStore from 'config/store'

Vue.use(Vuex)

const common = commonStore('identity')

export default new Vuex.Store({
    state: {
        ...common.state
    },
    getters: {
        ...common.getters
    },
    mutations: {
        ...common.mutations
    },
    actions: {
        ...common.actions
    }
})
