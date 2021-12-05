<template>
  <v-card>
    <v-card-title>

      <!--      <v-spacer></v-spacer>-->
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="15"
        class="elevation-1"
        :search="search"
        :loading=isLoading
        loading-text="Loading... Please wait"
    ></v-data-table>
  </v-card>
</template>


<script>
export default {
  name: "Users",
  data: () => ({
    search: '',
    isLoading: false,
    users: [],
    headers: [
      {text: 'Name', value: 'name'},
      {text: 'Email', value: 'email'},
      {text: 'Create', value: 'created_at'},
    ]
  }),
  computed: {
    // getUsers(){
    //   return this.$store.dispatch('auth/usersJWT').data
    // }
  },
  created() {
    this.isLoading = true
    this.$store.dispatch('auth/usersJWT').then((res) => {
      setTimeout(() => {
        this.users = res.data.data
        this.isLoading = false
      }, 3000);

    })
  }
}


</script>