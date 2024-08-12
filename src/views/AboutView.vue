<template>
  <div>
    <AppHeader />
    <main class="container mt-4">
      <h2>About Our Organization</h2>
      <section>
        <h3>Mission & Vision</h3>
        <p>Our mission is to provide support to those facing mental health challenges...</p>
      </section>
      <section>
        <h3>Our History</h3>
        <p>Founded in 2005, we have been committed to...</p>
      </section>
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import AppHeader from '@/components/0_common/AppHeader.vue'
// import Footer from '@/components/common/Footer.vue';

export default {
  components: {
    AppHeader
    // Footer,
  }
}
</script>
