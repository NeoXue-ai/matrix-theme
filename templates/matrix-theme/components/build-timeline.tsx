"use client"

import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

interface TimelineEvent {
  day: number
  eventKey: string
  status: string
}

export function BuildTimeline({ events }: { events: TimelineEvent[] }) {
  const { t } = useLanguage()
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          events.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index])
            }, index * 150)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [events])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-primary"
      case "error": return "text-destructive"
      case "warning": return "text-accent"
      default: return "text-muted-foreground"
    }
  }

  const getStatusSymbol = (status: string) => {
    switch (status) {
      case "success": return "[OK]"
      case "error": return "[ERR]"
      case "warning": return "[WRN]"
      default: return "[---]"
    }
  }

  const getProgressBar = (day: number) => {
    const progress = Math.min(day / 30, 1)
    const filled = Math.floor(progress * 20)
    const empty = 20 - filled
    return `[${"█".repeat(filled)}${"░".repeat(empty)}]`
  }

  return (
    <section ref={sectionRef} className="py-12">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-accent">{">"}</span>
        <h2 className="text-lg text-foreground">{t("timeline.title")}</h2>
        <span className="text-muted-foreground text-sm">{t("timeline.comment")}</span>
      </div>

      <div className="border border-border bg-card/50 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2 bg-muted/30">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
          <div className="h-2.5 w-2.5 rounded-full bg-accent" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="ml-2 text-xs text-muted-foreground">~/build-log</span>
          <span className="ml-auto text-xs text-muted-foreground">bash</span>
        </div>

        <div className="p-4 space-y-2 font-mono text-sm">
          <p className="text-muted-foreground">
            <span className="text-primary">$</span> tail -f build_progress.log
          </p>
          <p className="text-muted-foreground mb-4 text-xs">--- streaming live updates ---</p>

          {events.map((item, index) => (
            <div
              key={index}
              className={`
                group flex items-start gap-3 py-2 px-2 -mx-2 transition-all duration-300 cursor-default
                ${visibleItems.includes(index)
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-4'
                }
                ${hoveredItem === index ? 'bg-primary/5 border-l-2 border-primary' : 'border-l-2 border-transparent'}
              `}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="text-muted-foreground w-14 shrink-0 tabular-nums">
                Day {String(item.day).padStart(2, '0')}
              </span>
              <span className={`${getStatusColor(item.status)} w-12 shrink-0 font-bold`}>
                {getStatusSymbol(item.status)}
              </span>
              <span className="text-foreground flex-1">{t(item.eventKey)}</span>
              <span className={`text-xs text-muted-foreground hidden sm:block transition-opacity ${hoveredItem === index ? 'opacity-100' : 'opacity-0'}`}>
                {getProgressBar(item.day)}
              </span>
            </div>
          ))}

          <div className="mt-4 pt-2 border-t border-border/50">
            <p className="text-muted-foreground text-xs">
              <span className="text-primary">$</span> echo "Building continues..."
              <span className="cursor-blink ml-1">█</span>
            </p>
          </div>
        </div>
      </div>

      <pre className="mt-12 text-border select-none max-w-full overflow-x-auto">
{"─".repeat(68)}
      </pre>
    </section>
  )
}