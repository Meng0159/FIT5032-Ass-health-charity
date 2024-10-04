<template>
  <div class="my-account">
    <AppHeader />

    <!-- Display User Info -->
    <h2>Your role is "{{ role }}"</h2>
    <p v-for="field in userFields" :key="field">
      <strong>{{ field }}:</strong> {{ userData[field] }}
    </p>

    <!-- Researcher: Show Publications / Non-Researcher: Show Event Registrations -->
    <div v-if="isResearcher">
      <h3>Your Publications</h3>
      <DataTable :value="tableData">
        <Column field="topic" header="Topic" />
        <Column field="institute" header="Institute" />
        <Column field="keywords" header="Keywords" />
        <Column field="date" header="Publication Date" />
      </DataTable>
    </div>
    <div v-else>
      <h3>Your Event Registrations</h3>
      <DataTable :value="tableData">
        <Column field="formattedRegisDate" header="Registered Date" />
        <Column field="eventTitle" header="Event Name" />
        <Column field="formattedEventDate" header="Event Date" />
        <Column field="formattedEventTime" header="Time" />
        <Column field="location" header="Location" />
        <Column header="Actions">
          <template #body="slotProps">
            <button @click="unregisterEvent(slotProps.data.id)">Unregister</button>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Export buttons -->
    <div>
      <button @click="exportAsPDF">Export as PDF</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import db from '../components/4_firebase/init.js'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'

import { jsPDF } from 'jspdf'
import AppHeader from '@/components/0_common/AppHeader.vue'

// Fetch current user data from localStorage
const currentUser = JSON.parse(localStorage.getItem('currentUser'))

// Reactive state for role and user info
const role = ref('')
const isResearcher = ref(currentUser.isResearcher)
const userData = ref({})
const userFields = ['fullName', 'email', 'phoneNumber', 'dob', 'gender', 'country', 'postcode']
const tableData = ref([])

// Fetch user data from Firestore
const fetchUserData = async () => {
  const userDocRef = doc(db, 'users', currentUser.uid)
  const userDoc = await getDoc(userDocRef)
  if (userDoc.exists()) {
    userData.value = userDoc.data()
    role.value = userDoc.data().role // Assuming role is stored in the user doc
  }
}

// Fetch either publications or event registrations based on role
const fetchTableData = async () => {
  if (isResearcher.value) {
    const publicationsQuery = query(
      collection(db, 'publications'),
      where('userId', '==', currentUser.uid)
    )
    const querySnapshot = await getDocs(publicationsQuery)
    tableData.value = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        ...data,
        id: doc.id, // Include the document ID
        date: data.date.toDate().toLocaleDateString() // Format as date
      }
    })
  } else {
    const eventsQuery = query(
      collection(db, 'eventRegistrations'),
      where('userId', '==', currentUser.uid)
    )
    const querySnapshot = await getDocs(eventsQuery)
    tableData.value = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      const dateObject1 = data.registeredAt.toDate()
      const dateObject2 = data.eventDate.toDate()

      return {
        ...data,
        id: doc.id, // Include the document ID
        formattedRegisDate: dateObject1.toLocaleDateString('en-GB'), // Format as date
        formattedEventDate: dateObject2.toLocaleDateString('en-GB'), // Format as date
        formattedEventTime: dateObject2.toLocaleTimeString('en-GB') // Format as time
      }
    })
  }
}
// Unregister event function (remove from Firestore)
const unregisterEvent = async (eventId) => {
  try {
    await deleteDoc(doc(db, 'eventRegistrations', eventId))
    tableData.value = tableData.value.filter((event) => event.id !== eventId)
    alert('You have successfully unregistered from the event.')
  } catch (error) {
    console.error('Error unregistering from event:', error)
    alert('An error occurred while unregistering. Please try again.')
  }
}

// Export table data as PDF
const exportAsPDF = () => {
  const doc = new jsPDF()
  let content = ``
  if (isResearcher.value) {
    content = 'Publications: \n'
    tableData.value.forEach((item) => {
      content += `${item.title} - ${item.institute} \n`
    })
  } else {
    content = 'Event Registrations: \n'
    tableData.value.forEach((item) => {
      content += `${item.eventName} - ${item.date} \n`
    })
  }

  doc.text(content, 10, 10)
  doc.save('account-data.pdf')
}

// On component mount, fetch user and table data
onMounted(async () => {
  await fetchUserData()
  await fetchTableData()
})
</script>
