// pages//solar-system/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import { solarSystem, missions, planets, sun, dwarfPlanets, getActiveProbes, type Mission } from '@/data/solar-system';

// ─── Scale helpers ─────────────────────────────────────────────────────────
// Log scale: maps AU to pixel radius
const AU_TO_PX = (au: number, maxPx: number): number => {
  if (au <= 0) return 0;
  const minAU = 0.28;
  const maxAU = 45;
  const pct = Math.log(au / minAU) / Math.log(maxAU / minAU);
  return Math.max(0, pct * maxPx * 0.93 + 8);
};

// Habitable zone for a Sun-like star: ~0.95–1.67 AU (conservative)
const HZ_INNER = 0.95;  // AU
const HZ_OUTER = 1.67;  // AU

const PLANET_SIZES: Record<string, number> = {
  sun: 32, mercury: 5, venus: 8, earth: 9, mars: 6.5,
  jupiter: 22, saturn: 18, uranus: 13, neptune: 12, pluto: 4,
};

// Fixed display angles for readability (degrees from 3 o'clock, clockwise)
const PLANET_ANGLES: Record<string, number> = {
  mercury: 25, venus: 75, earth: 135, mars: 200,
  jupiter: 265, saturn: 205, uranus: 305, neptune: 345, pluto: 22,
};

// Probe placement angles to spread them out
const PROBE_ANGLES = [48, 102, 158, 218, 280, 332, 65, 125, 185, 245, 300, 15];

export default function SolarSystemMap() {
  const [selectedBody, setSelectedBody] = useState<string | null>(null);
  const [selectedProbe, setSelectedProbe] = useState<Mission | null>(null);
  const [showProbes, setShowProbes] = useState(true);
  const [showOrbits, setShowOrbits] = useState(true);
  const [showHZ, setShowHZ] = useState(false);
  const [hoveredBody, setHoveredBody] = useState<string | null>(null);
  const [hoveredProbe, setHoveredProbe] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgSize, setSvgSize] = useState(700);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const w = Math.min(containerRef.current.clientWidth, 820);
        setSvgSize(Math.max(460, w));
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const maxR = svgSize / 2 - 16;

  const allBodies = [
    { id: 'sun', nameFr: 'Soleil', color: sun.color, colorGradient: sun.colorGradient, au: 0, r: PLANET_SIZES.sun, rings: false },
    ...planets.map(p => ({ id: p.id, nameFr: p.nameFr, color: p.color, colorGradient: p.colorGradient, au: p.semiMajorAxis ?? 0, r: PLANET_SIZES[p.id] ?? 7, rings: p.rings ?? false })),
    ...dwarfPlanets.map(p => ({ id: p.id, nameFr: p.nameFr, color: p.color, colorGradient: p.colorGradient, au: p.semiMajorAxis ?? 0, r: PLANET_SIZES[p.id] ?? 4, rings: false })),
  ];

  const activeProbes = getActiveProbes().filter(p => p.distanceFromSun != null && AU_TO_PX(p.distanceFromSun!, maxR) <= maxR * 1.02);

  const selectedBodyData = solarSystem.find(b => b.id === selectedBody);

  const handleBodyClick = (id: string) => {
    setSelectedProbe(null);
    setSelectedBody(prev => prev === id ? null : id);
  };
  const handleProbeClick = (probe: Mission) => {
    setSelectedBody(null);
    setSelectedProbe(prev => prev?.id === probe.id ? null : probe);
  };

  return (
    <SolarLayout>
      <div className="max-w-screen-2xl mx-auto px-4 py-8">

        {/* ── Header ────────────────────────────────────────────── */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}>
            Système Solaire
          </h1>
          <p className="text-base text-gray-500">Carte interactive · Échelle logarithmique · Cliquer sur une planète ou une sonde</p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">

          {/* ── Map Column ───────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Controls */}
            <div className="flex flex-wrap gap-2.5 mb-4">
              {[
                { key: 'orbits', label: '⭕ Orbites', active: showOrbits, toggle: () => setShowOrbits(v => !v), activeClass: 'border-blue-600/60 bg-blue-900/30 text-blue-300' },
                { key: 'probes', label: '🛸 Sondes actives', active: showProbes, toggle: () => setShowProbes(v => !v), activeClass: 'border-violet-600/60 bg-violet-900/30 text-violet-300' },
                { key: 'hz', label: '🌿 Zone habitable', active: showHZ, toggle: () => setShowHZ(v => !v), activeClass: 'border-green-600/60 bg-green-900/30 text-green-300' },
              ].map(ctrl => (
                <button key={ctrl.key} onClick={ctrl.toggle}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${ctrl.active ? ctrl.activeClass : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'}`}>
                  {ctrl.label}
                </button>
              ))}
            </div>

            {/* SVG Map */}
            <div ref={containerRef}
              className="relative rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(20,40,100,0.2) 0%, rgba(2,8,23,0.97) 70%)' }}>

              <svg width={svgSize} height={svgSize} className="block">
                <defs>
                  {/* Sun glow */}
                  <radialGradient id="sg-sunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.55" />
                    <stop offset="35%" stopColor="#FCD34D" stopOpacity="0.2" />
                    <stop offset="70%" stopColor="#FB923C" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
                  </radialGradient>
                  {/* Habitable zone gradient (ring via two circles) */}
                  <radialGradient id="sg-hz" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="60%" stopColor="#ef4444" stopOpacity="0.10" />
                    <stop offset="78%" stopColor="#22c55e" stopOpacity="0.18" />
                    <stop offset="88%" stopColor="#22c55e" stopOpacity="0.22" />
                    <stop offset="96%" stopColor="#ef4444" stopOpacity="0.10" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                  {/* Planet gradients */}
                  {allBodies.map(b => b.colorGradient && (
                    <radialGradient key={b.id} id={`sg-grad-${b.id}`} cx="30%" cy="28%" r="70%">
                      <stop offset="0%" stopColor={b.colorGradient[0]} />
                      <stop offset="45%" stopColor={b.colorGradient[Math.floor(b.colorGradient.length / 2)]} />
                      <stop offset="100%" stopColor={b.colorGradient[b.colorGradient.length - 1]} />
                    </radialGradient>
                  ))}
                  {/* Sun filter glow */}
                  <filter id="sg-sunFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="sg-glowSm" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="sg-probeGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* ── Habitable Zone ── */}
                {showHZ && (() => {
                  const rInner = AU_TO_PX(HZ_INNER, maxR);
                  const rOuter = AU_TO_PX(HZ_OUTER, maxR);
                  const rMid = (rInner + rOuter) / 2;
                  return (
                    <g>
                      {/* Outer red glow */}
                      <circle cx={cx} cy={cy} r={rOuter + 4} fill="none" stroke="#ef4444" strokeWidth={8} strokeOpacity={0.07} />
                      {/* Green zone */}
                      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="#22c55e" strokeWidth={rOuter - rInner} strokeOpacity={0.13} />
                      {/* Inner red glow */}
                      <circle cx={cx} cy={cy} r={rInner - 4} fill="none" stroke="#ef4444" strokeWidth={8} strokeOpacity={0.07} />
                      {/* Border lines */}
                      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#ef4444" strokeWidth={1} strokeOpacity={0.35} strokeDasharray="4 5" />
                      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="#86efac" strokeWidth={1} strokeOpacity={0.35} strokeDasharray="4 5" />
                      {/* Label */}
                      <text x={cx + rMid + 4} y={cy - 5} fontSize={11} fill="#4ade80" fillOpacity={0.75} fontFamily="monospace" fontWeight="600">Zone habitable</text>
                      <text x={cx + rMid + 4} y={cy + 9} fontSize={9.5} fill="#4ade80" fillOpacity={0.5} fontFamily="monospace">{HZ_INNER}–{HZ_OUTER} UA</text>
                    </g>
                  );
                })()}

                {/* ── Sun ambient glow ── */}
                <circle cx={cx} cy={cy} r={90} fill="url(#sg-sunGlow)" />

                {/* ── Orbits ── */}
                {showOrbits && allBodies.filter(b => b.au > 0).map(b => {
                  const r = AU_TO_PX(b.au, maxR);
                  const isHov = hoveredBody === b.id;
                  const isSel = selectedBody === b.id;
                  return (
                    <circle key={`orb-${b.id}`} cx={cx} cy={cy} r={r} fill="none"
                      stroke={isSel || isHov ? b.color : 'rgba(255,255,255,0.09)'}
                      strokeWidth={isSel ? 1.5 : isHov ? 1 : 0.7}
                      strokeDasharray={isSel || isHov ? 'none' : '3 7'}
                      strokeOpacity={isSel ? 0.9 : isHov ? 0.6 : 1}
                    />
                  );
                })}

                {/* ── AU distance ruler (small ticks) ── */}
                {[1, 2, 5, 10, 20, 30].map(au => {
                  const r = AU_TO_PX(au, maxR);
                  if (r > maxR) return null;
                  return (
                    <g key={`ruler-${au}`}>
                      <line x1={cx + r - 2} y1={cy} x2={cx + r + 2} y2={cy} stroke="rgba(255,255,255,0.15)" strokeWidth={0.8} />
                      <text x={cx + r + 4} y={cy - 3} fontSize={9} fill="rgba(255,255,255,0.18)" fontFamily="monospace">{au} UA</text>
                    </g>
                  );
                })}

                {/* ── Saturn rings (special) ── */}
                {(() => {
                  const sat = allBodies.find(b => b.id === 'saturn');
                  if (!sat) return null;
                  const angDeg = PLANET_ANGLES['saturn'] ?? 210;
                  const ang = angDeg * Math.PI / 180;
                  const r = AU_TO_PX(sat.au, maxR);
                  const sx = cx + r * Math.cos(ang);
                  const sy = cy + r * Math.sin(ang);
                  return (
                    <ellipse cx={sx} cy={sy} rx={sat.r * 2.5} ry={sat.r * 0.6}
                      fill="none" stroke="#FDE68A" strokeOpacity={0.45} strokeWidth={3} />
                  );
                })()}

                {/* ── Uranus rings ── */}
                {(() => {
                  const ur = allBodies.find(b => b.id === 'uranus');
                  if (!ur) return null;
                  const angDeg = PLANET_ANGLES['uranus'] ?? 305;
                  const ang = angDeg * Math.PI / 180;
                  const r = AU_TO_PX(ur.au, maxR);
                  const ux = cx + r * Math.cos(ang);
                  const uy = cy + r * Math.sin(ang);
                  return (
                    <ellipse cx={ux} cy={uy} rx={ur.r * 0.5} ry={ur.r * 2.1}
                      fill="none" stroke="#7DD3FC" strokeOpacity={0.3} strokeWidth={2} />
                  );
                })()}

                {/* ── Active probes ── */}
                {showProbes && activeProbes.map((probe, i) => {
                  const r = AU_TO_PX(probe.distanceFromSun!, maxR);
                  const angDeg = PROBE_ANGLES[i % PROBE_ANGLES.length];
                  const ang = angDeg * Math.PI / 180;
                  const px = cx + r * Math.cos(ang);
                  const py = cy + r * Math.sin(ang);
                  const isHov = hoveredProbe === probe.id;
                  const isSel = selectedProbe?.id === probe.id;

                  return (
                    <g key={probe.id}
                      onClick={() => handleProbeClick(probe)}
                      onMouseEnter={() => setHoveredProbe(probe.id)}
                      onMouseLeave={() => setHoveredProbe(null)}
                      style={{ cursor: 'pointer' }}>
                      {/* Pulsing outer ring */}
                      <circle cx={px} cy={py} r={isHov || isSel ? 11 : 8} fill={probe.color} fillOpacity={0.12} stroke={probe.color} strokeWidth={isSel ? 1.5 : 1} strokeOpacity={0.6}>
                        <animate attributeName="r" values={isSel ? "10;14;10" : "7;10;7"} dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="fillOpacity" values="0.1;0.04;0.1" dur="2.2s" repeatCount="indefinite" />
                      </circle>
                      {/* Core dot */}
                      <circle cx={px} cy={py} r={isHov || isSel ? 4.5 : 3.5} fill={probe.color}
                        filter={isHov || isSel ? 'url(#sg-probeGlow)' : undefined} />
                      {/* Probe name label */}
                      {(isHov || isSel) && (
                        <g>
                          <rect x={px + 8} y={py - 10} width={probe.name.length * 6.2 + 10} height={18} rx={4}
                            fill="rgba(2,8,23,0.88)" stroke={probe.color} strokeWidth={0.8} strokeOpacity={0.6} />
                          <text x={px + 13} y={py + 3} fontSize={11} fill={probe.color} fontFamily="monospace" fontWeight="600">
                            {probe.name}
                          </text>
                        </g>
                      )}
                      {/* Tiny label always visible */}
                      {!isHov && !isSel && (
                        <text x={px} y={py - 9} textAnchor="middle" fontSize={8.5} fill={probe.color} fontFamily="monospace" fillOpacity={0.75}>
                          {probe.name.split(' ')[0]}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* ── Planets & Sun ── */}
                {allBodies.map(b => {
                  const angDeg = b.id === 'sun' ? 0 : (PLANET_ANGLES[b.id] ?? 90);
                  const ang = angDeg * Math.PI / 180;
                  const dist = AU_TO_PX(b.au, maxR);
                  const bx = b.id === 'sun' ? cx : cx + dist * Math.cos(ang);
                  const by = b.id === 'sun' ? cy : cy + dist * Math.sin(ang);
                  const isSel = selectedBody === b.id;
                  const isHov = hoveredBody === b.id;

                  return (
                    <g key={b.id}
                      onClick={() => handleBodyClick(b.id)}
                      onMouseEnter={() => setHoveredBody(b.id)}
                      onMouseLeave={() => setHoveredBody(null)}
                      style={{ cursor: 'pointer' }}>
                      {/* Selection / hover halo */}
                      {(isSel || isHov) && (
                        <circle cx={bx} cy={by} r={b.r + (isSel ? 7 : 5)}
                          fill="none" stroke={b.color}
                          strokeWidth={isSel ? 2 : 1.2}
                          strokeOpacity={isSel ? 0.85 : 0.5}
                          strokeDasharray={isSel ? 'none' : '4 4'} />
                      )}
                      {/* Planet body */}
                      <circle cx={bx} cy={by} r={b.r}
                        fill={b.colorGradient ? `url(#sg-grad-${b.id})` : b.color}
                        filter={b.id === 'sun' ? 'url(#sg-sunFilter)' : undefined}
                      />
                      {/* Planet name — bigger font */}
                      <text x={bx} y={by + b.r + 14} textAnchor="middle"
                        fontSize={b.r > 10 ? 12 : 10.5}
                        fontFamily="'Exo 2', sans-serif"
                        fontWeight={isSel ? '700' : '500'}
                        fill={isSel || isHov ? b.color : 'rgba(255,255,255,0.5)'}>
                        {b.nameFr}
                      </text>
                      {/* AU distance under name */}
                      {b.au > 0 && (isHov || isSel) && (
                        <text x={bx} y={by + b.r + 27} textAnchor="middle"
                          fontSize={9} fontFamily="monospace" fill="rgba(255,255,255,0.35)">
                          {b.au} UA
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* ── Bottom legend ── */}
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
                <div className="text-xs text-gray-600 font-mono">Échelle logarithmique · distances non linéaires</div>
                {showProbes && activeProbes.length > 0 && (
                  <div className="bg-black/70 rounded-xl p-3 border border-white/10 pointer-events-auto max-w-48">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sondes actives</div>
                    {activeProbes.slice(0, 7).map(p => (
                      <button key={p.id} onClick={() => handleProbeClick(p)}
                        className="flex items-center gap-2 w-full mb-1 hover:opacity-80 transition-opacity text-left">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                        <span className="text-xs truncate" style={{ color: p.color }}>{p.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* HZ legend badge */}
              {showHZ && (
                <div className="absolute top-3 left-3 bg-black/70 rounded-xl px-3 py-2 border border-green-800/40 text-xs">
                  <div className="flex items-center gap-2 text-green-400 font-semibold mb-0.5">
                    <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(to right, #ef4444, #22c55e, #22c55e, #ef4444)' }} />
                    Zone habitable
                  </div>
                  <div className="text-gray-500 text-xs">Eau liquide possible · {HZ_INNER}–{HZ_OUTER} UA</div>
                </div>
              )}
            </div>

            {/* ── Quick planet picker ── */}
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-10 gap-2">
              {allBodies.filter(b => b.au > 0).map(b => (
                <button key={b.id} onClick={() => handleBodyClick(b.id)}
                  className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all ${selectedBody === b.id ? 'border-white/30 scale-105' : 'border-white/6 hover:border-white/18'}`}
                  style={{ background: selectedBody === b.id ? `${b.color}1A` : 'rgba(255,255,255,0.02)' }}>
                  <div className="w-5 h-5 rounded-full" style={{ background: b.color, boxShadow: selectedBody === b.id ? `0 0 6px ${b.color}80` : 'none' }} />
                  <span className="text-xs font-medium" style={{ color: selectedBody === b.id ? b.color : '#6B7280' }}>
                    {b.nameFr.slice(0, 5)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Right Panel ─────────────────────────────────────────── */}
          <div className="xl:w-88" style={{ width: undefined }}>
            <div className="xl:sticky xl:top-20 space-y-4" style={{ maxWidth: 360 }}>

              {/* PLANET panel */}
              {selectedBodyData && !selectedProbe && (
                <div className="rounded-2xl border p-5"
                  style={{ background: `${selectedBodyData.color}0C`, borderColor: `${selectedBodyData.color}40` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl"
                        style={{ borderColor: selectedBodyData.color + '55', background: selectedBodyData.color + '18' }}>
                        {selectedBodyData.emoji}
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest mb-0.5 font-semibold" style={{ color: selectedBodyData.color }}>
                          {selectedBodyData.type === 'star' ? 'Étoile' : selectedBodyData.type === 'planet' ? 'Planète' : selectedBodyData.type === 'dwarf-planet' ? 'Planète naine' : 'Satellite'}
                        </div>
                        <h2 className="text-2xl font-bold text-white">{selectedBodyData.nameFr}</h2>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">
                          {selectedBodyData.semiMajorAxis ? `${selectedBodyData.semiMajorAxis} UA du Soleil` : 'Notre étoile'}
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedBody(null)} className="text-gray-600 hover:text-white text-xl leading-none">✕</button>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-4">{selectedBodyData.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { label: 'Rayon', value: selectedBodyData.radius >= 10000 ? `${(selectedBodyData.radius / 1000).toFixed(0)}k km` : `${selectedBodyData.radius.toLocaleString()} km` },
                      { label: 'Masse', value: `${selectedBodyData.mass} ×10²⁴ kg` },
                      { label: 'Gravité', value: selectedBodyData.gravity ? `${selectedBodyData.gravity} m/s²` : '—' },
                      { label: 'Rotation', value: selectedBodyData.rotationPeriod ? `${Math.abs(selectedBodyData.rotationPeriod).toFixed(1)}h${selectedBodyData.rotationPeriod < 0 ? ' ↺' : ''}` : '—' },
                      { label: 'Temp. moy.', value: selectedBodyData.tempMean ? `${selectedBodyData.tempMean} K` : '—' },
                      { label: 'Lunes', value: selectedBodyData.moons !== undefined ? String(selectedBodyData.moons) : '—' },
                    ].map(s => (
                      <div key={s.label} className="bg-white/6 rounded-xl p-2.5">
                        <div className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">{s.label}</div>
                        <div className="text-sm font-mono font-semibold text-white">{s.value}</div>
                      </div>
                    ))}
                  </div>
                  {selectedBodyData.features &&
                  selectedBodyData.features?.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Points clés</div>
                      <div className="space-y-1">
                        {selectedBodyData.features.slice(0, 4).map((f, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-sm text-gray-300">
                            <span className="mt-0.5 shrink-0" style={{ color: selectedBodyData.color }}>◆</span> {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                
                  <Link href={`/solar-system/bodys/${selectedBodyData.id}`}
                    className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110"
                    style={{ background: selectedBodyData.color + '28', border: `1px solid ${selectedBodyData.color}50`, color: selectedBodyData.color }}>
                    Page complète →
                  </Link>
                </div>
              )}

              {/* PROBE panel */}
              {selectedProbe && (
                <div className="rounded-2xl border p-5"
                  style={{ background: `${selectedProbe.color}0C`, borderColor: `${selectedProbe.color}40` }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl"
                        style={{ borderColor: selectedProbe.color + '55', background: selectedProbe.color + '18' }}>
                        {selectedProbe.emoji}
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest mb-0.5 font-semibold text-green-400">
                          {selectedProbe.status === 'active' ? '● MISSION ACTIVE' : '✓ TERMINÉE'}
                        </div>
                        <h2 className="text-xl font-bold text-white leading-tight">{selectedProbe.name}</h2>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">{selectedProbe.country} {selectedProbe.agency}</div>
                      </div>
                    </div>
                    <button onClick={() => setSelectedProbe(null)} className="text-gray-600 hover:text-white text-xl">✕</button>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-4">{selectedProbe.description}</p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {[
                      { label: 'Lancement', value: selectedProbe.launched.slice(0, 10) },
                      { label: 'Distance ☀️', value: selectedProbe.distanceFromSun ? `${selectedProbe.distanceFromSun} UA` : '—' },
                      { label: 'Type', value: selectedProbe.type },
                      { label: 'Agence', value: selectedProbe.agency },
                    ].map(s => (
                      <div key={s.label} className="bg-white/6 rounded-xl p-2.5">
                        <div className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">{s.label}</div>
                        <div className="text-sm font-mono font-semibold text-white capitalize">{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {selectedProbe.currentLocation && (
                    <div className="mb-4 bg-white/4 rounded-xl p-3 text-sm">
                      <span className="text-gray-500">📍 </span>
                      <span className="text-gray-300">{selectedProbe.currentLocation}</span>
                    </div>
                  )}

                  {selectedProbe.keyDiscoveries && selectedProbe.keyDiscoveries.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Découvertes clés</div>
                      <div className="space-y-1">
                        {selectedProbe.keyDiscoveries.slice(0, 3).map((d, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-sm text-gray-300">
                            <span className="mt-0.5 shrink-0" style={{ color: selectedProbe.color }}>◆</span> {d}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link href={`/solar-system//mission/${selectedProbe.id}`}
                    className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110"
                    style={{ background: selectedProbe.color + '28', border: `1px solid ${selectedProbe.color}50`, color: selectedProbe.color }}>
                    Page mission complète →
                  </Link>
                </div>
              )}

              {/* Default panel when nothing selected */}
              {!selectedBodyData && !selectedProbe && (
                <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h2 className="text-base font-bold text-gray-300 mb-4 uppercase tracking-wider">Explorer</h2>
                  <div className="space-y-1.5">
                    {[sun, ...planets, ...dwarfPlanets].map(body => (
                      <button key={body.id} onClick={() => setSelectedBody(body.id)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-all group">
                        <div className="w-5 h-5 rounded-full shrink-0" style={{ background: body.color }} />
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors flex-1 text-left font-medium">
                          {body.nameFr}
                        </span>
                        <span className="text-xs text-gray-700 font-mono">{body.semiMajorAxis ? `${body.semiMajorAxis} UA` : '—'}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/8">
                    <Link href="/solar-system/missions"
                      className="block text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wider border border-violet-700/40 text-violet-400 hover:bg-violet-900/20 transition-all">
                      🚀 Toutes les missions
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SolarLayout>
  );
}
