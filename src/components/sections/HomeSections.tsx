"use client"

import { InquiryForm } from "@/components/InquiryForm"
import { SectionTitle } from "@/components/sections/SectionTitle"
import { Button } from "@/components/ui/button"
import { insightGroups, insights } from "@/lib/insights"
import { serviceDetails } from "@/lib/services"
import { contactMailto, site } from "@/lib/site"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Boxes,
  Briefcase,
  Code,
  Compass,
  GraduationCap,
  Layers,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"

const core = [
  { title: "AI Education & Training", icon: GraduationCap },
  { title: "Technical Mentorship", icon: Users },
  { title: "AI Platform & Opportunity Guidance", icon: Compass },
  { title: "AI & Software Development", icon: Code },
  { title: "Intelligent Automation", icon: Workflow },
  { title: "Technology Consulting & Collaboration", icon: Briefcase },
]

const whatWeDo = [
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

const helpWith = [
  "AI education and training.",
  "Technical mentorship.",
  "AI platform and opportunity guidance.",
  "AI and software development.",
  "Intelligent automation.",
  "Technology consulting and collaboration.",
]

const serviceIcons: Record<string, LucideIcon> = {
  education: GraduationCap,
  mentorship: Users,
  platform: Compass,
  software: Code,
  automation: Workflow,
  consulting: Briefcase,
}

const HEXAGON = "50,0 6.7,25 6.7,75 50,100 93.3,75 93.3,25"
const HEX_LOCAL = HEXAGON.split(" ").map((pair) => pair.split(",").map(Number) as [number, number])
const HEX_DEPTH = 4.5

function roundedHexPoints(radius: number) {
  const points = HEX_LOCAL
  const count = points.length
  const sampled: [number, number][] = []
  for (let index = 0; index < count; index += 1) {
    const prev = points[(index + count - 1) % count]
    const current = points[index]
    const next = points[(index + 1) % count]
    const inwardX = current[0] - prev[0]
    const inwardY = current[1] - prev[1]
    const outwardX = next[0] - current[0]
    const outwardY = next[1] - current[1]
    const inwardLength = Math.hypot(inwardX, inwardY) || 1
    const outwardLength = Math.hypot(outwardX, outwardY) || 1
    const cut = Math.min(radius, inwardLength * 0.38, outwardLength * 0.38)
    const start: [number, number] = [current[0] - (inwardX / inwardLength) * cut, current[1] - (inwardY / inwardLength) * cut]
    const end: [number, number] = [current[0] + (outwardX / outwardLength) * cut, current[1] + (outwardY / outwardLength) * cut]
    const steps = 5
    for (let step = 0; step <= steps; step += 1) {
      const t = step / steps
      const u = 1 - t
      sampled.push([
        u * u * start[0] + 2 * u * t * current[0] + t * t * end[0],
        u * u * start[1] + 2 * u * t * current[1] + t * t * end[1],
      ])
    }
  }
  return sampled.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ")
}

const ROUNDED_HEX = roundedHexPoints(8)
const BLOCKS = serviceDetails.length
const ORBIT = 36
const STAGE_SIZE = 920
const IDLE_SPEED = (Math.PI * 2) / 280000

function polygonClip(points: string) {
  return `polygon(${points
    .split(" ")
    .map((pair) => {
      const [x, y] = pair.split(",")
      return `${x}% ${y}%`
    })
    .join(", ")})`
}

function wrapAngle(angle: number) {
  return Math.atan2(Math.sin(angle), Math.cos(angle))
}

function blockTheta(index: number, rotation: number) {
  return -Math.PI / 2 + (index / BLOCKS) * Math.PI * 2 + rotation
}

function topBlockIndex(rotation: number) {
  let best = 0
  let bestDistance = Infinity
  for (let index = 0; index < BLOCKS; index += 1) {
    const distance = Math.abs(wrapAngle(blockTheta(index, rotation) + Math.PI / 2))
    if (distance < bestDistance) {
      bestDistance = distance
      best = index
    }
  }
  return best
}

function rotationForBlock(index: number) {
  return -(index / BLOCKS) * Math.PI * 2
}

function easeInOut(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3
}

function easeOutBack(t: number) {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * (t - 1) ** 3 + c1 * (t - 1) ** 2
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function ServiceWriteup({ service }: { service: (typeof serviceDetails)[number] }) {
  return (
    <div className="px-1 py-1 text-center text-sm leading-relaxed text-slate-700 dark:text-slate-200">
      {service.summary ? <p>{service.summary}</p> : null}
      {service.capabilitiesLabel ? (
        <p className="mt-3 font-medium text-slate-900 dark:text-slate-100">{service.capabilitiesLabel}</p>
      ) : null}
      {service.capabilities.length ? (
        <ul className="mt-1 list-none space-y-1">
          {service.capabilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {service.close ? <p className="mt-3 pb-3">{service.close}</p> : null}
    </div>
  )
}

function EngineeringServiceRing() {
  const stageRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef<(HTMLButtonElement | null)[]>([])
  const rotationRef = useRef(0)
  const dragRef = useRef<{
    pointerId: number
    lastAngle: number
    lastTime: number
    moved: boolean
    index: number
    velocity: number
  } | null>(null)
  const motionRef = useRef({
    raf: 0,
    generation: 0,
    mode: "paused" as "idle" | "coast" | "spin" | "paused" | "intro",
    velocity: 0,
    lastTime: 0,
    from: 0,
    delta: 0,
    start: 0,
    duration: 0,
    lastTop: 0,
  })
  const assembleRef = useRef({
    progress: 0,
    started: false,
    finished: false,
    start: 0,
    duration: 2100,
  })
  const apiRef = useRef<(now: number) => void>(() => {})
  const hoverRef = useRef(false)
  const [rotation, setRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [pinned, setPinned] = useState<number | null>(null)
  const [centerHover, setCenterHover] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const topIndex = topBlockIndex(rotation)
  const enlargedIndex = pinned ?? topIndex
  const active = serviceDetails[topIndex]

  function paintBlocks(angle: number) {
    const size = stageRef.current?.clientWidth || STAGE_SIZE
    const radius = (ORBIT / 100) * size
    const assemble = assembleRef.current
    const globalT = assemble.finished ? 1 : assemble.progress
    const center = centerRef.current
    if (center) {
      const centerT = easeOutCubic(clamp01((globalT - 0.08) / 0.72))
      center.style.opacity = String(centerT)
      center.style.transform = `translate(-50%, -50%) scale(${0.82 + 0.18 * centerT})`
    }
    for (let index = 0; index < BLOCKS; index += 1) {
      const button = blockRefs.current[index]
      if (!button) continue
      const stagger = index / Math.max(1, BLOCKS)
      const localT = clamp01((globalT - stagger * 0.28) / 0.72)
      const travel = easeOutBack(localT)
      const fade = easeOutCubic(localT)
      const homeTheta = blockTheta(index, angle)
      const drift = (1 - travel) * (0.55 + (index % 3) * 0.08) * (index % 2 === 0 ? 1 : -1)
      const theta = homeTheta + drift
      const startRadius = radius * (1.72 + (index % 3) * 0.1)
      const currentRadius = startRadius + (radius - startRadius) * travel
      const x = Math.cos(theta) * currentRadius
      const y = Math.sin(theta) * currentRadius
      const pop = 0.78 + 0.22 * travel
      button.style.opacity = String(fade)
      button.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${pop})`
      const deg = ((theta + Math.PI / 2) * 180) / Math.PI
      const tilt = button.querySelector("[data-tilt]") as HTMLElement | null
      if (tilt) {
        const now = performance.now()
        const swayBase = reduceMotion ? 18 : 22 + Math.sin(now / 860 + index * 0.8) * 5
        const sway = swayBase * (0.35 + 0.65 * travel)
        const bob = reduceMotion || travel < 0.98 ? (1 - travel) * 10 : Math.sin(now / 640 + index * 1.2) * 7
        const depth = 1 + Math.sin(theta) * 0.08 * travel
        tilt.style.transform = `perspective(420px) rotateX(${Math.sin(theta) * sway}deg) rotateY(${-Math.cos(theta) * sway}deg) translateY(${bob}px) scale(${depth})`
      }
      button.querySelectorAll("[data-side]").forEach((node) => node.setAttribute("transform", `translate(0 ${HEX_DEPTH}) rotate(${deg} 50 50)`))
      button.querySelectorAll("[data-face]").forEach((node) => node.setAttribute("transform", `rotate(${deg} 50 50)`))
      button.querySelectorAll("[data-sheen]").forEach((node) => node.setAttribute("transform", `rotate(${deg} 50 50)`))
      const turn = button.querySelector("[data-turn]") as HTMLElement | null
      const upright = button.querySelector("[data-upright]") as HTMLElement | null
      if (turn) turn.style.transform = `rotate(${deg}deg)`
      if (upright) upright.style.transform = `rotate(${-deg}deg)`
    }
  }

  function applyRotation(next: number) {
    rotationRef.current = next
    paintBlocks(next)
    const index = topBlockIndex(next)
    const motion = motionRef.current
    if (motion.lastTop === index) return
    motion.lastTop = index
    setRotation(next)
    const hash = `#${serviceDetails[index].id}`
    if (window.location.hash !== hash) window.history.replaceState(null, "", hash)
  }

  useLayoutEffect(() => {
    paintBlocks(rotationRef.current)
  })

  function ensureLoop() {
    const motion = motionRef.current
    if (motion.raf) return
    const generation = motion.generation
    motion.raf = requestAnimationFrame((now) => {
      if (motionRef.current.generation !== generation) return
      motionRef.current.raf = 0
      apiRef.current(now)
    })
  }

  function cancelMotion() {
    const motion = motionRef.current
    motion.generation += 1
    if (motion.raf) cancelAnimationFrame(motion.raf)
    motion.raf = 0
    motion.mode = "paused"
    motion.velocity = 0
    motion.lastTime = 0
  }

  function resumeIdle() {
    const motion = motionRef.current
    motion.mode = "idle"
    motion.velocity = 0
    motion.lastTime = performance.now()
    if (prefersReducedMotion()) return
    ensureLoop()
  }

  function finishIntro() {
    const assemble = assembleRef.current
    assemble.progress = 1
    assemble.finished = true
    setIntroDone(true)
    paintBlocks(rotationRef.current)
    resumeIdle()
  }

  function beginIntro() {
    if (assembleRef.current.started || assembleRef.current.finished) return
    if (prefersReducedMotion()) {
      assembleRef.current.started = true
      finishIntro()
      return
    }
    const assemble = assembleRef.current
    assemble.started = true
    assemble.finished = false
    assemble.progress = 0
    assemble.start = performance.now()
    const motion = motionRef.current
    motion.mode = "intro"
    motion.lastTime = assemble.start
    paintBlocks(rotationRef.current)
    ensureLoop()
  }

  function beginSpin(delta: number, duration: number) {
    const motion = motionRef.current
    motion.mode = "spin"
    motion.from = rotationRef.current
    motion.delta = delta
    motion.start = performance.now()
    motion.duration = duration
    motion.velocity = 0
  }

  apiRef.current = (now: number) => {
    const motion = motionRef.current
    if (motion.mode === "paused") return
    if (!motion.lastTime) motion.lastTime = now
    const dt = Math.min(48, Math.max(0, now - motion.lastTime))
    motion.lastTime = now
    if (motion.mode === "intro") {
      const assemble = assembleRef.current
      const raw = clamp01((now - assemble.start) / assemble.duration)
      assemble.progress = raw
      paintBlocks(rotationRef.current)
      if (raw >= 1) finishIntro()
    } else if (motion.mode === "coast") {
      let next = rotationRef.current + motion.velocity * dt
      motion.velocity *= Math.exp(-dt / 300)
      let aligned = false
      if (Math.abs(motion.velocity) < 0.0014) {
        const gap = wrapAngle(rotationForBlock(topBlockIndex(next)) - next)
        next += gap * (1 - Math.exp(-dt / 560))
        if (Math.abs(motion.velocity) < 0.0001 && Math.abs(gap) < 0.012) {
          next += wrapAngle(rotationForBlock(topBlockIndex(next)) - next)
          aligned = true
        }
      }
      applyRotation(next)
      if (aligned) {
        motion.mode = "idle"
        setPinned(null)
      }
    } else if (motion.mode === "spin") {
      const t = Math.min(1, (now - motion.start) / motion.duration)
      applyRotation(motion.from + motion.delta * easeInOut(t))
      if (t >= 1) {
        applyRotation(motion.from + motion.delta)
        motion.mode = "idle"
        motion.lastTime = now
        setPinned(null)
      }
    } else if (!hoverRef.current) {
      applyRotation(rotationRef.current + IDLE_SPEED * dt)
    } else {
      paintBlocks(rotationRef.current)
    }
    if (motion.mode !== "paused") ensureLoop()
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => {
      const reduce = media.matches
      setReduceMotion(reduce)
      if (reduce) {
        cancelMotion()
        finishIntro()
      } else if (assembleRef.current.finished) {
        resumeIdle()
      }
    }
    update()
    media.addEventListener("change", update)
    const id = window.location.hash.replace("#", "")
    const index = serviceDetails.findIndex((service) => service.id === id)
    if (index >= 0) applyRotation(rotationForBlock(index))
    paintBlocks(rotationRef.current)

    const stage = stageRef.current
    let observer: IntersectionObserver | null = null
    if (stage && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            beginIntro()
            observer?.disconnect()
          }
        },
        { threshold: 0.15, rootMargin: "80px 0px" },
      )
      observer.observe(stage)
    } else {
      beginIntro()
    }

    // If the observer never fires or the assemble stalls, still reveal the hexagons.
    const fallback = window.setTimeout(() => {
      if (!assembleRef.current.started) beginIntro()
      else if (!assembleRef.current.finished) finishIntro()
    }, 5000)

    return () => {
      media.removeEventListener("change", update)
      observer?.disconnect()
      window.clearTimeout(fallback)
      cancelMotion()
    }
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [active.id])

  useEffect(() => {
    const node = centerRef.current
    if (!node) return
    const onWheel = (event: WheelEvent) => {
      const scroller = scrollRef.current
      if (!scroller) return
      const max = scroller.scrollHeight - scroller.clientHeight
      if (max <= 1) return
      const atTop = scroller.scrollTop <= 0 && event.deltaY < 0
      const atBottom = scroller.scrollTop >= max - 1 && event.deltaY > 0
      if (atTop || atBottom) return
      event.preventDefault()
      scroller.scrollTop = Math.min(max, Math.max(0, scroller.scrollTop + event.deltaY))
    }
    node.addEventListener("wheel", onWheel, { passive: false })
    return () => node.removeEventListener("wheel", onWheel)
  }, [])

  function pointerAngle(event: React.PointerEvent) {
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return 0
    return Math.atan2(event.clientY - (rect.top + rect.height / 2), event.clientX - (rect.left + rect.width / 2))
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (!introDone || motionRef.current.mode === "intro") return
    if ((event.target as HTMLElement).closest("[data-center]")) return
    cancelMotion()
    const button = (event.target as HTMLElement).closest("button[id]")
    const index = button ? serviceDetails.findIndex((service) => service.id === button.id) : -1
    dragRef.current = {
      pointerId: event.pointerId,
      lastAngle: pointerAngle(event),
      lastTime: performance.now(),
      moved: false,
      index,
      velocity: 0,
    }
    setDragging(true)
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Capture can fail for untrusted or already-released pointers; dragging still tracks the move events.
    }
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const angle = pointerAngle(event)
    const delta = wrapAngle(angle - drag.lastAngle)
    const now = performance.now()
    const dt = now - drag.lastTime
    if (Math.abs(delta) > 0.01) {
      if (!drag.moved) setPinned(null)
      drag.moved = true
    }
    if (dt > 0 && dt < 80) drag.velocity = drag.velocity * 0.62 + (delta / dt) * 0.38
    drag.lastAngle = angle
    drag.lastTime = now
    applyRotation(rotationRef.current + delta)
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    dragRef.current = null
    setDragging(false)
    if (!drag.moved && drag.index >= 0) {
      const delta = wrapAngle(rotationForBlock(drag.index) - rotationRef.current)
      setPinned(drag.index)
      if (reduceMotion || Math.abs(delta) < 0.03) {
        if (Math.abs(delta) > 0.0001) applyRotation(rotationRef.current + delta)
        setPinned(null)
        resumeIdle()
        return
      }
      beginSpin(delta, 1100 + (Math.abs(delta) / Math.PI) * 1700)
      ensureLoop()
      return
    }
    setPinned(null)
    const idleFor = performance.now() - drag.lastTime
    const velocity = idleFor > 90 ? 0 : Math.max(-0.008, Math.min(0.008, drag.velocity))
    if (reduceMotion || Math.abs(velocity) < 0.00015) {
      const delta = wrapAngle(rotationForBlock(topBlockIndex(rotationRef.current)) - rotationRef.current)
      if (Math.abs(delta) > 0.02 && !reduceMotion) {
        beginSpin(delta, 900)
        ensureLoop()
      } else {
        if (Math.abs(delta) > 0.0001) applyRotation(rotationRef.current + delta)
        resumeIdle()
      }
      return
    }
    motionRef.current.mode = "coast"
    motionRef.current.velocity = velocity
    motionRef.current.lastTime = performance.now()
    ensureLoop()
  }

  return (
    <div className={`relative z-0 mx-auto w-full max-w-5xl ${introDone ? "overflow-hidden" : "overflow-visible"}`}>
      <div className={`mx-auto w-full max-w-[920px] px-6 py-8 ${introDone ? "overflow-hidden" : "overflow-visible"}`}>
        <div
          ref={stageRef}
          className={`relative mx-auto aspect-square w-full touch-none ${dragging ? "cursor-grabbing" : "cursor-grab"} ${introDone ? "" : "pointer-events-none"}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            id="service-detail"
            ref={centerRef}
            role="region"
            aria-label={active.title}
            data-center
            onPointerEnter={() => {
              if (!introDone) return
              hoverRef.current = true
              setCenterHover(true)
            }}
            onPointerLeave={() => {
              hoverRef.current = false
              setCenterHover(false)
            }}
            className={`absolute left-1/2 top-1/2 aspect-square w-[42%] origin-center touch-auto ${centerHover ? "z-40" : "z-10"}`}
            style={{
              opacity: 0,
              transform: "translate(-50%, -50%) scale(0.82)",
            }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 translate-y-3 rounded-full bg-gradient-to-b from-slate-300 via-slate-400 to-slate-700 shadow-[0_16px_18px_rgba(15,23,42,0.38)] dark:from-slate-300 dark:via-slate-500 dark:to-slate-800 dark:shadow-[0_14px_28px_rgba(255,255,255,0.22),0_4px_10px_rgba(255,255,255,0.12)]"
            />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-full border border-white/80 bg-[radial-gradient(circle_at_32%_24%,#ffffff_0%,#f8fafc_36%,#e2e8f0_70%,#94a3b8_100%)] shadow-[inset_0_2px_0_rgba(255,255,255,0.95),inset_0_-22px_28px_rgba(15,23,42,0.18)] dark:border-white/45 dark:bg-[radial-gradient(circle_at_30%_22%,#94a3b8_0%,#475569_28%,#1e293b_62%,#0f172a_100%)] dark:shadow-[inset_0_3px_0_rgba(255,255,255,0.45),inset_0_-24px_34px_rgba(15,23,42,0.55),0_0_24px_rgba(255,255,255,0.08)]">
              <div aria-hidden className="pointer-events-none absolute left-[14%] top-[6%] h-[24%] w-[48%] rounded-full bg-white/80 blur-md dark:bg-white/35" />
              <div aria-hidden className="pointer-events-none absolute inset-x-[10%] bottom-[5%] h-[20%] rounded-full bg-slate-900/10 blur-md dark:bg-white/10" />
              <div ref={scrollRef} tabIndex={0} className="service-scroll absolute inset-[22%] z-10 overflow-y-auto overscroll-contain px-3 py-2 text-center touch-pan-y focus:outline-none">
                <ServiceWriteup key={active.id} service={active} />
              </div>
            </div>
          </div>
          {serviceDetails.map((service, index) => {
            const theta = blockTheta(index, rotation)
            const deg = ((theta + Math.PI / 2) * 180) / Math.PI
            const isTop = index === topIndex
            const isEnlarged = index === enlargedIndex
            const Icon = serviceIcons[service.id]
            return (
              <button
                key={service.id}
                id={service.id}
                ref={(node) => {
                  blockRefs.current[index] = node
                }}
                type="button"
                aria-expanded={isTop}
                aria-controls="service-detail"
                className={`absolute left-1/2 top-1/2 aspect-square w-[26%] scroll-mt-28 will-change-transform ${isEnlarged ? "z-30" : "z-20"}`}
                style={{
                  opacity: 0,
                  transform: `translate3d(calc(-50% + ${Math.cos(theta) * (ORBIT / 100) * STAGE_SIZE * 2.2}px), calc(-50% + ${Math.sin(theta) * (ORBIT / 100) * STAGE_SIZE * 2.2}px), 0) scale(0.78)`,
                }}
              >
                <span className="absolute inset-0">
                <span data-tilt className="absolute inset-0" style={{ transformOrigin: "center center" }}>
                <span
                  className="absolute inset-0 drop-shadow-[11px_16px_6px_rgba(0,0,0,0.72)] dark:drop-shadow-[7px_12px_14px_rgba(255,255,255,0.32)]"
                  style={{
                    transform: `scale(${isEnlarged ? 1.1 : 1})`,
                    transition: reduceMotion ? "none" : "transform 2.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
                  }}
                >
                <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
                  <defs>
                    <linearGradient id={`hex-sheen-${service.id}`} x1="18" y1="6" x2="78" y2="96" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="white" stopOpacity="0.42" />
                      <stop offset="0.42" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id={`hex-sheen-dark-${service.id}`} x1="18" y1="6" x2="78" y2="96" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="white" stopOpacity="0.78" />
                      <stop offset="0.34" stopColor="white" stopOpacity="0.28" />
                      <stop offset="0.62" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id={`hex-face-${service.id}`} x1="28" y1="8" x2="72" y2="96" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor={isEnlarged ? "#ecfeff" : "#f8fafc"} />
                      <stop offset="1" stopColor={isEnlarged ? "#a5f3fc" : "#e2e8f0"} />
                    </linearGradient>
                    <linearGradient id={`hex-face-dark-${service.id}`} x1="28" y1="8" x2="72" y2="96" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor={isEnlarged ? "#67e8f9" : "#cbd5e1"} />
                      <stop offset="0.42" stopColor={isEnlarged ? "#0e7490" : "#475569"} />
                      <stop offset="1" stopColor={isEnlarged ? "#083344" : "#1e293b"} />
                    </linearGradient>
                  </defs>
                  <polygon
                    data-side
                    points={ROUNDED_HEX}
                    transform={`translate(0 ${HEX_DEPTH}) rotate(${deg} 50 50)`}
                    className={isEnlarged ? "fill-cyan-200 dark:fill-slate-200" : "fill-slate-300 dark:fill-slate-300"}
                  />
                  <polygon
                    data-face
                    points={ROUNDED_HEX}
                    transform={`rotate(${deg} 50 50)`}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    fill={`url(#hex-face-${service.id})`}
                    className={`dark:hidden ${isEnlarged ? "stroke-cyan-700" : "stroke-slate-300"}`}
                  />
                  <polygon
                    data-face
                    points={ROUNDED_HEX}
                    transform={`rotate(${deg} 50 50)`}
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    fill={`url(#hex-face-dark-${service.id})`}
                    className={`hidden dark:block ${isEnlarged ? "stroke-cyan-100" : "stroke-white/50"}`}
                  />
                  <polygon data-sheen points={ROUNDED_HEX} transform={`rotate(${deg} 50 50)`} className="dark:hidden" fill={`url(#hex-sheen-${service.id})`} />
                  <polygon data-sheen points={ROUNDED_HEX} transform={`rotate(${deg} 50 50)`} className="hidden dark:block" fill={`url(#hex-sheen-dark-${service.id})`} />
                </svg>
                <span data-turn className="absolute inset-0" style={{ transform: `rotate(${deg}deg)` }}>
                  <span className="absolute inset-0 flex items-center justify-center" style={{ clipPath: polygonClip(ROUNDED_HEX) }}>
                    <span data-upright className="absolute inset-0" style={{ transform: `rotate(${-deg}deg)` }}>
                      <span className="absolute left-1/2 top-[36%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-purple-100 shadow-sm dark:bg-cyan-400/25 dark:shadow-[0_0_14px_rgba(255,255,255,0.25)] md:h-14 md:w-14">
                        <Icon className="h-6 w-6 text-cyan-600 dark:text-cyan-200 md:h-7 md:w-7" />
                      </span>
                      <span className="absolute inset-x-[10%] top-[52%] text-center text-sm font-semibold leading-tight text-slate-900 dark:text-slate-50 md:text-base">{service.title}</span>
                    </span>
                  </span>
                </span>
                </span>
                </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function WhatWeDoStrip() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const loopRef = useRef(0)
  const pausedRef = useRef(false)
  const dragRef = useRef<{ pointerId: number; startX: number; origin: number } | null>(null)
  const copies = 3
  const sequence = Array.from({ length: copies }, () => whatWeDo).flat()

  function measureLoop() {
    const track = trackRef.current
    if (!track || track.children.length < whatWeDo.length * 2) return 0
    const first = track.children[0] as HTMLElement
    const second = track.children[whatWeDo.length] as HTMLElement
    return second.offsetLeft - first.offsetLeft
  }

  function wrapOffset(value: number, loop: number) {
    if (loop <= 0) return 0
    let next = value
    while (next <= -loop) next += loop
    while (next > 0) next -= loop
    return next
  }

  function place(offset: number) {
    const loop = loopRef.current || measureLoop()
    loopRef.current = loop
    const next = wrapOffset(offset, loop)
    offsetRef.current = next
    if (trackRef.current) trackRef.current.style.transform = `translate3d(${next}px, 0, 0)`
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
        place(offsetRef.current - (loop / 36000) * (now - last))
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
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, origin: offsetRef.current }
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Capture can fail for an already-released pointer; the move events still update the strip.
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
    pausedRef.current = false
  }

  return (
    <div
      className="relative w-full cursor-grab touch-none overflow-hidden active:cursor-grabbing"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <div ref={trackRef} className="flex w-max select-none will-change-transform">
        {sequence.map((item, index) => (
          <div key={`${item.title}-${index}`} className="mx-8 w-[260px] shrink-0">
            <h3 className="text-lg font-medium">{item.title}</h3>
            <p className="mt-2 whitespace-normal text-sm leading-relaxed text-slate-600 opacity-90 dark:text-slate-300">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

function EngineeringInsights() {
  const [group, setGroup] = useState(insightGroups[0])
  const articles = insights.filter((item) => item.group === group)

  return (
    <section id="insights" className="relative z-10 scroll-mt-28 py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <motion.div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-cyan-800/30"
            initial={false}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BookOpen className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
          </motion.div>
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-4xl font-bold text-slate-900 dark:text-slate-100"
          >
            Engineering Insights &{" "}
            <span className="bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent dark:from-cyan-600 dark:to-cyan-700">
              Technical Knowledge
            </span>
          </motion.h2>
          <motion.p
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 text-xl text-slate-600 dark:text-slate-400"
          >
            Practical writing on AI engineering, software, automation, and embedded computing.
          </motion.p>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-20 inline-flex max-w-full flex-wrap items-center justify-center gap-1 rounded-full bg-slate-100 px-2 py-1.5 dark:bg-slate-800"
          >
            {insightGroups.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={group === name}
                onClick={() => setGroup(name)}
                className={cn(
                  "relative z-20 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                  group === name
                    ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200",
                )}
              >
                {name}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {articles.map((article, index) => {
            const highlighted = index === 1
            return (
              <motion.div
                key={article.slug}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative flex flex-col rounded-2xl border p-8 transition-all duration-300",
                  highlighted
                    ? "border-cyan-500 bg-slate-100 shadow-xl shadow-cyan-500/10 dark:bg-slate-900"
                    : "border-slate-200 bg-slate-50 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800",
                )}
              >
                <div className="pointer-events-none absolute inset-0 z-0 hidden rounded-2xl bg-gradient-to-r from-cyan-500/20 via-slate-500/20 to-cyan-500/20 opacity-0 blur-xl transition-all duration-500 group-hover:opacity-60 dark:from-cyan-200/20 dark:via-slate-200/20 dark:to-cyan-200/20 sm:block" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        highlighted
                          ? "bg-cyan-600/20 text-cyan-600 dark:text-cyan-400"
                          : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
                      )}
                    >
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{article.title}</h3>
                  </div>
                  <p className="mb-8 flex-grow text-sm text-slate-600 dark:text-slate-400">{article.summary}</p>
                  <Button
                    asChild
                    className={cn(
                      "w-full rounded-xl border-0 font-medium transition-all duration-200",
                      highlighted
                        ? "bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-500 hover:to-cyan-400"
                        : "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600",
                    )}
                  >
                    <Link href={`/insights/${article.slug}`}>Read article</Link>
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function HomeSections() {
  return (
    <>
      <section id="services" className="scroll-mt-28 px-4 py-20">
        <SectionTitle icon={Boxes} title="Our Core" accent="Services" />
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {core.map(({ title, icon: Icon }) => (
            <div
              key={title}
              className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-md dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-800/30 dark:text-cyan-300">
                <Icon className="h-6 w-6" aria-hidden />
              </div>
              <h3 className="text-left text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold">Our Approach</h2>
          <p className="mt-4 text-xl text-slate-600 dark:text-slate-400">
            We believe meaningful progress comes from combining technical knowledge, continuous learning and international collaboration.
          </p>
          <p className="mt-6 text-lg text-slate-700 dark:text-slate-300">
            By bringing together talented individuals and experienced technology professionals, we aim to develop a strong global AI network that creates long-term value for individuals, businesses and the technology industry.
          </p>
          <p className="mt-6 text-lg font-medium text-slate-900 dark:text-slate-100">
            To bring people and technology together, develop new skills, create innovative solutions and build long-term professional relationships.
          </p>
        </div>
      </section>

      <section className="w-full bg-background py-16 text-foreground">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-600 to-pink-600 bg-clip-text text-transparent dark:from-cyan-600 dark:to-cyan-700">
              What We Do
            </span>
          </h2>
        </div>
        <WhatWeDoStrip />
      </section>

      <section className="px-4 py-16 text-center">
        <h2 className="text-4xl font-bold">Let&apos;s Build Something Better.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600 dark:text-slate-400">
          Connecting people, sharing knowledge and creating new possibilities through AI and technology.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Join our growing AI and technology network. We welcome people who are interested in AI, learning new skills and connecting with technology professionals.
        </p>
        <p className="mx-auto mt-4 text-sm font-semibold tracking-[0.2em] text-slate-700 dark:text-slate-300">
          AI TALENT · TECHNOLOGY · COLLABORATION
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild className="rounded-full px-8 py-6 text-lg">
            <a href={contactMailto}>Contact Us</a>
          </Button>
        </div>
      </section>

      <section id="service-details" className="relative z-0 scroll-mt-28 px-4 py-20">
        <SectionTitle icon={Layers} title="Our Engineering" accent="Services">
          <p>We provide AI education, technical mentorship, platform guidance, software development, intelligent automation, and technology consulting.</p>
          <p>Our work connects people, knowledge, and technology across the United States and Taiwan.</p>
        </SectionTitle>
        <EngineeringServiceRing />
      </section>

      <EngineeringInsights />

    </>
  )
}

export function ContactSection() {
  return (
      <section id="contact" className="scroll-mt-28 px-4 py-20">
        <SectionTitle icon={Sparkles} title="Contact" accent="Us">
          <p>Interested in joining our network, learning AI skills, or exploring collaboration?</p>
          <p>
            We welcome messages from individuals and organizations who want to connect with technology professionals, grow through mentorship, or discuss AI and software work.
          </p>
          <p>Share a short note about your interests and goals, and we will follow up when we can.</p>
        </SectionTitle>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h3 className="text-2xl font-semibold">What Can We Help You With?</h3>
            <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
              {helpWith.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-8 text-2xl font-semibold">Prefer Email?</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Reach us at{" "}
              <a href={contactMailto} className="font-medium text-cyan-700 underline underline-offset-2 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300">
                {site.email}
              </a>
              . The contact form below opens your mail app with a ready message.
            </p>
            <h3 className="mt-8 text-2xl font-semibold">Introductory Conversation</h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              If you would like to ask questions before joining or collaborating, we can arrange an online introductory conversation when availability allows.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">
            <h3 className="mb-4 text-2xl font-semibold">Contact Form</h3>
            <InquiryForm />
          </div>
        </div>
      </section>
  )
}
