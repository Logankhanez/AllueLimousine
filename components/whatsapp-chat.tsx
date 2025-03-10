"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X } from "lucide-react"

interface WhatsAppChatProps {
  phoneNumber: string
  message?: string
  position?: "right" | "left"
}

export default function WhatsAppChat({
  phoneNumber,
  message = "Bonjour, j'aimerais avoir plus d'informations sur vos services.",
  position = "right",
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Afficher le bouton après un délai pour ne pas gêner le chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Construire l'URL WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  if (!isVisible) return null

  return (
    <div className={`fixed bottom-6 z-50 flex flex-col items-end ${position === "right" ? "right-6" : "left-6"}`}>
      {isOpen && (
        <div className="mb-4 w-72 rounded-lg bg-white shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between bg-[#25D366] p-4 text-white rounded-t-lg">
            <div className="flex items-center">
              <div className="mr-2 h-10 w-10 overflow-hidden rounded-full bg-white p-1">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/whatsapp-logo-png-2261-Ow9Nt9Yd9Nt9Yd.png"
                  alt="WhatsApp Logo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold">Allure Limousine</h3>
                <p className="text-xs">En ligne | Réponse rapide</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-[#128C7E] transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4">
            <p className="mb-4 text-sm text-gray-700">Bonjour 👋 Comment pouvons-nous vous aider aujourd'hui?</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg bg-[#25D366] py-2 text-center font-medium text-white hover:bg-[#128C7E] transition-colors"
            >
              Démarrer la conversation
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-14 w-14 items-center justify-center rounded-full ${
          isOpen ? "bg-red-500" : "bg-[#25D366]"
        } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  )
}

