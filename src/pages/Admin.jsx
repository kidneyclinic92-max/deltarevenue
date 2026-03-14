import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteConfig } from '../context/SiteConfigContext'

const ADMIN_PASSWORD = 'deltaadmin'

const PAGES = [
  {
    page: 'Global',
    sections: [
      { id: 'header', label: 'Header & Nav' },
      { id: 'footer', label: 'Footer' },
    ],
  },
  {
    page: 'Home Page',
    sections: [
      { id: 'hero', label: 'Hero' },
      { id: 'trust', label: 'Trust Section' },
      { id: 'specialties', label: 'Specialties' },
      { id: 'stats', label: 'Stats' },
      { id: 'achievements', label: 'Achievements' },
      { id: 'increaseRevenue', label: 'Increase Revenue' },
      { id: 'providerCta', label: 'Provider CTA' },
      { id: 'why', label: 'Why Delta' },
      { id: 'solutionsBySpecialty', label: 'Solutions by Specialty' },
      { id: 'onboarding', label: 'Onboarding' },
      { id: 'benefits', label: 'Benefits' },
      { id: 'deltaOne', label: 'Delta One' },
      { id: 'testimonial', label: 'Testimonial' },
    ],
  },
  {
    page: 'Our Approach',
    sections: [
      { id: 'deltaApproach', label: 'Delta Approach Cards' },
    ],
  },
  {
    page: 'Services',
    sections: [
      { id: 'services', label: 'Services List' },
    ],
  },
  {
    page: 'About Us',
    sections: [
      { id: 'locations', label: 'Office Locations' },
    ],
  },
  {
    page: 'Contact Us',
    sections: [
      { id: 'contact', label: 'Contact Info' },
    ],
  },
  {
    page: 'Careers',
    sections: [
      { id: 'careers', label: 'Careers Page' },
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
    <div className="mb-6 text-center">
      <label className="block text-primary-300 text-sm font-medium mb-2 text-center">{label}</label>
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
    <div className="space-y-4">
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
          <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-300 px-2">×</button>
        </div>
      ))}
      <button type="button" onClick={add} className="text-accent-gold hover:text-accent-goldLight text-sm">+ Add {singular}</button>
    </div>
  )
}

function LinksEditor({ links, onChange }) {
  const setLinks = onChange
  return (
    <>
      {links.map((link, i) => (
        <div key={i} className="mb-2 flex gap-2">
          <input value={link.label || ''} onChange={(e) => setLinks(links.map((l, j) => (j === i ? { ...l, label: e.target.value } : l)))} placeholder="Label" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
          <input value={link.href || ''} onChange={(e) => setLinks(links.map((l, j) => (j === i ? { ...l, href: e.target.value } : l)))} placeholder="href (/about, #services)" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
          <button type="button" onClick={() => setLinks(links.filter((_, j) => j !== i))} className="text-red-400 px-2">×</button>
        </div>
      ))}
      <button type="button" onClick={() => setLinks([...links, { label: '', href: '/' }])} className="text-accent-gold hover:text-accent-goldLight text-sm">+ Add link</button>
    </>
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
          <p className="text-primary-300 text-sm mb-2">Nav links</p>
          <LinksEditor links={data?.navLinks || []} onChange={(v) => set('navLinks', v)} />
        </>
      )

    case 'deltaApproach':
      return (
        <>
          <Field label="Section title" value={data?.title} onChange={(v) => set('title', v)} />
          <p className="text-primary-300 text-sm mb-2">Cards</p>
          <ListEditor items={data?.items || []} onChange={(v) => set('items', v)} singular="card" />
        </>
      )

    case 'trust':
      return (
        <>
          <Field label="Heading" value={data?.heading} onChange={(v) => set('heading', v)} />
          <p className="text-primary-300 text-sm mb-2">Paragraphs (HTML allowed)</p>
          <ListEditor items={data?.paragraphs || []} onChange={(v) => set('paragraphs', v)} singular="paragraph" />
        </>
      )

    case 'specialties':
      return (
        <>
          <p className="text-primary-300 text-sm mb-2">Specialty options</p>
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
            <div key={i} className="mb-4 p-4 rounded-lg border border-primary-600 flex gap-2 items-center">
              <input value={s.value || ''} onChange={(e) => updateStat(i, 'value', e.target.value)} placeholder="Value (e.g. 25%)" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <input value={s.label || ''} onChange={(e) => updateStat(i, 'label', e.target.value)} placeholder="Label" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <button type="button" onClick={() => removeStat(i)} className="text-red-400">×</button>
            </div>
          ))}
          <button type="button" onClick={addStat} className="text-accent-gold hover:text-accent-goldLight text-sm">+ Add stat</button>
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
          <p className="text-primary-300 text-sm mb-2">Achievement items</p>
          {items.map((s, i) => (
            <div key={i} className="mb-4 p-4 rounded-lg border border-primary-600 flex gap-2 items-center">
              <input value={s.value || ''} onChange={(e) => updateItem(i, 'value', e.target.value)} placeholder="Value (e.g. 10+)" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <input value={s.label || ''} onChange={(e) => updateItem(i, 'label', e.target.value)} placeholder="Label" className="flex-1 rounded-lg border border-primary-600 bg-primary-900 px-4 py-2 text-primary-100" />
              <button type="button" onClick={() => removeItem(i)} className="text-red-400">×</button>
            </div>
          ))}
          <button type="button" onClick={addItem} className="text-accent-gold hover:text-accent-goldLight text-sm">+ Add achievement</button>
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
          <Field label="Section title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} multiline />
          <p className="text-primary-300 text-sm mb-2">Service cards</p>
          {items.map((item, i) => (
            <div key={i} className="mb-4 p-4 rounded-lg border border-primary-600 space-y-2">
              <div className="flex justify-between">
                <span className="text-accent-gold text-sm">Service {i + 1}</span>
                <button type="button" onClick={() => removeItem(i)} className="text-red-400">×</button>
              </div>
              <Field label="Icon (emoji)" value={item.icon} onChange={(v) => updateItem(i, { icon: v })} />
              <Field label="Title" value={item.title} onChange={(v) => updateItem(i, { title: v })} />
              <Field label="Description" value={item.desc} onChange={(v) => updateItem(i, { desc: v })} multiline />
            </div>
          ))}
          <button type="button" onClick={addItem} className="text-accent-gold hover:text-accent-goldLight text-sm">+ Add service</button>
        </>
      )
    }

    case 'providerCta':
      return (
        <>
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Body" value={data?.body} onChange={(v) => set('body', v)} multiline />
          <Field label="CTA text" value={data?.ctaText} onChange={(v) => set('ctaText', v)} />
        </>
      )

    case 'why':
      return (
        <>
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} multiline />
          <ListEditor items={data?.items || []} onChange={(v) => set('items', v)} singular="item" />
          <Field label="Audit box title" value={data?.auditTitle} onChange={(v) => set('auditTitle', v)} />
          <Field label="Audit CTA" value={data?.auditCta} onChange={(v) => set('auditCta', v)} />
        </>
      )

    case 'solutionsBySpecialty':
      return (
        <>
          <Field label="Label" value={data?.label} onChange={(v) => set('label', v)} />
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Body" value={data?.body} onChange={(v) => set('body', v)} multiline />
          <p className="text-primary-300 text-sm mb-2">Bullets</p>
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
          <ListEditor items={data?.items || []} onChange={(v) => set('items', v)} singular="step" />
          <Field label="CTA text" value={data?.ctaText} onChange={(v) => set('ctaText', v)} />
        </>
      )

    case 'benefits':
      return (
        <>
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} multiline />
          <Field label="Subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} multiline />
          <ListEditor items={data?.items || []} onChange={(v) => set('items', v)} singular="benefit" />
        </>
      )

    case 'deltaOne':
      return (
        <>
          <Field label="Title" value={data?.title} onChange={(v) => set('title', v)} />
          <Field label="Subtitle" value={data?.subtitle} onChange={(v) => set('subtitle', v)} />
          <Field label="Body" value={data?.body} onChange={(v) => set('body', v)} multiline />
          <Field label="CTA text" value={data?.ctaText} onChange={(v) => set('ctaText', v)} />
        </>
      )

    case 'testimonial':
      return (
        <>
          <Field label="Quote" value={data?.quote} onChange={(v) => set('quote', v)} multiline />
          <Field label="Author" value={data?.author} onChange={(v) => set('author', v)} />
          <Field label="Role" value={data?.role} onChange={(v) => set('role', v)} />
        </>
      )

    case 'contact':
      return (
        <>
          <Field label="Section title" value={data?.title} onChange={(v) => set('title', v)} />
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
          <p className="text-primary-300 text-sm mb-2 mt-4">Footer links</p>
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
          <p className="text-primary-300 text-sm mb-2">Office locations (shown on About page)</p>
          {locs.map((loc, i) => (
            <div key={i} className="mb-4 p-4 rounded-lg border border-primary-600 space-y-2">
              <div className="flex justify-between">
                <span className="text-accent-gold text-sm">Location {i + 1}</span>
                <button type="button" onClick={() => removeLoc(i)} className="text-red-400">×</button>
              </div>
              <Field label="Name" value={loc.name} onChange={(v) => updateLoc(i, { name: v })} placeholder="e.g. United States" />
              <Field label="Address (use line breaks)" value={loc.address} onChange={(v) => updateLoc(i, { address: v })} multiline placeholder="30 N Gould St Ste N&#10;Sheridan, WY 82801" />
              <Field label="Phone (optional)" value={loc.phone} onChange={(v) => updateLoc(i, { phone: v })} placeholder="+92-333-096-0543" />
            </div>
          ))}
          <button type="button" onClick={addLoc} className="text-accent-gold hover:text-accent-goldLight text-sm">+ Add location</button>
        </>
      )
    }

    case 'careers': {
      const whyJoin = data?.whyJoin || []
      const benefits = data?.benefits || []
      const openRoles = data?.openRoles || []
      const updateWhyJoin = (v) => set('whyJoin', v)
      const updateBenefits = (v) => set('benefits', v)
      const updateRole = (i, patch) => set('openRoles', openRoles.map((r, idx) => (idx === i ? { ...r, ...patch } : r)))
      const addRole = () => set('openRoles', [...openRoles, { title: '', location: '', dept: '' }])
      const removeRole = (i) => set('openRoles', openRoles.filter((_, idx) => idx !== i))
      return (
        <>
          <p className="text-primary-300 text-sm mb-2 font-semibold">Why Join Us cards</p>
          <ListEditor items={whyJoin} onChange={updateWhyJoin} singular="card" />

          <p className="text-primary-300 text-sm mb-2 mt-6 font-semibold">Benefits list</p>
          <ListEditor items={benefits} onChange={updateBenefits} singular="benefit" />

          <p className="text-primary-300 text-sm mb-2 mt-6 font-semibold">Open Positions</p>
          {openRoles.map((role, i) => (
            <div key={i} className="mb-4 p-4 rounded-lg border border-primary-600 space-y-2">
              <div className="flex justify-between">
                <span className="text-accent-gold text-sm">Role {i + 1}</span>
                <button type="button" onClick={() => removeRole(i)} className="text-red-400">×</button>
              </div>
              <Field label="Job title" value={role.title} onChange={(v) => updateRole(i, { title: v })} />
              <Field label="Department" value={role.dept} onChange={(v) => updateRole(i, { dept: v })} />
              <Field label="Location" value={role.location} onChange={(v) => updateRole(i, { location: v })} placeholder="Remote / On-site" />
            </div>
          ))}
          <button type="button" onClick={addRole} className="text-accent-gold hover:text-accent-goldLight text-sm">+ Add position</button>

          <p className="text-primary-300 text-sm mb-2 mt-6 font-semibold">Bottom CTA</p>
          <Field label="CTA Title" value={data?.ctaTitle} onChange={(v) => set('ctaTitle', v)} />
          <Field label="CTA Body" value={data?.ctaBody} onChange={(v) => set('ctaBody', v)} multiline />
          <Field label="CTA Button text" value={data?.ctaButton} onChange={(v) => set('ctaButton', v)} />
        </>
      )
    }

    default:
      return <p className="text-primary-400">Edit in JSON export/import.</p>
  }
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem('admin-auth') === '1')
  const { config, updateSection, replaceConfig, resetToDefaults } = useSiteConfig()
  const [exportImport, setExportImport] = useState('')

  const handleExport = () => {
    setExportImport(JSON.stringify(config, null, 2))
  }
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

  if (!authenticated) {
    return <AdminLogin onLogin={setAuthenticated} />
  }

  return (
    <div className="min-h-screen bg-primary-900">
      <header className="sticky top-0 z-10 bg-primary-800 border-b border-primary-600 px-4 py-3 flex flex-wrap items-center justify-center gap-3">
        <span className="font-display font-bold text-accent-gold">Admin</span>
        <Link to="/" className="text-primary-300 hover:text-accent-gold text-sm px-3 py-1.5 rounded-lg hover:bg-primary-700 transition">
          View site
        </Link>
        <button type="button" onClick={handleExport} className="px-3 py-1.5 rounded-lg border border-primary-600 text-primary-300 text-sm hover:bg-primary-700 transition">
          Export JSON
        </button>
        <button type="button" onClick={resetToDefaults} className="px-3 py-1.5 rounded-lg border border-red-600/50 text-red-400 text-sm hover:bg-red-900/20 transition">
          Reset all
        </button>
        <button type="button" onClick={handleLogout} className="px-3 py-1.5 rounded-lg text-primary-500 text-sm hover:text-primary-300 transition">
          Log out
        </button>
      </header>

      <main className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 pb-20 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-white mb-12">Customize your site</h1>

        {PAGES.map((group) => (
          <div key={group.page} className="w-full mb-16">
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-primary-600">{group.page}</h2>
            {group.sections.map((s) => (
              <section key={s.id} id={`admin-${s.id}`} className="w-full mb-10">
                <h3 className="text-lg font-semibold text-accent-gold mb-4">{s.label}</h3>
                <div className="bg-primary-800 border border-primary-600 rounded-xl p-8 sm:p-10 text-center min-h-[120px]">
                  <SectionEditor sectionId={s.id} config={config} updateSection={updateSection} />
                </div>
              </section>
            ))}
          </div>
        ))}

        <section className="w-full mt-8">
          <h2 className="text-xl font-semibold text-accent-gold mb-3">Import / Export full config</h2>
          <textarea
            value={exportImport}
            onChange={(e) => setExportImport(e.target.value)}
            placeholder="Paste JSON here to import, or click Export JSON above"
            className="w-full rounded-lg border border-primary-600 bg-primary-900 px-5 py-4 text-primary-100 font-mono text-sm min-h-[180px] text-left"
          />
          <button type="button" onClick={handleImport} className="mt-3 py-3 px-6 rounded-lg bg-accent-gold text-primary-900 font-medium hover:bg-accent-goldLight">
            Import JSON
          </button>
        </section>
      </main>
    </div>
  )
}
