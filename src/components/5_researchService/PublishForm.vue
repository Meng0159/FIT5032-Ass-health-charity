<template>
  <div class="publish-form">
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

<script setup>
import { ref } from 'vue'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

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
