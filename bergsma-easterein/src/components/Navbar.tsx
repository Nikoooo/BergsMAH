import { useState, useEffect } from 'react'

interface NavbarProps {
  onReserveClick: () => void
}

const Navbar = ({ onReserveClick }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Trouwen', 'Vacatures', 'Zakelijk', 'Feesten', 'Evenementen']

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-transparent'
          : 'bg-black/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <span className="font-zapfino text-parchment text-2xl leading-tight">
              Bergsma
            </span>
            <span className="font-lora text-parchment text-xs tracking-[0.3em] uppercase">
              Easterein
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-lora text-parchment text-sm hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Reserve Button */}
          <button
            onClick={onReserveClick}
            className="font-zapfino text-parchment bg-bordeaux px-6 py-2 rounded-full text-sm hover:bg-bordeaux/90 transition-colors"
          >
            Reserveren
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
