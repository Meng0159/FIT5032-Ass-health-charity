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
          @blur="validatePassword"
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
// import managers from '@/data/managers.json'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

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
const detectXSS = (input) => {
  const vulunerablePattern = /<script>.*<\/script>/g
  if (vulunerablePattern.test(input.toLowerCase())) {
    alert('Malicious code detected!') // Alert the user
    router.push('/errorPage')
  }
}

// Validate email address
const validateEmail = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  const sanitizedEmail = sanitizeInput(formData.email)
  if (!emailPattern.test(sanitizedEmail)) {
    errors.email = 'Please enter a valid email address.'
  } else {
    errors.email = null
  }

  // Check for potential XSS attack
  detectXSS(formData.email)
}

const validatePassword = () => {
  const sanitizedPassword = sanitizeInput(formData.password)
  if (sanitizedPassword.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else {
    errors.password = null
  }
  // Check for potential XSS attack
  detectXSS(formData.password)
}
const auth = getAuth()
const db = getFirestore()
const handleLogin = async () => {
  validateEmail()
  validatePassword()

  const sanitizedEmail = sanitizeInput(formData.email)
  const sanitizedPassword = sanitizeInput(formData.password)

  if (!errors.email && !errors.password) {
    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        sanitizedEmail,
        sanitizedPassword
      )
      const user = userCredential.user

      // Fetch additional data from Firestore
      const userDocRef = doc(db, 'users', user.uid) // Assuming user data is stored by UID
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()

        // Store the user's logged-in status and additional info in localStorage
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            email: sanitizedEmail,
            loggedIn: true,
            isManager: userData.isManager // Store the manager status from Firestore
          })
        )

        // Check if user is a manager and navigate accordingly
        if (userData.isManager) {
          alert('Login Manager successful!')
          router.push('/manager') // Navigate to manager page
        } else {
          alert('Login successful!')
          router.push('/') // Navigate to the home page or user dashboard
        }
      } else {
        alert('User data not found in Firestore.')
      }
    } catch (error) {
      console.error('Login failed:', error.message)
      alert('Invalid email or password.')
    }
  }
}
</script>

<style scoped>
/* Add any custom styling here */
</style>
