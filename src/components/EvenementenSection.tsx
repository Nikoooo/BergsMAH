import { useEffect, useRef, useState } from 'react'

interface EventCard {
  title: string
  date?: string
  time?: string
  description: string
}

const eventData: EventCard[] = [
  {
    title: 'Proeverij: Herfstsmaken Jeletrin',
    date: '15 Oktober',
    description: 'Ontdek de Fijnste wijnen tijdens onze wijnproeverij.',
  },
  {
    title: 'Kerstdiner Special',
    date: '15 Oktober',
    time: '22:00–05:00',
    description: 'Het feestseizoen sluiten we groots af LEAD en Sipkel',
  },
  {
    title: 'Wijnproeverij',
    date: '15 maart',
    time: '16:00–21:00',
    description: 'De gezelligste borrel van Easterein is wijnproeverij.',
  },
  {
    title: 'Easterein LIVE',
    time: '20:30–23:00',
    description: 'Live muzik in de steervolle setting Bergama.',
  },
  {
    title: 'The Legendary Blues',
    time: '16:00–21:00',
    description: 'Authenticke blues up zijn allerbest!',
  },
  {
    title: 'Tack, Blank & Frank',
    time: '16:00–21:00',
    description: 'Een unick optreden van dit bijzondere trio.',
  },
]

const parallaxFactors = [0.03, 0.05, 0.04, 0.06, 0.05, 0.08]

const EvenementenSection = () => {
  const [scrollY, setScrollY] = useState(0)
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(6).fill(false))
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
    }, 1500)

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
          backgroundImage: 'url(/images/evenementen-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="font-zapfino text-parchment text-4xl md:text-5xl lg:text-6xl mb-6">
            Agenda
          </h2>
          <p className="font-lora text-parchment/90 text-sm md:text-base max-w-2xl mx-auto">
            Ontdek wat er komende tijd te beleven valt bij Bergsma. Van wijnproeverijen tot
            live optredens — er is altijd jets to doen!
          </p>
        </div>

        {/* Cards Grid - 2 rows x 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {eventData.map((event, index) => (
            <div
              key={index}
              ref={el => { cardRefs.current[index] = el }}
              className={`evenementen-glass-card rounded-lg p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(230,214,191,0.2)] hover:-translate-y-1 hover:border-parchment/40 ${
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
              {/* Event Title */}
              <h3 className="font-zapfino text-parchment text-xl md:text-2xl mb-4 leading-tight">
                {event.title}
              </h3>

              {/* Date with calendar icon */}
              {event.date && (
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-parchment/70 flex-shrink-0"
                  >
                    <rect
                      x="2"
                      y="3"
                      width="12"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 1V5M11 1V5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M2 7H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="font-lora text-parchment/80 text-sm">
                    {event.date}
                  </span>
                </div>
              )}

              {/* Time with clock icon (if applicable) */}
              {event.time && (
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="text-parchment/70 flex-shrink-0"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 4V8L10 10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-lora text-parchment/80 text-sm">
                    {event.time}
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="font-lora text-parchment/70 text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EvenementenSection
