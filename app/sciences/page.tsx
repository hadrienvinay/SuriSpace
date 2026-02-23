'use client';
// app/sciences/page.tsx
import { useState } from 'react';
import Link from 'next/link';
import ScienceLayout from '@/components/ScienceLayout';
import { scientists, revolutions, DOMAIN_COLORS, type Scientist, type Revolution } from '@/data/scientists';

// ── Timeline geometry ────────────────────────────────────────────────────────
const YEAR_MIN    = -400;
const YEAR_MAX    = 2030;
const SVG_W       = 2200;
const SVG_H       = 340;
const PAD_L       = 70;
const PAD_R       = 50;
const AXIS_Y      = 200;

// Piecewise scale: ancient era (-400→1400) gets 26% of width,
// modern era (1400→2030) gets 74% — making the recent part much more readable.
const BREAK_YEAR  = 1400;
const BREAK_RATIO = 0.26;

const mapX = (year: number) => {
  const totalW  = SVG_W - PAD_L - PAD_R;
  const ancientW = totalW * BREAK_RATIO;
  const modernW  = totalW * (1 - BREAK_RATIO);
  if (year <= BREAK_YEAR) {
    return PAD_L + ((year - YEAR_MIN) / (BREAK_YEAR - YEAR_MIN)) * ancientW;
  }
  return PAD_L + ancientW + ((year - BREAK_YEAR) / (YEAR_MAX - BREAK_YEAR)) * modernW;
};

// Century / key-year ticks — denser in the modern era (right half)
const YEAR_TICKS = [
  -400, -200, 0, 400, 800, 1000, 1200, 1400,
  1450, 1500, 1550, 1600, 1650, 1700, 1750, 1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025,
];

// Era label positions
const ERA_LABELS = [
  { label: 'Antiquité',    year: -280 },
  { label: 'Moyen Âge',   year:  650  },
  { label: 'Renaissance', year: 1490  },
  { label: 'Lumières',    year: 1660  },
  { label: 'XIXe s.',     year: 1835  },
  { label: 'XXe s.',      year: 1960  },
];

// Revolution track layout (4 staggered rows)
const REV_TRACK_BASE_Y = 48;
const REV_TRACK_GAP    = 28;
const REV_H            = 20;

function revolutionTrack(idx: number) {
  return idx % 4;
}

export default function SciencesPage() {
  const [selectedScientist,  setSelectedScientist]  = useState<Scientist | null>(null);
  const [selectedRevolution, setSelectedRevolution] = useState<Revolution | null>(null);
  const [hoveredScientist,   setHoveredScientist]   = useState<string | null>(null);
  const [hoveredRevolution,  setHoveredRevolution]  = useState<string | null>(null);

  const handleScientistClick = (s: Scientist) => {
    setSelectedRevolution(null);
    setSelectedScientist(prev => prev?.id === s.id ? null : s);
  };
  const handleRevolutionClick = (r: Revolution) => {
    setSelectedScientist(null);
    setSelectedRevolution(prev => prev?.id === r.id ? null : r);
  };

  // Stagger scientist circles vertically to avoid overlap
  const scientistY = (idx: number) => AXIS_Y + 24 + (idx % 3) * 24;

  return (
    <ScienceLayout>
      <div className="max-w-screen-2xl mx-auto px-4 py-8">

        {/* ── Header ── */}
        <div className="mb-6">
          <h1
            className="text-4xl font-bold text-white mb-1"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Histoire des Sciences
          </h1>
          <p className="text-base text-gray-500">
            Timeline interactive · Révolutions scientifiques · Cliquer sur un événement ou un scientifique
          </p>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">

          {/* ── Timeline column ── */}
          <div className="flex-1 min-w-0">

            {/* Scrollable SVG */}
            <div
              className="relative rounded-2xl border border-white/8 overflow-x-auto overflow-y-hidden"
              style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.07) 0%, rgba(2,8,23,0.97) 70%)' }}
            >
              <svg width={SVG_W} height={SVG_H} style={{ display: 'block' }}>

                {/* ── Scale-break separator ── */}
                <line
                  x1={mapX(BREAK_YEAR)} y1={28} x2={mapX(BREAK_YEAR)} y2={SVG_H - 12}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                />

                {/* ── Grid & year ticks ── */}
                {YEAR_TICKS.map(y => {
                  const x = mapX(y);
                  const isModern = y >= BREAK_YEAR;
                  const isMajor = y % 500 === 0 || y === 0 || y === 1000 || y === 1400 || y === 2000;
                  return (
                    <g key={y}>
                      <line
                        x1={x} y1={30} x2={x} y2={SVG_H - 14}
                        stroke={isMajor ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)'}
                        strokeWidth={isMajor ? 1 : 0.5}
                      />
                      <text
                        x={x} y={SVG_H - 4}
                        textAnchor="middle"
                        fontSize={isModern ? 10 : 8}
                        fill={isMajor ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.15)'}
                        fontFamily="monospace"
                      >
                        {y < 0 ? `${Math.abs(y)}av.` : y > 0 ? String(y) : '0'}
                      </text>
                    </g>
                  );
                })}

                {/* ── Era labels ── */}
                {ERA_LABELS.map(e => (
                  <text
                    key={e.label}
                    x={mapX(e.year)} y={22}
                    textAnchor="middle"
                    fontSize={e.year >= BREAK_YEAR ? 10 : 8.5}
                    fill="rgba(255,255,255,0.20)"
                    fontFamily="'Exo 2', sans-serif"
                    fontWeight="700"
                    letterSpacing="1.5"
                  >
                    {e.label.toUpperCase()}
                  </text>
                ))}

                {/* ── Revolution bands ── */}
                {revolutions.map((rev, idx) => {
                  const x1    = mapX(rev.year);
                  const x2    = rev.endYear ? mapX(rev.endYear) : x1 + 16;
                  const track = revolutionTrack(idx);
                  const ty    = REV_TRACK_BASE_Y + track * REV_TRACK_GAP;
                  const isHov = hoveredRevolution === rev.id;
                  const isSel = selectedRevolution?.id === rev.id;
                  const w     = Math.max(x2 - x1, 10);

                  return (
                    <g
                      key={rev.id}
                      onClick={() => handleRevolutionClick(rev)}
                      onMouseEnter={() => setHoveredRevolution(rev.id)}
                      onMouseLeave={() => setHoveredRevolution(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Band */}
                      <rect
                        x={x1} y={ty} width={w} height={REV_H}
                        rx={4} ry={4}
                        fill={rev.color}
                        fillOpacity={isSel ? 0.55 : isHov ? 0.42 : 0.22}
                        stroke={rev.color}
                        strokeWidth={isSel ? 1.5 : 0.8}
                        strokeOpacity={isSel ? 1 : 0.55}
                      />
                      {/* Inline label when wide enough */}
                      {w > 50 && (
                        <text
                          x={x1 + Math.min(w / 2, 90)} y={ty + 13}
                          textAnchor="middle"
                          fontSize={8}
                          fill={rev.color}
                          fontFamily="'Exo 2', sans-serif"
                          fontWeight="600"
                          fillOpacity={0.9}
                        >
                          {rev.title.split(' ').slice(0, 3).join(' ')}
                        </text>
                      )}
                      {/* Hover tooltip above band */}
                      {(isHov || isSel) && (
                        <g>
                          <rect
                            x={x1} y={ty - 22}
                            width={Math.min(rev.title.length * 6.5 + 14, 240)} height={18}
                            rx={4}
                            fill="rgba(2,8,23,0.92)"
                            stroke={rev.color}
                            strokeWidth={0.7}
                            strokeOpacity={0.7}
                          />
                          <text
                            x={x1 + 7} y={ty - 9}
                            fontSize={10}
                            fill={rev.color}
                            fontFamily="'Exo 2', sans-serif"
                            fontWeight="600"
                          >
                            {rev.title}
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* ── Timeline axis ── */}
                <line
                  x1={PAD_L} y1={AXIS_Y} x2={SVG_W - PAD_R} y2={AXIS_Y}
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth={1.5}
                />

                {/* ── Scientist circles ── */}
                {scientists.map((s, idx) => {
                  const x     = mapX(s.born);
                  const sy    = scientistY(idx);
                  const isHov = hoveredScientist === s.id;
                  const isSel = selectedScientist?.id === s.id;
                  const isModern = s.born >= BREAK_YEAR;
                  const baseR = isModern ? 8.5 : 7;
                  const r     = isSel ? baseR + 2 : isHov ? baseR + 1.5 : baseR;

                  return (
                    <g
                      key={s.id}
                      onClick={() => handleScientistClick(s)}
                      onMouseEnter={() => setHoveredScientist(s.id)}
                      onMouseLeave={() => setHoveredScientist(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Connector to axis */}
                      <line
                        x1={x} y1={AXIS_Y + 2} x2={x} y2={sy - r - 2}
                        stroke={s.color}
                        strokeWidth={0.8}
                        strokeOpacity={isHov || isSel ? 0.75 : 0.28}
                        strokeDasharray={isSel ? 'none' : '2 3'}
                      />
                      {/* Selection/hover halo */}
                      {(isSel || isHov) && (
                        <circle
                          cx={x} cy={sy} r={r + 5}
                          fill="none"
                          stroke={s.color}
                          strokeWidth={1.2}
                          strokeOpacity={0.45}
                          strokeDasharray={isSel ? 'none' : '3 3'}
                        />
                      )}
                      {/* Circle */}
                      <circle
                        cx={x} cy={sy} r={r}
                        fill={s.color}
                        fillOpacity={isSel ? 0.92 : isHov ? 0.75 : 0.55}
                        stroke={s.color}
                        strokeWidth={0.8}
                      />
                      {/* Axis tick */}
                      <circle cx={x} cy={AXIS_Y} r={2.5} fill={s.color} fillOpacity={0.75} />
                      {/* Name tooltip on hover/select */}
                      {(isHov || isSel) && (
                        <g>
                          <rect
                            x={x + 13} y={sy - 11}
                            width={s.name.length * 6.8 + 14} height={20}
                            rx={4}
                            fill="rgba(2,8,23,0.93)"
                            stroke={s.color}
                            strokeWidth={0.8}
                            strokeOpacity={0.65}
                          />
                          <text
                            x={x + 20} y={sy + 3}
                            fontSize={11}
                            fill={s.color}
                            fontFamily="'Exo 2', sans-serif"
                            fontWeight="600"
                          >
                            {s.name}
                          </text>
                        </g>
                      )}
                      {/* Small persistent label */}
                      {!isHov && !isSel && (
                        <text
                          x={x} y={sy - r - 5}
                          textAnchor="middle"
                          fontSize={isModern ? 9.5 : 7.5}
                          fill={s.color}
                          fontFamily="monospace"
                          fillOpacity={isModern ? 0.70 : 0.50}
                        >
                          {s.name.split(' ').pop()}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Bottom legend */}
              <div className="absolute bottom-2 left-4 text-xs text-gray-700 font-mono pointer-events-none">
                Échelle linéaire · −400 av. J.-C. → 2025 · ← faire défiler →
              </div>
            </div>

            {/* ── Quick scientist picker ── */}
            <div className="mt-4 grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
              {scientists.map(s => (
                <button
                  key={s.id}
                  onClick={() => handleScientistClick(s)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all ${
                    selectedScientist?.id === s.id
                      ? 'border-white/30 scale-105'
                      : 'border-white/6 hover:border-white/18'
                  }`}
                  style={{
                    background: selectedScientist?.id === s.id ? `${s.color}1A` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="text-lg">{s.emoji}</div>
                  <span
                    className="text-xs font-medium text-center leading-tight"
                    style={{ color: selectedScientist?.id === s.id ? s.color : '#6B7280' }}
                  >
                    {s.name.split(' ').pop()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className="xl:w-88" style={{ minWidth: 320, maxWidth: 420 }}>
            <div className="xl:sticky xl:top-20 space-y-4">

              {/* Scientist panel */}
              {selectedScientist && !selectedRevolution && (
                <div
                  className="rounded-2xl border p-5"
                  style={{ background: `${selectedScientist.color}0C`, borderColor: `${selectedScientist.color}40` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-3xl shrink-0"
                        style={{ borderColor: selectedScientist.color + '55', background: selectedScientist.color + '18' }}
                      >
                        {selectedScientist.emoji}
                      </div>
                      <div>
                        <div
                          className="text-xs uppercase tracking-widest mb-0.5 font-semibold"
                          style={{ color: selectedScientist.color }}
                        >
                          {selectedScientist.domains[0]}
                        </div>
                        <h2 className="text-xl font-bold text-white leading-tight">{selectedScientist.name}</h2>
                        <div className="text-xs text-gray-500 font-mono mt-0.5">
                          {selectedScientist.born < 0
                            ? `${Math.abs(selectedScientist.born)} av. J.-C.`
                            : selectedScientist.born}
                          {selectedScientist.died ? ` — ${selectedScientist.died}` : ''}
                          {' · '}{selectedScientist.nationality}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedScientist(null)}
                      className="text-gray-600 hover:text-white text-xl leading-none ml-2 shrink-0"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4 line-clamp-4">
                    {selectedScientist.shortBio}
                  </p>

                  {/* Domains */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {selectedScientist.domains.map(d => (
                      <span
                        key={d}
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          background: (DOMAIN_COLORS[d] || '#888') + '22',
                          color: DOMAIN_COLORS[d] || '#888',
                          border: `1px solid ${(DOMAIN_COLORS[d] || '#888')}44`,
                        }}
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  {/* Key discoveries */}
                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Découvertes clés</div>
                    <div className="space-y-1">
                      {selectedScientist.discoveries.slice(0, 4).map((d, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-sm text-gray-300">
                          <span className="mt-0.5 shrink-0" style={{ color: selectedScientist.color }}>◆</span>
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/sciences/scientists/${selectedScientist.id}`}
                    className="block text-center py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all hover:brightness-110"
                    style={{
                      background: selectedScientist.color + '28',
                      border: `1px solid ${selectedScientist.color}50`,
                      color: selectedScientist.color,
                    }}
                  >
                    Page complète →
                  </Link>
                </div>
              )}

              {/* Revolution panel */}
              {selectedRevolution && !selectedScientist && (
                <div
                  className="rounded-2xl border p-5"
                  style={{ background: `${selectedRevolution.color}0C`, borderColor: `${selectedRevolution.color}40` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-3">
                      <div
                        className="text-xs uppercase tracking-widest mb-1 font-semibold"
                        style={{ color: selectedRevolution.color }}
                      >
                        {selectedRevolution.domain} · {selectedRevolution.year}
                        {selectedRevolution.endYear ? ` — ${selectedRevolution.endYear}` : ''}
                      </div>
                      <h2 className="text-xl font-bold text-white leading-tight">{selectedRevolution.title}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedRevolution(null)}
                      className="text-gray-600 hover:text-white text-xl leading-none shrink-0"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4">{selectedRevolution.description}</p>

                  {selectedRevolution.impact.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Impact</div>
                      <div className="space-y-1">
                        {selectedRevolution.impact.map((imp, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-sm text-gray-300">
                            <span className="mt-0.5 shrink-0" style={{ color: selectedRevolution.color }}>◆</span>
                            {imp}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related scientists */}
                  {selectedRevolution.scientistIds.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Scientifiques associés</div>
                      <div className="space-y-1">
                        {selectedRevolution.scientistIds.map(sid => {
                          const s = scientists.find(sc => sc.id === sid);
                          if (!s) return null;
                          return (
                            <button
                              key={sid}
                              onClick={() => { setSelectedRevolution(null); setSelectedScientist(s); }}
                              className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-white/6 transition-all text-left"
                            >
                              <span className="text-lg">{s.emoji}</span>
                              <div>
                                <div className="text-sm font-semibold text-white">{s.name}</div>
                                <div className="text-xs text-gray-500">{s.domains[0]}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Default panel */}
              {!selectedScientist && !selectedRevolution && (
                <div
                  className="rounded-2xl border border-white/8 p-5"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <h2 className="text-base font-bold text-gray-300 mb-4 uppercase tracking-wider">Explorer</h2>
                  <div className="space-y-1.5">
                    {revolutions.map(r => (
                      <button
                        key={r.id}
                        onClick={() => handleRevolutionClick(r)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-all group"
                      >
                        <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: r.color }} />
                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors flex-1 text-left font-medium">
                          {r.title}
                        </span>
                        <span className="text-xs text-gray-700 font-mono shrink-0">{r.year}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/8">
                    <Link
                      href="/sciences/scientists"
                      className="block text-center py-3 rounded-xl text-sm font-bold uppercase tracking-wider border border-indigo-700/40 text-indigo-400 hover:bg-indigo-900/20 transition-all"
                    >
                      🔬 Tous les scientifiques
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </ScienceLayout>
  );
}
