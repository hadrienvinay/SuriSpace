'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TimingData {
  direction: string;
  next_time: string;
  next_time2: string;
  timeAgo: string;
  timeAgo2: string;
}

const LINE10_COLOR = '#C9910D'; // RATP line 10 ochre

function formatTime(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// "dans 12 minutes" → "12 min", "dans moins d'une minute" → "à l'arrivée"
function shortAgo(s: string): string {
  if (!s) return '';
  if (/moins d'une/.test(s)) return 'à l\'arrivée';
  const m = s.match(/(\d+)\s*minute/);
  if (m) return `${m[1]} min`;
  const h = s.match(/(\d+)\s*heure/);
  if (h) return `${h[1]} h`;
  return s;
}

export default function Ratp() {
  const [timing, setTiming] = useState<TimingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/api/ratp');
        if (!res.ok) throw new Error('Erreur de récupération');
        const data = await res.json();
        if (!cancelled) setTiming(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <div className="text-xs text-gray-500 text-center py-2">Chargement métro…</div>;
  if (error)   return <div className="text-xs text-red-400 text-center py-2">{error}</div>;
  if (!timing) return null;

  const rows = [
    { label: 'Prochain', iso: timing.next_time,  ago: timing.timeAgo  },
    { label: 'Suivant',  iso: timing.next_time2, ago: timing.timeAgo2 },
  ];

  return (
    <div>
      <h4 className="text-center text-sm font-semibold text-gray-300 mt-2 mb-2">
        Métro · {timing.direction}
      </h4>
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span
              className="shrink-0 flex items-center justify-center rounded"
              style={{
                background: `${LINE10_COLOR}22`,
                border: `1px solid ${LINE10_COLOR}55`,
                minWidth: 36,
                height: 22,
              }}
            >
              <Image src="/m10.svg" alt="Ligne 10" width={20} height={20} />
            </span>
            <span className="text-gray-200 flex-1 truncate">{row.label}</span>
            <span className="text-xs text-gray-500 shrink-0">{shortAgo(row.ago)}</span>
            <span className="text-xs text-gray-300 font-mono shrink-0 tabular-nums" style={{ minWidth: 40, textAlign: 'right' }}>
              {formatTime(row.iso)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
