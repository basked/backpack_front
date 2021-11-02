<template>
  <v-navigation-drawer app v-model="drawer">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="text-h6">

          <Avatar/>

        </v-list-item-title>
        <v-list-item-subtitle>
          <div>basked</div>
          <!--          <v-row align="center" justify="center">basked</v-row>-->
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list
        dense
        nav
    >
      <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.route">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>

<script>
import Avatar from '../components/Avatar'


export default {
  name: "Drawer",
  components: {
    Avatar
  },
  props: {

    drawer: false,
    group: null,
  },
  data() {
    return {
      items: [
        {title: 'Users', icon: 'mdi-speedometer', route: '/users'},
        {title: 'About', icon: 'mdi-help-box', route: '/about'},
      ]
    }
  },

}
</script>

<style scoped>

</style>