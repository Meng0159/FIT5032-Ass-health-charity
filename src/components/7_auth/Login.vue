<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-page container py-5">
    <h2 class="text-center mb-4">Login</h2>
    <form @submit.prevent="handleLogin" class="mx-auto" style="max-width: 400px">
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
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
          placeholder="Enter your password"
          required
        />
        <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <div class="text-center mt-3">
      Haven't signed up yet? <router-link to="/signup">Sign up</router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import DOMPurify from 'dompurify'
import managers from '@/data/managers.json'

const formData = reactive({
  email: '',
  password: ''
})

const errors = reactive({
  email: null,
  password: null
})

const router = useRouter()

const sanitizeInput = (input) => {
  const sanitized = DOMPurify.sanitize(input)
  console.log('Sanitized Input:', sanitized) // Debugging line
  return sanitized
}

// Validate email address
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const vulunerablePattern = /<script>.*<\/script>/g
  const sanitizedEmail = sanitizeInput(formData.email)
  if (!emailPattern.test(sanitizedEmail)) {
    errors.email = 'Please enter a valid email address.'
  } else {
    errors.email = null
  }

  // Check for potential XSS attack
  if (vulunerablePattern.test(formData.email.toLowerCase())) {
    errors.email = 'Malicious code detected!'
    alert('Malicious code detected!') // Alert the user
    router.push('/errorPage')
  }
}

const handleLogin = () => {
  validateEmail()
  const sanitizedEmail = sanitizeInput(formData.email)
  const sanitizedPassword = sanitizeInput(formData.password)

  if (!errors.email && !errors.password) {
    // Check if the user is a manager
    // if (formData.email === 'admin@health.com' && formData.password === 'admin') {
    //   router.push('/manager') // Navigate to the manager page
    // } else {
    //   errorMessage.value = 'Invalid email or password.'
    // }
    const manager = managers.find(
      (manager) => manager.email === sanitizedEmail && manager.password === sanitizedPassword
    )

    if (manager) {
      alert('Login Manager successful!')
      // Store manager login state in localStorage
      localStorage.setItem('manager', JSON.stringify({ loggedIn: true }))
      router.push('/manager') // Navigate to the manager page
      return
    }

    // If not a manager, check the local storage for user data
    const users = JSON.parse(localStorage.getItem('users')) || []
    const userByEmail = users.find((user) => user.email === formData.email)

    if (userByEmail) {
      if (userByEmail.password === formData.password) {
        alert('Login successful!')
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            email: formData.email,
            psd: formData.password,
            role: formData.role,
            loggedIn: true
          })
        )
        router.push('/') // Navigate to the user dashboard page or any other user-specific page
      } else {
        alert('Incorrect password. Forgot your password?')
      }
    } else {
      alert('Invalid email or password.')
    }
  }
}
</script>

<style scoped>
/* Add any custom styling here */
</style>
