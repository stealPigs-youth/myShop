import Vue from 'vue'
import App from './App.vue'
import router from './router'
import TypeNav from '@/components/TypeNav'
import Pager from './components/Pager'
import store from './store'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import './utils/fontIcon.js'
import './utils/elementUI'
import * as API from '@/api'


Vue.component('TypeNav',TypeNav)
Vue.component('Pager',Pager)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  beforeMount(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  }
}).$mount('#app')
