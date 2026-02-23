// app/solar-system/stars/index.tsx
'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';

import {
  stars, constellations, SPECTRAL_COLORS,
  getStarsByConstellation, raDecToXY,
  type Star, type Constellation,
} from '@/data/stars';

// ─── Constants ────────────────────────────────────────────────────────────────
const MAG_TO_RADIUS = (mag: number): number => {
  // Brighter (lower mag) = bigger dot
  const clamped = Math.max(-2, Math.min(14, mag));
  return Math.max(1.5, 9.5 - clamped * 0.55);
};

// ─── StarMap Layout (inline, no external layout needed) ────────────────────
export default function StarMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(700);
  const [selectedStar, setSelectedStar] = useState<Star | null>(null);
  const [selectedConstellation, setSelectedConstellation] = useState<Constellation | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const [showLines, setShowLines] = useState(true);
  const [filterType, setFilterType] = useState<'all' | 'naked-eye' | 'exoplanets' | 'nearest'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = Math.min(containerRef.current.clientWidth, 860);
        setSize(Math.max(480, w));
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const cx = size / 2;
  const cy = size / 2;
  const mapR = size * 0.46;

  // Compute pixel coords from RA/Dec
  const getPos = useCallback((ra: number, dec: number) => {
    const { x, y } = raDecToXY(ra, dec);
    return {
      px: cx + x * mapR,
      py: cy + y * mapR * 0.9,
    };
  }, [cx, cy, mapR]);

  // Filter stars
  const visibleStars = stars.filter(s => {
    if (filterType === 'naked-eye' && !s.nakedEye) return false;
    if (filterType === 'exoplanets' && (!s.exoplanets || s.exoplanets.length === 0)) return false;
    if (filterType === 'nearest' && s.distanceLy > 50) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const nameMatch = s.name.toLowerCase().includes(q) || (s.nameFr?.toLowerCase().includes(q) ?? false);
      if (!nameMatch) return false;
    }
    return true;
  });

  const visibleStarIds = new Set(visibleStars.map(s => s.id));

  const handleStarClick = (star: Star) => {
    setSelectedStar(prev => prev?.id === star.id ? null : star);
    setSelectedConstellation(null);
  };
  const handleConstellationClick = (c: Constellation) => {
    setSelectedConstellation(prev => prev?.id === c.id ? null : c);
    setSelectedStar(null);
  };

  return (
    <SolarLayout>
    
    <div className="min-h-screen" >
      {/* Google Fonts */}
      <style>{`
        @keyframes twinkle { 0%,100%{opacity:1} 50%{opacity:.5} }
        @keyframes pulse-ring { 0%{r:12;opacity:.6} 100%{r:20;opacity:0} }
        .star-twinkle { animation: twinkle 2s infinite; }
      `}</style>

      {/* Nav */}
      <nav className="border-b border-white/6" style={{ background: 'rgba(1,4,14,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-screen-2xl mx-auto px-5 py-3.5 flex items-center gap-3 overflow-x-auto">
          <Link href="/solar-system" className="flex items-center gap-2 group shrink-0">
            <span className="text-2xl">👩‍🚀</span>
            <span className="text-sm font-semibold text-gray-500 group-hover:text-white transition-colors hidden sm:block">Système solaire</span>
          </Link>
          <span className="text-gray-700">›</span>
          <Link href="/solar-system/stars" className="flex items-center gap-2 shrink-0 group">
            <span className="text-xl">✨</span>
            <span className="text-sm font-semibold text-blue-300 hidden sm:block">Carte du Ciel</span>
          </Link>
          <div className="ml-auto flex gap-2">
            <Link href="/solar-system/stars/constellations" className="px-3 py-1.5 rounded-lg text-md border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              🌟 Constellations
            </Link>
            <Link href="/solar-system/stars/star" className="px-3 py-1.5 rounded-lg text-md border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              📋 Catalogue
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-screen-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}>
            Carte du Ciel
          </h1>
          <p className="text-base text-gray-500">Étoiles et constellations visibles · Cliquer pour explorer · Hémisphère nord</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">

          {/* ─── MAP COLUMN ──────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Controls */}
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              {/* Filter buttons */}
              {([
                { key: 'all', label: '✦ Toutes' },
                { key: 'naked-eye', label: '👁️ Œil nu' },
                { key: 'exoplanets', label: '🪐 Exoplanètes' },
                { key: 'nearest', label: '📍 <50 al' },
              ] as const).map(f => (
                <button key={f.key} onClick={() => setFilterType(f.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium border transition-all ${filterType === f.key ? 'bg-blue-900/50 text-blue-200 border-blue-600/50' : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'}`}>
                  {f.label}
                </button>
              ))}
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              {/* Toggles */}
              {[
                { label: '— Lignes', state: showLines, toggle: () => setShowLines(v => !v), color: 'text-indigo-400 border-indigo-800/50 bg-indigo-900/30' },
                { label: 'Aa Labels', state: showLabels, toggle: () => setShowLabels(v => !v), color: 'text-cyan-400 border-cyan-800/50 bg-cyan-900/30' },
                { label: '⊕ Grille', state: showGrid, toggle: () => setShowGrid(v => !v), color: 'text-green-400 border-green-800/50 bg-green-900/30' },
              ].map(ctrl => (
                <button key={ctrl.label} onClick={ctrl.toggle}
                  className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${ctrl.state ? ctrl.color : 'border-white/8 text-gray-600 hover:text-gray-300'}`}>
                  {ctrl.label}
                </button>
              ))}
              {/* Search */}
              <div className="ml-auto relative">
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Chercher une étoile…"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-600 w-48" />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 text-xs">✕</button>}
              </div>
            </div>

            {/* SVG Star Map */}
            <div ref={containerRef}
              className="relative rounded-2xl overflow-hidden border border-white/6"
              style={{ background: 'radial-gradient(circle at 50% 50%, #080d1e 0%, #010408 70%)' }}>
              <svg ref={svgRef} width={size} height={size} className="block">
                <defs>
                  {/* Deep space radial bg */}
                  <radialGradient id="sm-bg" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0d1535" />
                    <stop offset="60%" stopColor="#06091a" />
                    <stop offset="100%" stopColor="#010408" />
                  </radialGradient>
                  {/* Milky Way glow */}
                  <linearGradient id="sm-mw" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(100,120,200,0)" />
                    <stop offset="30%" stopColor="rgba(120,140,220,0.04)" />
                    <stop offset="50%" stopColor="rgba(140,160,240,0.07)" />
                    <stop offset="70%" stopColor="rgba(120,140,220,0.04)" />
                    <stop offset="100%" stopColor="rgba(100,120,200,0)" />
                  </linearGradient>
                  {/* Clip circle */}
                  <clipPath id="sm-clip">
                    <circle cx={cx} cy={cy} r={mapR} />
                  </clipPath>
                  {/* Star glow filter */}
                  <filter id="sm-glow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="sm-glow-lg" x="-150%" y="-150%" width="400%" height="400%">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  {/* Hovered star pulse */}
                  <filter id="sm-selected" x="-150%" y="-150%" width="400%" height="400%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Background */}
                <circle cx={cx} cy={cy} r={mapR} fill="url(#sm-bg)" />

                {/* Milky Way band */}
                <ellipse cx={cx} cy={cy + mapR * 0.15} rx={mapR * 0.25} ry={mapR * 0.95}
                  fill="url(#sm-mw)" clipPath="url(#sm-clip)"
                  transform={`rotate(-30 ${cx} ${cy})`} />

                {/* Background micro-stars (atmosphere) */}
                {Array.from({ length: 200 }, (_, i) => {
                  const angle = (i * 137.508) % 360;
                  const r = Math.sqrt(i / 200) * mapR * 0.98;
                  const bx = cx + r * Math.cos(angle * Math.PI / 180);
                  const by = cy + r * Math.sin(angle * Math.PI / 180);
                  if (bx < cx - mapR || bx > cx + mapR || by < cy - mapR || by > cy + mapR) return null;
                  return (
                    <circle key={`bg-${i}`} cx={bx} cy={by} r={0.5 + (i % 3) * 0.3}
                      fill={`rgba(200,220,255,${0.1 + (i % 5) * 0.06})`} />
                  );
                })}

                {/* RA/Dec grid */}
                {showGrid && (
                  <g clipPath="url(#sm-clip)" opacity={0.2}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map(h => {
                      const pts = [-60, -30, 0, 30, 60, 85].map(d => {
                        const { px, py } = getPos(h, d);
                        return `${px},${py}`;
                      });
                      return (
                        <polyline key={`ra-${h}`} points={pts.join(' ')} fill="none"
                          stroke="rgba(100,150,255,0.4)" strokeWidth={0.5} strokeDasharray="3 5" />
                      );
                    })}
                    {[-60, -30, 0, 30, 60].map(d => {
                      const pts = Array.from({ length: 25 }, (_, i) => {
                        const { px, py } = getPos(i * 1.0, d);
                        return `${px},${py}`;
                      });
                      return (
                        <polyline key={`dec-${d}`} points={pts.join(' ')} fill="none"
                          stroke="rgba(100,150,255,0.35)" strokeWidth={0.5} strokeDasharray="3 5" />
                      );
                    })}
                  </g>
                )}

                {/* ─── Constellation lines ─── */}
                {showLines && constellations.map(c => {
                  const conStars = getStarsByConstellation(c.id);
                  const isActive = selectedConstellation?.id === c.id;
                  return c.lines.map(([id1, id2]) => {
                    const s1 = conStars.find(s => s.id === id1) || stars.find(s => s.id === id1);
                    const s2 = conStars.find(s => s.id === id2) || stars.find(s => s.id === id2);
                    if (!s1 || !s2) return null;
                    const p1 = getPos(s1.ra, s1.dec);
                    const p2 = getPos(s2.ra, s2.dec);
                    return (
                      <line key={`${id1}-${id2}`}
                        x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py}
                        stroke={isActive ? c.color : 'rgba(180,200,255,0.18)'}
                        strokeWidth={isActive ? 1.5 : 0.7}
                        strokeDasharray={isActive ? 'none' : 'none'}
                        clipPath="url(#sm-clip)"
                      />
                    );
                  });
                })}

                {/* ─── Constellation name labels ─── */}
                {showLabels && constellations.map(c => {
                  const pos = getPos(c.ra, c.dec);
                  if (pos.px < cx - mapR * 0.95 || pos.px > cx + mapR * 0.95) return null;
                  const isActive = selectedConstellation?.id === c.id;
                  return (
                    <g key={`cname-${c.id}`} onClick={() => handleConstellationClick(c)} style={{ cursor: 'pointer' }}>
                      <text x={pos.px} y={pos.py}
                        textAnchor="middle"
                        fontSize={isActive ? 12 : 10}
                        fontFamily="'Exo 2', sans-serif"
                        fontWeight={isActive ? '600' : '300'}
                        fill={isActive ? c.color : 'rgba(180,200,255,0.35)'}
                        style={{ letterSpacing: '0.12em', textTransform: 'uppercase' }}
                        clipPath="url(#sm-clip)">
                        {c.abbreviation}
                      </text>
                    </g>
                  );
                })}

                {/* ─── Stars ─── */}
                {visibleStars.map(star => {
                  const { px, py } = getPos(star.ra, star.dec);
                  if (px < cx - mapR || px > cx + mapR || py < cy - mapR || py > cy + mapR) return null;
                  const r = MAG_TO_RADIUS(star.magnitude);
                  const col = SPECTRAL_COLORS[star.spectralClass] ?? '#ffffff';
                  const isHov = hoveredId === star.id;
                  const isSel = selectedStar?.id === star.id;
                  const hasExo = !!star.exoplanets?.length;

                  return (
                    <g key={star.id}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoveredId(star.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: 'pointer' }}
                      clipPath="url(#sm-clip)">
                      {/* Selection ring pulse */}
                      {isSel && (
                        <circle cx={px} cy={py} r={r + 8} fill="none" stroke={col} strokeWidth={1} strokeOpacity={0.5}>
                          <animate attributeName="r" values={`${r + 6};${r + 14};${r + 6}`} dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {/* Exoplanet indicator */}
                      {hasExo && (
                        <circle cx={px} cy={py} r={r + 4}
                          fill="none" stroke="#22d3ee" strokeWidth={0.8} strokeOpacity={0.5}
                          strokeDasharray="2 3" />
                      )}
                      {/* Glow */}
                      {(isSel || isHov || star.magnitude < 1.5) && (
                        <circle cx={px} cy={py} r={r * 2.5}
                          fill={col} fillOpacity={0.12}
                          filter="url(#sm-glow)" />
                      )}
                      {/* Star body */}
                      <circle cx={px} cy={py} r={r}
                        fill={col}
                        fillOpacity={visibleStarIds.has(star.id) ? 1 : 0.3}
                        filter={star.magnitude < 0.5 ? 'url(#sm-glow-lg)' : undefined}
                      />
                      {/* Name label */}
                      {showLabels && (star.magnitude < 2.5 || isHov || isSel) && (
                        <text x={px + r + 4} y={py + 4}
                          fontSize={isSel ? 12 : isHov ? 11 : 9.5}
                          fontFamily="monospace"
                          fontWeight={isSel ? '600' : '400'}
                          fill={isSel ? col : isHov ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)'}>
                          {star.nameFr ?? star.name}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Map border + compass */}
                <circle cx={cx} cy={cy} r={mapR} fill="none" stroke="rgba(100,140,255,0.2)" strokeWidth={1.5} />
                {/* Cardinal directions */}
                {[['N', 0, -1], ['S', 0, 1], ['E', 1, 0], ['O', -1, 0]].map(([label, dx, dy]) => (
                  <text key={String(label)}
                    x={cx + Number(dx) * (mapR + 16)}
                    y={cy + Number(dy) * (mapR + 16) + 4}
                    textAnchor="middle"
                    fontSize={12}
                    fontFamily="monospace"
                    fill="rgba(100,140,255,0.4)"
                    fontWeight="500">
                    {label}
                  </text>
                ))}
                {/* Scale legend */}
                <text x={cx - mapR + 8} y={cy + mapR - 8} fontSize={9} fill="rgba(255,255,255,0.2)" fontFamily="monospace">
                  Projection équatoriale · Hémisphère nord
                </text>
              </svg>

              {/* ── Spectral Legend overlay ── */}
              <div className="absolute bottom-3 right-3 bg-black/70 rounded-xl p-3 border border-white/8">
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-2 font-semibold">Classe spectrale</div>
                <div className="flex flex-col gap-1">
                  {([['O', '> 30 000 K'], ['B', '10-30k K'], ['A', '7-10k K'], ['F', '6-7.5k K'], ['G', '5-6k K'], ['K', '3.5-5k K'], ['M', '< 3500 K']] as const).map(([cls, temp]) => (
                    <div key={cls} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: SPECTRAL_COLORS[cls as keyof typeof SPECTRAL_COLORS] }} />
                      <span className="text-xs font-mono" style={{ color: SPECTRAL_COLORS[cls as keyof typeof SPECTRAL_COLORS] }}>
                        {cls}
                      </span>
                      <span className="text-xs text-gray-600">{temp}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-white/8">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full border border-cyan-400 border-dashed shrink-0" />
                    <span className="text-xs text-cyan-500">Exoplanète(s)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stars count */}
            <div className="mt-3 text-sm text-gray-600 font-mono">
              {visibleStars.length} étoile{visibleStars.length > 1 ? 's' : ''} affichée{visibleStars.length > 1 ? 's' : ''}
              {filterType !== 'all' && ` (filtre actif)`}
            </div>
          </div>

          {/* ─── RIGHT PANEL ─────────────────────────────────────── */}
          <div className="xl:w-96">
            <div className="xl:sticky xl:top-20 space-y-4">

              {/* STAR PANEL */}
              {selectedStar && (
                <div className="rounded-2xl border overflow-hidden"
                  style={{
                    background: `${SPECTRAL_COLORS[selectedStar.spectralClass]}08`,
                    borderColor: `${SPECTRAL_COLORS[selectedStar.spectralClass]}40`,
                  }}>
                  {/* Header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                          style={{
                            background: `${SPECTRAL_COLORS[selectedStar.spectralClass]}18`,
                            border: `2px solid ${SPECTRAL_COLORS[selectedStar.spectralClass]}50`,
                            boxShadow: `0 0 20px ${SPECTRAL_COLORS[selectedStar.spectralClass]}25`,
                          }}>
                          <svg width="32" height="32" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="10" fill={SPECTRAL_COLORS[selectedStar.spectralClass]} />
                            <circle cx="16" cy="16" r="13" fill="none" stroke={SPECTRAL_COLORS[selectedStar.spectralClass]} strokeOpacity="0.3" strokeWidth="2" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-widest font-semibold mb-0.5"
                            style={{ color: SPECTRAL_COLORS[selectedStar.spectralClass] }}>
                            {selectedStar.spectralType} · {selectedStar.starType.replace('-', ' ')}
                          </div>
                          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                            {selectedStar.nameFr ?? selectedStar.name}
                          </h2>
                          {selectedStar.bayerDesignation && (
                            <div className="text-xs text-gray-500 font-mono">{selectedStar.bayerDesignation}</div>
                          )}
                        </div>
                      </div>
                      <button onClick={() => setSelectedStar(null)} className="text-gray-600 hover:text-white text-xl">✕</button>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">{selectedStar.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="px-5 pb-3 grid grid-cols-2 gap-2">
                    {[
                      { label: 'Distance', value: selectedStar.distanceLy < 20 ? `${selectedStar.distanceLy} al` : `${selectedStar.distanceLy.toLocaleString()} al` },
                      { label: 'Magnitude', value: selectedStar.magnitude.toFixed(2) },
                      { label: 'Température', value: selectedStar.temperature ? `${selectedStar.temperature.toLocaleString()} K` : '—' },
                      { label: 'Luminosité', value: selectedStar.luminosity ? `${selectedStar.luminosity >= 1000 ? (selectedStar.luminosity / 1000).toFixed(0) + 'k' : selectedStar.luminosity} L☉` : '—' },
                      { label: 'Rayon', value: selectedStar.radius ? `${selectedStar.radius} R☉` : '—' },
                      { label: 'Masse', value: selectedStar.mass ? `${selectedStar.mass} M☉` : '—' },
                    ].map(s => (
                      <div key={s.label} className="bg-white/5 rounded-xl p-2.5">
                        <div className="text-xs text-gray-600 uppercase tracking-wide">{s.label}</div>
                        <div className="text-sm font-mono font-semibold text-white">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Exoplanets */}
                  {selectedStar.exoplanets && selectedStar.exoplanets.length > 0 && (
                    <div className="px-5 pb-3">
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">🪐 Exoplanètes ({selectedStar.exoplanets.length})</div>
                      <div className="space-y-1.5">
                        {selectedStar.exoplanets.map(p => (
                          <div key={p.name} className={`flex items-center gap-2 p-2 rounded-lg text-xs ${p.habitable ? 'bg-green-950/40 border border-green-800/30' : 'bg-white/4'}`}>
                            {p.habitable && <span className="text-green-400">🌍</span>}
                            <span className="text-white font-medium flex-1">{p.name}</span>
                            <span className="text-gray-500">{p.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {selectedStar.features && selectedStar.features.length > 0 && (
                    <div className="px-5 pb-3">
                      <div className="text-xs text-gray-600 uppercase tracking-wider mb-2">Points clés</div>
                      {selectedStar.features.slice(0, 3).map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-sm text-gray-300 mb-1">
                          <span className="shrink-0 mt-0.5" style={{ color: SPECTRAL_COLORS[selectedStar.spectralClass] }}>◆</span> {f}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="px-5 pb-5">
                    <Link href={`/solar-system/stars/star/${selectedStar.id}`}
                      className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all hover:brightness-110"
                      style={{
                        background: `${SPECTRAL_COLORS[selectedStar.spectralClass]}25`,
                        border: `1px solid ${SPECTRAL_COLORS[selectedStar.spectralClass]}50`,
                        color: SPECTRAL_COLORS[selectedStar.spectralClass],
                      }}>
                      Page complète de l'étoile →
                    </Link>
                  </div>
                </div>
              )}

              {/* CONSTELLATION PANEL */}
              {selectedConstellation && !selectedStar && (
                <div className="rounded-2xl border p-5"
                  style={{
                    background: `${selectedConstellation.color}0A`,
                    borderColor: `${selectedConstellation.color}35`,
                  }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{selectedConstellation.emoji}</div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-gray-500 mb-0.5">Constellation</div>
                        <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                          {selectedConstellation.nameFr}
                        </h2>
                        <div className="text-xs text-gray-500 font-mono">{selectedConstellation.name} · {selectedConstellation.abbreviation}</div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedConstellation(null)} className="text-gray-600 hover:text-white text-xl">✕</button>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-3 line-clamp-4">{selectedConstellation.description}</p>

                  <div className="flex gap-2 flex-wrap text-xs mb-3">
                    <span className="px-2 py-1 rounded-lg bg-white/6 text-gray-400">
                      🌍 {selectedConstellation.hemisphere === 'north' ? 'Boréale' : selectedConstellation.hemisphere === 'south' ? 'Australe' : 'Les deux'}
                    </span>
                    <span className="px-2 py-1 rounded-lg bg-white/6 text-gray-400">
                      📅 {selectedConstellation.bestSeason === 'winter' ? 'Hiver' : selectedConstellation.bestSeason === 'spring' ? 'Printemps' : selectedConstellation.bestSeason === 'summer' ? 'Été' : selectedConstellation.bestSeason === 'autumn' ? 'Automne' : 'Toute l\'année'}
                    </span>
                    {selectedConstellation.area && <span className="px-2 py-1 rounded-lg bg-white/6 text-gray-400">{selectedConstellation.area} deg²</span>}
                  </div>

                  <Link href={`/solar-system/stars/constellations/${selectedConstellation.id}`}
                    className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition-all hover:brightness-110"
                    style={{
                      background: `${selectedConstellation.color}20`,
                      border: `1px solid ${selectedConstellation.color}40`,
                      color: selectedConstellation.color,
                    }}>
                    Page constellation →
                  </Link>
                </div>
              )}

              {/* DEFAULT PANEL */}
              {!selectedStar && !selectedConstellation && (
                <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h2 className="text-base font-bold text-gray-300 mb-4 uppercase tracking-wider" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    Constellations
                  </h2>
                  <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                    {constellations.map(c => (
                      <button key={c.id} onClick={() => handleConstellationClick(c)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-all group text-left">
                        <span className="text-xl shrink-0">{c.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors truncate">{c.nameFr}</div>
                          <div className="text-xs text-gray-600">{c.abbreviation} · {c.bestSeason}</div>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.color }} />
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 pt-4 border-t border-white/8">
                    <Link href="/solar-system/stars/star" className="text-center py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                      📋 Toutes les étoiles
                    </Link>
                    <Link href="/solar-system/stars/constellations" className="text-center py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                      🌌 Constellations
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
        </SolarLayout>
    
  );
}
