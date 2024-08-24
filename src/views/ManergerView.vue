<template>
  <div class="manager-container">
    <div class="d-flex align-items-center justify-content-between">
      <h2>Hi, Manager</h2>
      <router-link to="/" class="logout-btn">Logout</router-link>
    </div>

    <ul class="nav nav-tabs" id="managerTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="donations-tab"
          data-bs-toggle="tab"
          data-bs-target="#donations"
          type="button"
          role="tab"
          aria-controls="donations"
          aria-selected="true"
        >
          Donation List
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="users-tab"
          data-bs-toggle="tab"
          data-bs-target="#users"
          type="button"
          role="tab"
          aria-controls="users"
          aria-selected="false"
        >
          Registered Users
        </button>
      </li>
    </ul>

    <div class="tab-content mt-4" id="managerTabContent">
      <!-- Donations Table -->
      <div
        class="tab-pane fade show active"
        id="donations"
        role="tabpanel"
        aria-labelledby="donations-tab"
      >
        <p>Below is the list of donations:</p>
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
      </div>

      <!-- Registered Users Table -->
      <div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
        <p>Below is the list of registered users:</p>
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
          <Column header="Actions">
            <template #body="slotProps">
              <button @click="removeUser(slotProps.data)" class="remove-btn">Remove</button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
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
