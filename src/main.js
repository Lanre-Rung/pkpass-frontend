// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'core-js/stable';
import fileProcessor from './utils/globalMethods';
import html5Editor from './utils/html5Editor';
html5Editor.useHtml5Editor(Vue);
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(router)
export const eventBus = new Vue();
Vue.prototype.$processPass = function (file) {
  return fileProcessor.processPass(file, fileProcessor);
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})