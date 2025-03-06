import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { DateRange } from "react-day-picker"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function calculateDuration(range: DateRange | undefined): number | null {
  if (!range?.from || !range?.to) return null

  const diffTime = Math.abs(range.to.getTime() - range.from.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

// Fonction pour formater le prix
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price)
}

