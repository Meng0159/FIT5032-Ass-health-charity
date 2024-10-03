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
import partnerLocations from '@/data/partnerLocations.json'

// Mapbox Access Token
mapboxgl.accessToken =
  'pk.eyJ1IjoibWxlZTAxNTkiLCJhIjoiY20xb3RiYm5vMTh1dTJpcHZyeDR5emRzaSJ9.slYdWfz4iMhrB5dr8qvoMA'

const map = ref(null)

const addMarkers = (locations) => {
  locations.forEach((location) => {
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<strong>${location.name}</strong><br>Postcode: ${location.postcode}`
    )

    new mapboxgl.Marker().setLngLat(location.location).setPopup(popup).addTo(map.value)
  })
}

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136], // Centered at Melbourne CBD
    zoom: 12
  })

  map.value.on('load', () => {
    // Add markers for each location using the addMarkers function
    addMarkers(partnerLocations)
  })
})
</script>
