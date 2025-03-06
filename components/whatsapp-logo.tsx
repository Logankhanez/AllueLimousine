interface WhatsAppLogoProps {
  size?: number
  className?: string
}

export default function WhatsAppLogo({ size = 32, className = "" }: WhatsAppLogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
        alt="WhatsApp Logo"
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  )
}

