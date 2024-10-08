<template>
  <div class="events-calendar container mt-5">
    <FullCalendar :options="calendarOptions" />

    <!-- Event Details Modal -->
    <Modal v-if="showModal" @close="closeModal">
      <template #header>
        <h3>{{ selectedEvent.title }}</h3>
      </template>
      <template #body>
        <p><strong>Location:</strong> {{ selectedEvent.location }}</p>
        <p><strong>Date:</strong> {{ selectedEvent.date }}</p>
        <p><strong>Host:</strong> {{ selectedEvent.host }}</p>
        <p><strong>Registration Limit:</strong> {{ selectedEvent.limit }}</p>
        <p><strong>Available Spots:</strong> {{ availableSpots }}</p>
      </template>
      <template #footer>
        <!-- Register button navigates to eventRegisterForm.vue -->
        <button :class="registerButtonClass" :disabled="isFull" @click="registerForEvent">
          {{ registerButtonText }}
        </button>
        <button class="btn btn-secondary" @click="closeModal">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventData from '@/data/eventData.json'
import Modal from './Modal.vue'
import axios from 'axios'

// Initialize Firebase Firestore
const db = getFirestore()

// Modal and calendar data
const showModal = ref(false)
const selectedEvent = ref({})
// State to store available spots
const availableSpots = ref(0)
// State for registration button
const isFull = ref(false)
const registerButtonText = ref('Register')
const registerButtonClass = ref('btn btn-primary')

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: [], // Will be populated from eventData.json
  eventClick: handleEventClick // Handle event clicks
})

// Load events from JSON
onMounted(() => {
  loadEvents()
})

function loadEvents() {
  const formattedEvents = eventData.map((event) => ({
    id: event.id, // Add event ID to each event
    title: event.name,
    date: event.date,
    location: event.location,
    host: event.host,
    limit: event.limit // Include the registration limit
  }))
  calendarOptions.value.events = formattedEvents
}

// Handle event click and show modal
function handleEventClick(info) {
  selectedEvent.value = {
    id: info.event.id, // Save the event ID
    title: info.event.title,
    location: info.event.extendedProps.location,
    host: info.event.extendedProps.host,
    date: info.event.start, // Date object
    limit: info.event.extendedProps.limit // Store event registration limit
  }
  checkEventCapacity(info.event.id, info.event.extendedProps.limit) // Check if the event is full
  showModal.value = true
}
// define the function to check the event capacity
async function checkEventCapacity(eventId, eventLimit) {
  const functionUrl = `https://monitoreventcapacity-umqiyyl22a-uc.a.run.app?eventid=${eventId}&limit=${eventLimit}`

  try {
    const response = await axios.get(functionUrl) // Call Cloud Function using axios
    console.log('Event capacity response:', response.data)
    const data = response.data

    availableSpots.value = data.availableSpots // Update available spots
    isFull.value = data.isFull // Update whether the event is full

    // Update button state based on availability
    if (data.isFull) {
      registerButtonText.value = 'Event Full'
      registerButtonClass.value = 'btn btn-danger'
    } else {
      registerButtonText.value = 'Register'
      registerButtonClass.value = 'btn btn-primary'
    }
  } catch (error) {
    console.error('Error fetching event capacity:', error)
    alert('Error fetching event capacity. Please try again later.')
  }
}

// Close modal function
function closeModal() {
  showModal.value = false
}

// Save registration to Firestore
async function registerForEvent() {
  const auth = getAuth()
  const user = auth.currentUser

  if (user && !isFull.value) {
    const userId = user.uid
    const eventid = selectedEvent.value.id
    // Check if the user has already registered for this event
    const registrationsRef = collection(db, 'eventRegistrations')
    const q = query(
      registrationsRef,
      where('userId', '==', userId),
      where('attendEventid', '==', eventid)
    )
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      alert('You have already registered for this event.')
      return // Stop the registration process if the user is already registered
    }
    try {
      // Add the event registration to Firestore
      await addDoc(collection(db, 'eventRegistrations'), {
        attendEventid: selectedEvent.value.id, // Add event ID to the registration
        eventTitle: selectedEvent.value.title,
        eventDate: selectedEvent.value.date,
        location: selectedEvent.value.location,
        host: selectedEvent.value.host,
        userId: user.uid, // Logged-in user's UID
        userEmail: user.email, // Optional: Store user email for reference
        registeredAt: new Date() // Timestamp of registration
      })

      console.log('userId:', user.uid)
      alert(`You have successfully registered for ${selectedEvent.value.title}`)
      closeModal()
    } catch (error) {
      console.error('Error registering for event:', error)
      alert('Error registering for event. Please try again.')
    }
  } else if (!user) {
    alert('Please log in to register for events.')
  } else if (isFull.value) {
    alert('Event is full. Registration is closed.')
  }
}
</script>
