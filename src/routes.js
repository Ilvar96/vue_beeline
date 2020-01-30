import VueRouter from 'vue-router'
import Home from './pages/Home'
import Discont from './pages/Discont'
import Sale from './pages/Sale'
import TestPage from './pages/TestPage'
// import Instagram from './pages/Instagram'
export default new VueRouter({
  routes:[
    {
      path: '/tickets',
      component: Home,
    },
    {
      path: '/discount',
      component: Discont,
    },
    {
      path: '/sale',
      component: Sale,
    },
    // {
    //   path: '/instagram',
    //   component: Instagram,
    // },
    {
      path: '/test/:id',
      component: TestPage,
      meta: { hideFooter: true }
    },
  ],
    mode: 'history',
})
