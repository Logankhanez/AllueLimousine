import Logo from "@/components/logo"
import WhatsAppButton from "@/components/whatsapp-button"

export default function ContactPage() {
  return (
    <main>
      {/* Section titre et description */}
      <section className="relative bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="font-['Georgia'] text-4xl md:text-5xl text-[#8e7d3f] mb-8">Nous contacter</h1>
            <div className="space-y-2">
              <p className="text-[#666666] text-sm md:text-base">
                N&apos;hésitez pas à nous contacter pour toute question ou demande de réservation.
              </p>
              <p className="text-[#666666] text-sm md:text-base">
                Votre satisfaction est notre priorité et nous sommes là pour vous aider. Remplissez le formulaire
                ci-dessous, ou contactez-nous directement via WhatsApp pour une réponse rapide !
              </p>

              {/* Bouton WhatsApp */}
              <div className="mt-6 flex justify-center">
                <WhatsAppButton
                  phoneNumber="41791234567"
                  message="Bonjour, je souhaite obtenir des informations sur vos services de limousine."
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section formulaire avec image */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Image côté gauche */}
        <div className="relative h-[400px] md:h-auto">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chaf.jpg-z53jcV9g8VL13Zwyo0uEyF1AYO8BkA.jpeg"
            alt="Chauffeur professionnel ouvrant la porte d'une Mercedes de luxe"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formulaire côté droit */}
        <div className="bg-[#D3D3D3] p-8 md:p-12">
          <div className="max-w-[500px] mx-auto">
            {/* Informations de contact */}
            <div className="flex justify-between text-sm text-[#666666] mb-12">
              <div>Genève 1203</div>
              <div className="flex gap-4">
                <span>EMAIL</span>
                <span>|</span>
                <span>01 23 45 67 89</span>
              </div>
            </div>

            {/* Formulaire */}
            <form className="space-y-6">
              {/* Prénom et Nom */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Prénom"
                    className="w-full border-b border-[#666666] bg-transparent p-2 focus:outline-none focus:border-[#8e7d3f]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Nom"
                    className="w-full border-b border-[#666666] bg-transparent p-2 focus:outline-none focus:border-[#8e7d3f]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="E-mail *"
                  required
                  className="w-full border-b border-[#666666] bg-transparent p-2 focus:outline-none focus:border-[#8e7d3f]"
                />
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="w-full border-b border-[#666666] bg-transparent p-2 focus:outline-none focus:border-[#8e7d3f] resize-none"
                />
              </div>

              {/* Bouton Envoyer */}
              <div>
                <button
                  type="submit"
                  className="bg-[#8e7d3f] text-white px-8 py-2 hover:bg-[#8e7d3f]/90 transition-colors"
                >
                  Envoyer
                </button>
              </div>
            </form>

            {/* Réseaux sociaux */}
            <div className="flex gap-4 mt-8">
              <a href="#" className="text-[#666666] hover:text-[#8e7d3f] transition-colors flex items-center gap-2">
                <span className="text-sm">Facebook</span>
              </a>
              <a href="#" className="text-[#666666] hover:text-[#8e7d3f] transition-colors flex items-center gap-2">
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section horaires d'ouverture */}
      <section className="bg-[#BFBFBF] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-['Georgia'] text-4xl md:text-5xl text-[#8e7d3f] text-center mb-12">
              Horaires d&apos;ouverture
            </h2>
            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[#666666]">
                  <span className="text-sm md:text-base">Lun. - ven.</span>
                  <span className="text-sm md:text-base">8 h - 20 h</span>
                </div>
                <div className="flex justify-between items-center text-[#666666]">
                  <span className="text-sm md:text-base">Samedi</span>
                  <span className="text-sm md:text-base">9 h - 21 h</span>
                </div>
                <div className="flex justify-between items-center text-[#666666]">
                  <span className="text-sm md:text-base">Dimanche</span>
                  <span className="text-sm md:text-base">Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section carte */}
      <section className="h-[400px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2757.675242456053!2d6.161657776891757!3d46.31824997131436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c4508ffb6f58d%3A0x2783bd72b4b4e4cb!2sChem.%20des%20Chalets%205%2C%201279%20Chavannes-de-Bogis%2C%20Suisse!5e0!3m2!1sfr!2sfr!4v1708961843811!5m2!1sfr!2sfr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#8e7d3f] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            {/* Logo et drapeau */}
            <div className="text-center md:text-left">
              <Logo className="h-32 w-auto mb-8" />
              <div className="flex justify-center md:justify-start">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Civil_Ensign_of_Switzerland.svg%20(1)-bPbKC8IbHZNpXYzoIV0F4QaOM6fX9P.png"
                  alt="Drapeau suisse"
                  className="w-16 h-12 object-cover"
                />
              </div>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-semibold mb-4 font-light">LOCATION & HEURES</h3>
                <p className="text-sm mb-2 font-light">Chem. des Chalets 5, 1279 Chavannes-de-Bogis</p>
                <p className="text-sm font-light">Tous les jours également le Week-End 24h/24h</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4 font-light">CONTACTER NOUS</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>✉</span>
                    <span className="text-sm font-light">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span className="text-sm font-light">+41 XXXXXXXXX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm">
            <p className="font-light">© 2035</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

