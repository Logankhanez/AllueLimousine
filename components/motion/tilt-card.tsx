"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

interface TiltCardProps {
  children: ReactNode
  className?: string
  perspective?: number
  scale?: number
  speed?: number
  max?: number
  glareOpacity?: number
  border?: boolean
  borderColor?: string
  shadow?: boolean
  disabled?: boolean
}

export default function TiltCard({
  children,
  className = "",
  perspective = 1000,
  scale = 1.05,
  speed = 500,
  max = 15,
  glareOpacity = 0.2,
  border = false,
  borderColor = "#8e7d3f",
  shadow = true,
  disabled = false,
}: TiltCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const zero = useMotionValue(0)
  const maxMotion = useMotionValue(max)

  // Spring animations
  const springConfig = { damping: 15, stiffness: 150 }
  const springRotateX = useSpring(zero, springConfig)
  const springRotateY = useSpring(zero, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX)
    y.set(mouseY)

    springRotateX.set(calculateRotation(y.get(), -300, 300, maxMotion.get(), -maxMotion.get()))
    springRotateY.set(calculateRotation(x.get(), -300, 300, -maxMotion.get(), maxMotion.get()))
  }

  const calculateRotation = (
    value: number,
    minInput: number,
    maxInput: number,
    minOutput: number,
    maxOutput: number,
  ): number => {
    const clampedValue = Math.max(minInput, Math.min(maxInput, value))
    const inputRange = maxInput - minInput
    const outputRange = maxOutput - minOutput
    return ((clampedValue - minInput) / inputRange) * outputRange + minOutput
  }

  const handleMouseEnter = () => {
    if (disabled) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    if (disabled) return
    setIsHovered(false)
    x.set(0)
    y.set(0)
    springRotateX.set(0)
    springRotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isHovered ? scale : 1,
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <motion.div
        className={`w-full h-full ${border ? `border-2 border-[${borderColor}]` : ""} ${shadow ? "shadow-lg" : ""}`}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transition: `transform ${speed}ms ease-out`,
        }}
      >
        {children}

        {/* Effet de reflet */}
        {isHovered && !disabled && (
          <motion.div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              background: `linear-gradient(
                ${calculateGlareAngle(springRotateX.get(), maxMotion.get())}deg,
                rgba(255, 255, 255, ${glareOpacity}) 0%,
                rgba(255, 255, 255, 0) 80%
              )`,
              borderRadius: "inherit",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )

  function calculateGlareAngle(rotateX: number, max: number): number {
    const normalizedRotation = rotateX / max
    return 135 + normalizedRotation * 90
  }
}

