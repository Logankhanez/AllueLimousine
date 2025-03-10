"use client"

import type { ReactNode } from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

// Définir les props spécifiques à notre composant
interface AnimatedButtonProps {
  children: ReactNode
  variant?: "default" | "outline" | "gold"
  className?: string
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  onClick?: () => void
}

export default function AnimatedButton({
  children,
  variant = "default",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors"

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    gold: "bg-[#8e7d3f] text-white hover:bg-[#8e7d3f]/90 border border-[#8e7d3f]/30",
  }

  // Définir les animations Framer Motion séparément
  const motionProps: HTMLMotionProps<"button"> = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}


