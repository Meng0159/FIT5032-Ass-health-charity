<template>
  <div class="research-support">
    <div class="col-auto">
      <router-link to="/" class="navbar-brand d-flex align-items-center" style="padding-left: 15px">
        <img src="@/assets/images/logo.png" alt="Logo" height="40" />
        <h4 class="mb-0 ms-2">Back to Home</h4>
      </router-link>
    </div>
    <div class="container mt-4">
      <h1>Research and Support</h1>
      <p>
        Our research projects are aimed at understanding the various aspects of mental health and
        providing support to those in need. We collaborate with partners from around the world to
        conduct research and develop resources that can help individuals and communities.
      </p>
      <PublishForm />
      <!-- <ResearchProjects />
      <PartnersMap /> -->
    </div>
  </div>
</template>

<script>
import PublishForm from '@/components/5_researchService/PublishForm.vue'

export default {
  name: 'ResearchSupportView',
  components: {
    PublishForm
  }
}
</script>
