"use client"

import { createContext, useContext, type ReactNode } from "react"

interface LanguageContextType {
  t: (key: string) => string
}

const translations: Record<string, string> = {
  // Nav
  "nav.home": "Home",
  "nav.projects": "Projects",
  "nav.notes": "Notes",
  
  // Hero
  "hero.role": "Full-Stack Developer",
  "hero.tagline": "I build things for the web and share what I learn.",
  "hero.subtitle": "Focused on modern web technologies and open source.",
  "hero.status": "STATUS: Available",
  "hero.location": "LOCATION: Remote",
  "hero.mission": "MISSION: Ship fast, learn faster",
  
  // Timeline
  "timeline.title": "Timeline",
  "timeline.comment": "// journey",
  "timeline.day1": "started building in public",
  "timeline.day7": "shipped first version",
  "timeline.day14": "got first user feedback",
  "timeline.day21": "iterated based on feedback",
  "timeline.day30": "growing and improving",
  
  // Tools
  "tools.title": "Tools",
  "tools.comment": "// things I built",
  "tools.try": "Try it",
  "tools.tool1.name": "My Project",
  "tools.tool1.desc": "A tool that helps you build faster",
  "tools.tool2.name": "Another Project",
  "tools.tool2.desc": "Multi-purpose utility with modern stack",
  "tools.tool3.name": "Experimental Tool",
  "tools.tool3.desc": "A/B testing framework for landing pages",
  
  // Contact
  "contact.title": "Contact",
  "contact.comment": "// reach out",
  "contact.cta": "// Let's connect. Drop me a message anytime.",
  "contact.footer": "Built with passion. Shipped with purpose.",
  
  // Skills
  "skills.title": "About",
  "skills.comment": "// about.json",
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const t = (key: string): string => {
    return translations[key] || key
  }

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
