export interface Vehicle {
  id: number
  name: string
  type: string
  subtitle: string
  seats: number
  luggage: number
  doors: number
  transmission: string
  image: string
  pricePerKm: number
  features: string[]
  minAge: number
  additionalInfo?: string
  withDriverSupplement?: number // Supplément pour le service avec chauffeur
}

export interface ReservationInfo {
  pickup: string | null
  dropoff: string | null
  distance: number | null
  withDriver: boolean
  roundTrip?: boolean
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Mercedes Classe S",
    type: "Berline de luxe",
    subtitle: "Le summum du confort et de l'élégance",
    seats: 3,
    luggage: 3,
    doors: 4,
    transmission: "Automatique",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vp1RtvQsh6xBzbYVQGJ9Hm312IpQcS.png",
    pricePerKm: 1.1,
    features: [
      "Sièges massants",
      "Intérieur cuir Nappa",
      "Climatisation 4 zones",
      "Système audio Burmester",
      "Écrans tactiles arrière",
      "Wifi haut débit",
      "Mini-bar intégré",
    ],
    minAge: 25,
    additionalInfo: "Service premium inclus",
    withDriverSupplement: 0.4,
  },
  {
    id: 2,
    name: "Mercedes Classe V",
    type: "Van de luxe",
    subtitle: "Espace et confort pour vos déplacements en groupe",
    seats: 7,
    luggage: 7,
    doors: 5,
    transmission: "Automatique",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lkq65yBODGn33gUrRxyvLuv3jJzCgv.png",
    pricePerKm: 0.95,
    features: [
      "Vitres teintées",
      "Intérieur cuir",
      "Air conditionné",
      "GPS intégré",
      "Radio / Lecteur CD",
      "Prise 12 volts",
      "Wifi",
    ],
    minAge: 25,
    additionalInfo: "6 – 7 bagages",
    withDriverSupplement: 0.3,
  },
  {
    id: 3,
    name: "Mercedes Sprinter",
    type: "Minibus de luxe",
    subtitle: "Idéal pour les groupes et les événements spéciaux",
    seats: 16,
    luggage: 16,
    doors: 3,
    transmission: "Automatique",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IgEwr67oTl3spF3NSpuAR0jOsqkC5P.png",
    pricePerKm: 1.25,
    features: [
      "Sièges en cuir confortables",
      "Climatisation individuelle",
      "Système audio premium",
      "Éclairage d'ambiance",
      "Prises USB à chaque siège",
      "Wifi haut débit",
      "Espace de rangement généreux",
    ],
    minAge: 25,
    additionalInfo: "Idéal pour les transferts d'aéroport en groupe",
    withDriverSupplement: 0.45,
  },
  {
    id: 4,
    name: "Range Rover Vogue",
    type: "SUV de luxe",
    subtitle: "Élégance et confort pour vos déplacements",
    seats: 4,
    luggage: 4,
    doors: 5,
    transmission: "Automatique",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-m2zGRImuW5CouNaZpZisP0cW8au4DB.png",
    pricePerKm: 0.95,
    features: [
      "Vitres teintées",
      "Intérieur cuir Windsor",
      "Climatisation 4 zones",
      "Système audio Meridian",
      "Toit panoramique",
      "Sièges chauffants et ventilés",
      "Wifi",
    ],
    minAge: 25,
    additionalInfo: "4 bagages",
    withDriverSupplement: 0.35,
  },
  {
    id: 5,
    name: "Range Rover Defender",
    type: "SUV tout-terrain de luxe",
    subtitle: "Robustesse et élégance pour toutes vos aventures",
    seats: 5,
    luggage: 5,
    doors: 5,
    transmission: "Automatique",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ErDFwiw0qfTXbOH57LAmJm4uRSGOmJ.png",
    pricePerKm: 0.9,
    features: [
      "Intérieur cuir Windsor",
      "Système Terrain Response 2",
      "Écran tactile 10 pouces",
      "Système audio Meridian",
      "Caméras 360°",
      "Toit panoramique",
      "Connectivité smartphone",
    ],
    minAge: 25,
    additionalInfo: "Parfait pour les routes difficiles",
    withDriverSupplement: 0.3,
  },
  {
    id: 6,
    name: "Mercedes CLA",
    type: "Coupé 4 portes",
    subtitle: "Style et performance pour vos déplacements",
    seats: 4,
    luggage: 3,
    doors: 4,
    transmission: "Automatique",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B4NU4KjPi52yAQU38Waota4Dt9ozua.png", // Updated image URL
    pricePerKm: 0.75,
    features: [
      "Intérieur sportif",
      "Système MBUX",
      "Éclairage d'ambiance",
      "Sièges sport",
      "Caméra de recul",
      "Apple CarPlay & Android Auto",
      "Système audio premium",
    ],
    minAge: 23,
    additionalInfo: "Idéal pour les couples ou petits groupes",
    withDriverSupplement: 0.25,
  },
]

