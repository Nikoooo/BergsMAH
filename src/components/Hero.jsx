import { useEffect, useRef } from 'react'

const SLOGAN_LINE1 = ['Karakter', 'van', 'vroeger,']
const SLOGAN_LINE2 = ['gezelligheid', 'van', 'nu']
const ALL_WORDS = [...SLOGAN_LINE1, ...SLOGAN_LINE2]
const WORD_START = 80    // ms before first word
const WORD_STEP = 75     // ms between words
const WORD_DUR = 530     // ms per word animation
const LAST_WORD_END = WORD_START + (ALL_WORDS.length - 1) * WORD_STEP + WORD_DUR
const SUBTITLE_START = LAST_WORD_END + 150
const CTA_START = SUBTITLE_START + 200

export default function Hero({ onReserve, onEnter }) {
  const bgRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)

  // Parallax
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

  // Subtitle + CTA entrance after words finish
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
    <section
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Background photo with parallax */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-10% 0',
          backgroundImage: "url('/images/hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      {/* Warm overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(104, 54, 35, 0.50)',
          zIndex: 1,
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          gap: '1.75rem',
          marginTop: '64px',
        }}
      >
        {/* Slogan — word by word */}
        <h1
          style={{
            fontFamily: 'Zapfino, cursive',
            color: '#E6D6BF',
            fontSize: 'clamp(2rem, 5.5vw, 5.2rem)',
            lineHeight: 1.45,
            margin: 0,
            paddingBottom: '2.5rem',
            width: '100%',
            textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 4px 32px rgba(0,0,0,0.35)',
          }}
        >
          <span style={{ display: 'block' }}>
            {SLOGAN_LINE1.map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ animationDelay: `${WORD_START + i * WORD_STEP}ms`, marginRight: '0.28em' }}
              >
                {word}
              </span>
            ))}
          </span>
          <span style={{ display: 'block' }}>
            {SLOGAN_LINE2.map((word, i) => (
              <span
                key={i}
                className="hero-word"
                style={{ animationDelay: `${WORD_START + (SLOGAN_LINE1.length + i) * WORD_STEP}ms`, marginRight: '0.28em' }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: 'Lora, serif',
            color: '#E6D6BF',
            fontSize: 'clamp(0.85rem, 1.4vw, 1rem)',
            maxWidth: '460px',
            lineHeight: 1.7,
            opacity: 0,
            transform: 'translateY(10px)',
            filter: 'blur(2px)',
            transition: `opacity 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                         transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
                         filter 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            margin: 0,
          }}
        >
          Stap binnen in Bergsma Easterein, waar de sfeer van weleer
          samengaat met eerlijke gastvrijheid en heerlijk eten.
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="btn-secondary"
          style={{
            opacity: 0,
            transform: 'scale(0.95)',
            transition: `opacity 500ms ease, transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            background: '#4C0027',
            border: '1px solid rgba(230,214,191,0.35)',
          }}
          onClick={onEnter}
        >
          Kom Binnen Kijken
        </button>
      </div>
    </section>
  )
}
