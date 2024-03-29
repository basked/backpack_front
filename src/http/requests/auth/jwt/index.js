import axios from "../../../axios/index.js"
import _ from 'lodash';
import store from "../../../../store/store.js"


axios.defaults.headers.common = {
    // 'Authorization': `Bearer ${store.state.AccessToken}`,
    // 'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

export default {
    init() {
        axios.interceptors.response.use(function (response) {
            return response
        }, function (error) {
            const {response} = error;
            // const { config, response } = error
            // const originalRequest = config

            if (response && response.status === 401 || response.status === 403) {

                console.log("illegal API request " + response.status)
            }
            return Promise.reject(error)
        })
    },

    sanitizePayload(a) {
        return _(a).omitBy(_.isNil).omitBy(i => i === "").value()
    },

    login(email, pwd) {
        return axios.post("/api/v1/login", {email: email, password: pwd})
    },


    logout() {
        return axios.post("/api/v1/logout")
    },

    register(name, email, pwd) {
        return axios.post("/api/v1/register", {name: name, email: email, password: pwd})
    },
  //
    users() {
        const token = localStorage.getItem('accessToken');
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.get('/api/v1/users',config)
    },

    me() {
        const token = localStorage.getItem('accessToken');
        let config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        return axios.get('/api/v1/me', config)
    },

    //====> POST
/*
    createUser(payload) {
        return axios.post("/api/v1/register", this.sanitizePayload(payload))
    },

    createUserAddress(user_id, payload) {
        return axios.post(`/api/v1/addresses/${user_id}`, this.sanitizePayload(payload))
    },

    createRole(payload) {
        return axios.post("/api/v1/roles", this.sanitizePayload(payload))
    },

    createAdminProfile(user_id, payload) {
        return axios.post(`/api/v1/admins/${user_id}`, this.sanitizePayload(payload))
    },

    createStaffProfile(user_id, payload) {
        return axios.post(`/api/v1/staffs/${user_id}`, this.sanitizePayload(payload))
    },

    createParentProfile(user_id, payload) {
        return axios.post(`/api/v1/parents/${user_id}`, this.sanitizePayload(payload))
    },

    createStudentProfile(user_id, payload) {
        return axios.post(`/api/v1/students/${user_id}`, this.sanitizePayload(payload))
    },

    assignRoleToUser(user_id, role_id, password) {
        return axios.post(`/api/v1/roles/${role_id}/addUser/${user_id}`, {password})
    },

    unAssignRoleToUser(user_id, role_id, password) {
        return axios.post(`/api/v1/roles/${role_id}/removeUser/${user_id}`, {password})
    },

    //====> GET

    getSMSStats() {
        return axios.get(`api/v1/sms-stats`)
    },

    getLoggedInUserDetailsWithRoleAndPerm(role) {
        return axios.get(`api/v1/user?include=roles,${role}&append=all_permissions`)
    },

    getUser(userId) {
        return axios.get(`api/v1/users/${userId}?include=roles,admin,staff.linkedParent.user,parent.linkedStaff.user,student&append=all_permissions`)
    },

    getParent(userId) {
        return axios.get(`api/v1/parents/${userId}`)
    },

    getRole(id) {
        return axios.get(`/api/v1/roles/${id}?include=users,permissions`)
    },

    getAllRolesWithPerms(URL = "api/v1/roles?include=permissions&fields[permissions]=id,name", allRoles = []) {

        return axios.get(URL)
            .then((response) => {
                allRoles = allRoles.concat(response.data.data);
                if (response.data.next_page_url != null) {
                    return this.getAllRolesWithPerms(response.data.next_page_url, allRoles);
                } else {
                    return allRoles;
                }
            })
    },


    getAllPerms(URL = "/api/v1/permissions", allPerms = []) {
        return axios.get(URL)
            .then((response) => {
                allPerms = allPerms.concat(response.data.data);
                if (response.data.next_page_url != null) {
                    return this.getAllPerms(response.data.next_page_url, allPerms);
                } else {
                    return allPerms;
                }
            })
    },

    getParentSearch(searchTerm) {
        return axios.get(`/api/v1/parent-search?value=${searchTerm}`);
    },

    getStaffSearch(searchTerm) {
        return axios.get(`/api/v1/staff-search?value=${searchTerm}`);
    },


    getAdmins(page) {
        return axios.get(`/api/v1/admins?include=user.roles,user.updater,user.addresses&page=${page}`);
    },

    getParents(page) {
        return axios.get(`/api/v1/parents?include=wards,user.roles,user.updater,user.addresses,linkedStaff.user&page=${page}`);
    },

    getStaffs(page) {
        return axios.get(`/api/v1/staffs?include=user.roles,user.updater,user.addresses,linkedParent.user&page=${page}`);
    },

    getStudents(page) {
        return axios.get(`/api/v1/students?include=parent,user.roles,user.updater,user.addresses&page=${page}`);
    },

    getRoles(page) {
        return axios.get(`/api/v1/roles?include=users,permissions&page=${page}`);
    },

    getPermissions(page) {
        return axios.get(`/api/v1/permissions?include=roles,users&page=${page}`);
    },


    //====> PUT

    putUser(payload) {
        return axios.put(`api/v1/users/${payload.id}`, this.sanitizePayload(payload));
    },

    putAdmin(payload) {
        return axios.put(`api/v1/admins/${payload.user_id}`, this.sanitizePayload(payload));
    },

    putParent(payload) {
        return axios.put(`api/v1/parents/${payload.user_id}`, this.sanitizePayload(payload));
    },

    putStaff(payload) {
        return axios.put(`api/v1/staffs/${payload.user_id}`, this.sanitizePayload(payload));
    },

    putStudent(payload) {
        return axios.put(`api/v1/students/${payload.user_id}`, this.sanitizePayload(payload));
    },

    putRole(payload) {
        return axios.put(`/api/v1/roles/${payload.id}`, this.sanitizePayload(payload))
    },

    putAddress(payload) {
        return axios.put(`/api/v1/addresses/${payload.user_id}`, this.sanitizePayload(payload))
    },


    //====> Delete

    deleteRole(payload) {
        return axios.delete(`/api/v1/roles/${payload.id}`, {data: this.sanitizePayload(payload)})
    },
    */
}
