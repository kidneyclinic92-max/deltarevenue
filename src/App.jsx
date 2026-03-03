import { useState } from 'react'
import { AnimateOnScroll } from './components/AnimateOnScroll'
import { StatsBarChart } from './components/charts/StatsBarChart'
import { RevenueGrowthChart } from './components/charts/RevenueGrowthChart'
import { ServicesDonutChart } from './components/charts/ServicesDonutChart'
import { BenefitsChart } from './components/charts/BenefitsChart'

const SPECIALTIES = [
  'Family Medicine', 'Internal Medicine', 'Pediatrics', 'Cardiology', 'Orthopedic Surgery',
  'Dermatology', 'OB-GYN', 'Emergency Medicine', 'Radiology', 'Psychiatry', 'Gastroenterology',
  'Neurology', 'Urology', 'Pulmonology', 'Endocrinology', 'Oncology', 'Other Specialty',
]

const STATS = [
  { value: '25%', label: 'Increase Cash Flow' },
  { value: '97%', label: 'Net Collection Rate' },
  { value: '<32', label: 'Days in A/R' },
  { value: '99%', label: 'Client Success Rate' },
]

const SERVICES = [
  { title: 'Medical Billing Services', desc: 'End-to-end medical billing from claim entry to payment posting, with advanced monthly or weekly reporting.', href: '#', icon: '📋' },
  { title: 'Medical Coding Services', desc: 'Outsource to expert coders to optimize revenue while reducing compliance risks.', href: '#', icon: '📝' },
  { title: 'DME / Ambulatory Billing', desc: '24/7 DME billing and coding experts to boost your revenue.', href: '#', icon: '🩺' },
  { title: 'Hospital Billing Services', desc: 'Revenue cycle specialists providing efficient billing services to hospitals.', href: '#', icon: '🏥' },
  { title: 'Practice Audit Services', desc: 'Billing and coding audits to find issues and update your practice with the latest tech.', href: '#', icon: '🔍' },
  { title: 'Credentialing & Enrollment', desc: 'Provider enrollment and credentialing with insurance payers.', href: '#', icon: '✅' },
  { title: 'Telehealth Billing', desc: 'Automated billing for virtual care with integrated technology.', href: '#', icon: '📱' },
  { title: 'Patient Help Desk', desc: 'Dedicated help desk for hospitals, clinics, and private practices.', href: '#', icon: '🎧' },
]

const WHY_ITEMS = [
  { title: 'GO FAST', desc: 'Billing and coding key processes so you can understand and improve operations—as it happens.' },
  { title: 'GO BIG', desc: 'Improve practice billing and coding errors and streamline maximum collections.' },
  { title: 'GO BOLD', desc: "Dream up and deliver more care to your patients that advance your practice health." },
  { title: 'GO SMOOTH', desc: 'With Delta Revenue Partners, your practice will achieve the results set for success in a short time.' },
]

const BENEFITS = [
  'Eliminate All Pain Points in Your Practice',
  'Significantly Increases Collections',
  'Predictable Cash Flows & Increase Revenue',
  'No Excuses – 100% Accountability',
  "It's Easy To Use & Monitor Progress",
]

const ONBOARDING = [
  'Quick Start to Improved Efficiency',
  'Seamless Integration',
  'Step-by-Step Guidance',
  'Comprehensive Data Migration',
  'Personalized Onboarding Plan',
]

// Delta Revenue Partners section content (from https://deltarevenuepartners.com/)
const DELTA_APPROACH = [
  { title: 'End to End RCM', desc: 'Delta Revenue Partners offers fully integrated, end-to-end revenue cycle management, aligning people, processes, and technology to protect revenue, reduce friction, and build long-term financial stability for healthcare practices.' },
  { title: 'Our Clients', desc: 'Delta Revenue Partners provides revenue cycle management services to healthcare providers of all sizes and specialties. From solo practitioners to growing practices and organizations, we support anyone seeking accurate, compliant, and end-to-end revenue cycle solutions.' },
  { title: 'Compliance', desc: 'Compliance at Delta Revenue Partners is proactive and continuous. Through disciplined processes, secure technology, and regulatory awareness, we safeguard our clients\' revenue while upholding the highest standards of integrity and accountability.' },
]

export default function App() {
  const [specialty, setSpecialty] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '', attachments: [] })

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
            <a href="#" className="font-display font-bold text-xl text-white shrink-0">Delta <span className="text-accent-gold">Revenue Partners</span></a>
            <nav className="hidden lg:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
              <a href="#approach" className="text-primary-200 hover:text-accent-gold transition">Our Approach</a>
              <a href="#services" className="text-primary-200 hover:text-accent-gold transition">Services</a>
              <a href="#contact" className="text-primary-200 hover:text-accent-gold transition">Partner With Us</a>
              <a href="tel:+14055891515" className="text-primary-200 hover:text-accent-gold">(405) 589-1515</a>
            </nav>
            <a href="#contact" className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent-gold text-primary-900 font-medium hover:bg-accent-goldLight transition shrink-0 text-sm">Schedule Assessment</a>
            <button type="button" className="lg:hidden p-2 text-primary-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-primary-800 space-y-3">
              <a href="#approach" className="block text-primary-200 hover:text-accent-gold" onClick={() => setMobileMenuOpen(false)}>Our Approach</a>
              <a href="#services" className="block text-primary-200 hover:text-accent-gold" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#contact" className="block text-primary-200 hover:text-accent-gold" onClick={() => setMobileMenuOpen(false)}>Partner With Us</a>
              <a href="tel:+14055891515" className="block text-primary-200 hover:text-accent-gold">(405) 589-1515</a>
              <a href="#contact" className="inline-flex px-4 py-2 rounded-lg bg-accent-gold text-primary-900 font-medium text-sm">Schedule Assessment</a>
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
              <source src="/assets/herovideo.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-primary-900/80" aria-hidden />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full text-center">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              Top-tier Revenue Cycle Management For Each Medical Specialty
            </h1>
          </div>
        </AnimateOnScroll>

        {/* The Delta Approach - from Delta site */}
        <AnimateOnScroll as="section" id="approach" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">The Delta Approach</h2>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              {DELTA_APPROACH.map((item, i) => (
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
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">Where trust connects and revenue endures</h2>
            <p className="mt-6 text-primary-300 leading-relaxed">
              <strong>Delta Revenue Partners</strong> is a healthcare-focused organization established to support the financial operations of healthcare providers through disciplined revenue cycle expertise.
            </p>
            <p className="mt-6 text-primary-300 leading-relaxed">
              Built on industry knowledge and operational integrity, Delta Revenue Partners functions as a reliable business partner. The company is structured to deliver consistency, regulatory awareness, and transparency across all engagements, ensuring stability and continuity in an increasingly complex healthcare environment.
            </p>
            <p className="mt-6 text-primary-300 leading-relaxed">
              Delta Revenue Partners maintains a professional culture centred on precision, confidentiality, and compliance. Its organizational approach reflects a commitment to sustainable growth, responsible governance, and enduring business relationships.
            </p>
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
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <a href="#contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition shrink-0">
                Get Solution
              </a>
            </div>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {STATS.map((stat, i) => (
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
            <p className="font-display text-accent-gold font-semibold text-lg">Increase Your Practice Revenue by 15%-20%</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold mt-2 max-w-3xl mx-auto">
              Maximize Profitability & Minimize Errors With Delta Revenue Partners
            </h2>
            <p className="mt-6 text-primary-300 max-w-2xl mx-auto">
              Are you looking for faster payment processing? Wish to reduce billing overheads? Our advanced billing solutions ensure higher net collections in less time. We offer medical billing & coding services for a wide range of healthcare specialties.
            </p>
            <AnimateOnScroll direction="right" delay={80}>
              <RevenueGrowthChart />
            </AnimateOnScroll>
            <a href="#about" className="inline-flex mt-8 text-accent-gold font-semibold hover:text-accent-goldDark">About Us →</a>
          </div>
        </AnimateOnScroll>

        {/* Services Grid */}
        <AnimateOnScroll as="section" id="services" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold">Solutions & Services</h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              Unlock revenue growth with accurate claim processing. Connect with our team for tailored medical claims solutions.
            </p>
            <AnimateOnScroll direction="right" delay={60}>
              <ServicesDonutChart />
            </AnimateOnScroll>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((service, i) => (
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
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">A Solution For Your Practice Needs</h2>
            <p className="mt-4 text-primary-100 max-w-2xl mx-auto">
              Whether you're a doctor streamlining collections or a hospital optimizing claims capacity, Delta Revenue Partners has the expertise to get you on your way.
            </p>
            <a href="#contact" className="inline-flex mt-8 px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">Talk to an Expert</a>
          </div>
        </AnimateOnScroll>

        {/* Why Delta Revenue Partners */}
        <AnimateOnScroll as="section" id="why" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold">Why Delta Revenue Partners?</h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              Upgrade and simplify your practice to ensure seamless, precise, and efficient service on the go.
            </p>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {WHY_ITEMS.map((item, i) => (
                <AnimateOnScroll key={item.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={80 * i} className="p-6 rounded-xl border border-primary-600 bg-primary-800/80 text-center">
                  <h3 className="font-display text-lg font-bold text-accent-gold">{item.title}</h3>
                  <p className="mt-2 text-primary-300 text-sm">{item.desc}</p>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll direction="right" delay={200} className="mt-14 p-8 rounded-2xl bg-primary-800 border border-primary-600 text-center">
              <h3 className="font-display text-xl font-semibold text-accent-gold">Connect for a free Practice Audit to build your tailored improvement plan</h3>
              <a href="#contact" className="inline-flex mt-6 px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">Connect Now</a>
            </AnimateOnScroll>
          </div>
        </AnimateOnScroll>

        {/* Solutions By Specialty */}
        <AnimateOnScroll as="section" direction="right" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-accent-gold font-semibold uppercase tracking-wider text-sm">Solutions By Specialty</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold mt-2">
              Customized Billing Solutions For Your Medical Specialty
            </h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              Our operations and billing team is here to provide everything you need so you can focus on what matters most: caring for your patients.
            </p>
            <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-primary-300 justify-items-center max-w-2xl mx-auto list-none">
              {['Monthly audits, reporting and analytics', 'Optimized billing process', 'Smooth, accurate and faster', 'More time for patients', 'Reduce in-house cost'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-accent-gold">✓</span> {item}
                </li>
              ))}
            </ul>
            <a href="#specialties" className="inline-flex mt-8 text-accent-gold font-semibold hover:text-accent-goldDark">View All Specialties →</a>
          </div>
        </AnimateOnScroll>

        {/* Onboarding */}
        <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-accent-gold font-semibold uppercase tracking-wider text-sm">Welcome to a Smooth Start</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold mt-2">
              Effortless Onboarding and Seamless Transition
            </h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              Switching to a new billing service can seem daunting. We've designed our onboarding to be simple and stress-free.
            </p>
            <ul className="mt-8 space-y-3 mx-auto w-full max-w-md">
              {ONBOARDING.map((item) => (
                <li key={item} className="flex items-center justify-center gap-3 text-primary-300 text-center">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gold/20 text-accent-gold text-sm font-semibold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-flex mt-10 px-6 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">Let's Connect</a>
          </div>
        </AnimateOnScroll>

        {/* Benefits */}
        <AnimateOnScroll as="section" direction="right" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-accent-gold">
              Here's How Delta Revenue Partners Can Benefit Your Practice
            </h2>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              For ambitious practices across the United States, we make revenue growth simple and approachable. Our teams are experienced in each medical specialty.
            </p>
            <AnimateOnScroll direction="left" delay={80}>
              <BenefitsChart />
            </AnimateOnScroll>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((benefit, i) => (
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
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">Delta One</h2>
            <p className="mt-2 text-primary-200">The operating system for healthcare providers</p>
            <p className="mt-4 text-primary-300 max-w-2xl mx-auto">
              Run your entire medical practice, clinic, or hospital on Delta Revenue Partners with our unified solution, designed to streamline the collection process and improve revenue.
            </p>
            <a href="#contact" className="inline-flex mt-8 px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">Get Started Now</a>
          </div>
        </AnimateOnScroll>

        {/* Testimonial */}
        <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="font-display text-xl sm:text-2xl text-primary-200 italic">
              "Delta Revenue Partners has improved our revenue by reducing errors and streamlined the collection process."
            </blockquote>
            <p className="mt-6 font-semibold text-accent-gold">Donna Arkin</p>
            <p className="text-primary-400 text-sm">Certified Clinical Nurse Specialist</p>
          </div>
        </AnimateOnScroll>

        {/* Partner With Us - from Delta site */}
        <AnimateOnScroll as="section" id="contact" direction="right" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold text-center">Partner With Us</h2>
            <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="text-center lg:text-left">
                <a href="tel:+14055891515" className="text-white font-semibold hover:text-accent-gold block transition">(405) 589-1515</a>
                <a href="mailto:info@deltarevenuepartners.com" className="text-white font-semibold hover:text-accent-gold block mt-2 transition">info@deltarevenuepartners.com</a>
                <div className="mt-8 pt-8 border-t border-primary-600">
                  <h3 className="font-display font-semibold text-accent-gold">Hours</h3>
                  <p className="mt-2 text-primary-400 text-sm">Open today 09:00 am – 05:00 pm</p>
                </div>
              </div>
              <div className="bg-primary-800 p-8 rounded-lg border border-primary-600 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-accent-gold mb-6">Drop us a line!</h3>
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
            <a href="#" className="font-display font-bold text-xl text-white">Delta <span className="text-accent-gold">Revenue Partners</span></a>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#services" className="hover:text-accent-gold transition">Services</a>
              <a href="#why" className="hover:text-accent-gold transition">Why Us</a>
              <a href="#contact" className="hover:text-accent-gold transition">Partner With Us</a>
              <a href="tel:+14055891515" className="hover:text-accent-gold transition">(405) 589-1515</a>
            </div>
          </div>
          <p className="mt-8 text-center text-primary-500 text-sm">Copyright © {new Date().getFullYear()} Delta Revenue Partners - All Rights Reserved.</p>
          <p className="mt-2 text-center text-primary-500 text-xs">Powered by GoDaddy</p>
        </div>
      </footer>
    </div>
  )
}
