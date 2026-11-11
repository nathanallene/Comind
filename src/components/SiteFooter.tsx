import { site } from "@/lib/site"
import Link from "next/link"

const explore = [
  { href: "/#top", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#insights", label: "Engineering Insights" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
]

const serviceLinks = [
  { href: "/#education", label: "AI Education & Training" },
  { href: "/#mentorship", label: "Technical Mentorship" },
  { href: "/#platform", label: "AI Platform & Opportunity Guidance" },
  { href: "/#software", label: "AI & Software Development" },
  { href: "/#automation", label: "Intelligent Automation" },
  { href: "/#consulting", label: "Technology Consulting & Collaboration" },
]

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-foreground/70">{site.tagline}</p>
          <p className="mt-4 text-sm text-foreground/60">
            AI Education · Technical Mentorship · Software Development · Intelligent Automation
          </p>
          <p className="mt-4 text-sm text-foreground/60">
            We connect global talent and develop practical AI and software solutions.
          </p>
        </div>
        <FooterColumn title="Navigation" links={explore} />
        <FooterColumn title="Services" links={serviceLinks} />
        <FooterColumn title="Legal" links={legal} />
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-sm text-foreground/50">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold">{title}</h2>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-foreground/70 hover:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
