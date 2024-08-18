// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
// Import PrimeVue and the Aura theme
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
// Use PrimeVue and the Aura theme
app.use(PrimeVue, { Theme: Aura })

// Use the router
app.use(router)

// Mount the app
app.mount('#app')
