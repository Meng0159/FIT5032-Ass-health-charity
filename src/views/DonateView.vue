<template>
  <div class="donate">
    <AppHeader />
    <h1>Support Our Cause</h1>
    <p>
      Your donation will help us continue to provide free coding education to people around the
      world.
    </p>
    <div v-if="averageRating !== null" class="rating">
      <span>Overall experience rating:</span>
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
    <DonateForm />
  </div>
</template>

<script>
import AppHeader from '@/components/0_common/AppHeader.vue'
import DonateForm from '@/components/6_donate/DonationForm.vue'
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'DonateView',
  components: {
    AppHeader,
    DonateForm
  },
  setup() {
    const donationData = ref([])

    onMounted(() => {
      donationData.value = JSON.parse(localStorage.getItem('donations')) || []
    })

    const averageRating = computed(() => {
      if (donationData.value.length === 0) return null
      const sum = donationData.value.reduce((acc, donation) => acc + parseInt(donation.rating), 0)
      return sum / donationData.value.length
    })
    console.log(averageRating.value)

    return {
      averageRating
    }
  }
}
</script>
<style scoped>
.rating {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.stars {
  display: inline-flex;
  margin: 0 0.5rem;
}

.star {
  font-size: 1.5rem;
  color: #ccc;
}

.star.filled {
  color: #ffd700;
}

.rating-value {
  font-size: 0.9rem;
  color: #666;
}
</style>
