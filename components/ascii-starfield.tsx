"use client"

import { useEffect, useState, useCallback } from "react"

interface Star {
  id: number
  x: number
  y: number
  char: string
  opacity: number
  twinkleSpeed: number
  size: "sm" | "md" | "lg"
}

const starChars = [".", "*", "+", "·", "•", "✦", "✧", "⋆", "∗"]
const smallStarChars = [".", "·", "•"]
const mediumStarChars = ["*", "+", "∗"]
const largeStarChars = ["✦", "✧", "⋆"]

function getStarChar(size: "sm" | "md" | "lg"): string {
  switch (size) {
    case "sm":
      return smallStarChars[Math.floor(Math.random() * smallStarChars.length)]
    case "md":
      return mediumStarChars[Math.floor(Math.random() * mediumStarChars.length)]
    case "lg":
      return largeStarChars[Math.floor(Math.random() * largeStarChars.length)]
  }
}

function getRandomSize(): "sm" | "md" | "lg" {
  const rand = Math.random()
  if (rand < 0.6) return "sm"
  if (rand < 0.9) return "md"
  return "lg"
}

export function AsciiStarfield() {
  const [stars, setStars] = useState<Star[]>([])
  const [tick, setTick] = useState(0)

  const generateStars = useCallback(() => {
    const newStars: Star[] = []
    const count = 60

    for (let i = 0; i < count; i++) {
      const size = getRandomSize()
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        char: getStarChar(size),
        opacity: 0.3 + Math.random() * 0.7,
        twinkleSpeed: 0.5 + Math.random() * 2,
        size,
      })
    }
    setStars(newStars)
  }, [])

  useEffect(() => {
    generateStars()
  }, [generateStars])

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => {
        const twinkle = Math.sin(tick * 0.1 * star.twinkleSpeed + star.id) * 0.3 + 0.7
        const finalOpacity = star.opacity * twinkle

        return (
          <span
            key={star.id}
            className={`absolute font-mono transition-opacity duration-300 ${
              star.size === "lg" 
                ? "text-primary/60" 
                : star.size === "md" 
                  ? "text-primary/40" 
                  : "text-muted-foreground/30"
            }`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: finalOpacity,
              fontSize: star.size === "lg" ? "14px" : star.size === "md" ? "10px" : "8px",
              textShadow: star.size === "lg" 
                ? "0 0 4px currentColor" 
                : star.size === "md" 
                  ? "0 0 2px currentColor" 
                  : "none",
            }}
          >
            {star.char}
          </span>
        )
      })}

      {/* Occasional shooting star */}
      <ShootingStar tick={tick} />
    </div>
  )
}

function ShootingStar({ tick }: { tick: number }) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (tick % 80 === 0 && Math.random() > 0.5) {
      setPosition({
        x: 10 + Math.random() * 60,
        y: 5 + Math.random() * 30,
      })
      setVisible(true)
      setTimeout(() => setVisible(false), 1000)
    }
  }, [tick])

  if (!visible) return null

  return (
    <div
      className="absolute text-primary animate-pulse"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "rotate(-45deg)",
        animation: "shooting-star 1s ease-out forwards",
      }}
    >
      <span className="text-xs opacity-80">{"~>>"}</span>
    </div>
  )
}
