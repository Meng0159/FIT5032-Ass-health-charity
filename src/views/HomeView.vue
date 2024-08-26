<template>
  <div class="home">
    <AppHeader />
    <main class="container mt-4">
      <FeaturedSections />
    </main>
  </div>
</template>

<script>
import AppHeader from '@/components/0_common/AppHeader.vue'
import FeaturedSections from '@/components/1_home/FeaturedSections.vue'

export default {
  name: 'HomeView',
  components: {
    AppHeader,
    FeaturedSections
  }
}
</script>
