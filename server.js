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
    origin: 'http://localhost:5173' // Your Vue.js frontend URL
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
