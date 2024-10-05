<!-- src/components/AppHeader.vue -->
<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="row justify-content-between align-items-center w-100">
        <!-- Logo on the left -->
        <div class="logo col-auto d-flex align-items-center">
          <router-link
            class="navbar-brand"
            to="/"
            style="display: flex; align-items: center; padding-left: 15px"
            tabindex="0"
          >
            <img src="@/assets/images/brain-flower.jpeg" alt="Logo" height="40" />
            <h4 style="margin-left: 10px; margin-bottom: 0">MindSupport</h4>
          </router-link>
        </div>

        <!-- Navigation links centered (imported from Navbar component) -->
        <div class="col d-none d-lg-flex justify-content-center">
          <Navbar />
        </div>

        <!-- Conditional display of Login/Sign Up or Logout button -->
        <div class="col-auto d-none d-lg-flex">
          <router-link
            v-if="!isAuthenticated"
            class="btn btn-outline-light mx-2"
            to="/login"
            tabindex="0"
          >
            Login
          </router-link>
          <router-link v-if="!isAuthenticated" class="btn btn-light mx-2" to="/signup" tabindex="0">
            Sign Up
          </router-link>
          <button v-if="isAuthenticated" class="btn btn-light mx-2" @click="logout" tabindex="0">
            Logout
          </button>
        </div>

        <!-- Toggler for smaller screens -->
        <div class="col-auto d-lg-none">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            style="border: 0.5px solid white"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Offcanvas sidebar for smaller screens -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <!-- Reuse the Navbar component inside the off-canvas -->
        <Navbar :isSidebarOpen="true" />
        <!--Conditional display: Login/Sign Up or logOut buttons -->
        <router-link v-if="!isAuthenticated" class="btn btn-outline-light w-100 my-2" to="/login">
          Login
        </router-link>
        <router-link v-if="!isAuthenticated" class="btn btn-light w-100 my-2" to="/signup">
          Sign Up
        </router-link>
        <button v-if="isAuthenticated" class="btn btn-light w-100 my-2" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import Navbar from './Navbar.vue'
import { ref, defineEmits, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter()

// Check if the user is authenticated by checking local storage
onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
  if (currentUser && currentUser.isLoggedIn) {
    isAuthenticated.value = true
  }
})

const emit = defineEmits(['authenticated'])
// Logout function
const logout = () => {
  localStorage.removeItem('currentUser')
  // isAuthenticated.value = false
  emit('authenticated', false)
  router.push('/') // Redirect to home page after logout
  location.reload() // Reload the page to update the navbar
}
</script>

<style scoped>
.navbar {
  background-color: #f6ca9c; /* Remove the blue background */
}

.logo.col-auto {
  margin-left: 5px;
  background-color: #e5914c;
  padding-left: 0px;
  border-radius: 0.3rem;
  box-shadow: 0px 2px 4px rgba(149, 146, 146, 0.2);
}

.navbar-brand img {
  padding-left: 5px;
}
.btn-outline-light {
  border-color: #ffffff;
  color: #703030;
}
.btn-outline-light:hover {
  background-color: #4c2e2e;
  color: #000;
}
.btn-light {
  color: #000;
}
.offcanvas-body .nav-link {
  color: #000;
}
.offcanvas-body .nav-link:hover {
  color: #555;
}
</style>
