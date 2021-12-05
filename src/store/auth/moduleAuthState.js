export default {
    isUserLoggedIn: () => {
        let token = localStorage.getItem("accessToken")
        if (token) {
            if (token !== 'undefined'){
                return true;
            }
        }
        return false;
    },
    users:{},
    userDetails: { },
}
