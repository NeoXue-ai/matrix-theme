"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

const aboutLines = [
  { key: "name", value: "Your Name" },
  { key: "role", value: "Full-Stack Developer" },
  { key: "focus", value: ["Web Apps", "SaaS", "Open Source"] },
  { key: "mission", value: "Build cool stuff." },
  { key: "principle", value: "Ship fast, learn faster." },
]

export function SkillsSection() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="pt-6 pb-12">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-accent">{">"}</span>
        <h2 className="text-lg text-foreground">{t("skills.title")}</h2>
        <span className="text-muted-foreground text-sm">{t("skills.comment")}</span>
      </div>

      <div className="border border-border bg-card/50 overflow-hidden">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2 bg-muted/30">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive" />
          <div className="h-2.5 w-2.5 rounded-full bg-accent" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="ml-2 text-xs text-muted-foreground">skills.json</span>
        </div>

        <div className="p-4 font-mono text-sm">
          <p className="text-muted-foreground mb-4">
            <span className="text-primary">$</span> cat about.json
          </p>

          <div className="text-foreground space-y-2">
            <p>{"{"}</p>
            {aboutLines.map((line, index) => (
              <div
                key={line.key}
                className={`ml-4 transition-all duration-300 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-accent">{`"${line.key}"`}</span>
                <span className="text-muted-foreground">: </span>
                {Array.isArray(line.value) ? (
                  <span>
                    <span className="text-muted-foreground">[</span>
                    {line.value.map((item, itemIndex) => (
                      <span key={item}>
                        <span className="text-primary">{`"${item}"`}</span>
                        {itemIndex < line.value.length - 1 && <span className="text-muted-foreground">, </span>}
                      </span>
                    ))}
                    <span className="text-muted-foreground">]</span>
                  </span>
                ) : (
                  <span className="text-primary">{`"${line.value}"`}</span>
                )}
                {index < aboutLines.length - 1 && <span className="text-muted-foreground">,</span>}
              </div>
            ))}
            <p>{"}"}</p>
          </div>

          <div className="mt-6 border-l-2 border-primary/60 pl-5 space-y-4 text-base md:text-lg leading-8 text-foreground">
            <p>
              I build things for the web and share what I learn along the way.
            </p>
            <p>
              I enjoy turning ideas into products, shipping quickly, and learning from real users.
            </p>
            <p>
              Currently exploring new technologies and building in public.
              <span className="cursor-blink ml-1 text-primary">█</span>
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
