'use client';
// app/solar-system/astronomie/messier/page.tsx
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import {
  MESSIER_OBJECTS,
  MESSIER_TYPE_LABELS,
  MESSIER_TYPE_COLORS,
  formatDist,
  type MessierObject,
  type MessierType,
} from '@/data/messier';

/* ── Modal ─────────────────────────────────────────────────── */
function MessierModal({ obj, onClose }: { obj: MessierObject; onClose: () => void }) {
  const color = MESSIER_TYPE_COLORS[obj.type];
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2,8,23,0.92)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border overflow-hidden"
        style={{
          background: '#0a0f1e',
          borderColor: `${color}40`,
          boxShadow: `0 0 60px ${color}18`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header band */}
        <div
          className="relative h-40 flex items-end p-5 overflow-hidden"
          style={{ background: obj.photoUrl && !imgError ? undefined : `linear-gradient(135deg, ${color}25, ${color}08)` }}
        >
          {obj.photoUrl && !imgError && (
            <Image
              src={obj.photoUrl}
              alt={obj.nameFr ?? obj.name ?? `M${obj.n}`}
              fill
              unoptimized
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="560px"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1e] via-[#0a0f1e]/40 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            style={{ background: 'rgba(2,8,23,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            ✕
          </button>

          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                style={{ background: `${color}20`, color }}
              >
                M{obj.n}
              </span>
              <span
                className="text-xs px-2 py-0.5 rounded-full border"
                style={{ background: `${color}10`, color: `${color}CC`, borderColor: `${color}30` }}
              >
                {obj.subtype}
              </span>
            </div>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              {obj.nameFr ?? obj.name ?? `Messier ${obj.n}`}
            </h2>
          </div>
        </div>

        {/* Stats */}
        <div className="px-5 py-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Constellation', value: obj.constellation },
            { label: 'Distance', value: formatDist(obj) },
            { label: 'Magnitude', value: obj.magnitude.toFixed(1) },
          ].map(s => (
            <div key={s.label} className="rounded-xl px-3 py-2" style={{ background: `${color}0A`, border: `1px solid ${color}1A` }}>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: `${color}80` }}>{s.label}</div>
              <div className="text-sm font-semibold text-white leading-snug">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="px-5 pb-5">
          <p className="text-sm text-gray-400 leading-relaxed">{obj.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Card ──────────────────────────────────────────────────── */
function MessierCard({ obj, onClick }: { obj: MessierObject; onClick: () => void }) {
  const color = MESSIER_TYPE_COLORS[obj.type];
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group text-left rounded-xl border transition-all duration-200 hover:scale-[1.03] focus:outline-none overflow-hidden"
      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.07)' }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = `${color}50`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${color}14`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Image / gradient */}
      <div className="relative h-28 overflow-hidden">
        {obj.photoUrl && !imgError ? (
          <Image
            src={obj.photoUrl}
            alt={obj.nameFr ?? `M${obj.n}`}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}18, ${color}05)` }}
          >
            <span className="text-3xl opacity-30">
              {obj.type === 'galaxy' ? '🌌' : obj.type === 'globular' ? '⭐' : obj.type === 'open' ? '✨' : obj.type === 'nebula' ? '🌫️' : '🔭'}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-[#020817] via-transparent to-transparent" />
        {/* M number badge */}
        <div
          className="absolute top-2 left-2 text-xs font-mono font-bold px-1.5 py-0.5 rounded"
          style={{ background: 'rgba(2,8,23,0.8)', color }}
        >
          M{obj.n}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-1 mb-1">
          <p className="text-xs font-semibold text-white leading-tight line-clamp-1">
            {obj.nameFr ?? obj.name ?? `Messier ${obj.n}`}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-600">{obj.constellation}</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full"
            style={{ background: `${color}15`, color }}
          >
            {MESSIER_TYPE_LABELS[obj.type]}
          </span>
        </div>
      </div>
    </button>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
const TYPE_FILTERS: { id: MessierType | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'Tous', icon: '🔭' },
  { id: 'galaxy', label: 'Galaxies', icon: '🌌' },
  { id: 'globular', label: 'Amas globulaires', icon: '⭐' },
  { id: 'open', label: 'Amas ouverts', icon: '✨' },
  { id: 'nebula', label: 'Nébuleuses', icon: '🌫️' },
  { id: 'other', label: 'Autres', icon: '❓' },
];

const TYPE_COUNTS = TYPE_FILTERS.reduce((acc, f) => {
  acc[f.id] = f.id === 'all' ? MESSIER_OBJECTS.length : MESSIER_OBJECTS.filter(o => o.type === f.id).length;
  return acc;
}, {} as Record<string, number>);

export default function MessierPage() {
  const [filter, setFilter] = useState<MessierType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<MessierObject | null>(null);

  const filtered = MESSIER_OBJECTS.filter(obj => {
    if (filter !== 'all' && obj.type !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      const mNum = `m${obj.n}`;
      if (
        !mNum.includes(q) &&
        !(obj.name?.toLowerCase().includes(q)) &&
        !(obj.nameFr?.toLowerCase().includes(q)) &&
        !obj.constellation.toLowerCase().includes(q) &&
        !obj.subtype.toLowerCase().includes(q)
      ) return false;
    }
    return true;
  });

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <SolarLayout>
      <div className="max-w-screen-xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/solar-system" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <Link href="/solar-system/astronomie" className="hover:text-white transition-colors">Astronomie</Link>
          <span>›</span>
          <span className="text-gray-400">Catalogue Messier</span>
        </div>

        {/* Header */}
        <div className="mb-7">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Catalogue Messier
          </h1>
          <p className="text-gray-500 text-sm max-w-2xl">
            Compilé par Charles Messier entre 1758 et 1781, ce catalogue de 110 objets du ciel profond
            était à l&apos;origine une liste de «fausses comètes» à éviter. Il est aujourd&apos;hui la référence de
            l&apos;astronomie amateur.
          </p>
        </div>

        {/* Type counters */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as MessierType | 'all')}
              className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                filter === f.id
                  ? 'scale-105'
                  : 'opacity-60 hover:opacity-85'
              }`}
              style={{
                background: filter === f.id
                  ? (f.id === 'all' ? 'rgba(255,255,255,0.06)' : `${MESSIER_TYPE_COLORS[f.id as MessierType]}15`)
                  : 'rgba(255,255,255,0.02)',
                borderColor: filter === f.id
                  ? (f.id === 'all' ? 'rgba(255,255,255,0.2)' : `${MESSIER_TYPE_COLORS[f.id as MessierType]}40`)
                  : 'rgba(255,255,255,0.06)',
                color: filter === f.id
                  ? (f.id === 'all' ? '#E5E7EB' : MESSIER_TYPE_COLORS[f.id as MessierType])
                  : '#6B7280',
              }}
            >
              <div className="text-base mb-0.5">{f.icon}</div>
              <div className="leading-tight">{f.label}</div>
              <div className="text-[10px] opacity-70 mt-0.5">{TYPE_COUNTS[f.id]}</div>
            </button>
          ))}
        </div>

        {/* Search + count */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs">🔍</span>
            <input
              type="text"
              placeholder="M42, Orion, Lyra…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-xl text-sm text-gray-300 border border-white/8 focus:outline-none focus:border-indigo-500/40 w-52"
              style={{ background: 'rgba(255,255,255,0.03)', fontFamily: "'Exo 2', sans-serif" }}
            />
          </div>
          <span className="text-xs text-gray-600 font-mono">
            {filtered.length} / {MESSIER_OBJECTS.length} objets
          </span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <div className="text-4xl mb-3">🔭</div>
            <p>Aucun objet ne correspond.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {filtered.map(obj => (
              <MessierCard key={obj.n} obj={obj} onClick={() => setSelected(obj)} />
            ))}
          </div>
        )}

        {/* Legend */}
        <div
          className="mt-10 rounded-2xl border border-white/6 p-5"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">Composition du catalogue</h3>
          <div className="flex flex-wrap gap-4">
            {TYPE_FILTERS.filter(f => f.id !== 'all').map(f => (
              <div key={f.id} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: MESSIER_TYPE_COLORS[f.id as MessierType] }}
                />
                <span className="text-xs text-gray-500">
                  {f.icon} {f.label}{' '}
                  <span
                    className="font-mono font-semibold"
                    style={{ color: MESSIER_TYPE_COLORS[f.id as MessierType] }}
                  >
                    {TYPE_COUNTS[f.id]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selected && <MessierModal obj={selected} onClose={handleClose} />}
    </SolarLayout>
  );
}
