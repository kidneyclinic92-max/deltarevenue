/**
 * Send appointment confirmation email via backend (Nodemailer + Gmail).
 * The Express server at server/index.js handles the actual email sending.
 */
export async function sendAppointmentConfirmationEmail(appointment) {
  const base = import.meta.env.VITE_API_BASE || ''

  try {
    const res = await fetch(`${base}/api/send-appointment-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: appointment.name,
        email: appointment.email,
        date: appointment.date,
        time: appointment.time,
        specialty: appointment.specialty,
        message: appointment.message,
      }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return { ok: false, error: data.error || res.statusText || 'Request failed' }
    }

    return data.ok ? { ok: true } : { ok: false, error: data.error || 'Unknown error' }
  } catch (err) {
    console.error('Email send failed:', err)
    return { ok: false, error: err.message || 'Network error' }
  }
}
