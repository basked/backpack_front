<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-alert
            v-model="alert"
            dismissible
            color="cyan"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-twitter"
        >
          User <strong>{{ name }}</strong> is autentificate!.
        </v-alert>

        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation=12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Sign in to -=basked=-</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mlt-4">Ensure your email for registration</h4>
                        <v-form ref="form_sign_in"
                                v-model="valid"
                                lazy-validation>
                          <v-text-field   label="Email" name="email_login" prepend-icon="email" type="text"
                                        color="teal accent-3" required v-model="email_login" :rules="email_loginRules"/>
                          <v-text-field   label="Password" name="password_login" prepend-icon="lock" type="password"
                                        color="teal accent-3" v-model="password_login"/>
                        </v-form>
                        <h3 class="text-center mt-3">Forget your password ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3 mb-3">
                        <v-btn :disabled="!valid" rounded color="teal accent-3" dark @click="loginJWT">SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friends !</h1>
                        <h5 class="text-center">Enter your personnel details and start journal with us</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined="" dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome back!</h1>
                        <h5 class="text-center">To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">SIGN IN</v-btn>
                      </div>
                    </v-col>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 teal--text text--accent-3">Create Account</h1>
                        <div class="text-center mt-4">
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-facebook-f</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-google-plus-g</v-icon>
                          </v-btn>
                          <v-btn class="mx-2" fab color="black" outlined>
                            <v-icon>fab fa-linkedin-in</v-icon>
                          </v-btn>
                        </div>
                        <h4 class="text-center mt-4">Ensure your mail for registration</h4>
                        <v-form>
                          <v-text-field label="Name" name="name" prepend-icon="person" type="text"
                                        color="teal accent-3" v-model="name"/>
                          <v-text-field label="Email" name="email" prepend-icon="email" type="email"
                                        color="teal accent-3" v-model="email"/>
                          <v-text-field label="Password" name="password" prepend-icon="lock" type="password"
                                        color="teal accent-3" v-model="password"/>
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-3 mb-3">
                        <v-btn rounded color="teal accent-3" dark @click="regiserJWT">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Login',
  props: {
    source: String
  },
  data: () => ({
    alert: false,
    baseUrl: 'http://localhost/api/v1',
    valid: true,
    name: '',
    email: '',
    password: '',
    email_login: 'bas@bas.ru',
    password_login: 'lastmove',
    email_loginRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],

    step: 1
  }),
  methods: {
    checkLogin() {

      // If user is already logged in notify
      if (this.$store.state.AccessToken) {
        this.alert = true
        return false
      }
      return true
    },
    loginJWT() {

      const payload = {
        userDetails: {
          email: this.email_login,
          password: this.password_login,
        }
      }

      this.$store.dispatch('auth/loginJWT', payload)
          .then(() => {
            // this.$refs.form_sign_in.validate()
            this.$store.dispatch('auth/me') ;
          })
          .catch(error => {
            console.log("There was an error logging in")
            if (error.response) {
            } else {
            }
          })

    },

    regiserJWT() {
    // if (!this.checkLogin()) {
      //   this.$router.push('/error');
      //   return
      // }

      const payload = {
        userDetails: {
          name: this.name,
          email: this.email,
          password: this.password,
        }
      }
      this.$store.dispatch('auth/registerJWT', payload)
          .then(() => {
            this.$refs.form_sign_in.validate()
            console.log('dispatch_RegisterJWT')
            this.$router.push('/users');
          })
          .catch(error => {
            console.log("There was an error logging in")
            if (error.response) {
            } else {
            }
          })
    },
  }
}
</script>
