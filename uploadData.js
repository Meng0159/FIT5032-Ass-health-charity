// node uploadData.js
import { collection, addDoc } from 'firebase/firestore'
import db from './src/components/4_firebase/init.js'

import fs from 'fs'
const mockDonationData = JSON.parse(fs.readFileSync('./src/data/mockDonationData.json', 'utf-8'))

const uploadMockData = async () => {
  try {
    const userCollection = collection(db, 'donations')

    // Loop through the mock users and add them to Firestore
    for (let donation of mockDonationData) {
      await addDoc(userCollection, donation)
    }

    console.log('Mock users successfully uploaded to Firestore!')
  } catch (error) {
    console.error('Error uploading mock donations:', error)
  }
}

// Call the function to start uploading
uploadMockData()
