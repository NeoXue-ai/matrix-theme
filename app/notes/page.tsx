import { TerminalNav } from "@/components/terminal-nav"
import { MatrixRain } from "@/components/matrix-rain"
import { defaultConfig } from "@/template.config"

export default function NotesPage() {
  return (
    <div className="relative min-h-screen">
      <MatrixRain />
      <TerminalNav items={defaultConfig.navItems.map(item => ({
        href: item.href,
        label: defaultConfig.translations.en[item.labelKey] || item.labelKey,
      }))} />

      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-20">
        <section className="py-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-accent text-2xl">{">"}</span>
            <h1 className="text-2xl md:text-3xl text-foreground">Notes</h1>
          </div>
          <p className="text-muted-foreground ml-8">// thoughts & resources</p>
        </section>

        <pre className="text-border select-none mb-10 max-w-full overflow-x-auto">
{"════════════════════════════════════════════════════════════════"}
        </pre>

        <div className="text-center py-20 text-muted-foreground">
          <p>No notes yet. Customize template.config.ts to add your notes.</p>
        </div>
      </main>
    </div>
  )
}
