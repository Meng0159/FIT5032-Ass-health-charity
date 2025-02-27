<template>
  <div>
    <!-- Main Banner -->
    <section class="banner">
      <h1>Your mental health matters</h1>
      <p></p>
      <p>
        We are here to support you through difficult times and help you achieve your best possible
        mental health.
      </p>
    </section>

    <!-- About Section -->
    <section class="about">
      <h2>About Us</h2>
      <p>
        Our mission is to build reliable, scalable, and high-quality software solutions for mental
        health organizations. By leveraging cutting-edge technology and innovative approaches, we
        aim to empower these organizations to provide better support, resources, and information to
        individuals across Australia, ultimately enhancing the overall mental well-being of the
        community. We collaborate with mental health professionals and organizations to develop and
        maintain a robust system using
        <strong>Express server, Google Firebase, and Cloud Functions</strong>. Our API
        implementations ensure seamless integration and efficient data management, providing a
        reliable platform for mental health services.
      </p>
      <router-link to="/about" class="btn btn-primary">Learn More</router-link>
    </section>

    <!-- News Section -->
    <section class="news">
      <h2>Latest News</h2>
      <p>Stay updated with the latest news and events.</p>
      <div class="row">
        <div class="col-md-6 mb-4" v-for="(news, index) in topNews" :key="index">
          <a :href="news.link" target="_blank" style="text-decoration: none">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{{ news.title }}</h5>
                <p class="card-text">{{ news.summary }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      <router-link to="/news" class="btn btn-primary">More News</router-link>
    </section>

    <!-- Donate Section -->
    <section class="donate">
      <h2>Support Us</h2>
      <!-- <img src="donate.jpg" alt="Donate" /> -->
      <p>
        Your donations help us provide essential mental health support and services.
        <router-link to="/donate" class="donate-btn">Donate Now</router-link> to make a difference.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import newsItems from '@/data/newsData.json' // Assuming you have a newsItems.json file with news data

const topNews = ref([])

onMounted(() => {
  topNews.value = newsItems.slice(0, 2) // Get the top 2 latest news items
})
</script>

<style scoped>
.banner {
  /* background-image: url('@/assets/banner.jpg'); /*Replace with the path to your banner image */
  background-color: #165598;
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 60px 20px;
}

.banner h1 {
  font-size: 2.5rem;
}

.banner p {
  font-size: 1.2rem;
}

.about,
.news,
.donate {
  padding: 2rem;
  text-align: center;
}

.about h2,
.news h2,
.donate h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.donate img {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.donate-btn {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
}
</style>
