<template>
  <v-app>

      <Drawer :drawer="drawer"/>
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer =!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>basked.pro</v-toolbar-title>
      </v-app-bar>

   <!-- Sizes your content based upon application components -->
    <v-main>

      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <Footer/>
  </v-app>
</template>

<script>

import Footer from '../components/Footer'
import Drawer from '../components/Drawer'
import About from '../../views/About'


export default {
  components: {About,  Drawer, Footer},

  name: "Dashboard",
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    items: [
      {title: 'Users', icon: 'mdi-speedometer', route: '/users'},
      {title: 'About', icon: 'mdi-help-box', route: '/about'},
    ]
  }),
  created: () => {
    // console.log(this.$store.getters.isVisible)
    // if (this.$store.getters.isVisible) {
    //
    //   this.$router.push('/auth')
    // }
  },
  computed: {

  },
}
</script>

<style scoped>

</style>