import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/store.js"
import Home from "../views/Home"
import Middlewares from "../middlewares/";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '',
        component: () => import('../layouts/main/Main.vue'),
        children: [
            {
                path: '/',
                redirect: '/login',
                meta: {
                    authRequired: 'true',
                    middleware: [Middlewares.guest],
                }
            },
            {
                path: '/dashboard',
                name: 'dashboard',
                component: () => import('../views/Dashboard'),
                meta: {
                    middleware: [Middlewares.auth]
                }
            },
            {
                path: '/users',
                name: 'users',
                component: () => import('../views/Users.vue'),
                meta: {
                    middleware: [Middlewares.auth]
                }
            },
            {
                path: '/about',
                name: 'about',
                component: () => import('../views/About'),
                meta: {
                    middleware: [Middlewares.auth, Middlewares.checkPermissions],
                    permissions: ['View Developer Dashboard']
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
                    rule: 'editor',
                    middleware: [Middlewares.guest]
                }
            },
            {
                path: '/error',
                name: 'error',
                component: () => import('@/views/Error.vue'),

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

function nextCheck(context, middleware, index) {
    const nextMiddleware = middleware[index];
    if (!nextMiddleware) return context.next;

    return (...parameters) => {
        context.next(...parameters);
        const nextMidd = nextCheck(context, middleware, index + 1);
        nextMiddleware({...context, next: nextMidd});
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
        const ctx = {
            from,
            next,
            router,
            to
        };
        const nextMiddleware = nextCheck(ctx, middleware, 1);
        return middleware[0]({...ctx, next: nextMiddleware});
    }
    console.log('router.beforeEach')
    return next();
    /* OLD Version
     console.log('beforeEach');
         if (to.name === 'login' && store.state.auth.isUserLoggedIn()) {
             router.push({name: 'users'})
         } else if (to.meta.authRequired) {
             if (!store.state.auth.isUserLoggedIn()) {
                 router.push({name: 'login', query: {to: to.name}})

             }
         }
         return next()
     } */
});

export default router
