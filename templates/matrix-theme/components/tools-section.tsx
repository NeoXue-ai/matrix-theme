"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

interface Tool {
  nameKey: string
  descKey: string
  status: string
  link: string
  icon: string
  stats: Record<string, string>
}

export function ToolsSection({ tools }: { tools: Tool[] }) {
  const { t } = useLanguage()
  const [hoveredTool, setHoveredTool] = useState<number | null>(null)
  const [visibleTools, setVisibleTools] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          tools.forEach((_, index) => {
            setTimeout(() => {
              setVisibleTools(prev => [...prev, index])
            }, index * 200)
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
  }, [tools])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="text-primary border border-primary/50 px-2 py-0.5 text-xs">[LIVE]</span>
      case "beta":
        return <span className="text-accent border border-accent/50 px-2 py-0.5 text-xs">[BETA]</span>
      case "dev":
        return <span className="text-muted-foreground border border-muted/50 px-2 py-0.5 text-xs">[DEV]</span>
      default:
        return null
    }
  }

  return (
    <section ref={sectionRef} className="py-12">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-accent">{">"}</span>
        <h2 className="text-lg text-foreground">{t("tools.title")}</h2>
        <span className="text-muted-foreground text-sm">{t("tools.comment")}</span>
      </div>

      <div className="space-y-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className={`
              group border border-border p-4 transition-all duration-300
              ${visibleTools.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              ${hoveredTool === index
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'hover:border-muted-foreground'
              }
            `}
            onMouseEnter={() => setHoveredTool(index)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`text-2xl transition-transform duration-300 ${hoveredTool === index ? 'scale-110' : ''}`}>
                  {tool.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-foreground font-medium">{t(tool.nameKey)}</h3>
                    {getStatusBadge(tool.status)}
                  </div>
                </div>
              </div>

              <div className={`hidden sm:flex items-center gap-4 text-xs transition-opacity duration-300 ${hoveredTool === index ? 'opacity-100' : 'opacity-50'}`}>
                {Object.entries(tool.stats).map(([key, value]) => (
                  <div key={key} className="text-right">
                    <p className="text-primary font-mono">{value}</p>
                    <p className="text-muted-foreground">{key}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-muted-foreground text-sm font-mono">
                <span className="text-accent">$</span> {t(tool.descKey)}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href={tool.link}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline group/link"
              >
                <span className="font-mono">{"->"}</span>
                <span>{t("tools.try")}</span>
                <span className="opacity-0 group-hover/link:opacity-100 transition-opacity cursor-blink">_</span>
              </Link>

              {hoveredTool === index && (
                <div className="text-xs text-muted-foreground font-mono slide-in-right">
                  loading: [████████████████████] 100%
                </div>
              )}
            </div>

            <div className={`mt-3 overflow-hidden transition-all duration-300 ${hoveredTool === index ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'}`}>
              <pre className="text-xs text-border select-none max-w-full overflow-x-auto">
                {"╰" + "─".repeat(50) + "╯"}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <pre className="mt-12 text-border select-none max-w-full overflow-x-auto">
{"─".repeat(68)}
      </pre>
    </section>
  )
}