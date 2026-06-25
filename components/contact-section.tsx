"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

const contacts = [
  { label: "Twitter", value: "@your-twitter", link: "https://x.com/your-twitter" },
  { label: "GitHub", value: "your-github", link: "https://github.com/your-github" },
  { label: "Email", value: "hello@example.com", link: "mailto:hello@example.com" },
]

export function ContactSection() {
  const { t } = useLanguage()
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [typingCommand, setTypingCommand] = useState("")
  const [showOutput, setShowOutput] = useState(false)

  const handleCopy = async (value: string, index: number) => {
    await navigator.clipboard.writeText(value)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const simulateCommand = () => {
    const command = "cat contact.json"
    let i = 0
    setShowOutput(false)
    setTypingCommand("")
    
    const typeInterval = setInterval(() => {
      if (i < command.length) {
        setTypingCommand(command.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
        setTimeout(() => setShowOutput(true), 200)
      }
    }, 50)
  }

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-accent">{">"}</span>
        <h2 className="text-lg text-foreground">{t("contact.title")}</h2>
        <span className="text-muted-foreground text-sm">{t("contact.comment")}</span>
      </div>

      {/* Interactive Terminal */}
      <div className="border border-border bg-card/50 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2 bg-muted/30">
          <div className="h-2.5 w-2.5 rounded-full bg-destructive cursor-pointer hover:brightness-125" />
          <div className="h-2.5 w-2.5 rounded-full bg-accent cursor-pointer hover:brightness-125" />
          <div className="h-2.5 w-2.5 rounded-full bg-primary cursor-pointer hover:brightness-125" />
          <span className="ml-2 text-xs text-muted-foreground">contact.sh</span>
          <button 
            onClick={simulateCommand}
            className="ml-auto text-xs text-muted-foreground hover:text-primary transition-colors border border-border px-2 py-0.5 hover:border-primary"
          >
            [run]
          </button>
        </div>

        {/* Terminal Content */}
        <div className="p-4 space-y-3 font-mono text-sm">
          <p className="text-muted-foreground">
            <span className="text-primary">visitor@dev</span>
            <span className="text-muted-foreground">:</span>
            <span className="text-accent">~</span>
            <span className="text-muted-foreground">$ </span>
            <span className="text-foreground">{typingCommand || "cat contact.json"}</span>
            {!showOutput && typingCommand.length > 0 && typingCommand.length < 16 && (
              <span className="cursor-blink">█</span>
            )}
          </p>
          
          {(showOutput || typingCommand === "") && (
            <div className="text-foreground slide-up">
              <p>{"{"}</p>
              
              {contacts.map((contact, index) => (
                <div key={index} className="ml-4 flex items-center gap-2 group py-1">
                  <span className="text-accent">{`"${contact.label.toLowerCase()}"`}</span>
                  <span className="text-muted-foreground">:</span>
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline hover:glow-text transition-all"
                  >
                    {`"${contact.value}"`}
                  </a>
                  <button
                    onClick={() => handleCopy(contact.value, index)}
                    className={`ml-2 transition-all px-1 ${
                      copiedIndex === index 
                        ? 'text-primary' 
                        : 'text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100'
                    }`}
                    title="Copy"
                  >
                    {copiedIndex === index ? "[copied!]" : "[copy]"}
                  </button>
                  {index < contacts.length - 1 && <span className="text-muted-foreground">,</span>}
                </div>
              ))}
              
              <p>{"}"}</p>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 border-l-2 border-primary pl-4 py-2 hover:bg-primary/5 transition-colors">
        <p className="text-muted-foreground italic">
          {t("contact.cta")}
        </p>
      </div>

      {/* Footer ASCII Art */}
      <div className="mt-16 text-center">
        <pre className="text-border select-none text-xs inline-block max-w-full overflow-x-auto">
{`
╔════════════════════════════════════════════════════╗
║                                                    ║
║   ${t("contact.footer").padStart(36).padEnd(50)}   ║
║                                                    ║
╚════════════════════════════════════════════════════╝
`}
        </pre>
        <p className="mt-4 text-xs text-muted-foreground">
          <span className="text-primary">2024</span> | Made with <span className="text-destructive">code</span> and <span className="text-accent">coffee</span>
        </p>
      </div>
    </section>
  )
}
