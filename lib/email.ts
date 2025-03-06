// Service pour envoyer des emails via MailerSend
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string
  subject: string
  html: string
  text: string
}) {
  try {
    const apiKey = process.env.MAILERSEND_API_KEY
    const fromEmail = "trial-pxkjn419w6pgz781.mlsender.net" // Use the verified trial domain
    const fromName = process.env.MAILERSEND_FROM_NAME

    if (!apiKey || !fromEmail || !fromName) {
      throw new Error("Configuration MailerSend manquante dans les variables d'environnement")
    }

    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: {
          email: fromEmail,
          name: fromName,
        },
        to: [
          {
            email: to,
            name: "Destinataire",
          },
        ],
        subject,
        html,
        text,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Erreur MailerSend: ${JSON.stringify(errorData)}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error)
    return { success: false, error }
  }
}

// Fonction pour formater les données de réservation en HTML pour l'email
export function formatBookingDataToHtml(bookingData: any) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #8e7d3f; border-bottom: 2px solid #8e7d3f; padding-bottom: 10px; }
          h2 { color: #8e7d3f; margin-top: 20px; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; }
          table { width: 100%; border-collapse: collapse; }
          table, th, td { border: 1px solid #ddd; }
          th, td { padding: 10px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Nouvelle réservation - Allure Limousine</h1>
          
          <div class="section">
            <h2>Informations client</h2>
            <p><span class="label">Nom:</span> ${bookingData.customerInfo.lastName}</p>
            <p><span class="label">Prénom:</span> ${bookingData.customerInfo.firstName}</p>
            <p><span class="label">Email:</span> ${bookingData.customerInfo.email}</p>
            <p><span class="label">Téléphone:</span> ${bookingData.customerInfo.phone}</p>
            ${bookingData.customerInfo.message ? `<p><span class="label">Message:</span> ${bookingData.customerInfo.message}</p>` : ""}
          </div>
          
          <div class="section">
            <h2>Détails de la réservation</h2>
            <p><span class="label">Véhicule:</span> ${bookingData.vehicle}</p>
            <p><span class="label">Service:</span> ${bookingData.withDriver ? "Avec chauffeur" : "Sans chauffeur"}</p>
            <p><span class="label">Lieu de prise en charge:</span> ${bookingData.pickup}</p>
            <p><span class="label">Lieu de retour:</span> ${bookingData.dropoff}</p>
            <p><span class="label">Date de départ:</span> ${new Date(bookingData.fromDate).toLocaleDateString("fr-FR")}</p>
            <p><span class="label">Date de retour:</span> ${new Date(bookingData.toDate).toLocaleDateString("fr-FR")}</p>
            <p><span class="label">Distance estimée:</span> ${bookingData.distance} km</p>
            <p><span class="label">Durée:</span> ${bookingData.duration} jours</p>
            <p><span class="label">Option de paiement:</span> ${bookingData.paymentOption === "flexible" ? "Flexible (+10%)" : "Meilleur prix"}</p>
            <p><span class="label">Prix total:</span> ${bookingData.totalPrice.toFixed(2)} CHF</p>
          </div>
        </div>
      </body>
    </html>
  `
}

// Version texte simple pour les clients qui ne peuvent pas afficher le HTML
export function formatBookingDataToText(bookingData: any) {
  return `
NOUVELLE RÉSERVATION - ALLURE LIMOUSINE

INFORMATIONS CLIENT
------------------
Nom: ${bookingData.customerInfo.lastName}
Prénom: ${bookingData.customerInfo.firstName}
Email: ${bookingData.customerInfo.email}
Téléphone: ${bookingData.customerInfo.phone}
${bookingData.customerInfo.message ? `Message: ${bookingData.customerInfo.message}` : ""}

DÉTAILS DE LA RÉSERVATION
-------------------------
Véhicule: ${bookingData.vehicle}
Service: ${bookingData.withDriver ? "Avec chauffeur" : "Sans chauffeur"}
Lieu de prise en charge: ${bookingData.pickup}
Lieu de retour: ${bookingData.dropoff}
Date de départ: ${new Date(bookingData.fromDate).toLocaleDateString("fr-FR")}
Date de retour: ${new Date(bookingData.toDate).toLocaleDateString("fr-FR")}
Distance estimée: ${bookingData.distance} km
Durée: ${bookingData.duration} jours
Option de paiement: ${bookingData.paymentOption === "flexible" ? "Flexible (+10%)" : "Meilleur prix"}
Prix total: ${bookingData.totalPrice.toFixed(2)} CHF
  `
}

