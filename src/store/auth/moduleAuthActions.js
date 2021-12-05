import jwt from "../../http/requests/auth/jwt/index.js"
import router from '@/router'

export default {
    // JWT
    registerJWT({commit}, payload) {
        return new Promise((resolve, reject) => {
            jwt.register(payload.userDetails.name, payload.userDetails.email, payload.userDetails.password)
                .then(response => {
                    if (response.status === 200) {
                        localStorage.setItem("accessToken", response.data.access_token);
                        commit('SET_ACCESS_TOKEN', response.data.access_token, {root: true});
                        commit("SET_BEARER", response.data.access_token);
                        resolve(response)
                    } else {
                        reject({message: "Wrong Register Name, Email or Password"})
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    loginJWT({commit}, payload) {
        return new Promise((resolve, reject) => {
            jwt.login(payload.userDetails.email, payload.userDetails.password)
                .then(response => {
                    if (response.status === 200) {
                        // Navigate User to homepage
                        // Set accessToken
                        localStorage.setItem("accessToken", response.data.access_token);
                        // Update user details
                        commit('SET_ACCESS_TOKEN', response.data.access_token, {root: true});
                        // Set bearer token in axios
                        commit("SET_BEARER", response.data.access_token);
                        router.push(router.currentRoute.query.to || '/users');
                        resolve(response)

                    } else {
                        reject({message: "Wrong Login Id or Password"})
                    }
                })
                .catch(error => {
                    console.log('baskkkkk')
                    reject(error)
                })
        })
    }
    ,
    logoutJWT() {
        return new Promise((resolve, reject) => {
            jwt.logout()
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    ,
    me(ctx) {
        return new Promise((resolve, reject) => {
            jwt.me().then((response) => {
                ctx.commit("SET_USER_DETAIL", response.data.data)
                resolve(response);
            })
                .catch((error) => {
                    reject(error);
                })
        })
    },
    usersJWT() {
        return new Promise((resolve, reject) => {
            jwt.users()
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}
