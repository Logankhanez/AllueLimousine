import ContactForm from "@/components/contact-form"

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
                ci-dessous, et nous vous répondrons dans les plus brefs délais !
              </p>
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
        <div className="bg-[#D3D3D3] p-4 md:p-8 lg:p-12">
          <div className="max-w-[500px] mx-auto">
            {/* Informations de contact */}
            <div className="flex flex-col sm:flex-row justify-between text-sm text-[#666666] mb-8 sm:mb-12">
              <div className="mb-4 sm:mb-0">Genève 1203</div>
              <div className="flex gap-4">
                <span>EMAIL</span>
                <span className="hidden sm:inline">|</span>
                <span>01 23 45 67 89</span>
              </div>
            </div>

            {/* Formulaire */}
            <ContactForm />

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
      <section className="bg-[#BFBFBF] py-12 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-['Georgia'] text-3xl sm:text-4xl md:text-5xl text-[#8e7d3f] text-center mb-8 sm:mb-12">
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2757.675242456053!2d6.161657776891757!3d46.31824997131436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478c4508ffb6f58d%3A0x2783bd72b4b4e4cb!2sChem.%20des%20Chalets%205%2C%201279%20Chavannes-de-Bogis%2C%20Suisse!5e0!3m2!1sfr!2sfr!4v1708961843811!5m2!1sfr!2sfr&maptype=roadmap&style=feature:all|element:labels|visibility:on&style=feature:all|element:labels.text.fill|color:0xffffff&style=feature:all|element:labels.text.stroke|color:0x000000&style=feature:all|element:labels.icon|visibility:off&style=feature:poi|element:all|visibility:off&style=feature:road|element:all|saturation:-100|lightness:45&style=feature:road.highway|element:all|visibility:simplified&style=feature:road.arterial|element:labels.icon|visibility:off&style=feature:transit|element:all|visibility:off&style=feature:water|element:all|color:0x000000&style=feature:landscape|element:all|color:0x000000"
          className="w-full h-full border-0"
          allowFullScreen
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
              <h2 className="font-['Times_New_Roman'] text-4xl md:text-5xl mb-2">Allure</h2>
              <h2 className="font-['Times_New_Roman'] text-4xl md:text-5xl mb-8">Limousine</h2>
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
                <h3 className="text-sm font-semibold mb-4 font-avenir-light">LOCATION & HEURES</h3>
                <p className="text-sm mb-2 font-avenir-light">Chem. des Chalets 5, 1279 Chavannes-de-Bogis</p>
                <p className="text-sm font-avenir-light">Tous les jours également le Week-End 24h/24h</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-4 font-avenir-light">CONTACTER NOUS</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>✉</span>
                    <span className="text-sm font-avenir-light">Email</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span className="text-sm font-avenir-light">+41 XXXXXXXXX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm">
            <p className="font-avenir-light">© 2035</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

