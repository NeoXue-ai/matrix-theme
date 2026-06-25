"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { GlyphFieldWordmark } from "@/components/glyph-field-wordmark"
import { useLanguage } from "@/contexts/language-context"

// Matrix-style characters
const matrixChars = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const slogan = "BUILD IN PUBLIC"
const skills = ["TypeScript", "React", "Next.js", "Node.js", "Python", "PostgreSQL", "Tailwind", "Docker"]

// Animated slogan with typing effect
function AnimatedSlogan() {
  const [visibleChars, setVisibleChars] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleChars(prev => {
        if (prev >= slogan.length) {
          clearInterval(timer)
          return prev
        }
        return prev + 1
      })
    }, 100)
    return () => clearInterval(timer)
  }, [])
  
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible(prev => !prev)
    }, 530)
    return () => clearInterval(cursorTimer)
  }, [])
  
  return (
    <div className="flex items-center justify-center gap-2 text-lg md:text-xl tracking-[0.3em]">
      <span className="text-muted-foreground">{">>"}</span>
      <span className="text-primary font-medium">
        {slogan.slice(0, visibleChars)}
      </span>
      <span className={`w-3 h-5 bg-primary ${cursorVisible && visibleChars < slogan.length ? 'opacity-100' : 'opacity-0'}`} />
      {visibleChars >= slogan.length && (
        <span className="text-muted-foreground animate-pulse">{"<<"}</span>
      )}
    </div>
  )
}

// Data stream decoration
function DataStream() {
  const [streams, setStreams] = useState<{ id: number; chars: string; left: number; duration: number }[]>([])
  
  useEffect(() => {
    const createStream = () => {
      const chars = Array(Math.floor(Math.random() * 8) + 4)
        .fill(0)
        .map(() => matrixChars[Math.floor(Math.random() * matrixChars.length)])
        .join('')
      
      setStreams(prev => [
        ...prev.slice(-8),
        {
          id: Date.now(),
          chars,
          left: Math.random() * 100,
          duration: Math.random() * 2 + 2
        }
      ])
    }
    
    const timer = setInterval(createStream, 800)
    return () => clearInterval(timer)
  }, [])
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {streams.map(stream => (
        <div
          key={stream.id}
          className="matrix-rain-stream absolute font-mono text-xs leading-none text-primary"
          style={{
            left: `${stream.left}%`,
            animationDuration: `${stream.duration}s`,
          }}
        >
          {stream.chars.split('').map((char, index) => (
            <span
              key={`${stream.id}-${index}`}
              className="block h-3 w-3 text-center"
              style={{
                opacity: index === 0 ? 1 : Math.max(0.18, 1 - index * 0.12),
                color: index === 0 ? 'oklch(0.95 0.1 140)' : undefined,
                textShadow: index === 0 ? '0 0 8px currentColor' : '0 0 4px currentColor',
                transform: Math.random() > 0.65 ? 'scaleX(-1)' : undefined,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export function HeroSection() {
  const { t } = useLanguage()
  const [phase, setPhase] = useState<'boot' | 'visual' | 'slogan' | 'content'>('boot')
  const [bootLines, setBootLines] = useState<string[]>([])
  const [currentSkill, setCurrentSkill] = useState(0)
  const [visualComplete, setVisualComplete] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const bootSequence = [
    "> INITIALIZING SYSTEM...",
    "> LOADING PROFILE DATA...",
    "> ESTABLISHING CONNECTION...",
    "> WELCOME, VISITOR...",
  ]

  // Boot sequence
  useEffect(() => {
    let lineIndex = 0
    const timer = setInterval(() => {
      if (lineIndex < bootSequence.length) {
        setBootLines(prev => [...prev, bootSequence[lineIndex]])
        lineIndex++
      } else {
        clearInterval(timer)
        setTimeout(() => setPhase('visual'), 500)
      }
    }, 400)
    return () => clearInterval(timer)
  }, [])

  // Skill rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSkill(prev => (prev + 1) % skills.length)
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  const handleVisualComplete = useCallback(() => {
    setVisualComplete((completed) => {
      if (completed) return completed

      setTimeout(() => setPhase('slogan'), 300)
      setTimeout(() => setPhase('content'), 2800)
      return true
    })
  }, [])

  return (
    <section ref={containerRef} className="relative min-h-[80vh] flex flex-col justify-center py-16 md:py-24 overflow-hidden">
      <DataStream />
      
      {/* Boot Sequence */}
      <div className={`transition-all duration-500 ${phase === 'boot' ? 'opacity-100' : 'opacity-0 absolute'}`}>
        <div className="font-mono text-sm space-y-2 max-w-xl mx-auto">
          {bootLines.map((line, i) => (
            <p key={i} className="text-primary slide-up">{line}</p>
          ))}
          {bootLines.length > 0 && bootLines.length < bootSequence.length && (
            <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
          )}
        </div>
      </div>

      {/* Hero Visual Phase */}
      <div className={`transition-all duration-500 ${phase !== 'boot' ? 'opacity-100' : 'opacity-0 absolute'}`}>
        <GlyphFieldWordmark onComplete={handleVisualComplete} />
        
        {/* Slogan */}
        <div className={`mt-2 transition-all duration-700 ${phase === 'slogan' || phase === 'content' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <AnimatedSlogan />
        </div>

        {/* Main Content */}
        <div className={`mt-12 transition-all duration-700 delay-300 ${phase === 'content' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Status indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs border border-border/50 p-3 bg-card/30 backdrop-blur-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-muted-foreground">{t("hero.status")}</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">{t("hero.location")}</span>
            </div>
            <span className="text-border hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-muted-foreground">SKILL:</span>
              <span className="text-primary min-w-[100px]">{skills[currentSkill]}</span>
            </div>
          </div>

          {/* Quick terminal */}
          <div className="mt-8 max-w-lg mx-auto">
            <div className="border border-border bg-card/50 p-4">
              <div className="flex items-center gap-2 border-b border-border pb-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-destructive" />
                <div className="h-2 w-2 rounded-full bg-accent" />
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="ml-2 text-xs text-muted-foreground">visitor@matrix:~</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <p>
                  <span className="text-primary">$</span>
                  <span className="text-foreground ml-2">cat mission.txt</span>
                </p>
                <p className="text-muted-foreground pl-4">Build cool stuff.</p>
                <p className="text-muted-foreground pl-4">Ship fast, learn faster.</p>
                <p className="mt-2">
                  <span className="text-primary">$</span>
                  <span className="text-primary ml-2 cursor-blink">_</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative separator */}
      <div className={`mt-16 transition-all duration-700 ${phase === 'content' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-border" />
          <span className="text-xs text-muted-foreground tracking-widest">END TRANSMISSION</span>
          <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-border" />
        </div>
      </div>
    </section>
  )
}
