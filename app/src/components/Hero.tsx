import { useEffect, useRef, useState } from 'react'

const Hero = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.15

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 w-full h-[120%]"
        style={{
          backgroundImage: 'url(/images/hero-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Heading */}
        <h1
          className={`font-zapfino text-parchment text-center text-3xl md:text-5xl lg:text-6xl max-w-4xl leading-relaxed transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            lineHeight: '1.5',
            letterSpacing: '0.03em',
          }}
        >
          Karakter van vroeger,
          <br />
          gezelligheid van nu
        </h1>

        {/* Subheading */}
        <p
          className={`font-lora text-parchment/80 text-center text-base md:text-lg max-w-2xl mt-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Stap binnen in Bergsma Easterein — waar de sfeer van weleer
          samengaat met eerlijke gastvrijheid en heerlijk eten.
        </p>

        {/* CTA Button */}
        <button
          className={`font-zapfino text-parchment bg-bordeaux border-2 border-parchment/30 px-10 py-4 rounded-full text-lg mt-10 hover:bg-bordeaux/80 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Kom Binnen Kijken
        </button>
      </div>

      {/* Vertical Text */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10">
        <span
          className="font-lora text-parchment text-xs tracking-[0.4em] uppercase"
          style={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          EASTEREIN · FRYSLÂN
        </span>
      </div>
    </section>
  )
}

export default Hero
