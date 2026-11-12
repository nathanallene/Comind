"use client"

import { cn } from "@/lib/utils"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import {
  Briefcase,
  Code,
  Compass,
  GraduationCap,
  Users,
  Workflow,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useRef, useState } from "react"

const core: { title: string; icon: LucideIcon }[] = [
  { title: "AI Education & Training", icon: GraduationCap },
  { title: "Technical Mentorship", icon: Users },
  { title: "AI Platform & Opportunity Guidance", icon: Compass },
  { title: "AI & Software Development", icon: Code },
  { title: "Intelligent Automation", icon: Workflow },
  { title: "Technology Consulting & Collaboration", icon: Briefcase },
]

export function CoreServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.35"],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 })
  const railScale = useTransform(smoothProgress, [0, 1], [0, 1])

  return (
    <div ref={sectionRef} className="relative mx-auto max-w-5xl">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 -z-10 h-full rounded-[3rem] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.09),transparent_62%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.08),transparent_62%)]"
      />

      <div className="relative">
        <div
          aria-hidden
          className="absolute bottom-6 left-[1.625rem] top-6 w-[2px] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 md:left-1/2 md:-translate-x-1/2"
        >
          <motion.div
            className="origin-top bg-gradient-to-b from-cyan-400 via-teal-500 to-emerald-500"
            style={{
              height: "100%",
              scaleY: reduceMotion ? 1 : railScale,
            }}
          />
        </div>

        <ol className="relative">
          {core.map(({ title, icon: Icon }, index) => {
            const left = index % 2 === 0
            const isActive = active === index
            return (
              <motion.li
                key={title}
                onViewportEnter={() => setActive(index)}
                viewport={{ amount: 0.55, margin: "-10% 0px -35% 0px" }}
                initial={reduceMotion ? false : { opacity: 0, x: left ? -28 : 28, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(index)}
                className="relative grid grid-cols-[3.25rem_minmax(0,1fr)] items-center gap-3 py-6 md:grid-cols-[1fr_3.25rem_1fr] md:gap-0 md:py-9"
              >
                <div
                  className={cn(
                    "group relative col-start-2 md:col-start-auto",
                    left ? "md:col-start-1 md:pr-12 md:text-right" : "md:col-start-3 md:pl-12 md:text-left",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute -top-8 select-none font-mono text-6xl font-bold leading-none tracking-tighter text-slate-900/[0.05] transition-opacity duration-300 dark:text-white/[0.06] sm:text-7xl",
                      left ? "left-0 md:left-auto md:right-12" : "left-0 md:left-12",
                      isActive ? "opacity-100" : "opacity-40",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p
                    className={cn(
                      "relative font-mono text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-300",
                      isActive ? "text-cyan-700 dark:text-cyan-300" : "text-slate-400 dark:text-slate-500",
                      left ? "md:text-right" : "md:text-left",
                    )}
                  >
                    Step {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3
                    className={cn(
                      "relative mt-2 text-xl font-semibold leading-snug tracking-tight transition-colors duration-300 sm:text-2xl md:text-[1.65rem]",
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-slate-300",
                    )}
                  >
                    {title}
                  </h3>

                  <motion.span
                    aria-hidden
                    className={cn(
                      "mt-3 block h-[2px] rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500",
                      left ? "md:ml-auto" : "md:mr-auto",
                    )}
                    initial={false}
                    animate={{
                      width: isActive ? "4.5rem" : "1.5rem",
                      opacity: isActive ? 1 : 0.35,
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                </div>

                <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <motion.span
                    animate={
                      isActive
                        ? { scale: 1.08, boxShadow: "0 0 0 8px hsl(var(--background)), 0 0 28px rgba(6,182,212,0.35)" }
                        : { scale: 1, boxShadow: "0 0 0 8px hsl(var(--background))" }
                    }
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    className={cn(
                      "relative flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300",
                      isActive
                        ? "border-cyan-500 text-cyan-700 dark:border-cyan-300 dark:text-cyan-300"
                        : "border-slate-900 text-slate-900 dark:border-white dark:text-white",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full border border-cyan-400/50"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.55, opacity: 0 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    ) : null}
                    <Icon className="relative h-5 w-5" aria-hidden />
                  </motion.span>
                </div>

                <motion.div
                  aria-hidden
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0.55, opacity: isActive ? 1 : 0.35 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className={cn(
                    "pointer-events-none absolute top-1/2 hidden h-[2px] w-10 -translate-y-1/2 origin-center bg-gradient-to-r from-cyan-500 to-emerald-500 md:block",
                    left ? "right-[calc(50%+1.625rem)] origin-right" : "left-[calc(50%+1.625rem)] origin-left",
                  )}
                />
              </motion.li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
