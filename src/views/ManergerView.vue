<template>
  <div class="manager-container">
    <div class="d-flex align-items-center justify-content-between">
      <h2>Hi, Manager</h2>
      <router-link to="/" class="logout-btn">Logout</router-link>
    </div>

    <p>Welcome, Manager. Below is the list of donations.</p>
    <DataTable :value="donationData" responsiveLayout="scroll">
      <Column field="name" header="Name" />
      <Column field="email" header="Email" />
      <Column field="phone" header="Phone Number" />
      <Column field="amount" header="Amount" />
      <Column field="message" header="Message" />
      <Column field="rating" header="Review Rate" />
      <Column header="Actions">
        <template #body="slotProps">
          <button @click="deleteDonation(slotProps.data)" class="remove-btn">Remove</button>
        </template>
      </Column>
    </DataTable>
    <p>Welcome, Admin. Below is the list of registered users.</p>
    <button @click="removeUser(selectedUser)" class="remove-btn">Remove User</button>
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

const removeUser = (user) => {
  const index = users.value.findIndex((u) => u.email === user.email)
  if (index !== -1) {
    users.value.splice(index, 1)
    localStorage.setItem('users', JSON.stringify(users.value))
  }
}
const donationData = ref([])

onMounted(() => {
  donationData.value = JSON.parse(localStorage.getItem('donations')) || []
})
const deleteDonation = (donation) => {
  const index = donationData.value.indexOf(donation)
  if (index !== -1) {
    donationData.value.splice(index, 1)
    localStorage.setItem('donations', JSON.stringify(donationData.value))
  }
}
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
