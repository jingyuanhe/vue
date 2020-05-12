import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页', keepAlive: false }
  }
]
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    const userInfo = sessionStorage.getItem('userInfo') || null;
    if (!userInfo && to.meta.auth) {
        next('/login')
    } else {
        next();
    }
})
const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

export default router