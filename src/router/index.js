import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
const base = process.env.VUE_APP_BASE_URL;
const IS_AUTHORIZATION = process.env.VUE_APP_IS_AUTHORIZATION;
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  base,
  scrollBehavior: () => ({ y: 0 })
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  // 是否忽略鉴权
  if (IS_AUTHORIZATION === 'false') {
    console.debug('来源被忽略，则取消鉴权...');
    return next(true);
  }
  const userInfo = sessionStorage.getItem('userInfo') || null;
  if (!userInfo && to.meta.auth) {
      next('/login')
  } else {
      next();
  }
})
export default router