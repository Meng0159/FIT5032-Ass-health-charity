<template>
    <div class="login">
      <h1>Login</h1>
      <Login />
    </div>
  </template>
  
  <script>
  import Login from '@/components/auth/Login.vue'
  
  export default {
    name: 'LoginView',
    components: {
      Login
    }
  }
  </script>
