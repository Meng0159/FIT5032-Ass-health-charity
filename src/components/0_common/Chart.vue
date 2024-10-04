<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
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
import { onMounted, ref } from 'vue'

// Register the necessary components for a bar chart
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  }
})

// Create a reference for the chart canvas
const chartCanvas = ref(null)
let chartInstance = null

// Function to create the chart
const createChart = () => {
  if (chartInstance) {
    chartInstance.destroy() // Destroy the previous instance to avoid memory leaks
  }

  chartInstance = new Chart(chartCanvas.value.getContext('2d'), {
    type: 'bar',
    data: props.chartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true, // Start y-axis at 0
          min: 0, // Minimum value of 0
          max: 500, // Maximum value of 500
          ticks: {
            stepSize: 50 // Set interval to 50
          }
        }
      }
    }
  })
}

onMounted(() => {
  createChart() // Create chart when the component is mounted
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 400px;
  width: 100%;
}
</style>
