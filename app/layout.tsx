import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/nav-bar"
import ScrollToTop from "@/components/scroll-to-top"
import PageTransition from "@/components/motion/page-transition"
import WhatsAppChat from "@/components/whatsapp-chat"

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
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`overflow-x-hidden ${playfairDisplay.className}`}>
        <ScrollToTop />
        <NavBar />
        <div className="pt-[70px]">
          <PageTransition>{children}</PageTransition>
        </div>
        <WhatsAppChat adminWhatsAppNumber="41791234567" adminName="Allure Limousine" />
      </body>
    </html>
  )
}



import './globals.css'