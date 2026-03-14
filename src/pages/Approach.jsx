import { useSiteConfig } from '../context/SiteConfigContext'
import { AnimateOnScroll } from '../components/AnimateOnScroll'

export default function Approach() {
  const { config } = useSiteConfig()
  const deltaApproach = config.deltaApproach || {}

  return (
    <div className="bg-primary-900 text-primary-200">
      {/* The Delta Approach */}
      <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-accent-gold">{deltaApproach.title}</h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            {(deltaApproach.items || []).map((item, i) => (
              <AnimateOnScroll key={item.title} direction={i % 2 === 0 ? 'left' : 'right'} delay={120 * i} className="p-6 lg:p-8 rounded-lg border border-primary-600 bg-primary-900/50">
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
    </div>
  )
}
