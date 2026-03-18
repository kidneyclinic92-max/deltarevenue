import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useSiteConfig } from '../context/SiteConfigContext'

const DESIRED_ORDER = ['/', '/#approach', '/services', '/careers', '/about', '/contact']

function ensureNavLinks(links) {
  let out = (links || []).map((l) => {
    if (l.href === '#contact') return { label: 'Contact Us', href: '/contact' }
    if (l.href === '/approach' || l.href === '#approach') return { ...l, href: '/#approach' }
    if (l.href === '#services') return { ...l, href: '/services' }
    return l
  })
  const defaults = [
    { label: 'Home', href: '/' },
    { label: 'Our Approach', href: '/#approach' },
    { label: 'Services', href: '/services' },
    { label: 'Careers', href: '/careers' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ]
  for (const d of defaults) {
    if (!out.some((l) => l.href === d.href)) out.push(d)
  }
  out.sort((a, b) => {
    const ai = DESIRED_ORDER.indexOf(a.href)
    const bi = DESIRED_ORDER.indexOf(b.href)
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi)
  })
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

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname, location.hash])

  const NavLink = ({ link, mobile }) => {
    const cls = mobile
      ? 'block w-full py-2 text-primary-200 hover:text-accent-gold transition text-base'
      : 'text-primary-200 hover:text-accent-gold transition'
    const close = () => setMobileMenuOpen(false)
    if (link.href.startsWith('/')) {
      return <Link to={link.href} onClick={close} className={cls}>{link.label}</Link>
    }
    if (link.href.startsWith('#')) {
      return <Link to={`/${link.href}`} onClick={close} className={cls}>{link.label}</Link>
    }
    return <a href={link.href} onClick={close} className={cls}>{link.label}</a>
  }

  return (
    <div className="min-h-screen bg-primary-900 overflow-x-hidden">
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
            </nav>
            <Link to="/contact" className="hidden lg:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-accent-gold text-primary-900 font-medium hover:bg-accent-goldLight transition shrink-0 text-sm">{header.ctaText}</Link>
            <button type="button" className="lg:hidden p-2 text-primary-200" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="absolute top-16 right-0 w-3/5 max-w-xs h-[calc(100vh-4rem)] bg-primary-900/95 backdrop-blur-md border-l border-primary-700 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1 p-6 pt-8">
              {navLinks.map((link) => (
                <NavLink key={link.href} link={link} mobile />
              ))}
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="inline-flex mt-4 px-4 py-2.5 rounded-lg bg-accent-gold text-primary-900 font-semibold text-sm self-start">{header.ctaText}</Link>
            </div>
          </div>
        </div>
      )}

      <main className="pt-16">
        <Outlet />
      </main>

      <footer className="bg-primary-900 text-primary-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6">
            <Link to="/" className="flex items-center gap-2 min-h-[2rem]">
              <img src="/assets/logo.png" alt={`${footer.logoText} ${footer.logoHighlight}`} className="h-8 w-auto object-contain align-middle flex-shrink-0" />
              <span className="font-display font-bold text-xl text-white leading-none flex items-center -mt-2">{footer.logoText} <span className="text-accent-gold">{footer.logoHighlight}</span></span>
            </Link>
          </div>
          <p className="mt-8 text-center text-primary-500 text-sm">Copyright © {new Date().getFullYear()} {footer.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
