import { useEffect, useRef, useState } from 'react'

const FeatherCursor = () => {
  const cursorRef = useRef<HTMLImageElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const targetPosition = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY }
    }

    const updateCursor = () => {
      setPosition(prev => ({
        x: prev.x + (targetPosition.current.x - prev.x) * 0.15,
        y: prev.y + (targetPosition.current.y - prev.y) * 0.15
      }))
      animationFrameRef.current = requestAnimationFrame(updateCursor)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrameRef.current = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <img
      ref={cursorRef}
      src="/images/cursor_feather.png"
      alt=""
      className="fixed pointer-events-none z-[9999] w-12 h-12"
      style={{
        left: position.x - 24,
        top: position.y - 24,
        transform: 'rotate(-45deg)',
      }}
    />
  )
}

export default FeatherCursor
