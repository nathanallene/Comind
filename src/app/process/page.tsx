import { PageHero } from "@/components/PageHero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Delivery Process",
  description: "A structured path from a technical challenge to a working solution.",
}

const stages = [
  {
    n: "01",
    title: "Discovery & requirements analysis",
    intro: "We begin by understanding your project and identifying its most important requirements.",
    activities: [
      "Understanding business objectives.",
      "Reviewing existing software and infrastructure.",
      "Identifying technical challenges.",
      "Evaluating hardware and resource limitations.",
      "Reviewing data requirements and security considerations.",
      "Defining project scope and priorities.",
    ],
    deliverable: "A clear understanding of the problem, requirements, and proposed direction.",
  },
  {
    n: "02",
    title: "Architecture & technical planning",
    intro: "We develop a technical approach based on the project requirements.",
    activities: [
      "System architecture design.",
      "Technology selection.",
      "API and integration planning.",
      "Database and data flow design.",
      "AI model and retrieval strategy.",
      "Performance and reliability considerations.",
      "Development milestones and testing criteria.",
    ],
    deliverable: "A technical implementation plan.",
  },
  {
    n: "03",
    title: "Development & integration",
    intro: "We implement the proposed solution and integrate the required components.",
    activities: [
      "Software and application development.",
      "AI model and API integration.",
      "Agent and workflow implementation.",
      "Database integration.",
      "Frontend and backend development.",
      "Embedded application development.",
      "Testing throughout implementation.",
    ],
    deliverable: "A working development version.",
  },
  {
    n: "04",
    title: "Testing & optimization",
    intro: "We evaluate the solution against its requirements and identify areas for improvement.",
    activities: [
      "Functional testing.",
      "Performance benchmarking.",
      "AI output evaluation.",
      "Integration testing.",
      "Security and reliability checks.",
      "Resource utilization analysis.",
      "Error handling and recovery testing.",
    ],
    deliverable: "A tested and refined solution.",
  },
  {
    n: "05",
    title: "Deployment & release",
    intro: "We prepare the solution for its intended operating environment.",
    activities: [
      "Deployment configuration.",
      "Environment preparation.",
      "Release management.",
      "Version control.",
      "Monitoring and logging setup.",
      "Documentation.",
      "Backup and rollback planning where appropriate.",
    ],
    deliverable: "A deployment-ready or deployed system, according to the project agreement.",
  },
  {
    n: "06",
    title: "Monitoring & continuous improvement",
    intro:
      "Where ongoing support is included, we evaluate system behavior and identify further improvement opportunities.",
    activities: [
      "Performance monitoring.",
      "Error and incident analysis.",
      "AI quality evaluation.",
      "Cost and resource optimization.",
      "Software maintenance.",
      "Feature improvements.",
      "Technical support.",
    ],
    deliverable: "A maintainable system with a defined improvement process.",
  },
]

export default function ProcessPage() {
  return (
    <article>
      <PageHero kicker="Process" title="From technical challenges to working solutions">
        <p>
          We use a structured development process to keep projects aligned with client requirements, technical constraints, and measurable objectives.
        </p>
      </PageHero>
      <ol className="mx-auto max-w-3xl space-y-12 px-4 pb-24">
        {stages.map((stage) => (
          <li key={stage.n}>
            <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400">{stage.n}</p>
            <h2 className="mt-1 text-3xl font-bold">{stage.title}</h2>
            <p className="mt-3 text-foreground/75">{stage.intro}</p>
            <p className="mt-4 font-medium">Activities include:</p>
            <ul className="mt-2 space-y-2 text-foreground/80">
              {stage.activities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-foreground/75">
              <span className="font-medium text-foreground">Deliverable: </span>
              {stage.deliverable}
            </p>
          </li>
        ))}
      </ol>
    </article>
  )
}
