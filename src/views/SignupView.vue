<template>
    <div class="signup">
      <h1>Sign Up</h1>
      <Signup />
    </div>
  </template>
  
  <script>
  import Signup from '@/components/auth/Signup.vue'
  
  export default {
    name: 'SignupView',
    components: {
      Signup
    }
  }
  </script>