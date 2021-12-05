 
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import can from './helpers/can';

Vue.config.productionTip = false
//чтобы axios был доступен в каждом компоненте через this
Vue.prototype.axios = axios;
Vue.prototype.$can = can;


// old version
/*
new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
*/

Vue.prototype.$can = can;
let instance = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
});
axios.get('http://localhost/api/v1/constants').then((response) => {
  Vue.prototype.$constants = response.data;
  instance.$mount('#app');
});