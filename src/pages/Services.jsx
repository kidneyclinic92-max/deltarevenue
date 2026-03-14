import { useSiteConfig } from '../context/SiteConfigContext'
import { AnimateOnScroll } from '../components/AnimateOnScroll'
import { ServicesDonutChart } from '../components/charts/ServicesDonutChart'

export default function Services() {
  const { config } = useSiteConfig()
  const services = config.services || {}

  return (
    <div className="bg-primary-900 text-primary-200">
      {/* Services Grid */}
      <AnimateOnScroll as="section" direction="left" className="py-16 lg:py-24 bg-primary-900">
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
                <div className="group block p-6 rounded-xl bg-primary-900 border border-primary-600 hover:border-primary-500 transition text-center">
                  <span className="text-2xl">{service.icon}</span>
                  <h3 className="font-display text-lg font-semibold text-accent-gold mt-3 group-hover:text-accent-goldLight transition">{service.title}</h3>
                  <p className="mt-2 text-primary-300 text-sm">{service.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </AnimateOnScroll>
    </div>
  )
}
