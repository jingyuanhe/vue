import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import Loading from './components/loading'
import {get, post} from './utils/axios'
import '@/assets/css/reset.css';
import '@/assets/css/border.css';
import '@/assets/css/index.css';
import '@/assets/css/icon.styl';
import utils from './utils/utils'
import './utils/flex'
import './utils/FastClick'
import VueScroller from "vue-scroller"
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(VueScroller);
Vue.use(utils)
Vue.prototype.$loading = Loading;
Vue.prototype.$http = {get,post};
Vue.config.productionTip = false
export default new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
