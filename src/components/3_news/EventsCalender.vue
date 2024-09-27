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
        <p><strong>Host:</strong> {{ selectedEvent.host }}</p>
      </template>
      <template #footer>
        <!-- Register button navigates to eventRegisterForm.vue -->
        <button class="btn btn-primary" @click="registerForEvent">Register</button>
        <button class="btn btn-secondary" @click="closeModal">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import eventData from '@/data/eventData.json'
import Modal from './modal.vue'

export default {
  components: {
    FullCalendar,
    Modal // Register the modal component
  },
  data() {
    return {
      showModal: false, // Control modal visibility
      selectedEvent: {}, // Store the clicked event details
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: [], // Will be populated from eventData.json
        eventClick: this.handleEventClick // Handle event clicks
      }
    }
  },
  mounted() {
    this.loadEvents() // Load events on mount
  },
  methods: {
    handleEventClick(info) {
      // Populate selectedEvent with clicked event details
      this.selectedEvent = {
        title: info.event.title,
        location: info.event.extendedProps.location,
        host: info.event.extendedProps.host
      }
      // Show the modal
      this.showModal = true
    },
    loadEvents() {
      // Map eventData.json into FullCalendar format
      const formattedEvents = eventData.map((event) => ({
        title: event.name,
        date: event.date,
        location: event.location,
        host: event.host
      }))
      this.calendarOptions.events = formattedEvents
    },
    closeModal() {
      this.showModal = false // Close the modal
    },
    registerForEvent() {
      // Add your registration logic here
      alert(`You have registered for ${this.selectedEvent.title}`)
      this.closeModal()
    }
  }
}
</script>
