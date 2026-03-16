import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimateOnScroll } from './components/AnimateOnScroll'
import { StatsBarChart } from './components/charts/StatsBarChart'
import { RevenueGrowthChart } from './components/charts/RevenueGrowthChart'
import { BenefitsChart } from './components/charts/BenefitsChart'
import { useSiteConfig } from './context/SiteConfigContext'

export default function App() {
  const { config } = useSiteConfig()
  const [specialty, setSpecialty] = useState('')
  const hero = config.hero || {}
  const deltaApproach = config.deltaApproach || {}
  const trust = config.trust || {}
  const specialties = config.specialties || []
  const stats = config.stats || []
  const achievements = config.achievements || {}
  const increaseRevenue = config.increaseRevenue || {}
  const providerCta = config.providerCta || {}
  const why = config.why || {}
  const solutionsBySpecialty = config.solutionsBySpecialty || {}
  const onboarding = config.onboarding || {}
  const benefits = config.benefits || {}

  return (
    <>
        {/* Hero */}
        <section className="relative bg-primary-900 text-accent-gold overflow-hidden min-h-[44rem] lg:min-h-[50rem] flex items-center">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
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
        </section>

        {/* The Delta Approach */}
        <AnimateOnScroll as="section" id="approach" direction="left" className="py-16 lg:py-24 bg-primary-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">{deltaApproach.title}</h2>
            <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
              {(deltaApproach.items || []).map((item, i) => (
                <AnimateOnScroll key={item.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={120 * i} className="p-6 lg:p-8 rounded-lg border border-primary-600 bg-primary-800">
                  <div className="flex justify-center mb-4">
                    {i === 0 && (
                      <svg className="w-14 h-14 text-accent-gold shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M23 4v6h-6" />
                        <path d="M1 20v-6h6" />
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10" />
                        <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14" />
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
              <Link to="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition shrink-0">
                Get Solution
              </Link>
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

        {/* Achievements */}
        <AnimateOnScroll as="section" id="achievements" direction="right" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">{achievements.title || 'Our Achievements'}</h2>
            {achievements.subtitle && (
              <p className="mt-4 text-primary-300 max-w-2xl mx-auto">{achievements.subtitle}</p>
            )}
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {((achievements.items || []).length ? achievements.items : [
                { value: '10+', label: 'Years in RCM' },
                { value: '500+', label: 'Practices Served' },
                { value: '2M+', label: 'Claims Processed' },
                { value: '99%', label: 'Client Retention' },
              ]).map((item, i) => (
                <AnimateOnScroll key={item.label} direction={i % 2 === 0 ? 'left' : 'right'} delay={60 * i} className="p-6 lg:p-8 rounded-xl bg-primary-900 border border-primary-600 text-center">
                  <div className="font-display text-3xl lg:text-4xl font-bold text-accent-gold">{item.value}</div>
                  <div className="text-primary-300 text-sm mt-2 font-medium">{item.label}</div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Increase Revenue */}
        <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-900">
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
            {(increaseRevenue.linkHref || '').startsWith('/')
              ? <Link to={increaseRevenue.linkHref || '/about'} className="inline-flex mt-8 text-accent-gold font-semibold hover:text-accent-goldDark">{increaseRevenue.linkText}</Link>
              : <a href={increaseRevenue.linkHref || '#about'} className="inline-flex mt-8 text-accent-gold font-semibold hover:text-accent-goldDark">{increaseRevenue.linkText}</a>}
          </div>
        </AnimateOnScroll>

        {/* Provider Success CTA */}
        <AnimateOnScroll as="section" direction="right" className="py-16 lg:py-24 bg-primary-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">{providerCta.title}</h2>
            <p className="mt-4 text-primary-100 max-w-2xl mx-auto">
              {providerCta.body}
            </p>
            <Link to="/contact" className="inline-flex mt-8 px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">{providerCta.ctaText}</Link>
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
                <AnimateOnScroll key={item.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={80 * i} className="p-6 rounded-xl border border-primary-600 bg-primary-800 text-center">
                  <h3 className="font-display text-lg font-bold text-accent-gold">{item.title}</h3>
                  <p className="mt-2 text-primary-300 text-sm">{item.desc}</p>
                </AnimateOnScroll>
              ))}
            </div>
            <AnimateOnScroll direction="right" delay={200} className="mt-14 p-8 rounded-2xl bg-primary-800 border border-primary-600 text-center">
              <h3 className="font-display text-xl font-semibold text-accent-gold">{why.auditTitle}</h3>
              <Link to="/contact" className="inline-flex mt-6 px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">{why.auditCta}</Link>
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
            <Link to="/contact" className="inline-flex mt-10 px-6 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">{onboarding.ctaText}</Link>
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



    </>
  )
}
