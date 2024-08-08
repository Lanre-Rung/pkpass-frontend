import Vue from 'vue'
import Router from 'vue-router'
import Setting from '../pages/Setting.vue'
import Login from '../pages/Login.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      // name: 'Setting',
      // component: Setting
    },
    {
      path: '/set',
      name: 'Setting',
      component: Setting
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})