import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Nunito_Sans } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/nav-bar"
import ScrollToTop from "@/components/scroll-to-top"
import PageTransition from "@/components/motion/page-transition"

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-nunito-sans",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "A.L Transport",
  description: "Transport services de luxe à Genève",
    generator: 'v0.dev'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`overflow-x-hidden ${playfairDisplay.className} ${nunitoSans.variable}`}>
        <ScrollToTop />
        <NavBar />
        <div className="pt-[70px]">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  )
}



import './globals.css'