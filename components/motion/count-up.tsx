"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  className?: string
  once?: boolean
  threshold?: number
  easing?: (t: number) => number
}

// Fonction d'easing par défaut (easeOutExpo)
const defaultEasing = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export default function CountUp({
  end,
  start = 0,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = ",",
  className = "",
  once = true,
  threshold = 0.1,
  easing = defaultEasing,
}: CountUpProps) {
  const [count, setCount] = useState(start)
  const [ref, inView] = useInView({ threshold, triggerOnce: once })
  const countRef = useRef<{ start: number; end: number; duration: number; startTime: number | null }>({
    start,
    end,
    duration: duration * 1000, // Convertir en millisecondes
    startTime: null,
  })
  const frameRef = useRef<number>(0)

  // Formater le nombre avec séparateur et décimales
  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals)
    const parts = fixed.toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    return prefix + parts.join(".") + suffix
  }

  useEffect(() => {
    let delayTimeout: NodeJS.Timeout

    if (inView) {
      // Appliquer le délai si nécessaire
      if (delay > 0) {
        delayTimeout = setTimeout(() => {
          countRef.current = {
            ...countRef.current,
            start,
            end,
            startTime: null,
          }

          const animate = (timestamp: number) => {
            if (!countRef.current.startTime) {
              countRef.current.startTime = timestamp
            }

            const elapsed = timestamp - countRef.current.startTime
            const progress = Math.min(elapsed / countRef.current.duration, 1)
            const easedProgress = easing(progress)

            const currentCount =
              countRef.current.start + (countRef.current.end - countRef.current.start) * easedProgress
            setCount(currentCount)

            if (progress < 1) {
              frameRef.current = requestAnimationFrame(animate)
            }
          }

          frameRef.current = requestAnimationFrame(animate)
        }, delay * 1000)
      } else {
        countRef.current = {
          ...countRef.current,
          start,
          end,
          startTime: null,
        }

        const animate = (timestamp: number) => {
          if (!countRef.current.startTime) {
            countRef.current.startTime = timestamp
          }

          const elapsed = timestamp - countRef.current.startTime
          const progress = Math.min(elapsed / countRef.current.duration, 1)
          const easedProgress = easing(progress)

          const currentCount = countRef.current.start + (countRef.current.end - countRef.current.start) * easedProgress
          setCount(currentCount)

          if (progress < 1) {
            frameRef.current = requestAnimationFrame(animate)
          }
        }

        frameRef.current = requestAnimationFrame(animate)
      }
    }

    return () => {
      if (delayTimeout) clearTimeout(delayTimeout)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [inView, start, end, duration, delay, easing])

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}
    </span>
  )
}

