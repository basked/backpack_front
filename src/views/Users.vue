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
      {text: 'ID', value: 'id'},
      {text: 'Name', value: 'name'},
      {text: 'Email', value: 'email'},
      {text: 'Create', value: 'created_at'},
      {text: 'Update', value: 'updated_at'},
    ]
  }),
  created: function () {
    const token = localStorage.getItem('access_token');
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    this.axios.get('http://localhost/api/v1/users', config).then(
        response => {
          this.users = response.data.data
        }
    )
  }
}
</script>