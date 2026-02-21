// pages/solar-system/bodys.tsx
// Gallery page: Soleil, planètes, lunes — photos NASA + données

'use client';
import { useState } from 'react';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import { solarSystem } from '@/data/solar-system';

// ─── Real NASA / Wikimedia photo URLs ────────────────────────────────────────
const BODY_PHOTOS: Record<string, { src: string; credit: string }> = {
  sun:      { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/1024px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg', credit: 'NASA SDO' },
  mercury:  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/600px-Mercury_in_true_color.jpg', credit: 'NASA MESSENGER' },
  venus:    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/600px-Venus-real_color.jpg', credit: 'NASA Mariner 10' },
  earth:    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/600px-The_Earth_seen_from_Apollo_17.jpg', credit: 'NASA Apollo 17' },
  mars:     { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/600px-OSIRIS_Mars_true_color.jpg', credit: 'ESA Rosetta' },
  jupiter:  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/600px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg', credit: 'NASA Hubble' },
  saturn:   { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/1024px-Saturn_during_Equinox.jpg', credit: 'NASA Cassini' },
  uranus:   { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/600px-Uranus2.jpg', credit: 'NASA Voyager 2' },
  neptune:  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/600px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg', credit: 'NASA Voyager 2' },
  pluto:    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/600px-Pluto_in_True_Color_-_High-Res.jpg', credit: 'NASA New Horizons' },
  moon:     { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/600px-FullMoon2010.jpg', credit: 'NASA' },
  phobos:   { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Phobos_colour_2008.jpg/600px-Phobos_colour_2008.jpg', credit: 'NASA HiRISE' },
  deimos:   { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Deimos-MRO.jpg/600px-Deimos-MRO.jpg', credit: 'NASA MRO' },
  io:       { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Io_highest_resolution_true_color.jpg/600px-Io_highest_resolution_true_color.jpg', credit: 'NASA Galileo' },
  europa:   { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Europa-moon-with-margins.jpg/600px-Europa-moon-with-margins.jpg', credit: 'NASA Galileo' },
  ganymede: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ganymede_-_Perijove_34_Composite.png/600px-Ganymede_-_Perijove_34_Composite.png', credit: 'NASA Juno' },
  callisto: { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Callisto.jpg/600px-Callisto.jpg', credit: 'NASA Galileo' },
  titan:    { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Titan_in_true_color.jpg/600px-Titan_in_true_color.jpg', credit: 'NASA Cassini' },
  enceladus:{ src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Enceladus_from_Cassini.jpg/600px-Enceladus_from_Cassini.jpg', credit: 'NASA Cassini' },
  triton:   { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Triton_moon_mosaic_Voyager_2_%28large%29.jpg/600px-Triton_moon_mosaic_Voyager_2_%28large%29.jpg', credit: 'NASA Voyager 2' },
};

// Bodies grouped for display
const GROUPS = [
  {
    label: 'Notre étoile',
    ids: ['sun'],
    accent: '#FCD34D',
  },
  {
    label: 'Planètes telluriques',
    ids: ['mercury', 'venus', 'earth', 'mars'],
    accent: '#FB923C',
  },
  {
    label: 'Géantes gazeuses & glacées',
    ids: ['jupiter', 'saturn', 'uranus', 'neptune'],
    accent: '#60A5FA',
  },
  {
    label: 'Planète naine',
    ids: ['pluto'],
    accent: '#D4A574',
  },
  {
    label: 'Lune terrestre',
    ids: ['moon'],
    accent: '#9CA3AF',
  },
  {
    label: 'Lunes de Mars',
    ids: ['phobos', 'deimos'],
    accent: '#FB923C',
  },
  {
    label: 'Lunes galiléennes de Jupiter',
    ids: ['io', 'europa', 'ganymede', 'callisto'],
    accent: '#D97706',
  },
  {
    label: 'Lunes remarquables de Saturne',
    ids: ['titan', 'enceladus'],
    accent: '#FDE68A',
  },
  {
    label: 'Lune de Neptune',
    ids: ['triton'],
    accent: '#3B82F6',
  },
];

type FilterType = 'all' | 'star' | 'planet' | 'dwarf-planet' | 'moon';

const FILTER_LABELS: Record<FilterType, string> = {
  all: '🌌 Tous',
  star: '⭐ Étoile',
  planet: '🪐 Planètes',
  'dwarf-planet': '🪨 Naines',
  moon: '🌕 Lunes',
};

function BodyCard({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const body = solarSystem.find(b => b.id === id);
  const photo = BODY_PHOTOS[id];
  const [imgError, setImgError] = useState(false);

  if (!body) return null;

  const typeLabel =
    body.type === 'star' ? 'Étoile' :
    body.type === 'planet' ? 'Planète' :
    body.type === 'dwarf-planet' ? 'Planète naine' :
    body.type === 'moon' ? `Lune de ${body.parent}` : '';

  return (
    <button
      onClick={() => onSelect(id)}
      className="group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl focus:outline-none"
      style={{
        borderColor: `${body.color}30`,
        background: '#0a0f1e',
        boxShadow: `0 4px 24px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {!imgError && photo ? (
          <img
            src={photo.src}
            alt={body.nameFr}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          /* Fallback: SVG planet art */
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `radial-gradient(ellipse at 35% 35%, ${body.colorGradient?.[0] ?? body.color}DD, ${body.color}88, ${body.colorGradient?.at(-1) ?? '#0a0f1e'})`,
            }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <defs>
                <radialGradient id={`fg-${id}`} cx="32%" cy="28%" r="70%">
                  {body.colorGradient?.map((c, i) => (
                    <stop key={i} offset={`${(i / Math.max(1, body.colorGradient!.length - 1)) * 100}%`} stopColor={c} />
                  )) ?? <stop offset="0%" stopColor={body.color} />}
                </radialGradient>
              </defs>
              {id === 'saturn' && <ellipse cx="50" cy="52" rx="44" ry="10" fill="none" stroke={body.color} strokeOpacity="0.5" strokeWidth="5" />}
              <circle cx="50" cy="50" r={id === 'sun' ? 44 : 36} fill={`url(#fg-${id})`} />
              {id === 'uranus' && <ellipse cx="50" cy="50" rx="10" ry="42" fill="none" stroke={body.color} strokeOpacity="0.3" strokeWidth="3" />}
            </svg>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1e] via-transparent to-transparent opacity-70" />

        {/* Photo credit */}
        {photo && !imgError && (
          <div className="absolute bottom-2 right-2 text-[9px] text-white/30 font-mono tracking-wide">
            {photo.credit}
          </div>
        )}

        {/* Type badge */}
        <div
          className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
          style={{ background: `${body.color}28`, border: `1px solid ${body.color}50`, color: body.color }}
        >
          {typeLabel}
        </div>

        {/* Rings badge */}
        {body.rings && (
          <div className="absolute top-3 right-3 text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/20">
            Anneaux
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3
          className="text-xl font-bold text-white mb-1 group-hover:underline transition-all"
          style={{ fontFamily: "'Cinzel', 'Exo 2', serif", letterSpacing: '0.03em' }}
        >
          {body.nameFr}
        </h3>
        <p className="text-xs text-gray-500 font-mono mb-3">
          {body.type === 'moon'
            ? `Lune · ${body.radius.toLocaleString()} km de rayon`
            : body.semiMajorAxis
            ? `${body.semiMajorAxis} UA · ${body.radius.toLocaleString()} km de rayon`
            : `Rayon: ${body.radius.toLocaleString()} km`}
        </p>

        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">{body.description}</p>

        {/* Key stats inline */}
        <div className="mt-3 flex gap-3 flex-wrap">
          {body.gravity && (
            <div className="text-xs font-mono text-gray-500">
              <span className="text-gray-600">g</span> {body.gravity} m/s²
            </div>
          )}
          {body.tempMean && (
            <div className="text-xs font-mono text-gray-500">
              <span className="text-gray-600">T</span> {body.tempMean} K
            </div>
          )}
          {body.moons !== undefined && body.moons > 0 && (
            <div className="text-xs font-mono text-gray-500">
              🌕 {body.moons} lune{body.moons > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Hover bottom bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(to right, transparent, ${body.color}, transparent)` }}
      />
    </button>
  );
}

function BodyModal({ id, onClose }: { id: string; onClose: () => void }) {
  const body = solarSystem.find(b => b.id === id);
  const photo = BODY_PHOTOS[id];
  const [imgError, setImgError] = useState(false);

  if (!body) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl"
        style={{
          background: '#080d1a',
          borderColor: `${body.color}35`,
          boxShadow: `0 0 60px ${body.color}18`,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white text-lg"
        >
          ✕
        </button>

        {/* Hero image */}
        <div className="relative w-full overflow-hidden rounded-t-3xl" style={{ height: 300 }}>
          {!imgError && photo ? (
            <img src={photo.src} alt={body.nameFr} onError={() => setImgError(true)}
              className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `radial-gradient(ellipse at 35% 35%, ${body.colorGradient?.[0] ?? body.color}CC, ${body.color}55, #080d1a)` }}>
              <div className="text-8xl">{body.emoji}</div>
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#080d1a] via-[#080d1a]/30 to-transparent" />
          <div className="absolute bottom-5 left-6">
            <div className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: body.color }}>
              {body.type === 'star' ? 'Étoile' : body.type === 'planet' ? 'Planète' : body.type === 'dwarf-planet' ? 'Planète naine' : `Lune de ${body.parent}`}
            </div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>{body.nameFr}</h2>
            {photo && !imgError && <div className="text-xs text-white/30 mt-1 font-mono">{photo.credit}</div>}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-base text-gray-300 leading-relaxed mb-6">{body.description}</p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Rayon', value: `${body.radius.toLocaleString()} km` },
              { label: 'Masse', value: `${body.mass} ×10²⁴ kg` },
              { label: 'Densité', value: body.density ? `${body.density} g/cm³` : '—' },
              { label: 'Gravité', value: body.gravity ? `${body.gravity} m/s²` : '—' },
              { label: 'Rotation', value: body.rotationPeriod ? `${Math.abs(body.rotationPeriod).toFixed(1)}h${body.rotationPeriod < 0 ? ' ↺' : ''}` : '—' },
              { label: 'Temp. moy.', value: body.tempMean ? `${body.tempMean} K (${(body.tempMean - 273.15).toFixed(0)}°C)` : '—' },
              { label: 'Distance ☀️', value: body.semiMajorAxis ? (body.type === 'moon' ? `${(body.semiMajorAxis / 1000).toFixed(0)}k km` : `${body.semiMajorAxis} UA`) : '—' },
              { label: 'Incl. axiale', value: body.axialTilt !== undefined ? `${body.axialTilt}°` : '—' },
              { label: 'Lunes', value: body.moons !== undefined ? String(body.moons) : '—' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3" style={{ background: `${body.color}0A`, border: `1px solid ${body.color}1A` }}>
                <div className="text-xs text-gray-600 uppercase tracking-wide mb-0.5">{s.label}</div>
                <div className="text-sm font-mono font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Atmosphere */}
          {body.atmosphereComposition && body.atmosphereComposition.length > 0 && (
            <div className="mb-5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">💨 Atmosphère</h3>
              <div className="space-y-1.5">
                {body.atmosphereComposition.slice(0, 6).map(a => (
                  <div key={a.element} className="flex items-center gap-3">
                    <div className="w-32 text-sm text-gray-400 truncate shrink-0">{a.element}</div>
                    <div className="flex-1 h-2 bg-white/5 rounded overflow-hidden">
                      <div className="h-full rounded" style={{ width: `${a.percent}%`, background: body.color, opacity: 0.7 }} />
                    </div>
                    <div className="text-xs font-mono text-gray-500 w-12 text-right">{a.percent.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {body.features && body.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">✨ Caractéristiques</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {body.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span style={{ color: body.color }} className="shrink-0 mt-0.5">◆</span> {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Link
              href={`/solar-system/bodys/${body.id}`}
              className="flex-1 text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all hover:brightness-110"
              style={{ background: `${body.color}25`, border: `1px solid ${body.color}45`, color: body.color }}
            >
              Page complète →
            </Link>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:text-white border border-white/10 hover:bg-white/6 transition-all"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BodiesGallery() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const allIds = GROUPS.flatMap(g => g.ids);
  const allBodies = allIds.map(id => solarSystem.find(b => b.id === id)).filter(Boolean);

  const matchesFilter = (id: string) => {
    const body = solarSystem.find(b => b.id === id);
    if (!body) return false;
    if (filter !== 'all' && body.type !== filter) return false;
    if (search) {
      const s = search.toLowerCase();
      if (!body.nameFr.toLowerCase().includes(s) && !body.name.toLowerCase().includes(s)) return false;
    }
    return true;
  };

  const visibleGroups = GROUPS.map(g => ({
    ...g,
    ids: g.ids.filter(matchesFilter),
  })).filter(g => g.ids.length > 0);

  const totalVisible = visibleGroups.reduce((n, g) => n + g.ids.length, 0);

  return (
    <SolarLayout>

      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-blue-500 mb-2">Système Solaire</div>
          <h1
            className="text-5xl sm:text-6xl font-bold text-white mb-3"
            style={{ fontFamily: "'Cinzel', serif", letterSpacing: '-0.01em' }}
          >
            Corps Célestes
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
            Photographies réelles et données scientifiques du Soleil, des 8 planètes, de Pluton et des principales lunes du Système Solaire.
          </p>
        </div>

        {/* ── Filters ─────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(FILTER_LABELS) as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                  filter === f
                    ? 'bg-blue-900/50 text-blue-200 border-blue-700/60 scale-105'
                    : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="ml-auto relative">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-600 w-44"
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white text-xs">✕</button>
            )}
          </div>

          <div className="text-sm text-gray-600 font-mono">{totalVisible} corps</div>
        </div>

        {/* ── Gallery ─────────────────────────────────────────────── */}
        {visibleGroups.map(group => (
          <div key={group.label} className="mb-12">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="w-1 h-7 rounded-full shrink-0" style={{ background: group.accent }} />
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                {group.label}
              </h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${group.accent}30, transparent)` }} />
              <span className="text-sm text-gray-600 font-mono">{group.ids.length}</span>
            </div>

            {/* Cards grid — adapt columns by group size */}
            <div
              className="grid gap-5"
              style={{
                gridTemplateColumns: group.ids.length === 1
                  ? 'minmax(0, 480px)'
                  : group.ids.length === 2
                  ? 'repeat(2, minmax(0, 1fr))'
                  : group.ids.length >= 4
                  ? 'repeat(auto-fill, minmax(260px, 1fr))'
                  : 'repeat(auto-fill, minmax(280px, 1fr))',
              }}
            >
              {group.ids.map(id => (
                <BodyCard key={id} id={id} onSelect={setSelectedId} />
              ))}
            </div>
          </div>
        ))}

        {visibleGroups.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔭</div>
            <p className="text-gray-500 text-lg">Aucun corps céleste ne correspond à votre recherche.</p>
          </div>
        )}
      </div>

      {/* ── Modal ───────────────────────────────────────────────── */}
      {selectedId && (
        <BodyModal id={selectedId} onClose={() => setSelectedId(null)} />
      )}
    </SolarLayout>
  );
}
