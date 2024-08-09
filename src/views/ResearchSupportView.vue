<template>
    <div class="research-support">
      <h1>Research and Support</h1>
      <ResearchProjects />
      <PartnersMap />
    </div>
  </template>
  
  <script>
  import ResearchProjects from '@/components/research-support/ResearchProjects.vue'
  import PartnersMap from '@/components/research-support/PartnersMap.vue'
  
  export default {
    name: 'ResearchSupportView',
    components: {
      ResearchProjects,
      PartnersMap
    }
  }
  </script>