import { useState } from 'react'
import { useSiteConfig } from '../context/SiteConfigContext'
import { useAppointments } from '../context/AppointmentsContext'
import { AnimateOnScroll } from '../components/AnimateOnScroll'

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
]

const STATUS_LABELS = {
  pending: { text: 'Pending Approval', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  approved: { text: 'Approved', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  rejected: { text: 'Rejected', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
}

export default function Contact() {
  const { config } = useSiteConfig()
  const { appointments, addAppointment } = useAppointments()
  const contact = config.contact || {}

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', specialty: '', date: '', time: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [trackEmail, setTrackEmail] = useState('')
  const [showTracker, setShowTracker] = useState(false)

  const specialties = config.specialties || []

  const handleSubmit = (e) => {
    e.preventDefault()
    addAppointment(formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', specialty: '', date: '', time: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  const today = new Date().toISOString().split('T')[0]
  const userAppointments = trackEmail
    ? appointments.filter((a) => a.email.toLowerCase() === trackEmail.toLowerCase())
    : []

  const inputCls = 'w-full rounded-lg border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold outline-none'

  return (
    <div className="bg-primary-900 text-primary-200">
      <AnimateOnScroll as="section" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold text-center mb-12">{contact.title}</h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Contact info */}
            <div className="text-center lg:text-left">
              <h3 className="font-display font-semibold text-accent-gold mb-4">{contact.getInTouchHeading || 'Get in touch'}</h3>
              <a href={`tel:${(contact.phoneTel || '').replace(/\s/g, '')}`} className="text-white font-semibold hover:text-accent-gold block transition">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="text-white font-semibold hover:text-accent-gold block mt-2 transition">{contact.email}</a>
              <div className="mt-8 pt-8 border-t border-primary-600">
                <h3 className="font-display font-semibold text-accent-gold">{contact.hoursTitle}</h3>
                <p className="mt-2 text-primary-400 text-sm">{contact.hoursText}</p>
              </div>

              {/* Appointment Tracker */}
              <div className="mt-8 pt-8 border-t border-primary-600">
                <h3 className="font-display font-semibold text-accent-gold mb-4">Track Your Appointment</h3>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={trackEmail}
                    onChange={(e) => setTrackEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2.5 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold outline-none text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTracker(true)}
                    className="px-4 py-2.5 rounded-lg bg-accent-gold text-primary-900 font-medium text-sm hover:bg-accent-goldLight transition shrink-0"
                  >
                    Track
                  </button>
                </div>
                {showTracker && trackEmail && (
                  <div className="mt-4 space-y-3">
                    {userAppointments.length === 0 ? (
                      <p className="text-primary-400 text-sm">No appointments found for this email.</p>
                    ) : (
                      userAppointments.map((appt) => {
                        const status = STATUS_LABELS[appt.status] || STATUS_LABELS.pending
                        return (
                          <div key={appt.id} className="p-4 rounded-lg border border-primary-600 bg-primary-800/50">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="text-white text-sm font-medium">{appt.date} at {appt.time}</span>
                              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${status.color}`}>{status.text}</span>
                            </div>
                            {appt.specialty && <p className="text-primary-400 text-xs mt-1">{appt.specialty}</p>}
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Booking form */}
            <div className="bg-primary-800 p-8 rounded-xl border border-primary-600 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-accent-gold mb-6">{contact.scheduleHeading || 'Schedule Assessment'}</h3>

              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-green-900/30 border border-green-600/40 text-green-400 text-sm text-center">
                  Appointment request submitted! You will receive a confirmation once approved.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-300 mb-1">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputCls} placeholder="Your full name" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-300 mb-1">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputCls} placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-300 mb-1">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputCls} placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-300 mb-1">Specialty</label>
                  <select value={formData.specialty} onChange={(e) => setFormData({ ...formData, specialty: e.target.value })} className={inputCls}>
                    <option value="">Select a specialty</option>
                    {specialties.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-300 mb-1">Preferred Date *</label>
                    <input type="date" required min={today} value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-300 mb-1">Preferred Time *</label>
                    <select required value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className={inputCls}>
                      <option value="">Select a time</option>
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-300 mb-1">Message</label>
                  <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className={inputCls + ' resize-none'} placeholder="Any additional details..." />
                </div>
                <button type="submit" className="w-full py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">
                  Book Appointment
                </button>
              </form>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}
