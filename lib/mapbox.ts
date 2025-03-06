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
  // "bellegarde-sur-valserine": [5.827, 46.106], // Commented out to avoid duplicate
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
  // annemasse: [6.234, 46.193], // Duplicate - already defined above
  bonneville: [6.4, 46.0833],
  "la roche-sur-foron": [6.3167, 46.0667],
  // cluses: [6.585, 46.059], // Duplicate - already defined above
  // "saint-gervais-les-bains": [6.712, 45.892], // Duplicate - already defined above
  // sallanches: [6.636, 45.934], // Duplicate - already defined above

  // Gares principales
  "gare de genève-cornavin": [6.1419, 46.2101],
  "gare de lausanne": [6.6286, 46.517],
  "gare de berne": [7.4397, 46.949],
  "gare de zurich": [8.5402, 47.3782],
  "zurich hb": [8.5402, 47.3782],
  "gare de bâle": [7.5895, 47.5476],
  "gare de lyon part-dieu": [4.859, 45.76],
  "gare de lyon perrache": [4.826, 45.749],
  "gare d'annecy": [6.121, 45.902],
  "gare de paris gare de lyon": [2.373, 48.845],
  "gare de paris gare du nord": [2.355, 48.88],
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

// Fonction pour calculer la distance routière la plus courte
async function calculateShortestDrivingDistance(
  originCoords: [number, number],
  destCoords: [number, number],
): Promise<number> {
  try {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

    console.log(`Calcul de la distance routière la plus courte entre:`)
    console.log(`Origine: [longitude: ${originCoords[0]}, latitude: ${originCoords[1]}]`)
    console.log(`Destination: [longitude: ${destCoords[0]}, latitude: ${destCoords[1]}]`)

    // Utiliser l'API Directions avec le profil "driving" et demander des alternatives
    // Utiliser le paramètre annotations=distance pour obtenir des informations détaillées sur la distance
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoords[0]},${originCoords[1]};${destCoords[0]},${destCoords[1]}?access_token=${mapboxToken}&geometries=geojson&overview=full&alternatives=true&annotations=distance`

    const response = await fetch(directionsUrl, { cache: "no-store" })

    if (!response.ok) {
      throw new Error(`Erreur API Directions: ${response.status}`)
    }

    const data = await response.json()

    if (!data.routes || data.routes.length === 0) {
      throw new Error("Aucun itinéraire trouvé")
    }

    // Trouver l'itinéraire avec la distance la plus courte
    let shortestRoute = data.routes[0]
    for (const route of data.routes) {
      if (route.distance < shortestRoute.distance) {
        shortestRoute = route
      }
    }

    // La distance est en mètres, convertir en km sans facteur de correction
    const distanceInMeters = shortestRoute.distance
    const distanceInKm = Math.round(distanceInMeters / 1000)

    console.log(`Distance routière la plus courte: ${distanceInKm} km (${distanceInMeters} mètres)`)
    console.log(`Durée estimée: ${Math.round(shortestRoute.duration / 60)} minutes`)

    return distanceInKm
  } catch (error) {
    console.error("Erreur lors du calcul de la distance routière:", error)
    return 100 // Valeur par défaut
  }
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

    // 1. Essayer d'abord de trouver les coordonnées dans notre base de données
    const originNormalized = findClosestKnownPlace(origin)
    const destNormalized = findClosestKnownPlace(destination)

    if (originNormalized && destNormalized) {
      console.log(`Lieux normalisés: "${originNormalized}" → "${destNormalized}"`)

      // Si nous avons les coordonnées, utiliser l'API Directions
      if (knownLocations[originNormalized] && knownLocations[destNormalized]) {
        const originCoords = knownLocations[originNormalized]
        const destCoords = knownLocations[destNormalized]

        console.log(`Coordonnées trouvées dans la base de données:`)
        console.log(`Origine (${originNormalized}): [longitude: ${originCoords[0]}, latitude: ${originCoords[1]}]`)
        console.log(`Destination (${destNormalized}): [longitude: ${destCoords[0]}, latitude: ${destCoords[1]}]`)

        return await calculateShortestDrivingDistance(originCoords, destCoords)
      }
    }

    // 2. Si nous n'avons pas trouvé dans notre base de données, utiliser le géocodage puis l'API Directions
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY

    if (!mapboxToken) {
      console.error("Clé API Mapbox manquante")
      return null
    }

    // Géocoder les adresses avec plus de précision
    async function geocodeAddress(address: string): Promise<[number, number] | null> {
      console.log(`Géocodage de l'adresse: "${address}"`)

      try {
        // Prétraiter l'adresse pour améliorer les résultats
        let processedAddress = address

        // Ajouter le pays si non spécifié
        if (
          !processedAddress.toLowerCase().includes("suisse") &&
          !processedAddress.toLowerCase().includes("switzerland") &&
          !processedAddress.toLowerCase().includes("france")
        ) {
          // Déterminer si c'est probablement en Suisse ou en France
          const isFrenchCity = [
            "paris",
            "lyon",
            "annecy",
            "chamonix",
            "grenoble",
            "annemasse",
            "thonon",
            "evian",
            "chambéry",
            "megève",
          ].some((city) => processedAddress.toLowerCase().includes(city))

          processedAddress += isFrenchCity ? ", France" : ", Suisse"
        }

        console.log(`Adresse prétraitée: "${processedAddress}"`)

        // Utiliser des types plus précis et augmenter la limite pour de meilleurs résultats
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(processedAddress)}.json?access_token=${mapboxToken}&limit=1&types=place,locality,address,poi&country=CH,FR`,
          { cache: "no-store" },
        )

        if (!response.ok) {
          throw new Error(`Erreur de géocodage: ${response.status}`)
        }

        const data = await response.json()

        if (!data.features || data.features.length === 0) {
          throw new Error(`Aucun résultat trouvé pour l'adresse: ${processedAddress}`)
        }

        // Mapbox retourne les coordonnées au format [longitude, latitude]
        const coordinates = data.features[0].center
        console.log(
          `Coordonnées trouvées: [longitude: ${coordinates[0]}, latitude: ${coordinates[1]}] pour "${processedAddress}"`,
        )
        console.log(`Type de lieu: ${data.features[0].place_type.join(", ")}, Nom: ${data.features[0].text}`)
        console.log(`Nom complet: ${data.features[0].place_name}`)

        return coordinates
      } catch (error) {
        console.error(`Erreur lors du géocodage de "${address}":`, error)
        return null
      }
    }

    // Obtenir les coordonnées
    const originCoords = await geocodeAddress(origin)
    const destCoords = await geocodeAddress(destination)

    if (!originCoords || !destCoords) {
      console.error("Impossible d'obtenir les coordonnées")
      return 100 // Valeur par défaut
    }

    // Calculer la distance routière avec l'API Directions
    return await calculateShortestDrivingDistance(originCoords, destCoords)
  } catch (error) {
    console.error("Erreur lors du calcul de la distance:", error)
    return 100 // Valeur par défaut
  }
}

