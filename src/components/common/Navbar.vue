<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/news">News</router-link>
      <router-link to="/services">Services</router-link>
      <router-link to="/research-support">Research & Support</router-link>
      <router-link to="/donate">Donate</router-link>
      <router-link to="/account">My Account</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar'
  }
  </script>