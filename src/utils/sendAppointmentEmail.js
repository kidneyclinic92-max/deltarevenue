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

    const raw = await res.text()
    let data = {}
    try {
      data = raw ? JSON.parse(raw) : {}
    } catch (_) {
      data = {}
    }

    if (!res.ok) {
      const backendDetails = [data.code, data.command, data.response].filter(Boolean).join(' | ')
      const fallbackBody = raw && raw.length < 300 ? raw : ''
      const detail = backendDetails || fallbackBody
      return {
        ok: false,
        error: `${data.error || res.statusText || 'Request failed'} (HTTP ${res.status})${detail ? `: ${detail}` : ''}`,
      }
    }

    if (data.ok) return { ok: true }
    return {
      ok: false,
      error: data.error || (raw ? `Unexpected response: ${raw.slice(0, 300)}` : `Unexpected response (HTTP ${res.status})`),
    }
  } catch (err) {
    console.error('Email send failed:', err)
    return { ok: false, error: `Network error: ${err.message || 'Request failed'}` }
  }
}
