import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

app.post('/api/send-appointment-email', async (req, res) => {
  const { name, email, date, time, specialty, message } = req.body || {}

  if (!email || !name) {
    return res.status(400).json({ ok: false, error: 'Missing email or name' })
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ ok: false, error: 'Email not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env' })
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #b8860b;">Appointment Confirmed</h2>
      <p>Hi ${name},</p>
      <p>Your appointment at <strong>Delta Revenue Partners</strong> has been confirmed.</p>
      <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Date:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${date || '—'}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Time:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${time || '—'}</td></tr>
        <tr><td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Specialty:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #eee;">${specialty || 'Not specified'}</td></tr>
      </table>
      ${message ? `<p><strong>Your note:</strong> ${message}</p>` : ''}
      <p>We look forward to seeing you.</p>
      <p>— Delta Revenue Partners</p>
    </div>
  `

  try {
    await transporter.sendMail({
      from: `"Delta Revenue Partners" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your appointment is confirmed — Delta Revenue Partners',
      html,
    })
    res.json({ ok: true })
  } catch (err) {
    console.error('Email send error:', err)
    res.status(500).json({ ok: false, error: err.message || 'Failed to send email' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
