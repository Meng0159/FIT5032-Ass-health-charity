<template>
  <div class="manager-container">
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
        <div class="row">
          <p class="col-auto">Below is the list of donations:</p>
          <div class="col-auto pagination-controls">
            <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totaldonationPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totaldonationPages">Next</button>
          </div>
        </div>
        <!-- Add a search bar for donations -->
        <div class="row">
          <div class="filter-section col-auto">
            <label for="donationFilter" class="col-auto">Filter Donations:</label>
            <select
              v-model="donationRoleFilter"
              id="donationFilter"
              class="col-auto filter-dropdown"
            >
              <option value="">All Donations</option>
              <option value="individual">Individual</option>
              <option value="organisation">Organisation</option>
            </select>
          </div>
          <div class="col-auto justify-content-between">
            <label for="donationFilter" class="col-auto">Filter by Amount </label>
            <select v-model="amountRange" @change="filterByAmount" class="col-auto amount-filter">
              <option value="">Select Amount Range</option>
              <option value="<100">&lt; 100</option>
              <option value="100-500">100 - 500</option>
              <option value=">500">&gt; 500</option>
            </select>
            <label for="donationFilter" class="col-auto">Search by </label>
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="Search by keyword"
              class="col-auto search-bar"
            />
            <button @click="searchInDonation" class="btn btn-primary search-btn">Search</button>
          </div>
        </div>
        <!-- update with search and amount filter -->
        <DataTable
          v-model:selection="selectedDonations"
          :value="searchResults.length ? searchResults : filteredDonations"
          selectionMode="multiple"
          responsiveLayout="scroll"
          :rowClass="selectRow"
        >
          <Column selectionMode="multiple" headerStyle="width: 3rem" />
          <template v-for="field in donationFields" :key="field">
            <Column :field="field" :header="getHeader(field)" />
          </template>
          <Column field="donate-rating" header="Review Rate">
            <template #body="slotProps">
              <Rating :modelValue="slotProps.data.rating" readonly /> </template
          ></Column>
        </DataTable>
        <div class="d-flex justify-content-between">
          <button @click="sendBulkEmail" class="col-3 send-btn">Send Feedback Survey</button>
          <div class="rating col-auto d-flex justify-content-between" v-if="averageRating !== null">
            <span>Overall donationers experience rating:</span>
            <div class="stars">
              <span
                v-for="i in 5"
                :key="i"
                class="star"
                :class="{ filled: i <= Math.floor(averageRating) }"
              >
                ★
              </span>
              <span v-if="averageRating % 1 >= 0.5" class="star half-filled">★</span>
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
          :value="filteredUsers"
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
              <button @click="editUser(slotProps.data)" class="edit-btn">Update</button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>

  <!-- Modal for Editing User Info -->
  <div v-if="isModalVisible" class="modal-overlay">
    <div class="modal-container">
      <h3>Edit User Info</h3>

      <div class="form-group">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          v-model="newPhoneNumber"
          class="form-control"
          placeholder="Enter new phone number"
        />
      </div>

      <div class="form-group">
        <label for="postcode">Postcode</label>
        <input
          type="text"
          id="postcode"
          v-model="newPostcode"
          class="form-control"
          placeholder="Enter new postcode"
        />
      </div>

      <div class="modal-actions">
        <button @click="saveUserUpdates" class="save-btn">Save</button>
        <button @click="cancelEdit" class="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Rating from 'primevue/rating'
import db from '@/components/4_firebase/init.js'
import {
  doc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getCountFromServer
} from 'firebase/firestore'

const userFields = ['fullName', 'email', 'phoneNumber', 'dob', 'gender', 'role', 'postcode']
const donationFields = ['role', 'name', 'date', 'email', 'phone', 'amount', 'city']
const getHeader = (field) => {
  // Convert camelCase to Title Case
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

const currentPage = ref(1)
const donationsPerPage = 10 // Number of donations per page
const totalDonations = ref(0) // Track total number of donations
// Computed property to get total number of pages
const totaldonationPages = computed(() => {
  // console.log('page:', currentPage.value, 'total donate num:', totalDonations.value)
  return Math.ceil(totalDonations.value / donationsPerPage)
})

// Function to go to the next page
const nextPage = () => {
  currentPage.value++
  fetchDonationData()
}

// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchDonationData()
  }
}

// Average rating computed property
const averageRating = computed(() => {
  if (donationData.value.length === 0) return null
  const total = donationData.value.reduce(
    (sum, donation) => sum + parseInt(donation.rating || 0),
    0
  )
  console.log(
    'avg:',
    total / donationData.value.length,
    'donationData.value.length:',
    donationData.value.length
  )
  return total / donationData.value.length
})

const donationData = ref([])
const donationRoleFilter = ref('')
const selectedDonations = ref(null)
const amountRange = ref('') // Store selected amount range
const searchKeyword = ref('')

// Function to fetch donation data
const fetchDonationData = async () => {
  try {
    // Calculate the offset for pagination
    let donationQuery

    if (currentPage.value === 1) {
      // For the first page, set a simple query
      donationQuery = query(collection(db, 'donations'), orderBy('name'), limit(donationsPerPage))
    } else {
      // If not the first page, calculate offset
      const previousPageDocs = await getDocs(
        query(
          collection(db, 'donations'),
          orderBy('name'),
          limit((currentPage.value - 1) * donationsPerPage)
        )
      )
      const lastVisible = previousPageDocs.docs[previousPageDocs.docs.length - 1]
      donationQuery = query(
        collection(db, 'donations'),
        orderBy('name'),
        startAfter(lastVisible),
        limit(donationsPerPage)
      )
    }

    // Apply amount filter if selected
    if (amountRange.value) {
      const qDonation = collection(db, 'donations')
      if (amountRange.value === '<100') {
        donationQuery = query(qDonation, where('amount', '<', '100'))
      } else if (amountRange.value === '100-500') {
        donationQuery = query(qDonation, where('amount', '>=', '100'), where('amount', '<=', '500'))
      } else if (amountRange.value === '>500') {
        donationQuery = query(qDonation, where('amount', '>', '500'))
      }
    }

    // Execute the query
    const querySnapshot = await getDocs(donationQuery)
    donationData.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

    // Fetch total count of donations
    const coll = collection(db, 'donations')
    const snapshot = await getCountFromServer(coll)
    totalDonations.value = snapshot.data().count // Set total count
  } catch (error) {
    console.error('Error fetching donations: ', error)
  }
}

onMounted(() => {
  fetchDonationData()
  fetchUserData()
})

const filterByAmount = async () => {
  await fetchDonationData(true) // Reset to the first page and fetch data
}

const searchResults = ref([])

const searchInDonation = async () => {
  try {
    const keyword = searchKeyword.value.toLowerCase()

    // If no keyword, reset to full donationData
    if (!keyword) {
      searchResults.value = donationData.value
      return
    }

    // Filter the donations based on name, email, or city
    const filteredResults = donationData.value.filter((donation) => {
      return (
        donation.name.toLowerCase().includes(keyword) ||
        donation.email.toLowerCase().includes(keyword) ||
        donation.city.toLowerCase().includes(keyword)
      )
    })
    searchResults.value = filteredResults // Update the search results
  } catch (error) {
    console.error('Error searching donations:', error)
  }
}

// Computed property to filter donations based on donationRoleFilter selection
// Computed property to filter donations based on donationRoleFilter selection
const filteredDonations = computed(() => {
  if (!donationRoleFilter.value) {
    return donationData.value // Show all donations if no filter is selected
  }
  return donationData.value.filter((donation) => donation.role === donationRoleFilter.value)
})

// Function to send bulk email to selected donations
const sendBulkEmail = async () => {
  const emails = selectedDonations.value.map((donation) => donation.email)

  // Prepare the email details
  const emailDetails = {
    emails: emails,
    subject: 'Your Survey Subject Here', // Set your email subject
    text: 'Your survey text here.', // Set your email text
    html: '<strong>Your survey HTML content here.</strong>' // Set your email HTML
  }

  try {
    const response = await fetch('https://e04c-103-224-53-141.ngrok-free.app/api/send-bulkEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailDetails)
    })

    if (response.ok) {
      alert('Bulk email sent successfully')
      console.log('Survay email sent to:', emails)
    } else {
      console.error('Failed to send bulk email')
    }
  } catch (error) {
    console.error('Error sending bulk email:', error)
  }
}

const users = ref([])
// Function to fetch user data
const fetchUserData = async () => {
  const qUser = query(collection(db, 'users'), orderBy('fullName'))
  const queryUserSnapshot = await getDocs(qUser)
  const usersArray = []
  queryUserSnapshot.forEach((doc) => {
    usersArray.push({ id: doc.id, ...doc.data() })
  })
  users.value = usersArray
}

// interactive functions for user table
const isModalVisible = ref(false)
const editedUser = ref({}) // Store the user being edited
const newPhoneNumber = ref('')
const newPostcode = ref('')

const filteredUsers = computed(() => {
  if (!searchKeyword.value) return users.value
  return users.value.filter((user) =>
    Object.values(user).some((val) =>
      String(val).toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  )
})

const editUser = (user) => {
  editedUser.value = { ...user } // Store the current user data
  newPhoneNumber.value = user.phoneNumber // Prefill phone number
  newPostcode.value = user.postcode // Prefill postcode
  isModalVisible.value = true // Show modal
}

// Function to save changes to Firestore
const saveUserUpdates = async () => {
  try {
    const userRef = doc(db, 'users', editedUser.value.id)
    await updateDoc(userRef, {
      phoneNumber: newPhoneNumber.value,
      postcode: newPostcode.value
    })
    // Update local users list after saving
    const userIndex = users.value.findIndex((user) => user.id === editedUser.value.id)
    if (userIndex !== -1) {
      users.value[userIndex].phoneNumber = newPhoneNumber.value
      users.value[userIndex].postcode = newPostcode.value
    }
    isModalVisible.value = false // Close modal after save
  } catch (error) {
    console.error('Error updating user: ', error)
  }
}

// Function to cancel the update
const cancelEdit = () => {
  isModalVisible.value = false // Close modal without saving
}
</script>

<style scoped>
.manager-container {
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
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

/* Ensure DataTable occupies full width and has proper border and spacing */
:deep(.p-datatable) {
  width: 100%;
  border-collapse: collapse;
}

/* Styling for table cells and headers */
:deep(.p-datatable .p-datatable-tbody > tr > td) {
  text-align: left;
  padding: 0.5rem;
  vertical-align: middle;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f1f1f1;
  border-bottom: 2px solid #ddd;
  padding: 0.5rem;
  text-align: left;
}

/* More specific CSS selector to target the DataTable rows */
.p-datatable .p-datatable-tbody > tr.selected-row {
  background-color: #e0f7fa !important; /* Light cyan background */
  color: #006064 !important; /* Dark cyan text color */
}

/* Ensuring the row is highlighted even when focused */
.p-datatable .p-datatable-tbody > tr.selected-row:focus {
  background-color: #b2ebf2 !important; /* Slightly darker cyan */
}
/* Radio button styles */

.p-radiobutton-icon {
  border: 2px solid #333;
  visibility: visible;
}

.remove-btn {
  background-color: #df52a2;
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

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-btn,
.cancel-btn {
  padding: 8px 16px;
  cursor: pointer;
}

.save-btn {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
}

.cancel-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
}
.star {
  font-size: 24px; /* Adjust star size */
  color: #ccc; /* Default color for stars */
}

.filled {
  color: gold; /* Color for filled stars */
}

.half-filled {
  color: gold; /* Color for the half star */
  width: 50%; /* Adjust width for half */
  display: inline-block;
  overflow: hidden;
  position: relative;
}
</style>
