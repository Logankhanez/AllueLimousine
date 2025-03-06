"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate"
  duration?: number
  delay?: number
  once?: boolean
  className?: string
  threshold?: number
}

export default function AnimateOnScroll({
  children,
  animation = "fadeIn",
  duration = 0.5,
  delay = 0,
  once = true,
  className = "",
  threshold = 0.1,
}: AnimateOnScrollProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold, triggerOnce: once })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration, delay } },
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration, delay } },
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0, transition: { duration, delay } },
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0, transition: { duration, delay } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration, delay } },
    },
    rotate: {
      hidden: { opacity: 0, rotate: -5 },
      visible: { opacity: 1, rotate: 0, transition: { duration, delay } },
    },
  }

  // Si nous sommes côté serveur ou si le client n'est pas encore initialisé, retourner les enfants sans animation
  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={animations[animation]} className={className}>
      {children}
    </motion.div>
  )
}

