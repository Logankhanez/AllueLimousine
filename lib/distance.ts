import { calculateDistance as calculateDistanceClient } from "./distance-client"

// Améliorons la fonction calculateDistance pour ajouter plus de logging et de robustesse
export async function calculateDistance(origin: string, destination: string): Promise<number | null> {
  try {
    console.log(`Calcul de la distance routière entre "${origin}" et "${destination}"...`)

    // Vérifier si les lieux sont identiques
    if (origin.toLowerCase() === destination.toLowerCase()) {
      console.log("Origine et destination identiques, distance fixée à 0 km")
      return 0
    }

    // Prétraitement des noms de lieux pour gérer les cas particuliers
    let processedOrigin = origin
    let processedDestination = destination

    // Correction pour Valserhône et ses anciennes communes
    if (
      processedOrigin.toLowerCase().includes("bellegarde") ||
      processedOrigin.toLowerCase().includes("valserhone") ||
      processedOrigin.toLowerCase().includes("valserhône") ||
      processedOrigin.toLowerCase().includes("chatillon-en-michaille") ||
      processedOrigin.toLowerCase().includes("lancrans")
    ) {
      processedOrigin = "Valserhône, France"
      console.log(`Origine normalisée: "${processedOrigin}"`)
    }

    if (
      processedDestination.toLowerCase().includes("bellegarde") ||
      processedDestination.toLowerCase().includes("valserhone") ||
      processedDestination.toLowerCase().includes("valserhône") ||
      processedDestination.toLowerCase().includes("chatillon-en-michaille") ||
      processedDestination.toLowerCase().includes("lancrans")
    ) {
      processedDestination = "Valserhône, France"
      console.log(`Destination normalisée: "${processedDestination}"`)
    }

    // Utiliser notre implémentation client-side
    return await calculateDistanceClient(processedOrigin, processedDestination)
  } catch (error) {
    console.error("Erreur lors du calcul de la distance routière:", error)
    // En cas d'erreur, retourner une valeur par défaut
    return 100
  }
}

