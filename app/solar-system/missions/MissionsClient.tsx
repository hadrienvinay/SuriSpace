'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { Mission } from '@/data/solar-system';
import { TelescopeIcon } from '@/components/UniverseIcons';
import { IcoPin, IcoDocument, IcoFlyby, IcoOrbiter, IcoLander, IcoRover, IcoDish, IcoSampleReturn, IcoAstronaut, IcoGlobeEarth, IcoCheckmark, IcoAgency, IcoTarget, IcoSunStar } from '@/components/SolarIcons';
import { BodyIcon, MissionIcon } from '@/components/SolarBodyIcons';

// ── Types ─────────────────────────────────────────────────────
type BodyStub = { id: string; nameFr: string; color: string };

interface Props {
  missions: Mission[];
  bodies: BodyStub[];
  activeCount: number;
  completedCount: number;
  agencyCount: number;
}

// ── Constants ─────────────────────────────────────────────────
const STATUS_COLORS = {
  active:    { bg: '#052e16', border: '#166534', text: '#4ade80', label: '● ACTIF'     },
  completed: { bg: '#111827', border: '#374151', text: '#9CA3AF', label: '✓ TERMINÉ'   },
  lost:      { bg: '#1f0f0f', border: '#7f1d1d', text: '#f87171', label: '✗ PERDU'     },
  planned:   { bg: '#0c1445', border: '#1e3a8a', text: '#60a5fa', label: '◎ PLANIFIÉ'  },
};

const TYPE_LABELS: Record<string, string> = {
  flyby:           'Survol',
  orbiter:         'Orbiteur',
  lander:          'Atterrisseur',
  rover:           'Rover',
  probe:           'Sonde',
  'sample-return': 'Retour échantillons',
  crewed:          'Avec équipage',
};

type IconFn = (p: { size?: number }) => React.JSX.Element;
const TYPE_ICONS: Record<string, IconFn> = {
  flyby:           IcoFlyby,
  orbiter:         IcoOrbiter,
  lander:          IcoLander,
  rover:           IcoRover,
  probe:           IcoDish,
  'sample-return': IcoSampleReturn,
  crewed:          IcoAstronaut,
};

const AGENCY_FLAGS: Record<string, string> = {
  NASA: '🇺🇸', ESA: '🇪🇺', 'NASA/ESA': '🇺🇸🇪🇺',
  JAXA: '🇯🇵', CNSA: '🇨🇳', 'ESA/JAXA': '🇪🇺🇯🇵',
  'NASA/ESA/CSA': '🇺🇸🇪🇺🇨🇦',
};

export default function MissionsClient({ missions, bodies, activeCount, completedCount, agencyCount }: Props) {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType,   setFilterType]   = useState<string | null>(null);
  const [filterTarget, setFilterTarget] = useState<string | null>(null);
  const [search,       setSearch]       = useState('');
  const [expandedId,   setExpandedId]   = useState<string | null>(null);

  const filtered = useMemo(() => {
    return missions.filter(m => {
      if (filterStatus && m.status !== filterStatus) return false;
      if (filterType   && m.type   !== filterType)   return false;
      if (filterTarget && !m.target.includes(filterTarget)) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!m.name.toLowerCase().includes(s) &&
            !m.agency.toLowerCase().includes(s) &&
            !m.description.toLowerCase().includes(s)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (b.status === 'active' && a.status !== 'active') return 1;
      return b.launched.localeCompare(a.launched);
    });
  }, [missions, filterStatus, filterType, filterTarget, search]);

  return (
    <>
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Actives',      count: activeCount,    color: '#4ade80', Icon: IcoDish       },
          { label: 'Terminées',    count: completedCount, color: '#9CA3AF', Icon: IcoCheckmark  },
          { label: 'Agences',      count: agencyCount,    color: '#60A5FA', Icon: IcoAgency     },
          { label: 'Destinations', count: bodies.length,  color: '#F472B6', Icon: IcoTarget     },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center">
            <div className="mb-1 flex justify-center" style={{ color: s.color }}><s.Icon size={22} /></div>
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
            <div className="text-xs text-gray-600 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher…"
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-600 w-40"
        />
        {(['active', 'completed'] as const).map(s => {
          const sc = STATUS_COLORS[s];
          return (
            <button key={s} onClick={() => setFilterStatus(filterStatus === s ? null : s)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all ${filterStatus === s ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-75'}`}
              style={{ background: sc.bg, borderColor: sc.border, color: sc.text }}>
              {sc.label}
            </button>
          );
        })}
        {['rover', 'orbiter', 'flyby', 'crewed'].map(t => (
          <button key={t} onClick={() => setFilterType(filterType === t ? null : t)}
            className={`px-2.5 py-1.5 rounded-lg text-xs border transition-all ${filterType === t ? 'border-blue-600/60 bg-blue-900/30 text-blue-300' : 'border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'}`}>
            {TYPE_LABELS[t]}
          </button>
        ))}
        {(filterStatus || filterType || filterTarget || search) && (
          <button onClick={() => { setFilterStatus(null); setFilterType(null); setFilterTarget(null); setSearch(''); }}
            className="px-2.5 py-1.5 rounded-lg text-xs border border-white/10 text-gray-600 hover:text-white transition-all">
            ✕ Reset
          </button>
        )}
      </div>

      <div className="text-xs text-gray-600 font-mono mb-4">{filtered.length} missions affichées</div>

      {/* Mission cards */}
      <div className="space-y-3">
        {filtered.map(m => {
          const sc = STATUS_COLORS[m.status];
          const isExpanded = expandedId === m.id;
          const targetBodies = m.target.map(id => bodies.find(b => b.id === id)).filter(Boolean);

          return (
            <div key={m.id}
              className="rounded-2xl border overflow-hidden transition-all"
              style={{ background: 'rgba(2,8,23,0.8)', borderColor: isExpanded ? `${m.color}40` : 'rgba(255,255,255,0.06)' }}>

              <button
                className="w-full text-left p-4 flex items-start gap-3 hover:bg-white/3 transition-all"
                onClick={() => setExpandedId(isExpanded ? null : m.id)}>
                <MissionIcon type={m.type} name={m.name} size={24} color={m.color} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-base font-bold text-white">{m.name}</span>
                    <span className="px-1.5 py-0.5 rounded text-xs font-mono"
                      style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}>
                      {sc.label}
                    </span>
                    <span className="text-xs text-gray-600 font-mono">
                      {AGENCY_FLAGS[m.agency] ?? <IcoGlobeEarth size={12} />} {m.agency} · {m.launched.slice(0, 4)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border border-white/10 text-gray-500">
                      {TYPE_ICONS[m.type] && (() => { const I = TYPE_ICONS[m.type]; return <I size={11} />; })()}
                      {TYPE_LABELS[m.type]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">{m.description}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {targetBodies.map(tb => tb && (
                      <span key={tb.id} className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded"
                        style={{ background: `${tb.color}20`, color: tb.color, border: `1px solid ${tb.color}30` }}>
                        <BodyIcon color={tb.color} size={14} /> {tb.nameFr}
                      </span>
                    ))}
                    {m.currentLocation && m.status === 'active' && (
                      <span className="inline-flex items-center gap-1 text-xs text-green-500 font-mono"><IcoPin size={11} />{m.currentLocation}</span>
                    )}
                  </div>
                </div>
                <span className="text-gray-600 text-xs shrink-0 mt-1">{isExpanded ? '▲' : '▼'}</span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t" style={{ borderColor: `${m.color}15` }}>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 mt-4">
                    <div className="bg-white/4 rounded-lg p-2">
                      <div className="text-xs text-gray-600 uppercase tracking-wider">Lancement</div>
                      <div className="text-xs font-mono text-white">{m.launched}</div>
                    </div>
                    {m.arrived && (
                      <div className="bg-white/4 rounded-lg p-2">
                        <div className="text-xs text-gray-600 uppercase tracking-wider">Arrivée</div>
                        <div className="text-xs font-mono text-white">{m.arrived}</div>
                      </div>
                    )}
                    {m.ended && (
                      <div className="bg-white/4 rounded-lg p-2">
                        <div className="text-xs text-gray-600 uppercase tracking-wider">Fin</div>
                        <div className="text-xs font-mono text-white">{m.ended}</div>
                      </div>
                    )}
                    {m.distanceFromSun && (
                      <div className="bg-white/4 rounded-lg p-2">
                        <div className="inline-flex items-center gap-1 text-xs text-gray-600 uppercase tracking-wider"><IcoSunStar size={11} />Distance</div>
                        <div className="text-xs font-mono text-white">{m.distanceFromSun} UA</div>
                      </div>
                    )}
                  </div>

                  {m.keyDiscoveries && m.keyDiscoveries.length > 0 && (
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-600 mb-2">⭐ Découvertes / Faits clés</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {m.keyDiscoveries.map((d, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-xs mt-0.5 shrink-0" style={{ color: m.color }}>◆</span>
                            <span className="text-xs text-gray-300">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2 flex-wrap items-center">
                    <Link href={`/solar-system/missions/${m.id}`}
                      className="text-sm px-3.5 py-2 rounded-lg font-semibold border transition-all hover:brightness-110"
                      style={{ background: `${m.color}20`, borderColor: `${m.color}45`, color: m.color }}>
                      <span className="inline-flex items-center gap-1.5"><IcoDocument size={12} /> Page mission →</span>
                    </Link>
                    {targetBodies.map(tb => tb && (
                      <Link key={tb.id} href={`/solar-system/${tb.id}`}
                        className="text-xs px-2.5 py-1.5 rounded-lg border transition-all hover:brightness-110"
                        style={{ background: `${tb.color}12`, borderColor: `${tb.color}28`, color: tb.color }}>
                        <span className="inline-flex items-center gap-1"><BodyIcon color={tb.color} size={12} />{tb.nameFr}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-600">
          <div className="mb-3 flex justify-center opacity-30"><TelescopeIcon size={56} /></div>
          <p>Aucune mission ne correspond aux filtres</p>
        </div>
      )}
    </>
  );
}
