<template>
  <v-container
      fluid
      style="height: 100px"
  >
    <v-row justify="center">
      <v-menu
          bottom
          min-width="200px"
          rounded
          offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
              icon
              x-large
              v-on="on"
          >
            <v-avatar
                size="48"
            >
              <v-img
                  src="../../assets/logo.jpg"
                  max-height="250"
                  max-width="250"/>
              <!--                  alt="John"-->

              <!--              <span class="white&#45;&#45;text text-h5">{{ user.initials }}</span>-->
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                  height="200"
                  width="200"
              >
                <v-img
                    max-height="150"
                    max-width="150"
                    src="../../assets/logo.jpg"/>
                <!--                  alt="John"-->

                <!--                <span class="white&#45;&#45;text text-h5">{{ user.initials }}</span>-->
              </v-avatar>
              <h3>{{ user.fullName }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                  depressed
                  rounded
                  text
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn @click="logoutJWT"
                     depressed
                     rounded
                     text
              >
                Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Avatar",
  data: () => ({
    user: {
      initials: 'JD',
      fullName: 'John Doe',
      email: 'john.doe@doe.com',
      img: '../../assets/logo.jpg'
    },
  }),

  computed: {
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    }
    //TODO: fetch name here if available from role_data
  },
  methods: {

    logoutJWT() {
     // this.$store.commit('userManagement/RESET_ALL');
    //  this.$store.commit("RESET_USER_DETAILS", null, {root: true});

      localStorage.removeItem('accessToken');
      localStorage.removeItem('userInfo');
      this.$router.push('/login');

      this.$store.dispatch("auth/logoutJWT")
          // .catch(err => {
          //   this.$vs.notify({
          //     text: err.message,
          //     iconPack: 'feather',
          //     icon: 'icon-log-out',
          //     color: 'error'
          //   });
          // }
          // );
    },
  }
}
</script>

<style scoped>

</style>