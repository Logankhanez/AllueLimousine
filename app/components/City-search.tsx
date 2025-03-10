"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, X, Loader2, ArrowRight, Train, Plane, User, Car, Calendar } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

// Interface pour les résultats de Mapbox
interface MapboxFeature {
  id: string
  place_name: string
  place_type: string[]
  center: number[] // Changed from [number, number] to number[]
  properties?: {
    category?: string
    maki?: string
  }
}

interface MapboxResponse {
  features: MapboxFeature[]
}

// Liste des gares et aéroports suisses prédéfinis
const swissTransportHubs: Array<{
  name: string
  type: string
  coordinates: number[]
}> = [
  // Aéroports
  { name: "Aéroport de Genève (GVA)", type: "airport", coordinates: [6.1092, 46.237] },
  { name: "Aéroport de Zurich (ZRH)", type: "airport", coordinates: [8.5554, 47.4582] },
  { name: "Aéroport de Bâle-Mulhouse (BSL)", type: "airport", coordinates: [7.5291, 47.5989] },
  { name: "Aéroport de Berne (BRN)", type: "airport", coordinates: [7.4969, 46.9141] },
  { name: "Aéroport de Lugano (LUG)", type: "airport", coordinates: [8.9603, 46.0037] },

  // Gares
  { name: "Gare de Genève-Cornavin", type: "train", coordinates: [6.1419, 46.2101] },
  { name: "Gare Centrale de Zurich (HB)", type: "train", coordinates: [8.5402, 47.3782] },
  { name: "Gare de Bâle CFF", type: "train", coordinates: [7.5895, 47.5476] },
  { name: "Gare de Lausanne", type: "train", coordinates: [6.6286, 46.517] },
  { name: "Gare de Berne", type: "train", coordinates: [7.4397, 46.949] },
  { name: "Gare de Lucerne", type: "train", coordinates: [8.3102, 47.0502] },
  { name: "Gare de Lugano", type: "train", coordinates: [8.9513, 46.005] },
  { name: "Gare de Fribourg", type: "train", coordinates: [7.1508, 46.8031] },
  { name: "Gare de Neuchâtel", type: "train", coordinates: [6.9419, 46.999] },
  { name: "Gare de Sion", type: "train", coordinates: [7.3598, 46.2332] },
]

export default function CitySearch() {
  const [pickupQuery, setPickupQuery] = useState("")
  const [dropoffQuery, setDropoffQuery] = useState("")
  const [suggestions, setSuggestions] = useState<MapboxFeature[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [activeField, setActiveField] = useState<"pickup" | "dropoff" | null>(null)
  const [selectedPickup, setSelectedPickup] = useState("")
  const [selectedDropoff, setSelectedDropoff] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [serviceType, setServiceType] = useState<"with-driver" | "without-driver">("with-driver")
  const [isRoundTrip, setIsRoundTrip] = useState(false)

  // État pour les dates (version simplifiée)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const nextWeek = new Date()
  nextWeek.setDate(nextWeek.getDate() + 8)

  const formatDateForInput = useCallback((date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }, [])

  const [startDate, setStartDate] = useState<string>(formatDateForInput(tomorrow))
  const [endDate, setEndDate] = useState<string>(formatDateForInput(nextWeek))

  // Fonction pour formater la date pour l'affichage
  function formatDateForDisplay(dateString: string): string {
    if (!dateString) return ""
    const [year, month, day] = dateString.split("-")
    return `${day}/${month}/${year}`
  }

  const router = useRouter()

  const pickupInputRef = useRef<HTMLInputElement>(null)
  const dropoffInputRef = useRef<HTMLInputElement>(null)
  const pickupContainerRef = useRef<HTMLDivElement>(null)
  const dropoffContainerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Fonction pour rechercher des villes avec debouncing
  const searchCities = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) return

    setIsLoading(true)
    setError(null)

    try {
      const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

      if (!mapboxToken) {
        console.error("Clé API Mapbox manquante dans les variables d'environnement")
        setError("Configuration de l'API manquante. Veuillez contacter l'administrateur.")
        return
      }

      // Recherche dans les hubs de transport suisses prédéfinis
      const lowerQuery = searchQuery.toLowerCase()
      const matchingSwissHubs = swissTransportHubs.filter((hub) => hub.name.toLowerCase().includes(lowerQuery))

      // Convertir les hubs suisses en format MapboxFeature
      const swissHubFeatures: MapboxFeature[] = matchingSwissHubs.map((hub, index) => ({
        id: `swiss-${hub.type}-${index}`,
        place_name: hub.name,
        place_type: ["poi"],
        center: hub.coordinates,
        properties: {
          category: hub.type === "airport" ? "airport" : "station",
          maki: hub.type === "airport" ? "airport" : "rail",
        },
      }))

      // Ensure proper URL encoding and parameter formatting
      const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places"
      const encodedQuery = encodeURIComponent(searchQuery)
      const url = `${baseUrl}/${encodedQuery}.json`

      const params = new URLSearchParams({
        access_token: mapboxToken,
        types: "place,poi", // Ajout de 'poi' pour les points d'intérêt comme les gares et aéroports
        autocomplete: "true",
        language: "fr",
        limit: "10", // Augmenté pour avoir plus de résultats
        bbox: "-25,34,40,72", // Boîte englobante pour l'Europe
      })

      const response = await fetch(`${url}?${params}`)

      if (response.status === 401) {
        throw new Error("Erreur d'authentification avec l'API Mapbox. Veuillez vérifier votre clé API.")
      }

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`)
      }

      const data: MapboxResponse = await response.json()

      // Filtrer les résultats pour ne garder que les villes, gares et aéroports
      const filteredFeatures = data.features.filter((feature) => {
        // Garder toutes les villes
        if (feature.place_type.includes("place")) return true

        // Pour les POI, ne garder que les gares et aéroports
        if (feature.place_type.includes("poi")) {
          const category = feature.properties?.category?.toLowerCase() || ""
          const maki = feature.properties?.maki?.toLowerCase() || ""
          const name = feature.place_name.toLowerCase()

          // Termes généraux pour les gares et aéroports
          const airportTerms = ["aéroport", "airport", "flughafen", "aeroporto", "aeroport"]
          const trainTerms = ["gare", "station", "bahnhof", "stazione", "hauptbahnhof", "hbf", "sbb", "cff", "ffs"]

          // Vérifier si c'est un aéroport
          const isAirport =
            category.includes("airport") ||
            maki === "airport" ||
            airportTerms.some((term) => name.includes(term)) ||
            // Aéroports suisses spécifiques
            name.includes("genève") ||
            name.includes("zurich") ||
            name.includes("bâle") ||
            name.includes("geneva") ||
            name.includes("basel") ||
            name.includes("lugano") ||
            name.includes("bern") ||
            name.includes("gva") ||
            name.includes("zrh") ||
            name.includes("bsl")

          // Vérifier si c'est une gare
          const isTrainStation =
            category.includes("station") ||
            maki === "rail" ||
            maki === "railway" ||
            maki === "train" ||
            trainTerms.some((term) => name.includes(term)) ||
            // Gares suisses spécifiques
            name.includes("cornavin") ||
            name.includes("sbb") ||
            name.includes("cff") ||
            name.includes("ffs")

          return isAirport || isTrainStation
        }

        return false
      })

      // Combiner les résultats de l'API avec les hubs suisses prédéfinis
      // Mettre les hubs suisses en premier pour les mettre en évidence
      const combinedResults = [...swissHubFeatures, ...filteredFeatures]

      // Éliminer les doublons potentiels (basés sur le nom)
      const uniqueResults = combinedResults.filter(
        (feature, index, self) => index === self.findIndex((f) => f.place_name === feature.place_name),
      )

      setSuggestions(uniqueResults)
      setIsOpen(uniqueResults.length > 0)
    } catch (err) {
      console.error("Erreur lors de la recherche:", err)
      setError(err instanceof Error ? err.message : "Une erreur s'est produite lors de la recherche")
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Effet pour le debouncing
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    const query = activeField === "pickup" ? pickupQuery : dropoffQuery

    if (query.length >= 2) {
      timeoutRef.current = setTimeout(() => {
        searchCities(query)
      }, 300) // 300ms de délai avant de lancer la recherche
    } else {
      setSuggestions([])
      setIsOpen(false)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [pickupQuery, dropoffQuery, activeField, searchCities])

  // Fermer les suggestions en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickupContainerRef.current &&
        dropoffContainerRef.current &&
        !pickupContainerRef.current.contains(event.target as Node) &&
        !dropoffContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setActiveField(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Validation des dates
  useEffect(() => {
    // S'assurer que la date de fin est après la date de début
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      // Si la date de fin est avant la date de début, ajuster la date de fin
      const newEndDate = new Date(startDate)
      newEndDate.setDate(newEndDate.getDate() + 1) // Ajouter un jour
      setEndDate(formatDateForInput(newEndDate))
    }
  }, [startDate, endDate, formatDateForInput])

  // Fonction pour obtenir l'icône appropriée en fonction du type de lieu
  const getLocationIcon = (feature: MapboxFeature) => {
    if (feature.place_type.includes("poi")) {
      const category = feature.properties?.category?.toLowerCase() || ""
      const maki = feature.properties?.maki?.toLowerCase() || ""
      const name = feature.place_name.toLowerCase()

      // Termes pour les aéroports
      const airportTerms = ["aéroport", "airport", "flughafen", "aeroporto", "aeroport", "gva", "zrh", "bsl"]

      // Termes pour les gares
      const trainTerms = [
        "gare",
        "station",
        "bahnhof",
        "stazione",
        "hauptbahnhof",
        "hbf",
        "sbb",
        "cff",
        "ffs",
        "cornavin",
      ]

      // Vérifier si c'est un aéroport
      if (category.includes("airport") || maki === "airport" || airportTerms.some((term) => name.includes(term))) {
        return <Plane className="h-5 w-5 text-blue-500" />
      }

      // Vérifier si c'est une gare
      if (
        category.includes("station") ||
        maki === "rail" ||
        maki === "railway" ||
        maki === "train" ||
        trainTerms.some((term) => name.includes(term))
      ) {
        return <Train className="h-5 w-5 text-red-500" />
      }
    }

    return <MapPin className="h-5 w-5 text-primary" />
  }

  const handleSelectCity = (feature: MapboxFeature) => {
    if (activeField === "pickup") {
      setSelectedPickup(feature.place_name)
      setPickupQuery("")
      // Si le dropoff n'est pas encore sélectionné, focus sur ce champ
      if (!selectedDropoff && dropoffInputRef.current) {
        dropoffInputRef.current.focus()
        setActiveField("dropoff")
      } else {
        setIsOpen(false)
        setActiveField(null)
      }
    } else if (activeField === "dropoff") {
      setSelectedDropoff(feature.place_name)
      setDropoffQuery("")
      setIsOpen(false)
      setActiveField(null)
    }
  }

  const clearPickup = () => {
    setSelectedPickup("")
    setPickupQuery("")
    if (pickupInputRef.current) {
      pickupInputRef.current.focus()
      setActiveField("pickup")
    }
  }

  const clearDropoff = () => {
    setSelectedDropoff("")
    setDropoffQuery("")
    if (dropoffInputRef.current) {
      dropoffInputRef.current.focus()
      setActiveField("dropoff")
    }
  }

  const handleSearch = () => {
    // Rediriger vers la page appropriée en fonction du type de service
    const targetPage = serviceType === "with-driver" ? "/flotte/avec-chauffeur" : "/flotte/sans-chauffeur"

    // Construire les paramètres de recherche pour l'URL
    const searchParams = new URLSearchParams({
      pickup: selectedPickup,
      dropoff: selectedDropoff || selectedPickup,
      from: startDate,
      to: endDate,
      roundTrip: isRoundTrip.toString(),
    })

    // Rediriger avec les paramètres
    router.push(`${targetPage}?${searchParams.toString()}`)
  }

  // Destinations populaires incluant des gares et aéroports
  const popularDestinations = [
    { name: "Genève, Suisse", type: "city" },
    { name: "Aéroport de Genève (GVA)", type: "airport" },
    { name: "Gare de Genève-Cornavin", type: "train" },
    { name: "Zurich, Suisse", type: "city" },
    { name: "Aéroport de Zurich (ZRH)", type: "airport" },
    { name: "Gare Centrale de Zurich (HB)", type: "train" },
    { name: "Lausanne, Suisse", type: "city" },
    { name: "Gare de Lausanne", type: "train" },
    { name: "Bâle, Suisse", type: "city" },
    { name: "Aéroport de Bâle-Mulhouse (BSL)", type: "airport" },
    { name: "Berne, Suisse", type: "city" },
    { name: "Paris, France", type: "city" },
    { name: "Aéroport Charles de Gaulle (CDG), Paris", type: "airport" },
    { name: "Lyon, France", type: "city" },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-[#8e7d3f]/20 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Trouvez votre voiture idéale</h2>

          {/* Boutons Avec/Sans Chauffeur */}
          <div className="mb-6">
            <Tabs
              value={serviceType}
              onValueChange={(value) => setServiceType(value as "with-driver" | "without-driver")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-2 bg-gray-700/80 p-1 rounded-lg">
                <TabsTrigger value="with-driver" className="flex items-center gap-2 py-3 rounded-md">
                  <User className="h-4 w-4" />
                  Avec Chauffeur
                </TabsTrigger>
                <TabsTrigger value="without-driver" className="flex items-center gap-2 py-3 rounded-md">
                  <Car className="h-4 w-4" />
                  Sans Chauffeur
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Message explicatif selon le type de service */}
            <div className="text-sm text-gray-300 mt-2 p-3 bg-[#8e7d3f]/10 rounded-md border border-[#8e7d3f]/20">
              {serviceType === "with-driver" ? (
                <p>
                  Service avec chauffeur professionnel. Idéal pour les événements spéciaux et les transferts d'aéroport.
                </p>
              ) : (
                <p>Location de véhicule sans chauffeur. Vous conduisez vous-même le véhicule.</p>
              )}
            </div>

            {/* Option Aller-retour */}
            <div className="flex items-center space-x-2 mt-4 p-3 bg-[#8e7d3f]/10 rounded-md border border-[#8e7d3f]/20">
              <input
                type="checkbox"
                id="round-trip"
                checked={isRoundTrip}
                onChange={(e) => setIsRoundTrip(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#8e7d3f] focus:ring-[#8e7d3f]"
              />
              <label htmlFor="round-trip" className="text-sm font-medium text-gray-200">
                Aller-retour
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Lieu de prise en charge */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Lieu de prise en charge</label>
              <div ref={pickupContainerRef} className="relative">
                {selectedPickup ? (
                  <div className="flex items-center justify-between p-4 border border-[#8e7d3f]/50 rounded-lg bg-gray-800/90 backdrop-blur-sm shadow-md">
                    <div className="flex items-center gap-2">
                      {selectedPickup.toLowerCase().includes("aéroport") ||
                      selectedPickup.toLowerCase().includes("airport") ? (
                        <Plane className="h-5 w-5 text-[#8e7d3f]" />
                      ) : selectedPickup.toLowerCase().includes("gare") ||
                        selectedPickup.toLowerCase().includes("station") ? (
                        <Train className="h-5 w-5 text-[#8e7d3f]" />
                      ) : (
                        <MapPin className="h-5 w-5 text-[#8e7d3f]" />
                      )}
                      <span className="font-medium">{selectedPickup}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={clearPickup} className="h-8 w-8 hover:bg-gray-700">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Effacer</span>
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      ref={pickupInputRef}
                      type="text"
                      placeholder="Ville, aéroport, gare..."
                      value={pickupQuery}
                      onChange={(e) => setPickupQuery(e.target.value)}
                      onFocus={() => {
                        setActiveField("pickup")
                        if (pickupQuery.length >= 2) setIsOpen(true)
                      }}
                      className="pl-10 pr-4 py-3 h-14 rounded-lg text-base shadow-sm bg-gray-700 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                    />
                    {isLoading && activeField === "pickup" && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
                    )}
                  </div>
                )}

                {/* Menu déroulant pour le lieu de prise en charge */}
                {isOpen && activeField === "pickup" && (
                  <div className="absolute left-0 right-0 mt-1 bg-gray-700 border border-[#8e7d3f]/30 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                    {error ? (
                      <div className="px-4 py-3 text-red-500">
                        <p className="font-medium">Erreur</p>
                        <p className="text-sm">{error}</p>
                      </div>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((feature) => (
                        <div
                          key={feature.id}
                          className="px-4 py-3 hover:bg-gray-600 cursor-pointer flex items-center gap-2 text-white"
                          onClick={() => handleSelectCity(feature)}
                        >
                          {getLocationIcon(feature)}
                          <span>{feature.place_name}</span>
                        </div>
                      ))
                    ) : (
                      pickupQuery.length >= 2 &&
                      !isLoading && <div className="px-4 py-3 text-gray-300">Aucun résultat trouvé</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Lieu de retour */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                {serviceType === "without-driver" ? "Lieu de retour" : "Lieu de Destination"}
              </label>
              <div ref={dropoffContainerRef} className="relative">
                {selectedDropoff ? (
                  <div className="flex items-center justify-between p-4 border border-[#8e7d3f]/50 rounded-lg bg-gray-800/90 backdrop-blur-sm shadow-md">
                    <div className="flex items-center gap-2">
                      {selectedDropoff.toLowerCase().includes("aéroport") ||
                      selectedDropoff.toLowerCase().includes("airport") ? (
                        <Plane className="h-5 w-5 text-[#8e7d3f]" />
                      ) : selectedDropoff.toLowerCase().includes("gare") ||
                        selectedDropoff.toLowerCase().includes("station") ? (
                        <Train className="h-5 w-5 text-[#8e7d3f]" />
                      ) : (
                        <MapPin className="h-5 w-5 text-[#8e7d3f]" />
                      )}
                      <span className="font-medium">{selectedDropoff}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={clearDropoff} className="h-8 w-8 hover:bg-gray-700">
                      <X className="h-4 w-4" />
                      <span className="sr-only">Effacer</span>
                    </Button>
                  </div>
                ) : (
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      ref={dropoffInputRef}
                      type="text"
                      placeholder={
                        selectedPickup
                          ? "Même que le lieu de prise en charge"
                          : "Ville, aéroport, gare de destination..."
                      }
                      value={dropoffQuery}
                      onChange={(e) => setDropoffQuery(e.target.value)}
                      onFocus={() => {
                        setActiveField("dropoff")
                        if (dropoffQuery.length >= 2) setIsOpen(true)
                      }}
                      className="pl-10 pr-4 py-3 h-14 rounded-lg text-base shadow-sm bg-gray-700 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                    />
                    {isLoading && activeField === "dropoff" && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
                    )}
                  </div>
                )}

                {/* Menu déroulant pour le lieu de retour */}
                {isOpen && activeField === "dropoff" && (
                  <div className="absolute left-0 right-0 mt-1 bg-gray-700 border border-[#8e7d3f]/30 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                    {error ? (
                      <div className="px-4 py-3 text-red-500">
                        <p className="font-medium">Erreur</p>
                        <p className="text-sm">{error}</p>
                      </div>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((feature) => (
                        <div
                          key={feature.id}
                          className="px-4 py-3 hover:bg-gray-600 cursor-pointer flex items-center gap-2 text-white"
                          onClick={() => handleSelectCity(feature)}
                        >
                          {getLocationIcon(feature)}
                          <span>{feature.place_name}</span>
                        </div>
                      ))
                    ) : (
                      dropoffQuery.length >= 2 &&
                      !isLoading && <div className="px-4 py-3 text-gray-300">Aucun résultat trouvé</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Visual Journey Summary */}
          {selectedPickup && selectedDropoff && (
            <div className="mt-4 mb-6 p-4 border border-[#8e7d3f]/50 rounded-lg bg-gray-800/90 backdrop-blur-sm shadow-md">
              <h3 className="text-[#8e7d3f] font-medium mb-2">Résumé de votre trajet</h3>
              <div className="flex items-start space-x-2">
                <div className="flex flex-col items-center mt-1">
                  <div className="w-4 h-4 rounded-full bg-[#8e7d3f] flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-black" />
                  </div>
                  <div className="w-0.5 h-10 bg-[#8e7d3f]/50 mx-auto my-1"></div>
                  <div className="w-4 h-4 rounded-full bg-[#8e7d3f] flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-black" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-3">
                    <p className="text-sm text-gray-400">Départ</p>
                    <p className="font-medium">{selectedPickup}</p>
                    <p className="text-sm text-[#8e7d3f]">{formatDateForDisplay(startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Arrivée</p>
                    <p className="font-medium">{selectedDropoff}</p>
                    {isRoundTrip && <p className="text-sm text-[#8e7d3f]">{formatDateForDisplay(endDate)} (Retour)</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sélecteur de dates simplifié */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">Date de prise en charge</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8e7d3f]" />
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={formatDateForInput(new Date())} // Pas de date dans le passé
                  className="pl-10 pr-4 py-3 h-14 rounded-lg text-base bg-gray-700 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                {isRoundTrip ? "Date de retour" : "Date de fin"}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8e7d3f]" />
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate} // Pas de date avant la date de départ
                  className="pl-10 pr-4 py-3 h-14 rounded-lg text-base bg-gray-700 border-[#8e7d3f]/30 text-white focus:border-[#8e7d3f]/70 focus:ring-[#8e7d3f]/50"
                />
              </div>
            </div>
          </div>

          {/* Bouton de recherche */}
          <Button
            onClick={handleSearch}
            disabled={!selectedPickup || !startDate || !endDate}
            className="w-full py-6 text-lg font-medium bg-[#8e7d3f] hover:bg-[#8e7d3f]/90 transition-all shadow-md hover:shadow-lg"
          >
            Rechercher <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Destinations populaires */}
        <div className="bg-[#8e7d3f]/20 p-6 border-t border-[#8e7d3f]/30 rounded-b-xl">
          <h3 className="text-sm font-medium mb-3">Destinations populaires</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {popularDestinations.map((destination, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600 text-xs sm:text-sm"
                onClick={() => {
                  if (selectedPickup) {
                    // Si un lieu de prise en charge est déjà sélectionné, définir comme destination
                    setSelectedDropoff(destination.name)
                    setDropoffQuery("")
                  } else {
                    // Sinon, définir comme lieu de prise en charge
                    setSelectedPickup(destination.name)
                    setPickupQuery("")
                  }
                }}
              >
                {destination.type === "airport" ? (
                  <Plane className="h-3 w-3 mr-1 text-blue-500" />
                ) : destination.type === "train" ? (
                  <Train className="h-3 w-3 mr-1 text-red-500" />
                ) : (
                  <MapPin className="h-3 w-3 mr-1" />
                )}
                <span className="truncate max-w-[120px] sm:max-w-none">{destination.name.split(",")[0]}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

