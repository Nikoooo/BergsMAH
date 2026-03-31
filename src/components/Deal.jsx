import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

// Elegant full-width calligraphic swirl divider
function SwirlDivider() {
  const svgRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && svgRef.current) {
          svgRef.current.querySelectorAll('.swirl-path').forEach(p => p.classList.add('drawn'))
        }
      },
      { threshold: 0.2 }
    )
    if (svgRef.current) observer.observe(svgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1100 60"
      style={{ width: '100%', height: '60px', overflow: 'visible', display: 'block' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main flowing wave — full width */}
      <path
        className="swirl-path"
        d="M 90 30 C 180 12, 230 48, 330 30 C 430 12, 530 48, 630 30 C 730 12, 820 48, 920 30 C 960 22, 980 32, 1010 30"
        stroke="#E6D6BF"
        strokeWidth="0.9"
        strokeOpacity="0.75"
      />

      {/* Left outer curl */}
      <path
        className="swirl-path"
        d="M 90 30 C 78 20, 60 16, 52 26 C 44 36, 56 46, 70 38 C 84 30, 76 14, 64 16 C 52 18, 42 30, 48 40"
        stroke="#E6D6BF"
        strokeWidth="0.85"
        strokeOpacity="0.72"
      />
      {/* Left small leaf tail */}
      <path
        className="swirl-path"
        d="M 48 40 C 42 46, 32 44, 36 36 C 40 28, 52 28, 52 36"
        stroke="#E6D6BF"
        strokeWidth="0.7"
        strokeOpacity="0.6"
      />
      {/* Left tiny tendril */}
      <path
        className="swirl-path"
        d="M 36 36 C 28 38, 22 34, 26 28"
        stroke="#E6D6BF"
        strokeWidth="0.55"
        strokeOpacity="0.5"
      />

      {/* Right outer curl (mirrored) */}
      <path
        className="swirl-path"
        d="M 1010 30 C 1022 20, 1040 16, 1048 26 C 1056 36, 1044 46, 1030 38 C 1016 30, 1024 14, 1036 16 C 1048 18, 1058 30, 1052 40"
        stroke="#E6D6BF"
        strokeWidth="0.85"
        strokeOpacity="0.72"
      />
      {/* Right small leaf tail */}
      <path
        className="swirl-path"
        d="M 1052 40 C 1058 46, 1068 44, 1064 36 C 1060 28, 1048 28, 1048 36"
        stroke="#E6D6BF"
        strokeWidth="0.7"
        strokeOpacity="0.6"
      />
      {/* Right tiny tendril */}
      <path
        className="swirl-path"
        d="M 1064 36 C 1072 38, 1078 34, 1074 28"
        stroke="#E6D6BF"
        strokeWidth="0.55"
        strokeOpacity="0.5"
      />

      {/* Center diamond accent */}
      <path
        className="swirl-path"
        d="M 546 21 L 550 30 L 554 21 L 550 12 Z"
        stroke="#E6D6BF"
        strokeWidth="0.8"
        strokeOpacity="0.68"
      />
      {/* Flanking dots */}
      <circle cx="536" cy="30" r="1.3" fill="#E6D6BF" fillOpacity="0.55" />
      <circle cx="564" cy="30" r="1.3" fill="#E6D6BF" fillOpacity="0.55" />
    </svg>
  )
}

export default function Deal({ onReserve }) {
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
      style={{ position: 'relative', overflow: 'hidden', padding: '5rem 0 6rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      {/* Background */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-15% 0',
          backgroundImage: "url('/images/deal.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(60,30,15,0.45)', zIndex: 1 }} />

      {/* Full-width content wrapper */}
      <div style={{ position: 'relative', zIndex: 5, maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', width: '100%' }}>

        {/* Swirl — full width, above the grid */}
        <div className="reveal" style={{ marginBottom: '1.5rem' }}>
          <SwirlDivider />
        </div>

        {/* Two-column grid */}
        <div
          className="deal-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
        >
          {/* Left column — text met leesbaarheidswaas */}
          <div style={{
            paddingRight: '40px',
            background: 'rgba(30, 10, 5, 0.25)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            borderRadius: '8px',
            padding: '1.5rem 2rem 1.5rem 1rem',
          }}>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: 'Zapfino, cursive',
                color: '#E6D6BF',
                fontSize: 'clamp(1.6rem, 3vw, 2.6rem)',
                margin: '0 0 1.5rem',
                lineHeight: 1.25,
              }}
            >
              Meer dan een avondje uit.
            </h2>

            <p className="reveal reveal-delay-2" style={{ fontFamily: 'Lora, serif', color: '#E6D6BF', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.2rem' }}>
              Bij Bergsma eet je eerlijk en geniet je lokaal. Het ruwe hout, de oude spullen aan de muur, de geur van een goed bord eten, hier voelt iedereen zich meteen thuis.
            </p>

            <p className="reveal reveal-delay-3" style={{ fontFamily: 'Lora, serif', color: '#E6D6BF', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.2rem' }}>
              Want Bergsma is meer dan een restaurant. Het is een plek waar verhalen leven. Waar opa nog weet hoe het er vroeger uitzag, en waar zijn kleinkinderen vanavond nieuwe herinneringen maken. Die verhalen stapelen zich op, aan tafel, achter een glas, na een avond die to snel voorbijging.
            </p>

            <p className="reveal reveal-delay-4" style={{ fontFamily: 'Lora, serif', color: '#E6D6BF', fontSize: '0.95rem', lineHeight: 1.8 }}>
              En die avonden? Die beginnen hier. Hieronder vind je wat er op de agenda staat.
            </p>
          </div>

          {/* Right column — Deal card */}
          <div className="reveal reveal-delay-2">
            <div
              className="glass-card"
              style={{
                padding: '30px',
                textAlign: 'center',
                maxWidth: '360px',
                margin: '0 auto',
              }}
            >
              {/* Chef hat icon */}
              <div style={{ marginBottom: '15px' }}>
                <img
                  src="/images/chef_hat.png"
                  alt=""
                  style={{ height: '70px', width: 'auto', margin: '0 auto', display: 'block' }}
                />
              </div>

              <h3
                style={{
                  fontFamily: 'Zapfino, cursive',
                  color: '#E6D6BF',
                  fontSize: '1.5rem',
                  margin: '0 0 1rem',
                  lineHeight: 1.3,
                }}
              >
                Bergsma's Deal
              </h3>

              <p style={{ fontFamily: 'Lora, serif', color: '#E6D6BF', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                Elke Donderdag én Zondag<br />
                Overheerlijk 3-gangen menu<br />
                (speciaal samengesteld door onze<br />
                creatieve keukenbrigade)
              </p>

              <div style={{
                fontFamily: 'Lora, serif',
                fontWeight: 700,
                color: '#E6D6BF',
                fontSize: '2rem',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}>
                slechts €29,50
              </div>

              <button className="btn-primary" onClick={onReserve}>
                Reserveer nu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
