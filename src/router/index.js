import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pagination',
    name: 'Pagination',
    component: () => import(/* webpackChunkName: "about" */ '../views/Pagination.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
