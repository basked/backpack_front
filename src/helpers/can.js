import store from '../store/store';

export default (permissions) => {


    const userPermissions = store.getters['auth/userDetails'].permissions;
    let canEnter = false;

    if (!userPermissions || !permissions) {
        return canEnter;
    }

    if (!Array.isArray(permissions)) {
        // console.log(permissions,userPermissions)
        canEnter = userPermissions.includes(permissions)
    } else {
        permissions.forEach((permission) => {
            if (userPermissions.includes(permission)) {
                canEnter = true;
            }
        });
    }

    return canEnter
};