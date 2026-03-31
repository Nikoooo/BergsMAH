import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal'

export default function MenuSection({ onReserve }) {
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
      {/* Parallax background — zelfde afbeelding als Reviews */}
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
      {/* Overlay — zelfde als Reviews */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(20,8,2,0.40)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: '900px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        {/* Menu card image */}
        <div
          className="reveal"
          style={{ marginBottom: '2.5rem', display: 'inline-block', width: '100%' }}
          onMouseEnter={e => {
            const img = e.currentTarget.querySelector('img')
            if (img) {
              img.style.transform = 'translateY(-6px)'
              img.style.boxShadow = '0 28px 70px rgba(0,0,0,0.75)'
            }
          }}
          onMouseLeave={e => {
            const img = e.currentTarget.querySelector('img')
            if (img) {
              img.style.transform = 'translateY(0)'
              img.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6)'
            }
          }}
        >
          <img
            src="/images/menukaart.webp"
            alt="Menukaart Bergsma Easterein"
            loading="lazy"
            width="860"
            height="614"
            style={{
              width: '100%',
              maxWidth: '860px',
              height: 'auto',
              borderRadius: '12px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              border: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          />
        </div>

        {/* CTA */}
        <div className="reveal reveal-delay-1">
          <button className="btn-primary" onClick={onReserve}>
            Reserveer een tafel
          </button>
        </div>
      </div>
    </section>
  )
}
