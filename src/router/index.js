import Vue from 'vue'
import Router from 'vue-router'
import GetStarted from '@/components/GetStarted'
import Dashboard from '@/components/Dashboard'
import api from '@/utils/api'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Root',
      component: Dashboard,
      beforeEnter: api.checkLoggedin
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: api.checkLoggedin
    },
    {
      path: '/login',
      name: 'GetStarted',
      component: GetStarted,
      beforeEnter: api.checkLoggedout
    }
  ]
})
