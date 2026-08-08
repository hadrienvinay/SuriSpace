// app/sciences/scientists/page.tsx
'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import ScienceLayout from '@/components/layout/ScienceLayout';
import { scientists, DOMAIN_COLORS, ERA_LABELS, type Era, type Scientist } from '@/data/scientists';
import { ScientistIcon } from '@/components/icons/ScientistIcons';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const ERA_ORDER: Era[] = ['antiquity', 'medieval', 'renaissance', 'enlightenment', 'modern', 'contemporary'];

function formatYear(y: number): string {
  return y < 0 ? `${Math.abs(y)} av. J.-C.` : String(y);
}

function lifespan(s: Scientist): string {
  return `${formatYear(s.born)}${s.died !== null ? ` – ${formatYear(s.died)}` : ''}`;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ScientistsPage() {
  const [search, setSearch] = useState('');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [filterEra, setFilterEra] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'born' | 'era' | 'domain'>('born');
  const [sortAsc, setSortAsc] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const uniqueDomains = [...new Set(scientists.flatMap(s => s.domains))].sort();

  const filtered = useMemo(() => {
    let list = scientists.filter(s => {
      if (filterDomain !== 'all' && !s.domains.includes(filterDomain)) return false;
      if (filterEra !== 'all' && s.era !== filterEra) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.nationality.toLowerCase().includes(q) ||
          s.domains.some(d => d.toLowerCase().includes(q))
        );
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'name': return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        case 'era': {
          const ea = ERA_ORDER.indexOf(a.era), eb = ERA_ORDER.indexOf(b.era);
          return sortAsc ? ea - eb : eb - ea;
        }
        case 'domain': {
          const da = a.domains[0] ?? '', db = b.domains[0] ?? '';
          return sortAsc ? da.localeCompare(db) : db.localeCompare(da);
        }
        default: return sortAsc ? a.born - b.born : b.born - a.born;
      }
    });
    return list;
  }, [search, filterDomain, filterEra, sortBy, sortAsc]);

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortAsc(a => !a);
    else { setSortBy(col); setSortAsc(true); }
  };

  const sortIcon = (col: typeof sortBy) =>
    sortBy === col ? (sortAsc ? ' ↑' : ' ↓') : ' ↕';

  return (
    <ScienceLayout>
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
            appearance: none;
            -webkit-appearance: none;
            background-color: rgba(255,255,255,0.04);
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1L5 5L9 1' stroke='rgba(255,255,255,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 12px center;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 10px;
            padding: 8px 32px 8px 14px;
            color: rgba(255,255,255,0.7);
            font-family: 'Exo 2', sans-serif;
            font-size: 15px;
            outline: none;
            cursor: pointer;
            transition: border-color 0.15s, background-color 0.15s, color 0.15s;
          }
          .select-filter:hover {
            border-color: rgba(255,255,255,0.22);
            background-color: rgba(255,255,255,0.06);
            color: rgba(255,255,255,0.9);
          }
          .select-filter:focus {
            border-color: rgba(255,255,255,0.35);
            background-color: rgba(255,255,255,0.06);
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
            <Link href="/sciences" className="hover:text-white transition-colors">Sciences</Link>
            <span>›</span>
            <span className="text-gray-400">Scientifiques</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 36 }}>
            <div>
              <div style={{ fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 8 }}>
                Grands scientifiques
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
                {filtered.length} figures
              </h1>
              <div style={{ marginTop: 6, fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>
                {scientists.length} scientifiques au catalogue, de l'Antiquité à l'époque contemporaine
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div className="toggle-pill">
                <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>⊞ Grille</button>
                <button className={viewMode === 'table' ? 'active' : ''} onClick={() => setViewMode('table')}>≡ Tableau</button>
              </div>
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
              <input
                className="search-input"
                style={{ paddingLeft: 16 }}
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un scientifique…"
              />
            </div>

            <div style={{ width: '1px', height: 28, background: 'rgba(255,255,255,0.08)' }} />

            {/* Domain */}
            <select className="select-filter" value={filterDomain} onChange={e => setFilterDomain(e.target.value)}>
              <option value="all">Tous domaines</option>
              {uniqueDomains.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>

            {/* Era */}
            <select className="select-filter" value={filterEra} onChange={e => setFilterEra(e.target.value)}>
              <option value="all">Toutes époques</option>
              {ERA_ORDER.map(e => (
                <option key={e} value={e}>{ERA_LABELS[e]}</option>
              ))}
            </select>

            {(search || filterDomain !== 'all' || filterEra !== 'all') && (
              <button className="filter-btn" onClick={() => {
                setSearch(''); setFilterDomain('all'); setFilterEra('all');
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
                {(['born', 'name', 'era', 'domain'] as const).map(col => (
                  <button key={col} className={`filter-btn ${sortBy === col ? 'active' : ''}`} onClick={() => toggleSort(col)}>
                    {col === 'born' ? 'Année' : col === 'name' ? 'Nom' : col === 'era' ? 'Époque' : 'Domaine'}
                    {sortBy === col && (sortAsc ? ' ↑' : ' ↓')}
                  </button>
                ))}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}>
                {filtered.map(s => (
                  <Link key={s.id} href={`/sciences/scientists/${s.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="catalogue-card" style={{ borderLeft: `2px solid ${s.color}20` }}>
                      {/* Top row */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
                        <div
                          style={{
                            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                            border: `2px solid ${s.color}44`, background: `${s.color}15`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <span style={{ color: s.color }}><ScientistIcon id={s.id} size={30} /></span>
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: s.color, marginBottom: 2 }}>
                            {ERA_LABELS[s.era]}
                          </div>
                          <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 18, fontWeight: 600, color: '#fff' }}>
                            {s.name}
                          </div>
                          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 1, fontVariantNumeric: 'tabular-nums' }}>
                            {lifespan(s)} · {s.nationality}
                          </div>
                        </div>
                      </div>

                      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {s.shortBio}
                      </p>

                      {/* Domains */}
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
                        {s.domains.map(d => (
                          <span key={d} className="badge" style={{
                            background: `${DOMAIN_COLORS[d] ?? '#888'}15`,
                            color: DOMAIN_COLORS[d] ?? '#888',
                            border: `1px solid ${DOMAIN_COLORS[d] ?? '#888'}30`,
                          }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>✦</div>
                  <div style={{ fontSize: 16 }}>Aucun scientifique ne correspond aux filtres</div>
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
              overflowX: 'auto',
            }}>
              <div style={{
                minWidth: 900,
                display: 'grid',
                gridTemplateColumns: '2fr 1.3fr 1fr 1.3fr 2fr',
              }}>
                <div style={{ display: 'contents' }}>
                  {([
                    { key: 'name', label: 'Scientifique' },
                    { key: 'born', label: 'Naissance' },
                    { key: 'era', label: 'Époque' },
                    { key: 'domain', label: 'Domaine principal' },
                    { key: null, label: 'Tous domaines' },
                  ] as { key: typeof sortBy | null; label: string }[]).map((col, i) => (
                    <div key={i} style={{
                      padding: '12px 14px',
                      borderRight: i < 4 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      whiteSpace: 'nowrap',
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

                {filtered.map(s => (
                  <Link key={s.id} href={`/sciences/scientists/${s.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
                    <div className="table-row" style={{ cursor: 'pointer' }}>
                      {/* Name */}
                      <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 10, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        <span
                          style={{
                            width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                            border: `1px solid ${s.color}44`, background: `${s.color}15`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color,
                          }}
                        >
                          <ScientistIcon id={s.id} size={16} />
                        </span>
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: 16, fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{s.nationality}</div>
                        </div>
                      </div>
                      {/* Born */}
                      <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 16, color: 'rgba(255,255,255,0.6)', fontVariantNumeric: 'tabular-nums', alignItems: 'center', display: 'flex', whiteSpace: 'nowrap' }}>
                        {lifespan(s)}
                      </div>
                      {/* Era */}
                      <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13, color: s.color, alignItems: 'center', display: 'flex', whiteSpace: 'nowrap' }}>
                        {ERA_LABELS[s.era]}
                      </div>
                      {/* Main domain */}
                      <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', display: 'flex', whiteSpace: 'nowrap' }}>
                        <span className="badge" style={{
                          background: `${DOMAIN_COLORS[s.domains[0]] ?? '#888'}15`,
                          color: DOMAIN_COLORS[s.domains[0]] ?? '#888',
                          border: `1px solid ${DOMAIN_COLORS[s.domains[0]] ?? '#888'}30`,
                        }}>
                          {s.domains[0]}
                        </span>
                      </div>
                      {/* All domains */}
                      <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', alignItems: 'center', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {s.domains.map(d => (
                          <span key={d} className="badge" style={{
                            background: `${DOMAIN_COLORS[d] ?? '#888'}15`,
                            color: DOMAIN_COLORS[d] ?? '#888',
                            border: `1px solid ${DOMAIN_COLORS[d] ?? '#888'}30`,
                          }}>
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}

                {filtered.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)', fontSize: 16 }}>
                    Aucun scientifique ne correspond
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </ScienceLayout>
  );
}
