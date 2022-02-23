import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carsoucel from '@/components/Carsoucel'
import Pagination from '@/components/Pagination'
import store from '@/store'
import '@/mock/mockServe.js'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import {MessageBox} from 'element-ui'
import '@/plugins/validate'
Vue.config.productionTip = false
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carsoucel.name,Carsoucel)
Vue.component(Pagination.name,Pagination)
new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
