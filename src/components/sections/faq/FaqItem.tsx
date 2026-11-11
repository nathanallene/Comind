"use client"

import { Badge } from "@/components/ui/badge"
import type { FAQItemProps } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export function FAQItem({ question, answer, category }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const answerId = `faq-answer-${question.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <motion.div
      layout
      className="relative"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative overflow-hidden rounded-xl border p-6 transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700/50">
        <Badge
          variant="secondary"
          className="absolute right-2 top-2 bg-cyan-700 text-xs font-medium text-slate-100"
        >
          {category}
        </Badge>
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="flex w-full items-center text-left"
          aria-expanded={isOpen}
          aria-controls={answerId}
        >
          <div className="mr-4 flex h-8 w-8 items-center justify-center">
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
          <h3 className="flex-1 pr-16 text-xl font-semibold">{question}</h3>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={answerId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <p className="ml-12 mt-4 leading-relaxed dark:text-slate-300">{answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
