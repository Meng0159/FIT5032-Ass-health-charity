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

      <div class="form-check mb-3">
        <input
          type="checkbox"
          id="rememberMe"
          v-model="formData.rememberMe"
          class="form-check-input"
        />
        <label for="rememberMe" class="form-check-label">Remember me</label>
      </div>

      <button type="submit" class="btn btn-primary w-100">Login</button>
    </form>
    <!-- Google Sign-In Button -->
    <div class="text-center mt-3">
      <button class="btn btn-secondary" @click="handleGoogleLogin">Login with Google</button>
    </div>
    <div class="text-center mt-3">
      Haven't signed up yet? <router-link to="/signup">Sign up</router-link>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import { useToast } from 'vue-toastification'
import DOMPurify from 'dompurify'
// import managers from '@/data/managers.json'
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

const router = useRouter()

const formData = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: null,
  password: null
})

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

/**
 * Shows an error toast message.
 */
//  const showError = () => {
//   toast.add({
//     severity: 'error',
//     summary: 'Incorrect username/password. Check the hint!',
//     detail: 'Try again pls.',
//     life: 3000
//   })
// }

/**
 * Emits an event to the parent component to indicate that the user has been authenticated.
 */
// const emit = defineEmits(['authenticated'])

const auth = getAuth()
const db = getFirestore()

const handleLogin = async () => {
  validateEmail()
  validatePassword()

  const userEmail = sanitizeInput(formData.email)
  const userPassword = sanitizeInput(formData.password)

  if (!errors.email && !errors.password) {
    try {
      // Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword)
      const user = userCredential.user

      // Fetch additional data from Firestore
      const userDocRef = doc(db, 'users', user.uid) // Assuming user data is stored by UID
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        const isManager = userData.isManager

        // Check if user is a manager and navigate accordingly
        if (isManager) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              isManager: true
            })
          )
          alert('Login Manager successful!')
          router.push('/manager') // Navigate to manager page
        } else {
          // Store login status in localStorage
          localStorage.setItem(
            'currentUser',
            JSON.stringify({ email: userEmail, isLoggedIn: true })
          )

          if (formData.rememberMe) {
            // Store the user's remember me status in localStorage if 'Remember Me' is checked
            localStorage.setItem(
              'currentUser',
              JSON.stringify({
                email: userEmail,
                isLoggedIn: true,
                longerToken: true
              })
            )
          }
          console.log(localStorage.getItem('currentUser'))
          alert('Login successful!')
          // emit('authenticated', true)  // User is authenticated and not a manager
          router.push('/') // Navigate to the home page or user dashboard
        }
      } else {
        alert('Incorrect password. Forgot your password?')
      }
    } catch (error) {
      console.error('Login failed:', error.message)
      alert('Invalid email or password.')
    }
  }
}

// Handle Google Login
const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Check if the user exists in Firestore
    const userDocRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)

    if (!userDoc.exists()) {
      // If the user doesn't exist, create a new user in Firestore
      await setDoc(userDocRef, {
        fullName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isManager: false, // Set a default role, adjust as needed
        createdAt: new Date()
      })
    }

    // Save logged-in status to localStorage
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        email: user.email,
        isLoggedIn: true,
        fullName: user.displayName
      })
    )

    alert('Login successful!')
    router.push('/') // Navigate to the home page
  } catch (error) {
    console.error('Google login failed:', error.message)
    alert('Google login failed. Please try again.')
  }
}

// Check if user is already logged in (Remember Me functionality) !Azzzz1111
onMounted(() => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  if (currentUser?.isLoggedIn) {
    if (currentUser.rememberMe) {
      alert('Welcome back!')
    }
    router.push('/') // Redirect to home if already logged in
  }
})
</script>

<style scoped>
/* Add any custom styling here */
</style>
