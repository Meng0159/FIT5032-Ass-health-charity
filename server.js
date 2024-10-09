/* eslint-disable */
import express from 'express'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
import cors from 'cors'
// Middleware
app.use(express.json({ limit: '10mb' }))
app.use(
  cors({
    origin: 'http://localhost:5173' // 'http://localhost:5173' Vue.js frontend URL
  })
)
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
