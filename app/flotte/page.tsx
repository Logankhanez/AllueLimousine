"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { vehicles } from "@/lib/types"
import VehicleCard from "@/components/vehicle-card"
import Link from "next/link"
import AnimateOnScroll from "@/components/motion/animate-on-scroll"
import { motion } from "framer-motion"
import Logo from "@/components/logo"

export default function FlottePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Section titre améliorée avec hauteur ajustée */}
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
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-['Georgia'] text-5xl md:text-7xl text-white mb-6"
          >
            Notre Flotte
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent to-[#8e7d3f]"></div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-[3px] bg-[#8e7d3f] mb-2"></div>
              <div className="w-20 h-[4px] bg-[#8e7d3f] mb-2"></div>
              <div className="w-12 h-[3px] bg-[#8e7d3f]"></div>
            </div>
            <div className="relative mx-2">
              <div className="w-8 h-8 border-3 border-[#8e7d3f] rotate-45"></div>
              <div className="absolute inset-0 w-8 h-8 border-3 border-[#8e7d3f] rotate-45 scale-75 opacity-70"></div>
              <div className="absolute inset-0 w-8 h-8 border-2 border-[#8e7d3f]/50 rotate-45 scale-90 opacity-50"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-[3px] bg-[#8e7d3f] mb-2"></div>
              <div className="w-20 h-[4px] bg-[#8e7d3f] mb-2"></div>
              <div className="w-12 h-[3px] bg-[#8e7d3f]"></div>
            </div>
            <div className="w-24 h-[2px] bg-gradient-to-l from-transparent to-[#8e7d3f]"></div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/90 max-w-2xl mx-auto text-lg"
          >
            Découvrez notre sélection de véhicules haut de gamme, disponibles avec ou sans chauffeur pour tous vos
            déplacements
          </motion.p>
        </div>
      </section>

      {/* Section des véhicules */}
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
          <AnimateOnScroll animation="fadeIn">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full max-w-2xl mx-auto mb-12 bg-black/40 border border-[#8e7d3f]/20">
                <TabsTrigger value="all" className="flex-1">
                  Tous les véhicules
                </TabsTrigger>
                <TabsTrigger value="with-driver" className="flex-1">
                  Avec chauffeur
                </TabsTrigger>
                <TabsTrigger value="without-driver" className="flex-1">
                  Sans chauffeur
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map((vehicle, index) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="with-driver">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles
                    .filter((vehicle) =>
                      [
                        "Mercedes Classe S",
                        "Mercedes Classe V",
                        "Mercedes Sprinter",
                        "Range Rover Vogue",
                        "Range Rover Defender",
                      ].includes(vehicle.name),
                    )
                    .map((vehicle, index) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="without-driver">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles
                    .filter((vehicle) =>
                      ["Range Rover Vogue", "Range Rover Defender", "Mercedes CLA", "Mercedes Classe V"].includes(
                        vehicle.name,
                      ),
                    )
                    .map((vehicle, index) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </AnimateOnScroll>

          {/* Boutons de réservation */}
          <AnimateOnScroll
            animation="slideUp"
            delay={0.3}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/flotte/avec-chauffeur"
              className="w-full sm:w-auto px-8 py-3 bg-[#8e7d3f] hover:bg-[#8e7d3f]/90 text-white rounded-md text-center transition-colors"
            >
              Réserver avec chauffeur
            </Link>
            <Link
              href="/flotte/sans-chauffeur"
              className="w-full sm:w-auto px-8 py-3 bg-black hover:bg-black/90 text-white border border-[#8e7d3f] rounded-md text-center transition-colors"
            >
              Réserver sans chauffeur
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#8e7d3f] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            {/* Logo et drapeau */}
            <AnimateOnScroll animation="slideRight" className="text-center md:text-left">
              <Logo className="h-32 w-auto mb-8" />
              <div className="flex justify-center md:justify-start">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Civil_Ensign_of_Switzerland.svg%20(1)-bPbKC8IbHZNpXYzoIV0F4QaOM6fX9P.png"
                  alt="Drapeau suisse"
                  className="h-12 w-16 object-cover"
                />
              </div>
            </AnimateOnScroll>

            {/* Informations de contact */}
            <AnimateOnScroll animation="slideLeft" className="space-y-8">
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
            </AnimateOnScroll>
          </div>

          {/* Copyright */}
          <AnimateOnScroll animation="fadeIn" delay={0.5} className="text-center text-sm">
            <p className="font-light">© 2035</p>
          </AnimateOnScroll>
        </div>
      </footer>
    </main>
  )
}

