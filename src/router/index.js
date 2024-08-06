import Vue from 'vue'
import Router from 'vue-router'
import Setting from '../pages/Setting.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/set',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/set',
      name: 'Setting',
      component: Setting
    }
  ]
})