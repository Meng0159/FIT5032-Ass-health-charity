<!-- src/components/AppHeader.vue -->
<template>
  <nav class="navbar">
    <div class="container-fluid">
      <div class="row justify-content-between align-items-center w-100">
        <!-- Logo on the left -->
        <div class="col-auto">
          <a class="navbar-brand" href="/" style="padding-left: 15px">
            <img src="@/assets/images/logo.png" alt="Logo" height="40" />
          </a>
        </div>

        <!-- Navigation links centered (imported from Navbar component) -->
        <div class="col d-none d-lg-flex justify-content-center">
          <Navbar />
        </div>

        <!-- Login/Sign Up buttons on the right -->
        <div class="col-auto d-none d-lg-flex">
          <a class="btn btn-outline-light mx-2" href="/login">Login</a>
          <a class="btn btn-light mx-2" href="/signup">Sign Up</a>
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
        <Navbar :isOffCanvas="true" />
        <hr />
        <a class="btn btn-outline-light w-100 my-2" href="/login">Login</a>
        <a class="btn btn-light w-100 my-2" href="/signup">Sign Up</a>
      </div>
    </div>
  </nav>
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
.navbar {
  background-color: #e59b4c; /* Remove the blue background */
}
.navbar-brand img {
  padding-left: 15px;
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
