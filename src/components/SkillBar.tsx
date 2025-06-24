'use client'

import { useState, useEffect } from 'react'

export function SkillBar() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    // Set a random width on client-side mount to avoid hydration mismatch
    setWidth(Math.floor(Math.random() * 30) + 70)
  }, [])

  return (
    <div className="h-1.5 w-full bg-primary/20 rounded-full mt-1">
      <div 
        className="h-1.5 bg-primary rounded-full transition-all duration-500" 
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
