<template>
  <div class="home">
    <h1>Welcome to Our Organization</h1>
    <HomeIntro />
    <LatestNews />
  </div>
</template>

<script>
import HomeIntro from '@/components/home/HomeIntro.vue'
import LatestNews from '@/components/news/LatestNews.vue'

export default {
  name: 'HomeView',
  components: {
    HomeIntro,
    LatestNews
  }
}
</script>