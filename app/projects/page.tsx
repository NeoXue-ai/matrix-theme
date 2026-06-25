import { TerminalNav } from "@/components/terminal-nav"
import { MatrixRain } from "@/components/matrix-rain"

const projects = [
  {
    name: "AI Demand Tool",
    details: [
      { key: "built", value: "scraping + LLM analysis" },
      { key: "result", value: "found real demand signals" },
      { key: "insight", value: "data > intuition" },
    ],
  },
  {
    name: "Info Aggregation System",
    details: [
      { key: "built", value: "multi-platform crawler" },
      { key: "result", value: "poor data quality initially" },
      { key: "insight", value: "filtering is critical" },
    ],
  },
]

const experiments = [
  {
    name: "Reddit scraping test",
    result: "noisy data",
    learn: "need better filtering",
  },
  {
    name: "SEO landing test",
    result: "low conversion",
    learn: "traffic quality matters more",
  },
]

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <MatrixRain />
      <TerminalNav />
      
      <main className="relative z-10 mx-auto max-w-4xl px-6 pb-20">
        {/* Page Header */}
        <section className="py-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-accent text-2xl">{">"}</span>
            <h1 className="text-2xl md:text-3xl text-foreground">Projects</h1>
          </div>
          <p className="text-muted-foreground ml-8">// things I shipped</p>
        </section>

        <pre className="text-border select-none mb-10 max-w-full overflow-x-auto">
{"════════════════════════════════════════════════════════════════"}
        </pre>

        {/* Projects Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary">[</span>
            <h2 className="text-lg text-foreground">Main Projects</h2>
            <span className="text-primary">]</span>
          </div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-border p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-accent">{">"}</span>
                  <h3 className="text-foreground font-medium">{project.name}</h3>
                </div>
                
                <div className="ml-4 space-y-2 text-sm">
                  {project.details.map((detail, idx) => (
                    <div key={idx} className="flex">
                      <span className="text-muted-foreground w-20">- {detail.key}:</span>
                      <span className="text-foreground">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <pre className="text-border select-none mb-10 max-w-full overflow-x-auto">
{"────────────────────────────────────────────────────────────────"}
        </pre>

        {/* Experiments Section */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-accent">[</span>
            <h2 className="text-lg text-foreground">Experiments</h2>
            <span className="text-accent">]</span>
          </div>

          <div className="border border-border bg-card/50 p-4">
            <div className="font-mono text-sm">
              <p className="text-muted-foreground mb-4">$ ls experiments/</p>
              
              <div className="space-y-4">
                {experiments.map((exp, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2">
                      <span className="text-accent">{">"}</span>
                      <span className="text-foreground">{exp.name}</span>
                    </div>
                    <div className="ml-6 text-sm space-y-1">
                      <p>
                        <span className="text-destructive">- result:</span>{" "}
                        <span className="text-muted-foreground">{exp.result}</span>
                      </p>
                      <p>
                        <span className="text-primary">- learn:</span>{" "}
                        <span className="text-muted-foreground">{exp.learn}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <pre className="mt-16 text-center text-border select-none text-xs">
{`
╔══════════════════════════════════════════════╗
║     Ship fast. Learn faster. Iterate.       ║
╚══════════════════════════════════════════════╝
`}
        </pre>
      </main>
    </div>
  )
}
