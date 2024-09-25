import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// Import PrimeVue and the Aura theme
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import 'node_modules/primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css' // PrimeIcons CSS

import { initializeApp } from 'firebase/app'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcYkRrtFOwh01c5VfnHBd8kD8cA0wbDKs',
  authDomain: 'fit5032-healthyweb.firebaseapp.com',
  projectId: 'fit5032-healthyweb',
  storageBucket: 'fit5032-healthyweb.appspot.com',
  messagingSenderId: '714953864995',
  appId: '1:714953864995:web:2f31ac4b27b280491afe96'
}
// Initialize Firebase
initializeApp(firebaseConfig)
const app = createApp(App)
// Use PrimeVue and the Aura theme
app.use(PrimeVue, { Theme: Aura })

// Use the router
app.use(router)

// Mount the app
app.mount('#app')
