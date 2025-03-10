"use client"

interface LogoProps {
  className?: string
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALLURE-LIMOUSINE-GENEVE-logo-removebg-preview-HAKhwULEkeh30Xw9b6Q2Tj9fEeNFBc.png"
        alt="Allure Limousine"
        className="w-auto h-full object-contain mix-blend-normal"
      />
    </div>
  )
}

