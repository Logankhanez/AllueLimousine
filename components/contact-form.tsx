"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Une erreur s'est produite")
      }

      // Réinitialiser le formulaire
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      })

      setStatus("success")

      // Réinitialiser le statut après 5 secondes
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error)
      setErrorMessage(error instanceof Error ? error.message : "Une erreur s'est produite")
      setStatus("error")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Prénom et Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border-b border-[#666666] bg-transparent p-2 focus:outline-none focus:border-[#8e7d3f]"
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border-b border-[#666666] bg-transparent p-2 focus:outline-none focus:border-[#8e7d3f]"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="E-mail *"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-b border-[#666666] bg-transparent p-2 focus:outline-none focus:border-[#8e7d3f]"
        />
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full border-b border-[#666666] bg-transparent p-2 focus:outline-none focus:border-[#8e7d3f] resize-none"
        />
      </div>

      {/* Bouton d'envoi */}
      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto bg-[#8e7d3f] text-white px-8 py-2 hover:bg-[#8e7d3f]/90 transition-colors disabled:opacity-70"
        >
          {status === "submitting" ? (
            <span className="flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </span>
          ) : (
            "Envoyer"
          )}
        </button>
      </div>

      {/* Messages de statut */}
      {status === "success" && (
        <div className="flex items-center gap-2 text-green-500 bg-green-50/20 p-3 rounded-md">
          <CheckCircle className="h-5 w-5" />
          <span>Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.</span>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-center gap-2 text-red-500 bg-red-50/20 p-3 rounded-md">
          <AlertCircle className="h-5 w-5" />
          <span>{errorMessage || "Une erreur s'est produite. Veuillez réessayer plus tard."}</span>
        </div>
      )}
    </form>
  )
}

