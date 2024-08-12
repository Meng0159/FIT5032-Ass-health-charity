<template>
  <div class="home">
    <AppHeader />
    <!-- 
    <h1>Welcome to Our Organization</h1>
    <HomeIntro />
    <LatestNews /> -->
    <main class="container mt-4">
      <section class="text-center">
        <h1>Welcome to Our Mental Health Support Platform</h1>
        <p>Your journey to better mental health starts here.</p>
        <!-- Main sections -->
        <div class="row">
          <div class="col-md-4">
            <h3>About Us</h3>
            <p>Learn more about our mission and vision.</p>
            <a href="/about" class="btn btn-primary">Learn More</a>
          </div>
          <div class="col-md-4">
            <h3>News</h3>
            <p>Stay updated with the latest news and events.</p>
            <a href="/news" class="btn btn-primary">View News</a>
          </div>
          <div class="col-md-4">
            <h3>Donate</h3>
            <p>Support our cause by making a donation.</p>
            <a href="/donate" class="btn btn-primary">Donate Now</a>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/0_common/AppHeader.vue'
// import HomeIntro from '@/components/1_home/HomeIntro.vue'
// import LatestNews from '@/components/3_news/LatestNews.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader
  }
}
</script>
