import { NextResponse } from "next/server"

// Remplacez ces valeurs par vos informations d'API WhatsApp Business
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
const WHATSAPP_VERSION = "v17.0" // Version actuelle de l'API

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, userName, userEmail } = body

    // Formatage du message
    const formattedMessage = `Message de ${userName} (${userEmail}):\n\n${message}`

    // Préparation de la requête à l'API WhatsApp
    const whatsappPayload = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: process.env.ADMIN_WHATSAPP_NUMBER, // Votre numéro WhatsApp personnel
      type: "text",
      text: {
        body: formattedMessage,
      },
    }

    // Envoi du message via l'API WhatsApp
    const response = await fetch(
      `https://graph.facebook.com/${WHATSAPP_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(whatsappPayload),
      },
    )

    const responseData = await response.json()

    if (!response.ok) {
      console.error("Erreur API WhatsApp:", responseData)
      return NextResponse.json({ error: "Erreur lors de l'envoi du message WhatsApp" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data: responseData })
  } catch (error) {
    console.error("Erreur lors de l'envoi du message WhatsApp:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}

