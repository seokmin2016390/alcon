import "core-js/stable"
import "regenerator-runtime/runtime"
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'realgrid/dist/realgrid-style.css'
import RouterTab from 'vue-router-tab'
import 'vue-router-tab/dist/lib/vue-router-tab.css'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import VueTreeList from 'vue-tree-list'
Vue.use(VueTreeList)
Vue.component('multiselect', Multiselect)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(RouterTab)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
