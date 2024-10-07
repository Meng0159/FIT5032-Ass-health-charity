<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chart-container">
    <h3>Total registration users: {{ totalUsers }}</h3>
    <canvas ref="userChartCanvas"></canvas>
    <!-- User roles chart -->
    <h2>Monthly Donation distributions</h2>
    <canvas ref="donationChartCanvas"></canvas>
    <!-- Monthly donation chart -->
  </div>
</template>

<script setup>
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js'
import { ref, onMounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import db from '../4_firebase/init.js'

// Register the necessary Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip)

const userChartCanvas = ref(null)
const donationChartCanvas = ref(null)
let userChartInstance = null
let donationChartInstance = null

// Chart data for user roles (researcher/member)
const userChartData = ref({
  labels: [],
  datasets: [
    {
      label: 'User Types',
      data: [],
      backgroundColor: ['#42A5F5', '#66BB6A']
    }
  ]
})

// Chart data for monthly donation amounts
const donationChartData = ref({
  labels: [], // Months
  datasets: [
    {
      label: 'Monthly Donations',
      data: [],
      backgroundColor: '#FF6384'
    }
  ]
})

// Function to create the user role chart
const createUserChart = () => {
  if (userChartInstance) {
    userChartInstance.destroy() // Destroy previous instance to avoid memory leaks
  }

  userChartInstance = new Chart(userChartCanvas.value.getContext('2d'), {
    type: 'bar',
    data: userChartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 500,
          ticks: {
            stepSize: 50
          }
        }
      }
    }
  })
}

// Function to create the monthly donation chart
const createDonationChart = () => {
  if (donationChartInstance) {
    donationChartInstance.destroy() // Destroy previous instance to avoid memory leaks
  }

  donationChartInstance = new Chart(donationChartCanvas.value.getContext('2d'), {
    type: 'bar',
    data: donationChartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          max: 3000, // Adjust based on expected donations
          ticks: {
            stepSize: 250
          }
        }
      }
    }
  })
}

const totalUsers = ref(0)
// Function to fetch users from Firestore and group by researcher/member role
const fetchUserData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const userTypes = { researcher: 0, member: 0 } // Track only these two roles

    querySnapshot.forEach((doc) => {
      const user = doc.data()
      if (user.role in userTypes) {
        userTypes[user.role] += 1 // Increment the count based on the role
      }
    })

    // Update user chart data
    totalUsers.value = Object.values(userTypes).reduce((acc, count) => acc + count, 0)
    userChartData.value.labels = Object.keys(userTypes)
    userChartData.value.datasets[0].data = Object.values(userTypes)
    createUserChart() // Render the user chart
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

// Function to fetch donations from Firestore and group by month
const fetchDonationData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'donations'))
    const monthlyDonations = {}

    // Predefine the month order
    const monthOrder = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    querySnapshot.forEach((doc) => {
      const donation = doc.data()
      const donationDate = new Date(donation.date) // Assuming donation.date is a valid timestamp or date string
      if (isNaN(donationDate)) return // Skip if date is invalid
      const month = donationDate.toLocaleString('default', { month: 'long' }) // Get month name

      if (!monthlyDonations[month]) {
        monthlyDonations[month] = 0
      }
      monthlyDonations[month] += parseFloat(donation.amount) || 0 // Sum the donations for each month
    })

    // Sort months based on predefined month order
    const sortedMonths = monthOrder.filter((month) => monthlyDonations[month])

    // Update donation chart data
    donationChartData.value.labels = monthOrder
    donationChartData.value.datasets[0].data = sortedMonths.map(
      (month) => monthlyDonations[month] || 0
    )
    createDonationChart() // Render the donation chart
  } catch (error) {
    console.error('Error fetching donation data:', error)
  }
}

// Fetch the data when the component is mounted
onMounted(() => {
  fetchUserData() // Fetch and display user role data
  fetchDonationData() // Fetch and display monthly donation data
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
  margin-bottom: 40px; /* Add spacing between the charts */
}
</style>
