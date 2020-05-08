import Vue from 'vue'
import VueRouter from 'vue-router'
// @ts-ignore
import Join from '../views/Join.vue'
import store from '../store'
import AuthService from '../AuthService'
import DashboardRoutes from "./DashboardRoutes"


Vue.use(VueRouter)

const routes = [
  DashboardRoutes,
  {
    path: '/',
    name: 'join',
    component: Join
  },

  {
    path: '/login',
    name: 'login',
    component: function () {
      // @ts-ignore
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: "*",
    redirect: '/',
  }
]

const router = new VueRouter({
  routes
})

export default router
