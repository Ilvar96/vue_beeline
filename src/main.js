import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);
import VueSlideToggle from 'vue-slide-toggle'
Vue.use(VueSlideToggle);
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);
import vueResource from 'vue-resource'
Vue.use(vueResource);
import VueRouter from 'vue-router'
Vue.use(VueRouter);
import router from './routes'
import store from './store'
import vueScrollto from 'vue-scrollto'
Vue.use(vueScrollto);
import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask);
import VueGlobalVar from 'vue-global-var'
Vue.use(VueGlobalVar, {
  globals: {
    $api:'api_link',
  },
});
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')




import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
