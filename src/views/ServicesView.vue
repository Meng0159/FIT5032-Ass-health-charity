<template>
    <div class="services">
      <h1>Our Services</h1>
      <BookConsultant />
      <FeedbackForm />
    </div>
  </template>
  
  <script>
  import BookConsultant from '@/components/services/BookConsultant.vue'
  import FeedbackForm from '@/components/services/FeedbackForm.vue'
  
  export default {
    name: 'ServicesView',
    components: {
      BookConsultant,
      FeedbackForm
    }
  }
  </script>