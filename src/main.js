import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios/index'
import App from './App.vue'
import store from './store/store'
import ENDPOINT from './store/config'

import '@/assets/styles/main.sass'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = ENDPOINT

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
