import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteConfig } from '../context/SiteConfigContext'
import { useAppointments } from '../context/AppointmentsContext'
import { sendAppointmentConfirmationEmail } from '../utils/sendAppointmentEmail'

const ADMIN_PASSWORD = 'deltaadmin'

const ADMIN_PAGES = [
  {
    id: 'home',
    label: 'Home',
    sections: [
      { id: 'hero', label: 'Hero Section' },
      { id: 'deltaApproach', label: 'Delta Approach' },
      { id: 'trust', label: 'Trust Section' },
      { id: 'specialties', label: 'Specialties Dropdown' },
      { id: 'stats', label: 'Stats' },
      { id: 'achievements', label: 'Achievements' },
      { id: 'increaseRevenue', label: 'Increase Revenue' },
      { id: 'providerCta', label: 'Provider CTA' },
      { id: 'why', label: 'Why Delta Revenue Partners' },
      { id: 'solutionsBySpecialty', label: 'Solutions by Specialty' },
      { id: 'onboarding', label: 'Onboarding' },
      { id: 'benefits', label: 'Benefits' },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    sections: [
      { id: 'services', label: 'Services List' },
    ],
  },
  {
    id: 'about',
    label: 'About Us',
    sections: [
      { id: 'about', label: 'Page Headings' },
      { id: 'trust', label: 'Who We Are Content' },
      { id: 'deltaApproach', label: 'Delta Approach Summary' },
      { id: 'locations', label: 'Office Locations' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact Us',
    sections: [
      { id: 'contact', label: 'Contact Info & Form' },
    ],
  },
  {
    id: 'careers',
    label: 'Careers',
    sections: [
      { id: 'careers', label: 'Careers Page' },
    ],
  },
  {
    id: 'appointments',
    label: 'Appointments',
    sections: [],
  },
  {
    id: 'global',
    label: 'Settings',
    sections: [
      { id: 'header', label: 'Header & Navigation' },
      { id: 'footer', label: 'Footer' },
    ],
  },
]

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-auth', '1')
      onLogin(true)
    } else {
      setError('Incorrect password')
    }
  }
  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-primary-800 border border-primary-600 rounded-xl p-8 max-w-sm w-full">
        <h1 className="text-xl font-bold text-accent-gold mb-4">Admin Login</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError('') }}
          placeholder="Password"
          className="w-full rounded-lg border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold outline-none"
          autoFocus
        />
        {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
        <button type="submit" className="mt-4 w-full py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">
          Log in
        </button>
      </form>
    </div>
  )
}

function Field({ label, value, onChange, multiline, placeholder }) {
  const inputClass = 'w-full rounded-lg border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold outline-none'
  return (
    <div className="mb-5">
      <label className="block text-primary-300 text-sm font-medium mb-1.5 text-center">{label}</label>
      {multiline ? (
        <textarea value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} rows={3} placeholder={placeholder} />
      ) : (
        <input type="text" value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={placeholder} />
      )}
    </div>
  )
}

function ListEditor({ items, onChange, singular = 'Item' }) {
  const add = () => onChange([...items, typeof items[0] === 'string' ? '' : { ...items[0], title: '', desc: '' }])
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i))
  const update = (i, val) => onChange(items.map((item, idx) => (idx === i ? val : item)))
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 items-start">
          {typeof item === 'string' ? (
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100"
            />
          ) : (
            <div className="flex-1 space-y-2">
              <input value={item.title || ''} onChange={(e) => update(i, { ...item, title: e.target.value })} placeholder="Title" className="w-full rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <textarea value={item.desc || ''} onChange={(e) => update(i, { ...item, desc: e.target.value })} placeholder="Description" className="w-full rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" rows={2} />
            </div>
          )}
          <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-300 px-2 py-1">×</button>
        </div>
      ))}
      <button type="button" onClick={add} className="text-accent-gold hover:text-accent-goldLight text-sm font-medium">+ Add {singular}</button>
    </div>
  )
}

function LinksEditor({ links, onChange }) {
  return (
    <div className="space-y-2">
      {links.map((link, i) => (
        <div key={i} className="flex gap-2">
          <input value={link.label || ''} onChange={(e) => onChange(links.map((l, j) => (j === i ? { ...l, label: e.target.value } : l)))} placeholder="Label" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
          <input value={link.href || ''} onChange={(e) => onChange(links.map((l, j) => (j === i ? { ...l, href: e.target.value } : l)))} placeholder="href (/about, #services)" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
          <button type="button" onClick={() => onChange(links.filter((_, j) => j !== i))} className="text-red-400 px-2">×</button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...links, { label: '', href: '/' }])} className="text-accent-gold hover:text-accent-goldLight text-sm font-medium">+ Add link</button>
    </div>
  )
}

function SectionEditor({ sectionId, config, updateSection }) {
  const data = config[sectionId]
  const set = (key, value) => updateSection(sectionId, { [key]: value })

  switch (sectionId) {
    case 'hero':
      return (
        <>
          <Field label="Headline" value={data?.headline} onChange={(v) => set('headline', v)} />
          <Field label="Video URL" value={data?.videoSrc} onChange={(v) => set('videoSrc', v)} />
        </>
      )

    case 'header':
      return (
        <>
          <Field label="Logo text" value={data?.logoText} onChange={(v) => set('logoText', v)} />
          <Field label="Logo highlight" value={data?.logoHighlight} onChange={(v) => set('logoHighlight', v)} />
          <Field label="CTA button text" value={data?.ctaText} onChange={(v) => set('ctaText', v)} />
          <Field label="Phone (display)" value={data?.phone} onChange={(v) => set('phone', v)} />
          <Field label="Phone (tel link)" value={data?.phoneTel} onChange={(v) => set('phoneTel', v)} />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Navigation Links</h4>
          <LinksEditor links={data?.navLinks || []} onChange={(v) => set('navLinks', v)} />
        </>
      )

    case 'deltaApproach':
      return (
        <>
          <Field label="Section title" value={data?.title} onChange={(v) => set('title', v)} />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Approach Cards</h4>
          <ListEditor items={data?.items || []} onChange={(v) => set('items', v)} singular="card" />
        </>
      )

    case 'trust':
      return (
        <>
          <Field label="Heading" value={data?.heading} onChange={(v) => set('heading', v)} />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Paragraphs (HTML allowed)</h4>
          <ListEditor items={data?.paragraphs || []} onChange={(v) => set('paragraphs', v)} singular="paragraph" />
        </>
      )

    case 'specialties':
      return (
        <>
          <h4 className="text-primary-300 text-sm font-semibold mb-2 text-center">Specialty Dropdown Options</h4>
          <ListEditor items={Array.isArray(data) ? data : []} onChange={(v) => updateSection('specialties', () => v)} singular="specialty" />
        </>
      )

    case 'stats': {
      const stats = Array.isArray(data) ? data : []
      const updateStat = (i, key, val) => updateSection('stats', () => stats.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)))
      const addStat = () => updateSection('stats', () => [...stats, { value: '', label: '' }])
      const removeStat = (i) => updateSection('stats', () => stats.filter((_, idx) => idx !== i))
      return (
        <>
          {stats.map((s, i) => (
            <div key={i} className="mb-3 p-4 rounded-lg border border-primary-600 bg-primary-900/30 flex gap-2 items-center">
              <input value={s.value || ''} onChange={(e) => updateStat(i, 'value', e.target.value)} placeholder="Value (e.g. 25%)" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <input value={s.label || ''} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Label" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <button type="button" onClick={() => removeStat(i)} className="text-red-400 px-2">×</button>
            </div>
          ))}
          <button type="button" onClick={addStat} className="text-accent-gold hover:text-accent-goldLight text-sm font-medium">+ Add stat</button>
        </>
      )
    }

    case 'achievements': {
      const items = data?.items || []
      const updateItem = (i, key, val) => set('items', items.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)))
      const addItem = () => set('items', [...items, { value: '', label: '' }])
      const removeItem = (i) => set('items', items.filter((_, idx) => idx !== i))
      return (
        <>
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} multiline />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Achievement Items</h4>
          {items.map((s, i) => (
            <div key={i} className="mb-3 p-4 rounded-lg border border-primary-600 bg-primary-900/30 flex gap-2 items-center">
              <input value={s.value || ''} onChange={(e) => updateItem(i, 'value', e.target.value)} placeholder="Value (e.g. 10+)" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <input value={s.label || ''} onChange={(e) => updateItem(i, 'label', e.target.value)} placeholder="Label" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <button type="button" onClick={() => removeItem(i)} className="text-red-400 px-2">×</button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="text-accent-gold hover:text-accent-goldLight text-sm font-medium">+ Add achievement</button>
        </>
      )
    }

    case 'increaseRevenue':
      return (
        <>
          <Field label="Subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} />
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} multiline />
          <Field label="Body" value={data?.body} onChange={(v) => set('body', v)} multiline />
          <Field label="Link text" value={data?.linkText} onChange={(v) => set('linkText', v)} />
          <Field label="Link href" value={data?.linkHref} onChange={(v) => set('linkHref', v)} />
        </>
      )

    case 'services': {
      const items = data?.items || []
      const updateItem = (i, patch) => set('items', items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)))
      const addItem = () => set('items', [...items, { title: '', desc: '', href: '#', icon: '📋' }])
      const removeItem = (i) => set('items', items.filter((_, idx) => idx !== i))
      return (
        <>
          <Field label="Page title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Page subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} multiline />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Service Cards</h4>
          {items.map((item, i) => (
            <div key={i} className="mb-4 p-4 rounded-lg border border-primary-600 bg-primary-900/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-accent-gold text-sm font-medium">Service {i + 1}</span>
                <button type="button" onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300 px-2">×</button>
              </div>
              <Field label="Icon (emoji)" value={item.icon} onChange={(v) => updateItem(i, { icon: v })} />
              <Field label="Title" value={item.title} onChange={(v) => updateItem(i, { title: v })} />
              <Field label="Description" value={item.desc} onChange={(v) => updateItem(i, { desc: v })} multiline />
            </div>
          ))}
          <button type="button" onClick={addItem} className="text-accent-gold hover:text-accent-goldLight text-sm font-medium">+ Add service</button>
        </>
      )
    }

    case 'providerCta':
      return (
        <>
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Body" value={data?.body} onChange={(v) => set('body', v)} multiline />
          <Field label="CTA button text" value={data?.ctaText} onChange={(v) => set('ctaText', v)} />
        </>
      )

    case 'why':
      return (
        <>
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} multiline />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Feature Cards</h4>
          <ListEditor items={data?.items || []} onChange={(v) => set('items', v)} singular="item" />
          <div className="mt-4 pt-4 border-t border-primary-700">
            <Field label="Audit box title" value={data?.auditTitle} onChange={(v) => set('auditTitle', v)} />
            <Field label="Audit CTA button" value={data?.auditCta} onChange={(v) => set('auditCta', v)} />
          </div>
        </>
      )

    case 'solutionsBySpecialty':
      return (
        <>
          <Field label="Label" value={data?.label} onChange={(v) => set('label', v)} />
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Body" value={data?.body} onChange={(v) => set('body', v)} multiline />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Bullet Points</h4>
          <ListEditor items={data?.bullets || []} onChange={(v) => set('bullets', v)} singular="bullet" />
          <Field label="Link text" value={data?.linkText} onChange={(v) => set('linkText', v)} />
          <Field label="Link href" value={data?.linkHref} onChange={(v) => set('linkHref', v)} />
        </>
      )

    case 'onboarding':
      return (
        <>
          <Field label="Label" value={data?.label} onChange={(v) => set('label', v)} />
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Body" value={data?.body} onChange={(v) => set('body', v)} multiline />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Steps</h4>
          <ListEditor items={data?.items || []} onChange={(v) => set('items', v)} singular="step" />
          <Field label="CTA button text" value={data?.ctaText} onChange={(v) => set('ctaText', v)} />
        </>
      )

    case 'benefits':
      return (
        <>
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} multiline />
          <Field label="Subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} multiline />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Benefit Items</h4>
          <ListEditor items={data?.items || []} onChange={(v) => set('items', v)} singular="benefit" />
        </>
      )

    case 'about':
      return (
        <>
          <Field label="'Who We Are' heading" value={data?.whoWeAreHeading} onChange={(v) => set('whoWeAreHeading', v)} placeholder="Who We Are" />
          <Field label="'Our Locations' heading" value={data?.locationsHeading} onChange={(v) => set('locationsHeading', v)} placeholder="Our Locations" />
        </>
      )

    case 'contact':
      return (
        <>
          <Field label="Page title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="'Get in touch' heading" value={data?.getInTouchHeading} onChange={(v) => set('getInTouchHeading', v)} placeholder="Get in touch" />
          <Field label="Form heading" value={data?.scheduleHeading} onChange={(v) => set('scheduleHeading', v)} placeholder="Schedule Assessment" />
          <Field label="Phone (display)" value={data?.phone} onChange={(v) => set('phone', v)} />
          <Field label="Phone (tel)" value={data?.phoneTel} onChange={(v) => set('phoneTel', v)} />
          <Field label="Email" value={data?.email} onChange={(v) => set('email', v)} />
          <Field label="Hours title" value={data?.hoursTitle} onChange={(v) => set('hoursTitle', v)} />
          <Field label="Hours text" value={data?.hoursText} onChange={(v) => set('hoursText', v)} />
          <Field label="Form title" value={data?.formTitle} onChange={(v) => set('formTitle', v)} />
        </>
      )

    case 'footer':
      return (
        <>
          <Field label="Logo text" value={data?.logoText} onChange={(v) => set('logoText', v)} />
          <Field label="Logo highlight" value={data?.logoHighlight} onChange={(v) => set('logoHighlight', v)} />
          <Field label="Phone (display)" value={data?.phone} onChange={(v) => set('phone', v)} />
          <Field label="Phone (tel)" value={data?.phoneTel} onChange={(v) => set('phoneTel', v)} />
          <Field label="Copyright" value={data?.copyright} onChange={(v) => set('copyright', v)} />
          <h4 className="text-primary-300 text-sm font-semibold mb-2 mt-4 text-center">Footer Links</h4>
          <LinksEditor links={data?.links || []} onChange={(v) => set('links', v)} />
        </>
      )

    case 'locations': {
      const locs = Array.isArray(data) ? data : []
      const updateLoc = (i, patch) => updateSection('locations', () => locs.map((l, idx) => (idx === i ? { ...l, ...patch } : l)))
      const addLoc = () => updateSection('locations', () => [...locs, { name: '', address: '', phone: '' }])
      const removeLoc = (i) => updateSection('locations', () => locs.filter((_, idx) => idx !== i))
      return (
        <>
          {locs.map((loc, i) => (
            <div key={i} className="mb-4 p-4 rounded-lg border border-primary-600 bg-primary-900/30 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-accent-gold text-sm font-medium">Location {i + 1}</span>
                <button type="button" onClick={() => removeLoc(i)} className="text-red-400 hover:text-red-300 px-2">×</button>
              </div>
              <Field label="Name" value={loc.name} onChange={(v) => updateLoc(i, { name: v })} placeholder="e.g. United States" />
              <Field label="Address (use line breaks)" value={loc.address} onChange={(v) => updateLoc(i, { address: v })} multiline placeholder="30 N Gould St Ste N&#10;Sheridan, WY 82801" />
              <Field label="Phone (optional)" value={loc.phone} onChange={(v) => updateLoc(i, { phone: v })} placeholder="+92-333-096-0543" />
            </div>
          ))}
          <button type="button" onClick={addLoc} className="text-accent-gold hover:text-accent-goldLight text-sm font-medium">+ Add location</button>
        </>
      )
    }

    case 'careers': {
      const whyJoin = data?.whyJoin || []
      const bens = data?.benefits || []
      const openRoles = data?.openRoles || []
      const updateRole = (i, patch) => set('openRoles', openRoles.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))
      const addRole = () => set('openRoles', [...openRoles, { title: '', location: '', dept: '' }])
      const removeRole = (i) => set('openRoles', openRoles.filter((_, idx) => idx !== i))
      return (
        <>
          <div className="space-y-6">
            <div>
              <h4 className="text-primary-300 text-sm font-semibold mb-3 text-center">Page Headings</h4>
              <Field label="'Why Join Us' heading" value={data?.whyJoinHeading} onChange={(v) => set('whyJoinHeading', v)} placeholder="Why Join Us" />
              <Field label="'What We Offer' heading" value={data?.benefitsHeading} onChange={(v) => set('benefitsHeading', v)} placeholder="What We Offer" />
              <Field label="'Open Positions' heading" value={data?.positionsHeading} onChange={(v) => set('positionsHeading', v)} placeholder="Open Positions" />
              <Field label="Positions subtitle" value={data?.positionsSubtitle} onChange={(v) => set('positionsSubtitle', v)} multiline />
            </div>

            <div className="pt-4 border-t border-primary-700">
              <h4 className="text-primary-300 text-sm font-semibold mb-3 text-center">Why Join Us Cards</h4>
              <ListEditor items={whyJoin} onChange={(v) => set('whyJoin', v)} singular="card" />
            </div>

            <div className="pt-4 border-t border-primary-700">
              <h4 className="text-primary-300 text-sm font-semibold mb-3 text-center">Benefits List</h4>
              <ListEditor items={bens} onChange={(v) => set('benefits', v)} singular="benefit" />
            </div>

            <div className="pt-4 border-t border-primary-700">
              <h4 className="text-primary-300 text-sm font-semibold mb-3 text-center">Open Positions</h4>
              {openRoles.map((role, i) => (
                <div key={i} className="mb-4 p-4 rounded-lg border border-primary-600 bg-primary-900/30 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-accent-gold text-sm font-medium">Role {i + 1}</span>
                    <button type="button" onClick={() => removeRole(i)} className="text-red-400 hover:text-red-300 px-2">×</button>
                  </div>
                  <Field label="Job title" value={role.title} onChange={(v) => updateRole(i, { title: v })} />
                  <Field label="Department" value={role.dept} onChange={(v) => updateRole(i, { dept: v })} />
                  <Field label="Location" value={role.location} onChange={(v) => updateRole(i, { location: v })} placeholder="Remote / On-site" />
                </div>
              ))}
              <button type="button" onClick={addRole} className="text-accent-gold hover:text-accent-goldLight text-sm font-medium">+ Add position</button>
            </div>

            <div className="pt-4 border-t border-primary-700">
              <h4 className="text-primary-300 text-sm font-semibold mb-3 text-center">Bottom CTA</h4>
              <Field label="CTA Title" value={data?.ctaTitle} onChange={(v) => set('ctaTitle', v)} />
              <Field label="CTA Body" value={data?.ctaBody} onChange={(v) => set('ctaBody', v)} multiline />
              <Field label="CTA Button text" value={data?.ctaButton} onChange={(v) => set('ctaButton', v)} />
            </div>
          </div>
        </>
      )
    }

    default:
      return <p className="text-primary-400">No editor available for this section.</p>
  }
}

const STATUS_CONFIG = {
  pending: { label: 'Pending', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30' },
  approved: { label: 'Approved', color: 'text-green-400 bg-green-400/10 border-green-400/30' },
  rejected: { label: 'Rejected', color: 'text-red-400 bg-red-400/10 border-red-400/30' },
}

function AppointmentsManager() {
  const { appointments, updateStatus, deleteAppointment } = useAppointments()
  const [filter, setFilter] = useState('all')
  const [emailFeedback, setEmailFeedback] = useState(null)

  const handleApprove = async (appt) => {
    updateStatus(appt.id, 'approved')
    setEmailFeedback(null)
    const result = await sendAppointmentConfirmationEmail(appt)
    if (result.ok) {
      setEmailFeedback({ type: 'success', msg: `Confirmation email sent to ${appt.email}` })
    } else {
      setEmailFeedback({ type: 'error', msg: result.error || 'Failed to send email' })
    }
    setTimeout(() => setEmailFeedback(null), 5000)
  }

  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter)
  const counts = {
    all: appointments.length,
    pending: appointments.filter((a) => a.status === 'pending').length,
    approved: appointments.filter((a) => a.status === 'approved').length,
    rejected: appointments.filter((a) => a.status === 'rejected').length,
  }

  return (
    <div>
      {emailFeedback && (
        <div className={`mb-6 p-4 rounded-xl text-sm text-center ${emailFeedback.type === 'success' ? 'bg-green-900/30 border border-green-600/40 text-green-400' : 'bg-red-900/30 border border-red-600/40 text-red-400'}`}>
          {emailFeedback.msg}
        </div>
      )}
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { key: 'all', label: 'Total', value: counts.all, cls: 'text-white' },
          { key: 'pending', label: 'Pending', value: counts.pending, cls: 'text-yellow-400' },
          { key: 'approved', label: 'Approved', value: counts.approved, cls: 'text-green-400' },
          { key: 'rejected', label: 'Rejected', value: counts.rejected, cls: 'text-red-400' },
        ].map((s) => (
          <button key={s.key} type="button" onClick={() => setFilter(s.key)} className={`p-4 rounded-xl border text-center transition ${filter === s.key ? 'border-accent-gold bg-primary-800' : 'border-primary-600 bg-primary-800/50 hover:border-primary-500'}`}>
            <div className={`text-2xl font-bold ${s.cls}`}>{s.value}</div>
            <div className="text-primary-400 text-xs mt-1">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Appointments list */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-primary-400">
          <p className="text-lg">No {filter === 'all' ? '' : filter} appointments yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((appt) => {
            const st = STATUS_CONFIG[appt.status] || STATUS_CONFIG.pending
            return (
              <div key={appt.id} className="bg-primary-800 border border-primary-600 rounded-xl p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <h4 className="text-white font-semibold">{appt.name}</h4>
                    <p className="text-primary-400 text-sm mt-0.5">{appt.email}{appt.phone ? ` · ${appt.phone}` : ''}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border font-medium shrink-0 ${st.color}`}>{st.label}</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 text-sm mb-4">
                  <div className="bg-primary-900/50 rounded-lg p-3">
                    <span className="text-primary-400 text-xs block">Date</span>
                    <span className="text-white font-medium">{appt.date}</span>
                  </div>
                  <div className="bg-primary-900/50 rounded-lg p-3">
                    <span className="text-primary-400 text-xs block">Time</span>
                    <span className="text-white font-medium">{appt.time}</span>
                  </div>
                  <div className="bg-primary-900/50 rounded-lg p-3">
                    <span className="text-primary-400 text-xs block">Specialty</span>
                    <span className="text-white font-medium">{appt.specialty || '—'}</span>
                  </div>
                </div>
                {appt.message && (
                  <p className="text-primary-300 text-sm mb-4 bg-primary-900/30 rounded-lg p-3">"{appt.message}"</p>
                )}
                <div className="flex items-center gap-2 flex-wrap text-sm">
                  {appt.status === 'pending' && (
                    <>
                      <button type="button" onClick={() => handleApprove(appt)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-500 transition">Approve</button>
                      <button type="button" onClick={() => updateStatus(appt.id, 'rejected')} className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-500 transition">Reject</button>
                    </>
                  )}
                  {appt.status === 'rejected' && (
                    <button type="button" onClick={() => handleApprove(appt)} className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-500 transition">Approve</button>
                  )}
                  {appt.status === 'approved' && (
                    <button type="button" onClick={() => updateStatus(appt.id, 'pending')} className="px-4 py-2 rounded-lg border border-primary-600 text-primary-300 font-medium hover:bg-primary-700 transition">Revert to Pending</button>
                  )}
                  <button type="button" onClick={() => { if (confirm('Delete this appointment?')) deleteAppointment(appt.id) }} className="px-4 py-2 rounded-lg border border-red-600/50 text-red-400 font-medium hover:bg-red-900/20 transition ml-auto">Delete</button>
                </div>
                <p className="text-primary-500 text-xs mt-3">Booked: {new Date(appt.createdAt).toLocaleString()}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('admin-auth') === '1')
  const { config, updateSection, replaceConfig, resetToDefaults } = useSiteConfig()
  const [activePage, setActivePage] = useState('home')
  const [exportImport, setExportImport] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const handleExport = () => setExportImport(JSON.stringify(config, null, 2))
  const handleImport = () => {
    try {
      const next = JSON.parse(exportImport)
      replaceConfig(next)
      setExportImport('')
    } catch (e) {
      alert('Invalid JSON: ' + e.message)
    }
  }
  const handleLogout = () => {
    sessionStorage.removeItem('admin-auth')
    setAuthenticated(false)
  }

  if (!authenticated) return <AdminLogin onLogin={setAuthenticated} />

  const currentPage = ADMIN_PAGES.find((p) => p.id === activePage) || ADMIN_PAGES[0]

  return (
    <div className="min-h-screen bg-primary-900">
      <nav className="sticky top-0 z-20 bg-primary-800 border-b border-primary-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-center gap-1 py-2 overflow-x-auto">
            {ADMIN_PAGES.map((page) => (
              <button
                key={page.id}
                type="button"
                onClick={() => setActivePage(page.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                  activePage === page.id
                    ? 'bg-accent-gold text-primary-900'
                    : 'text-primary-300 hover:text-white hover:bg-primary-700'
                }`}
              >
                {page.label}
              </button>
            ))}
            <span className="mx-1 text-primary-600">|</span>
            <Link to="/" className="px-4 py-2 rounded-lg text-sm font-medium text-primary-300 hover:text-white hover:bg-primary-700 whitespace-nowrap transition">View Site</Link>
            <button type="button" onClick={handleLogout} className="px-4 py-2 rounded-lg text-sm font-medium text-primary-300 hover:text-white hover:bg-primary-700 whitespace-nowrap transition">Log out</button>
          </div>
          <div className="md:hidden py-2">
            <button
              type="button"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg bg-primary-700 text-white text-sm font-medium"
            >
              <span>{currentPage.label}</span>
              <svg className={`w-4 h-4 transition-transform ${mobileNavOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileNavOpen && (
              <div className="mt-1 rounded-lg bg-primary-700 border border-primary-600 overflow-hidden">
                {ADMIN_PAGES.map((page) => (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => { setActivePage(page.id); setMobileNavOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition ${
                      activePage === page.id
                        ? 'bg-accent-gold/20 text-accent-gold font-medium'
                        : 'text-primary-200 hover:bg-primary-600'
                    }`}
                  >
                    {page.label}
                  </button>
                ))}
                <div className="border-t border-primary-600">
                  <Link to="/" className="block w-full text-left px-4 py-2.5 text-sm text-primary-200 hover:bg-primary-600 transition">View Site</Link>
                  <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-primary-200 hover:bg-primary-600 transition">Log out</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h1 className="text-2xl font-bold text-white text-center">{currentPage.label}</h1>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button type="button" onClick={handleExport} className="px-3 py-1.5 rounded-lg border border-primary-600 text-primary-300 text-sm hover:bg-primary-800 transition">
              Export JSON
            </button>
            <button type="button" onClick={resetToDefaults} className="px-3 py-1.5 rounded-lg border border-red-600/50 text-red-400 text-sm hover:bg-red-900/20 transition">
              Reset All
            </button>
          </div>
        </div>

        {/* Appointments view */}
        {activePage === 'appointments' && <AppointmentsManager />}

        {/* Section editors for current page */}
        {activePage !== 'appointments' && (
          <div className="space-y-8">
            {currentPage.sections.map((s) => (
              <section key={s.id} className="bg-primary-800 border border-primary-600 rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-primary-800 border-b border-primary-700 text-center">
                  <h3 className="text-lg font-semibold text-accent-gold">{s.label}</h3>
                </div>
                <div className="p-6">
                  <SectionEditor sectionId={s.id} config={config} updateSection={updateSection} />
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Import/Export */}
        {activePage === 'global' && (
          <section className="mt-10 bg-primary-800 border border-primary-600 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-primary-700 text-center">
              <h3 className="text-lg font-semibold text-accent-gold">Import / Export Full Config</h3>
            </div>
            <div className="p-6">
              <textarea
                value={exportImport}
                onChange={(e) => setExportImport(e.target.value)}
                placeholder="Paste JSON here to import, or click Export JSON above"
                className="w-full rounded-lg border border-primary-600 bg-primary-900 px-5 py-4 text-primary-100 font-mono text-sm min-h-[180px] text-left"
              />
              <button type="button" onClick={handleImport} className="mt-3 py-2.5 px-6 rounded-lg bg-accent-gold text-primary-900 font-medium hover:bg-accent-goldLight transition">
                Import JSON
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
