export const site = {
  name: "DevBridge",
  tagline: "Connect with AI Experts. Grow Through Mentorship.",
  description:
    "AI education, technical mentorship, software development, intelligent automation, and technology collaboration across the United States and Taiwan.",
  email: "2.r.3.141592@gmail.com",
}

export const contactMailto = `mailto:${site.email}`

export function buildContactMailto({
  name,
  email,
  description,
}: {
  name: string
  email: string
  description: string
}) {
  const subject = `${site.name} inquiry from ${name.trim()}`
  const body = [
    description.trim(),
    "",
    "—",
    `Name: ${name.trim()}`,
    `Reply-to: ${email.trim()}`,
  ].join("\n")
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export const nav = [
  { href: "/#top", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#insights", label: "Insights" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
]

export const services = [
  { id: "education", label: "AI Education & Training" },
  { id: "mentorship", label: "Technical Mentorship" },
  { id: "platform", label: "AI Platform & Opportunity Guidance" },
  { id: "software", label: "AI & Software Development" },
  { id: "automation", label: "Intelligent Automation" },
  { id: "consulting", label: "Technology Consulting & Collaboration" },
] as const

export type ServiceId = (typeof services)[number]["id"]
