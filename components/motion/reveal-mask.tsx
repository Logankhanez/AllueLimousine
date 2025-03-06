"use client"

import type { ReactNode } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface RevealMaskProps {
  children: ReactNode
  className?: string
  direction?: "left" | "right" | "top" | "bottom"
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
  maskColor?: string
}

export default function RevealMask({
  children,
  className = "",
  direction = "left",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  maskColor = "#8e7d3f",
}: RevealMaskProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once,
    amount: threshold, // Utiliser 'amount' au lieu de 'threshold'
  })

  // Définir les animations en fonction de la direction
  const getVariants = () => {
    const variants = {
      left: {
        initial: { width: "100%" },
        animate: { width: "0%" },
        exit: { width: "100%" },
      },
      right: {
        initial: { width: "100%" },
        animate: { width: "0%" },
        exit: { width: "100%" },
      },
      top: {
        initial: { height: "100%" },
        animate: { height: "0%" },
        exit: { height: "100%" },
      },
      bottom: {
        initial: { height: "100%" },
        animate: { height: "0%" },
        exit: { height: "100%" },
      },
    }

    return variants[direction]
  }

  // Définir la position du masque en fonction de la direction
  const getMaskPosition = () => {
    const positions = {
      left: { right: 0 },
      right: { left: 0 },
      top: { bottom: 0 },
      bottom: { top: 0 },
    }

    return positions[direction]
  }

  const variants = getVariants()
  const maskPosition = getMaskPosition()

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute z-10"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: maskColor,
          ...maskPosition,
        }}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        exit="exit"
        variants={variants}
        transition={{
          duration,
          delay,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

