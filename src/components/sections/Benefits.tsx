"use client"

import { BenefitCard } from "@/components/sections/benefits/BenefitCard"
import type { BenefitProps } from "@/types"
import type { AnimatedProps } from "@/types/motion"
import { motion } from "framer-motion"
import { Cpu, Gauge, PenLine, Users, Zap } from "lucide-react"

const benefits: BenefitProps[] = [
  {
    icon: <Users className="w-6 h-6 text-slate-900 dark:text-white" />,
    title: "Client-focused solutions",
    description:
      "The objective and the limits are written first. Latency, safety, unit cost, power, and the machine already on the floor decide the design.",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    icon: <Gauge className="w-6 h-6 text-slate-900 dark:text-white" />,
    title: "AI product optimization",
    description:
      "Accuracy, safety, speed, memory, and cost are tuned together. A faster model that misses the bar is a failed experiment.",
    className: "md:col-span-1",
  },
  {
    icon: <PenLine className="w-6 h-6 text-slate-900 dark:text-white" />,
    title: "Custom software",
    description:
      "New products, and the slower work of upgrading a system that is already in daily use.",
    className: "md:col-span-1",
  },
  {
    icon: <Cpu className="w-6 h-6 text-slate-900 dark:text-white" />,
    title: "On site, and on the device",
    description:
      "Engineers work at the premises when the room is the lab. Raspberry Pi, NVIDIA Jetson, and other compact computers are measured for time, memory, and power.",
    className: "md:col-span-3",
  },
]

export function Benefits({ id }: AnimatedProps) {
  return (
    <section id={id} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 dark:bg-cyan-800/30 mx-auto mb-4"
          initial={{ rotate: -15, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 300, duration: 0.5 }}
        >
          <Zap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        </motion.div>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4"
          >
            Practice
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-600 dark:to-cyan-700">
              {" "}
              for the constraint
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xl text-slate-600 dark:text-slate-400"
          >
            Individual requirements, written down, then software and models checked against that page.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  )
}
