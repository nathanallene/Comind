import { PageHero } from "@/components/PageHero"
import { site } from "@/lib/site"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Privacy Policy" }

export default function PrivacyPage() {
  return (
    <article>
      <PageHero kicker="Legal" title="Privacy policy">
        <p>This page describes how {site.name} handles information when you use this website.</p>
      </PageHero>
      <div className="mx-auto max-w-3xl space-y-4 px-4 pb-24 text-foreground/80">
        <p>
          The contact form collects your name, email, and message so it can open your mail app with a ready note to {site.email}.
        </p>
        <p>
          The form does not upload your message to this server or to an outside marketing service. Sending happens in your own mail app.
        </p>
        <p>
          Theme appearance is stored in your browser so the site can reopen in the mode you chose. The site does not run advertising or analytics trackers.
        </p>
      </div>
    </article>
  )
}
