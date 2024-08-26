<template>
  <div class="container mt-4">
    <h1 class="mb-4">Latest News</h1>
    <div class="row">
      <div class="col-md-6 mb-4" v-for="(newsItem, index) in newsItems" :key="index">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ newsItem.title }}</h5>
            <p class="card-text">
              Read more: <a :href="newsItem.link" target="_blank">Visit->{{ newsItem.resource }}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import newsItems from '@/data/newsData.json'

// Fetch news items from the JSON file
onMounted(() => {
  newsItems.value = newsItems
})
</script>

<style scoped>
.container {
  margin-top: 20px;
}
.card {
  height: 100%;
}
</style>
