// app/components/Weather.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Weather({ city }: { city: string }) {
  const [weather, setWeather] = useState<{ icon: string; city: string; temp: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true)
        const response = await fetch(`/api/weather?city=${city}`)
        
        if (!response.ok) {
          throw new Error('Erreur de récupération')
        }
        
        const data = await response.json()
        setWeather(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [city])

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  if (!weather) return null

  return (
    <div>
      <Image
        src={ weather.icon } 
        width={50}
        height={30}
        alt="current"
        className="float-right"
        />
      <h2>Météo à {weather.city}</h2>
      <p>Température: {weather.temp}°C</p>
    </div>
  )
}