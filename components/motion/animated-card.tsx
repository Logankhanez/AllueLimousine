"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  index?: number
}

export default function AnimatedCard({ children, className = "", index = 0 }: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      whileHover={{
        y: -10,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  )
}

