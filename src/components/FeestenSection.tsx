import { useEffect, useRef, useState } from 'react'

interface FeestCard {
  icon: 'beer' | 'dancing' | 'microphone' | 'wine'
  title: string
  description: string
  date: string
  time: string
}

const feestData: FeestCard[] = [
  {
    icon: 'beer',
    title: 'Boerenrock',
    description: 'Aftrap met het lekkerste pils en meezingers uit de polder. De tent op de kop!',
    date: '14 September',
    time: '21:00 - 02:00',
  },
  {
    icon: 'dancing',
    title: 'Boerenrock',
    description: 'Dansen op de beste hits, met die typische Gronings-Duitse sfeer. Een bijzondere avond.',
    date: '15 September',
    time: '21:00 - 02:00',
  },
  {
    icon: 'microphone',
    title: 'Boerenrock',
    description: 'Geniet van het vintage geluid en de klanken van weleer! Prachtige optredens.',
    date: '23 September',
    time: '21:00 - 02:00',
  },
  {
    icon: 'wine',
    title: 'Boerenrock',
    description: 'Dansen en proosten met de lekkerste wijnen. Een unieke en warme sfeer.',
    date: '26 September',
    time: '21:00 - 02:00',
  },
]

const parallaxFactors = [0.04, 0.06, 0.05, 0.07]

// Beer Glass Icon
const BeerIcon = () => (
  <svg
    width="60"
    height="80"
    viewBox="0 0 60 80"
    fill="none"
    className="text-parchment"
  >
    {/* Glass body */}
    <path
      d="M10 20 L10 65 Q10 75 20 75 L35 75 Q45 75 45 65 L45 20"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Glass bottom */}
    <path
      d="M8 65 L47 65"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Handle */}
    <path
      d="M45 30 Q55 30 55 40 Q55 50 45 50"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Foam */}
    <path
      d="M8 20 Q8 10 18 12 Q25 5 35 10 Q45 5 47 20"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Bubbles */}
    <circle cx="20" cy="45" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="30" cy="55" r="1.5" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="35" cy="40" r="2" stroke="currentColor" strokeWidth="1" fill="none" />
  </svg>
)

// Dancing Couple Icon
const DancingIcon = () => (
  <svg
    width="70"
    height="80"
    viewBox="0 0 70 80"
    fill="none"
    className="text-parchment"
  >
    {/* Male figure */}
    {/* Head */}
    <circle cx="22" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    {/* Body */}
    <path
      d="M22 18 L22 40"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Arms */}
    <path
      d="M22 25 L12 35 M22 25 L32 30"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Legs */}
    <path
      d="M22 40 L15 55 L12 70 M22 40 L30 55 L35 65"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Female figure */}
    {/* Head */}
    <circle cx="48" cy="15" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    {/* Body/dress */}
    <path
      d="M48 20 L48 35 L40 55 L56 55 L48 35"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Arms */}
    <path
      d="M48 25 L38 20 M48 25 L55 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Legs */}
    <path
      d="M44 55 L42 70 M52 55 L54 68"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

// Vintage Microphone Icon
const MicrophoneIcon = () => (
  <svg
    width="50"
    height="80"
    viewBox="0 0 50 80"
    fill="none"
    className="text-parchment"
  >
    {/* Microphone head - grille */}
    <ellipse
      cx="25"
      cy="20"
      rx="15"
      ry="18"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Grille lines horizontal */}
    <path
      d="M12 15 H38 M12 20 H38 M12 25 H38"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Grille lines vertical */}
    <path
      d="M20 5 V35 M25 2 V38 M30 5 V35"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Microphone body */}
    <path
      d="M18 38 L18 55 Q18 60 25 60 Q32 60 32 55 L32 38"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Switch */}
    <rect
      x="22"
      y="45"
      width="6"
      height="8"
      rx="1"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />
    {/* Stand connector */}
    <path
      d="M25 60 L25 70"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Base */}
    <path
      d="M15 70 L35 70 M20 70 L15 78 M30 70 L35 78"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

// Clinking Wine Glasses Icon
const WineIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    className="text-parchment"
  >
    {/* Left glass */}
    {/* Bowl */}
    <path
      d="M10 25 Q10 45 20 45 Q30 45 30 25"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Wine level */}
    <path
      d="M12 30 Q20 35 28 30"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Stem */}
    <path
      d="M20 45 L20 65"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Base */}
    <path
      d="M12 65 Q20 70 28 65"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />

    {/* Right glass */}
    {/* Bowl */}
    <path
      d="M50 25 Q50 45 60 45 Q70 45 70 25"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Wine level */}
    <path
      d="M52 30 Q60 35 68 30"
      stroke="currentColor"
      strokeWidth="1"
    />
    {/* Stem */}
    <path
      d="M60 45 L60 65"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    {/* Base */}
    <path
      d="M52 65 Q60 70 68 65"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />

    {/* Clink sparkles */}
    <path
      d="M38 20 L42 16 M40 18 L40 12 M38 16 L42 20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

const IconComponent = ({ icon }: { icon: FeestCard['icon'] }) => {
  switch (icon) {
    case 'beer':
      return <BeerIcon />
    case 'dancing':
      return <DancingIcon />
    case 'microphone':
      return <MicrophoneIcon />
    case 'wine':
      return <WineIcon />
    default:
      return null
  }
}

const FeestenSection = () => {
  const [scrollY, setScrollY] = useState(0)
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(4).fill(false))
  const [entranceComplete, setEntranceComplete] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  // Entrance animation with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newState = [...prev]
                  newState[index] = true
                  return newState
                })
              }, index * 100)
              observer.disconnect()
            }
          },
          { threshold: 0.2 }
        )
        observer.observe(cardRef)
        observers.push(observer)
      }
    })

    // Mark entrance as complete after all cards should be visible
    const timer = setTimeout(() => {
      setEntranceComplete(true)
    }, 1200)

    return () => {
      observers.forEach(obs => obs.disconnect())
      clearTimeout(timer)
    }
  }, [])

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (entranceComplete) {
        setScrollY(window.scrollY)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [entranceComplete])

  const getParallaxOffset = (index: number) => {
    if (!sectionRef.current) return 0
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const relativeScroll = scrollY - sectionTop + window.innerHeight
    return relativeScroll * parallaxFactors[index]
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-16 md:py-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/feesten-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title - Left aligned */}
        <div className="mb-12">
          <h2 className="font-zapfino text-parchment text-4xl md:text-5xl lg:text-6xl">
            Feesten Agenda
          </h2>
        </div>

        {/* Cards Grid - 4 cards in one row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {feestData.map((feest, index) => (
            <div
              key={index}
              ref={el => { cardRefs.current[index] = el }}
              className={`feesten-glass-card rounded-lg p-6 flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_0_30px_rgba(230,214,191,0.2)] hover:-translate-y-1 hover:border-parchment/40 ${
                visibleCards[index]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{
                transform: entranceComplete
                  ? `translateY(${getParallaxOffset(index)}px)`
                  : visibleCards[index]
                    ? 'translateY(0)'
                    : 'translateY(32px)',
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <IconComponent icon={feest.icon} />
              </div>

              {/* Title */}
              <h3 className="font-zapfino text-parchment text-2xl md:text-3xl mb-4">
                {feest.title}
              </h3>

              {/* Description */}
              <p className="font-lora text-parchment/80 text-sm leading-relaxed mb-6 flex-grow">
                {feest.description}
              </p>

              {/* Date */}
              <p className="font-lora text-parchment text-base mb-1">
                {feest.date}
              </p>

              {/* Time */}
              <p className="font-lora text-parchment/70 text-sm mb-6">
                {feest.time}
              </p>

              {/* Reserve Button */}
              <button
                onClick={() => {}}
                className="font-zapfino text-parchment bg-bordeaux px-8 py-3 rounded-full text-sm hover:bg-bordeaux/80 transition-colors border border-parchment/20"
              >
                Reserveer nu
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeestenSection
