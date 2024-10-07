<template>
  <div class="admin-dashboard">
    <h1>System Admin Dashboard</h1>
    <div class="d-flex align-items-center justify-content-end">
      <router-link to="/" class="logout-btn">Logout</router-link>
    </div>

    <div class="table-section">
      <h2>Donation and User Management</h2>
      <manager-table />
    </div>

    <!-- Overview Section -->
    <div class="overview-section">
      <h2>Overview Chart</h2>
      <!-- User Role Chart -->
      <Chart />
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
// import { collection, getDocs } from 'firebase/firestore'
// import db from '../components/4_firebase/init.js'
import Chart from '@/components/0_common/Chart.vue' // Chart component
import ManagerTable from '@/components/8_security/managerTable.vue' // Manager Table component

// eslint-disable-next-line no-unused-vars

// const chartData = ref({
//   labels: [],
//   datasets: [
//     {
//       label: 'Number of Users',
//       backgroundColor: ['#42A5F5', '#66BB6A'],
//       data: []
//     }
//   ]
// })

// Function to fetch users from Firestore and group by researcher/member role
// const fetchUserData = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'users'))
//     const userTypes = { researcher: 0, member: 0 } // Track only these two roles

//     querySnapshot.forEach((doc) => {
//       const user = doc.data()
//       if (user.role in userTypes) {
//         userTypes[user.role] += 1 // Increment the count based on the role
//       }
//     })

//     // Update chart data
//     chartData.value.labels = Object.keys(userTypes)
//     chartData.value.datasets[0].data = Object.values(userTypes)
//     console.log(chartData.value.datasets[0].data)
//   } catch (error) {
//     console.error('Error fetching user data:', error)
//   }
// }

// Fetch data when component is mounted
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
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

.overview-section {
  margin-bottom: 50px;
}

.table-section {
  margin-top: 30px;
}
</style>
