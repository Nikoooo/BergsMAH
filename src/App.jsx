import { useState, useRef, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Deal from './components/Deal'
import Agenda from './components/Agenda'
import Feesten from './components/Feesten'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import MenuSection from './components/MenuSection'
import Footer from './components/Footer'
import ReservationDrawer from './components/ReservationDrawer'
import TrouwenPage from './components/TrouwenPage'
import VacaturesPage from './components/VacaturesPage'
import FeestenOverzicht from './components/FeestenOverzicht'
import FeestPage from './components/FeestPage'
import EvenementenOverzicht from './components/EvenementenOverzicht'
import EvenementPage from './components/EvenementPage'
import ZakelijkPage from './components/ZakelijkPage'

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY
  const diff = targetY - startY
  let startTime = null

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    window.scrollTo({ top: startY + diff * easeOutExpo(progress), behavior: 'instant' })
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const dealRef = useRef(null)

  function scrollToDeal() {
    if (!dealRef.current) return
    const targetY = dealRef.current.getBoundingClientRect().top + window.scrollY
    smoothScrollTo(targetY, 900)
  }

  return (
    <>
      <ScrollToTop />
      <Navbar onReserve={() => setDrawerOpen(true)} />

      {/* Global fixed sidebar — één component, zichtbaar op alle pagina's */}
      <div
        style={{
          position: 'fixed',
          right: '1.25rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
          pointerEvents: 'none',
        }}
      >
        <span className="sidebar-text">EASTEREIN · FRYSLÂN</span>
      </div>

      <Routes>
        <Route path="/" element={
          <>
            <main>
              <Hero onReserve={() => setDrawerOpen(true)} onEnter={scrollToDeal} />
              <div ref={dealRef}><Deal onReserve={() => setDrawerOpen(true)} /></div>
              <Agenda />
              <Feesten onReserve={() => setDrawerOpen(true)} />
              <Reviews />
              <FAQ />
              <MenuSection onReserve={() => setDrawerOpen(true)} />
            </main>
            <Footer />
          </>
        } />
        <Route path="/trouwen" element={<TrouwenPage />} />
        <Route path="/vacatures" element={<VacaturesPage />} />
        <Route path="/feesten" element={<FeestenOverzicht />} />
        <Route path="/feesten/:slug" element={<FeestPage />} />
        <Route path="/evenementen" element={<EvenementenOverzicht />} />
        <Route path="/evenementen/:slug" element={<EvenementPage />} />
        <Route path="/zakelijk" element={<ZakelijkPage />} />
      </Routes>

      <ReservationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}

export default App
