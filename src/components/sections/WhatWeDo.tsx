"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

const items = [
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

export function WhatWeDo() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const loopRef = useRef(0)
  const pausedRef = useRef(false)
  const dragRef = useRef<{ pointerId: number; startX: number; origin: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [active, setActive] = useState(0)
  const copies = 3
  const sequence = Array.from({ length: copies }, () => items).flat()

  function measureLoop() {
    const track = trackRef.current
    if (!track || track.children.length < items.length * 2) return 0
    const first = track.children[0] as HTMLElement
    const second = track.children[items.length] as HTMLElement
    return second.offsetLeft - first.offsetLeft
  }

  function wrapOffset(value: number, loop: number) {
    if (loop <= 0) return 0
    let next = value
    while (next <= -loop) next += loop
    while (next > 0) next -= loop
    return next
  }

  function syncActive(offset: number, loop: number) {
    const track = trackRef.current
    if (!track || loop <= 0 || track.children.length === 0) return
    const first = track.children[0] as HTMLElement
    const step = first.offsetWidth || 1
    const progress = ((-offset % loop) + loop) % loop
    const index = Math.round(progress / step) % items.length
    setActive((current) => (current === index ? current : index))
  }

  function place(offset: number) {
    const loop = loopRef.current || measureLoop()
    loopRef.current = loop
    const next = wrapOffset(offset, loop)
    offsetRef.current = next
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`
    syncActive(next, loop)
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
        place(offsetRef.current - (loop / 42000) * (now - last))
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
    setDragging(true)
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, origin: offsetRef.current }
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Capture can fail for an already-released pointer; move events still update the strip.
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
    setDragging(false)
    pausedRef.current = false
  }

  return (
    <section className="relative w-full overflow-hidden bg-background py-16 text-foreground sm:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">
          <span className="bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent dark:from-cyan-600 dark:to-cyan-700">
            What We Do
          </span>
        </h2>
      </div>

      <div
        className={cn(
          "relative w-full touch-none overflow-hidden",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={() => {
          pausedRef.current = true
        }}
        onPointerLeave={() => {
          if (!dragRef.current) pausedRef.current = false
        }}
      >
        <div ref={trackRef} className="flex w-max select-none will-change-transform">
          {sequence.map((item, index) => {
            const itemIndex = index % items.length
            const isActive = itemIndex === active
            return (
              <div
                key={`${item.title}-${index}`}
                className="w-[min(22rem,78vw)] shrink-0 px-5 sm:w-[26rem] sm:px-7"
              >
                <div
                  className={cn(
                    "h-full border-l border-slate-200/90 pl-5 transition-all duration-300 dark:border-slate-700/90 sm:pl-6",
                    isActive
                      ? "border-l-cyan-500 opacity-100"
                      : "opacity-70 hover:opacity-100",
                  )}
                >
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                    {String(itemIndex + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={cn(
                      "mt-2 text-lg font-semibold leading-snug transition-colors duration-300 sm:text-xl",
                      isActive
                        ? "text-slate-900 dark:text-slate-50"
                        : "text-slate-800 dark:text-slate-100",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 whitespace-normal text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-[0.95rem]">
                    {item.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background via-background/80 to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background via-background/80 to-transparent sm:w-28" />
      </div>

      <div className="mt-8 flex items-center justify-center gap-2" aria-hidden>
        {items.map((item, index) => (
          <span
            key={item.title}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === active ? "w-6 bg-cyan-500" : "w-1.5 bg-slate-300 dark:bg-slate-600",
            )}
          />
        ))}
      </div>
    </section>
  )
}
