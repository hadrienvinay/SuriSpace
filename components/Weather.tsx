'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface WeatherData {
  icon: string;
  city: string;
  temp: number;
}

// Subtle accent color per known city, falls back to neutral
const CITY_ACCENT: Record<string, string> = {
  Paris:    '#60A5FA',
  Madrid:   '#F59E0B',
  Arcachon: '#34D399',
};

function tempColor(temp: number): string {
  if (temp <= 0)  return '#60A5FA'; // ice blue
  if (temp <= 12) return '#A5B4FC'; // cool
  if (temp <= 22) return '#86EFAC'; // mild green
  if (temp <= 30) return '#FBBF24'; // warm
  return '#F87171';                 // hot
}

export default function Weather({ city }: { city: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchWeather() {
      try {
        setLoading(true);
        const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        if (!res.ok) throw new Error('Erreur de récupération');
        const data = await res.json();
        if (!cancelled) setWeather(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchWeather();
    return () => { cancelled = true; };
  }, [city]);

  const accent = CITY_ACCENT[city] ?? '#94A3B8';

  if (loading) {
    return (
      <div className="flex items-center gap-2.5 py-1.5">
        <span
          className="shrink-0 rounded-lg animate-pulse"
          style={{ background: `${accent}15`, border: `1px solid ${accent}30`, width: 46, height: 38 }}
        />
        <span className="text-gray-500 flex-1 text-sm">{city}</span>
        <span className="text-lg text-gray-600 font-mono">—</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2.5 py-1.5">
        <span className="shrink-0 rounded-lg" style={{ width: 46, height: 38, background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)' }} />
        <span className="text-gray-400 flex-1 text-sm">{city}</span>
        <span className="text-xs text-red-400">erreur</span>
      </div>
    );
  }

  if (!weather) return null;

  // Weatherapi returns "//cdn.weatherapi.com/..." — ensure proper https://
  const iconSrc = weather.icon.startsWith('//') ? `https:${weather.icon}` : weather.icon;

  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <span
        className="shrink-0 flex items-center justify-center rounded-lg"
        style={{
          background: `${accent}18`,
          border: `1px solid ${accent}40`,
          minWidth: 46,
          height: 38,
        }}
      >
        <Image src={iconSrc} alt="" width={34} height={34} unoptimized />
      </span>
      <span className="text-gray-100 flex-1 truncate text-sm font-medium">{weather.city}</span>
      <span
        className="font-mono tabular-nums shrink-0"
        style={{
          color: tempColor(weather.temp),
          minWidth: 50,
          textAlign: 'right',
          fontWeight: 700,
          fontSize: 21,
          lineHeight: 1,
        }}
      >
        {Math.round(weather.temp)}°
      </span>
    </div>
  );
}
