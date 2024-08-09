import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import NewsView from '../views/NewsView.vue'
import ServicesView from '../views/ServicesView.vue'
import ResearchSupportView from '../views/ResearchSupportView.vue'
import DonateView from '../views/DonateView.vue'
import AccountView from '../views/AccountView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'

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
      path: '/news',
      name: 'news',
      component: NewsView
    },
    {
      path: '/services',
      name: 'services',
      // component: ServicesView
      component: () => import('../views/ServicesView')
    },
    {
      path: '/research-support',
      name: 'research-support',
      // component: ResearchSupportView
      component: () => import('../views/ResearchSupportView')
    },
    {
      path: '/donate',
      name: 'donate',
      // component: DonateView
      component: () => import('../views/DonateView')
    },
    // {
    //   path: '/account',
    //   name: 'account',
    //   component: AccountView,
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    }
  ]
})

export default router
