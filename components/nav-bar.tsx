"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Logo from "./logo"

export default function NavBar() {
  const pathname = usePathname()
  const [isFlotteOpen, setIsFlotteOpen] = useState(false)
  // Ajouter un état pour suivre le défilement
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fermer le menu déroulant lorsqu'on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFlotteOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Ajouter un effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      // Changer l'état lorsque la page est défilée (au-delà de 50px)
      setIsScrolled(window.scrollY > 50)
    }

    // Ajouter l'écouteur d'événement
    window.addEventListener("scroll", handleScroll)

    // Vérifier l'état initial
    handleScroll()

    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Vérifier si la page actuelle est liée à la flotte
  const isFlottePage =
    pathname === "/flotte" || pathname === "/flotte/avec-chauffeur" || pathname === "/flotte/sans-chauffeur"

  // Modifier les classes des liens pour utiliser la couleur blanche lorsque la page est défilée
  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        className={`flex items-center backdrop-blur-sm border-b-[4px] border-[#8e7d3f] shadow-[0_4px_4px_-2px_rgba(142,125,63,0.3)] transition-all duration-300 bg-transparent`}
      >
        <div className="flex h-[70px] min-w-[240px] items-center justify-center px-4">
          <Link href="/" className="flex items-center">
            <Logo className="h-20 w-auto" />
          </Link>
        </div>
        <div className="mx-auto flex gap-4 sm:gap-8 md:gap-12 px-2 sm:px-4">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-[#8e7d3f]" : isScrolled ? "text-white" : "text-black"
            } hover:text-[#8e7d3f] transition-colors text-sm sm:text-base tracking-wider whitespace-nowrap font-bold text-shadow-md`}
          >
            ACCUEIL
          </Link>
          <Link
            href="/services"
            className={`${
              pathname === "/services" ? "text-[#8e7d3f]" : isScrolled ? "text-white" : "text-black"
            } hover:text-[#8e7d3f] transition-colors text-sm sm:text-base tracking-wider whitespace-nowrap font-bold text-shadow-md`}
          >
            SERVICES
          </Link>
          <Link
            href="/transport"
            className={`${
              pathname === "/transport" ? "text-[#8e7d3f]" : isScrolled ? "text-white" : "text-black"
            } hover:text-[#8e7d3f] transition-colors text-sm sm:text-base tracking-wider whitespace-nowrap font-bold text-shadow-md`}
          >
            TRANSPORT
          </Link>

          {/* Menu déroulant pour Flotte */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsFlotteOpen(!isFlotteOpen)}
              className={`${
                isFlottePage ? "text-[#8e7d3f]" : isScrolled ? "text-white" : "text-black"
              } hover:text-[#8e7d3f] transition-colors text-sm sm:text-base tracking-wider whitespace-nowrap flex items-center font-bold text-shadow-md`}
            >
              FLOTTE
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isFlotteOpen ? "rotate-180" : ""}`} />
            </button>

            {isFlotteOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-black/90 backdrop-blur-md border border-[#8e7d3f] shadow-lg z-50 rounded-md overflow-hidden">
                <Link
                  href="/flotte"
                  className={`${
                    pathname === "/flotte" ? "text-[#8e7d3f]" : "text-white"
                  } hover:text-[#8e7d3f] hover:bg-black/50 transition-colors block px-4 py-2 text-sm font-medium`}
                  onClick={() => setIsFlotteOpen(false)}
                >
                  Tous les véhicules
                </Link>
                <Link
                  href="/flotte/avec-chauffeur"
                  className={`${
                    pathname === "/flotte/avec-chauffeur" ? "text-[#8e7d3f]" : "text-white"
                  } hover:text-[#8e7d3f] hover:bg-black/50 transition-colors block px-4 py-2 text-sm font-medium`}
                  onClick={() => setIsFlotteOpen(false)}
                >
                  Avec chauffeur
                </Link>
                <Link
                  href="/flotte/sans-chauffeur"
                  className={`${
                    pathname === "/flotte/sans-chauffeur" ? "text-[#8e7d3f]" : "text-white"
                  } hover:text-[#8e7d3f] hover:bg-black/50 transition-colors block px-4 py-2 text-sm font-medium`}
                  onClick={() => setIsFlotteOpen(false)}
                >
                  Sans chauffeur
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/contact"
            className={`${
              pathname === "/contact" ? "text-[#8e7d3f]" : isScrolled ? "text-white" : "text-black"
            } hover:text-[#8e7d3f] transition-colors text-sm sm:text-base tracking-wider whitespace-nowrap font-bold text-shadow-md`}
          >
            CONTACT
          </Link>
        </div>
        {/* This empty div helps center the navigation links */}
        <div className="min-w-[90px] px-4" />
      </div>
    </nav>
  )
}

