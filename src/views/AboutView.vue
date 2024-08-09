<template>
  <div class="about">
    <h1>About Us</h1>
    <Organization />
    <Insights />
    <ConsultantTeam />
  </div>
</template>

<script>
import Organization from '@/components/about/Organization.vue'
import Insights from '@/components/about/Insights.vue'
import ConsultantTeam from '@/components/about/ConsultantTeam.vue'

export default {
  name: 'AboutView',
  components: {
    Organization,
    Insights,
    ConsultantTeam
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
