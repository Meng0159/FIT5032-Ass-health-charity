<template>
  <div class="research-support">
    <AppHeader />
    <div class="publishForm-link">
      <img src="@/assets/images/logo.png" alt="Logo" height="40" />
      <p>Are you a researcher? Click the button to go to the Publish Form</p>
      <router-link
        to="/research-support/publish"
        class="navbar-brand d-flex align-items-center"
        style="padding-left: 15px"
      >
        <h4 class="mb-0 ms-2">Go to Publish</h4>
      </router-link>
    </div>
  </div>
</template>

<script>
// import PublishForm from '@/components/5_services/PublishForm.vue'
import AppHeader from '@/components/0_common/AppHeader.vue'

export default {
  name: 'ResearchSupportView',
  components: {
    AppHeader
  }
}
</script>

<style scoped>
.publishForm-link {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;
  padding-right: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.publishForm-link p {
  margin: 0;
  padding: 10px;
}
</style>
