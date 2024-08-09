<template>
    <div class="news">
      <h1>News and Events</h1>
      <LatestNews />
      <EventsTable />
    </div>
  </template>
  
  <script>
  import LatestNews from '@/components/news/LatestNews.vue'
  import EventsTable from '@/components/news/EventsTable.vue'
  
  export default {
    name: 'NewsView',
    components: {
      LatestNews,
      EventsTable
    }
  }
  </script>