import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Footer from './Footer'

// ─── Animatietimings (zelfde als alle hero secties op de site) ───────────
const WORD_START = 80
const WORD_STEP = 90
const WORD_DUR = 530

// ─── Parallax hook ────────────────────────────────────────────────────────
function useParallax() {
  const ref = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.parentElement.getBoundingClientRect()
            ref.current.style.transform = `translateY(${-rect.top * 0.4}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return ref
}

// ─── SVG Iconen ──────────────────────────────────────────────────────────
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, flexShrink: 0 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function AtmosphereIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, flexShrink: 0 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  )
}

function FacilitiesIcon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, flexShrink: 0 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function BovenzaalIcon() {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 52, height: 52 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5">
      <path d="M20 6 L34 16 L6 16 Z" />
      <rect x="10" y="16" width="20" height="20" rx="1" />
      <rect x="16" y="24" width="8" height="12" />
      <path d="M4 36h32" strokeLinecap="round" />
    </svg>
  )
}

function TuinzaalIcon() {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 52, height: 52 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5">
      <rect x="4" y="16" width="32" height="20" rx="1" />
      <path d="M4 36h32" strokeLinecap="round" />
      <path d="M20 4 C10 4 4 10 4 16" />
      <path d="M20 4 C30 4 36 10 36 16" />
      <line x1="20" y1="4" x2="20" y2="16" />
      <rect x="15" y="22" width="10" height="14" rx="5" />
    </svg>
  )
}

function TheaterzaalIcon() {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 52, height: 52 }} fill="none" stroke="#E6D6BF" strokeWidth="1.5">
      <path d="M2 36 L20 6 L38 36 Z" />
      <path d="M2 36h36" strokeLinecap="round" />
      <path d="M8 30h24" strokeLinecap="round" />
      <path d="M12 24h16" strokeLinecap="round" />
      <path d="M16 18h8" strokeLinecap="round" />
    </svg>
  )
}

// ─── Arrangement kaart ────────────────────────────────────────────────────
const ADDONS = ['Borrelarrangement ter afsluiting', 'Diner in ons restaurant', "Wandeling via 't Skrok"]

function ArrangementCard({ nummer, prijs, duur, items, delay }) {
  return (
    <div className="glass-card reveal" style={{ padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', transitionDelay: `${delay}ms` }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(230,214,191,0.15)', paddingBottom: '1.25rem' }}>
        <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.55)', fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
          Arrangement {nummer}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.5rem' }}>
          <span style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: '1.9rem' }}>{prijs}</span>
          <span style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.55)', fontSize: '0.78rem' }}>p.p.</span>
        </div>
        <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.65)', fontSize: '0.8rem', fontStyle: 'italic' }}>{duur}</div>
      </div>

      {/* Inbegrepen */}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.5)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
          Inbegrepen
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.82)', fontSize: '0.83rem', lineHeight: 1.5 }}>
              <span style={{ color: 'rgba(201,169,110,0.85)', marginTop: '1px', flexShrink: 0 }}>✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Aanvullend */}
      <div style={{ borderTop: '1px solid rgba(230,214,191,0.12)', paddingTop: '1rem' }}>
        <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.5)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
          Aanvullend mogelijk
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {ADDONS.map((a, i) => (
            <li key={i} style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.5)', fontSize: '0.78rem', fontStyle: 'italic' }}>
              + {a}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <a href="#contact" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Offerte aanvragen
      </a>
    </div>
  )
}

// ─── Ruimte kaart ─────────────────────────────────────────────────────────
function RuimteCard({ icon, naam, capaciteit, beschrijving, delay }) {
  return (
    <div className="glass-card reveal" style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.1rem', transitionDelay: `${delay}ms` }}>
      <div style={{ marginBottom: '0.25rem' }}>{icon}</div>
      <h3 style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: '1.4rem', margin: 0 }}>{naam}</h3>
      <div style={{
        display: 'inline-flex', alignItems: 'center',
        background: 'rgba(76,0,39,0.45)', border: '1px solid rgba(230,214,191,0.2)',
        borderRadius: '100px', padding: '0.3em 1.1em',
        fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.85)', fontSize: '0.78rem',
      }}>
        tot {capaciteit} personen
      </div>
      <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.78)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
        {beschrijving}
      </p>
    </div>
  )
}

// ─── Contactformulier ─────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ naam: '', bedrijf: '', email: '', datum: '', soort: '', bericht: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Zakelijke aanvraag — ${form.soort || 'Bijeenkomst'} — ${form.naam}`)
    const body = encodeURIComponent(
      `Naam: ${form.naam}\nBedrijf: ${form.bedrijf}\nE-mail: ${form.email}\nGewenste datum: ${form.datum}\nSoort bijeenkomst: ${form.soort}\n\nBericht:\n${form.bericht}`
    )
    window.location.href = `mailto:info@bergsmaeasterein.nl?subject=${subject}&body=${body}`
    setSent(true)
  }

  const inputStyle = {
    width: '100%',
    background: 'rgba(20,5,10,0.55)',
    border: '1px solid rgba(230,214,191,0.2)',
    borderRadius: '8px',
    padding: '0.75rem 1rem',
    fontFamily: 'Lora, serif',
    color: '#E6D6BF',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle = {
    fontFamily: 'Lora, serif',
    color: 'rgba(230,214,191,0.55)',
    fontSize: '0.7rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.4rem',
  }

  return (
    <div className="glass-card" style={{ padding: '2.5rem 2rem' }}>
      <h3 style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: '1.4rem', margin: '0 0 2rem' }}>
        Plan je bijeenkomst
      </h3>

      {sent ? (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: '1.3rem', marginBottom: '1rem' }}>Bedankt!</div>
          <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.78)', fontSize: '0.9rem', lineHeight: 1.75 }}>
            Je e-mailclient is geopend met je aanvraag. We nemen zo snel mogelijk contact met je op.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Naam</label>
              <input name="naam" required value={form.naam} onChange={handleChange} style={inputStyle} placeholder="Jouw naam" />
            </div>
            <div>
              <label style={labelStyle}>Bedrijf</label>
              <input name="bedrijf" value={form.bedrijf} onChange={handleChange} style={inputStyle} placeholder="Bedrijfsnaam" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>E-mailadres</label>
              <input name="email" type="email" required value={form.email} onChange={handleChange} style={inputStyle} placeholder="jouw@email.nl" />
            </div>
            <div>
              <label style={labelStyle}>Gewenste datum</label>
              <input name="datum" type="date" value={form.datum} onChange={handleChange} style={{ ...inputStyle, colorScheme: 'dark' }} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Soort bijeenkomst</label>
            <select name="soort" value={form.soort} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="" style={{ background: '#2A1A0F' }}>Kies een type…</option>
              <option value="Vergadering" style={{ background: '#2A1A0F' }}>Vergadering</option>
              <option value="Catering op locatie" style={{ background: '#2A1A0F' }}>Catering op locatie</option>
              <option value="Privédiner" style={{ background: '#2A1A0F' }}>Privédiner</option>
              <option value="Personeelsuitje" style={{ background: '#2A1A0F' }}>Personeelsuitje</option>
              <option value="Strategiedag" style={{ background: '#2A1A0F' }}>Strategiedag</option>
              <option value="Anders" style={{ background: '#2A1A0F' }}>Anders</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Bericht</label>
            <textarea
              name="bericht"
              value={form.bericht}
              onChange={handleChange}
              rows={4}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
              placeholder="Vertel over jullie bijeenkomst — aantal personen, wensen, vragen…"
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '0.25rem' }}>
            Verstuur aanvraag
          </button>

          <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.4)', fontSize: '0.7rem', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
            Je e-mailclient opent automatisch met je aanvraag ingevuld.
          </p>
        </form>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// SECTIE 1 — HERO
// ══════════════════════════════════════════════════════════════════════════
function ZakelijkHero() {
  const bgRef = useParallax()
  const [shown, setShown] = useState([])
  const [showSub, setShowSub] = useState(false)
  const [showCtas, setShowCtas] = useState(false)
  const words = ['Zakelijk', '&', 'Catering']

  useEffect(() => {
    words.forEach((_, i) => {
      setTimeout(() => setShown(v => [...v, i]), WORD_START + i * WORD_STEP)
    })
    const lastWordEnd = WORD_START + (words.length - 1) * WORD_STEP + WORD_DUR
    setTimeout(() => setShowSub(true), lastWordEnd + 150)
    setTimeout(() => setShowCtas(true), lastWordEnd + 300)
  }, [])

  return (
    <section style={{
      position: 'relative',
      height: 'calc(100vh - 64px)',
      marginTop: '64px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: "url('/images/zakelijk-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,8,2,0.52)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: '860px', padding: '0 2rem' }}>
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.62)',
          fontSize: '0.75rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
          opacity: showSub ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}>
          Bergsma Easterein
        </p>

        <h1 style={{ margin: '0 0 1.75rem', lineHeight: 1.25 }}>
          {words.map((w, i) => (
            <span key={i} style={{
              fontFamily: 'Zapfino, cursive',
              color: '#E6D6BF',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              display: 'inline-block',
              opacity: shown.includes(i) ? 1 : 0,
              transform: shown.includes(i) ? 'translateY(0)' : 'translateY(22px)',
              transition: `opacity ${WORD_DUR}ms cubic-bezier(0.22,1,0.36,1), transform ${WORD_DUR}ms cubic-bezier(0.22,1,0.36,1)`,
              marginRight: i < words.length - 1 ? '0.35em' : 0,
            }}>
              {w}
            </span>
          ))}
        </h1>

        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.82)',
          fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
          lineHeight: 1.85,
          maxWidth: '560px',
          margin: '0 auto 2.75rem',
          opacity: showSub ? 1 : 0,
          transform: showSub ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
        }}>
          Vergaderen, dineren of catering op locatie — op maat geregeld in het hart van Fryslân.
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: showCtas ? 1 : 0,
          transform: showCtas ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <a href="#arrangementen" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            Bekijk arrangementen
          </a>
          <a href="#contact" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            Vraag offerte aan
          </a>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// SECTIE 2 — LOCATIE & USPs
// ══════════════════════════════════════════════════════════════════════════
function ZakelijkLocatie() {
  const sectionRef = useReveal()
  const bgRef = useParallax()

  const features = [
    {
      icon: <PinIcon />,
      title: 'Centrale ligging',
      text: 'Op gelijke afstand van Sneek, Leeuwarden en Bolsward — makkelijk bereikbaar vanuit heel Fryslân. Gratis parkeren voor al je gasten.',
    },
    {
      icon: <AtmosphereIcon />,
      title: 'Authentieke sfeer',
      text: 'Vergaderen in een historische omgeving werkt anders. Inspirerend, ontspannen en gedenkwaardig — ver weg van het alledaagse kantoor.',
    },
    {
      icon: <FacilitiesIcon />,
      title: 'Volledig uitgerust',
      text: 'Beamer, projectiescherm, microfoons, geluidsinstallatie, flip-overs en gratis wifi — alles staat klaar als jij aankomt.',
    },
  ]

  return (
    <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', padding: '7rem 0', display: 'flex', alignItems: 'center' }}>
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: "url('/images/zakelijk-locatie.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(12,4,1,0.76)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div className="deal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Links — verhaal */}
          <div className="reveal">
            <div style={{
              background: 'rgba(30,10,5,0.25)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderRadius: '12px',
              padding: '2.5rem 2.5rem 2.5rem 0',
            }}>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.58)', fontSize: '0.72rem', letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Vergaderlocatie Fryslân
              </p>
              <h2 style={{
                fontFamily: 'Zapfino, cursive',
                color: '#E6D6BF',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.9rem)',
                margin: '0 0 1.5rem',
                lineHeight: 1.3,
              }}>
                Midden in Friesland, ver van het gewone
              </h2>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.82)', fontSize: '0.95rem', lineHeight: 1.9, margin: '0 0 1.1rem' }}>
                Op zoek naar een inspirerende vergaderlocatie die je team echt meeneemt? Bergsma Easterein biedt een authentieke omgeving — ideaal voor strategiedagen, teamdagen en personeelsuitjes in een setting die mensen bijblijft.
              </p>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.72)', fontSize: '0.9rem', lineHeight: 1.9, margin: 0 }}>
                Wil je de dag afsluiten met een borrel, een wandeling door natuurgebied 't Skrok of een gezamenlijk diner? We denken graag met je mee — van de eerste koffie tot de laatste toast.
              </p>
            </div>
          </div>

          {/* Rechts — feature items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {features.map((f, i) => (
              <div key={i} className="glass-card reveal" style={{
                padding: '1.6rem 1.75rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.25rem',
                transitionDelay: `${i * 100}ms`,
              }}>
                <div style={{ marginTop: '2px' }}>{f.icon}</div>
                <div>
                  <div style={{ fontFamily: 'Lora, serif', color: '#E6D6BF', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                    {f.title}
                  </div>
                  <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.7)', fontSize: '0.83rem', lineHeight: 1.7 }}>
                    {f.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// SECTIE 3 — VERGADERARRANGEMENTEN
// ══════════════════════════════════════════════════════════════════════════
const ARRANGEMENTEN = [
  {
    nummer: 1,
    prijs: '€ 15,00',
    duur: '4-uurs vergadering — exclusief lunch',
    items: [
      'Onbeperkt koffie of thee',
      'Zoets bij de koffie',
      'Tafelwater',
      'Consumptie ter afsluiting',
      'Door jou gewenste opstelling',
      'Beamer, scherm & flip-overs',
      'Gratis wifi & parkeren',
    ],
  },
  {
    nummer: 2,
    prijs: '€ 29,50',
    duur: '4-uurs vergadering — inclusief lunch',
    items: [
      'Onbeperkt koffie of thee',
      'Zoets bij de koffie',
      'Tafelwater',
      'Lunch: soep, broodje carpaccio & broodje kroket met verse jus of melk',
      'Door jou gewenste opstelling',
      'Beamer, scherm & flip-overs',
      'Gratis wifi & parkeren',
    ],
  },
  {
    nummer: 3,
    prijs: '€ 34,50',
    duur: '8-uurs vergadering — inclusief lunch',
    items: [
      'Onbeperkt koffie of thee',
      'Zoets bij de koffie',
      'Tafelwater',
      'Lunch: soep, broodje carpaccio & broodje kroket met verse jus of melk',
      'Consumptie ter afsluiting',
      'Door jou gewenste opstelling',
      'Beamer, scherm & flip-overs',
      'Gratis wifi & parkeren',
    ],
  },
]

function ZakelijkArrangementen() {
  const sectionRef = useReveal()
  const bgRef = useParallax()

  return (
    <section id="arrangementen" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', padding: '7rem 0', display: 'flex', alignItems: 'center' }}>
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: "url('/images/feest-info.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,2,0,0.50)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="reveal" style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', margin: '0 0 1rem' }}>
            Vergaderarrangementen
          </h2>
          <p className="reveal reveal-delay-1" style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.72)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
            Drie arrangementen — elk met een andere duur en invulling. Zaalhuur is niet inbegrepen en wordt op aanvraag bepaald.
          </p>
        </div>

        <div className="zakelijk-arrangementen-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}>
          {ARRANGEMENTEN.map((a, i) => (
            <ArrangementCard key={i} {...a} delay={i * 120} />
          ))}
        </div>

        {/* Zaalhuur notitie */}
        <div className="glass-card reveal" style={{ maxWidth: '660px', margin: '2.5rem auto 0', padding: '1.5rem 2rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.72)', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>
            <span style={{ color: '#E6D6BF', fontWeight: 600 }}>Zaalhuur</span> is exclusief en wordt berekend op basis van het aantal personen, de benodigde ruimte en het aantal dagdelen. Regelmatige gebruiker? We maken graag een voorstel op maat.
          </p>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// SECTIE 4 — RUIMTES
// ══════════════════════════════════════════════════════════════════════════
const RUIMTES = [
  {
    icon: <BovenzaalIcon />,
    naam: 'Bovenzaal',
    capaciteit: '25',
    beschrijving: 'De intieme bovenzaal is de perfecte setting voor directievergaderingen, zakelijke diners en besloten strategiesessies in een sfeervolle, historische omgeving.',
  },
  {
    icon: <TuinzaalIcon />,
    naam: 'Tuinzaal',
    capaciteit: '45',
    beschrijving: 'De ruime tuinzaal is veelzijdig en geschikt voor workshops, presentaties en teamdagen. Genoeg ruimte voor creatieve opstellingen en beweging.',
  },
  {
    icon: <TheaterzaalIcon />,
    naam: 'Theaterzaal',
    capaciteit: '300',
    beschrijving: 'Onze grote theaterzaal biedt ruimte voor congressen, grote personeelsfeesten en presentaties tot 300 personen — volledig uitgerust en indrukwekkend.',
  },
]

function ZakelijkRuimtes() {
  const sectionRef = useReveal()
  const bgRef = useParallax()

  return (
    <section ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', padding: '7rem 0', display: 'flex', alignItems: 'center' }}>
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: "url('/images/feest-hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(42,10,5,0.65)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 className="reveal" style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', margin: '0 0 1rem' }}>
            Onze Ruimtes
          </h2>
          <p className="reveal reveal-delay-1" style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.72)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            Van intiem en besloten tot groot en imposant — voor elke bijeenkomst is er een passende ruimte bij Bergsma Easterein.
          </p>
        </div>

        <div className="zakelijk-ruimtes-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {RUIMTES.map((r, i) => (
            <RuimteCard key={i} {...r} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// SECTIE 5 — CATERING & CONTACT
// ══════════════════════════════════════════════════════════════════════════
function ZakelijkCatering() {
  const sectionRef = useReveal()
  const bgRef = useParallax()

  return (
    <section id="contact" ref={sectionRef} style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', padding: '7rem 0', display: 'flex', alignItems: 'center' }}>
      <div ref={bgRef} style={{
        position: 'absolute',
        inset: '-15% 0',
        backgroundImage: "url('/images/zakelijk-catering.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,5,2,0.62)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>
        <div className="deal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Links — catering beschrijving */}
          <div className="reveal">
            <div style={{
              background: 'rgba(30,10,5,0.25)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderRadius: '12px',
              padding: '2.5rem 2.5rem 2.5rem 0',
            }}>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.58)', fontSize: '0.72rem', letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Catering op locatie
              </p>
              <h2 style={{
                fontFamily: 'Zapfino, cursive',
                color: '#E6D6BF',
                fontSize: 'clamp(1.8rem, 3vw, 2.7rem)',
                margin: '0 0 1.5rem',
                lineHeight: 1.3,
              }}>
                Bergsma komt naar jou toe
              </h2>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.82)', fontSize: '0.95rem', lineHeight: 1.9, margin: '0 0 1.25rem' }}>
                Bouwvakborrel, kerstborrel of personeelsfeest op je eigen bedrijfslocatie organiseren? Bergsma Easterein verzorgt catering op elke gewenste locatie — van een informele borrel tot een volledig aangekleed diner.
              </p>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.72)', fontSize: '0.9rem', lineHeight: 1.9, margin: '0 0 2rem' }}>
                Wij denken mee over de opzet, verzorgen de bediening en zorgen dat jij als gastheer of gastvrouw kunt genieten van de avond. Prijzen worden op maat bepaald.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                {[
                  'Bouwvak- & kerstborrel op locatie',
                  'Vergaderarrangement met lunch of diner',
                  'Volledig verzorgd personeelsfeest',
                  'Flexibel inzetbaar — van borrel tot meerdaags event',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '0.88rem' }}>
                    <span style={{ color: 'rgba(201,169,110,0.85)', flexShrink: 0 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rechts — contactformulier */}
          <div className="reveal" style={{ transitionDelay: '150ms' }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// EXPORT
// ══════════════════════════════════════════════════════════════════════════
export default function ZakelijkPage() {
  return (
    <>
      <ZakelijkHero />
      <ZakelijkLocatie />
      <ZakelijkArrangementen />
      <ZakelijkRuimtes />
      <ZakelijkCatering />
      <Footer />
    </>
  )
}
