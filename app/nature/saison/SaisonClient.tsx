'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  SeasonalItem, SeasonalCategory,
  CATEGORY_LABELS, CATEGORY_COLORS,
  MONTH_NAMES, MONTH_SHORT,
} from '@/data/seasonal';

const CURRENT_MONTH = new Date().getMonth() + 1;

// ── Nutrition bar ──────────────────────────────────────────────────────────

function NutrBar({ label, value, max, unit, color }: {
  label: string; value?: number; max: number; unit: string; color: string;
}) {
  if (value === undefined || value === null) return null;
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-xs font-mono" style={{ color }}>{value}{unit}</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

// ── Month strip ────────────────────────────────────────────────────────────

function MonthStrip({ months, peakMonths, color }: { months: number[]; peakMonths?: number[]; color: string }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
        const inSeason = months.includes(m);
        const isPeak = peakMonths?.includes(m);
        const isCurrent = m === CURRENT_MONTH;
        return (
          <div
            key={m}
            title={MONTH_NAMES[m]}
            className="flex-1 h-5 rounded-sm relative flex items-center justify-center"
            style={{
              background: inSeason
                ? isPeak ? color : `${color}60`
                : 'rgba(255,255,255,0.05)',
              outline: isCurrent ? `2px solid ${isCurrent && inSeason ? color : 'rgba(255,255,255,0.3)'}` : undefined,
              outlineOffset: isCurrent ? '1px' : undefined,
            }}
          >
            {isCurrent && (
              <span className="text-[8px] font-bold text-white/80 select-none">
                {MONTH_SHORT[m].slice(0, 1)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Compact card ───────────────────────────────────────────────────────────

function ItemCard({ item, selected, onClick }: {
  item: SeasonalItem; selected: boolean; onClick: () => void;
}) {
  const catColor = CATEGORY_COLORS[item.category];
  const inSeasonNow = item.months.includes(CURRENT_MONTH);
  const isPeakNow = item.peakMonths?.includes(CURRENT_MONTH);

  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl border p-4 transition-all duration-200 hover:scale-[1.01] focus:outline-none w-full group"
      style={{
        background: selected ? `${item.color}12` : 'rgba(255,255,255,0.02)',
        borderColor: selected ? `${item.color}50` : 'rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl border shrink-0"
          style={{ background: `${item.color}18`, borderColor: `${item.color}35` }}
        >
          {item.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-white truncate">{item.name}</span>
            {isPeakNow && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                style={{ background: `${item.color}30`, color: item.color }}>
                Pleine saison
              </span>
            )}
            {inSeasonNow && !isPeakNow && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-green-500/15 text-green-400">
                En saison
              </span>
            )}
          </div>
          {item.nameLatin && (
            <div className="text-[10px] text-gray-600 italic truncate">{item.nameLatin}</div>
          )}
          <span className="text-[10px] font-semibold mt-0.5 inline-block" style={{ color: catColor }}>
            {CATEGORY_LABELS[item.category]}
          </span>
        </div>
        <div className="text-right shrink-0">
          <div className="text-sm font-mono font-bold" style={{ color: item.color }}>
            {item.nutrition.calories}
          </div>
          <div className="text-[9px] text-gray-600">kcal/100g</div>
        </div>
      </div>

      {/* Month strip */}
      <MonthStrip months={item.months} peakMonths={item.peakMonths} color={item.color} />
    </button>
  );
}

// ── Detail panel ───────────────────────────────────────────────────────────

function DetailPanel({ item, onClose }: { item: SeasonalItem; onClose: () => void }) {
  const [tab, setTab] = useState<'info' | 'nutrition'>('info');
  const catColor = CATEGORY_COLORS[item.category];
  const inSeasonNow = item.months.includes(CURRENT_MONTH);
  const isPeakNow = item.peakMonths?.includes(CURRENT_MONTH);
  const n = item.nutrition;

  return (
    <div
      className="rounded-2xl border p-5 space-y-4"
      style={{ background: `${item.color}08`, borderColor: `${item.color}30` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border shrink-0"
            style={{ background: `${item.color}20`, borderColor: `${item.color}40` }}
          >
            {item.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{item.name}</h2>
            {item.nameLatin && <p className="text-xs text-gray-500 italic">{item.nameLatin}</p>}
            <div className="flex gap-1.5 mt-1 flex-wrap">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${catColor}20`, color: catColor }}>
                {CATEGORY_LABELS[item.category]}
              </span>
              {isPeakNow && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${item.color}30`, color: item.color }}>Pleine saison</span>}
              {inSeasonNow && !isPeakNow && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">En saison</span>}
              {!inSeasonNow && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-700/40 text-gray-500">Hors saison</span>}
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors text-xl shrink-0 ml-2">×</button>
      </div>

      {/* Season strip */}
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Disponibilité en France</div>
        <MonthStrip months={item.months} peakMonths={item.peakMonths} color={item.color} />
        <div className="flex gap-4 mt-2 text-[10px] text-gray-600">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: item.color }} />
            Pleine saison
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: `${item.color}60` }} />
            Disponible
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm inline-block bg-white/5" />
            Hors saison
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl p-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
        {(['info', 'nutrition'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={tab === t
              ? { background: `${item.color}30`, color: item.color }
              : { color: '#6B7280' }}
          >
            {t === 'info' ? 'Infos & Conseils' : 'Nutrition'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'info' ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>

          {/* Benefits */}
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Bienfaits clés</div>
            <div className="space-y-1.5">
              {item.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                  <span style={{ color: item.color }} className="mt-0.5 shrink-0">✓</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Antioxidants */}
          {n.antioxidants && (
            <div className="rounded-xl p-3" style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: item.color }}>Antioxydants</div>
              <p className="text-sm text-gray-300">{n.antioxidants}</p>
            </div>
          )}

          {/* Storage & tips */}
          <div className="space-y-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Conservation</div>
              <p className="text-sm text-gray-400">{item.storage}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Conseils</div>
              <p className="text-sm text-gray-400">{item.tips}</p>
            </div>
          </div>

          {/* Origin */}
          {item.origin && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span>📍</span>
              <span>{item.origin}</span>
            </div>
          )}

          {/* Link to guide */}
          {item.plantId && (
            <Link
              href={`/nature#${item.plantId}`}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all hover:scale-105 w-full justify-center"
              style={{
                background: 'rgba(34,197,94,0.08)',
                borderColor: 'rgba(34,197,94,0.25)',
                color: '#4ADE80',
              }}
            >
              Guide de culture complet →
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Macro highlight */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Calories', value: n.calories, unit: 'kcal', color: item.color },
              { label: 'Glucides', value: n.carbs, unit: 'g', color: '#60A5FA' },
              { label: 'Protéines', value: n.protein, unit: 'g', color: '#34D399' },
              { label: 'Fibres', value: n.fiber, unit: 'g', color: '#F59E0B' },
            ].map(m => (
              <div key={m.label} className="rounded-xl p-2.5 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-base font-bold font-mono" style={{ color: m.color }}>{m.value}</div>
                <div className="text-[9px] text-gray-500">{m.unit}</div>
                <div className="text-[9px] text-gray-600">{m.label}</div>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-gray-600 text-center">Pour 100g de produit frais</div>

          {/* Vitamins */}
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Vitamines</div>
            <div className="space-y-2">
              <NutrBar label="Vitamine C" value={n.vitaminC} max={90} unit="mg" color="#F59E0B" />
              <NutrBar label="Vitamine A (RE)" value={n.vitaminA} max={900} unit="µg" color="#FB923C" />
              <NutrBar label="Vitamine K" value={n.vitaminK} max={120} unit="µg" color="#A78BFA" />
              <NutrBar label="Folate (B9)" value={n.folate} max={400} unit="µg" color="#34D399" />
            </div>
          </div>

          {/* Minerals */}
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Minéraux</div>
            <div className="space-y-2">
              <NutrBar label="Potassium" value={n.potassium} max={3500} unit="mg" color="#60A5FA" />
              <NutrBar label="Magnésium" value={n.magnesium} max={375} unit="mg" color="#4ADE80" />
              <NutrBar label="Calcium" value={n.calcium} max={1000} unit="mg" color="#F8FAFC" />
              <NutrBar label="Fer" value={n.iron} max={14} unit="mg" color="#EF4444" />
            </div>
          </div>

          {/* Sugar & fat */}
          <div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Sucres & lipides</div>
            <div className="space-y-2">
              <NutrBar label="Sucres" value={n.sugar} max={20} unit="g" color="#F472B6" />
              <NutrBar label="Lipides" value={n.fat} max={10} unit="g" color="#FBBF24" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function SaisonClient({ items }: { items: SeasonalItem[] }) {
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH);
  const [selectedCategory, setSelectedCategory] = useState<SeasonalCategory | 'all'>('all');
  const [selected, setSelected] = useState<SeasonalItem | null>(null);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(item => {
      const matchMonth = item.months.includes(selectedMonth);
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch = !q || item.name.toLowerCase().includes(q) || item.nameLatin?.toLowerCase().includes(q);
      return matchMonth && matchCat && matchSearch;
    });
  }, [items, selectedMonth, selectedCategory, search]);

  // Stats for selected month
  const monthItems = useMemo(() => items.filter(i => i.months.includes(selectedMonth)), [items, selectedMonth]);
  const peakItems = useMemo(() => items.filter(i => i.peakMonths?.includes(selectedMonth)), [items, selectedMonth]);

  const categories: SeasonalCategory[] = ['legume', 'fruit', 'herbe'];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgba(5,8,20,1) 0%, rgba(10,18,10,1) 100%)' }}>
      <div className="max-w-screen-2xl mx-auto px-4 py-8" style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-mono mb-6">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/nature" className="hover:text-white transition-colors">Nature</Link>
          <span>›</span>
          <span className="text-gray-400">Saison</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-2"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              background: 'linear-gradient(135deg, #4ADE80, #FCD34D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Fruits & Légumes de Saison
          </h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Calendrier saisonnier pour la France — mois par mois, avec informations nutritionnelles détaillées.
          </p>
        </div>

        {/* Month selector */}
        <div className="rounded-2xl border border-white/8 p-5 mb-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Mois de saison</h2>
            <div className="text-sm font-semibold" style={{ color: '#4ADE80' }}>
              {monthItems.length} produits · {peakItems.length} en pleine saison
            </div>
          </div>
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
            {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
              const count = items.filter(it => it.months.includes(m)).length;
              const isSelected = m === selectedMonth;
              const isCurrent = m === CURRENT_MONTH;
              return (
                <button
                  key={m}
                  onClick={() => { setSelectedMonth(m); setSelected(null); }}
                  className="rounded-xl py-2.5 px-1 text-center transition-all hover:scale-105 relative"
                  style={{
                    background: isSelected ? 'rgba(74,222,128,0.18)' : 'rgba(255,255,255,0.03)',
                    border: isSelected
                      ? '1px solid rgba(74,222,128,0.5)'
                      : isCurrent
                        ? '1px solid rgba(255,255,255,0.2)'
                        : '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="text-xs font-semibold mb-0.5" style={{ color: isSelected ? '#4ADE80' : isCurrent ? '#fff' : '#6B7280' }}>
                    {MONTH_SHORT[m]}
                  </div>
                  <div className="text-[10px] font-mono" style={{ color: isSelected ? '#86EFAC' : '#4B5563' }}>
                    {count}
                  </div>
                  {isCurrent && !isSelected && (
                    <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-green-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Category */}
          {(['all', ...categories] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
              style={selectedCategory === cat && cat !== 'all'
                ? { background: `${CATEGORY_COLORS[cat]}20`, borderColor: `${CATEGORY_COLORS[cat]}50`, color: CATEGORY_COLORS[cat] }
                : selectedCategory === cat
                  ? { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' }
                  : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: '#6B7280' }}
            >
              {cat === 'all' ? 'Tous' : CATEGORY_LABELS[cat]}
            </button>
          ))}

          {/* Search */}
          <div className="relative ml-auto">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Chercher…"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-600 w-44"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white text-xs">✕</button>
            )}
          </div>

          <span className="text-sm text-gray-600 font-mono">{filtered.length} résultat{filtered.length > 1 ? 's' : ''}</span>
        </div>

        {/* Month badge */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="text-lg font-bold px-4 py-1.5 rounded-xl"
            style={{ background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ADE80' }}
          >
            {MONTH_NAMES[selectedMonth]}
          </div>
          {selectedMonth === CURRENT_MONTH && (
            <span className="text-xs text-gray-500 font-mono">← mois actuel</span>
          )}
        </div>

        {/* Main layout */}
        <div className="flex flex-col xl:flex-row gap-6">

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-gray-600">
                <div className="text-4xl mb-3">🌱</div>
                <div className="text-sm">Aucun produit ne correspond à cette recherche pour {MONTH_NAMES[selectedMonth]}.</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filtered.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    selected={selected?.id === item.id}
                    onClick={() => setSelected(prev => prev?.id === item.id ? null : item)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div className="xl:w-[400px] shrink-0">
            <div className="xl:sticky xl:top-20">
              {selected ? (
                <DetailPanel item={selected} onClose={() => setSelected(null)} />
              ) : (
                <div className="rounded-2xl border border-white/8 p-5 space-y-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Infos saisonnières</h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Cliquez sur un fruit ou légume pour voir ses informations nutritionnelles détaillées, ses bienfaits, ses conseils de conservation et son lien vers le guide de culture si disponible.
                  </p>

                  {/* Month summary */}
                  <div className="space-y-2">
                    {categories.map(cat => {
                      const catItems = monthItems.filter(i => i.category === cat);
                      if (!catItems.length) return null;
                      return (
                        <div key={cat}>
                          <div className="text-xs font-semibold mb-1.5" style={{ color: CATEGORY_COLORS[cat] }}>
                            {CATEGORY_LABELS[cat]} ({catItems.length})
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {catItems.map(item => (
                              <button
                                key={item.id}
                                onClick={() => setSelected(item)}
                                className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all hover:scale-105"
                                style={{
                                  background: item.peakMonths?.includes(selectedMonth) ? `${item.color}20` : 'rgba(255,255,255,0.04)',
                                  border: `1px solid ${item.peakMonths?.includes(selectedMonth) ? `${item.color}40` : 'rgba(255,255,255,0.08)'}`,
                                  color: item.peakMonths?.includes(selectedMonth) ? item.color : '#9CA3AF',
                                }}
                              >
                                <span>{item.icon}</span>
                                <span>{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="border-t border-white/5 pt-3 space-y-1.5 text-xs text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(74,222,128,0.15)', color: '#4ADE80' }}>Pleine saison</span>
                      <span>pic de disponibilité, meilleure qualité</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green-500/15 text-green-400">En saison</span>
                      <span>disponible, qualité correcte</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
