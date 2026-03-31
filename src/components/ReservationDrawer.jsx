import { useEffect, useRef } from 'react'

export default function ReservationDrawer({ open, onClose }) {
  const drawerRef = useRef(null)

  // Trap focus / close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(42,26,15,0.75)',
          zIndex: 200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '100%',
          maxWidth: '480px',
          background: '#2F1B0F',
          zIndex: 201,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '1px solid rgba(230,214,191,0.15)',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '2rem 2rem 1.5rem',
          borderBottom: '1px solid rgba(230,214,191,0.12)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: '1.6rem', margin: 0 }}>
              Reserveer een tafel
            </h2>
            <p style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.6)', fontSize: '0.85rem', margin: '0.4rem 0 0' }}>
              Bergsma Easterein
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid rgba(230,214,191,0.3)',
              color: '#E6D6BF',
              borderRadius: '50%',
              width: 36,
              height: 36,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg viewBox="0 0 20 20" style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 5l10 10M15 5l-10 10" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form body */}
        <div style={{ padding: '2rem', flex: 1 }}>
          {/* Guestplan integration note */}
          <p style={{
            fontFamily: 'Lora, serif',
            color: 'rgba(230,214,191,0.5)',
            fontSize: '0.75rem',
            marginBottom: '2rem',
            fontStyle: 'italic',
          }}>
            Reservering via Guestplan — uw gegevens worden veilig verwerkt.
          </p>

          {/* Form fields */}
          {[
            { label: 'Naam', type: 'text', placeholder: 'Uw volledige naam' },
            { label: 'E-mail', type: 'email', placeholder: 'uw@email.nl' },
            { label: 'Telefoon', type: 'tel', placeholder: '06-12345678' },
          ].map(({ label, type, placeholder }) => (
            <div key={label} style={{ marginBottom: '1.25rem' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Lora, serif',
                color: 'rgba(230,214,191,0.8)',
                fontSize: '0.85rem',
                marginBottom: '0.5rem',
              }}>
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                style={{
                  width: '100%',
                  background: 'rgba(62,35,23,0.6)',
                  border: '1px solid rgba(230,214,191,0.25)',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                  color: '#E6D6BF',
                  fontFamily: 'Lora, serif',
                  fontSize: '0.9rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(230,214,191,0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(230,214,191,0.25)'}
              />
            </div>
          ))}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                Datum
              </label>
              <input
                type="date"
                style={{
                  width: '100%',
                  background: 'rgba(62,35,23,0.6)',
                  border: '1px solid rgba(230,214,191,0.25)',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                  color: '#E6D6BF',
                  fontFamily: 'Lora, serif',
                  fontSize: '0.9rem',
                  outline: 'none',
                  colorScheme: 'dark',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(230,214,191,0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(230,214,191,0.25)'}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                Aantal personen
              </label>
              <select
                style={{
                  width: '100%',
                  background: 'rgba(62,35,23,0.6)',
                  border: '1px solid rgba(230,214,191,0.25)',
                  borderRadius: '8px',
                  padding: '0.7rem 1rem',
                  color: '#E6D6BF',
                  fontFamily: 'Lora, serif',
                  fontSize: '0.9rem',
                  outline: 'none',
                  appearance: 'none',
                  boxSizing: 'border-box',
                  cursor: 'pointer',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(230,214,191,0.6)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(230,214,191,0.25)'}
              >
                {[1,2,3,4,5,6,7,8,'8+'].map((n) => (
                  <option key={n} value={n} style={{ background: '#2F1B0F' }}>{n} {typeof n === 'number' ? 'persoon' + (n > 1 ? 'en' : '') : 'of meer'}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              Bijzonderheden / dieetwensen
            </label>
            <textarea
              rows={3}
              placeholder="Eventuele opmerkingen..."
              style={{
                width: '100%',
                background: 'rgba(62,35,23,0.6)',
                border: '1px solid rgba(230,214,191,0.25)',
                borderRadius: '8px',
                padding: '0.7rem 1rem',
                color: '#E6D6BF',
                fontFamily: 'Lora, serif',
                fontSize: '0.9rem',
                outline: 'none',
                resize: 'vertical',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(230,214,191,0.6)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(230,214,191,0.25)'}
            />
          </div>

          <button className="btn-primary" style={{ width: '100%' }}>
            Bevestig Reservering
          </button>
        </div>
      </div>
    </>
  )
}
