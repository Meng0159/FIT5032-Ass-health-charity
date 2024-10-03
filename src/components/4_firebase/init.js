import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBcYkRrtFOwh01c5VfnHBd8kD8cA0wbDKs',
  authDomain: 'fit5032-healthyweb.firebaseapp.com',
  projectId: 'fit5032-healthyweb',
  storageBucket: 'fit5032-healthyweb.appspot.com',
  messagingSenderId: '714953864995',
  appId: '1:714953864995:web:2f31ac4b27b280491afe96'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

export default db
