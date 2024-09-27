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
          @blur="validateEmail"
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
          @blur="() => validatePhoneNumber(true)"
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
              @blur="validateBirthDate"
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
              min="1000"
              max="9999"
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
      <div class="row mb-3">
        <div class="col-md-6 col-sm-6 form-group">
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

        <div class="col-md-6 col-sm-6 form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            @blur="() => validateConfirmPassword(true)"
          />
          <div class="text-danger" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
        </div>
      </div>
      <div class="text-muted">
        At least 8 characters long and contain at least one number, and one special character.
      </div>
      <div class="form-group mb-3 form-check">
        <input
          type="checkbox"
          id="subscribe"
          v-model="formData.subscribe"
          class="form-check-input"
        />
        <label for="subscribe" class="form-check-label">Subscribe to our newsletter</label>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">SignUp</button>
      </div>
    </form>
    <div class="text-center mt-3">
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
// import bcrypt from 'bcryptjs'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
// import { getFirestore, doc, setDoc } from 'firebase/firestore'
import db from '../4_firebase/init.js'
// eslint-disable-next-line no-unused-vars
import { doc, collection, setDoc } from 'firebase/firestore'

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
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":(}|<>]/.test(password)
  if (password.length < minLength) {
    errors.value.password = 'Password must be at least 8 characters long.'
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

const validateBirthDate = () => {
  if (formData.value.dob === '') {
    errors.value.dob = 'Please enter your date of birth.'
  } else {
    const selectedDate = new Date(formData.value.dob)
    const currentDate = new Date()

    if (selectedDate > currentDate) {
      errors.value.dob = 'Date of birth cannot be in the future.'
    } else {
      errors.value.dob = null
    }
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validatePhoneNumber = () => {
  const phonePattern = /^\d{10}$/
  if (!phonePattern.test(formData.value.phoneNumber)) {
    errors.value.phoneNumber = 'Please enter a valid phone number.'
  } else {
    errors.value.phoneNumber = null
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

const sanitizeInput = (input) => {
  const sanitized = DOMPurify.sanitize(input)
  console.log('Sanitized Input:', sanitized) // Debugging line
  return sanitized
}
const router = useRouter()
const auth = getAuth()

// Handle form submission and store data in Firebase Auth and Firestore
const handleSubmit = async () => {
  validateEmail()
  validateBirthDate()
  validatePassword(true)
  // validateConfirmPassword()
  validatePhoneNumber(true)

  const hasErrors = Object.values(errors.value).some((error) => error !== null)
  if (hasErrors) return

  const sanitizedFullName = sanitizeInput(formData.value.fullName)
  const sanitizedEmail = sanitizeInput(formData.value.email)
  const sanitizedPassword = sanitizeInput(formData.value.password)

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      sanitizedEmail,
      sanitizedPassword
    )
    const user = userCredential.user

    // Store additional user information in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      fullName: sanitizedFullName,
      email: sanitizedEmail,
      phoneNumber: formData.value.phoneNumber,
      dob: formData.value.dob,
      gender: formData.value.gender,
      country: formData.value.country,
      postcode: formData.value.postcode,
      role: formData.value.role,
      password: formData.value.password,
      isManager: false,
      subscribe: formData.value.subscribe
    })

    alert('Registration successful!')
    clearForm()
    router.push('/login') // Redirect to login after successful registration
  } catch (error) {
    console.error('Error creating user:', error)
    alert('Failed to register. Please try again.')
  }
}
</script>

<style scoped>
/* Add any custom styling here */
</style>
