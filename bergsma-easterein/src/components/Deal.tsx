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
      <div className="relative z-10 w-full">
        <svg
          className="w-full h-16"
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 30 Q 100 10, 200 30 T 400 30 T 600 30 T 800 30 T 1000 30 T 1200 30"
            stroke="#E6D6BF"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0 35 Q 150 15, 300 35 T 600 35 T 900 35 T 1200 35"
            stroke="#E6D6BF"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M0 25 Q 150 45, 300 25 T 600 25 T 900 25 T 1200 25"
            stroke="#E6D6BF"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
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
                  {/* Chef hat shape */}
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
                  {/* Folds */}
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
