export default function TransportPage() {
  return (
    <main>
      {/* Section titre et description */}
      <section className="relative bg-[#8e7d3f] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="font-['Georgia'] text-4xl md:text-5xl text-white mb-8">Limousine & Viano</h1>
            <p className="text-white text-sm md:text-base leading-relaxed">
              Nous offrons des services de limousine, de transport de personnes et de gestion de bagages. Profitez
              d&apos;une logistique exclusive et sur mesure, de l&apos;organisation de vos déplacements à
              l&apos;entretien de votre flotte automobile, le tout à des tarifs avantageux. Allure Limousine met son
              expertise à votre disposition pour répondre à vos attentes et mériter votre confiance.
            </p>
          </div>
        </div>
      </section>

      {/* Section Mission avec image */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Image côté gauche */}
        <div className="relative h-[280px] md:h-[450px]">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/450973-mercedes-maybach-s-580-2021-vous-n-en-croirez-pas-vos-yeux1605902556846.jpg-JSSSXetG3i0UytDjxFfsVGsIQmGAcS.jpeg"
            alt="Intérieur luxueux d'une Mercedes-Maybach"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Texte côté droit */}
        <div className="flex items-center bg-white p-6 md:p-12">
          <div className="max-w-[500px] mx-auto text-center">
            <h2 className="font-['Georgia'] text-4xl md:text-5xl text-[#8e7d3f] mb-5">Mission</h2>
            <p className="text-[#8e7d3f] text-sm md:text-base leading-relaxed">
              Offrir des services de conciergerie et de transport de luxe sur mesure, alliant discrétion, exclusivité et
              raffinement, pour satisfaire les besoins uniques de nos clients. Nous nous engageons à fournir des
              solutions personnalisées avec une attention méticuleuse aux détails, garantissant une expérience
              exceptionnelle à chaque interaction.
            </p>
          </div>
        </div>
      </section>

      {/* Section Vision avec image */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        {/* Texte côté gauche */}
        <div className="flex items-center bg-white p-6 md:p-12 md:order-1">
          <div className="max-w-[500px] mx-auto text-center">
            <h2 className="font-['Georgia'] text-4xl md:text-5xl text-[#8e7d3f] mb-5">Vision</h2>
            <p className="text-[#8e7d3f] text-sm md:text-base leading-relaxed">
              Être le leader mondial en services de chauffeur de prestige, reconnu pour notre excellence, notre
              discrétion et notre capacité à dépasser les attentes de notre clientèle privilégiée.
            </p>
          </div>
        </div>

        {/* Image côté droit */}
        <div className="relative h-[280px] md:h-[450px] md:order-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20c0535022.jpg-K34gVECExxO8AkUGe2U7umA5eO5J9c.jpeg"
            alt="Intérieur luxueux Mercedes-Maybach avec sièges en cuir beige matelassé"
            className="w-full h-full object-cover"
          />
        </div>
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

