import { TerminalNav } from "@/components/terminal-nav"
import { HeroSection } from "@/components/hero-section"
import { BuildTimeline } from "@/components/build-timeline"
import { SkillsSection } from "@/components/skills-section"
import { ToolsSection } from "@/components/tools-section"
import { ContactSection } from "@/components/contact-section"
import { MatrixRain } from "@/components/matrix-rain"
import { defaultConfig } from "@/template.config"

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <MatrixRain />
      <TerminalNav items={defaultConfig.navItems.map(item => ({
        href: item.href,
        label: defaultConfig.translations.en[item.labelKey] || item.labelKey,
      }))} />

      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-20">
        <HeroSection config={{
          siteName: defaultConfig.siteName,
          slogan: defaultConfig.hero.slogan,
          status: defaultConfig.hero.status,
          location: defaultConfig.hero.location,
          skills: defaultConfig.hero.skills,
          bootSequence: defaultConfig.hero.bootSequence,
        }} />
        <SkillsSection about={defaultConfig.about} />
        <BuildTimeline events={defaultConfig.timeline} />
        <ToolsSection tools={defaultConfig.tools} />
        <ContactSection contacts={defaultConfig.contacts} footer={defaultConfig.footer} />
      </main>
    </div>
  )
}
