// app/solar-system/stars/star/[id].tsx
// Individual star detail page
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import {
  stars, constellations, SPECTRAL_COLORS,
  getConstellationById,
  type Star, type SpectralClass,
} from '@/data/stars';

const STAR_TYPE_LABELS: Record<string, string> = {
  'main-sequence': '⭐ Système simple',
  'giant': '🟠 Géante',
  'supergiant': '🔴 Supergéante',
  'hypergiant': '💥 Hypergéante',
  'white-dwarf': '⚪ Naine blanche',
  'neutron-star': '🔵 Étoile à neutrons',
  'variable': '✦ Étoile variable',
  'binary': '⚫⚫ Système binaire',
  'carbon': '🟤 Étoile carbone',
};

// HR Diagram rough position
const HR_POSITIONS: Record<string, { x: number; y: number }> = {
  'O': { x: 0.05, y: 0.05 },
  'B': { x: 0.18, y: 0.15 },
  'A': { x: 0.30, y: 0.30 },
  'F': { x: 0.40, y: 0.42 },
  'G': { x: 0.50, y: 0.52 },
  'K': { x: 0.62, y: 0.60 },
  'M': { x: 0.78, y: 0.72 },
};

// Size comparison: visual radius in SVG at scale
function getSizePx(radiusSun: number | undefined): number {
  if (!radiusSun) return 8;
  if (radiusSun >= 1000) return 80;
  if (radiusSun >= 500) return 65;
  if (radiusSun >= 200) return 52;
  if (radiusSun >= 50) return 38;
  if (radiusSun >= 10) return 22;
  if (radiusSun >= 2) return 14;
  return 9;
}

function StarComparison({ star }: { star: Star }) {
  const starR = getSizePx(star.radius);
  const sunR = getSizePx(1); // Sun at base
  const col = SPECTRAL_COLORS[star.spectralClass] ?? '#fff';

  // Use Earth radius (very small) for comparison if it's a small star
  const isSmall = (star.radius ?? 1) < 0.5;
  const compareR = isSmall ? 6 : 14;
  const compareLabel = isSmall ? 'Terre' : '☀️ Soleil';
  const compareCol = isSmall ? '#60A5FA' : '#FCD34D';

  const svgW = 280, svgH = 140;

  return (
    <div className="rounded-2xl border border-white/8 p-5 bg-white/2">
      <h3 className="text-md font-bold uppercase tracking-wider text-gray-500 mb-4">Taille comparée</h3>
      <svg width={svgW} height={svgH} className="mx-auto block">
        {/* Star subject */}
        <circle cx={svgW * 0.35} cy={svgH / 2 + 5} r={starR} fill={col} fillOpacity={0.85}
          style={{ filter: `drop-shadow(0 0 ${starR * 0.4}px ${col}60)` }} />
        <text x={svgW * 0.35} y={svgH / 2 + starR + 16} textAnchor="middle"
          fontSize={10} fill={col} fontFamily="monospace">
          {star.nameFr ?? star.name}
        </text>
        {star.radius && (
          <text x={svgW * 0.35} y={svgH / 2 + starR + 27} textAnchor="middle"
            fontSize={9} fill="rgba(255,255,255,0.3)" fontFamily="monospace">
            {star.radius} R☉
          </text>
        )}

        {/* Compare object */}
        <circle cx={svgW * 0.72} cy={svgH / 2 + 5 + (starR - compareR)} r={compareR}
          fill={compareCol} fillOpacity={0.85}
          style={{ filter: `drop-shadow(0 0 ${compareR * 0.4}px ${compareCol}50)` }} />
        <text x={svgW * 0.72} y={svgH / 2 + starR + 16} textAnchor="middle"
          fontSize={10} fill={compareCol} fontFamily="monospace">
          {compareLabel}
        </text>
      </svg>
    </div>
  );
}

function TemperatureBar({ temp }: { temp: number }) {
  // Map 2500K–50000K to percentage
  const pct = Math.max(2, Math.min(98, (Math.log(temp) - Math.log(2500)) / (Math.log(50000) - Math.log(2500)) * 100));
  const color = temp > 20000 ? '#9bb0ff' : temp > 10000 ? '#aabfff' : temp > 7500 ? '#cad7ff' : temp > 6000 ? '#fff4ea' : temp > 5000 ? '#ffd2a1' : '#ff8844';

  return (
    <div>
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>2 500 K</span>
        <span className="font-bold" style={{ color }}>{temp.toLocaleString()} K</span>
        <span>50 000 K</span>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #ff4400, #ff8844, #ffd090, #ffffff, #cad7ff, #9bb0ff, #6677ee)' }}>
        <div className="h-full w-0.5 bg-white opacity-80 rounded-full shadow-lg" style={{ marginLeft: `${pct}%` }} />
      </div>
      <div className="text-sm text-gray-600 mt-1 text-center">Position sur le spectre électromagnétique visible</div>
    </div>
  );
}

export default async function StarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const star = stars.find(s => s.id === id);

  if (!star) {
    return (
      <SolarLayout>
        <div className="min-h-screen bg-[#01040e] text-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-5xl mb-4">✦</p>
            <p className="text-gray-400 text-lg">Étoile introuvable</p>
            <Link href="/solar-system/stars" className="text-blue-400 underline mt-3 block">Retour à la carte</Link>
          </div>
        </div>
      </SolarLayout>
    );
  }

  const col = SPECTRAL_COLORS[star.spectralClass] ?? '#ffffff';
  const constellation = getConstellationById(star.constellation);

  const idx = stars.findIndex(s => s.id === star.id);
  const prev = stars[idx - 1];
  const next = stars[idx + 1];

  return (
    <SolarLayout>

    <div className="min-h-screen text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg) translateX(var(--orb-r)) rotate(0deg); } to { transform: rotate(360deg) translateX(var(--orb-r)) rotate(-360deg); } }
      `}</style>

      {/* Nav */}
      <nav className="border-b border-white/6" style={{ background: 'rgba(1,4,14,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-5 py-3.5 flex items-center gap-2 text-md overflow-x-auto">
          <Link href="/solar-system" className="text-gray-600 hover:text-white transition-colors shrink-0">💫 Système Solaire</Link>
          <span className="text-gray-700">›</span>
          <Link href="/solar-system/stars" className="text-gray-500 hover:text-white transition-colors shrink-0">✨ Carte</Link>
          <span className="text-gray-700">›</span>
          {constellation && (
            <>
              <Link href={`/solar-system/stars/constellations/${constellation.id}`} className="hover:text-white transition-colors shrink-0" style={{ color: constellation.color }}>
                {constellation.emoji} {constellation.nameFr}
              </Link>
              <span className="text-gray-700">›</span>
            </>
          )}
          <span style={{ color: col }}>{star.nameFr ?? star.name}</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-5 py-10">

        {/* ── Hero ── */}
        <div className="relative rounded-3xl border overflow-hidden mb-8 p-8 sm:p-10"
          style={{
            borderColor: `${col}30`,
            background: `radial-gradient(ellipse at 20% 40%, ${col}12, rgba(1,4,14,0.98))`,
          }}>
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 pointer-events-none rounded-full"
            style={{ background: `radial-gradient(circle, ${col}14, transparent 70%)`, transform: 'translate(35%,-35%)' }} />

          {/* Star visual */}
          <div className="absolute top-8 right-8 sm:top-12 sm:right-16 opacity-60 pointer-events-none">
            <svg width="100" height="100">
              <defs>
                <radialGradient id="star-hero-g" cx="35%" cy="30%" r="70%">
                  <stop offset="0%" stopColor={col} stopOpacity="1" />
                  <stop offset="100%" stopColor={col} stopOpacity="0.3" />
                </radialGradient>
                <filter id="star-hero-glow">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <circle cx="50" cy="50" r="28" fill="url(#star-hero-g)" filter="url(#star-hero-glow)" />
            </svg>
          </div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="px-3 py-1 rounded-full text-md font-bold"
                style={{ background: `${col}20`, border: `1px solid ${col}50`, color: col }}>
                {STAR_TYPE_LABELS[star.starType] ?? star.starType}
              </span>
              {star.nakedEye && (
                <span className="px-2.5 py-1 rounded-full text-sm border border-white/15 text-gray-400">👁️ Visible à l'œil nu</span>
              )}
              {constellation && (
                <Link href={`/solar-system/stars/constellations/${constellation.id}`}
                  className="px-2.5 py-1 rounded-full text-sm border transition-all hover:brightness-110"
                  style={{ borderColor: `${constellation.color}40`, color: constellation.color, background: `${constellation.color}12` }}>
                  {constellation.emoji} {constellation.nameFr}
                </Link>
              )}
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-2 leading-none"
              style={{ fontFamily: "'Exo 2', sans-serif" }}>
              {star.nameFr ?? star.name}
            </h1>
            {star.bayerDesignation && (
              <div className="text-lg text-gray-500 font-mono mb-1" style={{ fontFamily: "'Exo 2', sans-serif", fontStyle: 'italic' }}>
                {star.bayerDesignation}
              </div>
            )}
            <div className="text-base font-mono mb-4" style={{ color: col }}>
              {star.spectralType}
            </div>
            <p className="text-base text-gray-300 leading-relaxed max-w-2xl">{star.description}</p>
          </div>
        </div>

        {/* ── Physical Data ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {[
            { icon: '📏', label: 'Distance', value: star.distanceLy < 10 ? `${star.distanceLy} al` : `${star.distanceLy.toLocaleString()} al`, sub: star.distancePc ? `${star.distancePc.toFixed(2)} pc` : undefined },
            { icon: '✨', label: 'Magnitude app.', value: star.magnitude.toFixed(2), sub: 'Plus faible = plus brillant' },
            { icon: '☀️', label: 'Luminosité', value: star.luminosity ? `${star.luminosity >= 1000000 ? (star.luminosity / 1000000).toFixed(2) + 'M' : star.luminosity >= 1000 ? (star.luminosity / 1000).toFixed(0) + 'k' : star.luminosity} L☉` : '—', sub: undefined },
            { icon: '⚖️', label: 'Masse', value: star.mass ? `${star.mass} M☉` : '—', sub: undefined },
            { icon: '📐', label: 'Rayon', value: star.radius ? `${star.radius.toLocaleString()} R☉` : '—', sub: star.radius ? `${(star.radius * 696340).toFixed(0)} km` : undefined },
            { icon: '🌡️', label: 'Température', value: star.temperature ? `${star.temperature.toLocaleString()} K` : '—', sub: undefined },
            { icon: '⏳', label: 'Âge', value: star.age ? `${star.age} Ga` : '—', sub: undefined },
            { icon: '🎯', label: 'Magnitude abs.', value: star.absoluteMagnitude !== undefined ? star.absoluteMagnitude.toFixed(2) : '—', sub: 'À 10 pc standard' },
          ].map(item => (
            <div key={item.label} className="rounded-2xl border border-white/8 p-4 bg-white/2">
              <div className="text-xl mb-1">{item.icon}</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide mb-1">{item.label}</div>
              <div className="text-base font-bold font-mono text-white">{item.value}</div>
              {item.sub && <div className="text-sm text-gray-600 mt-0.5">{item.sub}</div>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">

          {/* Temperature bar */}
          {star.temperature && (
            <div className="rounded-2xl border border-white/8 p-5 bg-white/2">
              <h3 className="text-md font-bold uppercase tracking-wider text-gray-500 mb-4">🌡️ Température de surface</h3>
              <TemperatureBar temp={star.temperature} />
            </div>
          )}

          {/* Size comparison */}
          <StarComparison star={star} />
        </div>

        {/* ── Exoplanets ── */}
        {star.exoplanets && star.exoplanets.length > 0 && (
          <div className="rounded-2xl border mb-6 p-6"
            style={{ borderColor: '#22d3ee30', background: 'rgba(8,40,50,0.4)' }}>
            <h2 className="text-lg font-bold text-white mb-5" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              🪐 Exoplanètes ({star.exoplanets.length})
            </h2>

            {/* Simple orbital diagram */}
            <div className="relative mb-5 overflow-hidden rounded-xl" style={{ height: 160, background: 'rgba(1,4,14,0.6)' }}>
              <svg width="100%" height="160" viewBox="0 0 600 160">
                {/* Star center */}
                <circle cx="80" cy="80" r="18" fill={col} style={{ filter: `drop-shadow(0 0 8px ${col}60)` }} />
                <text x="80" y="108" textAnchor="middle" fontSize="9" fill={col} fontFamily="monospace">{(star.nameFr ?? star.name).slice(0, 8)}</text>

                {star.exoplanets.slice(0, 6).map((planet, i) => {
                  const orbitR = 55 + i * 68;
                  const planetX = 80 + orbitR;
                  const planetSize = planet.type.includes('Jupiter') ? 7 : planet.type.includes('Neptune') ? 5 : planet.type.includes('Super') ? 5 : 4;
                  const pColor = planet.habitable ? '#22c55e' : '#94a3b8';

                  return (
                    <g key={planet.name}>
                      {/* Orbit ellipse */}
                      <ellipse cx="80" cy="80" rx={orbitR} ry={orbitR * 0.35}
                        fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8"
                        strokeDasharray={planet.habitable ? '4 3' : '2 4'} />
                      {planet.habitable && (
                        <ellipse cx="80" cy="80" rx={orbitR} ry={orbitR * 0.35}
                          fill="none" stroke="#22c55e" strokeWidth="0.5" strokeOpacity={0.3} />
                      )}
                      {/* Planet */}
                      <circle cx={planetX} cy="80" r={planetSize} fill={pColor}
                        style={{ filter: `drop-shadow(0 0 3px ${pColor}60)` }} />
                      {/* Label */}
                      <text x={planetX} y={80 + planetSize + 12} textAnchor="middle"
                        fontSize={7.5} fill="rgba(255,255,255,0.45)" fontFamily="monospace">
                        {planet.name.split(' ').pop()}
                      </text>
                    </g>
                  );
                })}
                {/* HZ label */}
                {star.exoplanets.some(p => p.habitable) && (
                  <text x="540" y="20" fontSize="8" fill="#22c55e" fillOpacity={0.6} fontFamily="monospace">Zone habitable</text>
                )}
              </svg>
            </div>

            <div className="space-y-3">
              {star.exoplanets.map(planet => (
                <div key={planet.name}
                  className={`rounded-xl p-4 border ${planet.habitable ? 'border-green-700/40 bg-green-950/30' : 'border-white/8 bg-white/3'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{planet.habitable ? '🌍' : '🪐'}</span>
                      <span className="text-base font-bold text-white">{planet.name}</span>
                      {planet.habitable && (
                        <span className="px-2 py-0.5 rounded-full text-sm bg-green-900/50 text-green-400 border border-green-700/40 font-semibold">Zone habitable</span>
                      )}
                    </div>
                    <span className="text-md text-gray-500">{planet.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-md">
                    {planet.orbitalPeriod && (
                      <div>
                        <span className="text-gray-600">Période : </span>
                        <span className="text-gray-300 font-mono">
                          {planet.orbitalPeriod >= 365 ? `${(planet.orbitalPeriod / 365.25).toFixed(1)} ans` : `${planet.orbitalPeriod} j`}
                        </span>
                      </div>
                    )}
                    {planet.distance && (
                      <div>
                        <span className="text-gray-600">Distance : </span>
                        <span className="text-gray-300 font-mono">{planet.distance} UA</span>
                      </div>
                    )}
                    {planet.mass && (
                      <div>
                        <span className="text-gray-600">Masse : </span>
                        <span className="text-gray-300 font-mono">{planet.mass}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Features & Mythology ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {star.features && star.features.length > 0 && (
            <div className="rounded-2xl border border-white/8 p-5 bg-white/2">
              <h3 className="text-base font-bold text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>✦ Caractéristiques</h3>
              <div className="space-y-2">
                {star.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-base text-gray-300">
                    <span style={{ color: col }} className="shrink-0 mt-0.5">◆</span> {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {star.mythology && (
            <div className="rounded-2xl border border-white/8 p-5 bg-white/2">
              <h3 className="text-base font-bold text-white mb-4" style={{ fontFamily: "'Exo 2', sans-serif" }}>📖 Mythologie</h3>
              <p className="text-base text-gray-300 leading-relaxed">{star.mythology}</p>
            </div>
          )}
        </div>

        {/* ── Prev/Next ── */}
        <div className="flex justify-between items-center pt-4 border-t border-white/8">
          {prev ? (
            <Link href={`/solar-system/stars/star/${prev.id}`}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-all group">
              <div className="w-6 h-6 rounded-full shrink-0" style={{ background: SPECTRAL_COLORS[prev.spectralClass] ?? '#fff' }} />
              <div>
                <div className="text-sm text-gray-600">← Précédente</div>
                <div className="text-md font-bold text-white group-hover:underline">{prev.nameFr ?? prev.name}</div>
              </div>
            </Link>
          ) : <div />}

          <Link href="/solar-system/stars" className="text-md text-gray-600 hover:text-white font-mono transition-colors">
            ✨ Carte du ciel
          </Link>

          {next ? (
            <Link href={`/solar-system/stars/star/${next.id}`}
              className="flex items-center gap-3 text-right px-5 py-3 rounded-xl border border-white/8 bg-white/3 hover:bg-white/6 transition-all group">
              <div>
                <div className="text-sm text-gray-600">Suivante →</div>
                <div className="text-md font-bold text-white group-hover:underline">{next.nameFr ?? next.name}</div>
              </div>
              <div className="w-6 h-6 rounded-full shrink-0" style={{ background: SPECTRAL_COLORS[next.spectralClass] ?? '#fff' }} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
    </SolarLayout>
    
  );
}