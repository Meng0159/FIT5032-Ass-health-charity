<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="search-container">
      <div class="row">
        <div class="col-md-6">
          <div class="location-input">
            <div class="col">
              <input
                type="text"
                v-model="userLocationInput"
                placeholder="Enter your location to get trip detail"
                class="form-control"
              />
              <p class="mt-2">ex. Wellington Rd, Clayton</p>
            </div>
            <button @click="useCurrentLocation" class="btn btn-secondary w-95">
              Use My Location
            </button>
            <button @click="setUserLocationFromInput" class="btn btn-success w-95">
              Go Location
            </button>
          </div>
        </div>

        <div class="col-md-6 partner-search">
          <input
            type="text"
            v-model="searchQuery"
            @keyup.enter="searchByPostcode"
            placeholder="Enter postcode to find nearest partner"
            class="form-control"
          />
          <button @click="startVoiceSearch" class="btn btn-secondary w-25">Voice Search</button>
          <button @click="searchByPostcode" class="btn btn-primary w-25">Search</button>
        </div>
      </div>
    </div>
    <div id="map" style="height: 500px; width: 100%"></div>
    <div v-if="selectedPartner" class="partner-info">
      <h3>{{ selectedPartner.name }}</h3>
      <p><strong>Address:</strong> {{ selectedPartner.address }}, {{ selectedPartner.postcode }}</p>
      <button @click="showTripDetails" class="trip-button" :disabled="!userLocationInput">
        Get Trip Details
      </button>
      <div v-if="tripDetails" class="trip-details">
        <h4>
          <span class="trip-icon" @click="playTripDetails">
            <i class="fas fa-volume-up"></i>
            <!-- FontAwesome icon for volume -->
          </span>
          Trip Details
        </h4>
        <div class="location-details">
          <p>
            <strong>From:</strong>
            {{ userLocationInput || 'Please input your location to see trip details' }}
          </p>
          <p><strong>To:</strong> {{ selectedPartner.name }}</p>
        </div>
        <template v-if="userLocationInput">
          <p><strong>Distance:</strong> {{ tripDetails.distance }} km</p>
          <p><strong>Duration:</strong> {{ tripDetails.duration }} min</p>
          <p><strong>Suggested Transport:</strong> {{ tripDetails.transport }}</p>
        </template>
      </div>
    </div>
    <div v-if="locationError" class="error-message">
      {{ locationError }}
    </div>
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
const selectedPartner = ref(null)
const tripDetails = ref(null)
const userLocation = ref(null)
const userLocationInput = ref('')
const locationError = ref(null)
const userMarker = ref(null)
const searchQuery = ref('')

const MELBOURNE_CENTRAL = [144.9631, -37.8136]

async function useCurrentLocation() {
  if (!navigator.geolocation) {
    locationError.value = 'Geolocation is not supported by your browser'
    return
  }

  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    userLocation.value = [position.coords.longitude, position.coords.latitude]

    // Reverse geocoding to get suburb name
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${userLocation.value[0]},${userLocation.value[1]}.json?types=locality&access_token=${mapboxgl.accessToken}`
      )
      const data = await response.json()
      if (data.features && data.features.length > 0) {
        userLocationInput.value = data.features[0].text // This should be the suburb name
      }
    } catch (error) {
      console.error('Error getting location name:', error)
      userLocationInput.value = `${position.coords.latitude.toFixed(4)}°S, ${position.coords.longitude.toFixed(4)}°E`
    }

    updateUserMarker()
  } catch (error) {
    handleLocationError(error)
  }
}

async function setUserLocationFromInput() {
  if (!userLocationInput.value) {
    locationError.value = 'Please enter a valid location.'
    return
  }

  try {
    // Define a bounding box for Victoria, Australia (rough coordinates)
    const vicBbox = [140.9617, -39.1591, 150.051, -33.9806] // [minLng, minLat, maxLng, maxLat]

    // Use Mapbox Geocoding API, specifying proximity to Melbourne and bounding box for Victoria
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(userLocationInput.value)}.json?bbox=${vicBbox.join(',')}&proximity=144.9631,-37.8136&types=address,place&access_token=${mapboxgl.accessToken}`
    )
    const data = await response.json()

    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center
      userLocation.value = [longitude, latitude]

      updateUserMarker() // Update the map marker based on new location
      map.value.flyTo({
        center: userLocation.value,
        zoom: 12
      })

      locationError.value = null // Clear any errors
    } else {
      locationError.value = 'No location found. Please check the suburb or address name.'
    }
  } catch (error) {
    console.error('Error getting location coordinates:', error)
    locationError.value = 'Failed to find the location. Try again.'
  }
}

function handleLocationError(error) {
  switch (error.code) {
    case 1: // PERMISSION_DENIED
      locationError.value =
        'Location request denied. Please enable location services to use this feature.'
      break
    case 2: // POSITION_UNAVAILABLE
      locationError.value = 'Location information unavailable.'
      break
    case 3: // TIMEOUT
      locationError.value = 'Location request timed out.'
      break
    default:
      locationError.value = 'An unknown error occurred.'
  }
}

function updateUserMarker() {
  if (!userLocation.value || !map.value) return

  if (userMarker.value) {
    userMarker.value.setLngLat(userLocation.value)
  } else {
    userMarker.value = new mapboxgl.Marker({ color: '#FF0000' })
      .setLngLat(userLocation.value)
      .setPopup(new mapboxgl.Popup().setHTML(`<strong>${userLocationInput.value}</strong>`))
      .addTo(map.value)
  }

  map.value.flyTo({
    center: userLocation.value,
    zoom: 12
  })
}

function searchByPostcode() {
  if (!searchQuery.value) return

  const searchPostcode = searchQuery.value.trim()

  const nearestPartner = partnerLocations.reduce((nearest, current) => {
    if (current.postcode === searchPostcode) return current

    const currentDiff = Math.abs(parseInt(current.postcode) - parseInt(searchPostcode))
    const nearestDiff = nearest
      ? Math.abs(parseInt(nearest.postcode) - parseInt(searchPostcode))
      : Infinity

    return currentDiff < nearestDiff ? current : nearest
  }, null)

  if (nearestPartner) {
    selectedPartner.value = nearestPartner
    tripDetails.value = null

    map.value.flyTo({
      center: nearestPartner.location,
      zoom: 14
    })
  } else {
    locationError.value = 'No partners found near this postcode'
    setTimeout(() => {
      locationError.value = null
    }, 3000)
  }
}

function calculateTripDetails() {
  if (!userLocation.value || !selectedPartner.value) return null

  const [lon1, lat1] = userLocation.value
  const [lon2, lat2] = selectedPartner.value.location

  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  let duration, transport
  if (distance < 1) {
    duration = Math.round(distance * 15)
    transport = 'Walking'
  } else if (distance < 5) {
    duration = Math.round(distance * 5)
    transport = 'Tram or Bus'
  } else {
    duration = Math.round(distance * 3)
    transport = 'Train'
  }

  return {
    distance: distance.toFixed(2),
    duration,
    transport
  }
}

function showTripDetails() {
  if (selectedPartner.value && userLocationInput.value) {
    tripDetails.value = calculateTripDetails()
  }
}

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: MELBOURNE_CENTRAL, // Default center to Melbourne Central
    zoom: 12
  })

  map.value.on('load', () => {
    // Add markers for each location
    partnerLocations.forEach((partner) => {
      const marker = new mapboxgl.Marker().setLngLat(partner.location).addTo(map.value)

      marker.getElement().addEventListener('click', () => {
        selectedPartner.value = partner
        tripDetails.value = null
      })
    })
  })
})
</script>

<style scoped>
.search-container {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.location-input,
.partner-search {
  display: flex;
  gap: 10px;
}
.highlight-line {
  height: 4px; /* Height of the highlight line */
  background-color: #007bff; /* Color of the highlight line */
  margin-top: 5px; /* Space above the line */
  cursor: pointer; /* Change cursor to pointer */
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.search-button,
.location-button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.search-button {
  background-color: #2196f3;
  color: white;
}

.location-button {
  background-color: #4caf50;
  color: white;
}

.partner-info {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 400px;
}

.trip-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}

.trip-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.trip-details {
  margin-top: 15px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.location-details {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.error-message {
  margin-top: 10px;
  padding: 10px;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
}
</style>
