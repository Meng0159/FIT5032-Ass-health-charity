<template>
  <header class="bg-primary text-white py-3">
    <div class="container d-flex justify-content-between align-items-center">
      <!-- Logo -->
      <div class="header-logo">
        <img src="@/assets/images/logo.png" alt="Site Logo" class="img-fluid" />
      </div>

      <!-- Navigation Component -->
      <Navbar />
    </div>
  </header>
</template>

<script>
import Navbar from './Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style scoped>
.header-logo img {
  max-height: 50px;
}
</style>
