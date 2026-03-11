import { useState } from 'react'
import { AnimateOnScroll } from './components/AnimateOnScroll'
import { StatsBarChart } from './components/charts/StatsBarChart'
import { RevenueGrowthChart } from './components/charts/RevenueGrowthChart'
import { ServicesDonutChart } from './components/charts/ServicesDonutChart'
import { BenefitsChart } from './components/charts/BenefitsChart'
import { useSiteConfig } from './context/SiteConfigContext'

export default function App() {
  const { config } = useSiteConfig()
  const [specialty, setSpecialty] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '', attachments: [] })
  const header = config.header || {}
  const hero = config.hero || {}
  const deltaApproach = config.deltaApproach || {}
  const trust = config.trust || {}
  const specialties = config.specialties || []
  const stats = config.stats || []
  const increaseRevenue = config.increaseRevenue || {}
  const services = config.services || {}
  const providerCta = config.providerCta || {}
  const why = config.why || {}
  const solutionsBySpecialty = config.solutionsBySpecialty || {}
  const onboarding = config.onboarding || {}
  const benefits = config.benefits || {}
  const deltaOne = config.deltaOne || {}
  const testimonial = config.testimonial || {}
  const contact = config.contact || {}
  const footer = config.footer || {}

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you! We will be in touch soon.')
  }

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Header – Delta navy + gold accent */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary-900 border-b border-primary-800 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18 w-full">
            <a href="#" className="flex items-center gap-2 shrink-0 min-h-[2.25rem]">
              <img src="/assets/logo.png" alt={`${header.logoText} ${header.logoHighlight}`} className="h-8 lg:h-9 w-auto object-contain align-middle flex-shrink-0" />
              <span className="font-display font-bold text-xl text-white leading-none flex items-center -mt-2">{header.logoText} <span className="text-accent-gold">{header.logoHighlight}</span></span>
            </a>
            <nav className="hidden lg:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
              {(header.navLinks || []).map((link) => (
                <a key={link.href} href={link.href} className="text-primary-200 hover:text-accent-gold transition">{link.label}</a>
              ))}
              <a href={`tel:${(header.phoneTel || '').replace(/\s/g, '')}`} className="text-primary-200 hover:text-accent-gold">{header.phone}</a>
            </nav>
            <a href="#contact" className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent-gold text-primary-900 font-medium hover:bg-accent-goldLight transition shrink-0 text-sm">{header.ctaText}</a>
            <button type="button" className="lg:hidden p-2 text-primary-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-primary-800 space-y-3">
              {(header.navLinks || []).map((link) => (
                <a key={link.href} href={link.href} className="block text-primary-200 hover:text-accent-gold" onClick={() => setMobileMenuOpen(false)}>{link.label}</a>
              ))}
              <a href={`tel:${(header.phoneTel || '').replace(/\s/g, '')}`} className="block text-primary-200 hover:text-accent-gold">{header.phone}</a>
              <a href="#contact" className="inline-flex px-4 py-2 rounded-lg bg-accent-gold text-primary-900 font-medium text-sm">{header.ctaText}</a>
            </div>
          )}
        </div>
      </header>

      <main className="pt-16">
        {/* Hero */}
        <AnimateOnScroll as="section" className="relative bg-primary-900 text-accent-gold overflow-hidden min-h-[44rem] lg:min-h-[50rem] flex items-center">
          {/* Background video from assets */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster=""
            >
              <source src={hero.videoSrc || '/assets/herovideo.mp4'} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary-900/80" aria-hidden />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              {hero.headline}
            </h1>
          </div>
        </AnimateOnScroll>

        {/* The Delta Approach - from Delta site */}
        <AnimateOnScroll as="section" id="approach" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">{deltaApproach.title}</h2>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              {(deltaApproach.items || []).map((item, i) => (
                <AnimateOnScroll key={item.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={120 * i} className="p-6 lg:p-8 rounded-lg border border-primary-600 bg-primary-900/50">
                  <div className="flex justify-center mb-4">
                    {i === 0 && (
                      <svg className="w-14 h-14 text-accent-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                        <path d="M3 3v5h5" />
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1 6.74-2.74L21 16" />
                        <path d="M21 21v-5h-5" />
                      </svg>
                    )}
                    {i === 1 && (
                      <svg className="w-14 h-14 text-accent-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    )}
                    {i === 2 && (
                      <svg className="w-14 h-14 text-accent-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-accent-gold">{item.title}</h3>
                  <p className="mt-4 text-primary-300 text-sm leading-relaxed">{item.desc}</p>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Where trust connects and revenue endures - from Delta site */}
        <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-wrap justify-center gap-10 sm:gap-14 mb-8" aria-hidden>
              <div className="flex flex-col items-center gap-2">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-accent-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-primary-400 text-xs font-medium uppercase tracking-wider">Trust</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-accent-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span className="text-primary-400 text-xs font-medium uppercase tracking-wider">Connects</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <svg className="w-14 h-14 sm:w-16 sm:h-16 text-accent-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
                <span className="text-primary-400 text-xs font-medium uppercase tracking-wider">Endures</span>
              </div>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">{trust.heading}</h2>
            {(trust.paragraphs || []).map((p, i) => (
              <p key={i} className="mt-6 text-primary-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </AnimateOnScroll>

        {/* Below hero: specialty selector, stats */}
        <AnimateOnScroll as="section" direction="right" className="py-16 lg:py-20 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto justify-center">
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="flex-1 rounded-lg border border-primary-600 bg-primary-800 px-4 py-3 text-primary-100 focus:border-accent-gold focus:ring-2 focus:ring-accent-gold/30 outline-none"
              >
                <option value="">Select Your Specialty</option>
                {specialties.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition shrink-0">
                Get Solution
              </a>
            </div>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, i) => (
                <AnimateOnScroll key={stat.label} direction={i % 2 === 0 ? 'left' : 'right'} delay={80 * i} className="text-center p-6 lg:p-8 rounded-xl bg-primary-800 border border-primary-600 shadow-sm hover:border-primary-500 transition">
                  <div className="font-display text-3xl lg:text-4xl font-bold text-accent-gold">{stat.value}</div>
                  <div className="text-primary-300 text-sm mt-2 font-medium">{stat.label}</div>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll direction="left" delay={100}>
              <StatsBarChart />
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>

        {/* Increase Revenue */}
        <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-accent-gold font-semibold text-lg">{increaseRevenue.subtitle}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold mt-2 max-w-3xl mx-auto">
              {increaseRevenue.title}
            </h2>
            <p className="mt-6 text-primary-300 max-w-2xl mx-auto">
              {increaseRevenue.body}
            </p>
            <AnimateOnScroll direction="right" delay={80}>
              <RevenueGrowthChart />
            </AnimateOnScroll>
            <a href={increaseRevenue.linkHref || '#about'} className="inline-flex mt-8 text-accent-gold font-semibold hover:text-accent-goldDark">{increaseRevenue.linkText}</a>
          </div>
        </AnimateOnScroll>

        {/* Services Grid */}
        <AnimateOnScroll as="section" id="services" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold">{services.title}</h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              {services.subtitle}
            </p>
            <AnimateOnScroll direction="right" delay={60}>
              <ServicesDonutChart />
            </AnimateOnScroll>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(services.items || []).map((service, i) => (
                <AnimateOnScroll key={service.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={60 * i}>
                  <a href={service.href} className="group block p-6 rounded-xl bg-primary-900 border border-primary-600 hover:border-primary-500 transition text-center">
                    <span className="text-2xl">{service.icon}</span>
                    <h3 className="font-display text-lg font-semibold text-accent-gold mt-3 group-hover:text-accent-goldLight transition">{service.title}</h3>
                    <p className="mt-2 text-primary-300 text-sm">{service.desc}</p>
                    <span className="inline-flex mt-4 text-accent-gold font-medium text-sm group-hover:underline">Explore →</span>
                  </a>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Provider Success CTA */}
        <AnimateOnScroll as="section" direction="right" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">{providerCta.title}</h2>
            <p className="mt-4 text-primary-100 max-w-2xl mx-auto">
              {providerCta.body}
            </p>
            <a href="#contact" className="inline-flex mt-8 px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">{providerCta.ctaText}</a>
          </div>
        </AnimateOnScroll>

        {/* Why Delta Revenue Partners */}
        <AnimateOnScroll as="section" id="why" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold">{why.title}</h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              {why.subtitle}
            </p>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {(why.items || []).map((item, i) => (
                <AnimateOnScroll key={item.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={80 * i} className="p-6 rounded-xl border border-primary-600 bg-primary-800/80 text-center">
                  <h3 className="font-display text-lg font-bold text-accent-gold">{item.title}</h3>
                  <p className="mt-2 text-primary-300 text-sm">{item.desc}</p>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll direction="right" delay={200} className="mt-14 p-8 rounded-2xl bg-primary-800 border border-primary-600 text-center">
              <h3 className="font-display text-xl font-semibold text-accent-gold">{why.auditTitle}</h3>
              <a href="#contact" className="inline-flex mt-6 px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">{why.auditCta}</a>
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>

        {/* Solutions By Specialty */}
        <AnimateOnScroll as="section" direction="right" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-accent-gold font-semibold uppercase tracking-wider text-sm">{solutionsBySpecialty.label}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold mt-2">
              {solutionsBySpecialty.title}
            </h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              {solutionsBySpecialty.body}
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-primary-300 justify-items-center max-w-2xl mx-auto list-none">
              {(solutionsBySpecialty.bullets || []).map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-accent-gold">✓</span> {item}
                </li>
              ))}
            </ul>
            <a href={solutionsBySpecialty.linkHref || '#specialties'} className="inline-flex mt-8 text-accent-gold font-semibold hover:text-accent-goldDark">{solutionsBySpecialty.linkText}</a>
          </div>
        </AnimateOnScroll>

        {/* Onboarding */}
        <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-accent-gold font-semibold uppercase tracking-wider text-sm">{onboarding.label}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold mt-2">
              {onboarding.title}
            </h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              {onboarding.body}
            </p>
            <ul className="mt-8 space-y-3 mx-auto w-full max-w-md">
              {(onboarding.items || []).map((item) => (
                <li key={item} className="flex items-center justify-center gap-3 text-primary-300 text-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gold/20 text-accent-gold text-sm font-semibold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-flex mt-10 px-6 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">{onboarding.ctaText}</a>
          </div>
        </AnimateOnScroll>

        {/* Benefits */}
        <AnimateOnScroll as="section" direction="right" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold">
              {benefits.title}
            </h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              {benefits.subtitle}
            </p>
            <AnimateOnScroll direction="left" delay={80}>
              <BenefitsChart />
            </AnimateOnScroll>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(benefits.items || []).map((benefit, i) => (
                <AnimateOnScroll key={benefit} direction={i % 2 === 0 ? 'left' : 'right'} delay={70 * i} className="p-6 rounded-xl bg-primary-900 border border-primary-600 text-center">
                  <h3 className="font-display font-semibold text-accent-gold">{benefit}</h3>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Delta One */}
        <AnimateOnScroll as="section" direction="right" className="py-16 lg:py-24 bg-primary-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">{deltaOne.title}</h2>
            <p className="mt-2 text-primary-200">{deltaOne.subtitle}</p>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              {deltaOne.body}
            </p>
            <a href="#contact" className="inline-flex mt-8 px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">{deltaOne.ctaText}</a>
          </div>
        </AnimateOnScroll>

        {/* Testimonial */}
        <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="font-display text-xl sm:text-2xl text-primary-200 italic">
              {testimonial.quote}
            </blockquote>
            <p className="mt-6 font-semibold text-accent-gold">{testimonial.author}</p>
            <p className="text-primary-400 text-sm">{testimonial.role}</p>
          </div>
        </AnimateOnScroll>

        {/* Partner With Us - from Delta site */}
        <AnimateOnScroll as="section" id="contact" direction="right" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold text-center">{contact.title}</h2>
            <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="text-center lg:text-left">
                <a href={`tel:${(contact.phoneTel || '').replace(/\s/g, '')}`} className="text-white font-semibold hover:text-accent-gold block transition">{contact.phone}</a>
                <a href={`mailto:${contact.email}`} className="text-white font-semibold hover:text-accent-gold block mt-2 transition">{contact.email}</a>
                <div className="mt-8 pt-8 border-t border-primary-600">
                  <h3 className="font-display font-semibold text-accent-gold">{contact.hoursTitle}</h3>
                  <p className="mt-2 text-primary-400 text-sm">{contact.hoursText}</p>
                </div>
              </div>
              <div className="bg-primary-800 p-8 rounded-lg border border-primary-600 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-accent-gold mb-6">{contact.formTitle}</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="partner-name" className="block text-sm font-medium text-primary-300 mb-1">Name</label>
                    <input id="partner-name" type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-md border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold outline-none" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="partner-email" className="block text-sm font-medium text-primary-300 mb-1">Email *</label>
                    <input id="partner-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-md border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold outline-none" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-300 mb-1">Attach Files</label>
                    <input type="file" multiple onChange={(e) => setFormData({ ...formData, attachments: Array.from(e.target.files || []) })} className="w-full rounded-md border border-primary-600 bg-primary-900 px-4 py-3 text-sm text-primary-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-700 file:text-primary-200 hover:file:bg-primary-600" />
                    <p className="mt-1 text-primary-500 text-xs">Attachments ({formData.attachments.length})</p>
                  </div>
                  <div>
                    <label htmlFor="partner-message" className="block text-sm font-medium text-primary-300 mb-1">Message</label>
                    <textarea id="partner-message" rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-md border border-primary-600 bg-primary-900 px-4 py-3 text-primary-100 placeholder-primary-500 focus:ring-2 focus:ring-accent-gold focus:border-accent-gold outline-none resize-none" placeholder="Your message" />
                  </div>
                  <p className="text-primary-500 text-xs">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                  <div className="flex gap-3">
                    <button type="submit" className="px-6 py-3 rounded-md bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">Send</button>
                    <button type="button" onClick={() => setFormData({ name: '', email: '', message: '', attachments: [] })} className="px-6 py-3 rounded-md border border-primary-600 text-primary-300 font-medium hover:bg-primary-700 transition">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-primary-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <a href="#" className="flex items-center gap-2 min-h-[2rem]">
              <img src="/assets/logo.png" alt={`${footer.logoText} ${footer.logoHighlight}`} className="h-8 w-auto object-contain align-middle flex-shrink-0" />
              <span className="font-display font-bold text-xl text-white leading-none flex items-center -mt-2">{footer.logoText} <span className="text-accent-gold">{footer.logoHighlight}</span></span>
            </a>
            <div className="flex flex-wrap justify-center gap-6">
              {(footer.links || []).map((link) => (
                <a key={link.href} href={link.href} className="hover:text-accent-gold transition">{link.label}</a>
              ))}
              <a href={`tel:${(footer.phoneTel || '').replace(/\s/g, '')}`} className="hover:text-accent-gold transition">{footer.phone}</a>
            </div>
          </div>
          <p className="mt-8 text-center text-primary-500 text-sm">Copyright © {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
