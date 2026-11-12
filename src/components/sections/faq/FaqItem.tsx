"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"

export function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string
  answer: string
  open: boolean
  onToggle: () => void
}) {
  const answerId = `faq-answer-${question.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <div
      className={cn(
        "border-b border-slate-200/80 last:border-b-0 dark:border-slate-700/80",
        open && "bg-slate-50/70 dark:bg-slate-900/40",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={answerId}
        className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-900/50 sm:px-6"
      >
        <span
          className={cn(
            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
            open
              ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-700 dark:text-cyan-300"
              : "border-slate-200 bg-white text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300",
          )}
        >
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
            <Plus className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          </motion.span>
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block text-base font-semibold leading-snug sm:text-lg",
              open ? "text-slate-900 dark:text-white" : "text-slate-800 dark:text-slate-100",
            )}
          >
            {question}
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={answerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 pl-[3.75rem] text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:px-6 sm:pl-16">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
