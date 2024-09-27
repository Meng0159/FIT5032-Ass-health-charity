<!-- Function to send email using SendGrid API  -->
<!-- /* eslint-disable */ -->
<script setup>
import axios from 'axios'
const sendInvoice = async (donationData) => {
  try {
    const apiKey = 'YOUR_SENDGRID_API_KEY' // Replace with your actual SendGrid API key
    const emailData = {
      personalizations: [
        {
          to: [{ email: donationData.email }],
          subject: 'Donation Invoice'
        }
      ],
      from: { email: 'your-email@example.com' }, // Replace with your sender email
      content: [
        {
          type: 'text/plain',
          value: `Dear ${donationData.name},\n\nThank you for your donation of $${donationData.amount}.\nAttached is your donation invoice.`
        }
      ],
      attachments: [
        {
          content: btoa('Your invoice details here...'), // Replace with actual invoice content encoded in base64
          filename: 'invoice.pdf',
          type: 'application/pdf',
          disposition: 'attachment'
        }
      ]
    }

    // Send the email using SendGrid API
    const response = await axios.post('https://api.sendgrid.com/v3/mail/send', emailData, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    console.log('Email sent successfully:', response)
    alert('Donation submitted! An invoice has been sent to your email.')
  } catch (error) {
    console.error('Error sending email:', error)
    alert('There was an error sending the invoice email. Please try again later.')
  }
}
</script>
