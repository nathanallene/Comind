import { PageHero } from "@/components/PageHero"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Cookie Policy" }

export default function CookiesPage() {
  return (
    <article>
      <PageHero kicker="Legal" title="Cookie policy">
        <p>What this site stores in the browser.</p>
      </PageHero>
      <div className="mx-auto max-w-3xl space-y-4 px-4 pb-24 text-foreground/80">
        <p>
          The site does not set advertising or analytics cookies. The light or dark theme preference is kept in local storage in your browser so the choice survives a reload.
        </p>
        <p>You can clear that preference in your browser&apos;s site data settings.</p>
      </div>
    </article>
  )
}
