import { PageHero } from "@/components/PageHero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about AI work, automation, embedded systems, and how a project starts.",
}

const faqs = [
  {
    q: "Can you improve an existing AI product?",
    a: "Yes. We can assess existing AI applications and identify opportunities to improve performance, accuracy, reliability, resource utilization, and operational costs. The appropriate approach depends on the model, infrastructure, and application requirements.",
  },
  {
    q: "Do you develop new AI applications?",
    a: "Yes. We can support the development of AI-powered applications, assistants, agentic systems, RAG solutions, and other customized AI products.",
  },
  {
    q: "Can you integrate AI into our existing business systems?",
    a: "Yes. We can integrate AI models and applications with existing software, databases, APIs, and business workflows.",
  },
  {
    q: "Do you provide n8n development services?",
    a: "Yes. We can design and implement automated workflows using n8n, including API integrations, AI-powered processes, data processing, and workflow monitoring.",
  },
  {
    q: "Can you develop software for Raspberry Pi and NVIDIA Jetson?",
    a: "Yes. We provide development and optimization services for supported single-board computers, ARM platforms, embedded Linux systems, and other compact computing devices. Feasibility and performance depend on the target hardware and software environment.",
  },
  {
    q: "Can you work directly at our company?",
    a: "On-site development and technical collaboration can be arranged depending on project requirements, location, scheduling, and availability.",
  },
  {
    q: "Can you improve software developed by another company?",
    a: "Yes. We can review existing applications, identify technical issues, and propose improvements based on the available source code, documentation, and infrastructure access.",
  },
  {
    q: "Do you provide technical consultation?",
    a: "Yes. We can discuss project requirements, architecture, technology selection, optimization strategies, and implementation approaches.",
  },
  {
    q: "How do you estimate project costs?",
    a: "Project costs depend on technical complexity, development scope, required resources, timeline, and support requirements. We review the requirements before proposing a scope and an estimate.",
  },
  {
    q: "Can you support projects after development?",
    a: "Ongoing maintenance, monitoring, technical support, and further optimization can be discussed and arranged according to the project agreement.",
  },
  {
    q: "How do we start a project?",
    a: "Send a description of the project, the current technical challenges, and the result you want. We will review it and discuss possible next steps.",
  },
]

export default function FaqPage() {
  return (
    <article>
      <PageHero kicker="FAQ" title="Frequently asked questions" />
      <div className="mx-auto max-w-3xl space-y-8 px-4 pb-24">
        {faqs.map((item, index) => (
          <section key={item.q}>
            <h2 className="text-2xl font-semibold">
              {index + 1}. {item.q}
            </h2>
            <p className="mt-3 text-foreground/75">{item.a}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
