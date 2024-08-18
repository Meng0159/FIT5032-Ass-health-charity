<template>
  <div class="login-page container py-5">
    <div class="col-auto">
      <a class="navbar-brand" href="/" style="padding-left: 15px">
        <img src="@/assets/images/logo.png" alt="Logo" height="40" />
      </a>
    </div>
    <h2 class="text-center mb-4">Login</h2>
    <form @submit.prevent="handleSubmit" class="mx-auto" style="max-width: 400px">
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

<script>
import { reactive } from 'vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  setup() {
    const formData = reactive({
      email: '',
      password: ''
    })

    const errors = reactive({
      email: null,
      password: null
    })

    const validateEmail = () => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      if (!emailPattern.test(formData.email)) {
        errors.email = 'Please enter a valid email address.'
      } else {
        errors.email = null
      }
    }

    const validatePassword = () => {
      const password = formData.password
      const minLength = 8
      const hasUppercase = /[A-Z]/.test(password)
      const hasLowercase = /[a-z]/.test(password)
      const hasNumber = /\d/.test(password)
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

      if (password.length < minLength) {
        errors.password = 'Password must be at least 8 characters long.'
      } else if (!hasUppercase) {
        errors.password = 'Password must contain at least one uppercase letter.'
      } else if (!hasLowercase) {
        errors.password = 'Password must contain at least one lowercase letter.'
      } else if (!hasNumber) {
        errors.password = 'Password must contain at least one number.'
      } else if (!hasSpecialChar) {
        errors.password = 'Password must contain at least one special character.'
      } else {
        errors.password = null
      }
    }

    const handleSubmit = () => {
      validateEmail()
      validatePassword()
      if (!errors.email && !errors.password) {
        alert('Login successful!')
        // Proceed with form submission or authentication logic
      }
    }

    return {
      formData,
      errors,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* Add any custom styling here */
</style>
