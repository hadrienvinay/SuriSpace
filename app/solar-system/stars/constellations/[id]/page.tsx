// app/solar-system/stars/[id].tsx
// Constellation detail page
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';

import {
  constellations, stars, getStarsByConstellation,
  SPECTRAL_COLORS, raDecToXY,
  type Constellation, type Star,
} from '@/data/stars';
import { GalaxyIcon } from '@/components/AtomsIcons';
import { TelescopeIcon } from '@/components/UniverseIcons';
import { IcoGlobeEarth, IcoPlanetRing, IcoCalendar } from '@/components/SolarIcons';
import { ConstellationIcon } from '@/components/ConstellationIcons';

const MAG_TO_RADIUS = (mag: number) => Math.max(1.5, 8 - mag * 0.55);

// ─── Full-width adaptive constellation viewer ─────────────────────────────────
function ConstellationViewer({ constellation }: { constellation: Constellation }) {
  const W = 620;
  const H = 340;
  const pad = 52;

  // Collect all stars needed (for display + for lines)
  const neededIds = new Set<string>([
    ...getStarsByConstellation(constellation.id).map(s => s.id),
    ...constellation.mainStars,
    ...constellation.lines.flat(),
  ]);
  const starMap = new Map<string, Star>();
  neededIds.forEach(id => {
    const s = stars.find(st => st.id === id);
    if (s) starMap.set(id, s);
  });
  const allStars = Array.from(starMap.values());

  if (allStars.length === 0) {
    return (
      <div style={{ width: '100%', height: H, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6 }}>
        <ConstellationIcon id={constellation.id} size={72} color={constellation.color} />
      </div>
    );
  }

  // Normalize coordinates to fit the constellation snugly
  const rawPos = allStars.map(s => { const { x, y } = raDecToXY(s.ra, s.dec); return { id: s.id, rx: x, ry: y }; });
  const xs = rawPos.map(p => p.rx);
  const ys = rawPos.map(p => p.ry);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const rangeX = Math.max(maxX - minX, 0.08);
  const rangeY = Math.max(maxY - minY, 0.08);
  const scaleX = (W - pad * 2) / rangeX;
  const scaleY = (H - pad * 2) / rangeY;
  const scale = Math.min(scaleX, scaleY);
  const offX = W / 2 - ((minX + maxX) / 2) * scale;
  const offY = H / 2 - ((minY + maxY) / 2) * scale;

  const posMap = new Map(rawPos.map(p => [p.id, { px: p.rx * scale + offX, py: p.ry * scale + offY }]));

  // Display stars (with magnitude info), sorted brightest first for layering
  const displayStars = allStars.slice().sort((a, b) => b.magnitude - a.magnitude);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: '100%', height: 'auto', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cv-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={constellation.color} stopOpacity="0.09" />
          <stop offset="65%" stopColor="#030c20" stopOpacity="1" />
          <stop offset="100%" stopColor="#010610" stopOpacity="1" />
        </radialGradient>
        <filter id="cv-glow-sm">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="cv-glow-lg">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width={W} height={H} fill="#010610" />
      <rect width={W} height={H} fill="url(#cv-bg)" />

      {/* Micro background stars (deterministic) */}
      {Array.from({ length: 140 }, (_, i) => (
        <circle
          key={i}
          cx={(i * 4733 + 271) % W}
          cy={(i * 3177 + 941) % H}
          r={(i % 5 === 0) ? 0.9 : 0.5}
          fill={`rgba(200,215,255,${0.04 + (i % 6) * 0.025})`}
        />
      ))}

      {/* Constellation lines — thin, precise */}
      {constellation.lines.map(([id1, id2], i) => {
        const p1 = posMap.get(id1);
        const p2 = posMap.get(id2);
        if (!p1 || !p2) return null;
        return (
          <line
            key={i}
            x1={p1.px} y1={p1.py}
            x2={p2.px} y2={p2.py}
            stroke={constellation.color}
            strokeWidth="0.75"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
        );
      })}

      {/* Stars */}
      {displayStars.map(star => {
        const pos = posMap.get(star.id);
        if (!pos) return null;
        const { px, py } = pos;
        const r = MAG_TO_RADIUS(star.magnitude);
        const col = SPECTRAL_COLORS[star.spectralClass] ?? '#ffffff';
        const isBright = star.magnitude < 1.5;
        const isVeryBright = star.magnitude < 0.5;
        const showLabel = star.magnitude < 2.2 || constellation.mainStars.includes(star.id);
        return (
          <g key={star.id} filter={isBright ? 'url(#cv-glow-lg)' : 'url(#cv-glow-sm)'}>
            {/* Halo layers */}
            {isVeryBright && <circle cx={px} cy={py} r={r * 5} fill={col} fillOpacity={0.04} />}
            <circle cx={px} cy={py} r={r * 2.8} fill={col} fillOpacity={0.07} />
            <circle cx={px} cy={py} r={r * 1.6} fill={col} fillOpacity={0.13} />
            {/* Star core */}
            <circle cx={px} cy={py} r={r} fill={col} fillOpacity={isBright ? 1 : 0.85} />
            {/* Label */}
            {showLabel && (
              <text
                x={px + r + 5}
                y={py + 4}
                fontSize={9}
                fill={`rgba(255,255,255,0.5)`}
                fontFamily="monospace"
                style={{ userSelect: 'none' }}
              >
                {star.nameFr ?? star.name}
              </text>
            )}
          </g>
        );
      })}

      {/* Subtle border */}
      <rect width={W} height={H} fill="none" stroke={`${constellation.color}18`} strokeWidth="1" />
    </svg>
  );
}

export default async function ConstellationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const constellation = constellations.find(c => c.id === id);

  if (!constellation) {
    return (
      <SolarLayout>
        <div className="min-h-screen bg-[#01040e] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center opacity-30"><GalaxyIcon size={64} /></div>
            <p className="text-gray-400 text-lg">Constellation introuvable</p>
            <Link href="/solar-system/stars" className="text-blue-400 underline mt-3 block">Retour à la carte</Link>
          </div>
        </div>
      </SolarLayout>

    );
  }

  const conStarIds = new Set([
    ...getStarsByConstellation(constellation.id).map(s => s.id),
    ...constellation.mainStars,
  ]);
  const constellationStars = Array.from(new Map(
    [...conStarIds].map(id => [id, stars.find(s => s.id === id)]).filter(([, s]) => s) as [string, Star][]
  ).values()).sort((a, b) => a.magnitude - b.magnitude);

  const idx = constellations.findIndex(c => c.id === constellation.id);
  const prev = constellations[idx - 1];
  const next = constellations[idx + 1];

  const seasonColors: Record<string, string> = {
    winter: '#93C5FD', spring: '#86EFAC', summer: '#FDE68A', autumn: '#FDBA74', 'year-round': '#E9D5FF',
  };
  const seasonLabels: Record<string, string> = {
    winter: 'Hiver', spring: 'Printemps', summer: 'Été', autumn: 'Automne', 'year-round': 'Toute l\'année',
  };

  return (
    <SolarLayout>

    <div className="min-h-screen text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>

      <div className="max-w-5xl mx-auto px-5 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/solar-system" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <Link href="/solar-system/stars" className="hover:text-white transition-colors">Étoiles</Link>
          <span>›</span>
          <Link href="/solar-system/stars/constellations" className="hover:text-white transition-colors">Constellations</Link>
          <span>›</span>
          <span style={{ color: constellation.color }}>{constellation.nameFr}</span>
        </div>

        {/* ── Hero ── */}
        <div className="relative rounded-3xl border overflow-hidden mb-8"
          style={{
            borderColor: `${constellation.color}30`,
            background: `radial-gradient(ellipse at 50% 30%, ${constellation.color}10, rgba(1,4,14,0.99))`,
          }}>

          {/* Full-width constellation viewer */}
          <ConstellationViewer constellation={constellation} />

          {/* Divider line */}
          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${constellation.color}30, transparent)` }} />

          {/* Metadata below */}
          <div className="p-8 sm:p-10">
            <div className="text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">
              Constellation · {constellation.abbreviation}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-1"
              style={{ fontFamily: "'Exo 2', sans-serif" }}>
              <ConstellationIcon id={constellation.id} size={28} color={constellation.color} /> {constellation.nameFr}
            </h1>
            <div className="text-lg text-gray-500 mb-5 italic"
              style={{ fontFamily: "'Exo 2', sans-serif" }}>
              {constellation.name}
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              <span className="px-3 py-1.5 rounded-xl text-sm font-semibold"
                style={{ background: `${seasonColors[constellation.bestSeason]}18`, border: `1px solid ${seasonColors[constellation.bestSeason]}40`, color: seasonColors[constellation.bestSeason] }}>
                {seasonLabels[constellation.bestSeason]}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm border border-white/10 text-gray-400">
                <IcoGlobeEarth size={13} />{constellation.hemisphere === 'north' ? 'Hémisphère Nord' : constellation.hemisphere === 'south' ? 'Hémisphère Sud' : 'Visible partout'}
              </span>
              {constellation.area && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm border border-white/10 text-gray-400">
                  <IcoCalendar size={13} />{constellation.area} deg²
                </span>
              )}
            </div>
            <p className="text-base text-gray-300 leading-relaxed">{constellation.description}</p>
          </div>
        </div>

        {/* ── Mythology ── */}
        <div className="rounded-2xl border border-white/8 p-6 mb-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>Mythologie</h2>
          <p className="text-base text-gray-300 leading-relaxed">{constellation.mythology}</p>
        </div>

        {/* ── Stars ── */}
        {constellationStars.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              ✦ Étoiles principales ({constellationStars.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {constellationStars.map(star => {
                const col = SPECTRAL_COLORS[star.spectralClass] ?? '#fff';
                return (
                  <Link key={star.id} href={`/solar-system/stars/star/${star.id}`}
                    className="group flex items-start gap-4 p-4 rounded-2xl border border-white/8 bg-white/2 hover:bg-white/5 hover:border-white/15 transition-all">
                    <div className="shrink-0 mt-1">
                      <div className="w-9 h-9 rounded-full border-2 flex items-center justify-center"
                        style={{ borderColor: col + '60', background: col + '18', boxShadow: `0 0 10px ${col}30` }}>
                        <svg width="16" height="16"><circle cx="8" cy="8" r="6" fill={col} /></svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-white group-hover:underline">{star.nameFr ?? star.name}</span>
                        <span className="text-sm font-mono text-gray-500">{star.magnitude.toFixed(2)} mag</span>
                      </div>
                      <div className="text-xs text-gray-500 font-mono mb-1">{star.spectralType} · {star.distanceLy} al</div>
                      <p className="text-sm text-gray-400 line-clamp-2">{star.description.slice(0, 100)}…</p>
                      {star.exoplanets && star.exoplanets.length > 0 && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <span className="inline-flex items-center gap-0.5 text-xs text-cyan-400"><IcoPlanetRing size={11} />{star.exoplanets.length} exoplanète{star.exoplanets.length > 1 ? 's' : ''}</span>
                          {star.exoplanets.some(p => p.habitable) && <span className="inline-flex items-center gap-0.5 text-xs text-green-400 ml-1"><IcoGlobeEarth size={11} />zone habitable</span>}
                        </div>
                      )}
                    </div>
                    <span className="text-gray-700 group-hover:text-white text-sm mt-1">→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Deep Sky Objects ── */}
        {constellation.deepSkyObjects && constellation.deepSkyObjects.length > 0 && (
          <div className="rounded-2xl border p-6 mb-8"
            style={{ borderColor: `${constellation.color}25`, background: `${constellation.color}06` }}>
            <h2 className="flex items-center gap-2 text-lg font-bold text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}><TelescopeIcon size={18} />Objets du ciel profond</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {constellation.deepSkyObjects.map((obj, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-white/4">
                  <span style={{ color: constellation.color }} className="shrink-0 mt-0.5">◆</span>
                  <span className="text-base text-gray-200">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex justify-between items-center pt-4 border-t border-white/8">
          {prev ? (
            <Link href={`/solar-system/stars/constellations/${prev.id}`}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-all group">
              <ConstellationIcon id={prev.id} size={24} color={prev.color} />
              <div>
                <div className="text-xs text-gray-600">← Précédente</div>
                <div className="text-sm font-bold text-white group-hover:underline">{prev.nameFr}</div>
              </div>
            </Link>
          ) : <div />}
          <Link href="/solar-system/stars" className="text-sm text-gray-600 hover:text-white transition-colors font-mono">✨ Carte</Link>
          {next ? (
            <Link href={`/solar-system/stars/constellations/${next.id}`}
              className="flex items-center gap-3 text-right px-5 py-3 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-all group">
              <div>
                <div className="text-xs text-gray-600">Suivante →</div>
                <div className="text-sm font-bold text-white group-hover:underline">{next.nameFr}</div>
              </div>
              <ConstellationIcon id={next.id} size={24} color={next.color} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
    </SolarLayout>
  );
}