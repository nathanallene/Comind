"use client"

import type { AnimatedProps } from "@/types/motion"
import { motion } from "framer-motion"
import { FlaskConical } from "lucide-react"

const studies = [
  {
    field: "Manufacturing",
    title: "Inspection on a Jetson, inside an existing line",
    summary:
      "A vision model had to reject bad parts without a new rack, a new power budget, or a rise in false rejects.",
    measures: ["End-to-end latency 180 ms to 41 ms", "Module power mode 25 W to 15 W"],
  },
  {
    field: "Software product",
    title: "A support model that cost more than the tickets",
    summary:
      "The assistant was accurate enough and too expensive. The work was to cut cost per resolved ticket without loosening the answer check.",
    measures: ["Cost per resolved ticket down 62%", "p95 response 4.2 s to 1.6 s"],
  },
  {
    field: "Field devices",
    title: "A Raspberry Pi fleet that ran out of memory",
    summary:
      "The application fit in the lab and failed in the cabinet after a day. The fix was memory, logging, and a power budget, measured on the device.",
    measures: ["Resident memory down 40%", "Uptime in cabinet from hours to 30 days"],
  },
]

export function Work({ id }: AnimatedProps) {
  return (
    <section id={id} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-cyan-800/30 mx-auto mb-4"
          initial={{ rotate: -15, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <FlaskConical className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        </motion.div>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Sample{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-600 dark:to-cyan-700">
              studies
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Figures below show the kind of result. They are samples, not a named client engagement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {studies.map((study, index) => (
            <motion.article
              key={study.title}
              className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-6 shadow-md h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <p className="text-sm text-cyan-700 dark:text-cyan-400 mb-2">{study.field}</p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                {study.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{study.summary}</p>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {study.measures.map((measure) => (
                  <li key={measure}>{measure}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
