import { NextResponse } from "next/server"
import { sendEmail, formatBookingDataToHtml, formatBookingDataToText } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const bookingData = await request.json()

    // Validation des données
    if (!bookingData.vehicle || !bookingData.customerInfo?.email) {
      return NextResponse.json({ error: "Données de réservation incomplètes" }, { status: 400 })
    }

    // Formatage des données pour l'email
    const htmlContent = formatBookingDataToHtml(bookingData)
    const textContent = formatBookingDataToText(bookingData)

    // Envoi de l'email
    const result = await sendEmail({
      to: process.env.MAILERSEND_TO_EMAIL || bookingData.customerInfo.email,
      subject: `Nouvelle réservation - ${bookingData.vehicle}`,
      html: htmlContent,
      text: textContent,
    })

    if (!result.success) {
      throw new Error("Échec de l'envoi de l'email")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur lors du traitement de la réservation:", error)
    return NextResponse.json({ error: "Erreur lors du traitement de la réservation" }, { status: 500 })
  }
}

