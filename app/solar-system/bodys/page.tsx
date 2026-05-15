// app/solar-system/bodys/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SolarLayout from '@/components/SolarLayout';
import { solarSystem } from '@/data/solar-system';

// ─── Stable NASA / Wikimedia image URLs ──────────────────────────────────────
// Planets: science.nasa.gov (official, stable)
// Moons:   Wikimedia Commons (verified working)
const BODY_PHOTOS: Record<string, { src: string; credit: string }> = {
  sun:       { src: 'https://science.nasa.gov/wp-content/uploads/2023/05/soho-prominences-1920x640-1.jpg?w=1024',                                                                             credit: 'NASA/ESA SOHO' },
  mercury:   { src: 'https://science.nasa.gov/wp-content/uploads/2024/03/pia15162-mercury-basins-messenger-16x9-1.jpg?w=800',                                                                credit: 'NASA MESSENGER' },
  venus:     { src: 'https://science.nasa.gov/wp-content/uploads/2024/03/venus-mariner-10-pia23791-fig2-16x9-1.jpg?w=800',                                                                   credit: 'NASA Mariner 10' },
  earth:     { src: 'https://science.nasa.gov/wp-content/uploads/2024/03/blue-marble-apollo-17-16x9-1.jpg?w=800',                                                                             credit: 'NASA Apollo 17' },
  mars:      { src: 'https://science.nasa.gov/wp-content/uploads/2024/03/mars-full-globe-16x9-1.jpg?w=800',                                                                                   credit: 'NASA MRO' },
  jupiter:   { src: 'https://science.nasa.gov/wp-content/uploads/2024/03/jupiter-marble-pia22946-16x9-1.jpg?w=800',                                                                           credit: 'NASA Hubble' },
  saturn:    { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/cds/general/images/2024/03/saturn-farewell-pia21345.jpg',                                                      credit: 'NASA Cassini' },
  uranus:    { src: 'https://science.nasa.gov/wp-content/uploads/2024/03/uranus-pia18182-16x9-1.jpg?w=800',                                                                                   credit: 'NASA Voyager 2' },
  neptune:   { src: 'https://science.nasa.gov/wp-content/uploads/2024/03/pia01492-neptune-full-disk-16x9-1.jpg?w=800',                                                                        credit: 'NASA Voyager 2' },
  pluto:     { src: 'https://science.nasa.gov/wp-content/uploads/2023/06/color-image-of-pluto-pia20291-1.jpg?w=800',                                                                         credit: 'NASA New Horizons' },
  moon:      { src: 'https://images-assets.nasa.gov/image/art002e021110/art002e021110~large.jpg',                                                                                              credit: 'NASA Artemis II 2026' },
  phobos:    { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia00/pia00997/PIA00997.jpg?w=800',                                                     credit: 'NASA Mars Pathfinder' },
  deimos:    { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia00/pia00996/PIA00996.jpg?w=800',                                                     credit: 'NASA Mars Pathfinder' },
  io:        { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia02/pia02201/PIA02201.jpg?w=800',                                                     credit: 'NASA Galileo' },
  europa:    { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia09/pia09246/PIA09246.jpg?w=800',                                                     credit: 'NASA Galileo' },
  ganymede:  { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia02/pia02252/PIA02252.jpg?w=800',                                                     credit: 'NASA Voyager 1' },
  callisto:  { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia02/pia02253/PIA02253.jpg?w=800',                                                     credit: 'NASA Voyager 2' },
  titan:     { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia02/pia02290/PIA02290.jpg?w=800',                                                     credit: 'NASA Voyager 2' },
  enceladus: { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia07/pia07800/PIA07800.jpg',                                                           credit: 'NASA Cassini' },
  triton:    { src: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/photojournal/pia/pia02/pia02208/PIA02208.jpg?w=800',                                                     credit: 'NASA Voyager 2' },
};

const GROUPS = [
  { label: 'Notre étoile',                    ids: ['sun'],                                accent: '#FCD34D' },
  { label: 'Planètes telluriques',             ids: ['mercury','venus','earth','mars'],     accent: '#FB923C' },
  { label: 'Géantes gazeuses & glacées',       ids: ['jupiter','saturn','uranus','neptune'],accent: '#60A5FA' },
  { label: 'Planète naine',                    ids: ['pluto'],                              accent: '#D4A574' },
  { label: 'Lune terrestre',                   ids: ['moon'],                               accent: '#9CA3AF' },
  { label: 'Lunes de Mars',                    ids: ['phobos','deimos'],                    accent: '#FB923C' },
  { label: 'Lunes galiléennes de Jupiter',     ids: ['io','europa','ganymede','callisto'],  accent: '#D97706' },
  { label: 'Lunes remarquables de Saturne',    ids: ['titan','enceladus'],                  accent: '#FDE68A' },
  { label: 'Lune de Neptune',                  ids: ['triton'],                             accent: '#3B82F6' },
];

type FilterType = 'all' | 'star' | 'planet' | 'dwarf-planet' | 'moon';
const FILTERS: { key: FilterType; label: string; color: string }[] = [
  { key: 'all',          label: 'Tous',        color: '#A78BFA' },
  { key: 'star',         label: 'Étoile',      color: '#FCD34D' },
  { key: 'planet',       label: 'Planètes',    color: '#60A5FA' },
  { key: 'dwarf-planet', label: 'Naines',      color: '#D4A574' },
  { key: 'moon',         label: 'Lunes',       color: '#9CA3AF' },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function BodyCard({ id, onSelect }: { id: string; onSelect: (id: string) => void }) {
  const body = solarSystem.find(b => b.id === id);
  const photo = BODY_PHOTOS[id];
  const [imgError, setImgError] = useState(false);
  if (!body) return null;

  const typeLabel =
    body.type === 'star'         ? 'Étoile'        :
    body.type === 'planet'       ? 'Planète'        :
    body.type === 'dwarf-planet' ? 'Planète naine'  :
    `Lune · ${body.parent ?? ''}`;

  return (
    <button
      onClick={() => onSelect(id)}
      className="group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 cursor-pointer hover:scale-[1.02] focus:outline-none"
      style={{
        borderColor: `${body.color}28`,
        background: 'rgba(8,13,26,0.95)',
        boxShadow: `0 4px 28px rgba(0,0,0,0.55)`,
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${body.color}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 40px ${body.color}18, 0 4px 28px rgba(0,0,0,0.6)`; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${body.color}28`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 28px rgba(0,0,0,0.55)`; }}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {!imgError && photo ? (
          <Image
            src={photo.src}
            alt={body.nameFr}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `radial-gradient(ellipse at 35% 35%, ${body.colorGradient?.[0] ?? body.color}DD, ${body.color}88, #080d1a)` }}
          >
            <svg width="90" height="90" viewBox="0 0 100 100">
              <defs>
                <radialGradient id={`fg-${id}`} cx="32%" cy="28%" r="70%">
                  {body.colorGradient?.map((c, i) => (
                    <stop key={i} offset={`${(i / Math.max(1, body.colorGradient!.length - 1)) * 100}%`} stopColor={c} />
                  )) ?? <stop offset="0%" stopColor={body.color} />}
                </radialGradient>
              </defs>
              {id === 'saturn' && <ellipse cx="50" cy="52" rx="44" ry="10" fill="none" stroke={body.color} strokeOpacity="0.45" strokeWidth="5" />}
              <circle cx="50" cy="50" r={id === 'sun' ? 44 : 36} fill={`url(#fg-${id})`} />
              {id === 'uranus' && <ellipse cx="50" cy="50" rx="10" ry="42" fill="none" stroke={body.color} strokeOpacity="0.3" strokeWidth="3" />}
            </svg>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #080d1a 0%, rgba(8,13,26,0.3) 50%, transparent 100%)' }} />

        {/* Type badge */}
        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide"
          style={{ background: `${body.color}22`, border: `1px solid ${body.color}45`, color: body.color }}>
          {typeLabel}
        </div>

        {/* Rings badge */}
        {body.rings && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs bg-white/8 text-white/50 border border-white/15">
            Anneaux
          </div>
        )}

        {/* Photo credit */}
        {photo && !imgError && (
          <div className="absolute bottom-2 right-2.5 text-[9px] text-white/25 font-mono tracking-wide">{photo.credit}</div>
        )}
      </div>

      {/* Card body */}
      <div className="px-4 pt-3 pb-4">
        <h3 className="text-lg font-bold text-white mb-0.5 leading-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
          {body.nameFr}
        </h3>
        <p className="text-xs text-gray-600 font-mono mb-2.5">
          {body.type === 'moon'
            ? `Lune · r = ${body.radius.toLocaleString()} km`
            : body.semiMajorAxis
            ? `${body.semiMajorAxis} UA · r = ${body.radius.toLocaleString()} km`
            : `r = ${body.radius.toLocaleString()} km`}
        </p>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{body.description}</p>

        {/* Inline stats */}
        <div className="mt-3 flex items-center gap-3 flex-wrap">
          {body.gravity && (
            <span className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ background: `${body.color}12`, color: `${body.color}CC` }}>
              g {body.gravity} m/s²
            </span>
          )}
          {body.tempMean && (
            <span className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ background: `${body.color}12`, color: `${body.color}CC` }}>
              {(body.tempMean - 273.15).toFixed(0)}°C
            </span>
          )}
          {body.moons !== undefined && body.moons > 0 && (
            <span className="text-xs font-mono px-2 py-0.5 rounded-md" style={{ background: `${body.color}12`, color: `${body.color}CC` }}>
              {body.moons} lune{body.moons > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right, transparent, ${body.color}, transparent)` }} />
    </button>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function BodyModal({ id, onClose }: { id: string; onClose: () => void }) {
  const body = solarSystem.find(b => b.id === id);
  const photo = BODY_PHOTOS[id];
  const [imgError, setImgError] = useState(false);
  if (!body) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20"
      style={{ background: 'rgba(0,0,8,0.88)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl"
        style={{ background: 'rgba(8,12,28,0.97)', borderColor: `${body.color}30`, boxShadow: `0 0 80px ${body.color}15, 0 0 0 1px ${body.color}20` }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full text-white/60 hover:text-white hover:bg-white/12 transition-all text-base border border-white/10">
          ✕
        </button>

        {/* Hero */}
        <div className="relative w-full overflow-hidden rounded-t-3xl" style={{ height: 280 }}>
          {!imgError && photo ? (
            <Image
              src={photo.src}
              alt={body.nameFr}
              fill
              sizes="(max-width: 1024px) 100vw, 768px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `radial-gradient(ellipse at 35% 35%, ${body.colorGradient?.[0] ?? body.color}CC, ${body.color}55, #080d1a)` }}>
              <div className="text-8xl">{body.emoji}</div>
            </div>
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,12,28,1) 0%, rgba(8,12,28,0.5) 40%, transparent 100%)' }} />
          <div className="absolute bottom-5 left-6">
            <div className="text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: body.color }}>
              {body.type === 'star' ? 'Étoile' : body.type === 'planet' ? 'Planète' : body.type === 'dwarf-planet' ? 'Planète naine' : `Lune · ${body.parent}`}
            </div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}>{body.nameFr}</h2>
            {body.name !== body.nameFr && <div className="text-sm text-gray-500 mt-0.5 font-mono">{body.name}</div>}
            {photo && !imgError && <div className="text-xs text-white/25 mt-1 font-mono">{photo.credit}</div>}
          </div>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-base text-gray-300 leading-relaxed">{body.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {[
              { label: 'Rayon',        value: `${body.radius.toLocaleString()} km` },
              { label: 'Masse',        value: `${body.mass} ×10²⁴ kg` },
              { label: 'Densité',      value: body.density ? `${body.density} g/cm³` : '—' },
              { label: 'Gravité',      value: body.gravity ? `${body.gravity} m/s²` : '—' },
              { label: 'Rotation',     value: body.rotationPeriod ? `${Math.abs(body.rotationPeriod).toFixed(1)} h${body.rotationPeriod < 0 ? ' ↺' : ''}` : '—' },
              { label: 'Temp. moy.',   value: body.tempMean ? `${body.tempMean} K (${(body.tempMean - 273.15).toFixed(0)}°C)` : '—' },
              { label: 'Dist. ☀',     value: body.semiMajorAxis ? (body.type === 'moon' ? `${(body.semiMajorAxis / 1000).toFixed(0)}k km` : `${body.semiMajorAxis} UA`) : '—' },
              { label: 'Incl. axiale', value: body.axialTilt !== undefined ? `${body.axialTilt}°` : '—' },
              { label: 'Lunes',        value: body.moons !== undefined ? String(body.moons) : '—' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3" style={{ background: `${body.color}08`, border: `1px solid ${body.color}18` }}>
                <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-0.5">{s.label}</div>
                <div className="text-sm font-mono font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Atmosphere */}
          {body.atmosphereComposition && body.atmosphereComposition.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Atmosphère</h3>
              <div className="space-y-2">
                {body.atmosphereComposition.slice(0, 6).map(a => (
                  <div key={a.element} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 truncate shrink-0" style={{ width: 130 }}>{a.element}</span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-full rounded-full" style={{ width: `${a.percent}%`, background: `${body.color}CC` }} />
                    </div>
                    <span className="text-xs font-mono text-gray-500 w-12 text-right">{a.percent.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {body.features && body.features.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Caractéristiques</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {body.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <span style={{ color: body.color }} className="shrink-0 mt-0.5 text-xs">◆</span>{f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Link
              href={`/solar-system/bodys/${body.id}`}
              className="flex-1 text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wide transition-all hover:brightness-110"
              style={{ background: `${body.color}20`, border: `1px solid ${body.color}40`, color: body.color }}
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BodiesGallery() {
  const [filter, setFilter]   = useState<FilterType>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch]   = useState('');

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

  const visibleGroups = GROUPS
    .map(g => ({ ...g, ids: g.ids.filter(matchesFilter) }))
    .filter(g => g.ids.length > 0);

  const totalVisible = visibleGroups.reduce((n, g) => n + g.ids.length, 0);

  return (
    <SolarLayout>
      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/solar-system" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <Link href="/solar-system/carte" className="hover:text-white transition-colors">Système solaire</Link>
          <span>›</span>
          <span className="text-gray-400">Corps Célestes</span>
        </div>

        {/* Header */}
        <div className="mb-7">
          <h1
            className="text-4xl font-bold text-white mb-1"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Notre système solaire
          </h1>
          <p className="text-base text-gray-500">
            1 étoile · 8 planètes · 220+ lunes · photos NASA officielles
          </p>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-1.5 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  filter === f.key
                    ? 'bg-blue-900/40 text-blue-200 border-blue-700/50 scale-105'
                    : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative sm:ml-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs">🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher…"
              className="pl-8 pr-8 py-1.5 rounded-xl text-sm text-gray-300 bg-white/4 border border-white/10 focus:outline-none focus:border-blue-700/50 w-48"
              style={{ fontFamily: "'Exo 2', sans-serif" }}
            />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white text-xs">✕</button>
            )}
          </div>

          <div className="text-sm text-gray-600 font-mono self-center">{totalVisible} corps</div>
        </div>

        {/* Gallery */}
        {visibleGroups.map(group => (
          <div key={group.label} className="mb-14">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-0.5 h-6 rounded-full shrink-0" style={{ background: group.accent }} />
              <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {group.label}
              </h2>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(to right, ${group.accent}25, transparent)` }} />
              <span className="text-xs text-gray-600 font-mono">{group.ids.length}</span>
            </div>

            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: group.ids.length === 1
                  ? 'minmax(0, 360px)'
                  : 'repeat(auto-fill, minmax(240px, 1fr))',
              }}
            >
              {group.ids.map(id => (
                <BodyCard key={id} id={id} onSelect={setSelectedId} />
              ))}
            </div>
          </div>
        ))}

        {visibleGroups.length === 0 && (
          <div className="text-center py-24 text-gray-600">
            <div className="text-5xl mb-4 opacity-30">🔭</div>
            <p className="text-lg">Aucun corps céleste ne correspond à cette recherche.</p>
          </div>
        )}
      </div>

      {selectedId && <BodyModal id={selectedId} onClose={() => setSelectedId(null)} />}
    </SolarLayout>
  );
}
