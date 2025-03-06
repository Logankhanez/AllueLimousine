import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { number, message, userName, userEmail } = body

    // Ici, vous pourriez implémenter une logique pour envoyer une notification
    // à votre téléphone via un service tiers comme Twilio, MessageBird, etc.

    // Pour l'instant, nous allons simplement logger les informations
    console.log(`Notification WhatsApp pour ${number}:`)
    console.log(`De: ${userName} (${userEmail})`)
    console.log(`Message: ${message}`)

    // Vous pourriez également envoyer un email de notification
    // ou utiliser un webhook pour notifier un service externe

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors de la notification WhatsApp:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de la notification" }, { status: 500 })
  }
}

