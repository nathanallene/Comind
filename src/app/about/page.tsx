import { PageHero } from "@/components/PageHero"
import { site } from "@/lib/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} builds AI systems, custom software, intelligent automation, and embedded computing.`,
}

const difference = [
  "Client-focused development.",
  "Practical engineering decisions.",
  "Attention to performance and efficiency.",
  "Integration of AI with real-world applications.",
  "Support for compact and resource-constrained hardware.",
  "Flexible technical collaboration.",
  "Continuous improvement and measurable results.",
]

const clients = [
  "Businesses developing digital products.",
  "Startups exploring AI applications.",
  "Software development teams.",
  "Organizations improving internal operations.",
  "Developers building embedded applications.",
  "Companies optimizing existing AI systems.",
  "Teams requiring specialized engineering support.",
]

export default function AboutPage() {
  return (
    <article>
      <PageHero kicker="About" title={`About ${site.name}`}>
        <p>A practical engineering partner for AI and software innovation.</p>
        <p>
          {site.name} is a technology development and engineering company focused on AI systems, custom software, intelligent automation, and embedded computing.
        </p>
        <p>
          We work with businesses, developers, and organizations to solve technical challenges and create practical software solutions.
        </p>
        <p>
          Our work covers new products, optimization of existing applications, AI integration, workflow automation, and performance improvements across computing platforms.
        </p>
        <p>Technology should deliver real value through performance, reliability, efficiency, and usability.</p>
      </PageHero>
      <div className="mx-auto grid max-w-5xl gap-10 px-4 pb-24 md:grid-cols-2">
        <section>
          <h2 className="text-2xl font-semibold">Our mission</h2>
          <p className="mt-3 text-foreground/75">
            To help businesses and developers build better technology through practical engineering, intelligent software, and continuous optimization.
          </p>
          <h2 className="mt-8 text-2xl font-semibold">Our vision</h2>
          <p className="mt-3 text-foreground/75">
            To make advanced AI and software technologies more accessible, efficient, and useful across different industries and computing environments.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold">What makes the approach different</h2>
          <ul className="mt-3 space-y-2 text-foreground/80">
            {difference.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold">Who we work with</h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            {clients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
