import { InquiryForm } from "@/components/InquiryForm"
import { PageHero } from "@/components/PageHero"
import { contactMailto, site } from "@/lib/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} about joining the network, AI learning, mentorship, or collaboration.`,
}

const help = [
  "AI education and training.",
  "Technical mentorship.",
  "AI platform and opportunity guidance.",
  "AI and software development.",
  "Intelligent automation.",
  "Technology consulting and collaboration.",
]

export default function ContactPage() {
  return (
    <article>
      <PageHero kicker="Contact" title="Contact Us">
        <p>Interested in joining our network, learning AI skills, or exploring collaboration?</p>
        <p>
          We welcome messages from individuals and organizations who want to connect with technology professionals, grow through mentorship, or discuss AI and software work.
        </p>
      </PageHero>
      <div className="mx-auto grid max-w-5xl gap-12 px-4 pb-24 lg:grid-cols-[1fr_1.2fr]">
        <section>
          <h2 className="text-2xl font-semibold">What can we help you with?</h2>
          <ul className="mt-4 space-y-2 text-foreground/80">
            {help.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h2 className="mt-10 text-2xl font-semibold">Introductory conversation</h2>
          <p className="mt-3 text-foreground/75">
            If you would like to ask questions before joining or collaborating, we can arrange an online introductory conversation when availability allows.
          </p>
          <p className="mt-6 text-sm text-foreground/60">
            Prefer email? Write to{" "}
            <a href={contactMailto} className="font-medium text-foreground underline underline-offset-2">
              {site.email}
            </a>
            , or use the form to open your mail app with a ready message.
          </p>
        </section>
        <InquiryForm />
      </div>
    </article>
  )
}
