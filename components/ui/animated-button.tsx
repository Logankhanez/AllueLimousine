"use client"

import type React from "react"

import type { ReactNode } from "react"
import { motion, type HTMLMotionProps } from "framer-motion" // Import the HTMLMotionProps type
import { cn } from "@/lib/utils"

// Define our component props
interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

  // Extract only the HTML button attributes we want to pass to the motion component
  const { onClick, type, disabled, form, name, value, ...restProps } = props

  // Define the motion props separately
  const motionProps: HTMLMotionProps<"button"> = {
    whileHover: { scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" },
    whileTap: { scale: 0.98 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  }

  return (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      form={form}
      name={name}
      value={value}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}

