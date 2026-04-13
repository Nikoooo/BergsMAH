import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

// Icons as inline SVG — dubbele grootte t.o.v. origineel
function BeerIcon() {
  return (
    <svg viewBox="0 0 40 50" style={{ width: 72, height: 88 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5">
      <path d="M8 14 h24 l-3 28 H11 Z" />
      <path d="M8 14 Q10 8 20 8 Q30 8 32 14" />
      <path d="M32 20 Q40 20 40 28 Q40 36 32 36" />
      <path d="M14 14 Q12 8 14 4" />
      <path d="M20 14 Q18 8 20 4" />
    </svg>
  )
}
function DanceIcon() {
  return (
    <svg viewBox="0 0 40 50" style={{ width: 72, height: 88 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5">
      <circle cx="28" cy="7" r="4" />
      <path d="M28 11 L22 26 L14 20 M22 26 L24 38 M24 38 L18 46 M24 38 L30 46" strokeLinecap="round" />
      <circle cx="14" cy="15" r="3.5" />
      <path d="M14 18.5 L10 30 L4 26 M10 30 L11 40 M11 40 L6 48 M11 40 L16 48" strokeLinecap="round" />
    </svg>
  )
}
function MicIcon() {
  return (
    <svg viewBox="0 0 40 50" style={{ width: 72, height: 88 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5">
      <rect x="14" y="4" width="12" height="20" rx="6" />
      <path d="M8 20 Q8 32 20 32 Q32 32 32 20" strokeLinecap="round" />
      <line x1="20" y1="32" x2="20" y2="42" />
      <line x1="13" y1="42" x2="27" y2="42" />
    </svg>
  )
}
function WineIcon() {
  return (
    <svg viewBox="0 0 40 50" style={{ width: 72, height: 88 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5">
      <path d="M10 6 h20 L24 22 Q22 28 20 28 Q18 28 16 22 Z" />
      <line x1="20" y1="28" x2="20" y2="42" />
      <line x1="12" y1="42" x2="28" y2="42" />
    </svg>
  )
}

const feesten = [
  {
    icon: <BeerIcon />,
    title: 'Boerenrock',
    slug: 'boerenrock',
    desc: 'Aftrap met het lekkerste pils en meezingers uit de polder. De tent op de kop!',
    date: '14 September',
    time: '21:00 – 02:00',
  },
  {
    icon: <DanceIcon />,
    title: 'Boerenrock',
    slug: 'boerenrock',
    desc: 'Dansen op de beste hits, met die typische Gronings-Duitse sfeer. Een bijzondere avond.',
    date: '15 September',
    time: '21:00 – 02:00',
  },
  {
    icon: <MicIcon />,
    title: 'Boerenrock',
    slug: 'boerenrock',
    desc: 'Geniet van het vintage geluid en de klanken van weleer! Prachtige optredens.',
    date: '23 September',
    time: '21:00 – 02:00',
  },
  {
    icon: <WineIcon />,
    title: 'Boerenrock',
    slug: 'boerenrock',
    desc: 'Dansen en proosten met de lekkerste wijnen. Een unieke en warme sfeer.',
    date: '26 September',
    time: '21:00 – 02:00',
  },
]

/*
  Cascade delays voor 4 kaarten:
  [0, 130, 260, 390]ms — kaart 2 begint bij ~16% van kaart 1's animatieduur (800ms),
  zodat ze zichtbaar overlappend openvouwen als een uitwaaierend kaartendek.
*/
const DELAYS = [0, 130, 260, 390]

export default function Feesten({ onReserve }) {
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
          const cards = grid.querySelectorAll('.feesten-3d-card')
          cards.forEach(card => card.classList.add('fold-in'))
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Parallax background */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: "url('/images/feesten.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(42, 26, 15, 0.65)', zIndex: 1 }} />

      {/* Ruimere container voor grotere kaarten — bijna volledige schermbreedte */}
      <div className="feesten-container" style={{ position: 'relative', zIndex: 5, maxWidth: '1600px', width: '100%', margin: '0 auto', padding: '0 3rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2
            className="reveal"
            style={{
              fontFamily: 'Zapfino, cursive',
              color: '#E6D6BF',
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              margin: 0,
            }}
          >
            Feesten Agenda
          </h2>
        </div>

        {/* Cards grid — 4 kolommen, grotere kaarten */}
        <div
          ref={gridRef}
          className="feesten-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
          }}
        >
          {feesten.map((f, i) => (
            <Link
              key={i}
              to={`/feesten/${f.slug}`}
              className="glass-card feesten-3d-card"
              style={{
                padding: '3.5rem 2.5rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                minHeight: '580px',
                animationDelay: `${DELAYS[i]}ms`,
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.5rem' }}>
                {f.icon}
              </div>

              <h3 style={{
                fontFamily: 'Zapfino, cursive',
                color: '#E6D6BF',
                fontSize: '1.6rem',
                margin: 0,
                lineHeight: 1.3,
              }}>
                {f.title}
              </h3>

              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.85)', fontSize: '1rem', lineHeight: 1.75, margin: 0, flex: 1 }}>
                {f.desc}
              </p>

              <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.7)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                <div>{f.date}</div>
                <div>{f.time}</div>
              </div>

              <button className="btn-primary" onClick={e => { e.preventDefault(); onReserve() }}>
                Koop je tickets
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
