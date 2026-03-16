import { useState } from 'react'
import { useSiteConfig } from '../context/SiteConfigContext'
import { AnimateOnScroll } from '../components/AnimateOnScroll'

export default function Contact() {
  const { config } = useSiteConfig()
  const contact = config.contact || {}
  const [formData, setFormData] = useState({ name: '', email: '', message: '', attachments: [] })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! We will be in touch soon.')
  }

  return (
    <div className="bg-primary-900 text-primary-200">
      {/* Contact info + Schedule Assessment form */}
      <AnimateOnScroll as="section" className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold text-center mb-12">{contact.title}</h2>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="text-center lg:text-left">
              <h3 className="font-display font-semibold text-accent-gold mb-4">{contact.getInTouchHeading || 'Get in touch'}</h3>
              <a href={`tel:${(contact.phoneTel || '').replace(/\s/g, '')}`} className="text-white font-semibold hover:text-accent-gold block transition">{contact.phone}</a>
              <a href={`mailto:${contact.email}`} className="text-white font-semibold hover:text-accent-gold block mt-2 transition">{contact.email}</a>
              <div className="mt-8 pt-8 border-t border-primary-600">
                <h3 className="font-display font-semibold text-accent-gold">{contact.hoursTitle}</h3>
                <p className="mt-2 text-primary-400 text-sm">{contact.hoursText}</p>
              </div>
            </div>
            <div className="bg-primary-800 p-8 rounded-xl border border-primary-600 shadow-sm">
              <h3 className="font-display text-lg font-semibold text-accent-gold mb-6">{contact.scheduleHeading || 'Schedule Assessment'}</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-primary-300 mb-1">Name</label>
                  <input id="contact-name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-md border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold outline-none" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-primary-300 mb-1">Email *</label>
                  <input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-md border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold outline-none" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-300 mb-1">Attach Files</label>
                  <input type="file" multiple onChange={(e) => setFormData({ ...formData, attachments: Array.from(e.target.files || []) })} className="w-full rounded-md border border-primary-600 bg-primary-900 px-4 py-3 text-sm text-primary-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-700 file:text-primary-200 hover:file:bg-primary-600" />
                  <p className="mt-1 text-primary-500 text-xs">Attachments ({formData.attachments.length})</p>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-primary-300 mb-1">Message</label>
                  <textarea id="contact-message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-md border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold outline-none resize-none" placeholder="Your message" />
                </div>
                <p className="text-primary-500 text-xs">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                <div className="flex gap-3">
                  <button type="submit" className="px-6 py-3 rounded-md bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">Send</button>
                  <button type="button" onClick={() => setFormData({ name: '', email: '', message: '', attachments: [] })} className="px-6 py-3 rounded-md border border-primary-600 text-primary-300 font-medium hover:bg-primary-700 transition">Clear</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}
