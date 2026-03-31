import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Footer from './Footer'

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function RingsIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 64, height: 64 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <circle cx="17" cy="24" r="10" />
      <circle cx="31" cy="24" r="10" />
    </svg>
  )
}

function WineGlassIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 64, height: 64 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <path d="M14 6 h20 L27 24 Q25 30 24 30 Q23 30 21 24 Z" />
      <line x1="24" y1="30" x2="24" y2="42" />
      <line x1="16" y1="42" x2="32" y2="42" />
    </svg>
  )
}

function MusicNoteIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 64, height: 64 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <path d="M20 36 L20 14 L38 10 L38 32" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="36" r="4" />
      <circle cx="34" cy="32" r="4" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 44, height: 44 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <rect x="6" y="10" width="36" height="32" rx="4" />
      <line x1="6" y1="20" x2="42" y2="20" />
      <line x1="16" y1="6" x2="16" y2="14" />
      <line x1="32" y1="6" x2="32" y2="14" />
    </svg>
  )
}

function GuideIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 44, height: 44 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <path d="M24 6 L28 18 L42 18 L30 26 L34 38 L24 30 L14 38 L18 26 L6 18 L20 18 Z" strokeLinejoin="round" />
    </svg>
  )
}

function HouseIcon() {
  return (
    <svg viewBox="0 0 48 48" style={{ width: 44, height: 44 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <path d="M6 22 L24 8 L42 22" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 20 L10 40 L38 40 L38 20" />
      <rect x="19" y="28" width="10" height="12" />
    </svg>
  )
}

// ─── Hero Animatie constanten ─────────────────────────────────────────────────

const HERO_WORDS = ['Wij', 'Zeggen', 'Ja']
const WORD_START = 80
const WORD_STEP = 90
const WORD_DUR = 530
const LAST_WORD_END = WORD_START + (HERO_WORDS.length - 1) * WORD_STEP + WORD_DUR
const SUBTITLE_START = LAST_WORD_END + 150
const CTA_START = SUBTITLE_START + 200

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  const [chevronClass, setChevronClass] = useState('')

  function toggle() {
    setOpen(v => !v)
    setChevronClass(open ? 'chevron-close' : 'chevron-open')
  }

  return (
    <div
      className="reveal stagger-item faq-row"
      style={{ borderBottom: '1px solid rgba(230,214,191,0.2)', overflow: 'hidden' }}
    >
      <button
        onClick={toggle}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          padding: '1.2rem 0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <span style={{ fontFamily: 'Lora, serif', color: '#E6D6BF', fontSize: '1rem', fontWeight: 500 }}>
          {q}
        </span>
        <svg
          viewBox="0 0 20 20"
          className={chevronClass}
          style={{ width: 18, height: 18, flexShrink: 0, stroke: '#E6D6BF', fill: 'none', strokeWidth: 2 }}
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{ maxHeight: open ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.8)',
          fontSize: '0.9rem',
          lineHeight: 1.75,
          paddingBottom: '1.2rem',
          margin: 0,
        }}>
          {a}
        </p>
      </div>
    </div>
  )
}

// ─── Sectie 1: Hero ───────────────────────────────────────────────────────────

function TrouwenHero() {
  const bgRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgRef.current) {
            bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`
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
    const tSub = setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '1'
        subtitleRef.current.style.transform = 'translateY(0)'
        subtitleRef.current.style.filter = 'blur(0)'
      }
    }, SUBTITLE_START)
    const tCta = setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.style.opacity = '1'
        ctaRef.current.style.transform = 'scale(1)'
      }
    }, CTA_START)
    return () => { clearTimeout(tSub); clearTimeout(tCta) }
  }, [])

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Parallax achtergrond */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-10% 0',
          backgroundImage: "url('/images/trouwen-hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Warm overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(62, 30, 10, 0.55)', zIndex: 1 }} />

      {/* Inhoud */}
      <div style={{
        position: 'relative', zIndex: 5, flex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 1.5rem', gap: '1.75rem', marginTop: '64px',
      }}>
        <h1 style={{
          fontFamily: 'Zapfino, cursive',
          color: '#E6D6BF',
          fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
          lineHeight: 1.5,
          margin: 0,
          paddingBottom: '2.5rem',
          textShadow: '0 2px 8px rgba(0,0,0,0.45), 0 4px 32px rgba(0,0,0,0.4)',
        }}>
          {HERO_WORDS.map((word, i) => (
            <span
              key={i}
              className="hero-word"
              style={{ animationDelay: `${WORD_START + i * WORD_STEP}ms`, marginRight: '0.28em' }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'Lora, serif',
            color: '#E6D6BF',
            fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
            maxWidth: '500px',
            lineHeight: 1.75,
            opacity: 0,
            transform: 'translateY(10px)',
            filter: 'blur(2px)',
            transition: 'opacity 700ms cubic-bezier(0.25,0.46,0.45,0.94), transform 700ms cubic-bezier(0.25,0.46,0.45,0.94), filter 700ms cubic-bezier(0.25,0.46,0.45,0.94)',
            margin: 0,
          }}
        >
          Jullie trouwdag verdient een plek met karakter. Centraal in Fryslân,
          omgeven door de sfeer van weleer en de warmte van thuis.
        </p>

        <button
          ref={ctaRef}
          className="btn-secondary"
          style={{
            opacity: 0,
            transform: 'scale(0.95)',
            transition: 'opacity 500ms ease, transform 500ms cubic-bezier(0.25,0.46,0.45,0.94)',
            background: '#4C0027',
            border: '1px solid rgba(230,214,191,0.35)',
          }}
        >
          Ontvang de brochure
        </button>
      </div>
    </section>
  )
}

// ─── Sectie 2: Diensten + FAQ ─────────────────────────────────────────────────

const diensten = [
  {
    icon: <RingsIcon />,
    title: 'Ceremonie',
    desc: 'Binnen of in onze romantische binnentuin — jullie beloften op een plek die het waard is.',
  },
  {
    icon: <WineGlassIcon />,
    title: 'Diner',
    desc: 'Een menu samengesteld naar jullie eigen wens, geserveerd met de warmte die bij Bergsma hoort.',
  },
  {
    icon: <MusicNoteIcon />,
    title: 'Feest',
    desc: 'Als het diner klaar is begint het feest. Tot in de vroege uurtjes met familie en vrienden.',
  },
]

const faqsDiensten = [
  {
    q: 'Trouwen bij Bergsma Easterein',
    a: 'Bergsma Easterein is al sinds 1911 een begrip in Fryslân. Onze locatie is geschikt voor de ceremonie, het huwelijksdiner en het trouwfeest. Gasten komen gelegen tussen Sneek, Leeuwarden en Bolsward vinden jullie hier een plek met echte authenticiteit en karakter van vroeger.',
  },
  {
    q: 'Hoe ziet jullie trouwdag eruit?',
    a: 'We beginnen met de ontvangst van jullie gasten met een drankje. Daarna volgt de ceremonie, het diner en het feest. We passen het programma volledig aan jullie wensen aan — van de eerste dans tot het dessert.',
  },
  {
    q: 'Ceremonie binnen of in de binnentuin',
    a: 'Bij mooi weer is onze binnentuin een prachtige plek voor de ceremonie. Bij slecht weer gaan we naar binnen, waar we een warme en sfeervol ingerichte ruimte hebben. Alles is flexibel.',
  },
]

const CARD_DELAYS = [0, 130, 260]

function TrouwenDiensten() {
  const sectionRef = useReveal()
  const bgRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none)').matches
    if (isTouchDevice) return
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgRef.current) {
            const rect = bgRef.current.parentElement.getBoundingClientRect()
            bgRef.current.style.transform = `translateY(${-rect.top * 0.4}px)`
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
          grid.querySelectorAll('.feesten-3d-card').forEach(c => c.classList.add('fold-in'))
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
      style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: "url('/images/trouwen-ornament2.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20, 8, 2, 0.40)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '0 2rem' }}>
        {/* Titel */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2
            className="reveal"
            style={{
              fontFamily: 'Zapfino, cursive',
              color: '#E6D6BF',
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              margin: '0 0 2.5rem',
              paddingBottom: '2rem',
              textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            }}
          >
            De Mooiste Dag van Jullie Leven
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: 'Lora, serif',
              color: 'rgba(230,214,191,0.8)',
              fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.75,
            }}
          >
            Van ceremonie tot de laatste dans — wij zorgen dat alles klopt.
          </p>
        </div>

        {/* Kaarten */}
        <div
          ref={gridRef}
          className="feesten-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem', marginBottom: '4rem' }}
        >
          {diensten.map((d, i) => (
            <div
              key={i}
              className="glass-card feesten-3d-card"
              style={{
                padding: '2.75rem 2rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.1rem',
                minHeight: '340px',
                animationDelay: `${CARD_DELAYS[i]}ms`,
              }}
            >
              <div>{d.icon}</div>
              <h3 style={{
                fontFamily: 'Zapfino, cursive',
                color: '#E6D6BF',
                fontSize: '1.5rem',
                margin: 0,
                lineHeight: 1.4,
                paddingBottom: '0.75rem',
              }}>
                {d.title}
              </h3>
              <p style={{
                fontFamily: 'Lora, serif',
                color: 'rgba(230,214,191,0.85)',
                fontSize: '0.95rem',
                lineHeight: 1.75,
                margin: 0,
                flex: 1,
              }}>
                {d.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div
          className="glass-card"
          style={{ padding: '0 2rem', marginBottom: '3rem' }}
        >
          <div className="stagger-faq">
            {faqsDiensten.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn-primary reveal">
            Plan een rondleiding
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Sectie 3: Praktisch + FAQ ────────────────────────────────────────────────

const features = [
  { icon: <CalendarIcon />, label: 'Vrijblijvende datum\nreservering mogelijk' },
  { icon: <GuideIcon />, label: 'Begeleiding\nvan A tot Z' },
  { icon: <HouseIcon />, label: 'Huwelijksovernachting\nin Easterein' },
]

const faqsPraktisch = [
  {
    q: 'Save the Date — zo werkt het',
    a: 'Nog niet zeker maar willen jullie datum alvast veiligstellen? Dat kan. Wij plaatsen geheel vrijblijvend een optionele reservering in onze agenda. De reservering wordt pas definitief zodra jullie zeker weten dat Bergsma de plek is voor jullie trouwdag.',
  },
  {
    q: 'Voorbereiding en begeleiding',
    a: 'Vanaf de eerste afspraak tot de grote dag staan wij klaar. We denken mee over de menusamenstelling, de opstelling van de zaal, de timing van het programma en de coördinatie met jullie leveranciers. Jullie hoeven nergens aan te denken.',
  },
  {
    q: 'Catering op jullie eigen locatie',
    a: 'Willen jullie trouwen op een andere locatie maar toch genieten van het eten van Bergsma? Dat is mogelijk. We leveren verzorgde catering op locatie, inclusief bediening en opmaak.',
  },
  {
    q: 'Huwelijksovernachting in Easterein',
    a: 'Na een onvergetelijke avond hoeven jullie nergens heen. In Easterein zijn prachtige bed & breakfast-adressen waar jullie de eerste nacht als getrouwd stel kunnen doorbrengen. We helpen jullie graag met een reservering.',
  },
]

function TrouwenPraktisch() {
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
            bgRef.current.style.transform = `translateY(${-rect.top * 0.4}px)`
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
      style={{ position: 'relative', overflow: 'hidden', padding: '6rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: "url('/images/trouwen-ornament3.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 5, 2, 0.45)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '0 2rem' }}>
        {/* Tweekoloms layout: tekst + features */}
        <div className="deal-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginBottom: '4rem' }}>
          {/* Links: tekst */}
          <div className="reveal">
            <div style={{
              background: 'rgba(30,10,5,0.25)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderRadius: '12px',
              padding: '2.5rem',
            }}>
              <h2 style={{
                fontFamily: 'Zapfino, cursive',
                color: '#E6D6BF',
                fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                margin: '0 0 2rem',
                paddingBottom: '1.5rem',
                lineHeight: 1.5,
                textShadow: '0 2px 12px rgba(0,0,0,0.5)',
              }}>
                Alles Geregeld.<br />Niets Vergeten.
              </h2>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.85)', fontSize: '0.95rem', lineHeight: 1.8, margin: '0 0 1rem' }}>
                In de aanloop naar jullie grote dag staan wij klaar om te helpen waar nodig. Van de bruidstaart tot de styling van de ruimtes en het contact met een DJ of band — wij denken met jullie mee.
              </p>
              <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.85)', fontSize: '0.95rem', lineHeight: 1.8, margin: 0 }}>
                Na afloop bieden wij de huwelijksovernachting aan in één van de prachtige bedand breakfasts van Easterein.
              </p>
            </div>
          </div>

          {/* Rechts: feature items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {features.map((f, i) => (
              <div
                key={i}
                className="glass-card reveal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  padding: '1.5rem 2rem',
                }}
              >
                <div style={{ flexShrink: 0 }}>{f.icon}</div>
                <p style={{
                  fontFamily: 'Lora, serif',
                  color: '#E6D6BF',
                  fontSize: '1rem',
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                }}>
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div
          className="glass-card"
          style={{ padding: '0 2rem', marginBottom: '3rem' }}
        >
          <div className="stagger-faq">
            {faqsPraktisch.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <button className="btn-primary reveal">
            Plan een rondleiding
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Hoofd export ─────────────────────────────────────────────────────────────

export default function TrouwenPage() {
  return (
    <>
      <TrouwenHero />
      <TrouwenDiensten />
      <TrouwenPraktisch />
      <Footer />
    </>
  )
}
