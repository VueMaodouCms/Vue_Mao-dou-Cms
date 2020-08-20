import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pagenation from './components/pagenation.vue'

Vue.config.productionTip = false

Vue.component('m-pagination', pagenation)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
