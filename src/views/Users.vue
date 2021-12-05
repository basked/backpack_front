<template>
  <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page="15"
      class="elevation-1"
  ></v-data-table>
</template>


<script>
export default {
  name: "Users",
  data: () => ({
    users: [],
    headers: [
      {text: 'Name', value: 'name'},
      {text: 'Email', value: 'email'},
      {text: 'Create', value: 'created_at'},
    ]
  }),
  computed:{
    // getUsers(){
    //   return this.$store.dispatch('auth/usersJWT').data
    // }
  },
  created() {
    this.$store.dispatch('auth/usersJWT').then((res) => {
      this.users = res.data.data
    })
  }
}


</script>