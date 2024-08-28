<template>
  <div>
    <p v-if="errorCode">Error code: {{ errorCode }}</p>
    <p v-if="sanitizedErrorMessage" v-text="sanitizedErrorMessage"></p>
    <p v-if="user">User: {{ user.name }}</p>
    <p v-if="!user">User not found</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DOMPurify from 'dompurify'

const errorCode = ref(null)
const errorMessage = ref('')
const sanitizedErrorMessage = ref('')
const user = ref(null)

onMounted(() => {
  // Extract error code and message from URL
  const params = new URL(document.location).searchParams
  errorCode.value = parseInt(params.get('code'))
  errorMessage.value = params.get('message')

  // Sanitize the error message
  sanitizedErrorMessage.value = DOMPurify.sanitize(errorMessage.value)

  // Check local storage for user identity
  const storedUser = localStorage.getItem('currentUser')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})
</script>
