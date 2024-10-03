import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import AboutView from '../views/AboutView.vue'
import NewsView from '../views/NewsView.vue'
import DonateView from '@/views/DonateView.vue'
import LoginView from '../views/LoginView.vue'
import SignupView from '../views/SignupView.vue'
import ManergerView from '../views/ManergerView.vue'
import ResearchSupportView from '@/views/ResearchSupportView.vue'

import ErrorPage from '@/components/8_security/ErrorDisplay.vue'
import PublishForm from '@/components/5_services/PublishForm.vue'

// Helper function to check if the user is authenticated
function isAuthenticated() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
  return currentUser && currentUser.isLoggedIn
}

// Navigation guard to protect routes that require authentication
function userAuthenticated(to, from, next) {
  if (isAuthenticated()) {
    next() // allow to enter route
    console.log('user authenticated')
  } else {
    alert('Please log in to access.')
    next('/') // redirect to home if not authenticated
    console.log('user not authenticated')
  }
}

// Navigation guard to protect routes that require research role
function userAuthenticatedRole(to, from, next) {
  if (isAuthenticated() && JSON.parse(localStorage.getItem('currentUser')).isResearcher) {
    next() // allow to enter route
    console.log('researcher user authenticated')
  } else {
    alert('Please log in as researcher to access.')
    next('/') // redirect to home if not authenticated
    console.log('user not a researcher')
  }
}

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
      path: '/research-support',
      name: 'research-support',
      component: ResearchSupportView
    },
    {
      path: '/research-support/publish',
      name: 'publish',
      component: PublishForm,
      beforeEnter: userAuthenticatedRole
    },
    {
      path: '/research-support/partner',
      name: 'partner',
      component: () => import('@/views/ServicesPartnerView.vue')
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
      // updated with manager's firebase authentication
      beforeEnter: (to, from, next) => {
        const manager = JSON.parse(localStorage.getItem('currentUser'))
        if (manager && manager.isManager) {
          next()
          localStorage.removeItem('currentUser')
        } else {
          alert('Please log in.')
          next('/login')
        }
      }
    },
    {
      path: '/errorPage',
      name: 'errorPage',
      component: ErrorPage
    }
  ]
})
// // Global navigation guard for handling home page based on authentication
router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')

  if (to.name === 'home' && currentUser && currentUser.isLoggedIn) {
    // Proceed to the home page with logout visible
    next()
    console.log('log in to home')
  } else if (to.name === 'home') {
    // Proceed to the home page without logout visible
    next()
    console.log('log out status')
  } else {
    // Proceed to other routes
    next()
  }
})
export default router
