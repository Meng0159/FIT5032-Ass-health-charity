<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div id="map" style="height: 500px; width: 100%"></div>
  </div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ref, onMounted } from 'vue'

// Mapbox Access Token
mapboxgl.accessToken =
  'pk.eyJ1IjoibWxlZTAxNTkiLCJhIjoiY20xb3RiYm5vMTh1dTJpcHZyeDR5emRzaSJ9.slYdWfz4iMhrB5dr8qvoMA'

const map = ref(null)

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136], // Centered at Melbourne, Australia
    zoom: 12
  })
})
</script>
