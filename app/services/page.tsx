export default function ServicesPage() {
  return (
    <main>
      {/* Section titre et description */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Image de fond avec position ajustée pour montrer davantage le véhicule */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YiW2EvTIhVBVg7mGvnAqRj1SEOFke2.png"
            alt="Mercedes-Benz de luxe devant un palace"
            className="w-full h-full object-cover object-[center_85%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#8e7d3f]/50 to-black/70" />
        </div>

        {/* Contenu */}
        <div className="relative z-10 text-center px-4 py-20 mt-16">
          <h1 className="font-['Georgia'] text-5xl md:text-7xl text-white mb-6">Nos services</h1>
          <div className="w-24 h-[2px] bg-[#8e7d3f] mx-auto mb-6"></div>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            POUR VOTRE SATISFACTION, NOS SERVICES SONT PERSONNALISABLES A VOTRE CONVENANCe
          </p>
          <p className="text-white/80 max-w-2xl mx-auto text-base mt-4">
            Les prestations de transport Allure Limousine sont élaborées pour que nos clients se sentent totalement
            satisfaits. Professionnels ou personnels, courts ou de longue durées, seul ou à plusieurs.
          </p>
          <div className="mt-6 text-white/90 text-lg font-semibold">
            Nos mots d'ordre sont Professionnalisme et Rigueur.
          </div>
        </div>
      </section>

      {/* Section services */}
      <section className="relative py-20 bg-gray-900">
        {/* Image de fond */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kycui4Jr9GMqbLrAZYQpz1CflLPnZP.png"
            alt="Fond de luxe"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service sur mesure */}
            <div className="relative overflow-hidden rounded-lg bg-black/70 backdrop-blur-md text-white border border-[#8e7d3f]/30 shadow-lg">
              {/* Ajouter un effet de lueur subtil */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8e7d3f]/10 via-transparent to-black/50 pointer-events-none" />
              <div className="aspect-video relative z-10">
                <img
                  src="https://www.serviceprestige.fr/images/layerslider/header-accueil/background-header-service-prestige-nos-services.jpg"
                  alt="Service sur mesure"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-['Georgia'] text-[#8e7d3f]">
                  Service sur mesure
                </h3>
              </div>
              <div className="p-6 text-white space-y-2 relative z-10">
                <p>• Mise à votre disposition de voitures avec chauffeurs</p>
                <p>• Allant des quelques heures à plusieurs jours</p>
                <p>• 24/7 selon vos besoins</p>
              </div>
            </div>

            {/* Transferts */}
            <div className="relative overflow-hidden rounded-lg bg-black/70 backdrop-blur-md text-white border border-[#8e7d3f]/30 shadow-lg">
              {/* Ajouter un effet de lueur subtil */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8e7d3f]/10 via-transparent to-black/50 pointer-events-none" />
              <div className="aspect-video relative z-10">
                <img
                  src="https://www.elite-prestige-services.fr/wp-content/uploads/2024/07/elite-prestige-services-aeroport.jpg"
                  alt="Transferts"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-['Georgia'] text-[#8e7d3f]">Transferts</h3>
              </div>
              <div className="p-6 text-white space-y-2 relative z-10">
                <p>• Transfert aéroport - Genève Centre</p>
                <p>• Transfert aéroport - hôtels</p>
                <p>• Transfert de l'aéroport aux stations de ski</p>
              </div>
            </div>

            {/* Location de voiture */}
            <div className="relative overflow-hidden rounded-lg bg-black/70 backdrop-blur-md text-white border border-[#8e7d3f]/30 shadow-lg">
              {/* Ajouter un effet de lueur subtil */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8e7d3f]/10 via-transparent to-black/50 pointer-events-none" />
              <div className="aspect-video relative z-10">
                <img
                  src="https://www.luxury-club.fr/wp-content/uploads/2021/05/mercedes-classe-s-2022-1-scaled.jpg"
                  alt="Location de voiture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-['Georgia'] text-[#8e7d3f]">
                  Location de voiture
                </h3>
              </div>
              <div className="p-6 text-white relative z-10">
                <p>• Louez nos véhicules avec ou sans chauffeur</p>
              </div>
            </div>

            {/* Service affaires */}
            <div className="relative overflow-hidden rounded-lg bg-black/70 backdrop-blur-md text-white border border-[#8e7d3f]/30 shadow-lg">
              {/* Ajouter un effet de lueur subtil */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8e7d3f]/10 via-transparent to-black/50 pointer-events-none" />
              <div className="aspect-video relative z-10">
                <img
                  src="https://www.ruby-services.com/fr/images/location-de-voiture-avec-chauffeur-pour-un-evenement-sur-la-cote-dazur_pd40716w2440h1500rcrop_1f3.jpg"
                  alt="Service affaires"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-['Georgia'] text-[#8e7d3f]">Service affaires</h3>
              </div>
              <div className="p-6 text-white space-y-2 relative z-10">
                <p>• Accueil personnalisé et prise en charge dès votre arrivée</p>
                <p>• Organisation de vos séminaires et rendez-vous d'affaires</p>
              </div>
            </div>
          </div>
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

