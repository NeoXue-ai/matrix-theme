import { TerminalNav } from "@/components/terminal-nav"
import { HeroSection } from "@/components/hero-section"
import { BuildTimeline } from "@/components/build-timeline"
import { SkillsSection } from "@/components/skills-section"
import { ToolsSection } from "@/components/tools-section"
import { ContactSection } from "@/components/contact-section"
import { MatrixRain } from "@/components/matrix-rain"

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Matrix Rain Background */}
      <MatrixRain />
      
      {/* Navigation */}
      <TerminalNav />
      
      {/* Main Content */}
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-20">
        <HeroSection />
        <SkillsSection />
        <BuildTimeline />
        <ToolsSection />
        <ContactSection />
      </main>
    </div>
  )
}
