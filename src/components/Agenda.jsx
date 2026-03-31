import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const events = [
  {
    slug: 'proeverij-herfstsmaken',
    title: 'Proewerij: Herfstsmaken',
    date: '15 Oktober',
    time: null,
    desc: 'Ontdek de fijnste wijnen tijdens onze wijnproewerij.',
  },
  {
    slug: 'kerstdiner-special',
    title: 'Kerstdiner Special',
    date: '20 december',
    time: '18:00 – 23:00',
    desc: 'Het jaar feestelijk afsluiten aan tafel bij Bergsma.',
  },
  {
    slug: 'wijnproewerij',
    title: 'Wijnproewerij',
    date: '15 maart',
    time: '16:00 – 21:00',
    desc: 'De gezelligste borrel van Easterein is de wijnproewerij.',
  },
  {
    slug: 'easterein-live',
    title: 'Easterein LIVE',
    date: '7 november',
    time: '20:30 – 23:00',
    desc: 'Live muziek in de sfeervolle setting: Bergsma.',
  },
  {
    slug: 'the-legendary-blues',
    title: 'The Legendary Blues',
    date: '22 november',
    time: '16:00 – 21:00',
    desc: 'Authentieke blues op zijn allerbest!',
  },
  {
    slug: 'tack-blaak-frank',
    title: 'Tack, Blaak & Frank',
    date: '30 november',
    time: '11:00 – 21:00',
    desc: 'Een uniek optreden van dit bijzondere trio.',
  },
]

/*
  Diagonal wave delays over een 3×2 grid:
  Rij 1: [0, 80, 160]ms  — kaart voor kaart van links naar rechts
  Rij 2: [100, 180, 260]ms — rij 2 begint al terwijl rij 1 nog loopt
  Resultaat: de golf beweegt diagonaal over het grid, niet rij-voor-rij.
*/
const DELAYS = [0, 80, 160, 100, 180, 260]

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" style={{ width: 14, height: 14, display: 'inline', marginRight: 5, verticalAlign: 'middle' }} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function Agenda() {
  const sectionRef = useReveal()
  const gridRef = useRef(null)
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

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = grid.querySelectorAll('.agenda-3d-card')
          cards.forEach(card => card.classList.add('fly-in'))
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -18% 0px' }
    )
    observer.observe(grid)
    return () => observer.disconnect()
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
          backgroundImage: "url('/images/agenda.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(42, 26, 15, 0.72)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            className="reveal"
            style={{
              fontFamily: 'Zapfino, cursive',
              color: '#E6D6BF',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              margin: '0 0 0.8rem',
            }}
          >
            Evenementen Agenda
          </h2>
          <p className="reveal reveal-delay-1" style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Ontdek wat er komende tijd te beleven valt bij Bergsma. Van wijnproewerijen tot
            live optredens — er is altijd iets te doen!
          </p>
        </div>

        {/* Events grid — perspective set hier zodat alle kaarten dezelfde 3D-ruimte delen */}
        <div
          ref={gridRef}
          className="agenda-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
            perspective: '1200px',
          }}
        >
          {events.map((ev, i) => (
            <Link
              key={i}
              to={`/evenementen/${ev.slug}`}
              className="glass-card agenda-3d-card"
              style={{
                padding: '2rem 1.75rem',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                animationDelay: `${DELAYS[i]}ms`,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <h3 style={{
                fontFamily: 'Zapfino, cursive',
                color: '#E6D6BF',
                fontSize: '1.05rem',
                margin: '0 0 0.9rem',
                lineHeight: 1.4,
              }}>
                {ev.title}
              </h3>

              <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.75)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                {ev.date && (
                  <div style={{ marginBottom: '0.25rem' }}>
                    <ClockIcon />
                    {ev.date}
                  </div>
                )}
                {ev.time && (
                  <div>
                    <ClockIcon />
                    {ev.time}
                  </div>
                )}
              </div>

              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.85)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0, flex: 1 }}>
                {ev.desc}
              </p>

              <div style={{
                marginTop: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'Zapfino, cursive',
                color: 'rgba(230,214,191,0.75)',
                fontSize: '0.82rem',
              }}>
                Meer info
                <svg viewBox="0 0 16 16" style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
