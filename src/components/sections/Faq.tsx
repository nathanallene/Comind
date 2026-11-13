"use client"

import { FAQItem } from "@/components/sections/faq/FaqItem"
import { SectionTitle } from "@/components/sections/SectionTitle"
import { contactMailto } from "@/lib/site"
import { cn } from "@/lib/utils"
import type { FAQItemProps } from "@/types"
import type { AnimatedProps } from "@/types/motion"
import { AnimatePresence, motion } from "framer-motion"
import {
  Briefcase,
  Building2,
  CircleHelp,
  GraduationCap,
  Mail,
  MessageCircle,
  Users,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useMemo, useState } from "react"

const categories = [
  { id: "about", label: "About BeAILead", icon: Building2 },
  { id: "joining", label: "Joining the Network", icon: Users },
  { id: "learning", label: "Learning & Mentorship", icon: GraduationCap },
  { id: "services", label: "Services & Collaboration", icon: Briefcase },
  { id: "contact", label: "Contact & Support", icon: Mail },
] as const

type CategoryLabel = (typeof categories)[number]["label"]

const faqs: FAQItemProps[] = [
  {
    category: "About BeAILead",
    question: "What does BeAILead do?",
    answer:
      "BeAILead connects individuals with AI experts and software engineers. Through technical mentorship, hands-on learning, and collaboration, we help people build practical skills and explore opportunities in AI and technology.",
  },
  {
    category: "About BeAILead",
    question: "What is your mission?",
    answer:
      "Our mission is to bring people, knowledge, and technology together—so participants can deepen their understanding of AI, grow professionally, and form meaningful connections with experienced practitioners.",
  },
  {
    category: "About BeAILead",
    question: "What makes BeAILead different?",
    answer:
      "We focus on people first: mentorship and practical learning alongside real technology work. Participants can learn from experienced engineers, build skills over time, and explore collaboration when the fit is right.",
  },
  {
    category: "Joining the Network",
    question: "Who can join?",
    answer:
      "Anyone interested in artificial intelligence, software development, or professional growth is welcome to reach out—whether you are just getting started or already working in tech.",
  },
  {
    category: "Joining the Network",
    question: "Do I need prior AI experience?",
    answer:
      "No. Beginners are welcome. Curiosity and a willingness to learn matter more than a specific background.",
  },
  {
    category: "Joining the Network",
    question: "How do I get started?",
    answer:
      "Use the contact form on this site or email us with a short note about your interests. We will follow up to discuss next steps.",
  },
  {
    category: "Joining the Network",
    question: "Can I participate remotely?",
    answer: "Yes. Mentorship, learning activities, and many conversations can take place online.",
  },
  {
    category: "Learning & Mentorship",
    question: "What can I learn?",
    answer:
      "Topics can include AI fundamentals, generative AI, machine learning, practical AI tools, programming, and software development—matched to your level and goals.",
  },
  {
    category: "Learning & Mentorship",
    question: "How does mentorship work?",
    answer:
      "We connect participants with experienced AI engineers and software developers for guidance, feedback, and hands-on learning support.",
  },
  {
    category: "Learning & Mentorship",
    question: "Do I need programming experience?",
    answer:
      "Not always. Some paths are suitable for beginners. More advanced technical work may benefit from programming experience, which we can help you build over time.",
  },
  {
    category: "Services & Collaboration",
    question: "What services do you offer?",
    answer:
      "We offer AI education and training, technical mentorship, opportunity guidance, AI and software development, intelligent automation, and technology consulting and collaboration.",
  },
  {
    category: "Services & Collaboration",
    question: "Can I work on real projects?",
    answer:
      "When skills, interests, and project needs align, participants may be considered for collaboration. Any project work is scoped and agreed separately—nothing is guaranteed upfront.",
  },
  {
    category: "Services & Collaboration",
    question: "Do you work with organizations as well as individuals?",
    answer:
      "Yes. Individuals join for learning and mentorship; organizations can discuss development, automation, consulting, and collaboration needs with our team.",
  },
  {
    category: "Contact & Support",
    question: "How can I contact you?",
    answer:
      "Use the contact form on this website or write to our listed email address. The form prepares a message in your mail app so you can send it directly.",
  },
  {
    category: "Contact & Support",
    question: "Can I ask questions before joining?",
    answer:
      "Absolutely. We welcome introductory conversations so you can learn more before deciding whether to participate.",
  },
  {
    category: "Contact & Support",
    question: "How quickly will I hear back?",
    answer: "We aim to respond to inquiries as soon as reasonably possible on business days.",
  },
  {
    category: "Contact & Support",
    question: "Can I schedule an introductory meeting?",
    answer:
      "Yes. Mention that in your message and we can arrange an online introduction when schedules allow.",
  },
]

export function FAQ({ id }: AnimatedProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryLabel>(categories[0].label)
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0]?.question ?? null)

  const filteredFaqs = useMemo(
    () => faqs.filter((faq) => faq.category === selectedCategory),
    [selectedCategory],
  )

  const activeCategory = categories.find((category) => category.label === selectedCategory) ?? categories[0]
  const ActiveIcon = activeCategory.icon as LucideIcon

  function selectCategory(label: CategoryLabel) {
    setSelectedCategory(label)
    const first = faqs.find((faq) => faq.category === label)
    setOpenQuestion(first?.question ?? null)
  }

  return (
    <section id={id} className="relative z-10 scroll-mt-28 overflow-hidden py-20">
      <div className="container relative z-10 mx-auto px-4">
        <SectionTitle icon={CircleHelp} title="Frequently Asked" accent="Questions">
          <p>Answers about mentorship, learning, collaboration, and how to get in touch.</p>
        </SectionTitle>

        <div className="relative mx-auto max-w-5xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 blur-2xl dark:from-cyan-400/10 dark:to-emerald-400/10"
          />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:gap-10">
            <nav aria-label="FAQ categories" className="flex flex-col gap-1">
              <div className="mb-2 flex gap-2 overflow-x-auto pb-1 lg:hidden">
                {categories.map((category) => {
                  const selected = selectedCategory === category.label
                  const Icon = category.icon
                  return (
                    <button
                      key={`chip-${category.id}`}
                      type="button"
                      onClick={() => selectCategory(category.label)}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        selected
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                      {category.label}
                    </button>
                  )
                })}
              </div>

              <ul className="hidden space-y-1 lg:block">
                {categories.map((category, index) => {
                  const selected = selectedCategory === category.label
                  const Icon = category.icon
                  const count = faqs.filter((faq) => faq.category === category.label).length
                  return (
                    <li key={category.id}>
                      <button
                        type="button"
                        aria-current={selected ? "true" : undefined}
                        onClick={() => selectCategory(category.label)}
                        className={cn(
                          "group relative flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-colors duration-200",
                          selected
                            ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900 dark:text-white dark:ring-slate-700"
                            : "text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/60 dark:hover:text-white",
                        )}
                      >
                        {selected ? (
                          <motion.span
                            layoutId="faq-active-bar"
                            className="absolute inset-y-2 left-0 w-1 rounded-full bg-cyan-500"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        ) : null}
                        <span
                          className={cn(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                            selected
                              ? "bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300"
                              : "bg-slate-100 text-slate-500 group-hover:bg-cyan-500/10 group-hover:text-cyan-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:text-cyan-300",
                          )}
                        >
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                            {String(index + 1).padStart(2, "0")} · {count} Qs
                          </span>
                          <span className="mt-0.5 block text-base font-semibold leading-snug">{category.label}</span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-6 hidden rounded-2xl border border-slate-200/80 bg-white/70 p-5 dark:border-slate-700/80 dark:bg-slate-950/50 lg:block">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Still have a question?</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Send a short note and we will follow up when we can.
                </p>
                <a
                  href={contactMailto}
                  className="mt-4 inline-flex text-sm font-semibold text-cyan-700 underline-offset-4 hover:underline dark:text-cyan-300"
                >
                  Contact us
                </a>
              </div>
            </nav>

            <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 dark:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.65)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/25 to-transparent blur-2xl dark:from-cyan-300/20"
              />

              <div className="relative border-b border-slate-200/80 px-5 py-5 dark:border-slate-700/80 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                    <ActiveIcon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                      Category
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{selectedCategory}</h3>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative"
                >
                  {filteredFaqs.map((faq) => (
                    <FAQItem
                      key={faq.question}
                      question={faq.question}
                      answer={faq.answer}
                      open={openQuestion === faq.question}
                      onToggle={() =>
                        setOpenQuestion((current) => (current === faq.question ? null : faq.question))
                      }
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
