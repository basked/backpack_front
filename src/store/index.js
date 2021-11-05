import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('access_token')
    },
    mutations: {},
    actions: {},
    getters: {
        isVisible: state => {
            if (state.token) {
                return state.token !== "undefined";
            }

        }
    },

    modules: {}
})
