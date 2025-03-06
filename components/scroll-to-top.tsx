"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant instead of smooth for immediate effect
    })
  }, [pathname]) // Re-run when pathname changes

  return null
}

