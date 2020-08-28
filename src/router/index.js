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
    component: () => import(/* webpackChunkName: "pagination" */ '../views/Pagination.vue')
  },
  {
    path: '/darkpagination',
    name: 'DarkPagination',
    component: () => import(/* webpackChunkName: "dark-pagination" */ '../views/DarkPagination.vue')
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import(/* webpackChunkName: "table" */ '../views/Table.vue')
  },
  {
    path: '/chart',
    name: 'Chart',
    component: () => import(/* webpackChunkName: "chart" */ '../views/Chart.vue')
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import(/* webpackChunkName: "button" */ '../views/Button.vue')
  },
  {
    path: '/grid',
    name: 'Grid',
    component: () => import(/* webpackChunkName: "grid" */ '../views/Grid.vue')
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: () => import(/* webpackChunkName: "avatar" */ '../views/Avatar.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
