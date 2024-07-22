import { createRouter, createWebHistory } from 'vue-router'
import SearchView from '../views/SearchView.vue'
import InfoView from '../views/InfoView.vue'
import ReadView from '../views/ReadView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'search',
      component: SearchView
    },
    {
      path: '/info/:id',
      name: 'info',
      component: InfoView
    },
    {
      path: '/read/:title/:lang/:chap',
      name: 'read',
      component: ReadView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
