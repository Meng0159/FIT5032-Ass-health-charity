<template>
  <div class="login">
    <div class="col-auto">
      <router-link to="/" class="navbar-brand d-flex align-items-center" style="padding-left: 15px">
        <img src="@/assets/images/logo.png" alt="Logo" height="40" />
        <h4 class="mb-0 ms-2">Back to Home</h4>
      </router-link>
    </div>
    <Login />
  </div>
</template>

<script>
import Login from '@/components/7_auth/Login.vue'

export default {
  name: 'LoginView',
  components: {
    Login
  }
}
</script>
