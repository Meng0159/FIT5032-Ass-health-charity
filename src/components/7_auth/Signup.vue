<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="register-page container py-5">
    <h2 class="text-center mb-4">Sign Up Now</h2>
    <form @submit.prevent="handleSubmit" class="mx-auto" style="max-width: 600px">
      <div class="form-group mb-3">
        <label for="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          v-model="formData.fullName"
          class="form-control"
          :class="{ 'is-invalid': errors.fullName }"
          placeholder="Enter your full name"
          required
        />
        <div v-if="errors.fullName" class="invalid-feedback">{{ errors.fullName }}</div>
      </div>

      <div class="form-group mb-3">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
          placeholder="Enter your email"
          required
        />
        <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="form-group mb-3">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          v-model="formData.phoneNumber"
          class="form-control"
          :class="{ 'is-invalid': errors.phoneNumber }"
          placeholder="Enter your phone number"
          required
        />
        <div v-if="errors.phoneNumber" class="invalid-feedback">{{ errors.phoneNumber }}</div>
      </div>

      <div class="form-group mb-3">
        <div class="row">
          <div class="col">
            <label for="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              v-model="formData.dob"
              class="form-control"
              :class="{ 'is-invalid': errors.dob }"
              required
            />
            <div v-if="errors.dob" class="invalid-feedback">{{ errors.dob }}</div>
          </div>
          <div class="col">
            <label for="gender">Gender</label>
            <select id="gender" v-model="formData.gender" class="form-control">
              <option value="" disabled>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="preferNotToSay">Prefer not to say</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group mb-3">
        <div class="row">
          <div class="col">
            <label for="country">Country</label>
            <input
              type="text"
              id="country"
              v-model="formData.country"
              class="form-control"
              :class="{ 'is-invalid': errors.country }"
              placeholder="Enter your country"
              required
            />
            <div v-if="errors.country" class="invalid-feedback">{{ errors.country }}</div>
          </div>
          <div class="col">
            <label for="postcode">Postcode</label>
            <input
              type="text"
              id="postcode"
              v-model="formData.postcode"
              class="form-control"
              :class="{ 'is-invalid': errors.postcode }"
              placeholder="Enter your postcode"
              required
            />
            <div v-if="errors.postcode" class="invalid-feedback">{{ errors.postcode }}</div>
          </div>
        </div>
      </div>

      <div class="form-group mb-3">
        <label for="role">Role</label>
        <select
          id="role"
          v-model="formData.role"
          class="form-control"
          :class="{ 'is-invalid': errors.role }"
          required
        >
          <option value="" disabled>Select your role</option>
          <option value="researcher">Researcher</option>
          <option value="member">Member</option>
        </select>
        <div v-if="errors.role" class="invalid-feedback">{{ errors.role }}</div>
      </div>

      <div class="form-group mb-3">
        <label for="password">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          @blur="() => validatePassword(true)"
          @input="() => validatePassword(false)"
          v-model="formData.password"
        />
        <div class="text-danger" v-if="errors.password">{{ errors.password }}</div>
      </div>

      <div class="form-group mb-3 form-check">
        <input
          type="checkbox"
          id="subscribe"
          v-model="formData.subscribe"
          class="form-check-input"
        />
        <label for="subscribe" class="form-check-label">Subscribe to our nwes</label>
      </div>

      <button type="submit" class="btn btn-primary w-100">SignUp</button>
    </form>
    <div class="text-center mt-3">
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  fullName: '',
  email: '',
  phoneNumber: '',
  dob: '',
  gender: '',
  country: '',
  postcode: '',
  role: '',
  password: '',
  subscribe: false
})

const errors = ref({
  fullName: null,
  email: null,
  phoneNumber: null,
  dob: null,
  gender: null,
  country: null,
  postcode: null,
  role: null,
  password: null
})

const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailPattern.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address.'
  } else {
    errors.value.email = null
  }
}

const validatePassword = () => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":(}|<>]/.test(password)
  if (password.length < minLength) {
    errors.value.password = 'Password must be at least 8 characters long.'
  } else if (!hasUppercase) {
    errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const clearForm = () => {
  formData.value = {
    fullName: '',
    email: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    country: '',
    postcode: '',
    role: '',
    password: '',
    subscribe: false
  }
}

const handleSubmit = () => {
  validateEmail()
  validatePassword(true)
  // Add validation for other fields as needed
  const hasErrors = Object.values(errors.value).some((error) => error !== null)
  if (!hasErrors) {
    // Retrieve existing users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || []

    // Add the new user to the array
    users.push({
      fullName: formData.value.fullName,
      email: formData.value.email,
      phoneNumber: formData.value.phoneNumber,
      dob: formData.value.dob,
      gender: formData.value.gender,
      country: formData.value.country,
      postcode: formData.value.postcode,
      role: formData.value.role,
      subscribe: formData.value.subscribe
    })

    // Save the updated users array back to local storage
    localStorage.setItem('users', JSON.stringify(users))

    alert('Registration successful!')
    // Clear the form or navigate away after registration
    clearForm()
  }
}
</script>

<style scoped>
/* Add any custom styling here */
</style>
