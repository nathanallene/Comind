import { PageHero } from "@/components/PageHero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Approach",
  description: "Engineering principles for practical, measurable, and dependable technology work.",
}

const principles = [
  {
    title: "Client requirements come first",
    body: "Every project begins with understanding the client's actual objectives. We consider business needs, technical requirements, existing infrastructure, available resources, and future plans before recommending a solution.",
  },
  {
    title: "Practical solutions over unnecessary complexity",
    body: "We select technologies based on their suitability for the project. Not every problem requires AI, and not every application needs a complicated architecture. We prioritize solutions that are effective, maintainable, and appropriate for the intended environment.",
  },
  {
    title: "Performance and efficiency matter",
    body: "We look for opportunities to improve computational efficiency, reduce unnecessary resource consumption, and optimize system performance. The focus includes processing speed, memory usage, inference latency, and operational costs.",
  },
  {
    title: "Reliability and safety by design",
    body: "We consider potential failure conditions, security risks, data handling, and system behavior during development. For AI applications, we use appropriate testing, evaluation, access restrictions, and human oversight to improve reliability and reduce unintended behavior.",
  },
  {
    title: "Measurable engineering results",
    body: "Technical improvements should be evaluated using meaningful measurements. Depending on the project, these may include processing speed, response latency, memory consumption, CPU and GPU utilization, model accuracy, error rates, system availability, and operational costs.",
  },
  {
    title: "Continuous improvement",
    body: "Software and AI systems should evolve as requirements and technologies change. We support iterative development, performance evaluation, and ongoing improvement based on actual project needs.",
  },
  {
    title: "Collaboration and transparency",
    body: "We value clear communication, technical documentation, and constructive collaboration. We aim to make engineering decisions understandable and keep clients informed throughout the development process.",
  },
]

export default function ApproachPage() {
  return (
    <article>
      <PageHero kicker="Principles" title="Engineering with purpose">
        <p>
          Successful technology development requires more than writing code or integrating new tools.
        </p>
        <p>
          It requires understanding the problem, choosing appropriate technologies, measuring results, and building systems that remain dependable over time.
        </p>
      </PageHero>
      <ol className="mx-auto max-w-3xl space-y-8 px-4 pb-24">
        {principles.map((item, index) => (
          <li key={item.title}>
            <h2 className="text-2xl font-semibold">
              {index + 1}. {item.title}
            </h2>
            <p className="mt-3 text-foreground/75">{item.body}</p>
          </li>
        ))}
      </ol>
    </article>
  )
}
