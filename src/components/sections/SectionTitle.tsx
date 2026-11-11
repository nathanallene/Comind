"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

export function SectionTitle({
  icon: Icon,
  title,
  accent,
  children,
}: {
  icon: LucideIcon
  title: string
  accent?: string
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <motion.div
        className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-cyan-800/30"
        initial={false}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
      </motion.div>
      <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
        {title}
        {accent ? (
          <span className="bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent dark:from-cyan-600 dark:to-cyan-700">
            {" "}
            {accent}
          </span>
        ) : null}
      </h2>
      {children ? <div className="mt-4 space-y-3 text-xl text-slate-600 dark:text-slate-400">{children}</div> : null}
    </div>
  )
}
