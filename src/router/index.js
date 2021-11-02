import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth'
import App from '../App'
import Users from '../views/Users'
import About from '../views/About'
import Dashboard from '../views/Dashboard'

Vue.use(VueRouter)

const routes = [

    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth
    },
    {
        path: '/users',
        name: 'Users',
        component: Users
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
