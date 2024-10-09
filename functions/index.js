/* eslint-disable */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 *
 * To deploy this function:
 * firebase deploy --only functions:
 */

// Create and deploy your first functions-> firebase deploy
// https://firebase.google.com/docs/functions/get-started
const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
admin.initializeApp()
const db = admin.firestore()

// Function to monitor the capacity of an event -> EveentCalendar.js
exports.monitorEventCapacity = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const { eventid, limit } = req.query // Get the event ID and limit from the query parameters

    if (!eventid || !limit) {
      return res.status(400).send({ message: 'Missing eventid or limit' })
    }

    try {
      const registrationsRef = db.collection('eventRegistrations')

      // Get the number of registrations for the event
      const snapshot = await registrationsRef.where('attendEventid', '==', eventid).get()

      // If no registrations yet, set totalRegistrations to 0
      const totalRegistrations = snapshot.size || 0

      // Calculate available spots
      const eventLimit = parseInt(limit) // Convert the limit to a number
      const availableSpots = eventLimit - totalRegistrations

      // Send the available spots and whether the event is full
      res.send({
        availableSpots: availableSpots > 0 ? availableSpots : 0,
        isFull: availableSpots <= 0
      })
    } catch (error) {
      console.error('Error monitoring event capacity:', error)
      res.status(500).send({ message: 'Internal Server Error' })
    }
  })
})

// function to fetch publications from Firestore to sync only new publications ( user may just summitted)

exports.getPublications = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { timestamp } = req.query // Accept a timestamp query param
      const publicationsRef = db.collection('publications')

      let query = publicationsRef
      if (timestamp) {
        const time = new Date(parseInt(timestamp))
        query = query.where('publicationId', '>', time) // Filter by publicationId field
      }

      const snapshot = await query.get()

      if (snapshot.empty) {
        return res.status(404).send({ message: 'No publications found' })
      }

      const publications = []
      snapshot.forEach((doc) => {
        const data = doc.data()

        // Filter out publications with empty fields
        if (
          data.topic &&
          data.topic.length > 0 &&
          data.field &&
          data.field.length > 0 &&
          data.keywords &&
          data.keywords.length > 0 &&
          data.content &&
          data.content.length > 0 &&
          data.name &&
          data.name.length > 0 &&
          data.institute &&
          data.institute.length > 0
        ) {
          publications.push({
            id: doc.id,
            ...data
          })
        }
      })

      res.status(200).send(publications)
    } catch (error) {
      console.error('Error fetching publications:', error)
      res.status(500).send({ message: 'Internal Server Error' })
    }
  })
})
