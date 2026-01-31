// app/components/Weather.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Ratp() {
  const [timing, setTiming] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch('api/ratp')
        if (!response.ok) {
          throw new Error('Erreur de récupération')
        }
        
        const data = await response.json()
        setTiming(data)
        console.log("Données RATP reçues:", data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  if (!timing) return null

  return (
    <div>
    <h3 className='text-center text-lg font-bold mt-1 mb-2'>
        Direction {timing.direction}
    </h3>
    <div className="flex items-center justify-between">
        <div className="flex items-center">
            <Image
            src="/m10.svg"
            width={40}
            height={30}
            alt="current"
            className="ml-4"
            />
        </div>
        <div className='text-right space-y-1'>
            <div>prochain {timing.timeAgo}</div>
            <div>suivant {timing.timeAgo2}</div>
        </div>
    </div>
    </div>

  ) 
}