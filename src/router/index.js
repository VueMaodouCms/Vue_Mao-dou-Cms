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
    path: '/table2',
    name: 'Table2',
    component: () => import(/* webpackChunkName: "table2" */ '../views/Table2.vue')
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
    path: '/container',
    name: 'Container',
    component: () => import(/* webpackChunkName: "container" */ '../views/Container.vue')
  },
  {
    path: '/row',
    name: 'Row',
    component: () => import(/* webpackChunkName: "row" */ '../views/Row.vue')
  },
  {
    path: '/col',
    name: 'Col',
    component: () => import(/* webpackChunkName: "col" */ '../views/Col.vue')
  },
  {
    path: '/avatar',
    name: 'Avatar',
    component: () => import(/* webpackChunkName: "avatar" */ '../views/Avatar.vue')
  },
  {
    path: '/card',
    name: 'Card',
    component: () => import(/* webpackChunkName: "card" */ '../views/Card.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
