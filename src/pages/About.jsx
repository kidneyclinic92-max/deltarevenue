import { useSiteConfig } from '../context/SiteConfigContext'
import { AnimateOnScroll } from '../components/AnimateOnScroll'

export default function About() {
  const { config } = useSiteConfig()
  const about = config.about || {}
  const trust = config.trust || {}
  const deltaApproach = config.deltaApproach || {}
  const locations = config.locations || []

  return (
    <div className="bg-primary-900 text-primary-200">
      {/* Who We Are / Trust content */}
      <AnimateOnScroll as="section" className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-accent-gold mb-8 text-center">{about.whoWeAreHeading || 'Who We Are'}</h2>
          <div className="space-y-6 text-primary-200 leading-relaxed">
            {(trust.paragraphs || []).map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} className="text-primary-200" />
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      {/* The Delta Approach summary */}
      <AnimateOnScroll as="section" className="py-16 lg:py-20 bg-primary-800/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-accent-gold mb-10 text-center">{deltaApproach.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(deltaApproach.items || []).map((item, i) => (
              <div key={i} className="bg-primary-800/50 border border-primary-600 rounded-xl p-6 text-center">
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-primary-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      {/* Our Locations */}
      <AnimateOnScroll as="section" className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-accent-gold mb-10 text-center">{about.locationsHeading || 'Our Locations'}</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((loc, i) => (
              <div key={i} className="bg-primary-800/50 border border-primary-600 rounded-xl p-6">
                <h3 className="font-semibold text-white mb-2 text-accent-gold">{loc.name}</h3>
                <address className="text-primary-200 not-italic leading-relaxed whitespace-pre-line">
                  {loc.address}
                  {loc.phone && (
                    <>
                      <br />
                      <a href={`tel:${loc.phone.replace(/[^+\d]/g, '')}`} className="text-accent-gold hover:text-accent-goldLight transition">{loc.phone}</a>
                    </>
                  )}
                </address>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}
