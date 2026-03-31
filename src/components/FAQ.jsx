import { useState, useRef, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'

const faqs = [
  {
    q: 'Wat zijn de openingstijden?',
    a: 'We zijn open van maandag t/m zondag. Ma-Wo: op afspraak. Do-Zo: 16:00–14:00 uur. Donderdag–Zaterdag: 14:00–23:00 uur. Keuken geopend tot 20:30 uur.',
  },
  {
    q: 'Moet ik reserveren?',
    a: 'Reserveren is sterk aanbevolen, zeker in het weekend en voor grotere gezelschappen. U kunt telefonisch of via onze reserveringsknop reserveren.',
  },
  {
    q: 'Hoe is de parkeergelegenheid rondom Bergsma?',
    a: 'Er is voldoende gratis parkeergelegenheid beschikbaar rondom het restaurant aan de Sibadawei.',
  },
  {
    q: 'Houden jullie rekening met dieetwensen?',
    a: 'Ja, wij houden graag rekening met uw dieetwensen. Laat het ons weten bij de reservering, dan zorgen we dat alles in orde is.',
  },
  {
    q: 'Is Bergsma te huren voor een zakelijke bijeenkomst of privé-evenement?',
    a: 'Ja — van vergaderingen en strategiedagen tot privédiners en personeelsfeesten. Alle informatie over arrangementen, ruimtes en catering vind je op onze Zakelijk & Catering pagina.',
  },
]

function ChevronDown({ animClass }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={animClass}
      style={{
        width: 18,
        height: 18,
        flexShrink: 0,
        stroke: '#E6D6BF',
        fill: 'none',
        strokeWidth: 2,
      }}
    >
      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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
      style={{
        borderBottom: '1px solid rgba(230,214,191,0.2)',
        overflow: 'hidden',
      }}
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
        <ChevronDown animClass={chevronClass} />
      </button>

      <div
        style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}
      >
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

export default function FAQ() {
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
          backgroundImage: "url('/images/faq.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(42,26,15,0.68)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '760px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2
            className="reveal"
            style={{
              fontFamily: 'Zapfino, cursive',
              color: '#E6D6BF',
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              margin: 0,
            }}
          >
            Veelgestelde Vragen
          </h2>
        </div>

        <div className="stagger-faq">
          {faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
