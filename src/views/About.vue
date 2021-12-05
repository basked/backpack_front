<template>
  <div class="about">
    <h1>This is an about page</h1>
    <v-btn @click="me">baslet</v-btn>
    <h1 v-if="$can($constants.permissions.viewDeveloperDashboard)">constants.permissions.viewDeveloperDashboard</h1>
    <h1 v-if="$can($constants.permissions.viewAllRoles)">constants.permissions.viewAllRoles</h1>
    <v-img max-height="500" max-width="500" src="../assets/logo.jpg"/>
  </div>

</template>+
<script>

import can from '../helpers/can';
export default {
  name: "About",
  methods: {
    me() {

      const requiredPermissions =    ['View Developer Dashboard']
      this.$store.dispatch('auth/me')
          //.then((tt) => {
          // console.log(tt.data.data.permissions)
        //  const canEnter = can(requiredPermissions);
    //  });
  }}

}
</script>
