'use client';

import { useState, useEffect } from 'react';

interface IssPass {
  start: string;
  maxElevationTime: string;
  maxElevationDeg: number;
  end: string;
  durationSec: number;
  direction: string;
}

function formatDateTime(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long' }),
    time: d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  };
}

export default function IssPasses({ lat, lon }: { lat: number; lon: number }) {
  const [passes, setPasses]   = useState<IssPass[] | null>(null);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setPasses(null);
    setError(null);
    async function fetchPasses() {
      try {
        const res = await fetch(`/api/iss?lat=${lat}&lon=${lon}`);
        if (!res.ok) throw new Error('Erreur de récupération');
        const data = await res.json();
        if (!cancelled) setPasses(data.passes);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur inconnue');
      }
    }
    fetchPasses();
    return () => { cancelled = true; };
  }, [lat, lon]);

  if (error) {
    return <p className="text-sm text-red-400">Impossible de calculer les passages de l&apos;ISS pour le moment.</p>;
  }

  if (!passes) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="rounded-2xl border border-white/8 p-4 h-24 animate-pulse" style={{ background: 'rgba(255,255,255,0.02)' }} />
        ))}
      </div>
    );
  }

  if (passes.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Aucun passage visible prévu dans les 30 prochains jours — l&apos;orbite de l&apos;ISS n&apos;est actuellement pas alignée avec le crépuscule à Paris. Reviens plus tard.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {passes.map((p, i) => {
        const start = formatDateTime(p.start);
        const max = formatDateTime(p.maxElevationTime);
        return (
          <div key={i} className="rounded-2xl border border-white/8 p-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2 capitalize">{start.date}</div>
            <div className="text-2xl font-mono text-white mb-1">{start.time}</div>
            <div className="text-xs text-gray-500 mb-3">
              Culmine à {max.time} · {p.maxElevationDeg}° · direction {p.direction}
            </div>
            <div className="text-[11px] text-gray-600 font-mono">Durée ~{Math.round(p.durationSec / 60)} min</div>
          </div>
        );
      })}
    </div>
  );
}
