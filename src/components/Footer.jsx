export default function Footer() {
  return (
    <footer>
      {/* Main footer */}
      <div
        style={{
          backgroundImage: "url('/images/footer.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(54,34,19,0.72) 60%, rgba(54,34,19,1) 100%)', zIndex: 1 }} />

        <div
          className="footer-grid"
          style={{
            position: 'relative',
            zIndex: 5,
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '3.5rem 2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '3rem',
          }}
        >
          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: '1.2rem', margin: '0 0 1.2rem' }}>
              Contact
            </h4>
            <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '0.875rem', lineHeight: 2 }}>
              <div>Sibadawei 2</div>
              <div>8734 HE Easterein</div>
              <div style={{ marginTop: '0.5rem' }}>Tel: 0515-331290</div>
              <div>
                <a href="mailto:info@bergsmaeasterein.nl" style={{ color: 'rgba(230,214,191,0.8)', textDecoration: 'none' }}>
                  info@bergsmaeasterein.nl
                </a>
              </div>
            </div>
          </div>

          {/* Openingstijden */}
          <div>
            <h4 style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: '1.2rem', margin: '0 0 1.2rem' }}>
              Openingstijden
            </h4>
            <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '0.875rem', lineHeight: 2 }}>
              <div>Ma-Wo: op afspraak</div>
              <div>Do-Zo: 16:00–14:00 uur</div>
              <div style={{ marginTop: '0.5rem' }}>Maandag – Zaterdag: op afspraak</div>
              <div>Donderdag – Zaterdag: 14:00 – 23:00 uur</div>
              <div style={{ marginTop: '0.5rem' }}>Keuken is geopend tot 20:30 uur</div>
            </div>
          </div>

          {/* Algemene Informatie */}
          <div>
            <h4 style={{ fontFamily: 'Zapfino, cursive', color: '#E6D6BF', fontSize: '1.2rem', margin: '0 0 1.2rem' }}>
              Algemene Informatie
            </h4>
            <div style={{ fontFamily: 'Lora, serif', color: 'rgba(230,214,191,0.8)', fontSize: '0.875rem', lineHeight: 2 }}>
              <div style={{ fontFamily: 'Zapfino, cursive', fontSize: '1.1rem', color: '#E6D6BF', marginBottom: '0.4rem' }}>
                Easterein · Fryslân
              </div>
              <div>Kamer van Koophandel</div>
              <div>nummer: 54069246</div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            textAlign: 'center',
            fontFamily: 'Lora, serif',
            color: 'rgba(230,214,191,0.5)',
            fontSize: '0.78rem',
            borderTop: '1px solid rgba(230,214,191,0.08)',
            padding: '1rem 2rem',
          }}
        >
          © 2024 Bergsma Easterein
        </div>
      </div>
    </footer>
  )
}
