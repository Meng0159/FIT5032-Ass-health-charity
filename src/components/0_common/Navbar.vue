<!-- eslint-disable vue/multi-word-component-names -->
<!-- <img src="@/assets/images/logo.png" alt="Logo" height="40" /> -->
<!-- src/components/Navbar.vue -->
<!-- <template>
  <ul class="navbar-nav d-flex flex-row justify-content-center">
    <li class="nav-item mx-2">
      <a class="nav-link" href="/about">About</a>
    </li>
    <li class="nav-item mx-2">
      <a class="nav-link" href="/news">News</a>
    </li>
    Uncomment other links as needed
    <li class="nav-item mx-2">
        <a class="nav-link" href="/news">News</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/services">Services</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/research-support">Research & Support</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/donate">Donate</a>
      </li>
      <li class="nav-item mx-2">
        <a class="nav-link" href="/account">My Account</a>
      </li>
  </ul>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar-nav .nav-link {
  color: rgb(88, 31, 31);
  margin: 0 10px;
}
.navbar-nav .nav-link:hover {
  color: #1e73c9;
}
</style> -->

<template>
  <ul
    :class="[
      'navbar-nav',
      isSidebarOpen ? 'flex-column' : 'd-flex flex-row justify-content-center'
    ]"
  >
    <li class="nav-item" v-for="link in links" :key="link.href">
      <a class="nav-link" :href="link.href">{{ link.text }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      links: [
        { text: 'Home', href: '/' },
        { text: 'About', href: '/about' }
        // Add other links as needed
      ]
    }
  }
}
</script>

<style scoped>
.navbar-nav.flex-column .nav-item {
  margin-bottom: 10px; /* Adds space between items when in vertical layout */
}
.navbar-nav .nav-link {
  color: rgb(68, 9, 9);
}
.navbar-nav .nav-link:hover {
  color: #17497b;
}
</style>
