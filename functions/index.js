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
exports.monitorEventCapacity = functions.https.onRequest(async (req, res) => {
  const { eventid } = req.query

  try {
    const registrationsRef = db.collection('eventRegistrations')
    const snapshot = await registrationsRef.where('eventid', '==', eventid).get()

    const totalRegistrations = snapshot.size

    const eventRef = db.collection('events').doc(eventid)
    const eventSnapshot = await eventRef.get()

    if (!eventSnapshot.exists) {
      return res.status(404).send({ message: 'Event not found' })
    }

    const eventLimit = eventSnapshot.data().limit
    const availableSpots = eventLimit - totalRegistrations

    res.send({
      availableSpots: availableSpots > 0 ? availableSpots : 0,
      isFull: availableSpots <= 0
    })
  } catch (error) {
    console.error('Error monitoring event capacity:', error)
    res.status(500).send({ message: 'Internal Server Error' })
  }
})
