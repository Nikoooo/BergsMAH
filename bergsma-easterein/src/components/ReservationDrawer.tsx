import { useState, useEffect } from 'react'

interface ReservationDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const ReservationDrawer = ({ isOpen, onClose }: ReservationDrawerProps) => {
  const [formData, setFormData] = useState({
    naam: '',
    datum: '',
    tijd: '',
    aantal: '2',
    telefoon: '',
    email: '',
    dieetwensen: '',
  })

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder for guestplan integration
    console.log('Reservation:', formData)
    alert('Reservering ontvangen! We nemen contact met u op.')
    onClose()
  }

  const personenOptions = Array.from({ length: 20 }, (_, i) => i + 1)

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-black/95 z-[101] transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-parchment text-3xl hover:text-white transition-colors"
          >
            ×
          </button>

          {/* Heading */}
          <h2 className="font-zapfino text-parchment text-2xl mb-10 mt-4">
            Reserveer een tafel
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Naam */}
            <div>
              <label className="block font-lora text-parchment text-sm mb-2">
                Naam
              </label>
              <input
                type="text"
                name="naam"
                value={formData.naam}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-parchment/40 rounded px-4 py-3 text-parchment font-lora focus:border-parchment focus:outline-none transition-colors"
              />
            </div>

            {/* Datum */}
            <div>
              <label className="block font-lora text-parchment text-sm mb-2">
                Datum
              </label>
              <input
                type="date"
                name="datum"
                value={formData.datum}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-parchment/40 rounded px-4 py-3 text-parchment font-lora focus:border-parchment focus:outline-none transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Tijd */}
            <div>
              <label className="block font-lora text-parchment text-sm mb-2">
                Tijd
              </label>
              <input
                type="time"
                name="tijd"
                value={formData.tijd}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-parchment/40 rounded px-4 py-3 text-parchment font-lora focus:border-parchment focus:outline-none transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Aantal personen */}
            <div>
              <label className="block font-lora text-parchment text-sm mb-2">
                Aantal personen
              </label>
              <select
                name="aantal"
                value={formData.aantal}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-parchment/40 rounded px-4 py-3 text-parchment font-lora focus:border-parchment focus:outline-none transition-colors appearance-none"
              >
                {personenOptions.map(num => (
                  <option key={num} value={num} className="bg-black">
                    {num} {num === 1 ? 'persoon' : 'personen'}
                  </option>
                ))}
                <option value="20+" className="bg-black">20+ personen</option>
              </select>
            </div>

            {/* Telefoonnummer */}
            <div>
              <label className="block font-lora text-parchment text-sm mb-2">
                Telefoonnummer
              </label>
              <input
                type="tel"
                name="telefoon"
                value={formData.telefoon}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-parchment/40 rounded px-4 py-3 text-parchment font-lora focus:border-parchment focus:outline-none transition-colors"
              />
            </div>

            {/* E-mailadres */}
            <div>
              <label className="block font-lora text-parchment text-sm mb-2">
                E-mailadres
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border border-parchment/40 rounded px-4 py-3 text-parchment font-lora focus:border-parchment focus:outline-none transition-colors"
              />
            </div>

            {/* Dieetwensen */}
            <div>
              <label className="block font-lora text-parchment text-sm mb-2">
                Dieetwensen <span className="text-parchment/50">(optioneel)</span>
              </label>
              <textarea
                name="dieetwensen"
                value={formData.dieetwensen}
                onChange={handleChange}
                rows={3}
                className="w-full bg-transparent border border-parchment/40 rounded px-4 py-3 text-parchment font-lora focus:border-parchment focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full font-zapfino italic text-parchment bg-bordeaux px-8 py-4 rounded-full text-lg hover:bg-bordeaux/80 transition-colors mt-8"
            >
              Reserveer nu
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ReservationDrawer
