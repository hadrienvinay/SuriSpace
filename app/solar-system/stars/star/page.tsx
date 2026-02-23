// pages/stars/catalogue.tsx
'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  stars, constellations, SPECTRAL_COLORS,
  type Star, type SpectralClass,
} from '@/data/stars';
import SolarLayout from '@/components/SolarLayout';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const SPECTRAL_LABELS: Record<SpectralClass, string> = {
  O: 'O — Bleue', B: 'B — Bleu-blanc', A: 'A — Blanche',
  F: 'F — Jaune-blanc', G: 'G — Jaune', K: 'K — Orange',
  M: 'M — Rouge', L: 'L — Naine brune', T: 'T — Naine brune froide',
  WR: 'WR — Wolf-Rayet', C: 'C — Carbone', D: 'D — Naine blanche',
  NS: 'NS — Étoile à neutrons', BH: 'BH — Trou noir',
};

const TYPE_LABELS: Record<string, string> = {
  'main-sequence': 'Séquence principale',
  'giant': 'Géante',
  'supergiant': 'Supergéante',
  'hypergiant': 'Hypergéante',
  'white-dwarf': 'Naine blanche',
  'neutron-star': 'Étoile à neutrons',
  'variable': 'Variable',
  'binary': 'Binaire',
  'carbon': 'Carbone',
};

const SEASON_FR: Record<string, string> = {
  spring: 'Printemps', summer: 'Été', autumn: 'Automne', winter: 'Hiver', 'year-round': 'Toute année',
};

function magToSize(mag: number): number {
  return Math.max(4, Math.min(18, 14 - mag * 1.1));
}

function StarGlyph({ star, size = 28 }: { star: Star; size?: number }) {
  const r = magToSize(star.magnitude) * (size / 28);
  const glowColor = SPECTRAL_COLORS[star.spectralClass] ?? '#fff';
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={`g-${star.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="1" />
          <stop offset="40%" stopColor={glowColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
        </radialGradient>
        <filter id={`blur-${star.id}`}>
          <feGaussianBlur stdDeviation="2.5" result="blur" />
        </filter>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r * 2.5} fill={glowColor} opacity={0.15} filter={`url(#blur-${star.id})`} />
      <circle cx={size / 2} cy={size / 2} r={r} fill={`url(#g-${star.id})`} />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CataloguePage() {
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterConst, setFilterConst] = useState<string>('all');
  const [filterNaked, setFilterNaked] = useState<boolean>(false);
  const [filterExo, setFilterExo] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'magnitude' | 'distance' | 'name' | 'temperature' | 'luminosity'>('magnitude');
  const [sortAsc, setSortAsc] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Only real stars (not constellations duplicated)
  const realStars = stars.filter(s => !constellations.find(c => c.id === s.id));

  const uniqueClasses = [...new Set(realStars.map(s => s.spectralClass))].sort();
  const uniqueTypes = [...new Set(realStars.map(s => s.starType))].sort();

  const filtered = useMemo(() => {
    let list = realStars.filter(s => {
      if (filterClass !== 'all' && s.spectralClass !== filterClass) return false;
      if (filterType !== 'all' && s.starType !== filterType) return false;
      if (filterConst !== 'all' && s.constellation !== filterConst) return false;
      if (filterNaked && !s.nakedEye) return false;
      if (filterExo && (!s.exoplanets || s.exoplanets.length === 0)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          (s.nameFr?.toLowerCase().includes(q) ?? false) ||
          (s.bayerDesignation?.toLowerCase().includes(q) ?? false) ||
          s.spectralType.toLowerCase().includes(q)
        );
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      let va: number, vb: number;
      switch (sortBy) {
        case 'name': return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        case 'distance': va = a.distanceLy; vb = b.distanceLy; break;
        case 'temperature': va = a.temperature ?? 0; vb = b.temperature ?? 0; break;
        case 'luminosity': va = a.luminosity ?? 0; vb = b.luminosity ?? 0; break;
        default: va = a.magnitude; vb = b.magnitude;
      }
      return sortAsc ? va - vb : vb - va;
    });
    return list;
  }, [realStars, search, filterClass, filterType, filterConst, filterNaked, filterExo, sortBy, sortAsc]);

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortAsc(a => !a);
    else { setSortBy(col); setSortAsc(true); }
  };

  const sortIcon = (col: typeof sortBy) =>
    sortBy === col ? (sortAsc ? ' ↑' : ' ↓') : ' ↕';

  return (
    <SolarLayout>
    <div style={{ minHeight: '100vh', color: '#e8eaf6', fontFamily: "'Exo 2', sans-serif" }}>
      <style>{`

        .catalogue-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.2s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .catalogue-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.2s;
          background: linear-gradient(135deg, rgba(255,255,255,0.05), transparent);
        }
        .catalogue-card:hover { border-color: rgba(255,255,255,0.15); transform: translateY(-2px); }
        .catalogue-card:hover::before { opacity: 1; }

        .filter-btn {
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 15px;
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
          font-size: 17px;
          outline: none;
          width: 100%;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: rgba(255,255,255,0.25); }
        .search-input::placeholder { color: rgba(255,255,255,0.3); }

        .select-filter {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 6px 10px;
          color: rgba(255,255,255,0.7);
          font-family: 'Exo 2', sans-serif;
          font-size: 15px;
          outline: none;
          cursor: pointer;
        }
        .select-filter option { background: #0a0f1e; color: #fff; }

        .table-row {
          display: contents;
        }
        .table-row > * {
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
        }
        .table-row:hover > * { background: rgba(255,255,255,0.03); }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .spectral-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .sort-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          font-family: 'Exo 2', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0;
          white-space: nowrap;
        }
        .sort-btn:hover { color: rgba(255,255,255,0.9); }
        .sort-btn.active { color: rgba(255,255,255,0.9); }

        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .star-glyph-wrap { animation: twinkle 3s ease-in-out infinite; }

        .toggle-pill {
          display: flex;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          overflow: hidden;
        }
        .toggle-pill button {
          padding: 6px 14px;
          background: none;
          border: none;
          color: rgba(255,255,255,0.5);
          font-family: 'Exo 2', sans-serif;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.15s;
        }
        .toggle-pill button.active {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ padding: '40px 40px 0', maxWidth: 1400, margin: '0 auto' }}>
        <nav style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>
          <Link href="/solar-system/stars">✦ Carte du ciel</Link>
          <span>›</span>
          <span style={{ color: 'rgba(255,255,255,0.8)' }}>Catalogue d'étoiles</span>
        </nav>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
          <div>
            <div style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
              Catalogue stellaire
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
              {filtered.length} étoiles
            </h1>
            <div style={{ marginTop: 6, fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>
              {realStars.length} étoiles au catalogue — {realStars.filter(s => s.nakedEye).length} visibles à l'œil nu
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="toggle-pill">
              <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>⊞ Grille</button>
              <button className={viewMode === 'table' ? 'active' : ''} onClick={() => setViewMode('table')}>≡ Tableau</button>
            </div>
            <Link href="/solar-system/stars/constellations" style={{
              padding: '7px 16px',
              borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.6)',
              textDecoration: 'none',
              fontSize: 16,
              fontWeight: 500,
            }}>
              ✦ Constellations
            </Link>
          </div>
        </div>

        {/* ── Filters ── */}
        <div style={{
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 16,
          padding: '16px 20px',
          marginBottom: 32,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          alignItems: 'center',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', minWidth: 220, flex: '1 1 220px' }}>
            <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16, opacity: 0.4 }}>⚲</span>
            <input
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une étoile…"
            />
          </div>

          <div style={{ width: '1px', height: 28, background: 'rgba(255,255,255,0.08)' }} />

          {/* Spectral class */}
          <select className="select-filter" value={filterClass} onChange={e => setFilterClass(e.target.value)}>
            <option value="all">Toutes classes</option>
            {uniqueClasses.map(c => (
              <option key={c} value={c}>{c} — {c === 'O' ? 'Bleue' : c === 'B' ? 'Bleu-blanc' : c === 'A' ? 'Blanche' : c === 'F' ? 'Jaune-blanc' : c === 'G' ? 'Jaune' : c === 'K' ? 'Orange' : c === 'M' ? 'Rouge' : c === 'WR' ? 'Wolf-Rayet' : c}</option>
            ))}
          </select>

          {/* Type */}
          <select className="select-filter" value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">Tous types</option>
            {uniqueTypes.map(t => (
              <option key={t} value={t}>{TYPE_LABELS[t] ?? t}</option>
            ))}
          </select>

          {/* Constellation */}
          <select className="select-filter" value={filterConst} onChange={e => setFilterConst(e.target.value)}>
            <option value="all">Toutes constellations</option>
            {constellations.map(c => (
              <option key={c.id} value={c.id}>{c.nameFr}</option>
            ))}
          </select>

          <div style={{ width: '1px', height: 28, background: 'rgba(255,255,255,0.08)' }} />

          {/* Toggles */}
          <button className={`filter-btn ${filterNaked ? 'active' : ''}`} onClick={() => setFilterNaked(v => !v)}>
            👁 Œil nu
          </button>
          <button className={`filter-btn ${filterExo ? 'active' : ''}`} onClick={() => setFilterExo(v => !v)}>
            🌍 Exoplanètes
          </button>

          {(search || filterClass !== 'all' || filterType !== 'all' || filterConst !== 'all' || filterNaked || filterExo) && (
            <button className="filter-btn" onClick={() => {
              setSearch(''); setFilterClass('all'); setFilterType('all');
              setFilterConst('all'); setFilterNaked(false); setFilterExo(false);
            }} style={{ borderColor: 'rgba(255,100,100,0.3)', color: 'rgba(255,150,150,0.7)' }}>
              ✕ Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ padding: '0 40px 60px', maxWidth: 1400, margin: '0 auto' }}>

        {/* ── GRID VIEW ── */}
        {viewMode === 'grid' && (
          <>
            {/* Sort bar */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: 4 }}>Trier :</span>
              {(['magnitude', 'distance', 'name', 'temperature', 'luminosity'] as const).map(col => (
                <button key={col} className={`filter-btn ${sortBy === col ? 'active' : ''}`} onClick={() => toggleSort(col)}>
                  {col === 'magnitude' ? 'Magnitude' : col === 'distance' ? 'Distance' : col === 'name' ? 'Nom' : col === 'temperature' ? 'Température' : 'Luminosité'}
                  {sortBy === col && (sortAsc ? ' ↑' : ' ↓')}
                </button>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 16,
            }}>
              {filtered.map(star => {
                const constName = constellations.find(c => c.id === star.constellation)?.nameFr ?? star.constellation;
                const glowColor = SPECTRAL_COLORS[star.spectralClass] ?? '#fff';

                return (
                  <Link key={star.id} href={`/solar-system/stars/star/${star.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="catalogue-card" style={{ borderLeft: `2px solid ${glowColor}20` }}>
                      {/* Top row */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                        <div className="star-glyph-wrap" style={{ animationDelay: `${Math.random() * 3}s` }}>
                          <StarGlyph star={star} size={36} />
                        </div>
                        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                          {star.nakedEye && (
                            <span className="badge" style={{ background: 'rgba(255,255,200,0.08)', color: 'rgba(255,255,180,0.7)', border: '1px solid rgba(255,255,180,0.15)' }}>
                              👁
                            </span>
                          )}
                          {star.exoplanets && star.exoplanets.length > 0 && (
                            <span className="badge" style={{ background: 'rgba(100,220,200,0.08)', color: 'rgba(100,220,200,0.7)', border: '1px solid rgba(100,220,200,0.15)' }}>
                              🌍 {star.exoplanets.length}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <div style={{ marginBottom: 4 }}>
                        <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 18, fontWeight: 600, color: '#fff' }}>
                          {star.nameFr ?? star.name}
                        </div>
                        {star.bayerDesignation && (
                          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>
                            {star.bayerDesignation}
                          </div>
                        )}
                      </div>

                      {/* Constellation */}
                      <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)', marginBottom: 14 }}>
                        ✦ {constName}
                      </div>

                      {/* Spectral + type */}
                      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                        <span className="badge" style={{
                          background: `${glowColor}15`,
                          color: glowColor,
                          border: `1px solid ${glowColor}30`,
                        }}>
                          <span className="spectral-dot" style={{ background: glowColor }} />
                          {star.spectralType}
                        </span>
                        <span className="badge" style={{
                          background: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.5)',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                          {TYPE_LABELS[star.starType] ?? star.starType}
                        </span>
                      </div>

                      {/* Stats grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 8,
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        paddingTop: 12,
                      }}>
                        <Stat label="Magnitude" value={star.magnitude.toFixed(2)} />
                        <Stat label="Distance" value={
                          star.distanceLy < 100
                            ? `${star.distanceLy.toFixed(1)} al`
                            : star.distanceLy < 10000
                            ? `${Math.round(star.distanceLy).toLocaleString('fr')} al`
                            : `${(star.distanceLy / 1000).toFixed(1)}k al`
                        } />
                        {star.temperature && <Stat label="Température" value={`${star.temperature.toLocaleString('fr')} K`} />}
                        {star.luminosity && <Stat label="Luminosité" value={
                          star.luminosity < 0.01 ? `${star.luminosity.toExponential(1)} L☉`
                          : star.luminosity < 1000 ? `${star.luminosity.toFixed(1)} L☉`
                          : `${(star.luminosity / 1000).toFixed(1)}k L☉`
                        } />}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
                <div style={{ fontSize: 16 }}>Aucune étoile ne correspond aux filtres</div>
              </div>
            )}
          </>
        )}

        {/* ── TABLE VIEW ── */}
        {viewMode === 'table' && (
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1.5fr 1.2fr 1fr 1fr 1fr 1fr',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '0',
            }}>
              {[
                { key: 'name' as const, label: 'Étoile' },
                { key: null, label: 'Constellation' },
                { key: null, label: 'Type spectral' },
                { key: 'magnitude' as const, label: 'Mag.' },
                { key: 'distance' as const, label: 'Distance' },
                { key: 'temperature' as const, label: 'Temp. (K)' },
                { key: 'luminosity' as const, label: 'Lum. (L☉)' },
              ].map((col, i) => (
                <div key={i} style={{
                  padding: '12px 14px',
                  borderRight: i < 6 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                }}>
                  {col.key ? (
                    <button className={`sort-btn ${sortBy === col.key ? 'active' : ''}`} onClick={() => toggleSort(col.key!)}>
                      {col.label}{sortIcon(col.key)}
                    </button>
                  ) : (
                    <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
                      {col.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {filtered.map((star, idx) => {
              const constName = constellations.find(c => c.id === star.constellation)?.nameFr ?? star.constellation;
              const glowColor = SPECTRAL_COLORS[star.spectralClass] ?? '#fff';
              return (
                <Link key={star.id} href={`/solar-system/stars/star/${star.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
                  <div className="table-row" style={{ cursor: 'pointer' }}>
                    {/* Name */}
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <StarGlyph star={star} size={22} />
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>{star.nameFr ?? star.name}</div>
                        {star.bayerDesignation && <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{star.bayerDesignation}</div>}
                      </div>
                      {star.nakedEye && <span style={{ marginLeft: 'auto', fontSize: 16, opacity: 0.5 }}>👁</span>}
                      {star.exoplanets?.length ? <span style={{ fontSize: 12, opacity: 0.5 }}>🌍</span> : null}
                    </div>
                    {/* Constellation */}
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13, color: 'rgba(255,255,255,0.5)', alignItems: 'center', display: 'flex' }}>
                      {constName}
                    </div>
                    {/* Spectral */}
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="spectral-dot" style={{ background: glowColor }} />
                      <span style={{ fontSize: 16, color: glowColor }}>{star.spectralType}</span>
                    </div>
                    {/* Magnitude */}
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13, color: 'rgba(255,255,255,0.8)', fontVariantNumeric: 'tabular-nums', alignItems: 'center', display: 'flex' }}>
                      {star.magnitude.toFixed(2)}
                    </div>
                    {/* Distance */}
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 16, color: 'rgba(255,255,255,0.6)', fontVariantNumeric: 'tabular-nums', alignItems: 'center', display: 'flex' }}>
                      {star.distanceLy < 100 ? `${star.distanceLy.toFixed(1)} al` : `${Math.round(star.distanceLy).toLocaleString('fr')} al`}
                    </div>
                    {/* Temperature */}
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 16, color: 'rgba(255,255,255,0.6)', fontVariantNumeric: 'tabular-nums', alignItems: 'center', display: 'flex' }}>
                      {star.temperature ? star.temperature.toLocaleString('fr') : '—'}
                    </div>
                    {/* Luminosity */}
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 16, color: 'rgba(255,255,255,0.6)', fontVariantNumeric: 'tabular-nums', alignItems: 'center', display: 'flex' }}>
                      {star.luminosity ? (star.luminosity >= 1000 ? `${(star.luminosity / 1000).toFixed(1)}k` : star.luminosity.toFixed(1)) : '—'}
                    </div>
                  </div>
                </Link>
              );
            })}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)', fontSize: 16 }}>
                Aucune étoile ne correspond
              </div>
            )}
          </div>
        )}

        {/* ── Spectral legend ── */}
        <div style={{
          marginTop: 48,
          padding: '20px 24px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: 16,
        }}>
          <div style={{ fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
            Classification spectrale — Séquence de Harvard
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {(['O','B','A','F','G','K','M'] as SpectralClass[]).map(cls => (
              <div key={cls} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="spectral-dot" style={{ background: SPECTRAL_COLORS[cls], width: 10, height: 10 }} />
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)' }}>
                  {cls}: {cls === 'O' ? '≥ 30 000 K' : cls === 'B' ? '10–30 000 K' : cls === 'A' ? '7500–10 000 K' : cls === 'F' ? '6000–7500 K' : cls === 'G' ? '5200–6000 K' : cls === 'K' ? '3700–5200 K' : '< 3700 K'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </SolarLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    </div>
  );
}
