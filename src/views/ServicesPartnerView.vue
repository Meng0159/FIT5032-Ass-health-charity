<template>
  <div class="services">
    <AppHeader />
    <h1>Our Services</h1>
    <Mapbox />
  </div>
</template>

<script>
import Mapbox from '@/components/5_services/Mapbox.vue'
import AppHeader from '@/components/0_common/AppHeader.vue'

export default {
  name: 'PartnerView',
  components: {
    AppHeader,
    Mapbox
  }
}
</script>
