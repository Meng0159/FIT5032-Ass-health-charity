import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
import DonateView from '@/views/DonateView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ManergerView from '../views/ManergerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/donate',
      name: 'donate',
      component: DonateView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/manager',
      name: 'manager',
      component: ManergerView,
      // ensures that only one-time logged-in managers can access the route.
      // once a manager logged in, remove the check that make sure they have to login again to access the route.
      beforeEnter: (to, from, next) => {
        const manager = JSON.parse(localStorage.getItem('manager'))
        if (manager && manager.loggedIn) {
          next()
          localStorage.removeItem('manager')
        } else {
          alert('Please log in.')
          next('/login')
        }
      }
    }
  ]
})

export default router
