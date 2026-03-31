import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { feestenData } from '../data/feesten'
import Footer from './Footer'

// ─── Hero animatie constanten ─────────────────────────────────────────────────
const WORD_START = 80
const WORD_STEP = 90
const WORD_DUR = 530

// ─── SVG iconen ──────────────────────────────────────────────────────────────
function IconDatum() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function IconKlok() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
    </svg>
  )
}
function IconLeeftijd() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}
function IconPrijs() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.5Q9.5 7 12 7q2.5 0 2.5 2.5Q14.5 12 12 12q2.5 0 2.5 2.5Q14.5 17 12 17q-2.5 0-2.5-2.5" strokeLinecap="round" />
    </svg>
  )
}
function IconDresscode() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 22, height: 22 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 L3 7 L8 9 L8 22 L16 22 L16 9 L21 7 L18 2" />
      <path d="M9 2 Q12 6 15 2" />
    </svg>
  )
}

// ─── Accordion item ───────────────────────────────────────────────────────────
function AccordionItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{
      background: 'rgba(20, 5, 10, 0.45)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid rgba(230,214,191,0.18)',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '1.3rem 1.75rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <span style={{
          fontFamily: 'Zapfino, cursive',
          color: '#E6D6BF',
          fontSize: '1rem',
          lineHeight: 1.5,
        }}>
          {q}
        </span>
        <svg viewBox="0 0 20 20" style={{
          width: 18, height: 18, flexShrink: 0,
          stroke: '#E6D6BF', fill: 'none', strokeWidth: 2,
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.35s ease',
        }}>
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.8)',
          fontSize: '0.95rem',
          lineHeight: 1.75,
          padding: '0 1.75rem 1.5rem',
          margin: 0,
        }}>
          {a}
        </p>
      </div>
    </div>
  )
}

// ─── Hero sectie ─────────────────────────────────────────────────────────────
function FeestHero({ feest }) {
  const words = feest.naam.split(' ')
  const LAST_WORD_END = WORD_START + (words.length - 1) * WORD_STEP + WORD_DUR
  const SUBTITLE_START = LAST_WORD_END + 150
  const CTA_START = SUBTITLE_START + 200

  const [wordVisible, setWordVisible] = useState([])
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const bgRef = useRef(null)
  const isTouch = useRef(false)
  const navigate = useNavigate()

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
  }, [])

  useEffect(() => {
    const timers = words.map((_, i) =>
      setTimeout(() => setWordVisible(prev => [...prev, i]), WORD_START + i * WORD_STEP)
    )
    const t1 = setTimeout(() => setSubtitleVisible(true), SUBTITLE_START)
    const t2 = setTimeout(() => setCtaVisible(true), CTA_START)
    return () => { timers.forEach(clearTimeout); clearTimeout(t1); clearTimeout(t2) }
  }, [feest.naam])

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

  const infoItems = [
    { icon: <IconDatum />, label: feest.datum },
    { icon: <IconKlok />, label: `${feest.starttijd} – ${feest.eindtijd}` },
    { icon: <IconLeeftijd />, label: feest.leeftijd },
    { icon: <IconPrijs />, label: feest.prijs },
    ...(feest.dresscode ? [{ icon: <IconDresscode />, label: feest.dresscode }] : []),
  ]

  return (
    <section style={{
      position: 'relative',
      height: 'calc(100vh - 64px)',
      marginTop: '64px',
      minHeight: 540,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Achtergrond */}
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: `url(${feest.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(42, 10, 5, 0.58)' }} />

      {/* Terugknop */}
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          top: '1.5rem',
          left: '2rem',
          zIndex: 10,
          background: 'rgba(20,5,10,0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(230,214,191,0.22)',
          borderRadius: 999,
          padding: '0.45em 1.2em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          cursor: 'pointer',
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.85)',
          fontSize: '0.85rem',
          transition: 'border-color 0.2s ease, background 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(230,214,191,0.5)'
          e.currentTarget.style.background = 'rgba(20,5,10,0.65)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(230,214,191,0.22)'
          e.currentTarget.style.background = 'rgba(20,5,10,0.45)'
        }}
      >
        <svg viewBox="0 0 16 16" style={{ width: 13, height: 13 }} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 8H3M7 4l-4 4 4 4" />
        </svg>
        Alle feesten
      </button>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(50px,7vh,80px) 6% 0',
      }}>
        {/* Pre-label */}
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.6)',
          fontSize: '0.8rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: '0 0 0.75rem',
        }}>
          Bergsma Easterein presenteert
        </p>

        {/* H1 — feestnaam word-voor-word */}
        <h1 style={{
          fontFamily: 'Zapfino, cursive',
          color: '#E6D6BF',
          fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
          lineHeight: 1.5,
          margin: '0 0 1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4em',
          alignItems: 'baseline',
          justifyContent: 'center',
        }}>
          {words.map((word, i) => (
            <span key={i} style={{
              opacity: wordVisible.includes(i) ? 1 : 0,
              transform: wordVisible.includes(i) ? 'translateY(0)' : 'translateY(18px)',
              transition: `opacity ${WORD_DUR}ms cubic-bezier(0.22,1,0.36,1), transform ${WORD_DUR}ms cubic-bezier(0.22,1,0.36,1)`,
              display: 'inline-block',
            }}>
              {word}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.8)',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
          fontStyle: 'italic',
          maxWidth: 520,
          margin: '0 0 2rem',
          opacity: subtitleVisible ? 1 : 0,
          transform: subtitleVisible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          {feest.tagline}
        </p>

        {/* Info balk */}
        <div style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem 1.5rem',
          marginBottom: '2rem',
        }}>
          {infoItems.map(({ icon, label }) => (
            <div key={label} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(20,5,10,0.45)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              border: '1px solid rgba(230,214,191,0.18)',
              borderRadius: 999,
              padding: '0.4em 1em',
              fontFamily: 'Lora, serif',
              color: 'rgba(230,214,191,0.85)',
              fontSize: '0.85rem',
            }}>
              {icon}
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA knop */}
        <div style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
        }}>
          <button className="btn-secondary">
            Bestel je tickets
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Info sectie ─────────────────────────────────────────────────────────────
function FeestInfo({ feest }) {
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

  const praktischItems = [
    { icon: <IconDatum />, label: 'Datum', waarde: feest.datum },
    { icon: <IconKlok />, label: 'Starttijd', waarde: feest.starttijd },
    { icon: <IconKlok />, label: 'Eindtijd', waarde: feest.eindtijd },
    { icon: <IconLeeftijd />, label: 'Leeftijd', waarde: feest.leeftijd },
    { icon: <IconPrijs />, label: 'Prijs', waarde: feest.prijs },
    ...(feest.dresscode ? [{ icon: <IconDresscode />, label: 'Dresscode', waarde: feest.dresscode }] : []),
  ]

  return (
    <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: `url(${feest.infoImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8, 2, 0, 0.42)' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Over de avond */}
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{
            fontFamily: 'Zapfino, cursive',
            color: '#E6D6BF',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            lineHeight: 1.55,
            margin: '0 0 1.5rem',
            textAlign: 'center',
          }}>
            Over de Avond
          </h2>
          {feest.intro.split('\n\n').map((alinea, i) => (
            <p key={i} style={{
              fontFamily: 'Lora, serif',
              color: 'rgba(230,214,191,0.85)',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              lineHeight: 1.85,
              margin: i === 0 ? 0 : '1.25rem 0 0',
            }}>
              {alinea.trim()}
            </p>
          ))}
        </div>

        {/* Praktische info */}
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <h2 style={{
            fontFamily: 'Zapfino, cursive',
            color: '#E6D6BF',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            lineHeight: 1.55,
            margin: '0 0 1.5rem',
            textAlign: 'center',
          }}>
            Praktische Info
          </h2>
          <div className="feest-praktisch-grid">
            {praktischItems.map(({ icon, label, waarde }) => (
              <div key={label} style={{
                background: 'rgba(20, 5, 10, 0.45)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(230,214,191,0.18)',
                borderRadius: 12,
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.9rem',
              }}>
                <div style={{ flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.2rem' }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: 'Lora, serif', color: '#E6D6BF', fontSize: '0.95rem', fontWeight: 500 }}>
                    {waarde}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: 'Zapfino, cursive',
            color: '#E6D6BF',
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            lineHeight: 1.55,
            margin: '0 0 1.5rem',
            textAlign: 'center',
          }}>
            Veelgestelde Vragen
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {feest.faq.map((item, i) => (
              <AccordionItem key={i} q={item.q} a={item.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>

        {/* Onderste CTA */}
        <div className="reveal" style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <button className="btn-secondary">
            Bestel je tickets
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── 404 binnen feesten ───────────────────────────────────────────────────────
function FeestNietGevonden() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', marginTop: '64px' }}>
      <h1 style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem' }}>
        Feest niet gevonden
      </h1>
      <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.7)', marginBottom: '2rem' }}>
        Dit feest bestaat niet of is afgelopen.
      </p>
      <button className="btn-secondary" onClick={() => navigate('/feesten')}>
        Bekijk alle feesten
      </button>
    </div>
  )
}

// ─── Hoofd export ─────────────────────────────────────────────────────────────
export default function FeestPage() {
  const { slug } = useParams()
  const feest = feestenData[slug]

  if (!feest) return <><FeestNietGevonden /><Footer /></>

  return (
    <>
      <FeestHero feest={feest} />
      <FeestInfo feest={feest} />
      <Footer />
    </>
  )
}
