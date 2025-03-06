"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Users,
  Briefcase,
  DoorOpen,
  Info,
  MapPin,
  Phone,
  Mail,
  User,
  Check,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react"
import type { Vehicle, ReservationInfo } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface VehicleModalProps {
  vehicle: Vehicle
  isOpen: boolean
  onClose: () => void
  reservationInfo?: ReservationInfo
}

export default function VehicleModal({ vehicle, isOpen, onClose, reservationInfo }: VehicleModalProps) {
  // États pour le formulaire
  const [step, setStep] = useState<"details" | "form" | "confirmation" | "error">("details")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    paymentOption: "best-price",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reservationRef, setReservationRef] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Vérifier si vehicle est défini
  if (!vehicle) {
    return null
  }

  // Calculer le prix total
  const calculateTotalPrice = () => {
    if (!reservationInfo || !reservationInfo.distance || !vehicle) return null

    let pricePerKm = vehicle.pricePerKm

    // Ajouter le supplément chauffeur si applicable
    if (reservationInfo.withDriver && vehicle.withDriverSupplement) {
      pricePerKm += vehicle.withDriverSupplement
    }

    // Calculer le prix de base pour un aller simple
    let totalPrice = pricePerKm * reservationInfo.distance

    // Doubler le prix si c'est un aller-retour
    if (reservationInfo.roundTrip) {
      totalPrice *= 2
    }

    // Ajouter un supplément pour l'option "flexible" si sélectionnée
    if (formData.paymentOption === "flexible") {
      return totalPrice * 1.1 // +10% pour l'option flexible
    }

    return totalPrice
  }

  const totalPrice = calculateTotalPrice()

  // Gérer les changements dans le formulaire
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Gérer le changement d'option de paiement
  const handlePaymentOptionChange = (option: string) => {
    setFormData((prev) => ({ ...prev, paymentOption: option }))
  }

  // Soumettre le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Préparer les données pour l'API
      const reservationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message || "Aucun message",
        vehicle: vehicle.name,
        vehicleType: vehicle.type,
        withDriver: reservationInfo?.withDriver || false,
        roundTrip: reservationInfo?.roundTrip || false,
        pickup: reservationInfo?.pickup || null,
        dropoff: reservationInfo?.dropoff || reservationInfo?.pickup || null,
        distance: reservationInfo?.distance || null,
        totalPrice: totalPrice,
        paymentOption: formData.paymentOption,
      }

      console.log("Envoi des données de réservation:", reservationData)

      // Envoyer les données à notre API
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'envoi du formulaire")
      }

      console.log("Réponse de l'API:", data)

      // Stocker la référence de réservation
      setReservationRef(data.reference || "")

      // Passer à l'étape de confirmation
      setStep("confirmation")
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error)
      setErrorMessage(
        error instanceof Error ? error.message : "Une erreur s'est produite lors de l'envoi du formulaire",
      )
      setStep("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Réinitialiser le modal lors de la fermeture
  const handleClose = () => {
    setStep("details")
    setErrorMessage("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      {/* Contenu du modal avec fond dégradé */}
      <DialogContent className="sm:max-w-[600px] bg-black/70 backdrop-blur-md text-white border border-[#8e7d3f]/30 shadow-lg">
        {step === "details" && (
          <div className="relative">
            {/* En-tête du modal */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{vehicle.name}</h2>
              <p className="text-sm text-gray-400">{vehicle.type}</p>
              <p className="text-xs text-gray-300">{vehicle.subtitle}</p>
            </div>

            {/* Image du véhicule */}
            <div className="relative mb-6 h-64 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 rounded-lg overflow-hidden border border-[#8e7d3f]/20">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="h-full w-full object-contain"
              />
              {/* Ajouter un effet de lueur subtil */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8e7d3f]/10 via-transparent to-black/50 pointer-events-none" />
            </div>

            {/* Options de paiement */}
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold">Options de paiement</h3>
              <div className="space-y-4">
                {/* Option: Meilleur prix */}
                <div className="flex items-center justify-between rounded-lg border border-[#8e7d3f]/20 p-4 bg-black/40">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        id="best-price"
                        className="h-4 w-4 border-gray-300 text-[#8e7d3f] focus:ring-[#8e7d3f]"
                        checked={formData.paymentOption === "best-price"}
                        onChange={() => handlePaymentOptionChange("best-price")}
                      />
                      <label htmlFor="best-price" className="font-medium">
                        Meilleur prix
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-400 ml-6">
                      Payez maintenant, annulez et modifiez moyennant des frais
                    </p>
                  </div>
                  <span className="text-sm font-medium">Inclus</span>
                </div>

                {/* Option: Restez flexible */}
                <div className="flex items-center justify-between rounded-lg border border-[#8e7d3f]/20 p-4 bg-black/40">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="payment"
                        id="flexible"
                        className="h-4 w-4 border-gray-300 text-[#8e7d3f] focus:ring-[#8e7d3f]"
                        checked={formData.paymentOption === "flexible"}
                        onChange={() => handlePaymentOptionChange("flexible")}
                      />
                      <label htmlFor="flexible" className="font-medium">
                        Restez flexible
                      </label>
                      <span className="rounded-full bg-[#8e7d3f] px-2 py-1 text-xs text-white border border-[#8e7d3f]/50">
                        Populaire
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-400 ml-6">
                      Payez à la prise en charge, annulez et modifiez gratuitement avant l&apos;heure de la prise en
                      charge
                    </p>
                  </div>
                  <span className="text-sm font-medium">+ 10%</span>
                </div>
              </div>
            </div>

            {/* Kilométrage */}
            <div className="mb-6">
              <h3 className="mb-4 text-lg font-semibold">Kilométrage</h3>
              <div className="rounded-lg border border-[#8e7d3f]/20 p-4 bg-black/40">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Kilomètres illimités</p>
                    <p className="text-sm text-gray-400">Tous les kilomètres sont inclus dans le prix</p>
                  </div>
                  <span className="text-sm font-medium">Inclus</span>
                </div>
              </div>
            </div>

            {/* Détails de la réservation si disponibles */}
            {reservationInfo && reservationInfo.pickup && (
              <div className="mb-6 border rounded-lg p-4 bg-black/40 border-[#8e7d3f]/20">
                <h3 className="text-lg font-semibold mb-3">Détails de votre trajet</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#8e7d3f] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Lieu de prise en charge</p>
                      <p className="text-sm text-gray-300">{reservationInfo.pickup}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#8e7d3f] mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Lieu de destination</p>
                      <p className="text-sm text-gray-300">{reservationInfo.dropoff || reservationInfo.pickup}</p>
                    </div>
                  </div>

                  {reservationInfo.roundTrip && (
                    <div className="flex items-start gap-3">
                      <ArrowRight className="h-5 w-5 text-[#8e7d3f] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Type de trajet</p>
                        <p className="text-sm text-gray-300">Aller-retour</p>
                      </div>
                    </div>
                  )}

                  {reservationInfo.distance && (
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-[#8e7d3f] mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Distance estimée</p>
                        <p className="text-sm text-gray-300">
                          {reservationInfo.roundTrip
                            ? `${reservationInfo.distance * 2} km (aller-retour)`
                            : `${reservationInfo.distance} km (aller simple)`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Caractéristiques du véhicule */}
            <div className="mb-6 grid grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-300" />
                <span className="text-sm">{vehicle.seats} Sièges</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-gray-300" />
                <span className="text-sm">{vehicle.luggage} Bagages</span>
              </div>
              <div className="flex items-center gap-2">
                <DoorOpen className="h-5 w-5 text-gray-300" />
                <span className="text-sm">{vehicle.doors} Portes</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-gray-300" />
                <span className="text-sm">{vehicle.minAge} ans min.</span>
              </div>
            </div>

            {/* Information additionnelle */}
            {vehicle.additionalInfo && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Information additionnelle</h3>
                <p className="text-sm">{vehicle.additionalInfo}</p>
              </div>
            )}

            {/* Prix par kilomètre et bouton d'action */}
            <div className="flex items-center justify-between border-t pt-6">
              <div>
                {totalPrice ? (
                  <div>
                    <p className="text-2xl font-bold">{totalPrice.toFixed(2)} CHF</p>
                    <p className="text-sm text-gray-400">
                      {reservationInfo?.withDriver ? (
                        <span>
                          {(vehicle.pricePerKm + (vehicle.withDriverSupplement || 0)).toFixed(2)} CHF/km avec chauffeur
                        </span>
                      ) : (
                        <span>{vehicle.pricePerKm.toFixed(2)} CHF/km sans chauffeur</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl font-bold">{vehicle.pricePerKm.toFixed(2)} CHF /km</p>
                )}
              </div>
              <Button
                className="rounded-lg bg-[#8e7d3f] px-6 py-2 text-white hover:bg-[#8e7d3f]/90 transition-colors"
                onClick={() => setStep("form")}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}

        {step === "form" && (
          <div className="relative">
            <h2 className="text-2xl font-bold mb-6">Finaliser votre réservation</h2>

            {/* Résumé de la réservation */}
            <div className="mb-6 p-4 bg-black/40 rounded-lg border border-[#8e7d3f]/20">
              <h3 className="text-lg font-semibold mb-2">Résumé</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Véhicule:</span> {vehicle.name}
                </p>
                {reservationInfo && (
                  <>
                    <p className="text-sm">
                      <span className="font-medium">Service:</span>{" "}
                      {reservationInfo.withDriver ? "Avec chauffeur" : "Sans chauffeur"}
                    </p>
                    {reservationInfo.pickup && (
                      <p className="text-sm">
                        <span className="font-medium">Trajet:</span> {reservationInfo.pickup} à{" "}
                        {reservationInfo.dropoff || reservationInfo.pickup}
                      </p>
                    )}
                    {totalPrice && (
                      <p className="text-sm">
                        <span className="font-medium">Prix total:</span> {totalPrice.toFixed(2)} CHF
                        {reservationInfo?.roundTrip && <span className="text-sm text-gray-300"> (aller-retour)</span>}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Formulaire de contact */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    Prénom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 bg-black/60 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Nom
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="pl-10 bg-black/60 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 bg-black/60 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="pl-10 bg-black/60 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message (optionnel)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Informations supplémentaires, demandes spéciales..."
                  className="bg-black/60 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                  rows={3}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("details")}
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Retour
                </Button>
                <Button type="submit" className="bg-[#8e7d3f] text-white hover:bg-[#8e7d3f]/90" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    "Réserver maintenant"
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}

        {step === "confirmation" && (
          <div className="relative text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-500 p-3">
                <Check className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Réservation confirmée !</h2>
            <p className="text-gray-300 mb-6">
              Merci pour votre réservation. Un email de confirmation a été envoyé à {formData.email}. Notre équipe vous
              contactera prochainement pour finaliser les détails.
            </p>

            {/* Résumé de la réservation */}
            <div className="mb-6 p-4 bg-gray-800 rounded-lg text-left">
              <h3 className="text-lg font-semibold mb-2">Détails de la réservation</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Référence:</span> {reservationRef}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Véhicule:</span> {vehicle.name}
                </p>
                {reservationInfo && (
                  <>
                    <p className="text-sm">
                      <span className="font-medium">Service:</span>{" "}
                      {reservationInfo.withDriver ? "Avec chauffeur" : "Sans chauffeur"}
                    </p>
                    {reservationInfo.pickup && (
                      <p className="text-sm">
                        <span className="font-medium">Trajet:</span> {reservationInfo.pickup} à{" "}
                        {reservationInfo.dropoff || reservationInfo.pickup}
                      </p>
                    )}
                    {totalPrice && (
                      <p className="text-sm">
                        <span className="font-medium">Prix total:</span> {totalPrice.toFixed(2)} CHF
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <Button onClick={handleClose} className="bg-[#8e7d3f] text-white hover:bg-[#8e7d3f]/90">
              Fermer
            </Button>
          </div>
        )}

        {step === "error" && (
          <div className="relative text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-red-500 p-3">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Une erreur est survenue</h2>
            <p className="text-gray-300 mb-6">
              {errorMessage || "Nous n'avons pas pu traiter votre réservation. Veuillez réessayer ultérieurement."}
            </p>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => setStep("form")}
                className="border-gray-600 text-white hover:bg-gray-700"
              >
                Retour au formulaire
              </Button>
              <Button onClick={handleClose} className="bg-[#8e7d3f] text-white hover:bg-[#8e7d3f]/90">
                Fermer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

