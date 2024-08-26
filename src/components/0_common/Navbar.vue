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
  <ul :class="['nav nav-pills nav-justified', isSidebarOpen ? 'flex-column' : 'd-flex flex-row']">
    <li class="nav-item" v-for="link in links" :key="link.href">
      <router-link class="nav-link" active-class="active" aria-current="page" :to="link.href">{{
        link.text
      }}</router-link>
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
        { text: 'About', href: '/about' },
        { text: 'News', href: '/news' },
        // { text: 'Services', href: '/services' },
        { text: 'Research', href: '/research-support' },
        { text: 'Donate', href: '/donate' }

        // Add other links as needed
      ]
    }
  }
}
</script>

<style scoped>
.nav .d-flex {
  margin: 10px; /* Adds space above the items */
}

.nav-pills .nav-link.active {
  color: rgb(11, 18, 228);
  background-color: #abcce6;
}
.nav-pills .nav-link {
  color: rgb(85, 27, 7);
}
.nav.flex-column .nav-item {
  margin-bottom: 10px; /* Adds space between items when in vertical layout */
}
.nav.flex-column .nav-item:last-child {
  margin-bottom: 0; /* Removes space below the last item */
}
</style>
