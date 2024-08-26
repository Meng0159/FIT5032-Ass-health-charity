<template>
  <div class="signup">
    <div class="col-auto">
      <router-link to="/" class="navbar-brand d-flex align-items-center" style="padding-left: 15px">
        <img src="@/assets/images/logo.png" alt="Logo" height="40" />
        <h4 class="mb-0 ms-2">Back to Home</h4>
      </router-link>
    </div>
    <Signup />
  </div>
</template>

<script>
import Signup from '@/components/7_auth/Signup.vue'

export default {
  name: 'SignupView',
  components: {
    Signup
  }
}
</script>
