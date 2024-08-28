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

        <div class="filter-section">
          <label for="donationFilter" class="col-auto">Filter Donations:</label>
          <select v-model="donationFilter" id="donationFilter" class="col-auto filter-dropdown">
            <option value="">All Donations</option>
            <option value="individual">Individual</option>
            <option value="organisation">Organisation</option>
          </select>
        </div>

        <DataTable
          v-model:selection="selectedDonation"
          :value="filteredDonations"
          selectionMode="single"
          responsiveLayout="scroll"
          dataKey="id"
        >
          <!-- <Column selectionMode="single" headerStyle="width: 3rem"></Column> -->
          <template v-for="field in donationFields" :key="field">
            <Column :field="field" :header="getHeader(field)" />
          </template>
          <Column field="rating" header="Review Rate">
            <template #body="slotProps">
              <Rating :modelValue="slotProps.data.rating" readonly /> </template
          ></Column>
        </DataTable>
        <div class="d-flex justify-content-between">
          <button @click="removeDonation()" class="col-3 remove-btn mt-3">
            Remove Selected Donation
          </button>
          <div class="rating col-auto d-flex justify-content-between" v-if="averageRating !== null">
            <span>Overall donationers experience rating:</span>
            <div class="stars">
              <span
                v-for="i in 5"
                :key="i"
                class="star"
                :class="{ filled: i <= Math.round(averageRating) }"
              >
                ★
              </span>
            </div>
            <span class="rating-value">({{ averageRating.toFixed(1) }})</span>
          </div>
        </div>
      </div>

      <!-- Registered Users Table -->
      <div class="tab-pane fade" id="users" role="tabpanel" aria-labelledby="users-tab">
        <p>Below is the list of registered users:</p>
        <DataTable
          v-model:selection="selectedUser"
          :value="users"
          responsiveLayout="scroll"
          showGridlines
          paginator
          :rows="5"
          :rowsPerPageOptions="[5, 10, 20, 50]"
          dataKey="id"
          tableStyle="min-width: 50rem"
        >
          <template v-for="field in userFields" :key="field">
            <Column :field="field" :header="getHeader(field)" />
          </template>
          <Column field="subscribe" header="Subscribed">
            <template #body="slotProps">
              <i v-if="slotProps.data.subscribe" class="pi pi-check" style="color: green"></i>
              <span v-else>-</span>
            </template>
          </Column>
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
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'

import Column from 'primevue/column'
import Rating from 'primevue/rating'

// import ColumnGroup from 'primevue/columngroup' // optional
// import Row from 'primevue/row'

const users = ref([])
const userFields = ['fullName', 'email', 'phoneNumber', 'dob', 'gender', 'role', 'postcode']
const donationFields = ['role', 'name', 'date', 'email', 'phone', 'amount', 'city']
const getHeader = (field) => {
  // Convert camelCase to Title Case
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

onMounted(() => {
  users.value = JSON.parse(localStorage.getItem('users')) || []
  donationData.value = JSON.parse(localStorage.getItem('donations')) || []
})

const removeUser = (user) => {
  const index = users.value.findIndex((u) => u.email === user.email)
  if (index !== -1) {
    users.value.splice(index, 1)
    localStorage.setItem('users', JSON.stringify(users.value))
  }
}
const donationData = ref([])
const donationFilter = ref('')
const selectedDonation = ref(null)

// Computed property to filter donations based on selected filter
const filteredDonations = computed(() => {
  if (!donationFilter.value) {
    return donationData.value // Show all donations if no filter is selected
  }
  return donationData.value.filter((donation) => donation.role === donationFilter.value)
})

const averageRating = computed(() => {
  if (donationData.value.length === 0) return null
  const sum = donationData.value.reduce((acc, donation) => acc + parseInt(donation.rating), 0)
  return sum / donationData.value.length
})

// Function to remove selected donation
const removeDonation = () => {
  if (selectedDonation.value) {
    const index = donationData.value.indexOf(selectedDonation.value)
    if (index !== -1) {
      donationData.value.splice(index, 1)
      localStorage.setItem('donations', JSON.stringify(donationData.value))
      selectedDonation.value = null // Clear selection after removal
    }
  } else {
    alert('Please select a donation to remove.')
  }
}
</script>

<style scoped>
.manager-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.logout-btn {
  padding: 8px 16px;
  background-color: #923c22;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #d3372fcf;
}

.nav-tabs {
  margin-bottom: 20px;
}

.nav-link {
  color: #555;
}

.nav-link.active {
  font-weight: bold;
}

.tab-content {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
}

.filter-dropdown {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 15px;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  text-align: left;
  padding-left: 0.5rem;
  vertical-align: middle;
}

.remove-btn {
  background-color: #b952df;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #cdb6e5;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .manager-container {
    padding: 10px;
  }

  .nav-tabs {
    flex-wrap: wrap;
  }

  .nav-item {
    flex: 0 0 100%;
    margin-bottom: 10px;
  }
}
</style>
