import { useState } from 'react'
import FeatherCursor from './components/FeatherCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Deal from './components/Deal'
import EvenementenSection from './components/EvenementenSection'
import FeestenSection from './components/FeestenSection'
import ReservationDrawer from './components/ReservationDrawer'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <div className="relative min-h-screen bg-black">
      <FeatherCursor />
      <Navbar onReserveClick={openDrawer} />
      <Hero />
      <Deal onReserveClick={openDrawer} />
      <EvenementenSection />
      <FeestenSection />
      <ReservationDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  )
}

export default App
