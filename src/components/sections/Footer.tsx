"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      <motion.div
        className="container relative z-10 mx-auto px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-pink-600 dark:from-cyan-600 dark:to-cyan-700">
              Start with the limit
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            A useful first note names the objective, what cannot change, and where the system has to run.
          </p>
          <div className="relative h-px my-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-gray-800 dark:text-gray-200">DevBridge</span>
          </p>
        </div>
      </motion.div>
    </footer>
  )
}
