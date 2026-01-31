// app/components/Weather.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Weather({ city }: { city: string }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true)
        const response = await fetch(`/api/weather?city=${city}`)
        console.log("Réponse de l'API météo:", response)
        
        if (!response.ok) {
          throw new Error('Erreur de récupération')
        }
        
        const data = await response.json()
        setWeather(data)
        console.log("Données météo reçues:", weather)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

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