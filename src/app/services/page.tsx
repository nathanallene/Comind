import { PageHero } from "@/components/PageHero"
import { serviceDetails } from "@/lib/services"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI education, technical mentorship, platform guidance, software development, intelligent automation, and technology consulting.",
}

export default function ServicesPage() {
  return (
    <article>
      <PageHero kicker="Services" title="Our engineering services">
        <p>
          We provide AI education, technical mentorship, platform guidance, software development, intelligent automation, and technology consulting.
        </p>
        <p>Our work connects people, knowledge, and technology across the United States and Taiwan.</p>
      </PageHero>
      <div className="mx-auto max-w-4xl space-y-16 px-4 pb-24">
        {serviceDetails.map((service) => (
          <section key={service.id} id={service.id} className="scroll-mt-28">
            <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400">{service.number}</p>
            <h2 className="mt-2 text-3xl font-bold">{service.title}</h2>
            {service.headline ? <p className="mt-3 text-xl text-foreground/80">{service.headline}</p> : null}
            <p className="mt-4 text-foreground/70">{service.summary}</p>
            <h3 className="mt-6 font-semibold">{service.capabilitiesLabel}</h3>
            <ul className="mt-3 space-y-2 text-foreground/80">
              {service.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {service.close ? <p className="mt-4 text-foreground/70">{service.close}</p> : null}
          </section>
        ))}
      </div>
    </article>
  )
}
