'use client';
// app/sciences/constantes/page.tsx
import { useState } from 'react';
import Link from 'next/link';
import ScienceLayout from '@/components/ScienceLayout';
import {
  PHYSICS_CONSTANTS,
  SI_BASE_UNITS,
  SI_DERIVED_UNITS,
  type PhysicsConstant,
} from '@/data/physics';
import { scientists } from '@/data/scientists';

const CATEGORY_LABELS: Record<PhysicsConstant['category'], string> = {
  fondamentale: 'Fondamentale',
  electromag:   'Électromagnétisme',
  thermo:       'Thermodynamique',
  mecanique:    'Mécanique',
};

const CATEGORY_COLORS: Record<PhysicsConstant['category'], string> = {
  fondamentale: '#A78BFA',
  electromag:   '#FB923C',
  thermo:       '#F472B6',
  mecanique:    '#60A5FA',
};

export default function ConstantesPage() {
  const [activeTab, setActiveTab] = useState<'constantes' | 'unites'>('constantes');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<PhysicsConstant | null>(null);
  const [catFilter, setCatFilter] = useState<PhysicsConstant['category'] | 'all'>('all');

  const filtered = PHYSICS_CONSTANTS.filter(c => {
    const q = search.toLowerCase();
    const matchesSearch = !q || c.nameFr.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q);
    const matchesCat = catFilter === 'all' || c.category === catFilter;
    return matchesSearch && matchesCat;
  });

  const linkedScientists = selected?.scientistIds
    ?.map(id => scientists.find(s => s.id === id))
    .filter(Boolean) ?? [];

  return (
    <ScienceLayout>
      <div className="max-w-screen-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/sciences" className="hover:text-white transition-colors">Sciences</Link>
          <span>›</span>
          <span className="text-gray-400">Constantes</span>
        </div>

        {/* ── Header ── */}
        <div className="mb-6">
          <h1
            className="text-4xl font-bold text-white mb-1"
            style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}
          >
            Constantes & Unités
          </h1>
          <p className="text-base text-gray-500">
            {PHYSICS_CONSTANTS.length} constantes physiques · 7 unités SI de base · {SI_DERIVED_UNITS.length} unités dérivées
          </p>
        </div>

        {/* ── Top tabs ── */}
        <div className="flex gap-2 mb-6">
          {([
            { id: 'constantes', label: 'Constantes physiques', icon: '∞' },
            { id: 'unites',     label: 'Unités SI',            icon: '📐' },
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelected(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-900/40 text-indigo-200 border-indigo-700/50 scale-105'
                  : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
              }`}
            >
              <span className="font-mono">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════ CONSTANTES TAB ══════════════ */}
        {activeTab === 'constantes' && (
          <div className="flex flex-col xl:flex-row gap-6">

            {/* Left: grid */}
            <div className="flex-1 min-w-0">
              {/* Search + category filters */}
              <div className="flex flex-wrap gap-3 mb-5 items-center">
                <div className="relative">
                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Chercher une constante…"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-600 w-52"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white text-xs"
                    >✕</button>
                  )}
                </div>

                {(['all', 'fondamentale', 'electromag', 'thermo', 'mecanique'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCatFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      catFilter === cat
                        ? 'text-white border-white/30 scale-105'
                        : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
                    }`}
                    style={catFilter === cat && cat !== 'all'
                      ? { background: `${CATEGORY_COLORS[cat]}20`, borderColor: `${CATEGORY_COLORS[cat]}50`, color: CATEGORY_COLORS[cat] }
                      : catFilter === cat ? { background: 'rgba(255,255,255,0.08)' } : {}}
                  >
                    {cat === 'all' ? '∞ Toutes' : CATEGORY_LABELS[cat]}
                  </button>
                ))}

                <span className="text-sm text-gray-600 font-mono ml-auto">{filtered.length} constante{filtered.length > 1 ? 's' : ''}</span>
              </div>

              {/* Constants grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map(c => {
                  const isSel = selected?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelected(prev => prev?.id === c.id ? null : c)}
                      className="text-left rounded-2xl border p-4 transition-all duration-200 hover:scale-[1.01] focus:outline-none"
                      style={{
                        background: isSel ? `${c.color}10` : 'rgba(255,255,255,0.02)',
                        borderColor: isSel ? `${c.color}50` : 'rgba(255,255,255,0.07)',
                      }}
                    >
                      {/* Symbol + category badge */}
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold border shrink-0"
                          style={{
                            fontFamily: "'Courier New', monospace",
                            background: `${c.color}15`,
                            borderColor: `${c.color}35`,
                            color: c.color,
                          }}
                        >
                          {c.symbol}
                        </div>
                        <div className="text-right">
                          <span
                            className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{
                              background: `${CATEGORY_COLORS[c.category]}18`,
                              color: CATEGORY_COLORS[c.category],
                            }}
                          >
                            {CATEGORY_LABELS[c.category]}
                          </span>
                          {c.exact && (
                            <div className="text-xs text-emerald-500/80 font-semibold mt-1">exacte</div>
                          )}
                        </div>
                      </div>

                      {/* Name */}
                      <div className="text-sm font-semibold text-white mb-2">{c.nameFr}</div>

                      {/* Value */}
                      <div className="rounded-lg px-3 py-2 mb-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div
                          className="text-sm font-bold font-mono"
                          style={{ color: c.color }}
                        >
                          {c.value}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">{c.unit}</div>
                      </div>

                      {/* Year */}
                      {c.year && (
                        <div className="text-xs text-gray-600 font-mono">{c.year}</div>
                      )}
                    </button>
                  );
                })}
              </div>

              {filtered.length === 0 && (
                <div className="text-center py-16 text-gray-600">
                  <div className="text-4xl mb-2">∅</div>
                  Aucune constante ne correspond.
                </div>
              )}
            </div>

            {/* Right: detail panel */}
            <div className="xl:w-[360px] shrink-0">
              <div className="xl:sticky xl:top-20 space-y-4">
                {selected ? (
                  <div
                    className="rounded-2xl border p-5"
                    style={{ background: `${selected.color}0C`, borderColor: `${selected.color}40` }}
                  >
                    {/* Symbol hero */}
                    <div
                      className="rounded-xl py-8 text-center mb-5"
                      style={{ background: `${selected.color}18` }}
                    >
                      <div
                        className="text-5xl font-bold mb-1"
                        style={{
                          fontFamily: "'Courier New', monospace",
                          color: selected.color,
                          textShadow: `0 0 30px ${selected.color}55`,
                        }}
                      >
                        {selected.symbol}
                      </div>
                      {selected.exact && (
                        <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">valeur exacte</div>
                      )}
                    </div>

                    {/* Name */}
                    <h2 className="text-xl font-bold text-white mb-3">{selected.nameFr}</h2>

                    {/* Value box */}
                    <div
                      className="rounded-xl p-4 mb-4"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Valeur</div>
                      <div
                        className="text-lg font-bold font-mono"
                        style={{ color: selected.color }}
                      >
                        {selected.value}
                      </div>
                      <div className="text-sm text-gray-400 font-mono">{selected.unit}</div>
                    </div>

                    {/* Meta */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ background: `${CATEGORY_COLORS[selected.category]}20`, color: CATEGORY_COLORS[selected.category] }}
                      >
                        {CATEGORY_LABELS[selected.category]}
                      </span>
                      {selected.year && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/6 text-gray-400">
                          {selected.year}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-4">{selected.description}</p>

                    {/* Linked scientists */}
                    {linkedScientists.length > 0 && (
                      <div>
                        <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Scientifiques associés</div>
                        {linkedScientists.map(s => s && (
                          <Link
                            key={s.id}
                            href={`/sciences/scientists/${s.id}`}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-white/6 transition-all group"
                          >
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border"
                              style={{ background: `${s.color}18`, borderColor: `${s.color}40` }}
                            >
                              {s.emoji}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white group-hover:underline">{s.name}</div>
                              <div className="text-xs text-gray-500">{s.domains[0]}</div>
                            </div>
                            <span className="ml-auto text-gray-600 text-xs">→</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <h2 className="text-base font-bold text-gray-300 mb-3 uppercase tracking-wider">Constantes physiques</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">
                      Les constantes fondamentales définissent la structure même de l'univers. Depuis 2019,
                      le Système International les utilise pour redéfinir les unités de base.
                    </p>
                    <div className="space-y-2">
                      {(['fondamentale', 'electromag', 'thermo', 'mecanique'] as const).map(cat => (
                        <button
                          key={cat}
                          onClick={() => { setCatFilter(cat); setSearch(''); }}
                          className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/6 transition-all text-left"
                        >
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CATEGORY_COLORS[cat] }} />
                          <span className="text-sm text-gray-400 hover:text-white transition-colors">
                            {CATEGORY_LABELS[cat]}
                          </span>
                          <span className="ml-auto text-xs font-mono text-gray-600">
                            {PHYSICS_CONSTANTS.filter(c => c.category === cat).length}
                          </span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/8">
                      <Link
                        href="/sciences/formules"
                        className="block text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-indigo-700/40 text-indigo-400 hover:bg-indigo-900/20 transition-all"
                      >
                        ∑ Formules physiques
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ UNITÉS SI TAB ══════════════ */}
        {activeTab === 'unites' && (
          <div className="space-y-10">

            {/* 7 base units */}
            <section>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-1 h-7 rounded-full shrink-0 bg-indigo-500" />
                <h2 className="text-xl font-bold text-white">7 unités de base du Système International</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Depuis 2019, toutes les unités SI sont définies à partir de constantes physiques exactes — plus aucune dépend d'un artefact matériel.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {SI_BASE_UNITS.map((u) => (
                  <div
                    key={u.symbol}
                    className="rounded-2xl border p-5"
                    style={{
                      background: `${u.color}08`,
                      borderColor: `${u.color}30`,
                    }}
                  >
                    {/* Symbol + icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold border shrink-0"
                        style={{
                          fontFamily: "'Courier New', monospace",
                          background: `${u.color}18`,
                          borderColor: `${u.color}40`,
                          color: u.color,
                        }}
                      >
                        {u.symbol}
                      </div>
                      <div>
                        <div className="text-base">{u.icon}</div>
                        <div
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color: u.color }}
                        >
                          {u.quantityFr}
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="text-base font-bold text-white mb-2">{u.nameFr}</div>

                    {/* Definition */}
                    <p className="text-xs text-gray-500 leading-relaxed">{u.definition}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Derived units table */}
            <section>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-1 h-7 rounded-full shrink-0 bg-cyan-500" />
                <h2 className="text-xl font-bold text-white">Unités dérivées nommées</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
                <span className="text-sm text-gray-600 font-mono">{SI_DERIVED_UNITS.length}</span>
              </div>
              <p className="text-sm text-gray-500 mb-5">
                Les unités dérivées sont des combinaisons des 7 unités de base. Beaucoup portent le nom d'un physicien ayant travaillé dans le domaine.
              </p>

              <div className="rounded-2xl border border-white/8 overflow-hidden">
                {/* Table header */}
                <div
                  className="grid grid-cols-4 gap-0 px-4 py-2.5 text-xs uppercase tracking-wider text-gray-500 border-b border-white/6"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <div>Symbole · Nom</div>
                  <div>Grandeur</div>
                  <div>En unités de base</div>
                  <div>Nommée après</div>
                </div>

                {SI_DERIVED_UNITS.map((u, i) => (
                  <div
                    key={u.symbol}
                    className={`grid grid-cols-4 gap-0 px-4 py-3 border-b border-white/4 hover:bg-white/3 transition-colors ${
                      i === SI_DERIVED_UNITS.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    {/* Symbol + name */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 border"
                        style={{
                          fontFamily: "'Courier New', monospace",
                          background: `${u.color}15`,
                          borderColor: `${u.color}35`,
                          color: u.color,
                        }}
                      >
                        {u.symbol}
                      </div>
                      <span className="text-sm text-gray-300">{u.name}</span>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400">{u.quantity}</span>
                    </div>

                    {/* In base units */}
                    <div className="flex items-center">
                      <code
                        className="text-xs font-mono text-gray-500 bg-white/4 px-2 py-0.5 rounded"
                      >
                        {u.inBase}
                      </code>
                    </div>

                    {/* Named after */}
                    <div className="flex items-center">
                      {u.namedAfter ? (
                        <span className="text-xs text-gray-500 italic">{u.namedAfter}</span>
                      ) : (
                        <span className="text-xs text-gray-700">—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Prefixes reference */}
            <section>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-1 h-7 rounded-full shrink-0 bg-violet-500" />
                <h2 className="text-xl font-bold text-white">Préfixes SI</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-violet-500/30 to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {[
                  { prefix: 'Y', name: 'yotta', power: '10²⁴', color: '#A78BFA' },
                  { prefix: 'Z', name: 'zetta', power: '10²¹', color: '#818CF8' },
                  { prefix: 'E', name: 'exa',   power: '10¹⁸', color: '#60A5FA' },
                  { prefix: 'P', name: 'peta',  power: '10¹⁵', color: '#34D399' },
                  { prefix: 'T', name: 'téra',  power: '10¹²', color: '#22D3EE' },
                  { prefix: 'G', name: 'giga',  power: '10⁹',  color: '#F59E0B' },
                  { prefix: 'M', name: 'méga',  power: '10⁶',  color: '#FB923C' },
                  { prefix: 'k', name: 'kilo',  power: '10³',  color: '#F472B6' },
                  { prefix: 'm', name: 'milli', power: '10⁻³', color: '#F472B6' },
                  { prefix: 'μ', name: 'micro', power: '10⁻⁶', color: '#FB923C' },
                  { prefix: 'n', name: 'nano',  power: '10⁻⁹', color: '#F59E0B' },
                  { prefix: 'p', name: 'pico',  power: '10⁻¹²',color: '#22D3EE' },
                  { prefix: 'f', name: 'femto', power: '10⁻¹⁵',color: '#34D399' },
                  { prefix: 'a', name: 'atto',  power: '10⁻¹⁸',color: '#60A5FA' },
                  { prefix: 'z', name: 'zepto', power: '10⁻²¹',color: '#818CF8' },
                  { prefix: 'y', name: 'yocto', power: '10⁻²⁴',color: '#A78BFA' },
                ].map(p => (
                  <div
                    key={p.prefix}
                    className="rounded-xl border p-3 text-center"
                    style={{ background: `${p.color}08`, borderColor: `${p.color}25` }}
                  >
                    <div
                      className="text-lg font-bold font-mono mb-0.5"
                      style={{ color: p.color }}
                    >
                      {p.prefix}
                    </div>
                    <div className="text-xs text-gray-400">{p.name}</div>
                    <div className="text-xs font-mono text-gray-600">{p.power}</div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}
      </div>
    </ScienceLayout>
  );
}
