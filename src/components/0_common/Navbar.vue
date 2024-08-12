<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/about">About</a>
        </li>
        <!-- <li class="nav-item">
            <a class="nav-link" href="/news">News</a>
          </li> -->
        <!-- <li class="nav-item">
            <a class="nav-link" href="/services">Services</a>
          </li> -->
        <!-- <li class="nav-item">
            <a class="nav-link" href="/research-support">Research & Support</a>
          </li> -->
        <!-- <li class="nav-item">
            <a class="nav-link" href="/donate">Donate</a>
          </li> -->
        <!-- <li class="nav-item">
            <a class="nav-link" href="/account">My Account</a>
          </li> -->
      </ul>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar-nav .nav-link {
  color: white;
}
.navbar-nav .nav-link:hover {
  color: #f8f9fa;
}
</style>
