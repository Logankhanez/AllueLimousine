"use client"

import CitySearch from "@/app/components/City-search"
import TextReveal from "@/components/motion/text-reveal"
import { motion } from "framer-motion"
import Logo from "@/components/logo"
import { useMobile } from "@/hooks/use-mobile"

export default function Page() {
  const { isMobile } = useMobile()
  return (
    <main>
      {/* Première section vidéo */}
      <section className="relative h-[100vh]">
        <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#8e7d3f]" />
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="h-full w-full object-cover"
          poster="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vid%C3%A9o%20sans%20titre%20%E2%80%90%20R%C3%A9alis%C3%A9e%20avec%20Clipchamp%20(4)-qYAoTHIGldcA8PwF0Wo2Pp8pbDXJrB.mp4"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vid%C3%A9o%20sans%20titre%20%E2%80%90%20R%C3%A9alis%C3%A9e%20avec%20Clipchamp%20(4)-qYAoTHIGldcA8PwF0Wo2Pp8pbDXJrB.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <TextReveal
            text="Allure"
            className={`font-['Times_New_Roman'] text-[#8e7d3f] ${isMobile ? "text-5xl" : "text-7xl md:text-9xl"}`}
          />
          <TextReveal
            text="Limousine"
            className={`font-['Times_New_Roman'] text-[#8e7d3f] ${isMobile ? "text-5xl" : "text-7xl md:text-9xl"}`}
            delay={0.5}
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className={`font-['Times_New_Roman'] text-[#8e7d3f] ${isMobile ? "text-xl" : "text-3xl md:text-5xl"} mt-4`}
          >
            Votre confort, notre mission
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#8e7d3f]" />
      </section>

      {/* Section formulaire de réservation avec fond amélioré */}
      <section className="relative py-12 bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kycui4Jr9GMqbLrAZYQpz1CflLPnZP.png"
            alt="Fond de luxe"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-['Georgia'] text-[#8e7d3f] text-center mb-6">
              Réservez votre trajet de luxe
            </h2>
            <div className="w-12 h-[2px] bg-[#8e7d3f] mx-auto mb-8"></div>
            <CitySearch />
          </div>
        </div>
      </section>

      {/* Section texte */}
      <section className="relative py-20 bg-white">
        <div className="max-w-[800px] mx-auto text-center px-4">
          <h1 className="font-['Georgia'] text-4xl md:text-5xl text-[#8e7d3f] mb-2">
            L&apos;un des meilleurs services de
            <br />
            Genève et alentours.
          </h1>
          <div className="text-[#8e7d3f] text-2xl mb-6">×</div>
          <p className="text-[#666666] text-sm md:text-base leading-relaxed max-w-[850px] mx-auto">
            Découvrez l&apos;un des meilleurs services de Genève ainsi qu&apos;en France voisine, spécialisé dans le
            transport de prestige avec des véhicules haut de gamme. Notre société de chauffeurs professionnels vous
            offre une expérience de voyage inégalée, alliant confort, sécurité et élégance. Que ce soit pour des
            déplacements professionnels ou des occasions spéciales, nous sommes là pour vous offrir un service
            personnalisé à la hauteur de vos attentes. Faites le choix de l&apos;excellence et laisser nous vous
            conduire avec style.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#8e7d3f]" />
      </section>

      {/* Deuxième section vidéo avec superposition */}
      <section className="relative h-[50vh]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#8e7d3f]" />
        <video
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="h-full w-full object-cover"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vid%C3%A9o%20sans%20titre%20%E2%80%90%20R%C3%A9alis%C3%A9e%20avec%20Clipchamp%20(5)-flY8eidNpKNxuJflAnnTn2UKCEPNTv.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        {/* Contenu superposé */}
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="text-center font-['Georgia'] text-4xl md:text-5xl text-[#8e7d3f] mb-16">
              Nos Engagements en Matière de Service
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-4">
                <h3 className="font-['Georgia'] text-[#8e7d3f] text-2xl italic">Discret</h3>
                <p className="text-white text-sm leading-relaxed">
                  Un service qui respecte votre intimité et assure une confidentialité totale.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-['Georgia'] text-[#8e7d3f] text-2xl italic">Exclusif</h3>
                <p className="text-white text-sm leading-relaxed">
                  Des prestations uniques et sur mesure, réservées à une clientèle privilégiée.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-['Georgia'] text-[#8e7d3f] text-2xl italic">Raffiné</h3>
                <p className="text-white text-sm leading-relaxed">
                  Une attention aux détails et une élégance inégalée dans chaque aspect du service.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-['Georgia'] text-[#8e7d3f] text-2xl italic">Personnalisé</h3>
                <p className="text-white text-sm leading-relaxed">
                  Des solutions adaptées spécifiquement à vos besoins et préférences individuelles.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#8e7d3f]" />
      </section>

      {/* Section newsletter */}
      <section className="relative py-20 bg-white">
        <div className="max-w-[800px] mx-auto text-center px-4">
          <h2 className="font-['Georgia'] text-4xl md:text-5xl text-[#8e7d3f] mb-4">Rejoignez le club</h2>
          <div className="text-[#8e7d3f] text-xl mb-4">&</div>
          <p className="text-[#666666] text-sm md:text-base mb-4">
            Recevez des mises à jour sur les événements spéciaux.
          </p>
          <div className="text-[#8e7d3f] text-2xl mb-8">×</div>

          <form className="max-w-md mx-auto w-full px-4 sm:px-0">
            <input
              type="email"
              placeholder="Enter your email here *"
              className="w-full px-4 py-3 mb-4 border border-[#8e7d3f] focus:outline-none focus:ring-2 focus:ring-[#8e7d3f] rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#8e7d3f] text-white py-3 hover:bg-[#8e7d3f]/90 transition-colors rounded"
            >
              Subscribe Now
            </button>
          </form>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#8e7d3f]" />
      </section>

      {/* Footer */}
      <footer className="relative bg-[#8e7d3f] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            {/* Logo et drapeau */}
            <div className="text-center md:text-left">
              <Logo className="h-24 w-auto mb-8" />
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

