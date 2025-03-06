import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Récupérer les variables d'environnement
    const apiKey = process.env.MAILERSEND_API_KEY
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL || "contact@trial-pxkjn419w6pgz781.mlsender.net"
    const fromName = process.env.MAILERSEND_FROM_NAME || "Allure Limousine"
    const toEmail = process.env.MAILERSEND_TO_EMAIL || "lamkaddem@itech-solution.ch"

    // Et ajouter un log pour vérifier que les variables sont bien récupérées
    console.log("Configuration email:", {
      apiKeyExists: !!apiKey,
      fromEmail,
      fromName,
      toEmail,
    })

    if (!apiKey || !toEmail) {
      console.error("Configuration d'email manquante:", { apiKey: !!apiKey, toEmail: !!toEmail })
      return NextResponse.json({ error: "Configuration d'email manquante" }, { status: 500 })
    }

    // Générer une référence unique pour la réservation
    const reservationRef = data.reference || Math.random().toString(36).substring(2, 10).toUpperCase()

    // 1. Email pour l'administrateur
    const adminEmailData = {
      to: [
        {
          email: toEmail,
          name: "Administrateur",
        },
      ],
      from: {
        email: fromEmail,
        name: fromName,
      },
      subject: `Nouvelle réservation de véhicule - ${data.vehicle} (Réf: ${reservationRef})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h1 style="color: #8e7d3f; text-align: center;">Nouvelle réservation de véhicule</h1>
          
          <h2>Informations du client</h2>
          <p><strong>Nom:</strong> ${data.lastName}</p>
          <p><strong>Prénom:</strong> ${data.firstName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Téléphone:</strong> ${data.phone}</p>
          
          <h2>Détails de la réservation</h2>
          <p><strong>Référence:</strong> ${reservationRef}</p>
          <p><strong>Véhicule:</strong> ${data.vehicle}</p>
          <p><strong>Type:</strong> ${data.vehicleType || "Non spécifié"}</p>
          <p><strong>Service:</strong> ${data.withDriver ? "Avec chauffeur" : "Sans chauffeur"}</p>
          <p><strong>Type de trajet:</strong> ${data.roundTrip ? "Aller-retour" : "Aller simple"}</p>
          <p><strong>Lieu de prise en charge:</strong> ${data.pickup || "Non spécifié"}</p>
          <p><strong>Lieu de retour:</strong> ${data.dropoff || "Non spécifié"}</p>
          <p><strong>Distance estimée:</strong> ${data.distance ? `${data.distance} km${data.roundTrip ? ` (aller simple) / ${data.distance * 2} km (aller-retour)` : ""}` : "Non spécifiée"}</p>
          <p><strong>Prix total:</strong> ${data.totalPrice ? `${data.totalPrice.toFixed(2)} CHF` : "Non spécifié"}</p>
          <p><strong>Option de paiement:</strong> ${data.paymentOption === "flexible" ? "Flexible (+10%)" : "Meilleur prix"}</p>
          
          <h2>Message du client</h2>
          <p>${data.message || "Aucun message"}</p>
        </div>
      `,
    }

    // 2. Email de confirmation pour le client
    const clientEmailData = {
      to: [
        {
          email: data.email,
          name: `${data.firstName} ${data.lastName}`,
        },
      ],
      from: {
        email: fromEmail,
        name: fromName,
      },
      subject: `Confirmation de votre réservation - ${data.vehicle} (Réf: ${reservationRef})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #8e7d3f;">Confirmation de Réservation</h1>
          </div>
          
          <p>Bonjour ${data.firstName} ${data.lastName},</p>
          
          <p>Nous vous remercions pour votre réservation. Voici un récapitulatif des détails :</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Référence :</strong> ${reservationRef}</p>
            <p><strong>Véhicule :</strong> ${data.vehicle}</p>
            <p><strong>Service :</strong> ${data.withDriver ? "Avec chauffeur" : "Sans chauffeur"}</p>
            <p><strong>Type de trajet:</strong> ${data.roundTrip ? "Aller-retour" : "Aller simple"}</p>
            ${data.pickup ? `<p><strong>Trajet :</strong> ${data.pickup} à ${data.dropoff || data.pickup}</p>` : ""}
            ${data.distance ? `<p><strong>Distance estimée :</strong> ${data.distance} km${data.roundTrip ? ` (aller simple) / ${data.distance * 2} km (aller-retour)` : ""}</p>` : ""}
            ${data.totalPrice ? `<p><strong>Prix total :</strong> ${data.totalPrice.toFixed(2)} CHF</p>` : ""}
            <p><strong>Option de paiement :</strong> ${data.paymentOption === "flexible" ? "Flexible (+10%)" : "Meilleur prix"}</p>
          </div>
          
          <p>Notre équipe vous contactera prochainement pour finaliser les détails de votre réservation.</p>
          
          <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
          
          <p>Cordialement,<br>L'équipe Allure Limousine</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #777;">
            <p>Allure Limousine - Service de transport de luxe</p>
            <p>Cet email est envoyé automatiquement, merci de ne pas y répondre.</p>
          </div>
        </div>
      `,
    }

    console.log("Envoi de l'email à l'administrateur...")

    // Envoyer l'email à l'administrateur via l'API MailerSend
    const adminResponse = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(adminEmailData),
    })

    if (!adminResponse.ok) {
      const errorData = await adminResponse.json()
      console.error("Erreur MailerSend (admin):", errorData)
      return NextResponse.json(
        {
          error: "Échec de l'envoi de l'email à l'administrateur",
          details: errorData,
        },
        { status: adminResponse.status },
      )
    }

    console.log("Email administrateur envoyé avec succès")
    console.log("Envoi de l'email de confirmation au client...")

    // Envoyer l'email au client via l'API MailerSend
    const clientResponse = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(clientEmailData),
    })

    if (!clientResponse.ok) {
      const errorData = await clientResponse.json()
      console.error("Erreur MailerSend (client):", errorData)
      // On continue même si l'email client échoue, pour ne pas bloquer le processus
      console.warn("L'email de confirmation au client n'a pas pu être envoyé")
    } else {
      console.log("Email client envoyé avec succès")
    }

    return NextResponse.json({
      success: true,
      reference: reservationRef,
      message: "Emails envoyés avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de l'envoi des emails:", error)
    return NextResponse.json(
      {
        error: "Une erreur s'est produite lors de l'envoi des emails",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

