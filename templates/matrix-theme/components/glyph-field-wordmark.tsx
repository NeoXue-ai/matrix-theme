"use client"

import { useEffect, useRef } from "react"

const COMPLETE_DELAY = 900

export function GlyphFieldWordmark({
  siteName,
  onComplete
}: {
  siteName: string
  onComplete: () => void
}) {
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const completeTimer = window.setTimeout(() => {
      onCompleteRef.current()
    }, COMPLETE_DELAY)

    return () => window.clearTimeout(completeTimer)
  }, [])

  return (
    <div className="relative mx-auto flex min-h-[10rem] w-full max-w-5xl items-center justify-center overflow-hidden pt-12 pb-4 sm:min-h-[13rem] sm:pt-16 md:min-h-[15rem] md:pt-20">
      <div className="relative z-10 text-center">
        <p className="sr-only">{siteName}</p>
        <div
          aria-hidden="true"
          className="select-none font-mono text-5xl font-semibold tracking-[0.22em] text-foreground drop-shadow-[0_0_22px_rgba(34,197,94,0.28)] sm:text-7xl md:text-8xl"
        >
          {siteName}
        </div>
      </div>
    </div>
  )
}