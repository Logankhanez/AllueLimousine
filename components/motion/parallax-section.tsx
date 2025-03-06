"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  baseVelocity?: number
  direction?: "up" | "down"
}

export default function ParallaxSection({
  children,
  className = "",
  baseVelocity = -5,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const velocity = direction === "up" ? baseVelocity : -baseVelocity
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${velocity * 10}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  )
}

