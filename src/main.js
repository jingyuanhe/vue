import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Loading from './components/loading'
import {get, post} from './utils/axios'
import './assets/css/reset.css'
import './assets/css/common.css'
import utils from './utils/utils'
import './utils/flex'
import './utils/FastClick'
import VueScroller from "vue-scroller"
Vue.use(VueScroller);
Vue.use(utils)
Vue.prototype.$loading = Loading;
Vue.prototype.$http = {get,post};
Vue.config.productionTip = false
export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
