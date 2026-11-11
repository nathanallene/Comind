import { PageHero } from "@/components/PageHero"
import { insightGroups, insights } from "@/lib/insights"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Engineering Insights",
  description:
    "Practical notes on AI engineering, automation, retrieval, embedded computing, and software.",
}

export default function InsightsPage() {
  return (
    <article>
      <PageHero kicker="Insights" title="Engineering insights & technical knowledge">
        <p>
          A knowledge center for practical AI engineering, software development, intelligent automation, and embedded computing.
        </p>
        <p>
          These notes are short orientations. They are here to help developers and businesses apply the ideas, and they will grow as the work does.
        </p>
      </PageHero>
      <div className="mx-auto max-w-4xl space-y-12 px-4 pb-24">
        {insightGroups.map((group) => (
          <section key={group}>
            <h2 className="text-2xl font-semibold">{group}</h2>
            <ul className="mt-4 space-y-3">
              {insights
                .filter((item) => item.group === group)
                .map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/insights/${item.slug}`}
                      className="text-lg text-foreground/80 underline-offset-4 hover:text-foreground hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
        <p className="text-foreground/70">
          The aim is useful knowledge based on practical engineering, experimentation, and technical research.
        </p>
      </div>
    </article>
  )
}
