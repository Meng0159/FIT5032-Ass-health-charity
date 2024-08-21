<template>
  <div class="manager-container">
    <div class="d-flex justify-content-between">
      <h2>Manager Page</h2>
      <a href="/" class="logout-btn">Logout</a>
    </div>
    <p>Welcome, Admin. Below is the list of registered users.</p>
    <DataTable :value="users" responsiveLayout="scroll">
      <Column field="fullName" header="Full Name" />
      <Column field="email" header="Email" />
      <Column field="phoneNumber" header="Phone Number" />
      <Column field="dob" header="Date of Birth" />
      <Column field="gender" header="Gender" />
      <Column field="country" header="Country" />
      <Column field="postcode" header="Postcode" />
      <Column field="role" header="Role" />
      <Column field="subscribe" header="Subscribed" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const users = ref([])

onMounted(() => {
  users.value = JSON.parse(localStorage.getItem('users')) || []
})
</script>

<style scoped>
/* Add any necessary styles here */
</style>
