'use client';

import { useState, useEffect } from 'react';

type Departure = {
  direction: string;
  mode: string;
  label: string;
  time: string;
  timeAgo: string;
  iso: string;
};

// Color + short label for each commercial mode
function modeStyle(mode: string): { label: string; color: string; bg: string } {
  const m = (mode || '').toUpperCase();
  if (m.includes('TGV'))    return { label: 'TGV',  color: '#A78BFA', bg: 'rgba(167,139,250,0.15)' };
  if (m.includes('INTER'))  return { label: 'IC',   color: '#F472B6', bg: 'rgba(244,114,182,0.15)' };
  if (m.includes('OUIGO'))  return { label: 'OUI',  color: '#F87171', bg: 'rgba(248,113,113,0.15)' };
  if (m.includes('TER'))    return { label: 'TER',  color: '#34D399', bg: 'rgba(52,211,153,0.15)' };
  return                          { label: mode || '—', color: '#94A3B8', bg: 'rgba(148,163,184,0.15)' };
}

// Strip "gare de" prefix and similar noise
function cleanDirection(d: string): string {
  return (d || '')
    .replace(/^Gare de /i, '')
    .replace(/^Gare d'/i, '')
    .replace(/\s*\(.*?\)\s*$/, '')
    .trim();
}

export default function Sncf() {
  const [departures, setDepartures] = useState<Departure[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/api/sncf');
        if (!res.ok) throw new Error('Erreur de récupération');
        const data = await res.json();
        if (!cancelled) setDepartures(data.departures ?? []);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="text-xs text-gray-500 text-center py-2">Chargement Arcachon…</div>;
  if (error)   return <div className="text-xs text-red-400 text-center py-2">{error}</div>;
  if (!departures || departures.length === 0)
    return <div className="text-xs text-gray-500 text-center py-2">Aucun train</div>;

  return (
    <div>
      <h4 className="text-center text-sm font-semibold text-gray-300 mt-2 mb-2">
        Départ Gare d&apos;Arcachon
      </h4>
      <div className="space-y-1.5">
        {departures.slice(0, 4).map((d, i) => {
          const s = modeStyle(d.mode);
          return (
            <div key={i} className="flex items-center gap-2 text-sm">
              <span
                className="px-1.5 py-0.5 rounded text-xs font-bold shrink-0"
                style={{ background: s.bg, color: s.color, border: `1px solid ${s.color}40`, minWidth: 36, textAlign: 'center' }}
              >
                {s.label}
              </span>
              <span className="text-gray-200 flex-1 truncate" title={d.direction}>
                {cleanDirection(d.direction)}
              </span>
              <span className="text-xs text-gray-400 font-mono shrink-0">{d.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
