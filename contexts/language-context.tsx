"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
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
  },
  zh: {
    // Nav
    "nav.home": "首页",
    "nav.projects": "项目",
    "nav.notes": "笔记",
    
    // Hero
    "hero.role": "全栈开发者",
    "hero.tagline": "我构建 Web 应用并分享所学。",
    "hero.subtitle": "专注于现代 Web 技术和开源。",
    "hero.status": "状态: 可合作",
    "hero.location": "位置: 远程",
    "hero.mission": "使命: 快速发布，更快学习",
    
    // Timeline
    "timeline.title": "时间线",
    "timeline.comment": "// 旅程",
    "timeline.day1": "开始公开构建",
    "timeline.day7": "发布第一个版本",
    "timeline.day14": "收到第一个用户反馈",
    "timeline.day21": "根据反馈迭代",
    "timeline.day30": "持续成长和改进",
    
    // Tools
    "tools.title": "工具",
    "tools.comment": "// 我构建的东西",
    "tools.try": "试试看",
    "tools.tool1.name": "我的项目",
    "tools.tool1.desc": "一个帮助你更快构建的工具",
    "tools.tool2.name": "另一个项目",
    "tools.tool2.desc": "多功能实用工具，现代技术栈",
    "tools.tool3.name": "实验性工具",
    "tools.tool3.desc": "落地页 A/B 测试框架",
    
    // Contact
    "contact.title": "联系",
    "contact.comment": "// 联系我",
    "contact.cta": "// 保持联系，随时给我发消息。",
    "contact.footer": "以热情构建，以目标发布。",
    
    // Skills
    "skills.title": "关于我",
    "skills.comment": "// about.json",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "zh")) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
