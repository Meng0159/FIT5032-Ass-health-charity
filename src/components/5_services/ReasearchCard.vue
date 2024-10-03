<template>
  <div class="publications-container">
    <div v-for="publication in publications" :key="publication.id" class="publication-card">
      <h3>{{ publication.topic }}</h3>
      <p><strong>Field:</strong> {{ publication.field }}</p>
      <p><strong>Keywords:</strong> {{ publication.keywords }}</p>

      <div class="content">
        <p>
          <strong>Content: </strong>
          <button @click="toggleContent(publication.id)">
            {{ publication.showMore ? 'Read Less' : 'Read More' }}
          </button>
        </p>

        <div v-if="publication.showMore">
          <p v-for="(paragraph, index) in publication.paragraphs" :key="index">
            {{ paragraph }}
          </p>
        </div>
        <div v-else>
          <p>{{ publication.contentPreview }}</p>
        </div>
      </div>

      <footer>
        <p><strong>Author:</strong> {{ publication.name }}</p>
        <p><strong>Institute:</strong> {{ publication.institute }}</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// State to hold publications data
const publications = ref([])

// Load publications on component mount
onMounted(async () => {
  try {
    const response = await axios.get('https://getpublications-umqiyyl22a-uc.a.run.app')
    publications.value = response.data.map((pub) => ({
      ...pub,
      contentPreview: pub.content.substring(0, 100) + '...', // Show part of the content
      showMore: false // State to toggle full content
    }))
  } catch (error) {
    console.error('Error loading publications:', error)
  }
})

// Toggle content display
function toggleContent(id) {
  const pub = publications.value.find((p) => p.id === id)
  if (pub) {
    pub.showMore = !pub.showMore

    // Split the content into paragraphs
    if (pub.showMore && !pub.paragraphs) {
      pub.paragraphs = pub.content.split('\n').filter((paragraph) => paragraph.trim() !== '')
    }
  }
}
</script>

<style scoped>
.publications-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.publication-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem;
  width: 1100px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

.content {
  margin-top: 1rem;
}

footer {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}
</style>
