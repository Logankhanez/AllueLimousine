"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  speed?: number // Valeur entre -1 et 1, négative pour effet inverse
  direction?: "vertical" | "horizontal"
}

export default function ParallaxImage({
  src,
  alt,
  className = "",
  speed = -0.2,
  direction = "vertical",
}: ParallaxImageProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const verticalTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const horizontalTransform = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

  // Calculer la transformation en fonction de la direction
  const transform = direction === "vertical" ? verticalTransform : horizontalTransform

  // Appliquer la transformation à la propriété appropriée
  const motionStyle = direction === "vertical" ? { y: transform } : { x: transform }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={motionStyle} className="w-full h-full">
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
    </div>
  )
}

