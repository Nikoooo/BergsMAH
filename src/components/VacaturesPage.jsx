import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import Footer from './Footer'

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function CoinIcon() {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 36, height: 36 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <circle cx="20" cy="20" r="14" />
      <path d="M20 11 L20 29" strokeLinecap="round" />
      <path d="M15.5 15.5 Q15.5 12 20 12 Q24.5 12 24.5 15.5 Q24.5 20 20 20 Q24.5 20 24.5 24.5 Q24.5 28 20 28 Q15.5 28 15.5 24.5" strokeLinecap="round" />
    </svg>
  )
}

function CarIcon() {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 36, height: 36 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <path d="M6 24 L8 16 Q9 13 12 13 L28 13 Q31 13 32 16 L34 24 L34 30 L6 30 Z" strokeLinejoin="round" />
      <line x1="6" y1="24" x2="34" y2="24" />
      <circle cx="12" cy="30" r="3" />
      <circle cx="28" cy="30" r="3" />
      <line x1="6" y1="20" x2="8" y2="20" />
      <line x1="32" y1="20" x2="34" y2="20" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 36, height: 36 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <circle cx="20" cy="20" r="14" />
      <line x1="20" y1="10" x2="20" y2="20" strokeLinecap="round" />
      <line x1="20" y1="20" x2="27" y2="25" strokeLinecap="round" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 40 40" style={{ width: 36, height: 36 }} fill="none" stroke="#E6D6BF" strokeWidth="1.6">
      <path d="M20 6 L23.5 15.5 L34 15.5 L26 22 L29 32 L20 26 L11 32 L14 22 L6 15.5 L16.5 15.5 Z" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Hero Animatie constanten ─────────────────────────────────────────────────

const HERO_WORDS = ['Kom', 'Werken', 'bij', 'Bergsma.']
const WORD_START = 80
const WORD_STEP = 90
const WORD_DUR = 530
const LAST_WORD_END = WORD_START + (HERO_WORDS.length - 1) * WORD_STEP + WORD_DUR
const SUBTITLE_START = LAST_WORD_END + 150
const CTA_START = SUBTITLE_START + 200

// ─── Accordion Item ───────────────────────────────────────────────────────────

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
          fontSize: '1.05rem',
          lineHeight: 1.5,
        }}>
          {q}
        </span>
        <svg
          viewBox="0 0 20 20"
          style={{
            width: 18,
            height: 18,
            flexShrink: 0,
            stroke: '#E6D6BF',
            fill: 'none',
            strokeWidth: 2,
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.35s ease',
          }}
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div style={{
        maxHeight: open ? '320px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
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

function VacaturesHero({ onBekijk }) {
  const [wordVisible, setWordVisible] = useState([])
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const bgRef = useRef(null)
  const isTouch = useRef(false)

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
  }, [])

  // Word-by-word animatie
  useEffect(() => {
    const timers = HERO_WORDS.map((_, i) =>
      setTimeout(() => setWordVisible(prev => [...prev, i]), WORD_START + i * WORD_STEP)
    )
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), SUBTITLE_START)
    const ctaTimer = setTimeout(() => setCtaVisible(true), CTA_START)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(subtitleTimer)
      clearTimeout(ctaTimer)
    }
  }, [])

  // Parallax
  useEffect(() => {
    if (isTouch.current) return
    const el = bgRef.current
    if (!el) return
    function onScroll() {
      const rect = el.parentElement.getBoundingClientRect()
      const offset = -rect.top * 0.4
      el.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section style={{ position: 'relative', height: 'calc(100vh - 64px)', marginTop: '64px', overflow: 'hidden', minHeight: 536, display: 'flex', flexDirection: 'column' }}>
      {/* Achtergrond met parallax */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: 'url(/images/vacatures-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(20, 8, 2, 0.42)',
      }} />

      {/* Content — gecentreerd */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 'clamp(50px, 7.5vh, 80px) 6% 0',
        width: '100%',
      }}>
        {/* Zapfino titel — word-voor-word */}
        <h1 style={{
          fontFamily: 'Zapfino, cursive',
          color: '#E6D6BF',
          fontSize: 'clamp(2.2rem, 5.5vw, 4.2rem)',
          lineHeight: 1.55,
          margin: '0 0 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4em',
          alignItems: 'baseline',
          justifyContent: 'center',
        }}>
          {HERO_WORDS.map((word, i) => (
            <span
              key={word}
              style={{
                opacity: wordVisible.includes(i) ? 1 : 0,
                transform: wordVisible.includes(i) ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity ${WORD_DUR}ms cubic-bezier(0.22,1,0.36,1), transform ${WORD_DUR}ms cubic-bezier(0.22,1,0.36,1)`,
                display: 'inline-block',
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitel */}
        <p style={{
          fontFamily: 'Lora, serif',
          color: 'rgba(230,214,191,0.85)',
          fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
          lineHeight: 1.8,
          margin: '0 0 2.2rem',
          maxWidth: '520px',
          opacity: subtitleVisible ? 1 : 0,
          transform: subtitleVisible ? 'translateY(0)' : 'translateY(14px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          Geen doorsnee bijbaan. Wel een plek waar je met plezier naartoe gaat. Wij zoeken mensen die houden van gezelligheid, karakter en goed werk.
        </p>

        {/* CTA knop */}
        <div style={{
          opacity: ctaVisible ? 1 : 0,
          transform: ctaVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <button className="btn-secondary" onClick={onBekijk}>
            Bekijk de vacatures
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Vacatures Content sectie ─────────────────────────────────────────────────

function VacaturesContent() {
  const sectionRef = useReveal()
  const bgRef = useRef(null)
  const isTouch = useRef(false)
  const cardRef = useRef(null)
  const [cardVisible, setCardVisible] = useState(false)
  const [perksVisible, setPerksVisible] = useState([])

  useEffect(() => {
    isTouch.current = window.matchMedia('(hover: none)').matches
  }, [])

  // Parallax
  useEffect(() => {
    if (isTouch.current) return
    const el = bgRef.current
    if (!el) return
    function onScroll() {
      const rect = el.parentElement.getBoundingClientRect()
      const offset = -rect.top * 0.4
      el.style.transform = `translateY(${offset}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Card reveal via IntersectionObserver
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardVisible(true)
          // Stagger perks icons
          ;[0, 1, 2, 3].forEach(i =>
            setTimeout(() => setPerksVisible(prev => [...prev, i]), 200 + i * 80)
          )
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const perks = [
    { icon: <CoinIcon />, label: 'Marktconform loon' },
    { icon: <CarIcon />, label: 'Reiskosten vergoed' },
    { icon: <ClockIcon />, label: 'Flexibele tijden' },
    { icon: <StarIcon />, label: 'Sluitborrel & fooi' },
  ]

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Achtergrond */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: 'url(/images/vacatures-ornament.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(8, 2, 0, 0.28)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Sectietitel */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
          <h2 style={{
            fontFamily: 'Zapfino, cursive',
            color: '#E6D6BF',
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            lineHeight: 1.55,
            margin: 0,
          }}>
            Openstaande Vacatures
          </h2>
        </div>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'Lora, serif',
            color: 'rgba(230,214,191,0.75)',
            fontSize: '1rem',
            margin: 0,
          }}>
            Herken jij jezelf hierin? We horen graag van je.
          </p>
        </div>

        {/* Vacaturekaart — Bediening */}
        <div
          ref={cardRef}
          style={{
            background: 'rgba(20, 5, 10, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(230,214,191,0.18)',
            borderRadius: 14,
            padding: '2rem 2rem 1.75rem',
            marginBottom: '1.25rem',
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Kaart header: titel + badges */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.1rem',
          }}>
            <h3 style={{
              fontFamily: 'Zapfino, cursive',
              color: '#E6D6BF',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              margin: 0,
              lineHeight: 1.4,
            }}>
              Bediening
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              {['Part-time', 'Full-time'].map(badge => (
                <span key={badge} style={{
                  fontFamily: 'Lora, serif',
                  fontSize: '0.75rem',
                  color: '#E6D6BF',
                  background: 'rgba(76,0,39,0.65)',
                  border: '1px solid rgba(230,214,191,0.25)',
                  borderRadius: '999px',
                  padding: '0.25em 0.85em',
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Beschrijving */}
          <p style={{
            fontFamily: 'Lora, serif',
            color: 'rgba(230,214,191,0.82)',
            fontSize: '0.95rem',
            lineHeight: 1.75,
            margin: '0 0 1.75rem',
          }}>
            Jij bent het gezicht van Bergsma. Je zorgt dat gasten zich direct thuis voelen en dat een avond bij ons er eentje wordt om niet te vergeten.
          </p>

          {/* Perks — 4 kolommen */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.5rem',
            marginBottom: '1.75rem',
          }}
          className="vacatures-perks-grid"
          >
            {perks.map((perk, i) => (
              <div
                key={perk.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textAlign: 'center',
                  opacity: perksVisible.includes(i) ? 1 : 0,
                  transform: perksVisible.includes(i) ? 'translateY(0)' : 'translateY(14px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                {perk.icon}
                <span style={{
                  fontFamily: 'Lora, serif',
                  color: 'rgba(230,214,191,0.78)',
                  fontSize: '0.8rem',
                  lineHeight: 1.3,
                }}>
                  {perk.label}
                </span>
              </div>
            ))}
          </div>

          {/* Solliciteer knop — vol breed */}
          <button
            className="btn-primary"
            style={{ width: '100%' }}
          >
            Solliciteer nu
          </button>
        </div>

        {/* Accordion items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          <AccordionItem
            q="Werken in Fryslân's, waarom Bergsma?"
            a="Bergsma Easterein is meer dan een werkplek. Het is een plek met geschiedenis, karakter en een team dat voor elkaar klaar staat. Centraal gelegen in Fryslân, midden tussen Sneek, Leeuwarden en Bolsward. Of je nu net begint of al ervaring hebt: bij ons wordt iedereen snel onderdeel van de ploeg."
            defaultOpen={true}
          />
          <AccordionItem
            q="Geen passende vacature maar toch interesse?"
            a="Stuur ons een open sollicitatie via info@bergsma-easterein.nl. We denken graag met je mee over een passende rol."
          />
        </div>

        {/* Footer-tekst */}
        <p style={{
          fontFamily: 'Lora, serif',
          fontStyle: 'italic',
          color: 'rgba(230,214,191,0.5)',
          fontSize: '0.9rem',
          textAlign: 'center',
          margin: 0,
        }}>
          Nieuwe vacatures volgen. Houd deze pagina in de gaten.
        </p>
      </div>
    </section>
  )
}

// ─── Hoofd export ─────────────────────────────────────────────────────────────

export default function VacaturesPage() {
  const vacaturesRef = useRef(null)

  function scrollToVacatures() {
    if (!vacaturesRef.current) return
    const targetY = vacaturesRef.current.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  return (
    <>
      <VacaturesHero onBekijk={scrollToVacatures} />
      <div ref={vacaturesRef}>
        <VacaturesContent />
      </div>
      <Footer />
    </>
  )
}
