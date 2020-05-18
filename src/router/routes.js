export default [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home'),
      meta: { title: '首页', keepAlive: false }
    },
    {
      path: '/Home',
      name: 'Home',
      component: () => import('../views/Home'),
      meta: { title: '首页', keepAlive: false }
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login'),
      meta: { title: '首页', keepAlive: false }
    }
  ]