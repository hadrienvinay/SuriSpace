// pages/constellations/index.tsx
'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  stars, constellations, SPECTRAL_COLORS, raDecToXY,
  getStarsByConstellation,
  type Constellation,
} from '@/data/stars';
import SolarLayout from '@/components/SolarLayout';

// ─── Mini SVG constellation map ───────────────────────────────────────────────
function ConstellationMiniMap({ c, size = 120 }: { c: Constellation; size?: number }) {
  const constStars = getStarsByConstellation(c.id);
  if (constStars.length === 0) return (
    <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32 }}>
      {c.emoji}
    </div>
  );

  // Compute bounds and normalize
  const positions = constStars.map(s => raDecToXY(s.ra, s.dec));
  const xs = positions.map(p => p.x);
  const ys = positions.map(p => p.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const rangeX = maxX - minX || 0.1;
  const rangeY = maxY - minY || 0.1;
  const range = Math.max(rangeX, rangeY, 0.05);
  const pad = size * 0.18;
  const scale = (size - pad * 2) / range;
  const cx = size / 2 - ((minX + maxX) / 2) * scale;
  const cy = size / 2 - ((minY + maxY) / 2) * scale;

  const toXY = (ra: number, dec: number) => {
    const { x, y } = raDecToXY(ra, dec);
    return { px: x * scale + cx, py: y * scale + cy };
  };

  const starById = Object.fromEntries(constStars.map(s => [s.id, s]));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      {/* Background glow */}
      <defs>
        <radialGradient id={`bg-${c.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={c.color} stopOpacity="0.06" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <filter id={`glow-${c.id}`}>
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#bg-${c.id})`} />

      {/* Lines */}
      {c.lines.map(([aId, bId], i) => {
        const sa = starById[aId];
        const sb = starById[bId];
        if (!sa || !sb) return null;
        const a = toXY(sa.ra, sa.dec);
        const b = toXY(sb.ra, sb.dec);
        return (
          <line
            key={i}
            x1={a.px} y1={a.py} x2={b.px} y2={b.py}
            stroke={c.color}
            strokeWidth="0.8"
            strokeOpacity="0.4"
          />
        );
      })}

      {/* Stars */}
      {constStars.map(s => {
        const { px, py } = toXY(s.ra, s.dec);
        const r = Math.max(2, Math.min(5, 5.5 - s.magnitude * 0.35));
        const clr = SPECTRAL_COLORS[s.spectralClass] ?? '#fff';
        const isMain = c.brightestStar === s.id;
        return (
          <g key={s.id} filter={`url(#glow-${c.id})`}>
            {isMain && <circle cx={px} cy={py} r={r * 2.5} fill={clr} opacity={0.12} />}
            <circle cx={px} cy={py} r={r} fill={clr} opacity={isMain ? 1 : 0.7} />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const SEASON_CONFIG = {
  winter:     { label: 'Hiver',      color: '#93C5FD', emoji: '❄️' },
  spring:     { label: 'Printemps',  color: '#86EFAC', emoji: '🌸' },
  summer:     { label: 'Été',        color: '#FDE68A', emoji: '☀️' },
  autumn:     { label: 'Automne',    color: '#FDBA74', emoji: '🍂' },
  'year-round': { label: 'Toute année', color: '#C4B5FD', emoji: '🔄' },
};

const HEMI_LABEL = { north: 'Nord', south: 'Sud', both: 'Nord/Sud' };

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ConstellationsPage() {
  const [search, setSearch] = useState('');
  const [filterSeason, setFilterSeason] = useState<string>('all');
  const [filterHemi, setFilterHemi] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'area' | 'stars'>('name');
  const [sortAsc, setSortAsc] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const enriched = useMemo(() => constellations.map(c => ({
    ...c,
    starCount: getStarsByConstellation(c.id).length,
    brightestName: c.brightestStar
      ? (stars.find(s => s.id === c.brightestStar)?.nameFr ?? stars.find(s => s.id === c.brightestStar)?.name ?? '—')
      : '—',
  })), []);

  const filtered = useMemo(() => {
    let list = enriched.filter(c => {
      if (filterSeason !== 'all' && c.bestSeason !== filterSeason) return false;
      if (filterHemi !== 'all' && c.hemisphere !== filterHemi) return false;
      if (search) {
        const q = search.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.nameFr.toLowerCase().includes(q) || c.abbreviation.toLowerCase().includes(q);
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sortBy === 'name') return sortAsc ? a.nameFr.localeCompare(b.nameFr) : b.nameFr.localeCompare(a.nameFr);
      if (sortBy === 'area') return sortAsc ? (a.area ?? 0) - (b.area ?? 0) : (b.area ?? 0) - (a.area ?? 0);
      if (sortBy === 'stars') return sortAsc ? a.starCount - b.starCount : b.starCount - a.starCount;
      return 0;
    });
    return list;
  }, [enriched, search, filterSeason, filterHemi, sortBy, sortAsc]);

  return (
    <SolarLayout>
    <div style={{ minHeight: '100vh', color: '#e8eaf6', fontFamily: "'Exo 2', sans-serif" }}>
      <style>{`

        .const-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 0;
          transition: all 0.25s ease;
          cursor: pointer;
          overflow: hidden;
          position: relative;
        }
        .const-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.25s;
          background: linear-gradient(135deg, rgba(255,255,255,0.04), transparent 60%);
          pointer-events: none;
        }
        .const-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,0.16);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }
        .const-card:hover::after { opacity: 1; }

        .filter-btn {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid rgba(255,255,255,0.12);
          background: transparent;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
          font-family: 'Exo 2', sans-serif;
        }
        .filter-btn:hover { border-color: rgba(255,255,255,0.3); color: rgba(255,255,255,0.9); }
        .filter-btn.active { border-color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.08); color: #fff; }

        .search-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 16px 10px 40px;
          color: #fff;
          font-family: 'Exo 2', sans-serif;
          font-size: 14px;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: rgba(255,255,255,0.25); }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }

        .season-tab {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid transparent;
          background: transparent;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Exo 2', sans-serif;
        }
        .season-tab:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.04); }
        .season-tab.active { color: #fff; background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.15); }

        .deep-sky-item {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.5);
          margin: 2px 3px 2px 0;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .const-card { animation: fadeInUp 0.4s ease both; }
      `}</style>

      <div style={{ padding: '40px 40px 0', maxWidth: 1400, margin: '0 auto' }}>
        {/* Nav */}
        <nav style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: 15, color: 'rgba(255,255,255,0.4)' }}>
          <Link href="/solar-system/stars" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>✦ Carte du ciel</Link>
          <span>›</span>
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>Constellations</span>
        </nav>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
              Atlas des constellations
            </div>
            <h1 style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 600,
              margin: 0,
              background: 'linear-gradient(120deg, #fff 0%, rgba(200,210,255,0.9) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>
              {filtered.length} constellations
            </h1>
            <div style={{ marginTop: 6, fontSize: 17, color: 'rgba(255,255,255,0.4)' }}>
              {constellations.length} constellations répertoriées · {constellations.filter(c => c.hemisphere === 'north' || c.hemisphere === 'both').length} boréales · {constellations.filter(c => c.hemisphere === 'south' || c.hemisphere === 'both').length} australes
            </div>
          </div>

          <Link href="/solar-system/stars/star" style={{
            padding: '8px 18px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            fontSize: 16,
            fontWeight: 500,
          }}>
            ✦ Catalogue d'étoiles
          </Link>
        </div>

        {/* Season stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 10,
          marginBottom: 28,
        }}>
          {(Object.entries(SEASON_CONFIG) as [string, typeof SEASON_CONFIG['winter']][]).map(([key, { label, color, emoji }]) => {
            const count = constellations.filter(c => c.bestSeason === key).length;
            const isActive = filterSeason === key;
            return (
              <button
                key={key}
                className={`season-tab ${isActive ? 'active' : ''}`}
                onClick={() => setFilterSeason(isActive ? 'all' : key)}
                style={{ borderColor: isActive ? `${color}40` : undefined }}
              >
                <span style={{ fontSize: 17 }}>{emoji}</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: isActive ? color : undefined }}>{label}</div>
                  <div style={{ fontSize: 10, opacity: 0.5 }}>{count} constell.</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Filter bar */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: '14px 20px',
          marginBottom: 32,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
          alignItems: 'center',
        }}>
          <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 200 }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, opacity: 0.4 }}>⚲</span>
            <input
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une constellation…"
            />
          </div>

          <div style={{ width: '1px', height: 28, background: 'rgba(255,255,255,0.08)' }} />

          <button className={`filter-btn ${filterHemi === 'all' ? 'active' : ''}`} onClick={() => setFilterHemi('all')}>Toutes</button>
          <button className={`filter-btn ${filterHemi === 'north' ? 'active' : ''}`} onClick={() => setFilterHemi('north')}>🌍 Boréales</button>
          <button className={`filter-btn ${filterHemi === 'south' ? 'active' : ''}`} onClick={() => setFilterHemi('south')}>🌏 Australes</button>
          <button className={`filter-btn ${filterHemi === 'both' ? 'active' : ''}`} onClick={() => setFilterHemi('both')}>🌐 Les deux</button>

          <div style={{ width: '1px', height: 28, background: 'rgba(255,255,255,0.08)' }} />

          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Trier :</span>
          {(['name', 'area', 'stars'] as const).map(col => (
            <button key={col} className={`filter-btn ${sortBy === col ? 'active' : ''}`} onClick={() => {
              if (sortBy === col) setSortAsc(a => !a);
              else { setSortBy(col); setSortAsc(true); }
            }}>
              {col === 'name' ? 'Nom' : col === 'area' ? 'Surface' : 'Étoiles'}
              {sortBy === col && (sortAsc ? ' ↑' : ' ↓')}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid ── */}
      <div style={{ padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 18,
        }}>
          {filtered.map((c, idx) => {
            const season = SEASON_CONFIG[c.bestSeason as keyof typeof SEASON_CONFIG];

            return (
              <Link key={c.id} href={`/solar-system/stars/constellations/${c.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  className="const-card"
                  style={{ animationDelay: `${idx * 0.04}s`, borderColor: hoveredId === c.id ? `${c.color}30` : undefined }}
                  onMouseEnter={() => setHoveredId(c.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Top colored bar */}
                  <div style={{
                    height: 3,
                    background: `linear-gradient(90deg, ${c.color}80, ${c.color}20, transparent)`,
                  }} />

                  <div style={{ padding: '20px 22px 22px' }}>
                    {/* Header row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <span style={{ fontSize: 22 }}>{c.emoji}</span>
                          <div>
                            <div style={{
                              fontFamily: "'Exo 2', sans-serif",
                              fontSize: 20,
                              fontWeight: 600,
                              color: '#fff',
                              lineHeight: 1.1,
                            }}>
                              {c.nameFr}
                            </div>
                            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                              {c.name} · {c.abbreviation}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mini map */}
                      <div style={{
                        width: 80,
                        height: 80,
                        background: `radial-gradient(circle at 50% 50%, ${c.color}10, transparent)`,
                        borderRadius: 12,
                        flexShrink: 0,
                        border: `1px solid ${c.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}>
                        <ConstellationMiniMap c={c} size={76} />
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: 15,
                      color: 'rgba(255,255,255,0.5)',
                      lineHeight: 1.6,
                      margin: '0 0 16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {c.description}
                    </p>

                    {/* Stats row */}
                    <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                      <MiniStat label="Étoiles" value={String(c.starCount)} />
                      {c.area && <MiniStat label="Surface" value={`${c.area.toLocaleString('fr')} deg²`} />}
                      {c.brightestName !== '—' && <MiniStat label="Plus brillante" value={c.brightestName} />}
                    </div>

                    {/* Tags */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                      {/* Season */}
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 500,
                        background: `${season.color}15`,
                        color: season.color,
                        border: `1px solid ${season.color}30`,
                      }}>
                        {season.emoji} {season.label}
                      </span>
                      {/* Hemisphere */}
                      <span style={{
                        padding: '3px 10px',
                        borderRadius: 20,
                        fontSize: 13,
                        fontWeight: 500,
                        background: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.5)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}>
                        {HEMI_LABEL[c.hemisphere]}
                      </span>
                      {/* Deep sky */}
                      {c.deepSkyObjects && c.deepSkyObjects.length > 0 && (
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: 20,
                          fontSize: 13,
                          background: 'rgba(150,100,255,0.08)',
                          color: 'rgba(180,140,255,0.6)',
                          border: '1px solid rgba(150,100,255,0.15)',
                        }}>
                          ✦ {c.deepSkyObjects.length} obj. ciel profond
                        </span>
                      )}
                    </div>

                    {/* Deep sky objects preview */}
                    {c.deepSkyObjects && c.deepSkyObjects.length > 0 && (
                      <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap' }}>
                        {c.deepSkyObjects.slice(0, 3).map((dso, i) => (
                          <span key={i} className="deep-sky-item">
                            <span style={{ opacity: 0.6 }}>◈</span> {dso}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
            <div style={{ fontSize: 16 }}>Aucune constellation ne correspond aux filtres</div>
          </div>
        )}

        {/* Legend */}
        <div style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 12,
        }}>
          {(Object.entries(SEASON_CONFIG) as [string, typeof SEASON_CONFIG['winter']][]).map(([key, { label, color, emoji }]) => {
            const list = constellations.filter(c => c.bestSeason === key);
            return (
              <div key={key} style={{
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${color}20`,
                borderRadius: 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 16 }}>{emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color }}>{label}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>{list.length}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {list.map(c => (
                    <Link key={c.id} href={`/solar-system/stars/constellations/${c.id}`} style={{
                      fontSize: 13,
                      color: 'rgba(255,255,255,0.5)',
                      textDecoration: 'none',
                      padding: '2px 6px',
                      borderRadius: 6,
                      background: 'rgba(255,255,255,0.04)',
                      transition: 'color 0.15s',
                    }}>
                      {c.nameFr}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </SolarLayout>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 1 }}>{label}</div>
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}
