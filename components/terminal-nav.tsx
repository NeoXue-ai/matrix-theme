"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function TerminalNav() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/projects", label: t("nav.projects") },
    { href: "/notes", label: t("nav.notes") },
  ]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "zh" : "en")
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* ASCII Logo */}
          <Link href="/" className="group flex items-center gap-1 sm:gap-2">
            <div className="flex items-center text-primary transition-all group-hover:text-accent">
              <span className="text-base sm:text-lg font-bold tracking-tight">{"<"}</span>
              <span className="text-base sm:text-lg font-bold">YOU</span>
              <span className="text-accent group-hover:text-primary transition-all">/</span>
              <span className="text-base sm:text-lg font-bold tracking-tight">{">"}</span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground border border-border px-1 sm:px-1.5 py-0.5 group-hover:border-primary group-hover:text-primary transition-all">
              DEV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <span className="text-muted-foreground">{"["}</span>
              {navItems.map((item, index) => (
                <span key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    className={`
                      px-2 py-1 transition-all text-glitch
                      ${pathname === item.href
                        ? "text-primary dark:glow-text"
                        : "text-muted-foreground hover:text-foreground"
                      }
                    `}
                  >
                    {pathname === item.href && "> "}
                    {item.label}
                  </Link>
                  {index < navItems.length - 1 && (
                    <span className="text-muted-foreground">/</span>
                  )}
                </span>
              ))}
              <span className="text-muted-foreground">{"]"}</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 border-l border-border pl-4">
              <button
                onClick={toggleLanguage}
                className="px-2 py-1 text-xs border border-border hover:border-primary hover:text-primary transition-all cyber-glitch"
                title="Toggle Language"
              >
                {language === "en" ? "中文" : "EN"}
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-2 py-1 text-xs border border-border hover:border-primary hover:text-primary transition-all"
              title="Toggle Language"
            >
              {language === "en" ? "中文" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              title="Toggle Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border mt-3 pt-3 pb-1">
            <div className="flex flex-col gap-1 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    px-3 py-2 rounded transition-all
                    ${pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                    }
                  `}
                >
                  {pathname === item.href && "> "}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
