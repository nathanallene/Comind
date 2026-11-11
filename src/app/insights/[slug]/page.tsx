import { PageHero } from "@/components/PageHero"
import { getInsight, insights } from "@/lib/insights"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const insight = getInsight(slug)
    return { title: insight?.title ?? "Insight" }
  })
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const insight = getInsight(slug)
  if (!insight) notFound()

  return (
    <article>
      <PageHero kicker={insight.group} title={insight.title}>
        <p>{insight.summary}</p>
      </PageHero>
      <div className="mx-auto max-w-3xl px-4 pb-24">
        <p className="text-foreground/70">
          This note is a starting point. A published study with measurements will appear on the projects page only after the work has been completed and checked.
        </p>
        <p className="mt-8">
          <Link href="/insights" className="font-medium text-cyan-700 dark:text-cyan-400">
            All insights
          </Link>
        </p>
      </div>
    </article>
  )
}
