<template>
  <div class="events-table container mt-5">
    <h1 class="mb-4">Upcoming Events</h1>
    <DataTable :value="events" responsiveLayout="scroll">
      <Column field="name" header="Event Name" sortable></Column>
      <Column field="date" header="Date" sortable></Column>
      <Column field="location" header="Location" sortable></Column>
      <Column field="host" header="Hosted By" sortable></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DataTable } from 'primevue/datatable'
import { Column } from 'primevue/column'

// Load events data from eventData.json
const events = ref([])
onMounted(() => {
  fetch('/data/eventData.json')
    .then((res) => res.json())
    .then((data) => {
      events.value = data
    })
})
</script>

<style scoped>
/* Add any necessary custom styles here */
</style>
