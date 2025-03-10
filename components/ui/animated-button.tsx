"use client"

import type React from "react"

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Utilisons une interface simple sans étendre les props HTML
interface AnimatedButtonProps {
  children: React.ReactNode
  variant?: "default" | "outline" | "gold"
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

// Créons un composant simple sans essayer de passer toutes les props possibles
const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = "default", className = "", onClick, type = "button", disabled = false }, ref) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors"

    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      gold: "bg-[#8e7d3f] text-white hover:bg-[#8e7d3f]/90 border border-[#8e7d3f]/30",
    }

    // Animation simplifiée
    const animations = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3 },
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        type={type}
        disabled={disabled}
        onClick={onClick}
        initial={animations.initial}
        animate={animations.animate}
        transition={animations.transition}
        whileHover={animations.whileHover}
        whileTap={animations.whileTap}
      >
        {children}
      </motion.button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"

export default AnimatedButton




