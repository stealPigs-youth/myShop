import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import { reqCategoryList } from '@/api'
Vue.component('TypeNav',TypeNav)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
