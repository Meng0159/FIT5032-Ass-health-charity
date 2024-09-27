/* eslint-disable */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const functions = require('firebase-functions/v2/https')
const sendgrid = require('@sendgrid/mail')
const logger = require('firebase-functions/logger')

// Set SendGrid API Key
sendgrid.setApiKey('YOUR_SENDGRID_API_KEY')

// Cloud Function to send email
exports.sendInvoiceEmail = functions.onRequest(async (req, res) => {
  try {
    const { email, name, donationAmount } = req.body

    // Create the attachment (Invoice)
    const invoiceData = `Invoice for ${name}\nDonation Amount: ${donationAmount}`
    const base64Invoice = Buffer.from(invoiceData).toString('base64')

    const msg = {
      to: email,
      from: 'no-reply@mentalhealthy.com', // Your verified sender
      subject: 'Your Donation Invoice',
      text: `Hello ${name},\nThank you for your donation.`,
      attachments: [
        {
          content: base64Invoice,
          filename: 'invoice.txt',
          type: 'text/plain',
          disposition: 'attachment'
        }
      ]
    }

    await sendgrid.send(msg)
    res.status(200).send('Invoice sent successfully.')
  } catch (error) {
    logger.error('Error sending email: ', error)
    res.status(500).send('Failed to send email.')
  }
})
