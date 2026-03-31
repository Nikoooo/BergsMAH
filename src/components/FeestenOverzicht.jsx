import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { feestenData } from '../data/feesten'
import Footer from './Footer'

// ─── Kalender icoon ───────────────────────────────────────────────────────────
function KalenderIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function KlokIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  )
}

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9a2 2 0 0 1 0-4V3h20v2a2 2 0 0 1 0 4v2a2 2 0 0 1 0 4v2H2v-2a2 2 0 0 1 0-4V9z" />
    </svg>
  )
}

// ─── Feest kaart ──────────────────────────────────────────────────────────────
function FeestKaart({ feest, index }) {
  return (
    <Link
      to={`/feesten/${feest.slug}`}
      className="reveal"
      style={{
        '--stagger-delay': `${index * 100}ms`,
        display: 'block',
        textDecoration: 'none',
        background: 'rgba(20, 5, 10, 0.5)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(230,214,191,0.18)',
        borderRadius: 14,
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(201,169,110,0.22)'
        e.currentTarget.style.borderColor = 'rgba(230,214,191,0.38)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.borderColor = 'rgba(230,214,191,0.18)'
      }}
    >
      {/* Kleurband bovenaan — accent */}
      <div style={{ height: 4, background: 'linear-gradient(to right, #4C0027, #8B1A4A)' }} />

      <div style={{ padding: '2rem 2rem 1.75rem' }}>
        {/* Feestnaam */}
        <h3 style={{
          fontFamily: 'Zapfino, cursive',
          color: '#E6D6BF',
          fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
          lineHeight: 1.55,
          margin: '0 0 1rem',
        }}>
          {feest.naam}
        </h3>

        {/* Tagline */}
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.72)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          margin: '0 0 1.5rem',
          fontStyle: 'italic',
        }}>
          {feest.tagline}
        </p>

        {/* Info-regels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.75rem' }}>
          {[
            { icon: <KalenderIcon />, text: feest.datum },
            { icon: <KlokIcon />, text: `${feest.starttijd} – ${feest.eindtijd}` },
            { icon: <TicketIcon />, text: feest.prijs },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              color: 'rgba(230,214,191,0.70)',
              fontFamily: 'Lora, serif',
              fontSize: '0.88rem',
            }}>
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'Zapfino, cursive',
          color: '#E6D6BF',
          fontSize: '0.95rem',
          padding: '0.6em 1.6em',
          background: '#4C0027',
          border: '1px solid rgba(230,214,191,0.25)',
          borderRadius: 999,
        }}>
          Meer info
          <svg viewBox="0 0 16 16" style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

// ─── Hero sectie ──────────────────────────────────────────────────────────────
function OverzichtHero() {
  const bgRef = useRef(null)
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
  }, [])

  useEffect(() => {
    if (isTouch.current) return
    const el = bgRef.current
    if (!el) return
    function onScroll() {
      const rect = el.parentElement.getBoundingClientRect()
      el.style.transform = `translateY(${-rect.top * 0.4}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section style={{
      position: 'relative',
      height: 'calc(100vh - 64px)',
      marginTop: '64px',
      minHeight: 480,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: 'url(/images/feest-hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(42, 10, 5, 0.62)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 2rem',
      }}>
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.65)',
          fontSize: '0.85rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          margin: '0 0 0.75rem',
        }}>
          Bergsma Easterein
        </p>
        <h1 style={{
          fontFamily: 'Zapfino, cursive',
          color: '#E6D6BF',
          fontSize: 'clamp(2.4rem, 5vw, 4rem)',
          lineHeight: 1.5,
          margin: '0 0 0.75rem',
        }}>
          Onze Feesten
        </h1>
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.75)',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          fontStyle: 'italic',
          margin: 0,
        }}>
          Kies jouw avond en beleef hem bij ons
        </p>
      </div>
    </section>
  )
}

// ─── Kaarten sectie ───────────────────────────────────────────────────────────
function OverzichtKaarten() {
  const sectionRef = useReveal()
  const bgRef = useRef(null)
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
  }, [])

  useEffect(() => {
    if (isTouch.current) return
    const el = bgRef.current
    if (!el) return
    function onScroll() {
      const rect = el.parentElement.getBoundingClientRect()
      el.style.transform = `translateY(${-rect.top * 0.4}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const feesten = Object.values(feestenData)

  return (
    <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: 'url(/images/feest-info.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8, 2, 0, 0.42)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1520px', margin: '0 auto', padding: '0 2.5rem' }}>

        {/* Grid */}
        <div className="feesten-overzicht-grid">
          {feesten.map((feest, i) => (
            <FeestKaart key={feest.slug} feest={feest} index={i} />
          ))}
        </div>

        {/* Leeg-state als er geen feesten zijn */}
        {feesten.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.6)', fontStyle: 'italic' }}>
              Binnenkort worden nieuwe feesten aangekondigd. Houd deze pagina in de gaten.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Hoofd export ─────────────────────────────────────────────────────────────
export default function FeestenOverzicht() {
  return (
    <>
      <OverzichtHero />
      <OverzichtKaarten />
      <Footer />
    </>
  )
}
