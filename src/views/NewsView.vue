<template>
  <div class="news">
    <AppHeader />
    <div class="container mt-4">
      <h1 class="mb-4">News and Events</h1>

      <!-- Latest News Section -->
      <LatestNews />

      <!-- Events Table Section -->
      <div class="mt-5">
        <h2 class="mb-3">Upcoming Events</h2>
        <EventsCalender />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/0_common/AppHeader.vue'
import LatestNews from '@/components/3_news/NewsCards.vue'
import EventsCalender from '@/components/3_news/EventsCalender.vue'

export default {
  name: 'NewsView',
  components: {
    AppHeader,
    LatestNews,
    EventsCalender
  }
}
</script>
