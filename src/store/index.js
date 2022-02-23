import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import register from './register'
import order from './order'
Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    shopcart,
    register,
    order
  }
})