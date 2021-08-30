import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "././assets/css/styles.scss";
import vuetify from './plugins/vuetify';
Vue.prototype.$role = {
  Admin: "admin",
  User: "user"
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
