import { PageHero } from "@/components/PageHero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "Engineering capabilities across AI, retrieval, automation, integration, software, reliability, and embedded computing.",
}

const groups = [
  {
    title: "AI & machine learning",
    items: [
      "Large language models.",
      "AI application development.",
      "Agentic AI systems.",
      "AI assistants and copilots.",
      "Model integration and optimization.",
      "Model quantization and compression.",
      "Local and cloud-based inference.",
      "AI evaluation and benchmarking.",
      "Computer vision applications.",
      "Edge AI deployment.",
    ],
  },
  {
    title: "Retrieval & knowledge engineering",
    items: [
      "Retrieval-augmented generation.",
      "Document processing pipelines.",
      "Vector search.",
      "Semantic search.",
      "Hybrid retrieval.",
      "Knowledge base development.",
      "Metadata management.",
      "Information filtering.",
      "Citation and source tracking.",
    ],
  },
  {
    title: "Intelligent automation",
    items: [
      "n8n workflow automation.",
      "AI-powered workflows.",
      "API-based automation.",
      "Multi-step orchestration.",
      "Event-driven processing.",
      "Sub-workflow architecture.",
      "Queue-based execution.",
      "Automated error handling.",
      "Human approval workflows.",
    ],
  },
  {
    title: "Integration & infrastructure",
    items: [
      "REST APIs.",
      "MCP-style integrations.",
      "Database connectivity.",
      "Third-party service integration.",
      "Authentication and access control.",
      "Backend architecture.",
      "Cloud and local deployment.",
      "Data synchronization.",
      "System interoperability.",
    ],
  },
  {
    title: "Software engineering",
    items: [
      "Frontend development.",
      "Backend development.",
      "Web applications.",
      "Internal business platforms.",
      "Application architecture.",
      "Database design.",
      "Performance optimization.",
      "Software testing.",
      "Maintenance and upgrades.",
    ],
  },
  {
    title: "Embedded & edge computing",
    items: [
      "Single-board computers.",
      "ARM-based platforms.",
      "Embedded Linux.",
      "NVIDIA Jetson.",
      "Raspberry Pi.",
      "Local AI deployment.",
      "Hardware-specific optimization.",
      "Resource-constrained applications.",
    ],
  },
]

const reliability = [
  "Application and system monitoring.",
  "Error tracking and diagnostics.",
  "Performance measurement.",
  "AI output evaluation.",
  "Prompt and workflow versioning.",
  "Logging and traceability.",
  "Access control and permission management.",
  "Sensitive data protection.",
  "Audit-ready records where required.",
  "Testing and release validation.",
]

export default function CapabilitiesPage() {
  return (
    <article>
      <PageHero kicker="Capabilities" title="Technical capabilities">
        <p>
          Our engineering capabilities cover the complete lifecycle of modern AI and software products, from initial architecture and development to testing, deployment, monitoring, and continuous improvement.
        </p>
      </PageHero>
      <div className="mx-auto grid max-w-5xl gap-8 px-4 pb-16 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">
            <h2 className="text-2xl font-semibold">{group.title}</h2>
            <ul className="mt-4 space-y-2 text-foreground/80">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <h2 className="text-3xl font-bold">Reliability, security & observability</h2>
        <p className="mt-4 text-foreground/70">
          We consider operational reliability an essential part of software engineering.
        </p>
        <ul className="mt-4 space-y-2 text-foreground/80">
          {reliability.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
