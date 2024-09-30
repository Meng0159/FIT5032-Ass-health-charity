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
      const newPublication = {
        ...formData.value,
        id: Date.now(),
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

    return {
      formData,
      handleSubmit
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
