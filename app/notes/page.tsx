import { TerminalNav } from "@/components/terminal-nav"
import { MatrixRain } from "@/components/matrix-rain"

const thinking = [
  {
    title: "Most AI products are fake demand",
    content: "Many builders start from tech, not real problems. They build what's cool, not what's needed. The market doesn't care about your stack.",
  },
  {
    title: "distribution > product",
    content: "Without traffic, even good products fail. Building is 20%, distribution is 80%. Find your channel first.",
  },
  {
    title: "Data beats intuition",
    content: "Your gut feeling is biased. Real user behavior tells the truth. Always validate before building.",
  },
]

const resources = {
  aiTools: [
    { name: "ChatGPT", note: "general purpose but easy to misuse" },
    { name: "Claude", note: "better for coding and analysis" },
    { name: "Midjourney", note: "great for visual validation" },
  ],
  saasIdeas: [
    "simple niche tools → often more profitable than complex platforms",
    "automation of boring tasks → high willingness to pay",
    "B2B > B2C for solo builders",
  ],
}

export default function NotesPage() {
  return (
    <div className="relative min-h-screen">
      <MatrixRain />
      <TerminalNav />
      
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-20">
        {/* Page Header */}
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

        {/* Thinking Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary">[</span>
            <h2 className="text-lg text-foreground">Thinking</h2>
            <span className="text-primary">]</span>
          </div>

          <div className="space-y-6">
            {thinking.map((thought, index) => (
              <div
                key={index}
                className="border-l-2 border-primary pl-4 hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-accent">{">"}</span>
                  <h3 className="text-foreground font-medium">{thought.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {thought.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        <pre className="text-border select-none mb-10 max-w-full overflow-x-auto">
{"────────────────────────────────────────────────────────────────"}
        </pre>

        {/* Resources Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-accent">[</span>
            <h2 className="text-lg text-foreground">Resources</h2>
            <span className="text-accent">]</span>
          </div>

          {/* AI Tools */}
          <div className="mb-8">
            <p className="text-muted-foreground text-sm mb-4">
              {"// AI Tools I use"}
            </p>
            <div className="border border-border bg-card/50 p-4">
              <div className="space-y-2 text-sm">
                {resources.aiTools.map((tool, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-primary">-</span>
                    <span className="text-foreground">{tool.name}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-muted-foreground">{tool.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SaaS Ideas */}
          <div>
            <p className="text-muted-foreground text-sm mb-4">
              {"// SaaS Ideas"}
            </p>
            <div className="border border-border bg-card/50 p-4">
              <div className="space-y-2 text-sm">
                {resources.saasIdeas.map((idea, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-accent">{`[${index + 1}]`}</span>
                    <span className="text-foreground">{idea}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <div className="mt-16 text-center">
          <pre className="text-muted-foreground text-xs inline-block">
{`
  ┌─────────────────────────────────────────┐
  │  "The best time to ship was yesterday. │
  │   The second best time is now."        │
  └─────────────────────────────────────────┘
`}
          </pre>
        </div>

        {/* Footer */}
        <pre className="mt-8 text-center text-border select-none text-xs">
{`
╔══════════════════════════════════════════════╗
║        Think clearly. Build quickly.        ║
╚══════════════════════════════════════════════╝
`}
        </pre>
      </main>
    </div>
  )
}
