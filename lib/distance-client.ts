// Base de données de distances routières vérifiées pour les trajets spécifiques
// Ces distances ont été vérifiées manuellement et sont considérées comme exactes
const verifiedRoutes: Record<string, number> = {
  // Distances depuis l'aéroport de Genève
  "aéroport de genève_genève": 8,
  "genève aéroport_genève": 8,
  "geneva airport_genève": 8,
  gva_genève: 8,
  "aéroport de genève_lausanne": 65,
  "genève aéroport_lausanne": 65,
  "geneva airport_lausanne": 65,
  gva_lausanne: 65,
  "aéroport de genève_annecy": 45,
  "genève aéroport_annecy": 45,
  "geneva airport_annecy": 45,
  gva_annecy: 45,
  "aéroport de genève_chamonix": 88,
  "genève aéroport_chamonix": 88,
  "geneva airport_chamonix": 88,
  gva_chamonix: 88,
  "aéroport de genève_lyon": 150,
  "genève aéroport_lyon": 150,
  "geneva airport_lyon": 150,
  gva_lyon: 150,

  // Distances depuis l'aéroport de Zurich
  "aéroport de zurich_zurich": 12,
  "zurich airport_zurich": 12,
  zrh_zurich: 12,

  // Distances depuis l'aéroport de Bâle-Mulhouse
  "aéroport de bâle-mulhouse_bâle": 10,
  "bâle-mulhouse airport_bâle": 10,
  bsl_bâle: 10,

  // Distances entre villes principales suisses
  genève_lausanne: 65,
  geneva_lausanne: 65,
  genève_berne: 160,
  geneva_berne: 160,
  genève_zurich: 280,
  geneva_zurich: 280,
  lausanne_berne: 100,
  lausanne_zurich: 230,
  berne_zurich: 125,

  // Distances entre villes suisses et françaises
  genève_lyon: 150,
  geneva_lyon: 150,
  genève_annecy: 42,
  geneva_annecy: 42,
  genève_chamonix: 88,
  geneva_chamonix: 88,
  lausanne_lyon: 225,
  lausanne_annecy: 107,
  lausanne_chamonix: 140,

  // Distances vers Paris
  genève_paris: 540,
  geneva_paris: 540,
  lausanne_paris: 590,
  zurich_paris: 650,
  berne_paris: 600,
  lyon_paris: 470,

  // Autres trajets internationaux
  genève_grenoble: 145,
  geneva_grenoble: 145,
  lausanne_grenoble: 210,
  genève_chambéry: 95,
  geneva_chambéry: 95,
  lausanne_chambéry: 160,
  genève_annemasse: 15,
  geneva_annemasse: 15,
  "genève_thonon-les-bains": 45,
  "geneva_thonon-les-bains": 45,
  genève_evian: 50,
  geneva_evian: 50,
  lausanne_evian: 35,
  genève_megève: 70,
  geneva_megève: 70,

  // Distances depuis/vers Valserhône
  valserhône_genève: 35,
  valserhône_geneva: 35,
  bellegarde_genève: 35,
  bellegarde_geneva: 35,
  valserhône_lausanne: 100,
  bellegarde_lausanne: 100,
  valserhône_annecy: 60,
  bellegarde_annecy: 60,
  valserhône_lyon: 120,
  bellegarde_lyon: 120,
  "valserhône_aéroport de genève": 40,
  "valserhône_genève aéroport": 40,
  "valserhône_geneva airport": 40,
  valserhône_gva: 40,
  "bellegarde_aéroport de genève": 40,
  "bellegarde_genève aéroport": 40,
  "bellegarde_geneva airport": 40,
  bellegarde_gva: 40,
}

// Base de données de coordonnées connues pour les lieux importants
// Format: [longitude, latitude] - Mapbox utilise cet ordre (longitude d'abord)
const knownLocations: Record<string, [number, number]> = {
  // Aéroports
  "aéroport de genève": [6.1092, 46.237],
  "genève aéroport": [6.1092, 46.237],
  "geneva airport": [6.1092, 46.237],
  gva: [6.1092, 46.237],
  "aéroport de zurich": [8.5554, 47.4582],
  "zurich airport": [8.5554, 47.4582],
  zrh: [8.5554, 47.4582],
  "aéroport de bâle-mulhouse": [7.5291, 47.5989],
  "bâle-mulhouse airport": [7.5291, 47.5989],
  bsl: [7.5291, 47.5989],
  "aéroport de lyon-saint exupéry": [5.0887, 45.7234],
  "lyon airport": [5.0887, 45.7234],
  lys: [5.0887, 45.7234],
  "aéroport charles de gaulle": [2.5479, 49.0097],
  "paris charles de gaulle": [2.5479, 49.0097],
  cdg: [2.5479, 49.0097],

  // Villes suisses
  genève: [6.1432, 46.2044],
  geneva: [6.1432, 46.2044],
  zurich: [8.5417, 47.3769],
  berne: [7.4474, 46.948],
  bern: [7.4474, 46.948],
  lausanne: [6.6327, 46.5197],
  bâle: [7.5886, 47.5596],
  basel: [7.5886, 47.5596],
  lugano: [8.952, 46.0037],
  lucerne: [8.3093, 47.0502],
  luzern: [8.3093, 47.0502],
  interlaken: [7.8632, 46.6863],
  montreux: [6.9106, 46.4312],
  zermatt: [7.748, 46.0207],
  davos: [9.8282, 46.8003],
  "st. moritz": [9.8345, 46.4908],
  "saint-moritz": [9.8345, 46.4908],
  fribourg: [7.1575, 46.806],
  neuchâtel: [6.932, 46.99],
  sion: [7.359, 46.233],
  thun: [7.628, 46.758],
  thoune: [7.628, 46.758],
  biel: [7.248, 47.1368],
  bienne: [7.248, 47.1368],
  nyon: [6.234, 46.383],
  vevey: [6.843, 46.462],
  morges: [6.5, 46.511],
  yverdon: [6.641, 46.778],
  "yverdon-les-bains": [6.641, 46.778],

  // Villes françaises
  lyon: [4.835, 45.764],
  paris: [2.3522, 48.8566],
  annecy: [6.129, 45.899],
  chamonix: [6.87, 45.923],
  "chamonix-mont-blanc": [6.87, 45.923],
  grenoble: [5.724, 45.188],
  annemasse: [6.234, 46.193],
  "thonon-les-bains": [6.48, 46.371],
  evian: [6.585, 46.4],
  "evian-les-bains": [6.585, 46.4],
  chambéry: [5.917, 45.564],
  "aix-les-bains": [5.908, 45.692],
  "saint-gervais-les-bains": [6.712, 45.892],
  megève: [6.617, 45.857],
  morzine: [6.709, 46.179],
  avoriaz: [6.774, 46.187],
  cluses: [6.585, 46.059],
  sallanches: [6.636, 45.934],
  albertville: [6.392, 45.675],
  "bourg-en-bresse": [5.228, 46.205],
  gex: [6.058, 46.335],
  "ferney-voltaire": [6.108, 46.258],
  "divonne-les-bains": [6.143, 46.358],
  valserhône: [5.8253, 46.1128],
  bellegarde: [5.8253, 46.1128], // Nom court souvent utilisé
  "châtillon-en-michaille": [5.8253, 46.1128], // Commune déléguée de Valserhône
  lancrans: [5.8253, 46.1128], // Commune déléguée de Valserhône
  seyssel: [5.8333, 45.9667],
  culoz: [5.7833, 45.85],
  belley: [5.6833, 45.7667],
  nantua: [5.6167, 46.15],
  oyonnax: [5.65, 46.2667],
  "saint-claude": [5.8667, 46.3833],
  morez: [6.0167, 46.5167],
  "les rousses": [6.0667, 46.4833],
  pontarlier: [6.35, 46.9],
  morteau: [6.6, 47.05],
  maîche: [6.8, 47.25],
  delle: [6.9833, 47.5167],
  "saint-louis": [7.5667, 47.5833],
  "saint-julien-en-genevois": [6.0833, 46.1333],
  bonneville: [6.4, 46.0833],
  "la roche-sur-foron": [6.3167, 46.0667],
}

// Fonction pour trouver la ville la plus proche dans notre base de données
function findClosestKnownPlace(place: string): string | null {
  const normalized = place.toLowerCase().trim()

  // 1. Vérifier d'abord les correspondances exactes
  if (knownLocations[normalized]) {
    console.log(`Correspondance exacte trouvée: "${normalized}"`)
    return normalized
  }

  // 2. Vérifier les correspondances partielles
  for (const knownPlace of Object.keys(knownLocations)) {
    if (normalized.includes(knownPlace) || knownPlace.includes(normalized)) {
      console.log(`Correspondance partielle trouvée: "${knownPlace}" pour "${normalized}"`)
      return knownPlace
    }
  }

  // 3. Cas spéciaux pour les lieux importants
  // Aéroports
  if (normalized.includes("gva") || normalized.includes("genève aéroport") || normalized.includes("geneva airport")) {
    return "aéroport de genève"
  }
  if (normalized.includes("zrh") || normalized.includes("zurich aéroport") || normalized.includes("zurich airport")) {
    return "aéroport de zurich"
  }
  if (
    normalized.includes("bsl") ||
    normalized.includes("bâle aéroport") ||
    normalized.includes("basel airport") ||
    normalized.includes("mulhouse") ||
    normalized.includes("bâle-mulhouse")
  ) {
    return "aéroport de bâle-mulhouse"
  }
  if (normalized.includes("lys") || normalized.includes("lyon aéroport") || normalized.includes("saint exupéry")) {
    return "aéroport de lyon-saint exupéry"
  }
  if (normalized.includes("cdg") || normalized.includes("charles de gaulle") || normalized.includes("roissy")) {
    return "aéroport charles de gaulle"
  }

  // Villes principales
  if (normalized.includes("genève") || normalized.includes("geneva")) {
    return "genève"
  }
  if (normalized.includes("zurich") || normalized.includes("zürich")) {
    return "zurich"
  }
  if (normalized.includes("berne") || normalized.includes("bern")) {
    return "berne"
  }
  if (normalized.includes("lausanne")) {
    return "lausanne"
  }
  if (normalized.includes("bâle") || normalized.includes("basel")) {
    return "bâle"
  }
  if (normalized.includes("lyon")) {
    return "lyon"
  }
  if (normalized.includes("paris")) {
    return "paris"
  }
  if (normalized.includes("annecy")) {
    return "annecy"
  }
  if (normalized.includes("chamonix")) {
    return "chamonix"
  }

  // Cas spéciaux pour les villes françaises proches de la frontière suisse
  if (normalized.includes("valserhone") || normalized.includes("valserhône") || normalized.includes("bellegarde")) {
    return "valserhône"
  }
  if (normalized.includes("saint-julien") || normalized.includes("st-julien") || normalized.includes("saint julien")) {
    return "saint-julien-en-genevois"
  }
  if (
    normalized.includes("saint-gervais") ||
    normalized.includes("st-gervais") ||
    normalized.includes("saint gervais")
  ) {
    return "saint-gervais-les-bains"
  }
  if (normalized.includes("la roche sur foron") || normalized.includes("la roche-sur-foron")) {
    return "la roche-sur-foron"
  }
  if (normalized.includes("les rousses")) {
    return "les rousses"
  }

  console.log(`Aucune correspondance trouvée pour "${normalized}"`)
  return null
}

// Fonction pour prétraiter les adresses avant le calcul de distance
function preprocessLocation(location: string): string {
  const normalized = location.toLowerCase().trim()

  // Correction pour Valserhône et ses anciennes communes
  if (
    normalized.includes("bellegarde") ||
    normalized.includes("valserhone") ||
    normalized.includes("valserhône") ||
    normalized.includes("chatillon-en-michaille") ||
    normalized.includes("lancrans")
  ) {
    return "Valserhône, France"
  }

  // Ajouter le pays si non spécifié pour les villes françaises connues
  const frenchCities = [
    "annecy",
    "chamonix",
    "lyon",
    "grenoble",
    "annemasse",
    "thonon",
    "evian",
    "chambéry",
    "megève",
    "morzine",
    "cluses",
    "sallanches",
  ]

  if (!normalized.includes("france") && !normalized.includes("suisse") && !normalized.includes("switzerland")) {
    for (const city of frenchCities) {
      if (normalized.includes(city)) {
        return `${location}, France`
      }
    }

    // Par défaut, ajouter Suisse si le pays n'est pas spécifié
    if (!normalized.includes(",")) {
      return `${location}, Suisse`
    }
  }

  return location
}

// Fonction pour calculer la distance à vol d'oiseau entre deux points
function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return distance
}

// Fonction pour estimer la distance routière à partir de la distance à vol d'oiseau
function estimateRoadDistance(airDistance: number): number {
  // Facteur de correction pour estimer la distance routière
  // En général, la distance routière est environ 1.3 à 1.5 fois la distance à vol d'oiseau
  const correctionFactor = 1.4
  return Math.round(airDistance * correctionFactor)
}

// Fonction principale pour calculer la distance entre deux lieux
export async function calculateDistance(origin: string, destination: string): Promise<number | null> {
  try {
    console.log(`Calcul de la distance routière entre "${origin}" et "${destination}"`)

    // Vérifier si les lieux sont identiques
    if (origin.toLowerCase() === destination.toLowerCase()) {
      console.log("Origine et destination identiques, distance fixée à 0 km")
      return 0
    }

    // Prétraiter les adresses
    const processedOrigin = preprocessLocation(origin)
    const processedDestination = preprocessLocation(destination)

    console.log(`Adresses prétraitées: "${processedOrigin}" → "${processedDestination}"`)

    // 1. Vérifier d'abord si nous avons une distance vérifiée pour ce trajet spécifique
    const originNormalized = processedOrigin.toLowerCase().trim()
    const destNormalized = processedDestination.toLowerCase().trim()

    const routeKey1 = `${originNormalized}_${destNormalized}`
    const routeKey2 = `${destNormalized}_${originNormalized}`

    if (verifiedRoutes[routeKey1]) {
      console.log(`Distance routière vérifiée trouvée: ${verifiedRoutes[routeKey1]} km pour ${routeKey1}`)
      return verifiedRoutes[routeKey1]
    } else if (verifiedRoutes[routeKey2]) {
      console.log(`Distance routière vérifiée trouvée: ${verifiedRoutes[routeKey2]} km pour ${routeKey2}`)
      return verifiedRoutes[routeKey2]
    }

    // 2. Essayer de trouver les coordonnées dans notre base de données
    const originPlace = findClosestKnownPlace(originNormalized)
    const destPlace = findClosestKnownPlace(destNormalized)

    if (originPlace && destPlace) {
      console.log(`Lieux normalisés: "${originPlace}" → "${destPlace}"`)

      // Si nous avons les coordonnées, calculer la distance à vol d'oiseau puis estimer la distance routière
      if (knownLocations[originPlace] && knownLocations[destPlace]) {
        const originCoords = knownLocations[originPlace]
        const destCoords = knownLocations[destPlace]

        console.log(`Coordonnées trouvées dans la base de données:`)
        console.log(`Origine (${originPlace}): [longitude: ${originCoords[0]}, latitude: ${originCoords[1]}]`)
        console.log(`Destination (${destPlace}): [longitude: ${destCoords[0]}, latitude: ${destCoords[1]}]`)

        // Calculer la distance à vol d'oiseau
        const airDistance = calculateHaversineDistance(originCoords[1], originCoords[0], destCoords[1], destCoords[0])

        // Estimer la distance routière
        const roadDistance = estimateRoadDistance(airDistance)

        console.log(`Distance à vol d'oiseau: ${airDistance.toFixed(2)} km`)
        console.log(`Distance routière estimée: ${roadDistance} km`)

        return roadDistance
      }
    }

    // 3. Si nous n'avons pas trouvé dans notre base de données, retourner une valeur par défaut
    console.log("Impossible de calculer la distance précise, utilisation d'une valeur par défaut")
    return 100 // Valeur par défaut
  } catch (error) {
    console.error("Erreur lors du calcul de la distance:", error)
    return 100 // Valeur par défaut
  }
}

