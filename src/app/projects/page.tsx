import { PageHero } from "@/components/PageHero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected project categories and the format used for published engineering work.",
}

const categories = [
  {
    title: "AI model optimization",
    text: "Techniques to improve model performance, reduce memory requirements, and optimize inference efficiency.",
  },
  {
    title: "Local AI & edge deployment",
    text: "AI applications on local hardware and compact computing platforms.",
  },
  {
    title: "Intelligent automation",
    text: "AI-powered workflows that connect applications, APIs, and business processes.",
  },
  {
    title: "RAG & knowledge systems",
    text: "Retrieval pipelines and AI applications that use structured and unstructured information sources.",
  },
  {
    title: "Embedded software engineering",
    text: "Applications for single-board computers and embedded Linux systems.",
  },
  {
    title: "Application performance engineering",
    text: "Bottlenecks, responsiveness, stability, and resource efficiency.",
  },
]

const format = [
  "Project overview.",
  "Technical challenge.",
  "Objectives.",
  "Hardware and software environment.",
  "Engineering approach.",
  "Implementation details.",
  "Testing methodology.",
  "Benchmark results.",
  "Final observations.",
]

export default function ProjectsPage() {
  return (
    <article>
      <PageHero kicker="Projects" title="Our projects & engineering experiments">
        <p>
          The best way to demonstrate engineering capabilities is through practical implementations and measurable technical results.
        </p>
        <p>This section is for selected projects, prototypes, experiments, and optimization studies.</p>
      </PageHero>
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">Featured project categories</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {categories.map((item) => (
            <section key={item.title} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-foreground/70">{item.text}</p>
            </section>
          ))}
        </div>
      </div>
      <section className="mx-auto max-w-3xl px-4 pb-24">
        <h2 className="text-2xl font-semibold">Project case study format</h2>
        <p className="mt-3 text-foreground/70">Each published project will include:</p>
        <ul className="mt-4 space-y-2">
          {format.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-6 text-foreground/75">
          We aim to present genuine technical work with transparent measurements and clear explanations.
        </p>
        <p className="mt-4 rounded-2xl border border-foreground/10 bg-slate-50 p-4 text-sm text-foreground/80 dark:bg-slate-900">
          Project examples and performance claims are published only after the corresponding work has been completed and verified. None are listed here yet.
        </p>
      </section>
    </article>
  )
}
