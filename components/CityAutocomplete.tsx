"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface City {
  name: string
  adminName1: string
  countryName: string
}

interface CityAutocompleteProps {
  id: string
  placeholder: string
  onChange: (value: string) => void
}

export default function CityAutocomplete({ id, placeholder, onChange }: CityAutocompleteProps) {
  const [input, setInput] = useState("")
  const [cities, setCities] = useState<City[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (input.length < 2) {
      setCities([])
      return
    }

    const fetchCities = async () => {
      try {
        const response = await fetch(
          `http://api.geonames.org/searchJSON?name_startsWith=${input}&featureClass=P&maxRows=5&username=loganalphaaa&continent=EU`,
        )
        const data = await response.json()
        setCities(data.geonames)
      } catch (error) {
        console.error("Error fetching cities:", error)
      }
    }

    fetchCities()
  }, [input])

  const handleSelect = (city: City) => {
    setInput(`${city.name}, ${city.countryName}`)
    onChange(`${city.name}, ${city.countryName}`)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          id={id}
          placeholder={placeholder}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setIsOpen(true)
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        {cities.length > 0 ? (
          <ul className="max-h-[300px] overflow-auto">
            {cities.map((city, index) => (
              <li key={index} className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => handleSelect(city)}>
                {city.name}, {city.adminName1 ? `${city.adminName1}, ` : ""}
                {city.countryName}
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-2">Aucune ville trouvée</p>
        )}
      </PopoverContent>
    </Popover>
  )
}

