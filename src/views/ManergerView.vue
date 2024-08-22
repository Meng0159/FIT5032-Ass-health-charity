<template>
  <div class="manager-container">
    <div class="d-flex align-items-center justify-content-between">
      <h2>Hi, Manager</h2>
      <router-link to="/" class="logout-btn">Logout</router-link>
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
.manager-container {
  padding: 20px;
}

.logout-btn {
  color: #fff;
  background-color: #7d2c06;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
}

.logout-btn:hover {
  background-color: #de5a67;
}

p {
  margin-bottom: 20px;
}

.p-datatable {
  font-size: 20px;
}

.p-datatable .p-datatable-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.p-datatable .p-datatable-thead > tr > th {
  border: none;
  font-weight: bold;
  text-align: left;
  padding: 0.5rem;
}

.p-datatable .p-datatable-tbody > tr > td {
  border: none;
  padding: 0.5rem;
}

.p-datatable .p-datatable-tbody > tr:nth-child(odd) {
  background-color: #f8f9fa;
}

.p-datatable .p-datatable-tbody > tr:hover {
  background-color: #e9ecef;
}

.p-datatable .p-paginator {
  margin-top: 20px;
}

/* Add any necessary styles here */
</style>
