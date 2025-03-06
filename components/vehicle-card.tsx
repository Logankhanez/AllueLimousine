"use client"

import { useState } from "react"
import { Users, Briefcase, Check } from "lucide-react"
import type { Vehicle, ReservationInfo } from "@/lib/types"
import VehicleModal from "./vehicle-modal"
import AnimatedCard from "./motion/animated-card"

interface VehicleCardProps {
  vehicle: Vehicle
  reservationInfo?: ReservationInfo
  index?: number
}

export default function VehicleCard({ vehicle, reservationInfo, index = 0 }: VehicleCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Calculer le prix total si les informations de réservation sont disponibles
  const calculateTotalPrice = () => {
    if (!reservationInfo || !reservationInfo.distance) return null

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

    return totalPrice
  }

  const totalPrice = calculateTotalPrice()

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div onClick={handleCardClick}>
        <AnimatedCard
          index={index}
          className="relative overflow-hidden rounded-lg bg-black/70 backdrop-blur-md p-6 text-white cursor-pointer hover:opacity-95 transition-opacity border border-[#8e7d3f]/30 shadow-lg"
        >
          {/* Ajouter un effet de lueur subtil */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#8e7d3f]/10 via-transparent to-black/50 pointer-events-none" />

          {/* Contenu existant avec z-index pour s'assurer qu'il reste au-dessus du gradient */}
          <div className="relative z-10">
            {/* En-tête de la carte */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <h3 className="text-xl font-bold">{vehicle.name}</h3>
                <span className="text-sm text-zinc-400">{vehicle.type}</span>
              </div>
              <p className="text-sm text-zinc-400">{vehicle.subtitle}</p>
            </div>

            {/* Caractéristiques principales */}
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="text-sm">{vehicle.seats}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span className="text-sm">{vehicle.luggage}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm bg-zinc-700 px-2 py-0.5 rounded">{vehicle.transmission}</span>
              </div>
            </div>

            {/* Image du véhicule */}
            <div className="mb-4 h-64 bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 rounded-lg overflow-hidden border border-[#8e7d3f]/20">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Fonctionnalités supplémentaires */}
            <div className="mb-4">
              {vehicle.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-[#8e7d3f]">
                  <Check className="h-4 w-4" />
                  <span>{feature}</span>
                </div>
              ))}
              {vehicle.features.length > 3 && (
                <div className="text-sm text-zinc-400 mt-1">+{vehicle.features.length - 3} autres fonctionnalités</div>
              )}
            </div>

            {/* Information additionnelle */}
            {vehicle.additionalInfo && (
              <div className="mb-4 text-sm text-zinc-400">
                <span>{vehicle.additionalInfo}</span>
              </div>
            )}

            {/* Prix */}
            <div className="bg-black/40 p-3 rounded-md border border-[#8e7d3f]/20">
              {totalPrice ? (
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#8e7d3f]">{totalPrice.toFixed(2)}</span>
                    <div className="text-sm text-zinc-400">
                      <span>CHF total</span>
                      {reservationInfo?.roundTrip && <span className="ml-1">(aller-retour)</span>}
                    </div>
                  </div>
                  <div className="text-sm text-zinc-400">
                    {reservationInfo?.withDriver ? (
                      <span>
                        {(vehicle.pricePerKm + (vehicle.withDriverSupplement || 0)).toFixed(2)} CHF/km avec chauffeur
                      </span>
                    ) : (
                      <span>{vehicle.pricePerKm.toFixed(2)} CHF/km sans chauffeur</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#8e7d3f]">{vehicle.pricePerKm.toFixed(2)}</span>
                  <div className="text-sm text-zinc-400">
                    <span>CHF /km</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedCard>
      </div>

      <VehicleModal
        vehicle={vehicle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reservationInfo={reservationInfo}
      />
    </>
  )
}

