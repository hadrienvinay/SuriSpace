// app/solar-system/stars/[id].tsx
// Constellation detail page
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';

import {
  constellations, stars, getStarsByConstellation,
  SPECTRAL_COLORS, raDecToXY,
  type Constellation, type Star,
} from '@/data/stars';

const MAG_TO_RADIUS = (mag: number) => Math.max(2, 10 - mag * 0.6);

function MiniMap({ constellation }: { constellation: Constellation }) {
  const size = 300;
  const cx = size / 2, cy = size / 2;
  const mapR = size * 0.44;
  const conStars = getStarsByConstellation(constellation.id).concat(
    constellation.mainStars.map(id => stars.find(s => s.id === id)).filter(Boolean) as Star[]
  );
  const uniqueStars = Array.from(new Map(conStars.map(s => [s.id, s])).values());

  const getPos = (ra: number, dec: number) => {
    const { x, y } = raDecToXY(ra, dec);
    return { px: cx + x * mapR, py: cy + y * mapR * 0.9 };
  };

  return (
    <svg width={size} height={size} className="mx-auto block">
      <defs>
        <radialGradient id="cmap-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d1535" />
          <stop offset="100%" stopColor="#04060f" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={mapR + 2} fill="url(#cmap-bg)" />
      {/* BG micro stars */}
      {Array.from({ length: 80 }, (_, i) => {
        const a = (i * 137.5) % 360;
        const r = Math.sqrt(i / 80) * mapR * 0.95;
        return <circle key={i} cx={cx + r * Math.cos(a * Math.PI / 180)} cy={cy + r * Math.sin(a * Math.PI / 180)} r={0.5} fill={`rgba(200,220,255,${0.05 + (i % 5) * 0.04})`} />;
      })}
      {/* Lines */}
      {constellation.lines.map(([id1, id2]) => {
        const s1 = stars.find(s => s.id === id1);
        const s2 = stars.find(s => s.id === id2);
        if (!s1 || !s2) return null;
        const p1 = getPos(s1.ra, s1.dec);
        const p2 = getPos(s2.ra, s2.dec);
        return <line key={`${id1}-${id2}`} x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py} stroke={constellation.color} strokeWidth={1.5} strokeOpacity={0.6} />;
      })}
      {/* Stars */}
      {uniqueStars.map(star => {
        const { px, py } = getPos(star.ra, star.dec);
        const r = MAG_TO_RADIUS(star.magnitude);
        const col = SPECTRAL_COLORS[star.spectralClass] ?? '#fff';
        return (
          <g key={star.id}>
            <circle cx={px} cy={py} r={r * 2} fill={col} fillOpacity={0.1} />
            <circle cx={px} cy={py} r={r} fill={col} />
            {star.magnitude < 3 && (
              <text x={px + r + 4} y={py + 4} fontSize={8} fill="rgba(255,255,255,0.55)" fontFamily="sans-serif">
                {star.nameFr ?? star.name}
              </text>
            )}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={mapR + 2} fill="none" stroke={`${constellation.color}40`} strokeWidth={1.5} />
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
            <p className="text-5xl mb-4">🌌</p>
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
    winter: '❄️ Hiver', spring: '🌸 Printemps', summer: '☀️ Été', autumn: '🍂 Automne', 'year-round': '📅 Toute l\'année',
  };

  return (
    <SolarLayout>

    <div className="min-h-screen text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>

      {/* Nav */}
      <nav className="border-b border-white/6" style={{ background: 'rgba(1,4,14,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center gap-2 text-md overflow-x-auto">
          <Link href="/solar-system" className="text-gray-600 hover:text-white transition-colors shrink-0">💫 Système solaire </Link>
          <span className="text-gray-700">›</span>
          <Link href="/solar-system/stars" className="text-gray-500 hover:text-white transition-colors shrink-0">✨ Carte du Ciel</Link>
          <span className="text-gray-700">›</span>
          <Link href="/solar-system/stars/constellations" className="text-gray-600 hover:text-white transition-colors shrink-0">🔭 Constellations </Link>
          <span className="text-gray-700">›</span>
          <span style={{ color: constellation.color }}>{constellation.nameFr}</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 py-10">

        {/* ── Hero ── */}
        <div className="relative rounded-3xl border overflow-hidden mb-8 p-8 sm:p-12"
          style={{
            borderColor: `${constellation.color}30`,
            background: `radial-gradient(ellipse at 25% 40%, ${constellation.color}12, rgba(1,4,14,0.98))`,
          }}>
          <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{ background: `radial-gradient(circle, ${constellation.color}10, transparent 70%)`, transform: 'translate(30%,-30%)' }} />

          <div className="relative flex flex-col sm:flex-row gap-8">
            <div className="shrink-0 mx-auto sm:mx-0">
              <MiniMap constellation={constellation} />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-gray-600 mb-2 font-semibold">Constellation · {constellation.abbreviation}</div>
              <h1 className="text-5xl font-bold text-white mb-2"
                style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {constellation.emoji} {constellation.nameFr}
              </h1>
              <div className="text-lg text-gray-400 mb-4 italic" style={{ fontFamily: "'Exo 2', sans-serif" }}>{constellation.name}</div>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="px-3 py-1.5 rounded-xl text-sm font-semibold"
                  style={{ background: `${seasonColors[constellation.bestSeason]}18`, border: `1px solid ${seasonColors[constellation.bestSeason]}40`, color: seasonColors[constellation.bestSeason] }}>
                  {seasonLabels[constellation.bestSeason]}
                </span>
                <span className="px-3 py-1.5 rounded-xl text-sm border border-white/10 text-gray-400">
                  🌍 {constellation.hemisphere === 'north' ? 'Hémisphère Nord' : constellation.hemisphere === 'south' ? 'Hémisphère Sud' : 'Visible partout'}
                </span>
                {constellation.area && (
                  <span className="px-3 py-1.5 rounded-xl text-sm border border-white/10 text-gray-400">
                    📐 {constellation.area} deg²
                  </span>
                )}
              </div>
              <p className="text-base text-gray-300 leading-relaxed">{constellation.description}</p>
            </div>
          </div>
        </div>

        {/* ── Mythology ── */}
        <div className="rounded-2xl border border-white/8 p-6 mb-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <h2 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>📖 Mythologie</h2>
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
                          <span className="text-xs text-cyan-400">🪐 {star.exoplanets.length} exoplanète{star.exoplanets.length > 1 ? 's' : ''}</span>
                          {star.exoplanets.some(p => p.habitable) && <span className="text-xs text-green-400 ml-1">🌍 zone habitable</span>}
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
            <h2 className="text-lg font-bold text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>🔭 Objets du ciel profond</h2>
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
              <span className="text-2xl">{prev.emoji}</span>
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
              <span className="text-2xl">{next.emoji}</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
    </SolarLayout>
  );
}