'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from 'recharts';

interface DataPoint {
  date: string;
  investi: number;
  valeur: number;
}

const TIME_RANGES = [
  { label: '1J',  days: 1,   intraday: true  },
  { label: '1M',  days: 30,  intraday: false },
  { label: '3M',  days: 90,  intraday: false },
  { label: '6M',  days: 180, intraday: false },
  { label: '1A',  days: 365, intraday: false },
  { label: 'MAX', days: 0,   intraday: false },
];

function fmt(n: number) {
  return n.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
}

// Tick formatter: time for intraday, date otherwise
function makeFmtTick(intraday: boolean) {
  return (v: string) => {
    const d = new Date(v);
    if (intraday) {
      return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
  };
}

// Tooltip label formatter
function fmtLabel(v: string, intraday: boolean) {
  const d = new Date(v);
  if (intraday) {
    return d.toLocaleString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  intraday?: boolean;
}

function CustomTooltip({ active, payload, label, intraday }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const valeur  = payload.find((p: any) => p.dataKey === 'valeur')?.value;
  const investi = payload.find((p: any) => p.dataKey === 'investi')?.value;
  const diff    = valeur != null && investi != null ? valeur - investi : null;
  const pct     = investi ? ((diff ?? 0) / investi) * 100 : 0;

  return (
    <div style={{
      background: 'rgba(8,12,28,0.97)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 12, padding: '12px 16px', fontSize: 13, minWidth: 180,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 8, fontSize: 11 }}>
        {fmtLabel(label ?? '', !!intraday)}
      </p>
      {valeur  != null && <p style={{ color: '#60A5FA', marginBottom: 4 }}>Valeur : <strong>{fmt(valeur)}</strong></p>}
      {investi != null && <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Investi : {fmt(investi)}</p>}
      {diff != null && (
        <p style={{ color: diff >= 0 ? '#34D399' : '#F87171', fontWeight: 700, marginTop: 6 }}>
          {diff >= 0 ? '+' : ''}{fmt(diff)} ({diff >= 0 ? '+' : ''}{pct.toFixed(1)}%)
        </p>
      )}
    </div>
  );
}

export default function BourseChart() {
  // Separate caches: daily data and intraday data
  const dailyData    = useRef<DataPoint[]>([]);
  const intradayData = useRef<DataPoint[]>([]);

  const [displayData, setDisplayData] = useState<DataPoint[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState('');
  const [range, setRange]             = useState('MAX');

  // Fetch daily data once on mount
  useEffect(() => {
    fetch(`/api/bourse/history?t=${Date.now()}`)
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); return; }
        dailyData.current = d.series || [];
        setDisplayData(dailyData.current);
      })
      .catch(() => setError('Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  // Switch range — fetch intraday only when 1J is selected for the first time
  const handleRange = async (label: string) => {
    setRange(label);
    const selected = TIME_RANGES.find(r => r.label === label);
    if (!selected) return;

    if (selected.intraday) {
      // Use cached intraday data if available
      if (intradayData.current.length > 0) {
        setDisplayData(intradayData.current);
        return;
      }
      setLoading(true);
      try {
        const res  = await fetch(`/api/bourse/history?interval=1d&t=${Date.now()}`);
        const data = await res.json();
        intradayData.current = data.series || [];
        setDisplayData(intradayData.current);
        if (data.error) setError(data.error);
      } catch {
        setError('Erreur chargement intraday');
      } finally {
        setLoading(false);
      }
    } else {
      // Filter daily data by range
      setDisplayData(dailyData.current);
    }
  };

  const selected  = TIME_RANGES.find(r => r.label === range)!;
  const intraday  = selected?.intraday ?? false;

  // Apply date filter for non-intraday ranges
  const filtered = (() => {
    if (intraday) return displayData;
    if (!selected || selected.days === 0) return dailyData.current;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - selected.days);
    return dailyData.current.filter(d => new Date(d.date) >= cutoff);
  })();

  const last    = filtered[filtered.length - 1];
  const plValue = last ? last.valeur - last.investi : 0;
  const plPct   = last?.investi ? (plValue / last.investi) * 100 : 0;
  const isPos   = plValue >= 0;
  const lineColor  = isPos ? '#34D399' : '#F87171';
  const gradientId = isPos ? 'colorValeurPos' : 'colorValeurNeg';

  const tickInterval = intraday
    ? 'preserveStartEnd'
    : filtered.length > 200 ? Math.floor(filtered.length / 12)
    : filtered.length > 60  ? Math.floor(filtered.length / 8)
    : 'preserveStartEnd';

  const fmtTick = makeFmtTick(intraday);

  if (loading) {
    return (
      <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>
          {intraday ? 'Récupération des données du jour…' : 'Récupération des données historiques…'}
        </div>
      </div>
    );
  }

  if (error || (filtered.length === 0 && !loading)) {
    return (
      <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
          {error || 'Aucune donnée — passez votre premier ordre pour voir le graphique'}
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">Évolution du portefeuille</h2>
          {last && (
            <div className="flex items-baseline gap-3">
              <span style={{ fontSize: 28, fontWeight: 800, color: '#fff' }}>{fmt(last.valeur)}</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: lineColor }}>
                {isPos ? '+' : ''}{fmt(plValue)} ({isPos ? '+' : ''}{plPct.toFixed(1)}%)
              </span>
            </div>
          )}
        </div>

        {/* Range selector */}
        <div className="flex items-center gap-1.5">
          {TIME_RANGES.map(r => (
            <button
              key={r.label}
              onClick={() => handleRange(r.label)}
              style={{
                padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: range === r.label ? 'rgba(96,165,250,0.15)' : 'transparent',
                border: range === r.label ? '1px solid rgba(96,165,250,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: range === r.label ? '#60A5FA' : 'rgba(255,255,255,0.35)',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={filtered} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValeurPos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#34D399" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#34D399" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="colorValeurNeg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#F87171" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#F87171" stopOpacity={0}    />
            </linearGradient>
            <linearGradient id="colorInvesti" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#60A5FA" stopOpacity={0.08} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}    />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />

          <XAxis
            dataKey="date"
            tickFormatter={fmtTick}
            tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval={tickInterval}
          />

          <YAxis
            tickFormatter={n => `${(n / 1000).toFixed(1)}k€`}
            tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={52}
            domain={['auto', 'auto']}
          />

          <Tooltip content={<CustomTooltip intraday={intraday} />} />

          {/* Invested baseline */}
          <Area
            type="monotone"
            dataKey="investi"
            name="Investi"
            stroke="#60A5FA"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            fill="url(#colorInvesti)"
            dot={false}
            activeDot={false}
          />

          {/* Portfolio value */}
          <Area
            type="monotone"
            dataKey="valeur"
            name="Valeur"
            stroke={lineColor}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={false}
            activeDot={{ r: 5, fill: lineColor, stroke: 'rgba(8,12,28,0.9)', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4" style={{ fontSize: 12 }}>
        <div className="flex items-center gap-2">
          <div style={{ width: 20, height: 2, background: lineColor }} />
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Valeur du portefeuille</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="20" height="2">
            <line x1="0" y1="1" x2="20" y2="1" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="5 3" />
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Montant investi</span>
        </div>
        {intraday && (
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11 }}>
            · données horaires du jour
          </span>
        )}
      </div>
    </div>
  );
}
