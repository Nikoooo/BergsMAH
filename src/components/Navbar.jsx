import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ onReserve }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sluit menu bij Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const navLinks = [
    { label: 'Trouwen', href: '/trouwen' },
    { label: 'Vacatures', href: '/vacatures' },
    { label: 'Zakelijk & Catering', href: '/zakelijk' },
    { label: 'Feesten', href: '/feesten' },
    { label: 'Evenementen', href: '/evenementen' },
  ]

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrolled ? 'rgba(47,27,15,0.92)' : 'rgba(47,27,15,0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          transition: 'background 0.3s ease',
          borderBottom: scrolled ? '1px solid rgba(230,214,191,0.1)' : 'none',
          padding: '0 2rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Zapfino, cursive',
            color: '#E6D6BF',
            fontSize: '1.35rem',
            letterSpacing: '0.02em',
          }}>
            Bergsma
          </span>
          <span style={{
            fontFamily: 'Lora, serif',
            color: 'rgba(230,214,191,0.7)',
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}>
            EASTEREIN
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="nav-link" style={{ fontSize: '0.875rem', textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
          <button
            className="btn-primary btn-nav-reserve btn-pulse"
            style={{ fontSize: '0.875rem', padding: '0.55em 1.6em' }}
            onClick={onReserve}
          >
            Reserveren
          </button>
        </div>

        {/* Hamburger — alleen op mobiel */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu openen"
          style={{
            display: 'none',
            background: 'transparent',
            border: '1px solid rgba(230,214,191,0.35)',
            borderRadius: '6px',
            padding: '6px 10px',
            cursor: 'pointer',
            flexDirection: 'column',
            gap: '5px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{
            display: 'block', width: 22, height: 2,
            background: '#E6D6BF',
            borderRadius: 2,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: 22, height: 2,
            background: '#E6D6BF',
            borderRadius: 2,
            transition: 'opacity 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 22, height: 2,
            background: '#E6D6BF',
            borderRadius: 2,
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          zIndex: 99,
          background: 'rgba(47,27,15,0.97)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(230,214,191,0.12)',
          maxHeight: menuOpen ? '400px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
        className="mobile-menu"
      >
        <div style={{ padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="nav-link"
              style={{ fontSize: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(230,214,191,0.08)', textDecoration: 'none' }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="btn-primary"
            style={{ alignSelf: 'flex-start' }}
            onClick={() => { setMenuOpen(false); onReserve() }}
          >
            Reserveren
          </button>
        </div>
      </div>

      {/* CSS voor responsive gedrag */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </>
  )
}
