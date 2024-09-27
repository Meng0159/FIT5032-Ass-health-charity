<template>
  <div class="container mt-5">
    <!-- <h1 class="mb-4">Donate Now</h1> -->
    <form @submit.prevent="submitDonation">
      <!-- Donation Amount Section -->
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3 row align-items-start">
            <label class="col-auto form-label">Donation Amount:</label>
            <div class="col-auto btn-group" role="group" aria-label="Donation amount">
              <input
                type="radio"
                class="btn-check"
                name="amount"
                id="amount50"
                value="50"
                v-model="donationFields.amount"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="amount50">$50</label>

              <input
                type="radio"
                class="btn-check"
                name="amount"
                id="amount100"
                value="100"
                v-model="donationFields.amount"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="amount100">$100</label>

              <input
                type="radio"
                class="btn-check"
                name="amount"
                id="amount150"
                value="150"
                v-model="donationFields.amount"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="amount150">$150</label>

              <input
                type="radio"
                class="btn-check"
                name="amount"
                id="amount200"
                value="200"
                v-model="donationFields.amount"
                autocomplete="off"
              />
              <label class="btn btn-outline-primary" for="amount200">$200</label>
            </div>
            <div v-if="errors.amount" class="text-danger">{{ errors.amount }}</div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="mb-3 row align-items-start">
            <label for="customAmount" class="col-auto form-label">Or Custom Amount:</label>
            <div class="col-auto">
              <div class="input-group">
                <span class="input-group-text">$</span>
                <input
                  type="text"
                  class="form-control"
                  id="customAmount"
                  v-model="donationFields.customAmount"
                  placeholder="Custom Amount"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Details Section -->
      <div v-if="formType === 'individual'" class="row">
        <div class="col-md-6 mb-3">
          <label for="firstName" class="form-label">First Name:</label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="donationFields.firstName"
            required
          />
          <div v-if="errors.firstName" class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="lastName" class="form-label">Last Name:</label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="donationFields.lastName"
            required
          />
          <div v-if="errors.lastName" class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
      </div>

      <div v-else-if="formType === 'organisation'" class="row">
        <div class="col-md-6 mb-3">
          <label for="orgName" class="form-label">Organisation Name:</label>
          <input
            type="text"
            class="form-control"
            id="orgName"
            v-model="donationFields.orgName"
            required
          />
          <div v-if="errors.orgName" class="invalid-feedback">{{ errors.orgName }}</div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="contactName" class="form-label">Contact Name:</label>
          <input
            type="text"
            class="form-control"
            id="contactName"
            v-model="donationFields.contactName"
            required
          />
          <div v-if="errors.contactName" class="invalid-feedback">{{ errors.contactName }}</div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="email" class="form-label">Email:</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="donationFields.email"
            @blur="validateEmail"
          />
          <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
        </div>

        <div class="col-md-6 mb-3">
          <label for="phone" class="form-label">Phone Number:</label>
          <input
            type="tel"
            class="form-control"
            id="phone"
            v-model="donationFields.phone"
            @blur="validatePhoneNumber"
          />
          <div v-if="errors.phoneNumber" class="text-danger">{{ errors.phoneNumber }}</div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 mb-3">
          <label for="postCode" class="form-label">Post Code:</label>
          <input
            type="text"
            class="form-control"
            id="postCode"
            v-model="donationFields.postCode"
            @blur="validatePostCode"
          />
          <div v-if="errors.postCode" class="text-danger">{{ errors.postCode }}</div>
        </div>
        <div class="col-md-4 mb-3">
          <label for="city" class="form-label">City:</label>
          <input type="text" class="form-control" id="city" v-model="donationFields.city" />
        </div>
        <div class="col-md-4 mb-3">
          <label for="state" class="form-label">State:</label>
          <select class="form-select" id="state" v-model="donationFields.state" required>
            <option value="state1">New South Wales</option>
            <option value="state2">Victoria</option>
            <option value="state3">Queensland</option>
            <option value="state4">Western Australia</option>
            <option value="state5">South Australia</option>
            <option value="state6">Tasmania</option>
          </select>
        </div>
      </div>

      <!-- Review Rating Section -->
      <div class="mb-3 row align-items-end">
        <label class="col-auto form-label">Rate Your Experience:</label>
        <div class="col-auto">
          <div class="btn-group" role="group" aria-label="Review rating">
            <input
              type="radio"
              class="btn-check"
              name="rating"
              id="rating1"
              value="1"
              v-model="donationFields.rating"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="rating1">1</label>

            <input
              type="radio"
              class="btn-check"
              name="rating"
              id="rating2"
              value="2"
              v-model="donationFields.rating"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="rating2">2</label>

            <input
              type="radio"
              class="btn-check"
              name="rating"
              id="rating3"
              value="3"
              v-model="donationFields.rating"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="rating3">3</label>

            <input
              type="radio"
              class="btn-check"
              name="rating"
              id="rating4"
              value="4"
              v-model="donationFields.rating"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="rating4">4</label>

            <input
              type="radio"
              class="btn-check"
              name="rating"
              id="rating5"
              value="5"
              v-model="donationFields.rating"
              autocomplete="off"
            />
            <label class="btn btn-outline-primary" for="rating5">5</label>
          </div>
        </div>
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="terms"
          v-model="donationFields.terms"
          required
        />
        <label class="form-check-label" for="terms">I agree to the terms and conditions</label>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">Donate Now</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import axios from 'axios'

const db = getFirestore()

const props = defineProps({
  formType: {
    type: String,
    default: '',
    validator: (value) => ['individual', 'organisation'].includes(value)
  }
})

const formType = ref(props.formType) // 'individual' or 'organisation'

const donationFields = ref({
  amount: '',
  customAmount: '',
  firstName: '',
  lastName: '',
  orgName: '',
  contactName: '',
  email: '',
  phone: '',
  postCode: '',
  city: '',
  state: '',
  rating: '',
  terms: false
})

const errors = ref({
  amount: null,
  firstName: null,
  lastName: null,
  orgName: null,
  contactName: null,
  email: null,
  phoneNumber: null,
  postCode: null
})

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(donationFields.value.email)) {
    errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

const validatePhoneNumber = () => {
  const phonePattern = /^\d{10}$/
  if (!phonePattern.test(donationFields.value.phone)) {
    errors.value.phoneNumber = 'Please enter a valid phone number.'
  } else {
    errors.value.phoneNumber = null
  }
}

const validatePostCode = () => {
  const postCodePattern = /^\d{4}$/
  if (!postCodePattern.test(donationFields.value.postCode)) {
    errors.value.postCode = 'Please enter a valid 4-digit postcode.'
  } else {
    errors.value.postCode = null
  }
}

const validateAmount = () => {
  if (!donationFields.value.amount && !donationFields.value.customAmount) {
    errors.value.amount = 'Please select or enter a donation amount.'
  } else {
    errors.value.amount = null
  }
}

const submitDonation = async () => {
  validateAmount()
  validateEmail()
  validatePhoneNumber()
  validatePostCode()

  if (
    !errors.value.amount &&
    !errors.value.email &&
    !errors.value.phoneNumber &&
    !errors.value.postCode
  ) {
    const donationData = {
      // id: Math.floor(Math.random() * 1000),
      amount: donationFields.value.customAmount || donationFields.value.amount,
      name:
        formType.value === 'individual'
          ? `${donationFields.value.firstName} ${donationFields.value.lastName}`
          : `${donationFields.value.orgName} (${donationFields.value.contactName})`,
      email: donationFields.value.email,
      phone: donationFields.value.phone,
      city: donationFields.value.city,
      state: donationFields.value.state,
      rating: donationFields.value.rating,
      role: formType.value,
      date: new Date().toLocaleDateString()
    }
    try {
      // Add the donation data to Firestore
      await addDoc(collection(db, 'donations'), donationData)

      // Trigger Cloud Function to send the invoice email
      await axios.post('https://YOUR_CLOUD_FUNCTION_URL', {
        email: donationData.email,
        name: donationData.name,
        donationAmount: donationData.amount
      })

      alert('Thank you for your donation! Invoice has been sent to your email.')
      resetForm()
      resetForm()
    } catch (error) {
      console.error('Error saving donation: ', error)
      alert('There was an error processing your donation. Please try again.')
    }
  }
}

const resetForm = () => {
  donationFields.value = {
    amount: '',
    customAmount: '',
    firstName: '',
    lastName: '',
    orgName: '',
    contactName: '',
    email: '',
    phone: '',
    postCode: '',
    city: '',
    state: '',
    rating: '',
    terms: false
  }
}
</script>
