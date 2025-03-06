"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, Loader2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useChatStorage } from "@/hooks/use-chat-storage"
import WhatsAppLogo from "./whatsapp-logo"

interface WhatsAppChatProps {
  adminWhatsAppNumber: string // Format: "41791234567" (sans le +)
  adminName?: string
}

export default function WhatsAppChat({ adminWhatsAppNumber, adminName = "Allure Limousine" }: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const { messages, user, addMessage, setUserInfo, clearChat } = useChatStorage()
  const [showUserForm, setShowUserForm] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Check if user info is already available
  useEffect(() => {
    if (user) {
      setShowUserForm(false)
      setUserName(user.name)
      setUserEmail(user.email)
    }
  }, [user])

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  const handleSubmitUserInfo = (e: React.FormEvent) => {
    e.preventDefault()
    if (userName && userEmail) {
      setUserInfo(userName, userEmail)
      setShowUserForm(false)
      addMessage(`Merci ${userName}. Comment puis-je vous aider ?`, "admin")
    }
  }

  // Fonction pour envoyer un message à WhatsApp sans redirection
  const sendToWhatsApp = (text: string) => {
    // S'assurer que le numéro est au bon format (sans le +)
    const formattedNumber = adminWhatsAppNumber.startsWith("+") ? adminWhatsAppNumber.substring(1) : adminWhatsAppNumber

    // Format the message for WhatsApp
    const whatsappMessage = encodeURIComponent(`Message de ${userName} (${userEmail}):

${text}`)

    // Créer l'URL WhatsApp
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}&text=${whatsappMessage}`

    // Utiliser un fetch pour envoyer une notification (méthode alternative)
    fetch("/api/notify-whatsapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: formattedNumber,
        message: `Message de ${userName} (${userEmail}):

${text}`,
        userName,
        userEmail,
      }),
    }).catch((error) => console.error("Erreur lors de la notification WhatsApp:", error))

    // Log pour débogage
    console.log(`Message envoyé à WhatsApp: ${whatsappUrl}`)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = message.trim()

    // Add user message to chat
    addMessage(userMessage, "user")

    // Clear input
    setMessage("")

    // Simulate processing
    setIsSubmitting(true)

    // Envoyer le message à WhatsApp en arrière-plan
    sendToWhatsApp(userMessage)

    // Simulate a delay before responding
    setTimeout(() => {
      // Add admin response
      addMessage(
        "Merci pour votre message. Notre équipe va le traiter dans les plus brefs délais. Avez-vous d'autres questions?",
        "admin",
      )

      setIsSubmitting(false)
    }, 1000)
  }

  // Fonction pour la redirection WhatsApp (pour le bouton)
  const redirectToWhatsApp = () => {
    // S'assurer que le numéro est au bon format (sans le +)
    const formattedNumber = adminWhatsAppNumber.startsWith("+") ? adminWhatsAppNumber.substring(1) : adminWhatsAppNumber

    // Format the message for WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Message de ${userName} (${userEmail}):

${messages
  .filter((msg) => msg.sender === "user")
  .map((msg) => msg.text)
  .join("\n\n")}`,
    )

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${whatsappMessage}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full w-16 h-16 shadow-lg ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-[#25D366] hover:bg-[#128C7E]"
        }`}
      >
        {isOpen ? <X size={24} className="text-white" /> : <WhatsAppLogo size={32} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          {/* Chat header */}
          <div className="bg-[#8e7d3f] text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{adminName}</h3>
              <p className="text-xs opacity-80">Connecté à WhatsApp</p>
            </div>
            {!showUserForm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-white hover:bg-[#8e7d3f]/80"
                title="Effacer la conversation"
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>

          {/* User info form */}
          {showUserForm ? (
            <div className="p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">
                Veuillez fournir vos informations pour commencer la conversation.
              </p>
              <form onSubmit={handleSubmitUserInfo} className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8e7d3f] focus:border-[#8e7d3f]"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#8e7d3f] focus:border-[#8e7d3f]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#8e7d3f] hover:bg-[#8e7d3f]/90">
                  Commencer la discussion
                </Button>
              </form>
            </div>
          ) : (
            <>
              {/* Chat messages */}
              <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`mb-3 max-w-[80%] ${msg.sender === "user" ? "ml-auto" : "mr-auto"}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-[#8e7d3f] text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className={`text-xs mt-1 ${msg.sender === "user" ? "text-right" : "text-left"} text-gray-500`}>
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />

                {/* WhatsApp redirect button */}
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={redirectToWhatsApp}
                    className="bg-[#25D366] hover:bg-[#128C7E] text-white text-xs flex items-center gap-2"
                    size="sm"
                  >
                    <WhatsAppLogo size={16} />
                    Continuer sur WhatsApp
                  </Button>
                </div>
              </div>

              {/* Chat input */}
              <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-[#8e7d3f] focus:border-[#8e7d3f]"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  className="bg-[#8e7d3f] hover:bg-[#8e7d3f]/90 rounded-l-none"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </form>
            </>
          )}
        </div>
      )}

      {/* Iframe caché pour les communications WhatsApp */}
      <iframe ref={iframeRef} style={{ display: "none" }} title="whatsapp-communication" />
    </div>
  )
}

