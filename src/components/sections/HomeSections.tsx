"use client"

import { InquiryForm } from "@/components/InquiryForm"
import { CoreServices } from "@/components/sections/CoreServices"
import { EngineeringServices } from "@/components/sections/EngineeringServices"
import { SectionTitle } from "@/components/sections/SectionTitle"
import { Button } from "@/components/ui/button"
import { insightGroups, insights } from "@/lib/insights"
import { contactMailto, site } from "@/lib/site"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Boxes,
  Briefcase,
  Check,
  Layers,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const whatWeDo = [
  {
    title: "Develop AI Talent",
    text: "We help individuals build practical knowledge and technical skills in artificial intelligence, machine learning, software development and emerging technologies through educational resources, technical mentorship and hands-on learning.",
  },
  {
    title: "Connect Global Technology Professionals",
    text: "We create connections between US-based individuals and experienced technology teams in Taiwan, encouraging knowledge sharing, professional networking and independent exploration of AI-related opportunities.",
  },
  {
    title: "Build Innovative Technology Solutions",
    text: "We apply our technical expertise to develop AI-powered applications, intelligent automation systems, software solutions and technology services that help businesses improve efficiency and embrace digital innovation.",
  },
  {
    title: "Connecting People, Technology and Opportunities",
    text: "We connect motivated individuals in the United States with experienced AI engineers and software professionals in Taiwan to share knowledge, develop practical skills and build long-term professional relationships.",
  },
]

const helpWith = [
  "AI education and training.",
  "Technical mentorship.",
  "AI platform and opportunity guidance.",
  "AI and software development.",
  "Intelligent automation.",
  "Technology consulting and collaboration.",
]

function WhatWeDoStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const loopRef = useRef(0)
  const pausedRef = useRef(false)
  const dragRef = useRef<{ pointerId: number; startX: number; origin: number } | null>(null)
  const copies = 3
  const sequence = Array.from({ length: copies }, () => whatWeDo).flat()

  function measureLoop() {
    const track = trackRef.current
    if (!track || track.children.length < whatWeDo.length * 2) return 0
    const first = track.children[0] as HTMLElement
    const second = track.children[whatWeDo.length] as HTMLElement
    return second.offsetLeft - first.offsetLeft
  }

  function wrapOffset(value: number, loop: number) {
    if (loop <= 0) return 0
    let next = value
    while (next <= -loop) next += loop
    while (next > 0) next -= loop
    return next
  }

  function place(offset: number) {
    const loop = loopRef.current || measureLoop()
    loopRef.current = loop
    const next = wrapOffset(offset, loop)
    offsetRef.current = next
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`
  }

  useEffect(() => {
    let frame = 0
    let last = performance.now()
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const refreshLoop = () => {
      const loop = measureLoop()
      if (loop > 0) {
        loopRef.current = loop
        place(offsetRef.current)
      }
    }
    refreshLoop()

    const step = (now: number) => {
      const loop = loopRef.current || measureLoop()
      loopRef.current = loop
      if (!reduce && !pausedRef.current && loop > 0) {
        place(offsetRef.current - (loop / 36000) * (now - last))
      }
      last = now
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)

    const onResize = () => refreshLoop()
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    pausedRef.current = true
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, origin: offsetRef.current }
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Capture can fail for an already-released pointer; the move events still update the strip.
    }
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    place(drag.origin + (event.clientX - drag.startX))
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return
    dragRef.current = null
    pausedRef.current = false
  }

  return (
    <div
      className="relative w-full cursor-grab touch-none overflow-hidden active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={trackRef} className="flex w-max select-none will-change-transform">
        {sequence.map((item, index) => (
          <div key={`${item.title}-${index}`} className="mx-8 w-[260px] shrink-0">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="mt-2 whitespace-normal text-sm leading-relaxed text-slate-600 opacity-90 dark:text-slate-300">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

function EngineeringInsights() {
  const [group, setGroup] = useState(insightGroups[0])
  const articles = insights.filter((item) => item.group === group)

  return (
    <section id="insights" className="relative z-10 scroll-mt-28 py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-cyan-800/30"
            initial={false}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BookOpen className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
          </motion.div>
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100"
          >
            Engineering Insights &{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent dark:from-cyan-600 dark:to-cyan-700">
              Technical Knowledge
            </span>
          </motion.h2>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 text-xl text-slate-600 dark:text-slate-400"
          >
            Practical writing on AI engineering, software, automation, and embedded computing.
          </motion.p>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-20 inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full bg-slate-100 px-2 py-1.5 dark:bg-slate-800"
          >
            {insightGroups.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={group === name}
                onClick={() => setGroup(name)}
                className={cn(
                  "relative z-20 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  group === name
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200",
                )}
              >
                {name}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {articles.map((article, index) => {
            const highlighted = index === 1
            return (
              <motion.div
                key={article.slug}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
                  highlighted
                    ? "border-cyan-500 bg-slate-100 shadow-xl shadow-cyan-500/10 dark:bg-slate-900"
                    : "border-slate-200 bg-slate-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800",
                )}
              >
                <div className="pointer-events-none absolute inset-0 z-0 hidden rounded-2xl bg-gradient-to-r from-cyan-500/20 via-slate-500/20 to-cyan-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60 dark:from-cyan-200/20 dark:via-slate-200/20 dark:to-cyan-200/20 sm:block" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        highlighted
                          ? "bg-cyan-600/20 text-cyan-600 dark:text-cyan-400"
                          : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
                      )}
                    >
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{article.title}</h3>
                  </div>
                  <p className="mb-8 flex-grow text-sm text-slate-600 dark:text-slate-400">{article.summary}</p>
                  <Button
                    asChild
                    className={cn(
                      "w-full rounded-xl border-0 font-medium transition-all duration-200",
                      highlighted
                        ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-cyan-400"
                        : "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600",
                    )}
                  >
                    <Link href={`/insights/${article.slug}`}>Read article</Link>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function HomeSections() {
  return (
    <>
      <section id="services" className="scroll-mt-28 px-4 py-20">
        <SectionTitle icon={Boxes} title="Our Core" accent="Services" />
        <CoreServices />
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold">Our Approach</h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">
            We believe meaningful progress comes from combining technical knowledge, continuous learning and international collaboration.
          </p>
          <p className="mt-6 text-lg text-slate-700 dark:text-slate-300">
            By bringing together talented individuals and experienced technology professionals, we aim to develop a strong global AI network that creates long-term value for individuals, businesses and the technology industry.
          </p>
          <p className="mt-6 text-lg font-medium text-slate-900 dark:text-slate-100">
            To bring people and technology together, develop new skills, create innovative solutions and build long-term professional relationships.
          </p>
        </div>
      </section>

      <section className="w-full bg-background py-16 text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent dark:from-cyan-600 dark:to-cyan-700">
              What We Do
            </span>
          </h2>
        </div>
        <WhatWeDoStrip />
      </section>

      <section className="px-4 py-16 text-center">
        <h2 className="text-4xl font-bold">Let&apos;s Build Something Better.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-400">
          Connecting people, sharing knowledge and creating new possibilities through AI and technology.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Join our growing AI and technology network. We welcome people who are interested in AI, learning new skills and connecting with technology professionals.
        </p>
        <p className="mx-auto mt-4 text-sm font-semibold tracking-[0.2em] text-slate-700 dark:text-slate-300">
          AI TALENT · TECHNOLOGY · COLLABORATION
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild className="rounded-full px-8 py-6 text-lg">
            <a href={contactMailto}>Contact Us</a>
          </Button>
        </div>
      </section>

      <section id="service-details" className="relative z-0 scroll-mt-28 px-4 py-20">
        <SectionTitle icon={Layers} title="Our Engineering" accent="Services">
          <p>We provide AI education, technical mentorship, platform guidance, software development, intelligent automation, and technology consulting.</p>
          <p>Our work connects people, knowledge, and technology across the United States and Taiwan.</p>
        </SectionTitle>
        <EngineeringServices />
      </section>

      <EngineeringInsights />

    </>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 scroll-mt-28 overflow-hidden px-4 py-20">
      <SectionTitle icon={Sparkles} title="Contact" accent="Us">
        <p>Interested in joining our network, learning AI skills, or exploring collaboration?</p>
        <p>
          We welcome messages from individuals and organizations who want to connect with technology professionals, grow through mentorship, or discuss AI and software work.
        </p>
        <p>Share a short note about your interests and goals, and we will follow up when we can.</p>
      </SectionTitle>

      <div className="relative mx-auto max-w-5xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 blur-2xl dark:from-cyan-400/10 dark:to-emerald-400/10"
        />

        <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-10">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.25)] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 sm:p-7">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                  <Briefcase className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
                  What Can We Help You With?
                </h3>
              </div>
              <ul className="space-y-2">
                {helpWith.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl bg-slate-50/90 px-3.5 py-3 text-sm text-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 sm:p-7">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">Prefer Email?</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Reach us at{" "}
                <a
                  href={contactMailto}
                  className="font-medium text-cyan-700 underline underline-offset-2 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300"
                >
                  {site.email}
                </a>
                . The contact form below opens your mail app with a ready message.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 sm:p-7">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">
                  Introductory Conversation
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                If you would like to ask questions before joining or collaborating, we can arrange an online introductory conversation when availability allows.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 dark:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.65)] sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/25 to-transparent blur-2xl dark:from-cyan-300/20"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-gradient-to-tr from-emerald-400/20 to-transparent blur-2xl dark:from-emerald-300/15"
            />
            <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                  <Mail className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 sm:text-2xl">Contact Form</h3>
              </div>
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
