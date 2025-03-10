"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 640)
      setIsTablet(width >= 640 && width < 1024)
      setIsDesktop(width >= 1024)
    }

    // Vérifier au chargement
    checkDevice()

    // Vérifier au redimensionnement
    window.addEventListener("resize", checkDevice)

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  return { isMobile, isTablet, isDesktop }
}

