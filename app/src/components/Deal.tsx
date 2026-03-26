import { useState, useEffect, useRef } from 'react'

interface DealProps {
  onReserveClick: () => void
}

const Deal = ({ onReserveClick }: DealProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/images/deal-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Swirl Divider */}
      <div className="relative z-10 w-full overflow-hidden">
        <svg
          className="w-full h-24"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Main decorative line with leaf elements */}
          <path
            d="M0 40 Q 60 20, 120 40 Q 180 60, 240 40 Q 300 20, 360 40 Q 420 60, 480 40 Q 540 20, 600 40 Q 660 60, 720 40 Q 780 20, 840 40 Q 900 60, 960 40 Q 1020 20, 1080 40 Q 1140 60, 1200 40"
            stroke="#E6D6BF"
            strokeWidth="2"
            fill="none"
          />
          {/* Upper decorative vine */}
          <path
            d="M100 25 Q 150 10, 200 25 Q 250 40, 300 25 Q 350 10, 400 25 Q 450 40, 500 25 Q 550 10, 600 25 Q 650 40, 700 25 Q 750 10, 800 25 Q 850 40, 900 25 Q 950 10, 1000 25 Q 1050 40, 1100 25"
            stroke="#E6D6BF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          {/* Lower decorative vine */}
          <path
            d="M100 55 Q 150 70, 200 55 Q 250 40, 300 55 Q 350 70, 400 55 Q 450 40, 500 55 Q 550 70, 600 55 Q 650 40, 700 55 Q 750 70, 800 55 Q 850 40, 900 55 Q 950 70, 1000 55 Q 1050 40, 1100 55"
            stroke="#E6D6BF"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          {/* Small leaf decorations */}
          <ellipse cx="200" cy="30" rx="8" ry="4" fill="#E6D6BF" opacity="0.5" transform="rotate(-30 200 30)" />
          <ellipse cx="400" cy="50" rx="8" ry="4" fill="#E6D6BF" opacity="0.5" transform="rotate(30 400 50)" />
          <ellipse cx="600" cy="30" rx="8" ry="4" fill="#E6D6BF" opacity="0.5" transform="rotate(-30 600 30)" />
          <ellipse cx="800" cy="50" rx="8" ry="4" fill="#E6D6BF" opacity="0.5" transform="rotate(30 800 50)" />
          <ellipse cx="1000" cy="30" rx="8" ry="4" fill="#E6D6BF" opacity="0.5" transform="rotate(-30 1000 30)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column - Text */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h2 className="font-zapfino text-parchment text-2xl md:text-3xl mb-8">
              Meer dan een avondje uit.
            </h2>

            <div className="space-y-6 font-lora text-parchment/90 text-sm md:text-base leading-relaxed">
              <p>
                Bij Bergsma eet je eerlijk en geniet je lokaal. Het ruwe hout, de
                oude spullen aan de muur, de geur van een goed bord eten, hier voelt
                iedereen zich meteen thuis.
              </p>

              <p>
                Want Bergsma is meer dan een restaurant. Het is een plek waar verhalen
                leven. Waar opa nog weet hoe het er vroeger uitzag, en waar zijn
                kleinkinderen vanavond nieuwe herinneringen maken. Die verhalen stapelen
                zich op, aan tafel, achter een glas, na een avond die to snel voorbijging.
              </p>

              <p>
                En die avonden? Die beginnen hier. Hieronder vind je wat er op de
                agenda staat.
              </p>
            </div>
          </div>

          {/* Right Column - Glassmorphism Card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="glass-card rounded-lg p-8 md:p-10 text-center hover:border-parchment/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,214,191,0.15)]">
              {/* Chef Hat Icon */}
              <div className="flex justify-center mb-6">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  className="text-parchment"
                >
                  <path
                    d="M20 55 L20 70 Q20 75 25 75 L55 75 Q60 75 60 70 L60 55"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M15 55 Q10 45 15 35 Q20 25 30 28 Q35 15 50 18 Q65 20 65 35 Q70 45 65 55"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M15 55 L65 55"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M28 55 L28 40 Q28 32 35 35"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M40 55 L40 38 Q40 30 48 33"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M52 55 L52 42 Q52 36 58 38"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>

              <h3 className="font-zapfino text-parchment text-2xl md:text-3xl mb-4">
                Bergsma's Deal
              </h3>

              <p className="font-lora text-parchment/90 text-sm mb-2">
                Elke Donderdag én Zondag
              </p>

              <p className="font-lora text-parchment/80 text-sm mb-6">
                Overheerlijk 3-gangen menu
                <br />
                (speciaal samengesteld door onze creatieve keukenbrigade)
              </p>

              <p className="font-lora font-semibold text-parchment text-3xl md:text-4xl mb-8">
                slechts €29,50
              </p>

              <button
                onClick={onReserveClick}
                className="font-zapfino text-parchment bg-bordeaux px-10 py-4 rounded-full text-base hover:bg-bordeaux/80 transition-colors"
              >
                Reserveer nu
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Deal
