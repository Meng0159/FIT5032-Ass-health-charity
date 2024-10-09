/* eslint-disable */
import express from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from 'cors'
// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize environment variables
dotenv.config()

const app = express()
// Use environment variable PORT, or fallback to 3000 in local development
const PORT = process.env.PORT || 3000

// Middleware

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true)

//       // Check if the origin matches the regex for subdomains
//       const regex = /^https:\/\/.*\.fit5032-ass-health-charity\.pages\.dev$/
//       if (regex.test(origin)) {
//         callback(null, true) // Allow the request
//       } else if (origin === 'https://fit5032-ass-health-charity.pages.dev') {
//         callback(null, true) // Allow the main domain
//       } else {
//         callback(new Error('Not allowed by CORS')) // Block the request
//       }
//     }
//   })
// )

// app.use(
//   cors((req, callback) => {
//     const allowedOrigins = [
//       'https://fit5032-ass-health-charity.pages.dev',
//       'https://45e2-103-224-53-141.ngrok-free.app' // You can add your ngrok URL if needed
//     ]
//     const origin = req.headers.origin
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   })
// )

app.use(
  cors({
    origin: 'https://fit5032-ass-health-charity.pages.dev' // 'http://localhost:5173' Vue.js frontend URL
  })
)
app.use(express.json({ limit: '10mb' }))

import sgMail from '@sendgrid/mail'
// Set your SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// Endpoint to send emails
app.post('/api/send-email', async (req, res) => {
  const { email, amount, name, date } = req.body

  const msg = {
    to: email, // Recipient's email
    from: 'mlee0159mon@gmail.com', // Your verified sender email
    subject: 'Donation Invoice',
    text: `Thank you for your donation of $${amount}!\n\nDonor Name: ${name}\nDonation Date: ${date}`,
    attachments: [
      {
        content: Buffer.from('Thank you for your donation, here is your invoice').toString(
          'base64'
        ), // Invoice content in base64
        filename: 'invoice.pdf', // Name of the attachment
        type: 'application/pdf', // Type of the attachment
        disposition: 'attachment'
      }
    ]
  }

  try {
    await sgMail.send(msg)
    res.status(200).send({ message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).send({ error: 'Failed to send email' })
  }
})

// Bulk email sending endpoint for sending emails to multiple donations recipients
app.post('/api/send-bulkEmail', async (req, res) => {
  const { emails, subject, text, html } = req.body

  const messages = emails.map((email) => ({
    to: email,
    from: 'mlee0159mon@gmail.com', // Change this to your verified sender
    subject: subject,
    text: text,
    html: html
  }))

  try {
    await sgMail.send(messages)
    res.status(200).send('Bulk email sent successfully')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error sending bulk email')
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on deployed site :${PORT}`)
})
