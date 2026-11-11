"use client"

import { FAQItem } from "@/components/sections/faq/FaqItem"
import type { FAQItemProps } from "@/types"
import type { AnimatedProps } from "@/types/motion"
import { AnimatePresence, motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { useState } from "react"

const categories = [
  "About Our Company",
  "Joining Our Network",
  "AI Learning & Development",
  "Opportunities & Collaboration",
  "Payments & Compensation",
  "Privacy & Security",
  "Policies & Professional Standards",
  "Contact & Support",
] as const

const faqs: FAQItemProps[] = [
  {
    category: "About Our Company",
    question: "What does your company do?",
    answer:
      "We are a Taiwan-based technology company focused on AI education, technical mentorship, software development and technology collaboration.",
  },
  {
    category: "About Our Company",
    question: "Where is your company located?",
    answer:
      "Our company is based in Taiwan, with a vision to build professional connections with individuals and technology professionals in the United States.",
  },
  {
    category: "About Our Company",
    question: "What is your company's mission?",
    answer:
      "Our mission is to connect people with technology experts, help them develop AI skills and create opportunities for international collaboration.",
  },
  {
    category: "About Our Company",
    question: "What makes your company different?",
    answer:
      "We bring together experienced Taiwan-based technology professionals and motivated individuals in the United States to share knowledge, develop skills and explore future opportunities.",
  },
  {
    category: "Joining Our Network",
    question: "Who can join your network?",
    answer: "Anyone interested in artificial intelligence, technology and professional development is welcome to express interest.",
  },
  {
    category: "Joining Our Network",
    question: "Do I need previous AI experience?",
    answer: "No. Beginners are welcome. You only need an interest in learning and developing new skills.",
  },
  {
    category: "Joining Our Network",
    question: "How can I join your network?",
    answer:
      "Simply complete the contact form on our website. It opens your mail app with a ready message so you can send your inquiry directly.",
  },
  {
    category: "Joining Our Network",
    question: "Can I participate remotely?",
    answer: "Yes. Many educational activities and professional discussions can be conducted online.",
  },
  {
    category: "AI Learning & Development",
    question: "What AI skills can I learn?",
    answer:
      "You can explore artificial intelligence, generative AI, machine learning, AI tools, programming and software development.",
  },
  {
    category: "AI Learning & Development",
    question: "Do you provide technical training?",
    answer:
      "We provide educational resources, practical learning exercises and technical guidance to support your development.",
  },
  {
    category: "AI Learning & Development",
    question: "Will I receive guidance from experienced professionals?",
    answer:
      "Yes. Our goal is to connect participants with experienced AI engineers and software developers for knowledge sharing and mentorship.",
  },
  {
    category: "AI Learning & Development",
    question: "Do I need programming experience?",
    answer:
      "Not necessarily. Some learning activities are suitable for beginners, while advanced technical activities may require programming knowledge.",
  },
  {
    category: "Opportunities & Collaboration",
    question: "What opportunities can your network provide?",
    answer:
      "Our network focuses on learning, professional connections and potential future collaboration in AI and technology.",
  },
  {
    category: "Opportunities & Collaboration",
    question: "Can I participate in real AI projects?",
    answer:
      "Qualified individuals may be considered for future projects based on their skills, experience and project requirements.",
  },
  {
    category: "Opportunities & Collaboration",
    question: "Can I collaborate with your Taiwan-based team?",
    answer:
      "Yes. International knowledge sharing and potential collaboration between US professionals and Taiwan-based engineers are important parts of our vision.",
  },
  {
    category: "Opportunities & Collaboration",
    question: "Do you work with third-party AI platforms?",
    answer:
      "Participants may independently explore third-party AI training and evaluation platforms. All activities must follow the respective platforms' rules and requirements.",
  },
  {
    category: "Payments & Compensation",
    question: "Is there a fee to join your network?",
    answer:
      "Any applicable fees for educational or professional services will be explained clearly before participation.",
  },
  {
    category: "Payments & Compensation",
    question: "Do you offer paid projects?",
    answer:
      "Paid projects may become available when suitable opportunities arise. These are subject to separate agreements.",
  },
  {
    category: "Payments & Compensation",
    question: "Do you guarantee income or employment?",
    answer: "No. We do not guarantee earnings, employment, platform acceptance or project assignments.",
  },
  {
    category: "Payments & Compensation",
    question: "How is project compensation determined?",
    answer:
      "Compensation for any commercial project will be discussed and documented separately before the collaboration begins.",
  },
  {
    category: "Privacy & Security",
    question: "How do you protect my personal information?",
    answer: "We are committed to handling personal information responsibly and following applicable privacy requirements.",
  },
  {
    category: "Privacy & Security",
    question: "What information do I need to provide?",
    answer:
      "The contact form asks for your name, email address, and a short message about your interests.",
  },
  {
    category: "Privacy & Security",
    question: "Do you share my information with third parties?",
    answer:
      "We do not sell personal information. Any sharing will be handled according to our privacy policy and applicable legal requirements.",
  },
  {
    category: "Privacy & Security",
    question: "Can I request the deletion of my information?",
    answer:
      "Yes. You may contact our team to request access to or deletion of your personal information, subject to applicable legal requirements.",
  },
  {
    category: "Policies & Professional Standards",
    question: "Are you officially connected to third-party AI platforms?",
    answer:
      "No. Our educational and professional development services operate independently. We do not claim to represent or operate external AI platforms.",
  },
  {
    category: "Policies & Professional Standards",
    question: "Who manages third-party platform accounts?",
    answer:
      "Participants are responsible for their own accounts, personal information and activities on external platforms.",
  },
  {
    category: "Policies & Professional Standards",
    question: "Do participants need to follow platform rules?",
    answer:
      "Yes. All participants must follow the applicable terms, eligibility requirements and policies of each platform.",
  },
  {
    category: "Policies & Professional Standards",
    question: "Are future projects guaranteed?",
    answer:
      "No. Future collaboration depends on project availability, individual qualifications and separately agreed terms.",
  },
  {
    category: "Contact & Support",
    question: "How can I contact your team?",
    answer: "You can reach us through the contact form on our website, which opens your mail app, or by writing to our listed email address.",
  },
  {
    category: "Contact & Support",
    question: "Can I speak with someone before joining?",
    answer:
      "Absolutely. We welcome questions and introductory conversations before you decide whether to participate.",
  },
  {
    category: "Contact & Support",
    question: "How long does it take to receive a response?",
    answer: "Our team aims to respond to inquiries as soon as reasonably possible during business days.",
  },
  {
    category: "Contact & Support",
    question: "Can I schedule an introductory meeting?",
    answer:
      "Yes. You can contact us to discuss arranging an online introductory meeting, subject to availability.",
  },
]

export function FAQ({ id }: AnimatedProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0])

  const filteredFaqs = faqs.filter((faq) => faq.category === selectedCategory)

  return (
    <section id={id} className="relative z-10 overflow-hidden py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-cyan-800/30 mx-auto mb-4"
            initial={false}
            whileInView={{ rotate: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </motion.div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-600 dark:to-cyan-700">
              Questions
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Answers about our company, joining the network, AI learning, collaboration, and support.
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Question categories"
          className="mx-auto mb-12 grid max-w-5xl grid-cols-1 gap-2 rounded-3xl border border-slate-200/80 bg-slate-100/80 p-2 shadow-sm backdrop-blur-sm dark:border-slate-700/70 dark:bg-slate-900/50 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => {
            const selected = selectedCategory === category
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-2xl px-4 py-3 text-center text-sm font-medium leading-snug transition-all duration-200 ${
                  selected
                    ? "bg-white text-cyan-700 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-200 dark:bg-slate-800 dark:text-cyan-300 dark:shadow-cyan-500/10 dark:ring-cyan-700/50"
                    : "text-slate-600 hover:bg-white/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <motion.div layout className="mx-auto max-w-3xl space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq) => (
              <FAQItem key={faq.question} {...faq} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
