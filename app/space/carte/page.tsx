// app/space/carte/page.tsx
'use client';
import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import { solarSystem, missions, planets, sun, dwarfPlanets, getActiveProbes, type Mission } from '@/data/space';
import { IcoPin } from '@/components/SolarIcons';
import { BodyIcon, MissionIcon } from '@/components/SolarBodyIcons';
import { Body, HelioVector } from 'astronomy-engine';

// ─── Scale helpers ──────────────────────────────────────────────────────────
const AU_TO_PX = (au: number, maxPx: number): number => {
  if (au <= 0) return 0;
  const minAU = 0.28;
  const maxAU = 45;
  const pct = Math.log(au / minAU) / Math.log(maxAU / minAU);
  return Math.max(0, pct * maxPx * 0.93 + 8);
};

const HZ_INNER = 0.95;
const HZ_OUTER = 1.67;

const PLANET_SIZES: Record<string, number> = {
  sun: 32, mercury: 5, venus: 8, earth: 9, mars: 6.5,
  jupiter: 22, saturn: 18, uranus: 13, neptune: 12, pluto: 4,
};

// ─── Astronomy-engine body map ───────────────────────────────────────────────
const BODY_MAP: Record<string, Body> = {
  mercury: Body.Mercury, venus: Body.Venus,    earth: Body.Earth,
  mars:    Body.Mars,    jupiter: Body.Jupiter, saturn: Body.Saturn,
  uranus:  Body.Uranus,  neptune: Body.Neptune, pluto: Body.Pluto,
};

function computePositions(date: Date): Record<string, { angleDeg: number; dist: number }> {
  const result: Record<string, { angleDeg: number; dist: number }> = {};
  for (const [id, body] of Object.entries(BODY_MAP)) {
    try {
      const vec = HelioVector(body, date);
      result[id] = {
        angleDeg: Math.atan2(vec.y, vec.x) * 180 / Math.PI,
        dist: Math.sqrt(vec.x * vec.x + vec.y * vec.y),
      };
    } catch {
      // fallback: keep undefined so callers use semiMajorAxis
    }
  }
  return result;
}

const PROBE_ANGLES = [48, 102, 158, 218, 280, 332, 65, 125, 185, 245, 300, 15];

type StepUnit = 'day' | 'week' | 'month' | 'year';

function applyStep(prev: Date, dir: 1 | -1, unit: StepUnit): Date {
  const d = new Date(prev);
  if (unit === 'day')   d.setDate(d.getDate() + dir);
  if (unit === 'week')  d.setDate(d.getDate() + 7 * dir);
  if (unit === 'month') d.setMonth(d.getMonth() + dir);
  if (unit === 'year')  d.setFullYear(d.getFullYear() + dir);
  return d;
}

export default function SolarSystemMap() {
  const [selectedBody, setSelectedBody]   = useState<string | null>(null);
  const [selectedProbe, setSelectedProbe] = useState<Mission | null>(null);
  const [showProbes, setShowProbes]       = useState(true);
  const [showOrbits, setShowOrbits]       = useState(true);
  const [showHZ, setShowHZ]               = useState(false);
  const [hoveredBody, setHoveredBody]     = useState<string | null>(null);
  const [hoveredProbe, setHoveredProbe]   = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgSize, setSvgSize] = useState(700);
  const [zoom, setZoom]       = useState(1);
  const [pan, setPan]         = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef    = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);
  const hasDragged = useRef(false);

  // ── Time navigation ─────────────────────────────────────────────────────────
  const [currentDate, setCurrentDate] = useState<Date>(() => new Date());
  const [stepUnit, setStepUnit] = useState<StepUnit>('month');
  const [isPlaying, setIsPlaying] = useState(false);
  const stepUnitRef = useRef<StepUnit>(stepUnit);
  useEffect(() => { stepUnitRef.current = stepUnit; }, [stepUnit]);

  const stepDate = (dir: 1 | -1) => setCurrentDate(prev => applyStep(prev, dir, stepUnit));

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setCurrentDate(prev => applyStep(prev, 1, stepUnitRef.current));
    }, 280);
    return () => clearInterval(id);
  }, [isPlaying]);

  // ── Computed planet positions (real astronomy) ───────────────────────────────
  const positions = useMemo(() => computePositions(currentDate), [currentDate]);

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

  useEffect(() => {
    if (window.innerWidth < 768) setZoom(0.65);
  }, []);

  const zoomIn    = () => setZoom(z => Math.min(2.0, parseFloat((z + 0.15).toFixed(2))));
  const zoomOut   = () => setZoom(z => Math.max(0.35, parseFloat((z - 0.15).toFixed(2))));
  const zoomReset = () => { setZoom(window.innerWidth < 768 ? 0.65 : 1.0); setPan({ x: 0, y: 0 }); };

  const startDrag = (clientX: number, clientY: number) => {
    dragRef.current = { startX: clientX, startY: clientY, ox: pan.x, oy: pan.y };
    hasDragged.current = false;
    setIsDragging(true);
  };
  const moveDrag = (clientX: number, clientY: number) => {
    if (!dragRef.current) return;
    const dx = clientX - dragRef.current.startX;
    const dy = clientY - dragRef.current.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDragged.current = true;
    setPan({ x: dragRef.current.ox + dx, y: dragRef.current.oy + dy });
  };
  const endDrag = () => { dragRef.current = null; setIsDragging(false); };

  const onMouseDown = (e: React.MouseEvent) => { e.preventDefault(); startDrag(e.clientX, e.clientY); };
  const onMouseMove = (e: React.MouseEvent) => { if (dragRef.current) moveDrag(e.clientX, e.clientY); };
  const onTouchStart = (e: React.TouchEvent) => { startDrag(e.touches[0].clientX, e.touches[0].clientY); };
  const onTouchMove  = (e: React.TouchEvent) => { e.preventDefault(); moveDrag(e.touches[0].clientX, e.touches[0].clientY); };

  const guardClick = (cb: () => void) => () => { if (!hasDragged.current) cb(); };

  const cx = svgSize / 2;
  const cy = svgSize / 2;
  const maxR = svgSize / 2 - 16;

  const allBodies = [
    { id: 'sun', nameFr: 'Soleil', color: sun.color, colorGradient: sun.colorGradient, au: 0, r: PLANET_SIZES.sun, rings: false },
    ...planets.map(p => ({ id: p.id, nameFr: p.nameFr, color: p.color, colorGradient: p.colorGradient, au: p.semiMajorAxis ?? 0, r: PLANET_SIZES[p.id] ?? 7, rings: p.rings ?? false })),
    ...dwarfPlanets.map(p => ({ id: p.id, nameFr: p.nameFr, color: p.color, colorGradient: p.colorGradient, au: p.semiMajorAxis ?? 0, r: PLANET_SIZES[p.id] ?? 4, rings: false })),
  ];

  const activeProbes = getActiveProbes().filter(p =>
    p.distanceFromSun != null &&
    AU_TO_PX(p.distanceFromSun!, maxR) <= maxR * 1.02 &&
    p.id !== 'voyager1' && p.id !== 'voyager2'
  );

  const VOYAGERS = [
    { mission: missions.find(m => m.id === 'voyager1')!, au: 163.7, angleDeg: 322, color: '#A78BFA' },
    { mission: missions.find(m => m.id === 'voyager2')!, au: 136.1, angleDeg: 218, color: '#60A5FA' },
  ].filter(v => v.mission);

  const selectedBodyData = solarSystem.find(b => b.id === selectedBody);

  const handleBodyClick  = (id: string)    => { setSelectedProbe(null); setSelectedBody(prev => prev === id ? null : id); };
  const handleProbeClick = (p: Mission) => { setSelectedBody(null); setSelectedProbe(prev => prev?.id === p.id ? null : p); };

  const STEP_LABELS: Record<StepUnit, string> = { day: 'Jour', week: 'Semaine', month: 'Mois', year: 'Année' };

  return (
    <SolarLayout>
      <div className="max-w-screen-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/space" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <span className="text-gray-400">Système solaire</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}>
            Système Solaire
          </h1>
          <p className="text-base text-gray-500">
            Carte interactive · Positions astronomiques réelles · Cliquer sur une planète ou une sonde
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-5">

          {/* ── Map Column ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* ── Time navigator ──────────────────────────────────── */}
            <div className="flex flex-wrap items-center gap-2 mb-3 p-3 rounded-xl border border-white/8"
              style={{ background: 'rgba(8,12,28,0.6)', backdropFilter: 'blur(8px)' }}>

              {/* Step unit */}
              <div className="flex gap-1">
                {(Object.keys(STEP_LABELS) as StepUnit[]).map(u => (
                  <button key={u} onClick={() => setStepUnit(u)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all"
                    style={stepUnit === u
                      ? { background: '#60A5FA18', borderColor: '#60A5FA55', color: '#60A5FA' }
                      : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: '#4B5563' }}>
                    {STEP_LABELS[u]}
                  </button>
                ))}
              </div>

              <div className="w-px h-5 bg-white/10 mx-1" />

              {/* Back */}
              <button onClick={() => stepDate(-1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all text-xs"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                ◀
              </button>

              {/* Date display */}
              <span className="text-sm font-mono text-gray-300 min-w-32 text-center px-1">
                {currentDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
              </span>

              {/* Forward */}
              <button onClick={() => stepDate(1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-all text-xs"
                style={{ background: 'rgba(255,255,255,0.03)' }}>
                ▶
              </button>

              <div className="w-px h-5 bg-white/10 mx-1" />

              {/* Play/pause */}
              <button onClick={() => setIsPlaying(p => !p)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border transition-all"
                style={isPlaying
                  ? { background: '#34D39918', borderColor: '#34D39955', color: '#34D399' }
                  : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.10)', color: '#6B7280' }}>
                <span>{isPlaying ? '⏸' : '▶'}</span>
                {isPlaying ? 'Pause' : 'Animer'}
              </button>

              {/* Today */}
              <button onClick={() => { setCurrentDate(new Date()); setIsPlaying(false); }}
                className="px-3 py-1 rounded-lg text-xs font-semibold border transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.10)', color: '#6B7280' }}
                title="Revenir à aujourd'hui">
                Aujourd'hui
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { key: 'orbits', label: 'Orbites',        active: showOrbits, toggle: () => setShowOrbits(v => !v), color: '#60A5FA' },
                { key: 'probes', label: 'Sondes actives', active: showProbes, toggle: () => setShowProbes(v => !v), color: '#A78BFA' },
                { key: 'hz',     label: 'Zone habitable', active: showHZ,     toggle: () => setShowHZ(v => !v),     color: '#4ADE80' },
              ].map(c => (
                <button key={c.key} onClick={c.toggle}
                  className="px-3.5 py-1.5 rounded-xl text-sm font-semibold border transition-all flex items-center gap-1.5"
                  style={c.active
                    ? { background: `${c.color}18`, borderColor: `${c.color}55`, color: c.color }
                    : { background: 'transparent', borderColor: 'rgba(255,255,255,0.10)', color: '#4B5563' }
                  }>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.active ? c.color : '#4B5563' }} />
                  {c.label}
                </button>
              ))}
            </div>

            {/* SVG Map */}
            <div ref={containerRef}
              className="relative rounded-2xl border border-white/8 overflow-hidden"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(20,40,100,0.18) 0%, rgba(2,8,23,0.97) 70%)',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={endDrag}>

              {/* Zoom buttons */}
              <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
                <button onClick={zoomIn}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-white transition-all hover:scale-110 text-base font-bold"
                  style={{ background: 'rgba(2,8,23,0.85)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                  title="Zoom avant">
                  +
                </button>
                <button onClick={zoomReset}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:text-white transition-all text-xs font-mono"
                  style={{ background: 'rgba(2,8,23,0.85)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                  title="Réinitialiser">
                  {Math.round(zoom * 100)}%
                </button>
                <button onClick={zoomOut}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-300 hover:text-white transition-all hover:scale-110 text-base font-bold"
                  style={{ background: 'rgba(2,8,23,0.85)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}
                  title="Zoom arrière">
                  −
                </button>
              </div>

              <svg width={svgSize} height={svgSize} className="block"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: 'center',
                  transition: isDragging ? 'none' : 'transform 0.2s ease',
                }}>
                <defs>
                  <radialGradient id="sg-sunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.55" />
                    <stop offset="35%" stopColor="#FCD34D" stopOpacity="0.2" />
                    <stop offset="70%" stopColor="#FB923C" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
                  </radialGradient>
                  {allBodies.map(b => b.colorGradient && (
                    <radialGradient key={b.id} id={`sg-grad-${b.id}`} cx="30%" cy="28%" r="70%">
                      <stop offset="0%" stopColor={b.colorGradient[0]} />
                      <stop offset="45%" stopColor={b.colorGradient[Math.floor(b.colorGradient.length / 2)]} />
                      <stop offset="100%" stopColor={b.colorGradient[b.colorGradient.length - 1]} />
                    </radialGradient>
                  ))}
                  <filter id="sg-sunFilter" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="sg-probeGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Habitable Zone */}
                {showHZ && (() => {
                  const rInner = AU_TO_PX(HZ_INNER, maxR);
                  const rOuter = AU_TO_PX(HZ_OUTER, maxR);
                  const rMid = (rInner + rOuter) / 2;
                  return (
                    <g>
                      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="#22c55e" strokeWidth={rOuter - rInner} strokeOpacity={0.12} />
                      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke="#ef4444" strokeWidth={1} strokeOpacity={0.3} strokeDasharray="4 5" />
                      <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="#86efac" strokeWidth={1} strokeOpacity={0.3} strokeDasharray="4 5" />
                      <text x={cx + rMid + 4} y={cy - 5} fontSize={11} fill="#4ade80" fillOpacity={0.7} fontFamily="monospace" fontWeight="600">Zone habitable</text>
                      <text x={cx + rMid + 4} y={cy + 9} fontSize={9.5} fill="#4ade80" fillOpacity={0.45} fontFamily="monospace">{HZ_INNER}–{HZ_OUTER} UA</text>
                    </g>
                  );
                })()}

                {/* Sun ambient glow */}
                <circle cx={cx} cy={cy} r={90} fill="url(#sg-sunGlow)" />

                {/* Orbits — drawn at semi-major axis radius (reference orbit) */}
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

                {/* AU ruler */}
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

                {/* Saturn rings */}
                {(() => {
                  const sat = allBodies.find(b => b.id === 'saturn');
                  if (!sat) return null;
                  const pos = positions['saturn'];
                  const ang = (pos?.angleDeg ?? 210) * Math.PI / 180;
                  const dist = pos?.dist ?? sat.au;
                  const r = AU_TO_PX(dist, maxR);
                  const sx = cx + r * Math.cos(ang);
                  const sy = cy + r * Math.sin(ang);
                  return <ellipse cx={sx} cy={sy} rx={sat.r * 2.5} ry={sat.r * 0.6} fill="none" stroke="#FDE68A" strokeOpacity={0.45} strokeWidth={3} />;
                })()}

                {/* Uranus rings */}
                {(() => {
                  const ur = allBodies.find(b => b.id === 'uranus');
                  if (!ur) return null;
                  const pos = positions['uranus'];
                  const ang = (pos?.angleDeg ?? 305) * Math.PI / 180;
                  const dist = pos?.dist ?? ur.au;
                  const r = AU_TO_PX(dist, maxR);
                  const ux = cx + r * Math.cos(ang);
                  const uy = cy + r * Math.sin(ang);
                  return <ellipse cx={ux} cy={uy} rx={ur.r * 0.5} ry={ur.r * 2.1} fill="none" stroke="#7DD3FC" strokeOpacity={0.3} strokeWidth={2} />;
                })()}

                {/* Active probes */}
                {showProbes && activeProbes.map((probe, i) => {
                  const r = AU_TO_PX(probe.distanceFromSun!, maxR);
                  const ang = PROBE_ANGLES[i % PROBE_ANGLES.length] * Math.PI / 180;
                  const px = cx + r * Math.cos(ang);
                  const py = cy + r * Math.sin(ang);
                  const isHov = hoveredProbe === probe.id;
                  const isSel = selectedProbe?.id === probe.id;
                  return (
                    <g key={probe.id} onClick={guardClick(() => handleProbeClick(probe))}
                      onMouseEnter={() => setHoveredProbe(probe.id)}
                      onMouseLeave={() => setHoveredProbe(null)}
                      style={{ cursor: 'pointer' }}>
                      <circle cx={px} cy={py} r={isSel ? 11 : 8} fill={probe.color} fillOpacity={0.12}
                        stroke={probe.color} strokeWidth={isSel ? 1.5 : 1} strokeOpacity={0.6}>
                        <animate attributeName="r" values={isSel ? "10;14;10" : "7;10;7"} dur="2.2s" repeatCount="indefinite" />
                        <animate attributeName="fillOpacity" values="0.1;0.04;0.1" dur="2.2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={px} cy={py} r={isSel || isHov ? 4.5 : 3.5} fill={probe.color}
                        filter={isHov || isSel ? 'url(#sg-probeGlow)' : undefined} />
                      {(isHov || isSel) && (
                        <g>
                          <rect x={px + 8} y={py - 10} width={probe.name.length * 6.2 + 10} height={18} rx={4}
                            fill="rgba(2,8,23,0.9)" stroke={probe.color} strokeWidth={0.8} strokeOpacity={0.6} />
                          <text x={px + 13} y={py + 3} fontSize={11} fill={probe.color} fontFamily="monospace" fontWeight="600">
                            {probe.name}
                          </text>
                        </g>
                      )}
                      {!isHov && !isSel && (
                        <text x={px} y={py - 9} textAnchor="middle" fontSize={8.5} fill={probe.color} fontFamily="monospace" fillOpacity={0.7}>
                          {probe.name.split(' ')[0]}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Planets & Sun — positions from astronomy-engine */}
                {allBodies.map(b => {
                  const pos = b.id === 'sun' ? null : positions[b.id];
                  const angDeg = pos?.angleDeg ?? 0;
                  const ang = angDeg * Math.PI / 180;
                  const dist = pos?.dist ?? b.au;
                  const svgR = AU_TO_PX(dist, maxR);
                  const bx = b.id === 'sun' ? cx : cx + svgR * Math.cos(ang);
                  const by = b.id === 'sun' ? cy : cy + svgR * Math.sin(ang);
                  const isSel = selectedBody === b.id;
                  const isHov = hoveredBody === b.id;
                  return (
                    <g key={b.id} onClick={guardClick(() => handleBodyClick(b.id))}
                      onMouseEnter={() => setHoveredBody(b.id)}
                      onMouseLeave={() => setHoveredBody(null)}
                      style={{ cursor: 'pointer' }}>
                      {(isSel || isHov) && (
                        <circle cx={bx} cy={by} r={b.r + (isSel ? 7 : 5)} fill="none"
                          stroke={b.color} strokeWidth={isSel ? 2 : 1.2}
                          strokeOpacity={isSel ? 0.85 : 0.5}
                          strokeDasharray={isSel ? 'none' : '4 4'} />
                      )}
                      <circle cx={bx} cy={by} r={b.r}
                        fill={b.colorGradient ? `url(#sg-grad-${b.id})` : b.color}
                        filter={b.id === 'sun' ? 'url(#sg-sunFilter)' : undefined} />
                      <text x={bx} y={by + b.r + 14} textAnchor="middle"
                        fontSize={b.r > 10 ? 12 : 10.5}
                        fontFamily="'Exo 2', sans-serif"
                        fontWeight={isSel ? '700' : '500'}
                        fill={isSel || isHov ? b.color : 'rgba(255,255,255,0.5)'}>
                        {b.nameFr}
                      </text>
                      {b.au > 0 && (isHov || isSel) && (
                        <text x={bx} y={by + b.r + 27} textAnchor="middle"
                          fontSize={9} fontFamily="monospace" fill="rgba(255,255,255,0.35)">
                          {dist.toFixed(2)} UA
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* ── Voyager 1 & 2 — beyond scale, pinned at edge ── */}
                {VOYAGERS.map(v => {
                  const ang = v.angleDeg * Math.PI / 180;
                  const neptuneR = AU_TO_PX(30, maxR);
                  const edgeR    = maxR - 8;
                  const tx = cx + edgeR * Math.cos(ang);
                  const ty = cy + edgeR * Math.sin(ang);
                  const nx = cx + neptuneR * Math.cos(ang);
                  const ny = cy + neptuneR * Math.sin(ang);
                  const ax = cx + (edgeR - 14) * Math.cos(ang);
                  const ay = cy + (edgeR - 14) * Math.sin(ang);
                  const isSel = selectedProbe?.id === v.mission.id;
                  const isHov = hoveredProbe === v.mission.id;

                  return (
                    <g key={v.mission.id}
                      onClick={guardClick(() => handleProbeClick(v.mission))}
                      onMouseEnter={() => setHoveredProbe(v.mission.id)}
                      onMouseLeave={() => setHoveredProbe(null)}
                      style={{ cursor: 'pointer' }}>

                      <line
                        x1={nx} y1={ny} x2={ax} y2={ay}
                        stroke={v.color} strokeWidth={isSel || isHov ? 1.2 : 0.7}
                        strokeOpacity={isSel || isHov ? 0.7 : 0.35}
                        strokeDasharray="4 4"
                      />

                      <polygon
                        points={`
                          ${tx},${ty}
                          ${tx - 5 * Math.cos(ang - 0.4)},${ty - 5 * Math.sin(ang - 0.4)}
                          ${tx - 5 * Math.cos(ang + 0.4)},${ty - 5 * Math.sin(ang + 0.4)}
                        `}
                        fill={v.color}
                        fillOpacity={isSel || isHov ? 1 : 0.6}
                      />

                      <circle
                        cx={ax} cy={ay} r={isSel || isHov ? 5 : 3.5}
                        fill={v.color}
                        fillOpacity={isSel || isHov ? 1 : 0.75}
                      >
                        {(isSel || isHov) && (
                          <animate attributeName="r" values="4;6;4" dur="1.6s" repeatCount="indefinite" />
                        )}
                      </circle>

                      {(isSel || isHov) && (
                        <circle cx={ax} cy={ay} r={10}
                          fill="none" stroke={v.color} strokeWidth={1}
                          strokeOpacity={0.4} strokeDasharray="3 3" />
                      )}

                      {(() => {
                        const labelR = edgeR - 22;
                        const lx = cx + labelR * Math.cos(ang);
                        const ly = cy + labelR * Math.sin(ang);
                        const anchor = Math.cos(ang) > 0 ? 'start' : 'end';
                        return (
                          <g>
                            <text x={lx} y={ly - 6} textAnchor={anchor}
                              fontSize={isSel || isHov ? 11 : 9.5}
                              fontFamily="'Exo 2', sans-serif"
                              fontWeight={isSel || isHov ? '700' : '500'}
                              fill={isSel || isHov ? v.color : `${v.color}AA`}>
                              {v.mission.name}
                            </text>
                            <text x={lx} y={ly + 5} textAnchor={anchor}
                              fontSize={8} fontFamily="monospace"
                              fill={isSel || isHov ? `${v.color}CC` : `${v.color}60`}>
                              {v.au} UA
                            </text>
                          </g>
                        );
                      })()}
                    </g>
                  );
                })}
              </svg>

              {/* Bottom legend */}
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
                <div className="text-[10px] text-gray-700 font-mono">Échelle logarithmique · positions réelles JPL</div>
                {showProbes && activeProbes.length > 0 && (
                  <div className="pointer-events-auto rounded-xl border border-white/8 px-3 py-2.5"
                    style={{ background: 'rgba(2,8,23,0.88)', backdropFilter: 'blur(8px)' }}>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Sondes actives</div>
                    <div className="space-y-1">
                      {activeProbes.slice(0, 6).map(p => (
                        <button key={p.id} onClick={() => handleProbeClick(p)}
                          className="flex items-center gap-2 w-full hover:opacity-80 transition-opacity">
                          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color }} />
                          <span className="text-[11px] font-mono truncate max-w-32" style={{ color: p.color }}>{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Planet picker strip ─────────────────────────────── */}
            <div className="mt-4 overflow-x-auto pb-1">
              <div className="flex gap-2 min-w-max">
                {allBodies.filter(b => b.au > 0).map(b => {
                  const isSel = selectedBody === b.id;
                  const pos = positions[b.id];
                  const dist = pos?.dist ?? b.au;
                  return (
                    <button key={b.id} onClick={() => handleBodyClick(b.id)}
                      className="cursor-pointer flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all shrink-0"
                      style={{
                        background: isSel ? `${b.color}18` : 'rgba(255,255,255,0.02)',
                        borderColor: isSel ? `${b.color}55` : 'rgba(255,255,255,0.07)',
                        minWidth: 60,
                      }}>
                      <div className="rounded-full" style={{
                        width: Math.max(8, b.r * 0.8),
                        height: Math.max(8, b.r * 0.8),
                        background: b.colorGradient
                          ? `radial-gradient(circle at 35% 30%, ${b.colorGradient[0]}, ${b.colorGradient[b.colorGradient.length - 1]})`
                          : b.color,
                        boxShadow: isSel ? `0 0 8px ${b.color}70` : 'none',
                      }} />
                      <span className="text-sm font-semibold leading-tight text-center"
                        style={{ color: isSel ? b.color : '#6B7280' }}>
                        {b.nameFr}
                      </span>
                      {b.au > 0 && (
                        <span className="text-[9px] font-mono" style={{ color: isSel ? `${b.color}99` : '#374151' }}>
                          {dist.toFixed(2)} UA
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right Panel ─────────────────────────────────────────── */}
          <div className="xl:w-96 shrink-0">
            <div className="xl:sticky xl:top-20 space-y-4">

              {/* Planet detail panel */}
              {selectedBodyData && !selectedProbe && (
                <div className="rounded-2xl border overflow-hidden"
                  style={{ background: 'rgba(8,12,28,0.97)', borderColor: `${selectedBodyData.color}35`, boxShadow: `0 0 40px ${selectedBodyData.color}12` }}>

                  <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${selectedBodyData.color}80, ${selectedBodyData.color}20)` }} />

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                          style={{ background: `${selectedBodyData.color}18`, border: `1px solid ${selectedBodyData.color}40` }}>
                          <BodyIcon color={selectedBodyData.color} size={36} />
                        </div>
                        <div>
                          <div className="text-xs uppercase tracking-widest font-bold mb-0.5" style={{ color: selectedBodyData.color }}>
                            {selectedBodyData.type === 'star' ? 'Étoile' : selectedBodyData.type === 'planet' ? 'Planète' : selectedBodyData.type === 'dwarf-planet' ? 'Planète naine' : 'Satellite'}
                          </div>
                          <h2 className="text-2xl font-bold text-white leading-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                            {selectedBodyData.nameFr}
                          </h2>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">
                            {selectedBodyData.semiMajorAxis
                              ? `${(positions[selectedBodyData.id]?.dist ?? selectedBodyData.semiMajorAxis).toFixed(3)} UA · ${currentDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}`
                              : 'Notre étoile'}
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setSelectedBody(null)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-white hover:bg-white/10 transition-all shrink-0 text-sm">
                        ✕
                      </button>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">{selectedBodyData.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { label: 'Rayon',      value: selectedBodyData.radius >= 10000 ? `${(selectedBodyData.radius / 1000).toFixed(0)}k km` : `${selectedBodyData.radius.toLocaleString()} km` },
                        { label: 'Masse',      value: `${selectedBodyData.mass} ×10²⁴ kg` },
                        { label: 'Gravité',    value: selectedBodyData.gravity ? `${selectedBodyData.gravity} m/s²` : '—' },
                        { label: 'Rotation',   value: selectedBodyData.rotationPeriod ? `${Math.abs(selectedBodyData.rotationPeriod).toFixed(1)}h${selectedBodyData.rotationPeriod < 0 ? ' ↺' : ''}` : '—' },
                        { label: 'Temp. moy.', value: selectedBodyData.tempMean ? `${selectedBodyData.tempMean} K` : '—' },
                        { label: 'Lunes',      value: selectedBodyData.moons !== undefined ? String(selectedBodyData.moons) : '—' },
                      ].map(s => (
                        <div key={s.label} className="rounded-xl p-2.5" style={{ background: `${selectedBodyData.color}0A`, border: `1px solid ${selectedBodyData.color}18` }}>
                          <div className="text-[10px] uppercase tracking-wide text-gray-600 mb-0.5">{s.label}</div>
                          <div className="text-sm font-mono font-bold text-white">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {selectedBodyData.features && selectedBodyData.features.length > 0 && (
                      <div className="mb-4">
                        <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-2 font-semibold">Points clés</div>
                        <div className="space-y-1.5">
                          {selectedBodyData.features.slice(0, 4).map((f, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="shrink-0 mt-0.5 text-xs" style={{ color: selectedBodyData.color }}>◆</span> {f}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link href={`/space/bodys/${selectedBodyData.id}`}
                      className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110"
                      style={{ background: `${selectedBodyData.color}22`, border: `1px solid ${selectedBodyData.color}45`, color: selectedBodyData.color }}>
                      Page complète →
                    </Link>
                  </div>
                </div>
              )}

              {/* Probe detail panel */}
              {selectedProbe && (
                <div className="rounded-2xl border overflow-hidden"
                  style={{ background: 'rgba(8,12,28,0.97)', borderColor: `${selectedProbe.color}35`, boxShadow: `0 0 40px ${selectedProbe.color}10` }}>

                  <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${selectedProbe.color}80, ${selectedProbe.color}20)` }} />

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                          style={{ background: `${selectedProbe.color}18`, border: `1px solid ${selectedProbe.color}40` }}>
                          <MissionIcon type={selectedProbe.type} name={selectedProbe.name} size={36} color={selectedProbe.color} />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Mission active</span>
                          </div>
                          <h2 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                            {selectedProbe.name}
                          </h2>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">{selectedProbe.country} · {selectedProbe.agency}</div>
                        </div>
                      </div>
                      <button onClick={() => setSelectedProbe(null)}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-gray-600 hover:text-white hover:bg-white/10 transition-all shrink-0 text-sm">
                        ✕
                      </button>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">{selectedProbe.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { label: 'Lancement',  value: selectedProbe.launched.slice(0, 10) },
                        { label: 'Distance ☀', value: selectedProbe.distanceFromSun ? `${selectedProbe.distanceFromSun} UA` : '—' },
                        { label: 'Type',       value: selectedProbe.type },
                        { label: 'Agence',     value: selectedProbe.agency },
                      ].map(s => (
                        <div key={s.label} className="rounded-xl p-2.5" style={{ background: `${selectedProbe.color}0A`, border: `1px solid ${selectedProbe.color}18` }}>
                          <div className="text-[10px] uppercase tracking-wide text-gray-600 mb-0.5">{s.label}</div>
                          <div className="text-sm font-mono font-bold text-white capitalize">{s.value}</div>
                        </div>
                      ))}
                    </div>

                    {selectedProbe.currentLocation && (
                      <div className="mb-4 flex items-start gap-2 rounded-xl p-3 text-sm"
                        style={{ background: `${selectedProbe.color}0A`, border: `1px solid ${selectedProbe.color}15` }}>
                        <span className="text-gray-500 shrink-0"><IcoPin size={13} /></span>
                        <span className="text-gray-300">{selectedProbe.currentLocation}</span>
                      </div>
                    )}

                    {selectedProbe.keyDiscoveries && selectedProbe.keyDiscoveries.length > 0 && (
                      <div className="mb-4">
                        <div className="text-[10px] uppercase tracking-widest text-gray-600 mb-2 font-semibold">Découvertes clés</div>
                        <div className="space-y-1.5">
                          {selectedProbe.keyDiscoveries.slice(0, 3).map((d, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="shrink-0 mt-0.5 text-xs" style={{ color: selectedProbe.color }}>◆</span> {d}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Link href={`/space/missions/${selectedProbe.id}`}
                      className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110"
                      style={{ background: `${selectedProbe.color}22`, border: `1px solid ${selectedProbe.color}45`, color: selectedProbe.color }}>
                      Page mission complète →
                    </Link>
                  </div>
                </div>
              )}

              {/* Default panel */}
              {!selectedBodyData && !selectedProbe && (
                <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(8,12,28,0.97)' }}>
                  <div className="p-5">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Sélectionner un corps</h2>
                    <div className="space-y-0.5">
                      {[sun, ...planets, ...dwarfPlanets].map(body => (
                        <button key={body.id} onClick={() => setSelectedBody(body.id)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all hover:bg-white/5 group">
                          <div className="w-4 h-4 rounded-full shrink-0" style={{ background: body.color }} />
                          <span className="text-sm text-gray-400 group-hover:text-white transition-colors flex-1 text-left font-medium">
                            {body.nameFr}
                          </span>
                          {body.semiMajorAxis && (
                            <span className="text-xs text-gray-700 font-mono">
                              {(positions[body.id]?.dist ?? body.semiMajorAxis).toFixed(2)} UA
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-white/6 p-4 space-y-2">
                    <Link href="/space/bodys"
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-blue-800/40 text-blue-400 hover:bg-blue-900/20 transition-all text-sm font-semibold">
                      <span>Toutes les planètes</span>
                      <span className="text-xs opacity-60">→</span>
                    </Link>
                    <Link href="/space/missions"
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-violet-800/40 text-violet-400 hover:bg-violet-900/20 transition-all text-sm font-semibold">
                      <span>Toutes les missions</span>
                      <span className="text-xs opacity-60">→</span>
                    </Link>
                    <Link href="/space/stars"
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl border border-emerald-800/40 text-emerald-400 hover:bg-emerald-900/20 transition-all text-sm font-semibold">
                      <span>Carte du ciel</span>
                      <span className="text-xs opacity-60">→</span>
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
