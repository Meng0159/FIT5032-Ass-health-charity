<!-- researcher pass !1Aresearcher -->
<template>
  <router-link to="/" class="navbar-brand d-flex align-items-start" style="padding-left: 15px">
    <img src="@/assets/images/logo.png" alt="Logo" height="40" />
    <h4 class="mb-0 ms-2">Back to Home</h4>
  </router-link>
  <div class="publish-form">
    <h1>Research and Support</h1>
    <p>
      Our research projects are aimed at understanding the various aspects of mental health and
      providing support to those in need. We collaborate with partners from around the world to
      conduct research and develop resources that can help individuals and communities.
    </p>
    <h2>Publish Your Research</h2>
    <div v-if="!isOnline" style="color: red">
      You are currently offline. Some features may not be available.
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="formData.name" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="institute">Institute:</label>
        <input
          type="text"
          id="institute"
          v-model="formData.institute"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="topic">Topic:</label>
        <input type="text" id="topic" v-model="formData.topic" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="field">Field:</label>
        <input type="text" id="field" v-model="formData.field" required class="form-control" />
      </div>

      <div class="form-group">
        <label for="keywords">Keywords:</label>
        <input
          type="text"
          id="keywords"
          v-model="formData.keywords"
          required
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="content">Publication Content:</label>
        <textarea
          id="content"
          v-model="formData.content"
          rows="10"
          required
          class="form-control"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { getAuth } from 'firebase/auth'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default {
  name: 'PublishForm',
  setup() {
    const db = getFirestore()
    const formData = ref({
      name: '',
      institute: '',
      topic: '',
      field: '',
      keywords: '',
      content: ''
    })

    const handleSubmit = async () => {
      const auth = getAuth()
      const user = auth.currentUser
      const newPublication = {
        ...formData.value,
        userId: user.uid,
        publicationId: Date.now(),
        date: new Date().toLocaleDateString()
      }

      try {
        // Add the publication data to Firestore
        await addDoc(collection(db, 'publications'), newPublication)
        alert('Publication submitted successfully!')

        // Reset the form
        formData.value = {
          name: '',
          institute: '',
          topic: '',
          field: '',
          keywords: '',
          content: ''
        }
      } catch (error) {
        console.error('Error saving publication: ', error)
        alert('There was an error submitting your publication. Please try again.')
      }
    }

    // Consider online/offline status
    const isOnline = ref(navigator.onLine)

    window.addEventListener('online', () => {
      isOnline.value = true
      console.log('You are online!')
    })

    window.addEventListener('offline', () => {
      isOnline.value = false
      console.log('You are offline!')
    })

    const syncStoredPublication = async () => {
      const storedPublication = localStorage.getItem('submitedPublication')
        ? JSON.parse(localStorage.getItem('submitedPublication'))
        : []

      if (storedPublication.length > 0) {
        storedPublication.forEach(async (publication) => {
          try {
            await addDoc(collection(db, 'publications'), publication)
            console.log('Synced publication:', publication)
          } catch (error) {
            console.error('Error syncing publication:', error)
          }
        })
        // Clear after syncing
        localStorage.removeItem('submitedPublication')
        console.log(
          'Checking if localStorage is cleared:',
          localStorage.getItem('submitedPublication') === null
        )
      }
    }

    // Call this when the user comes back online
    window.addEventListener('online', syncStoredPublication)

    // To store offline registration
    const storePublicationOffline = async () => {
      if (!isOnline.value) {
        const publicationData = {
          name: formData.value.name || '',
          institute: formData.value.institute || '',
          topic: formData.value.topic || '',
          field: formData.value.field || '',
          keywords: formData.value.keywords || '',
          content: formData.value.content || ''
        }
        let storePublications = localStorage.getItem('submitedPublication')
          ? JSON.parse(localStorage.getItem('submitedPublication'))
          : []
        storePublications.push(publicationData)
        localStorage.setItem('submitedPublication', JSON.stringify(storePublications))
        console.log('Stored publication offline:', localStorage.getItem('submitedPublication'))
      }
    }

    window.addEventListener('offline', storePublicationOffline)

    return {
      formData,
      handleSubmit,
      isOnline
    }
  }
}
</script>

<style scoped>
.publish-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}
</style>
