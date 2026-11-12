"use client"

import { serviceDetails } from "@/lib/services"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import {
  Briefcase,
  Check,
  Code,
  Compass,
  GraduationCap,
  Users,
  Workflow,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useEffect, useState } from "react"

const serviceIcons: Record<string, LucideIcon> = {
  education: GraduationCap,
  mentorship: Users,
  platform: Compass,
  software: Code,
  automation: Workflow,
  consulting: Briefcase,
}

export function EngineeringServices() {
  const [activeId, setActiveId] = useState(serviceDetails[0]?.id ?? "education")
  const active = serviceDetails.find((service) => service.id === activeId) ?? serviceDetails[0]
  const ActiveIcon = serviceIcons[active.id] ?? Code

  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.replace("#", "")
      if (serviceDetails.some((service) => service.id === id)) setActiveId(id)
    }
    syncFromHash()
    window.addEventListener("hashchange", syncFromHash)
    return () => window.removeEventListener("hashchange", syncFromHash)
  }, [])

  function selectService(id: string) {
    setActiveId(id)
    const hash = `#${id}`
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash)
  }

  return (
    <div className="relative mx-auto max-w-5xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-emerald-500/10 blur-2xl dark:from-cyan-400/10 dark:to-emerald-400/10"
      />

      <div className="relative grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-10">
        <nav aria-label="Engineering services" className="flex flex-col gap-1">
          <div className="mb-2 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {serviceDetails.map((service) => {
              const selected = service.id === activeId
              const Icon = serviceIcons[service.id] ?? Code
              return (
                <button
                  key={`chip-${service.id}`}
                  type="button"
                  onClick={() => selectService(service.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selected
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {service.title}
                </button>
              )
            })}
          </div>

          <ul className="hidden space-y-1 lg:block">
            {serviceDetails.map((service, index) => {
              const selected = service.id === activeId
              const Icon = serviceIcons[service.id] ?? Code
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    id={service.id}
                    aria-current={selected ? "true" : undefined}
                    onClick={() => selectService(service.id)}
                    className={cn(
                      "group relative flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-colors duration-200",
                      selected
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/80 dark:bg-slate-900 dark:text-white dark:ring-slate-700"
                        : "text-slate-600 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/60 dark:hover:text-white",
                    )}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="service-active-bar"
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
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="mt-0.5 block text-base font-semibold leading-snug">{service.title}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div
          id="service-detail"
          role="region"
          aria-label={active.title}
          className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-950/70 dark:shadow-[0_20px_50px_-28px_rgba(0,0,0,0.65)] sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-400/25 to-transparent blur-2xl dark:from-cyan-300/20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-gradient-to-tr from-emerald-400/20 to-transparent blur-2xl dark:from-emerald-300/15"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
                    {active.number}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
                    {active.title}
                  </h3>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300">
                  <ActiveIcon className="h-6 w-6" aria-hidden />
                </div>
              </div>

              {active.summary ? (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                  {active.summary}
                </p>
              ) : null}

              {active.capabilitiesLabel ? (
                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                  {active.capabilitiesLabel.replace(/:$/, "")}
                </p>
              ) : null}

              {active.capabilities.length ? (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {active.capabilities.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.04, duration: 0.25 }}
                      className="flex items-start gap-3 rounded-xl bg-slate-50/90 px-3.5 py-3 text-sm text-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300">
                        <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : null}

              {active.close ? (
                <p className="mt-6 border-t border-slate-200/80 pt-5 text-sm leading-relaxed text-slate-500 dark:border-slate-700 dark:text-slate-400">
                  {active.close}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
