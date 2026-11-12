"use client"

import { Button } from "@/components/ui/button"
import type { AnimatedProps } from "@/types/motion"
import { motion } from "framer-motion"
import { contactMailto, site } from "@/lib/site"

export function Hero({ id }: AnimatedProps) {
  return (
    <section
      id={id}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24"
    >
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="relative">
          <motion.h1
            className="mb-6 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text pb-2 text-5xl font-bold text-transparent md:text-7xl"
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {site.tagline}
          </motion.h1>
          <motion.div
            className="absolute -bottom-4 left-1/2 h-1.5 w-32 -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
            initial={false}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <motion.p
          className="mx-auto mb-4 mt-12 max-w-2xl text-lg text-foreground/80 md:text-xl"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our mission is to connect individuals with AI experts and software engineers. Through technical mentorship, hands-on learning, and cross-border collaboration, we help participants build practical skills, deepen their understanding of AI technologies, and explore new opportunities in the tech industry.
        </motion.p>
        <motion.p
          className="mx-auto mb-8 max-w-2xl text-lg text-foreground/70"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          By bringing people, knowledge, and technology together, we aim to create meaningful connections and support long-term professional growth.
        </motion.p>
        <div className="relative flex flex-wrap items-center justify-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="rounded-full bg-gradient-to-r from-foreground via-foreground to-foreground/90 px-8 py-6 text-lg text-background hover:opacity-90">
              <a href="#services">Explore Our Services</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild variant="outline" className="rounded-full border-foreground/20 px-8 py-6 text-lg text-foreground hover:bg-foreground/10">
              <a href={contactMailto}>Contact Us</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
