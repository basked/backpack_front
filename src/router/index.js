import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js"

Vue.use(VueRouter)
const routes = [
    {
        path: '',
        component: () => import('../layouts/main/Main.vue'),
        children: [
            {
                path: '/',
                redirect: '/login',
            },
            {
                path: '/users',
                name: 'Users',
                component: () => import('../views/Users.vue'),
                meta: {
                    authRequired: 'true',
                }
            },
            {
                path: '/about',
                name: 'About',
                component: () => import('../views/About'),
                meta: {
                    authRequired: 'true',
                }
            },

        ],
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
        path: '',
        component: () => import('../layouts/full-page/FullPage.vue'),
        children: [
            // =============================================================================
            // PAGES
            // =============================================================================
            {
                path: '/login',
                name: 'login',
                component: () => import('@/views/pages/login/Login.vue'),
                meta: {
                    rule: 'editor'
                }
            },
        ]
    }
]


// {
//     path: '/main',
//     name: 'Main',
//     component: Dashboard
// },
// {
//     path: '/login',
//     name: 'Login',
//     component: function () {
//         return import(/* webpackChunkName: "about" */ '../views/Users.vue')
//     }
// },
// {
//     path: '/users',
//     name: 'Users',
//     component: function () {
//         return import(/* webpackChunkName: "about" */ '../views/Users.vue')
//     }
// },
// {
//     path: '/about',
//     name: 'About',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//
// }


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

    //logged in user trying to view log in page
    //  if (to.name === 'login' && store.state.auth.isUserLoggedIn()) {
    if (to.name === 'login' && store.getters.isVisible) {
        router.push({name: 'Users'})
    } else if (to.meta.authRequired) {
        if (!store.getters.isVisible) {
            router.push({name: 'login', query: {to: to.name}})

        }
        //     } else {
        //         if(!commons.hasAccess(to.name, to.params.id)){
        //             router.push({name: 'page-not-authorized'})
        //         }
        //     }
        // }
    }
        return next()
    }
);

export default router
