import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

const reviews = [
  {
    name: 'Johan Dijkstra',
    date: '17 Jun 2022',
    text: 'Geweldige sfeer en heerlijk eten!',
  },
  {
    name: 'Annelies Visser',
    date: '15 Jun 2022',
    text: 'Een avond om niet te vergeten, de bediening was top en het 3-gangen menu verrukkelik.',
  },
  {
    name: 'Sjoerd Bakker',
    date: '16 Jun 2022',
    text: 'Authentiek en gezellig, als je van echte gastvrijheid en goed eten houdt.',
  },
  {
    name: 'Elske de Vries',
    date: '15 Jun 2022',
    text: 'Heerlijke wijnproewerij, een groot succes!',
  },
]

function Stars() {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" style={{ width: 14, height: 14 }} fill="#E6D6BF">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 2 .7-4L2.2 5.2l4-.6z" />
        </svg>
      ))}
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, marginRight: 6, verticalAlign: 'middle' }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

export default function Reviews() {
  const sectionRef = useReveal()
  const bgRef = useRef(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgRef.current) {
            const rect = bgRef.current.parentElement.getBoundingClientRect()
            const offset = -rect.top * 0.4
            bgRef.current.style.transform = `translateY(${offset}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '6rem 0',
        minHeight: '100vh',
      }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: "url('/images/reviews.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Dark overlay — lighter so the baroque texture breathes through */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,8,2,0.40)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            className="reveal"
            style={{
              fontFamily: 'Zapfino, cursive',
              color: '#E6D6BF',
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              margin: '0 0 0.8rem',
            }}
          >
            Wat Onze Gasten Zeggen
          </h2>
          <p className="reveal reveal-delay-1" style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '0.95rem' }}>
            Lees de ervaringen van anderen of check de echtheid op Google
          </p>
        </div>

        {/* Review cards */}
        <div
          className="stagger-reviews reviews-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          {reviews.map((r, i) => (
            <div
              key={i}
              className="glass-card reveal stagger-item"
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <Stars />
              <div style={{ fontFamily: 'Lora, serif', fontWeight: 600, color: '#E6D6BF', fontSize: '0.95rem' }}>{r.name}</div>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.85)', fontSize: '0.85rem', lineHeight: 1.65, flex: 1, margin: 0 }}>
                {r.text}
              </p>
              <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.55)', fontSize: '0.75rem' }}>{r.date}</div>
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noreferrer"
                className="google-link"
                style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.7)', fontSize: '0.78rem', textDecoration: 'none' }}
              >
                <GoogleIcon />
                Bekijk op Google Reviews
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary"
          >
            Deel Jouw Ervaring op Google
          </a>
        </div>
      </div>
    </section>
  )
}
