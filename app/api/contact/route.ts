import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Récupérer les variables d'environnement existantes
    const apiKey = process.env.MAILERSEND_API_KEY
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL
    const fromName = process.env.MAILERSEND_FROM_NAME
    const toEmail = process.env.MAILERSEND_TO_EMAIL
    
    // Vérifier que les variables d'environnement sont définies
    if (!apiKey || !fromEmail || !fromName || !toEmail) {
      console.error("Configuration d'email manquante:", { 
        apiKeyExists: !!apiKey, 
        fromEmail: !!fromEmail, 
        fromName: !!fromName, 
        toEmail: !!toEmail 
      })
      return NextResponse.json(
        { error: "Configuration d'email manquante" },
        { status: 500 }
      )
    }
    
    // Générer un ID unique pour le message
    const messageId = Math.random().toString(36).substring(2, 10).toUpperCase()
    
    // Préparer les données pour l'API MailerSend
    const emailData = {
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
      subject: `Nouveau message de contact - ${data.firstName} ${data.lastName} (Réf: ${messageId})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h1 style="color: #8e7d3f; text-align: center;">Nouveau message de contact</h1>
          
          <h2>Informations du contact</h2>
          <p><strong>Prénom:</strong> ${data.firstName}</p>
          <p><strong>Nom:</strong> ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          
          <h2>Message</h2>
          <p>${data.message}</p>
          
          <p style="color: #666; font-size: 12px; margin-top: 30px; text-align: center;">
            Référence: ${messageId} | Date: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    }
    
    console.log("Envoi d'un email de contact...")
    
    // Utiliser la même méthode d'envoi que pour les réservations
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(emailData),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      console.error("Erreur MailerSend:", errorData)
      return NextResponse.json(
        { error: "Échec de l'envoi de l'email", details: errorData },
        { status: response.status }
      )
    }
    
    console.log("Email de contact envoyé avec succès")
    
    return NextResponse.json({
      success: true,
      reference: messageId,
      message: "Message envoyé avec succès",
    })
    
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error)
    return NextResponse.json(
      { 
        error: "Une erreur s'est produite lors de l'envoi du message",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
