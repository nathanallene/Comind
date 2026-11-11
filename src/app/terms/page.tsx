import { PageHero } from "@/components/PageHero"
import { site } from "@/lib/site"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Terms of Service" }

export default function TermsPage() {
  return (
    <article>
      <PageHero kicker="Legal" title="Terms of service">
        <p>How to read the material on this website.</p>
      </PageHero>
      <div className="mx-auto max-w-3xl space-y-4 px-4 pb-24 text-foreground/80">
        <p>
          Pages on this site describe services {site.name} can discuss. An inquiry is a request for a conversation. It is not a contract, a quote, or a promise to start work.
        </p>
        <p>
          Project examples and performance figures are published only after the work has been completed and verified. Until then, the projects page describes categories and the format a case study will use.
        </p>
        <p>
          Engineering notes are general explanations. They are not a specification for your system and not a guarantee of a result on your hardware.
        </p>
      </div>
    </article>
  )
}
