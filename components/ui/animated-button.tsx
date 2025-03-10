"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "outline" | "gold"
  className?: string
}

export default function AnimatedButton({
  children,
  variant = "default",
  className = "",
  ...props
}: AnimatedButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors"

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    gold: "bg-[#8e7d3f] text-white hover:bg-[#8e7d3f]/90 border border-[#8e7d3f]/30",
  }

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], className)}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

