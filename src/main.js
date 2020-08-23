import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pagination from './components/pagination.vue'
// import darkPagination from './components/dark-pagination.vue'
import table from './components/table.vue'
import '../css/style.css'

Vue.config.productionTip = false

Vue.component('m-pagination', pagination)
// Vue.component('m-darkPagination', darkPagination)
Vue.component('m-table', table)
Vue.component('m-th', table)
Vue.component('m-tr', table)
Vue.component('m-td', table)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
