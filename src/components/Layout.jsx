import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSiteConfig } from '../context/SiteConfigContext'

const HOME_LINK = { label: 'Home', href: '/' }
const ABOUT_LINK = { label: 'About Us', href: '/about' }
const CONTACT_LINK = { label: 'Contact Us', href: '/contact' }
const CAREERS_LINK = { label: 'Careers', href: '/careers' }

function ensureNavLinks(links) {
  let out = (links || []).map((l) => {
    if (l.href === '#contact') return { label: 'Contact Us', href: '/contact' }
    if (l.href === '#approach') return { ...l, href: '/approach' }
    if (l.href === '#services') return { ...l, href: '/services' }
    return l
  })
  const hasHome = out.some((l) => l.href === '/')
  const hasAbout = out.some((l) => l.href === '/about')
  const hasContact = out.some((l) => l.href === '/contact')
  const hasCareers = out.some((l) => l.href === '/careers')
  if (!hasHome) out = [HOME_LINK, ...out]
  if (!hasAbout) out = [...out, ABOUT_LINK]
  if (!hasContact) out = [...out, CONTACT_LINK]
  if (!hasCareers) out = [...out, CAREERS_LINK]
  return out
}

export default function Layout() {
  const { config } = useSiteConfig()
  const header = config.header || {}
  const footer = config.footer || {}
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])
  const navLinks = ensureNavLinks(header.navLinks)
  const footerLinks = ensureNavLinks(footer.links)

  const NavLink = ({ link }) => {
    if (link.href.startsWith('/')) {
      return <Link to={link.href} onClick={() => setMobileMenuOpen(false)} className="text-primary-200 hover:text-accent-gold transition">{link.label}</Link>
    }
    if (link.href.startsWith('#')) {
      return <Link to={`/${link.href}`} onClick={() => setMobileMenuOpen(false)} className="text-primary-200 hover:text-accent-gold transition">{link.label}</Link>
    }
    return <a href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-primary-200 hover:text-accent-gold transition">{link.label}</a>
  }

  return (
    <div className="min-h-screen bg-primary-900">
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary-900 border-b border-primary-800 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18 w-full">
            <Link to="/" className="flex items-center gap-2 shrink-0 min-h-[2.25rem]">
              <img src="/assets/logo.png" alt={`${header.logoText} ${header.logoHighlight}`} className="h-8 lg:h-9 w-auto object-contain align-middle flex-shrink-0" />
              <span className="font-display font-bold text-xl text-white leading-none flex items-center -mt-2">{header.logoText} <span className="text-accent-gold">{header.logoHighlight}</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
              {navLinks.map((link) => (
                <NavLink key={link.href} link={link} />
              ))}
              <a href={`tel:${(header.phoneTel || '').replace(/\s/g, '')}`} className="text-primary-200 hover:text-accent-gold">{header.phone}</a>
            </nav>
            <Link to="/contact" className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent-gold text-primary-900 font-medium hover:bg-accent-goldLight transition shrink-0 text-sm">{header.ctaText}</Link>
            <button type="button" className="lg:hidden p-2 text-primary-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg>
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-primary-800 space-y-3">
              {navLinks.map((link) => (
                <NavLink key={link.href} link={link} />
              ))}
              <a href={`tel:${(header.phoneTel || '').replace(/\s/g, '')}`} className="block text-primary-200 hover:text-accent-gold">{header.phone}</a>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex px-4 py-2 rounded-lg bg-accent-gold text-primary-900 font-medium text-sm">{header.ctaText}</Link>
            </div>
          )}
        </div>
      </header>

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-primary-900 text-primary-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link to="/" className="flex items-center gap-2 min-h-[2rem]">
              <img src="/assets/logo.png" alt={`${footer.logoText} ${footer.logoHighlight}`} className="h-8 w-auto object-contain align-middle flex-shrink-0" />
              <span className="font-display font-bold text-xl text-white leading-none flex items-center -mt-2">{footer.logoText} <span className="text-accent-gold">{footer.logoHighlight}</span></span>
            </Link>
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                link.href.startsWith('/')
                  ? <Link key={link.href} to={link.href} className="hover:text-accent-gold transition">{link.label}</Link>
                  : <a key={link.href} href={link.href} className="hover:text-accent-gold transition">{link.label}</a>
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
