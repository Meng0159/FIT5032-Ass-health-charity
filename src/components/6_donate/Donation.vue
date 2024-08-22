<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-5">
    <h1 class="mb-4">Donate</h1>
    <form @submit.prevent="submitDonation">
      <!-- Donation Amount Section -->
      <div class="row">
        <div class="col-md-5">
          <label class="form-label">Donation Amount:</label>
          <div class="btn-group" role="group" aria-label="Donation amount">
            <input
              type="radio"
              class="btn-check"
              name="amount"
              id="amount50"
              value="50"
              v-model="amount"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="amount50">$50</label>

            <input
              type="radio"
              class="btn-check"
              name="amount"
              id="amount100"
              value="100"
              v-model="amount"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="amount100">$100</label>

            <input
              type="radio"
              class="btn-check"
              name="amount"
              id="amount150"
              value="150"
              v-model="amount"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="amount150">$150</label>

            <input
              type="radio"
              class="btn-check"
              name="amount"
              id="amount200"
              value="200"
              v-model="amount"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="amount200">$200</label>
          </div>
        </div>

        <div class="col-md-7">
          <label for="customAmount" class="form-label">Or Enter Custom Amount:</label>
          <input
            type="text"
            class="form-control"
            id="customAmount"
            v-model="customAmount"
            placeholder="Custom Amount"
          />
        </div>
      </div>

      <!-- User Details Section -->
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName" class="form-label">First Name:</label>
          <input type="text" class="form-control" id="firstName" v-model="firstName" required />
        </div>
        <div class="col-md-6 mb-3">
          <label for="lastName" class="form-label">Last Name:</label>
          <input type="text" class="form-control" id="lastName" v-model="lastName" required />
        </div>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email:</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>

      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number:</label>
        <input type="tel" class="form-control" id="phone" v-model="phone" />
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">Address:</label>
        <input type="text" class="form-control" id="address" v-model="address" required />
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="city" class="form-label">City:</label>
          <input type="text" class="form-control" id="city" v-model="city" required />
        </div>
        <div class="col-md-3 mb-3">
          <label for="state" class="form-label">State:</label>
          <select class="form-select" id="state" v-model="state" required>
            <option value="state1">State 1</option>
            <option value="state2">State 2</option>
          </select>
        </div>
      </div>

      <!-- Review Rating Section -->
      <div class="mb-3">
        <label class="form-label">Rate Your Experience:</label>
        <div class="btn-group" role="group" aria-label="Review rating">
          <input
            type="radio"
            class="btn-check"
            name="rating"
            id="rating1"
            value="1"
            v-model="rating"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="rating1">1</label>

          <input
            type="radio"
            class="btn-check"
            name="rating"
            id="rating2"
            value="2"
            v-model="rating"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="rating2">2</label>

          <input
            type="radio"
            class="btn-check"
            name="rating"
            id="rating3"
            value="3"
            v-model="rating"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="rating3">3</label>

          <input
            type="radio"
            class="btn-check"
            name="rating"
            id="rating4"
            value="4"
            v-model="rating"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="rating4">4</label>

          <input
            type="radio"
            class="btn-check"
            name="rating"
            id="rating5"
            value="5"
            v-model="rating"
            autocomplete="off"
          />
          <label class="btn btn-outline-primary" for="rating5">5</label>
        </div>
      </div>

      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="terms" v-model="terms" required />
        <label class="form-check-label" for="terms">I agree to the terms and conditions</label>
      </div>

      <button type="submit" class="btn btn-primary">Donate Now</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const amount = ref('')
const customAmount = ref('')
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const address = ref('')
const city = ref('')
const state = ref('')
const rating = ref('')
const terms = ref(false)

const submitDonation = () => {
  const donationData = {
    amount: customAmount.value || amount.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    address: address.value,
    city: city.value,
    state: state.value,
    rating: rating.value,
    terms: terms.value
  }

  // Retrieve existing donations from local storage
  let donations = JSON.parse(localStorage.getItem('donations')) || []

  // Add the new donation data
  donations.push(donationData)

  // Save updated donations back to local storage
  localStorage.setItem('donations', JSON.stringify(donations))

  alert('Thank you for your donation!')

  // Optionally, clear the form fields
  resetForm()
}

const resetForm = () => {
  amount.value = ''
  customAmount.value = ''
  firstName.value = ''
  lastName.value = ''
  email.value = ''
  phone.value = ''
  address.value = ''
  city.value = ''
  state.value = ''
  rating.value = ''
  terms.value = false
}
</script>
