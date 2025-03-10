"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { vehicles } from "@/lib/types"
import VehicleCard from "@/components/vehicle-card"
import { Loader2 } from "lucide-react"
import { calculateDistance } from "@/lib/distance"

export default function FlotteSansChauffeurPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [distance, setDistance] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Récupérer les paramètres de recherche
  const pickupLocation = searchParams.get("pickup")
  const dropoffLocation = searchParams.get("dropoff")
  const roundTrip = searchParams.get("roundTrip") === "true"

  // Filtrer les véhicules pour la page "Sans chauffeur"
  // Range Rover Vogue, Range Rover Defender, Mercedes CLA, Mercedes Classe V
  const availableVehicles = vehicles.filter((vehicle) =>
    ["Range Rover Vogue", "Range Rover Defender", "Mercedes CLA", "Mercedes Classe V"].includes(vehicle.name),
  )

  // Calculer la distance entre les deux points
  useEffect(() => {
    async function getDistance() {
      if (!pickupLocation || !dropoffLocation) {
        setDistance(null)
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Utiliser notre fonction améliorée pour calculer la distance
        const calculatedDistance = await calculateDistance(pickupLocation, dropoffLocation)

        if (calculatedDistance === null) {
          throw new Error("Impossible de calculer la distance entre ces deux points")
        }

        setDistance(calculatedDistance)
      } catch (err) {
        console.error("Erreur lors du calcul de la distance:", err)
        setError(err instanceof Error ? err.message : "Une erreur s'est produite lors du calcul de la distance")
        // Valeur par défaut en cas d'erreur
        setDistance(100)
      } finally {
        setIsLoading(false)
      }
    }

    getDistance()
  }, [pickupLocation, dropoffLocation])

  // Passer les informations de réservation aux cartes de véhicules
  const reservationInfo = {
    pickup: pickupLocation,
    dropoff: dropoffLocation,
    distance,
    withDriver: false,
    roundTrip,
  }

  return (
    <main>
      {/* En-tête avec résumé du trajet */}
      <div className="relative py-20">
        {/* Image de fond avec overlay et position ajustée pour montrer davantage le véhicule */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YiW2EvTIhVBVg7mGvnAqRj1SEOFke2.png"
            alt="Mercedes-Benz de luxe devant un palace"
            className="w-full h-full object-cover object-[center_85%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#8e7d3f]/50 to-black/70" />
        </div>

        <div className="container mx-auto px-4">
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Cadre stylisé pour le résumé du trajet */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-[#8e7d3f]/20 p-4 sm:p-8 text-center">
              {/* Badge de type de service */}
              <div className="flex justify-center mb-4">
                <span className="bg-[#8e7d3f] text-white px-4 py-1 rounded-full text-sm uppercase tracking-wider">
                  Sans Chauffeur
                </span>
              </div>

              <h1 className="font-['Georgia'] text-2xl sm:text-3xl md:text-4xl text-white mb-6">
                Détails de votre trajet
              </h1>

              {/* Détails du trajet avec icônes */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-[#8e7d3f]/20 flex items-center justify-center">
                    <span className="text-[#8e7d3f]">A</span>
                  </div>
                  <span className="text-base sm:text-lg font-medium">{pickupLocation}</span>
                </div>

                <div className="h-8 border-l border-[#8e7d3f]/50"></div>

                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-[#8e7d3f]/20 flex items-center justify-center">
                    <span className="text-[#8e7d3f]">B</span>
                  </div>
                  <span className="text-base sm:text-lg font-medium">{dropoffLocation}</span>
                </div>
              </div>

              {/* Informations supplémentaires */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-white/80">
                <div className="bg-black/40 px-4 py-2 rounded-md w-full sm:w-auto">
                  <span className="text-base sm:text-lg">
                    Distance:{" "}
                    <strong className="text-[#8e7d3f]">
                      {roundTrip ? `${distance * 2} km (aller-retour)` : `${distance} km`}
                    </strong>
                  </span>
                </div>

                {roundTrip && (
                  <div className="bg-black/40 px-4 py-2 rounded-md w-full sm:w-auto">
                    <span className="text-base sm:text-lg">
                      Type: <strong className="text-[#8e7d3f]">Aller-retour</strong>
                    </span>
                  </div>
                )}
              </div>

              {error && <p className="mt-4 text-red-400 text-sm bg-black/30 p-2 rounded inline-block">Note: {error}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Section véhicules avec background identique à la section de recherche */}
      <section className="relative py-20 bg-gray-900">
        {/* Image de fond */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kycui4Jr9GMqbLrAZYQpz1CflLPnZP.png"
            alt="Fond de luxe"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
        </div>

        {/* Contenu */}
        <div className="container mx-auto px-4 relative z-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-white" />
              <span className="ml-3 text-white text-lg">Calcul du trajet en cours...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} reservationInfo={reservationInfo} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#8e7d3f] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            {/* Logo et drapeau */}
            <div className="text-center md:text-left">
              <h2 className="font-['Times_New_Roman'] text-4xl md:text-5xl mb-2">Allure</h2>
              <h2 className="font-['Times_New_Roman'] text-4xl md:text-5xl mb-8">Limousine</h2>
              <div className="flex justify-center md:justify-start">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Civil_Ensign_of_Switzerland.svg%20(1)-bPbKC8IbHZNpXYzoIV0F4QaOM6fX9P.png"
                  alt="Drapeau suisse"
                  className="w-16 h-12 object-cover"
                />
              </div>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold mb-4 font-avenir-light">LOCATION & HEURES</h3>
                <p className="text-sm mb-2 font-avenir-light">Chem. des Chalets 5, 1279 Chavannes-de-Bogis</p>
                <p className="text-sm font-avenir-light">Tous les jours également le Week-End 24h/24h</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4 font-avenir-light">CONTACTER NOUS</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>✉</span>
                    <span className="text-sm font-avenir-light">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span className="text-sm font-avenir-light">+41 XXXXXXXXX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm">
            <p className="font-avenir-light">© 2035</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

