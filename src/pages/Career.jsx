import { Link } from 'react-router-dom'
import { useSiteConfig } from '../context/SiteConfigContext'
import { AnimateOnScroll } from '../components/AnimateOnScroll'

export default function Career() {
  const { config } = useSiteConfig()
  const careers = config.careers || {}
  const whyJoin = careers.whyJoin || []
  const benefits = careers.benefits || []
  const openRoles = careers.openRoles || []

  return (
    <div className="bg-primary-900 text-primary-200">
      {/* Why Join Us */}
      <AnimateOnScroll as="section" className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-accent-gold mb-10 text-center">Why Join Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyJoin.map((item, i) => (
              <div key={i} className="bg-primary-800/50 border border-primary-600 rounded-xl p-6 text-center">
                <h3 className="font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-primary-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      {/* Benefits */}
      <AnimateOnScroll as="section" className="py-16 lg:py-20 bg-primary-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-accent-gold mb-8 text-center">What We Offer</h2>
          <ul className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-primary-200">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gold/20 text-accent-gold text-sm">✓</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </AnimateOnScroll>

      {/* Open Positions */}
      <AnimateOnScroll as="section" className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-accent-gold mb-8 text-center">Open Positions</h2>
          <p className="text-primary-300 text-center mb-10">We are always looking for talented people to join our team. Explore current openings below.</p>
          <div className="space-y-4">
            {openRoles.map((role, i) => (
              <div key={i} className="bg-primary-800/50 border border-primary-600 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-white">{role.title}</h3>
                  <p className="text-primary-400 text-sm mt-1">{role.dept} · {role.location}</p>
                </div>
                <Link to="/contact" className="shrink-0 px-4 py-2 rounded-lg bg-accent-gold text-primary-900 font-medium text-sm hover:bg-accent-goldLight transition text-center">Apply</Link>
              </div>
            ))}
          </div>
        </div>
      </AnimateOnScroll>

      {/* CTA */}
      <AnimateOnScroll as="section" className="py-16 lg:py-20 border-t border-primary-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-xl font-bold text-white mb-4">{careers.ctaTitle || "Don't see the right role?"}</h2>
          <p className="text-primary-300 mb-6">{careers.ctaBody || "Send us your resume and tell us how you can contribute. We'd love to hear from you."}</p>
          <Link to="/contact" className="inline-flex px-8 py-3 rounded-lg bg-accent-gold text-primary-900 font-semibold hover:bg-accent-goldLight transition">{careers.ctaButton || 'Get in Touch'}</Link>
        </div>
      </AnimateOnScroll>
    </div>
  )
}
