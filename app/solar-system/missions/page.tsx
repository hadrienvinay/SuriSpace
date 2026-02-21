// pages/solar-system/missions.tsx
'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import { missions, solarSystem } from '@/data/solar-system';

const STATUS_COLORS = {
  active: { bg: '#052e16', border: '#166534', text: '#4ade80', label: '● ACTIF' },
  completed: { bg: '#111827', border: '#374151', text: '#9CA3AF', label: '✓ TERMINÉ' },
  lost: { bg: '#1f0f0f', border: '#7f1d1d', text: '#f87171', label: '✗ PERDU' },
  planned: { bg: '#0c1445', border: '#1e3a8a', text: '#60a5fa', label: '◎ PLANIFIÉ' },
};

const TYPE_LABELS: Record<string, string> = {
  flyby: '✈️ Survol',
  orbiter: '🔄 Orbiteur',
  lander: '🛬 Atterrisseur',
  rover: '🤖 Rover',
  probe: '📡 Sonde',
  'sample-return': '🧪 Retour échantillons',
  crewed: '👨‍🚀 Avec équipage',
};

const AGENCY_FLAGS: Record<string, string> = {
  NASA: '🇺🇸',
  ESA: '🇪🇺',
  'NASA/ESA': '🇺🇸🇪🇺',
  JAXA: '🇯🇵',
  CNSA: '🇨🇳',
  'ESA/JAXA': '🇪🇺🇯🇵',
  'NASA/ESA/CSA': '🇺🇸🇪🇺🇨🇦',
};

export default function Missions() {
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterTarget, setFilterTarget] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allTargets = useMemo(() => {
    const ids = new Set<string>();
    missions.forEach(m => m.target.forEach(t => ids.add(t)));
    return [...ids].map(id => solarSystem.find(b => b.id === id)).filter(Boolean);
  }, []);

  const filtered = useMemo(() => {
    return missions.filter(m => {
      if (filterStatus && m.status !== filterStatus) return false;
      if (filterType && m.type !== filterType) return false;
      if (filterTarget && !m.target.includes(filterTarget)) return false;
      if (search) {
        const s = search.toLowerCase();
        if (!m.name.toLowerCase().includes(s) &&
            !m.agency.toLowerCase().includes(s) &&
            !m.description.toLowerCase().includes(s)) return false;
      }
      return true;
    }).sort((a, b) => {
      // Active first, then by year descending
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (b.status === 'active' && a.status !== 'active') return 1;
      return b.launched.localeCompare(a.launched);
    });
  }, [filterStatus, filterType, filterTarget, search]);

  const activeCount = missions.filter(m => m.status === 'active').length;
  const completedCount = missions.filter(m => m.status === 'completed').length;

  return (
    <SolarLayout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Missions & Sondes Spatiales
          </h1>
          <p className="text-gray-500 text-base font-mono">
            {activeCount} missions actives · {completedCount} terminées · {missions.length} au total
          </p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Actives', count: activeCount, color: '#4ade80', icon: '🛸' },
            { label: 'Terminées', count: completedCount, color: '#9CA3AF', icon: '✅' },
            { label: 'Agences', count: new Set(missions.map(m => m.agency)).size, color: '#60A5FA', icon: '🏛️' },
            { label: 'Destinations', count: allTargets.length, color: '#F472B6', icon: '🎯' },
          ].map(s => (
            <div key={s.label} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher…"
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-blue-600 w-40"
          />

          {/* Status filter */}
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

          {/* Type filter */}
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

        {/* Results count */}
        <div className="text-xs text-gray-600 font-mono mb-4">{filtered.length} missions affichées</div>

        {/* Mission cards */}
        <div className="space-y-3">
          {filtered.map(m => {
            const sc = STATUS_COLORS[m.status];
            const isExpanded = expandedId === m.id;
            const targetBodies = m.target.map(id => solarSystem.find(b => b.id === id)).filter(Boolean);

            return (
              <div key={m.id}
                className="rounded-2xl border overflow-hidden transition-all"
                style={{
                  background: `rgba(2,8,23,0.8)`,
                  borderColor: isExpanded ? `${m.color}40` : 'rgba(255,255,255,0.06)',
                }}>
                {/* Mission header */}
                <button
                  className="w-full text-left p-4 flex items-start gap-3 hover:bg-white/3 transition-all"
                  onClick={() => setExpandedId(isExpanded ? null : m.id)}>
                  <span className="text-2xl shrink-0">{m.emoji}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-base font-bold text-white">{m.name}</span>
                      <span className="px-1.5 py-0.5 rounded text-xs font-mono"
                        style={{ background: sc.bg, borderColor: sc.border, border: '1px solid', color: sc.text }}>
                        {sc.label}
                      </span>
                      <span className="text-xs text-gray-600 font-mono">
                        {AGENCY_FLAGS[m.agency] ?? '🌍'} {m.agency} · {m.launched.slice(0, 4)}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded border border-white/10 text-gray-500">
                        {TYPE_LABELS[m.type]}
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 line-clamp-2">{m.description}</p>

                    <div className="flex gap-2 mt-2 flex-wrap">
                      {targetBodies.map(tb => tb && (
                        <span key={tb.id} className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded"
                          style={{ background: `${tb.color}20`, color: tb.color, border: `1px solid ${tb.color}30` }}>
                          <span>{tb.emoji}</span> {tb.nameFr}
                        </span>
                      ))}
                      {m.currentLocation && m.status === 'active' && (
                        <span className="text-xs text-green-500 font-mono">📍 {m.currentLocation}</span>
                      )}
                    </div>
                  </div>

                  <span className="text-gray-600 text-xs shrink-0 mt-1">
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </button>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-0 border-t border-white/5"
                    style={{ borderColor: `${m.color}15` }}>
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
                          <div className="text-xs text-gray-600 uppercase tracking-wider">Distance ☀️</div>
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
                        style={{
                          background: `${m.color}20`,
                          borderColor: `${m.color}45`,
                          color: m.color,
                        }}>
                        📄 Page mission →
                      </Link>
                      {targetBodies.map(tb => tb && (
                        <Link key={tb.id} href={`/solar-system/${tb.id}`}
                          className="text-xs px-2.5 py-1.5 rounded-lg border transition-all hover:brightness-110"
                          style={{
                            background: `${tb.color}12`,
                            borderColor: `${tb.color}28`,
                            color: tb.color,
                          }}>
                          {tb.emoji} {tb.nameFr}
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
            <p className="text-4xl mb-3">🔭</p>
            <p>Aucune mission ne correspond aux filtres</p>
          </div>
        )}
      </div>
    </SolarLayout>
  );
}
