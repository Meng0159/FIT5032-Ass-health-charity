<template>
  <div>
    <AppHeader />
    <main class="container mt-4">
      <h2>About Organisation</h2>
      <section>
        <h3>Mission & Vision</h3>
        <p>Our mission is to provide support to those facing mental health challenges...</p>
      </section>

      <section class="history">
        <h2>Our History</h2>
        <p>
          Founded in 2005, we have been committed to advancing mental health support and research.
          Over the years, we have grown into a trusted resource for individuals seeking help and
          information, continually expanding our reach and impact.
        </p>
      </section>

      <section class="values">
        <h2>Our Values</h2>
        <ul>
          <li><strong>Compassion:</strong> We approach every individual with empathy and care.</li>
          <li>
            <strong>Integrity:</strong> We maintain the highest standards of honesty and
            transparency.
          </li>
          <li>
            <strong>Innovation:</strong> We embrace new ideas and research to improve mental health
            support.
          </li>
          <li>
            <strong>Community:</strong> We believe in the power of community and peer support.
          </li>
        </ul>
      </section>
      <section class="team">
        <h2>Meet Our Team</h2>
        <p>
          Our dedicated team of professionals and volunteers is passionate about making a difference
          in the field of mental health. Together, we work tirelessly to provide the best support
          and resources to those in need.
        </p>
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

<style scoped></style>
