"use client"

import ParallaxImage from "@/components/motion/parallax-image"
import SplitTextReveal from "@/components/motion/split-text-reveal"
import CountUp from "@/components/motion/count-up"
import RevealMask from "@/components/motion/reveal-mask"
import TiltCard from "@/components/motion/tilt-card"
import AnimateOnScroll from "@/components/motion/animate-on-scroll"

export default function AnimationsExamplePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Section Titre */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <ParallaxImage
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-YiW2EvTIhVBVg7mGvnAqRj1SEOFke2.png"
          alt="Luxury car"
          className="absolute inset-0 w-full h-full"
          speed={-0.3}
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4">
          <SplitTextReveal
            text="Découvrez nos animations"
            className="font-['Georgia'] text-5xl md:text-7xl text-white mb-6"
            type="words"
            direction="up"
          />
          <SplitTextReveal
            text="Pour une expérience utilisateur exceptionnelle"
            className="text-white/90 max-w-2xl mx-auto text-lg"
            type="words"
            direction="up"
            delay={0.5}
          />
        </div>
      </section>

      {/* Section Compteurs */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#8e7d3f]">Nos chiffres clés</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <CountUp end={15} suffix="+" className="text-5xl font-bold text-[#8e7d3f]" duration={2.5} />
              <p className="mt-2 text-gray-600">Années d'expérience</p>
            </div>

            <div className="text-center">
              <CountUp
                end={5000}
                separator=" "
                suffix="+"
                className="text-5xl font-bold text-[#8e7d3f]"
                duration={2.5}
              />
              <p className="mt-2 text-gray-600">Clients satisfaits</p>
            </div>

            <div className="text-center">
              <CountUp end={100} suffix="%" className="text-5xl font-bold text-[#8e7d3f]" duration={2.5} />
              <p className="mt-2 text-gray-600">Satisfaction client</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Cartes avec effet 3D */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#8e7d3f]">Nos services premium</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TiltCard className="rounded-lg overflow-hidden h-[400px]">
              <div className="bg-black h-full w-full p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-[#8e7d3f] mb-4">Transport VIP</h3>
                <p className="text-white/80 mb-6">Voyagez avec style et confort dans nos véhicules de luxe.</p>
                <div className="mt-auto">
                  <button className="bg-[#8e7d3f] text-white px-6 py-2 rounded hover:bg-[#8e7d3f]/90 transition-colors">
                    En savoir plus
                  </button>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="rounded-lg overflow-hidden h-[400px]">
              <div className="bg-black h-full w-full p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-[#8e7d3f] mb-4">Événements spéciaux</h3>
                <p className="text-white/80 mb-6">Rendez vos moments spéciaux encore plus mémorables.</p>
                <div className="mt-auto">
                  <button className="bg-[#8e7d3f] text-white px-6 py-2 rounded hover:bg-[#8e7d3f]/90 transition-colors">
                    En savoir plus
                  </button>
                </div>
              </div>
            </TiltCard>

            <TiltCard className="rounded-lg overflow-hidden h-[400px]">
              <div className="bg-black h-full w-full p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-[#8e7d3f] mb-4">Service aéroport</h3>
                <p className="text-white/80 mb-6">
                  Transferts aéroport sans stress avec nos chauffeurs professionnels.
                </p>
                <div className="mt-auto">
                  <button className="bg-[#8e7d3f] text-white px-6 py-2 rounded hover:bg-[#8e7d3f]/90 transition-colors">
                    En savoir plus
                  </button>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Section avec effet de masque */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <RevealMask direction="left" className="h-[400px]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/450973-mercedes-maybach-s-580-2021-vous-n-en-croirez-pas-vos-yeux1605902556846.jpg-JSSSXetG3i0UytDjxFfsVGsIQmGAcS.jpeg"
                alt="Mercedes Maybach"
                className="w-full h-full object-cover"
              />
            </RevealMask>

            <div>
              <AnimateOnScroll animation="slideRight">
                <h2 className="text-3xl font-bold text-[#8e7d3f] mb-6">L'excellence à votre service</h2>
                <p className="text-white/80 mb-4">
                  Chez Allure Limousine, nous nous engageons à offrir un service de la plus haute qualité pour répondre
                  à vos attentes les plus exigeantes.
                </p>
                <p className="text-white/80 mb-6">
                  Notre flotte de véhicules de luxe et nos chauffeurs professionnels sont à votre disposition pour vous
                  offrir une expérience de transport inoubliable.
                </p>
                <button className="bg-[#8e7d3f] text-white px-6 py-3 rounded hover:bg-[#8e7d3f]/90 transition-colors">
                  Réserver maintenant
                </button>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

