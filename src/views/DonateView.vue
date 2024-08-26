<template>
  <div class="donate">
    <AppHeader />
    <h1 class="text-start">Support Our Mission</h1>
    <p class="lead text-start">
      Your donation plays a crucial role in providing free mental health resources and support to
      those who need it the most. Together, we can make a difference in the lives of countless
      individuals and communities.
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

    <p class="text-start">
      Choose how you'd like to contribute and help us continue our mission to spread awareness and
      provide much-needed services.
    </p>

    <div class="donation-tabs mt-5">
      <ul class="nav nav-tabs" id="donationTab" role="tablist">
        <!-- Tab for Individual Donation -->
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: isIndividualSelected }"
            id="individual-tab"
            data-bs-toggle="tab"
            data-bs-target="#individual"
            type="button"
            role="tab"
            aria-controls="individual"
            aria-selected="isIndividualSelected"
            @click="isIndividualSelected = true"
          >
            Individual Donation
          </button>
        </li>

        <!-- Tab for Organisation Donation -->
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            :class="{ active: !isIndividualSelected }"
            id="organisation-tab"
            data-bs-toggle="tab"
            data-bs-target="#organisation"
            type="button"
            role="tab"
            aria-controls="organisation"
            aria-selected="!isIndividualSelected"
            @click="isIndividualSelected = false"
          >
            Organisation Donation
          </button>
        </li>
      </ul>

      <div class="tab-content mt-4" id="donationTabContent">
        <!-- Individual Donation Form -->
        <div
          v-if="isIndividualSelected"
          class="tab-pane fade show active"
          id="individual"
          role="tabpanel"
          aria-labelledby="individual-tab"
        >
          <h3>Donate as an Individual</h3>
          <p>
            Your contribution as an individual can make a significant impact. Every bit counts, and
            we greatly appreciate your generosity.
          </p>
          <DonateForm :formType="'individual'" />
        </div>

        <!-- Organisation Donation Form -->
        <div
          v-else
          class="tab-pane fade show active"
          id="organisation"
          role="tabpanel"
          aria-labelledby="organisation-tab"
        >
          <h3>Donate as an Organisation</h3>
          <p>
            Support us as an organisation and help us expand our reach. Your partnership can enable
            us to touch more lives and make a broader impact.
          </p>
          <DonateForm :formType="'organisation'" />
        </div>
      </div>
    </div>
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
  data() {
    return {
      isIndividualSelected: true
    }
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
