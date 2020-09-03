import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import pagination from './components/pagination.vue'
import darkPagination from './components/darkPagination.vue'
import table from './components/table.vue'
import button from './components/button-ori.vue'
import chart from './components/chart.vue'
import avatar from './components/avatar.vue'
import container from './components/container.vue'
import col from './components/col.vue'
import row from './components/row.vue'
// import card from './components/card/card-ori.vue'
// import cardFluid from './components/card/card-fluid.vue'
// import cardText from './components/card/card-text.vue'
import card from './components/card.vue'
import '../css/style.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 根據 icon 的種類引用
import { faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight, faSort } from '@fortawesome/free-solid-svg-icons'
library.add(faAngleDoubleLeft, faAngleLeft, faAngleDoubleRight, faAngleRight, faSort)

Vue.config.productionTip = false

Vue.component('m-pagination', pagination)
Vue.component('m-darkPagination', darkPagination)
Vue.component('m-table', table)
Vue.component('m-button', button)
Vue.component('m-chart', chart)
Vue.component('m-avatar', avatar)
Vue.component('m-container', container)
Vue.component('m-row', row)
Vue.component('m-col', col)
Vue.component('m-card', card)
// Vue.component('m-cardFluis', cardFluid)
// Vue.component('m-cardText', cardText)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
