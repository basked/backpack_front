
import axios from "../../http/axios/index.js"

export default {
    SET_BEARER(state, accessToken) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
    },
    SET_USERS(state, payload) {
        state.users = payload;
    },
    SET_USER_DETAIL(state, payload) {
        state.userDetails = payload;
    }
}