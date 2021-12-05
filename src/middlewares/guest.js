export default function guest({next, router}) {
    if (localStorage.getItem('accessToken')) {
        return router.push({name: 'dashboard'});
    }
    return next();
}