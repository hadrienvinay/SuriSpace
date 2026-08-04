'use client';
// app/space/galaxies/page.tsx
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SolarLayout from '@/components/SolarLayout';
import { GALAXIES, GALAXY_TYPES, type Galaxy, type GalaxyType } from '@/data/galaxies';
import { GalaxyIcon } from '@/components/AtomsIcons';
import { TelescopeIcon } from '@/components/UniverseIcons';
import { IcoSearch, IcoPin, IcoDocument } from '@/components/SolarIcons';

/* ─── Helpers ─────────────────────────────────────────────── */
const fmtDist = (d: number) => {
  if (d === 0) return 'Notre galaxie';
  if (d < 1) return `${(d * 1000).toFixed(0)} milliers a.l.`;
  if (d < 10) return `${d.toFixed(3)} M a.l.`;
  return `${d.toLocaleString('fr-FR')} M a.l.`;
};

const fmtDiam = (d: number) =>
  d >= 1_000_000
    ? `${(d / 1_000_000).toFixed(1)} M a.l.`
    : `${d.toLocaleString('fr-FR')} a.l.`;

/* ─── Galaxy Card ─────────────────────────────────────────── */
function GalaxyCard({ galaxy, onClick }: { galaxy: Galaxy; onClick: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group text-left rounded-2xl border transition-all duration-300 hover:scale-[1.03] focus:outline-none overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${galaxy.color}55`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${galaxy.color}18`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Image / gradient fallback */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        {galaxy.photoUrl && !imgError ? (
          <Image
            src={galaxy.photoUrl}
            alt={galaxy.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: galaxy.gradient }}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <GalaxyIcon size={48} />
            </div>
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-[#020817] via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {galaxy.isMilkyWay && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ background: `${galaxy.color}30`, color: galaxy.color, border: `1px solid ${galaxy.color}50` }}
            >
              Chez nous
            </span>
          )}
          {galaxy.isLocal && !galaxy.isMilkyWay && (
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/8 text-gray-400 border border-white/10">
              Groupe Local
            </span>
          )}
        </div>

        {/* Distance badge */}
        <div className="absolute bottom-2 right-2">
          <span
            className="px-2 py-0.5 rounded-lg text-xs font-mono font-semibold"
            style={{ background: 'rgba(2,8,23,0.8)', color: galaxy.color }}
          >
            {fmtDist(galaxy.distance)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <h3
              className="text-sm font-bold text-white leading-tight"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              {galaxy.name}
            </h3>
            {galaxy.altNames?.[0] && (
              <span className="text-xs text-gray-600 font-mono">{galaxy.altNames[0]}</span>
            )}
          </div>
          <span
            className="shrink-0 px-1.5 py-0.5 rounded text-xs font-semibold mt-0.5"
            style={{ background: `${galaxy.color}15`, color: galaxy.color }}
          >
            {galaxy.typeFr.split(' ')[0]}
          </span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{galaxy.description.slice(0, 100)}…</p>
      </div>
    </button>
  );
}

/* ─── Galaxy Modal ─────────────────────────────────────────── */
function GalaxyModal({ galaxy, onClose }: { galaxy: Galaxy; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const stats = [
    { label: 'Type', value: galaxy.typeFr },
    { label: 'Distance', value: fmtDist(galaxy.distance) },
    { label: 'Diamètre', value: fmtDiam(galaxy.diameter) },
    { label: 'Étoiles', value: galaxy.stars },
    { label: 'Masse', value: galaxy.mass },
    { label: 'Constellation', value: galaxy.constellation },
    ...(galaxy.magnitude !== undefined ? [{ label: 'Magnitude', value: galaxy.magnitude.toFixed(1) }] : []),
    ...(galaxy.discoverer ? [{ label: 'Découverte', value: `${galaxy.discoverer}${galaxy.discovered ? ` (${galaxy.discovered})` : ''}` }] : []),
  ];

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 mt-15"
      style={{ background: 'rgba(2,8,23,0.90)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border"
        style={{
          background: '#020202',
          borderColor: `${galaxy.color}40`,
          boxShadow: `0 0 80px ${galaxy.color}20, 0 0 0 1px ${galaxy.color}15`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
          {galaxy.photoUrl && !imgError ? (
            <Image
              src={galaxy.photoUrl}
              alt={galaxy.name}
              fill
              unoptimized
              className="object-cover"
              onError={() => setImgError(true)}
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          ) : (
            <div className="absolute inset-0" style={{ background: galaxy.gradient }}>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <GalaxyIcon size={80} />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1e] via-[#0a0f1e]/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            style={{ background: 'rgba(2,8,23,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            ✕
          </button>

          {/* Type badge */}
          {galaxy.isMilkyWay && (
            <div className="absolute top-3 left-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: `${galaxy.color}30`, color: galaxy.color, border: `1px solid ${galaxy.color}60` }}
              >
                Notre Galaxie
              </span>
            </div>
          )}

          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white leading-tight"
              style={{ fontFamily: "'Exo 2', sans-serif", textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}
            >
              {galaxy.name}
            </h2>
            {galaxy.altNames && galaxy.altNames.length > 0 && (
              <p className="text-sm font-mono mt-0.5" style={{ color: galaxy.color }}>
                {galaxy.altNames.join(' · ')}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl px-3 py-2.5"
                style={{ background: `${galaxy.color}0A`, border: `1px solid ${galaxy.color}20` }}
              >
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: `${galaxy.color}90` }}>
                  {s.label}
                </div>
                <div className="text-sm font-semibold text-white leading-snug">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">Description</h3>
            <p className="text-sm text-gray-300 leading-relaxed">{galaxy.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Caractéristiques</h3>
            <div className="space-y-2">
              {galaxy.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: galaxy.color }} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Local Group Map ─────────────────────────────────────── */
// Approximate angular positions (visual sky placement)
const LOCAL_ANGLES: Record<string, number> = {
  lmc:        195, // south (visible from southern hemisphere)
  smc:        218, // south-southwest, near LMC
  andromeda:   25, // northeast
  triangulum:  52, // east-northeast, near Andromède
};

function LocalGroupMap({ galaxies, onSelect }: { galaxies: Galaxy[]; onSelect: (g: Galaxy) => void }) {
  const local = galaxies.filter((g) => g.isLocal);
  const cx = 300, cy = 192;
  const SCALE = 112; // px per sqrt(M a.l.)

  function pos(g: Galaxy) {
    if (g.isMilkyWay) return { x: cx, y: cy };
    const rad = ((LOCAL_ANGLES[g.id] ?? 0) * Math.PI) / 180;
    const r = Math.sqrt(g.distance) * SCALE;
    return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) };
  }

  return (
    <svg viewBox="0 0 600 384" className="w-full" style={{ maxHeight: 440, fontFamily: 'monospace' }}>
      {/* Background stars */}
      {Array.from({ length: 120 }, (_, i) => (
        <circle
          key={i}
          cx={((i * 157.3 + i * i * 0.31) % 600)}
          cy={((i * 89.7 + i * 23.1) % 384)}
          r={0.4 + (i % 4) * 0.3}
          fill="white"
          opacity={0.04 + (i % 6) * 0.025}
        />
      ))}

      {/* Distance rings (sqrt-scaled) */}
      {[0.5, 1, 1.5, 2, 2.5, 3].map((d) => (
        <circle
          key={d}
          cx={cx} cy={cy}
          r={Math.sqrt(d) * SCALE}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
          strokeDasharray="3 7"
        />
      ))}


      {/* Dashed lines from center */}
      {local.filter((g) => !g.isMilkyWay).map((g) => {
        const p = pos(g);
        return (
          <line key={g.id} x1={cx} y1={cy} x2={p.x} y2={p.y}
            stroke={`${g.color}18`} strokeWidth={0.8} strokeDasharray="2 5" />
        );
      })}

      {/* Galaxies */}
      {local.map((g) => {
        const { x, y } = pos(g);
        const r = g.isMilkyWay ? 18 : Math.max(6, Math.sqrt(g.diameter / 10000));
        return (
          <g key={g.id} onClick={() => onSelect(g)} style={{ cursor: 'pointer' }}>
            <circle cx={x} cy={y} r={r * 3} fill={g.color} opacity={0.05} />
            <circle cx={x} cy={y} r={r * 1.7} fill={g.color} opacity={0.12} />
            <circle cx={x} cy={y} r={r} fill={g.color} opacity={0.95} />
            {g.isMilkyWay && (
              <circle cx={x} cy={y} r={r} fill="none" stroke={g.color} strokeWidth={1.5} opacity={0.6}>
                <animate attributeName="r" values={`${r};${r * 2.8};${r}`} dur="3.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="3.2s" repeatCount="indefinite" />
              </circle>
            )}
            <text x={x} y={y + r + 13} textAnchor="middle"
              fill="rgba(255,255,255,0.72)" fontSize={g.isMilkyWay ? 11 : 9}
              fontWeight={g.isMilkyWay ? 'bold' : 'normal'}>
              {g.name}
            </text>
          </g>
        );
      })}

      <text x={12} y={18} fill="rgba(255,255,255,0.22)" fontSize={12} fontWeight="bold" letterSpacing="0.12em">
        GROUPE LOCAL · ÉCHELLE √DISTANCE
      </text>
    </svg>
  );
}

/* ─── Cosmic Distance Map ──────────────────────────────────── */
function CosmicDistanceMap({ galaxies, onSelect }: { galaxies: Galaxy[]; onSelect: (g: Galaxy) => void }) {
  const W = 760, H = 270;
  const PAD = { l: 62, r: 20, t: 40, b: 46 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;

  const nonMW = galaxies.filter((g) => !g.isMilkyWay);
  const minLog = -1;           // 0.1 M a.l.
  const maxLog = Math.log10(2000);

  const xOf = (d: number) =>
    PAD.l + ((Math.log10(Math.max(d, 0.05)) - minLog) / (maxLog - minLog)) * plotW;

  const TYPE_FRAC: Record<string, number> = {
    'barred-spiral': 0.12,
    spiral:          0.30,
    elliptical:      0.50,
    irregular:       0.67,
    lenticular:      0.80,
    ring:            0.92,
  };
  const TYPE_LABELS: Record<string, string> = {
    'barred-spiral': 'Barrées',
    spiral:          'Spirales',
    elliptical:      'Elliptiques',
    irregular:       'Irrégulières',
    lenticular:      'Lenticulaires',
    ring:            'Anneaux',
  };

  const yOf = (g: Galaxy, i: number) => {
    const frac = TYPE_FRAC[g.type] ?? 0.5;
    const jitter = ((i * 41 + 7) % 100) / 1000 * 0.6;
    return PAD.t + (frac + jitter) * plotH;
  };

  const xTicks = [0.1, 0.5, 1, 5, 10, 50, 100, 500, 1000];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 450, fontFamily: 'monospace' }}>
      {/* Type rows */}
      {Object.entries(TYPE_FRAC).map(([type, frac]) => {
        const y = PAD.t + frac * plotH;
        return (
          <g key={type}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y} y2={y}
              stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
            <text x={PAD.l - 5} y={y + 3} textAnchor="end" fill="rgba(255,255,255,0.2)" fontSize={9} >
              {TYPE_LABELS[type]}
            </text>
          </g>
        );
      })}

      {/* X axis */}
      <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b}
        stroke="rgba(255,255,255,0.15)" strokeWidth={1} />

      {/* X ticks */}
      {xTicks.map((t) => {
        const x = xOf(t);
        const label = t < 1 ? `${t}` : t >= 1000 ? `${t / 1000}k` : `${t}`;
        return (
          <g key={t}>
            <line x1={x} x2={x} y1={H - PAD.b} y2={H - PAD.b + 4}
              stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
            <text x={x} y={H - PAD.b + 13} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontSize={7.5}>
              {label} M a.l.
            </text>
          </g>
        );
      })}

      {/* Milky Way reference line */}
      <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b}
        stroke="#60A5FA" strokeWidth={1} strokeDasharray="3 5" opacity={0.35} />
      <text x={PAD.l} y={PAD.t - 5} textAnchor="middle" fill="#60A5FA" fontSize={10}  opacity={0.5}>
        Voie Lactée
      </text>

      {/* Galaxy dots */}
      {nonMW.map((g, i) => {
        const x = xOf(g.distance);
        const y = yOf(g, i);
        const r = Math.max(4, Math.min(13, Math.sqrt(g.diameter / 8000)));
        const label = g.name.length > 14 ? g.name.slice(0, 13) + '…' : g.name;
        return (
          <g key={g.id} onClick={() => onSelect(g)} style={{ cursor: 'pointer' }}>
            <circle cx={x} cy={y} r={r * 2.5} fill={g.color} opacity={0.07} />
            <circle cx={x} cy={y} r={r} fill={g.color} opacity={0.9} />
            <text x={x} y={y - r - 3} textAnchor="middle" fill={g.color} fontSize={9}  opacity={0.75}>
              {label}
            </text>
          </g>
        );
      })}

      <text x={PAD.l + plotW / 2} y={H - 6} textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize={10} >
        Distance (échelle logarithmique)
      </text>
      <text x={12} y={16} fill="rgba(255,255,255,0.22)" fontSize={12} fontWeight="bold" letterSpacing="0.1em">
        CARTE DES DISTANCES · TOUTES LES GALAXIES
      </text>
    </svg>
  );
}

/* ─── Featured Milky Way ──────────────────────────────────── */
function MilkyWayHero({ onClick }: { onClick: () => void }) {
  const mw = GALAXIES.find((g) => g.isMilkyWay)!;
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-3xl border overflow-hidden transition-all duration-300 hover:scale-[1.01] mb-8 focus:outline-none"
      style={{
        borderColor: `${mw.color}40`,
        boxShadow: `0 0 40px ${mw.color}18`,
      }}
    >
      <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-3xl">
        {mw.photoUrl && !imgError ? (
          <Image
            src={mw.photoUrl}
            alt={mw.name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            onError={() => setImgError(true)}
            sizes="100vw"
            priority
          />
        ) : (
          <div className="absolute inset-0" style={{ background: mw.gradient }}>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <GalaxyIcon size={80} />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-r from-[#020817]/90 via-[#020817]/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#020817] via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end p-6 sm:p-8">
          <div>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
              style={{ background: `${mw.color}25`, color: mw.color, border: `1px solid ${mw.color}50` }}
            >
              Notre Galaxie
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            >
              {mw.name}
            </h2>
            <p className="text-gray-300 text-sm max-w-lg leading-relaxed hidden sm:block">
              {mw.description.slice(0, 140)}…
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              {[
                { label: 'Diamètre', value: fmtDiam(mw.diameter) },
                { label: 'Étoiles', value: mw.stars },
                { label: 'Masse', value: mw.mass },
              ].map((s) => (
                <div
                  key={s.label}
                  className="px-3 py-1.5 rounded-xl text-xs"
                  style={{ background: 'rgba(2,8,23,0.6)', border: `1px solid ${mw.color}30` }}
                >
                  <span className="text-gray-500 mr-1">{s.label}</span>
                  <span style={{ color: mw.color }} className="font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-gray-400 bg-black/40 px-2 py-1 rounded">Cliquer pour détails →</span>
        </div>
      </div>
    </button>
  );
}

/* ─── Page ─────────────────────────────────────────────────── */
export default function GalaxiesPage() {
  const [filter, setFilter] = useState<GalaxyType | 'all'>('all');
  const [selected, setSelected] = useState<Galaxy | null>(null);
  const [search, setSearch] = useState('');

  const milkyWay = GALAXIES.find((g) => g.isMilkyWay)!;
  const others = GALAXIES.filter((g) => !g.isMilkyWay);

  const filtered = others.filter((g) => {
    const matchType = filter === 'all' || g.type === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || g.name.toLowerCase().includes(q) || g.altNames?.some((a) => a.toLowerCase().includes(q));
    return matchType && matchSearch;
  });

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <SolarLayout>
      <div className="max-w-screen-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/space" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <span className="text-gray-400">Galaxies</span>
        </div>

        {/* Header */}
        <div className="mb-7">
          <h1
            className="text-4xl font-bold text-white mb-1"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Galaxies
          </h1>
          <p className="text-base text-gray-500">
            {GALAXIES.length} galaxies · {others.filter((g) => g.isLocal).length} du Groupe Local · Cliquer pour le détail
          </p>
        </div>

        {/* Milky Way featured */}
        <MilkyWayHero onClick={() => setSelected(milkyWay)} />

        {/* Filters + search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Type tabs */}
          <div className="flex gap-1.5 flex-wrap">
            {GALAXY_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id as GalaxyType | 'all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  filter === t.id
                    ? 'bg-blue-900/40 text-blue-200 border-blue-700/50 scale-105'
                    : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative sm:ml-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"><IcoSearch size={12} /></span>
            <input
              type="text"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-1.5 rounded-xl text-sm text-gray-300 bg-white/4 border border-white/10 focus:outline-none focus:border-blue-700/50 w-48"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            />
          </div>
        </div>

        {/* Galaxy grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <div className="flex justify-center mb-3 opacity-40"><TelescopeIcon size={48} /></div>
            <p>Aucune galaxie ne correspond à cette recherche.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((galaxy) => (
              <GalaxyCard
                key={galaxy.id}
                galaxy={galaxy}
                onClick={() => setSelected(galaxy)}
              />
            ))}
          </div>
        )}

        {/* ── Local Group Map ─────────────────── */}
        <div
          className="mt-10 rounded-2xl border border-white/6 p-5"
          style={{ background: 'rgba(255,255,255,0.012)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Groupe Local
            </h3>
            <span className="text-xs text-gray-600 font-mono">~3 M a.l. · échelle √distance · cliquer pour détails</span>
          </div>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            Une cinquantaine de galaxies gravitationnellement liées, dominées par la Voie Lactée et Andromède.
            Le Grand et le Petit Nuage de Magellan sont nos voisins les plus proches.
          </p>
          <LocalGroupMap galaxies={GALAXIES} onSelect={setSelected} />
        </div>

        {/* ── Cosmic Distance Map ──────────────── */}
        <div
          className="mt-6 rounded-2xl border border-white/6 p-5"
          style={{ background: 'rgba(255,255,255,0.012)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Distance des galaxies par rapport à la Voie Lactée
            </h3>
            <span className="text-xs text-gray-600 font-mono">jusqu&apos;à 1 040 M a.l. · log-échelle · cliquer pour détails</span>
          </div>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            Toutes les galaxies du catalogue positionnées par distance depuis la Voie Lactée,
            regroupées par type morphologique sur une échelle logarithmique.
          </p>
          <CosmicDistanceMap galaxies={GALAXIES} onSelect={setSelected} />
        </div>

        {/* Stats bar */}
        <div
          className="mt-10 rounded-2xl border border-white/6 p-5"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4">L\'Univers en chiffres</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {([
              { label: 'Galaxies dans l\'Univers observable', value: '~2 000 milliards', Icon: GalaxyIcon },
              { label: 'Étoiles dans la Voie Lactée', value: '200–400 Mds', Icon: IcoDocument },
              { label: 'Taille de l\'Univers observable', value: '~93 milliards a.l.', Icon: TelescopeIcon },
              { label: 'Distance à Andromède', value: '2,537 M a.l.', Icon: IcoPin },
            ] as { label: string; value: string; Icon: React.ComponentType<{ size?: number }> }[]).map((s) => (
              <div key={s.label} className="text-center">
                <div className="flex justify-center mb-1 text-gray-400"><s.Icon size={24} /></div>
                <div className="text-base font-bold text-white">{s.value}</div>
                <div className="text-xs text-gray-600 mt-0.5 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selected && <GalaxyModal galaxy={selected} onClose={handleClose} />}
    </SolarLayout>
  );
}
