import Vue from 'vue'
import Router from 'vue-router'
import Setting from '../pages/Setting.vue'
import Login from '../pages/Login.vue'
import Index from '../pages/Index.vue'
import Pass from '../pages/Pass.vue'
import Merchant from '../pages/Merchant.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/create',
      name: 'Setting',
      component: Setting,
      meta: { mode: 'create' }
    },
    {
      path: '/edit',
      name: 'Setting',
      component: Setting,
      meta: { mode: 'edit' }
    },
    {
      path: '/temp',
      name: 'Setting',
      component: Setting,
      meta: { mode: 'temp' }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/index',
      name: Index,
      component: Index
    }, {
      path: '/merchant',
      name: Merchant,
      component: Merchant
    }
  ]
})