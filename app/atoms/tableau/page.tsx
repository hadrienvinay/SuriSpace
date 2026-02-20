'use client'
// pages/atoms/tableau.tsx
import { useState, useMemo } from 'react';
import Link from 'next/link';
import AtomicLayout from '@/components/AtomicLayout';
import { allElements, CATEGORY_COLORS, CATEGORY_LABELS, Element } from '@/data/elements';

// Periodic table grid positions [period, group]
// Standard layout: periods 1-7, groups 1-18
// Lanthanides: row 9 (period 6 lanthanides), Actinides: row 10

function ElementCell({
  element,
  isHighlighted,
  isDimmed,
  onClick,
}: {
  element: Element;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  onClick: (e: Element) => void;
}) {
  const bg = CATEGORY_COLORS[element.category] ?? '#868E96';

  return (
    <button
      onClick={() => onClick(element)}
      title={element.nameFr}
      className="relative group rounded transition-all duration-150 flex flex-col items-center justify-center cursor-pointer select-none"
      style={{
        background: isDimmed ? 'rgba(255,255,255,0.04)' : `${bg}22`,
        borderWidth: 1,
        borderColor: isHighlighted ? bg : (isDimmed ? 'rgba(255,255,255,0.05)' : `${bg}55`),
        borderStyle: 'solid',
        opacity: isDimmed ? 0.3 : 1,
        width: '100%',
        aspectRatio: '1',
        minWidth: 0,
        boxShadow: isHighlighted ? `0 0 8px ${bg}88` : 'none',
      }}
    >
      <span className="text-[7px] sm:text-[9px] text-gray-500 leading-none">{element.number}</span>
      <span className="text-[10px] sm:text-sm font-bold leading-none" style={{ color: isDimmed ? '#666' : bg }}>
        {element.symbol}
      </span>
      <span className="text-[5px] sm:text-[7px] text-gray-400 leading-none truncate w-full text-center px-0.5 hidden sm:block">
        {element.nameFr}
      </span>
    </button>
  );
}

const PERIODS = 7;
const GROUPS = 18;

// Build grid: [period][group] = element
function buildGrid(elements: Element[]): (Element | null)[][] {
  const grid: (Element | null)[][] = Array.from({ length: PERIODS + 3 }, () =>
    Array(GROUPS + 1).fill(null)
  );

  for (const el of elements) {
    if (el.group !== null && el.period <= 7) {
      // Special: lanthanides (period 6, groups 3) and actinides (period 7, groups 3) are put in rows 8/9
      if (el.category === 'lanthanide') {
        const lanthanideOrder = el.number - 57 + 1; // La=1, Ce=2, ...
        if (lanthanideOrder >= 1 && lanthanideOrder <= 15) {
          grid[8][lanthanideOrder + 2] = el;
        }
      } else if (el.category === 'actinide') {
        const actinideOrder = el.number - 89 + 1;
        if (actinideOrder >= 1 && actinideOrder <= 15) {
          grid[9][actinideOrder + 2] = el;
        }
      } else {
        const adjustedGroup = el.group - 1;
        grid[el.period - 1][adjustedGroup] = el;
      }
    } else if (el.group === null) {
      // lanthanide or actinide
      if (el.category === 'lanthanide') {
        const lanthanideOrder = el.number - 57 + 1;
        if (lanthanideOrder >= 1 && lanthanideOrder <= 15) {
          grid[8][lanthanideOrder + 2] = el;
        }
      } else if (el.category === 'actinide') {
        const actinideOrder = el.number - 89 + 1;
        if (actinideOrder >= 1 && actinideOrder <= 15) {
          grid[9][actinideOrder + 2] = el;
        }
      }
    }
  }

  return grid;
}

export default function PeriodicTable() {
  const [selected, setSelected] = useState<Element | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const grid = useMemo(() => buildGrid(allElements), []);

  const searchMatches = useMemo(() => {
    if (!search) return null;
    const s = search.toLowerCase();
    return new Set(
      allElements
        .filter(e =>
          e.symbol.toLowerCase().includes(s) ||
          e.nameFr.toLowerCase().includes(s) ||
          e.name.toLowerCase().includes(s) ||
          String(e.number).includes(s)
        )
        .map(e => e.number)
    );
  }, [search]);

  const isHighlighted = (el: Element) => {
    if (search) return searchMatches?.has(el.number) ?? false;
    if (filterCategory) return el.category === filterCategory;
    return false;
  };

  const isDimmed = (el: Element) => {
    if (search) return !(searchMatches?.has(el.number) ?? true);
    if (filterCategory) return el.category !== filterCategory;
    return false;
  };

  return (
    <AtomicLayout>
      <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Tableau Périodique</h1>
            <p className="text-gray-500 text-sm mt-1">118 éléments • Cliquer pour détails</p>
          </div>
          <div className="sm:ml-auto flex gap-2">
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setFilterCategory(null); }}
              placeholder="Chercher un élément…"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 w-48"
            />
          </div>
        </div>

        {/* Category legend / filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setFilterCategory(filterCategory === key ? null : key); setSearch(''); }}
              className={`px-2 py-1 rounded text-xs font-medium transition-all border ${filterCategory === key ? 'opacity-100 scale-105' : 'opacity-60 hover:opacity-80'}`}
              style={{
                borderColor: CATEGORY_COLORS[key] + '66',
                background: CATEGORY_COLORS[key] + '22',
                color: CATEGORY_COLORS[key],
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="overflow-x-auto pb-2">
          <div style={{ minWidth: 540 }}>
            {/* Groups header */}
            <div className="grid mb-0.5" style={{ gridTemplateColumns: `repeat(${GROUPS}, 1fr)`, gap: '2px' }}>
              {Array.from({ length: GROUPS }, (_, i) => (
                <div key={i} className="text-center text-[7px] text-gray-700 font-mono">
                  {i + 1}
                </div>
              ))}
            </div>

            {grid.map((row, periodIdx) => {
              const isLanthanideRow = periodIdx === 8;
              const isActinideRow = periodIdx === 9;

              return (
                <div key={periodIdx}>
                  {isLanthanideRow && (
                    <div className="h-3" />
                  )}
                  <div className="grid" style={{ gridTemplateColumns: `repeat(${GROUPS}, 1fr)`, gap: '2px', marginBottom: '2px' }}>
                    {row.slice(0, GROUPS).map((el, groupIdx) => (
                      el ? (
                        <ElementCell
                          key={el.number}
                          element={el}
                          isHighlighted={isHighlighted(el)}
                          isDimmed={isDimmed(el)}
                          onClick={setSelected}
                        />
                      ) : (
                        <div key={groupIdx} style={{ aspectRatio: '1' }} />
                      )
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
            onClick={() => setSelected(null)}>
            <div
              className="relative max-w-lg w-full rounded-2xl border p-6 overflow-y-auto max-h-[90vh]"
              style={{
                background: 'rgba(5,10,24,0.97)',
                borderColor: (CATEGORY_COLORS[selected.category] ?? '#666') + '55',
                boxShadow: `0 0 40px ${(CATEGORY_COLORS[selected.category] ?? '#666')}33`,
              }}
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-600 hover:text-white text-xl">✕</button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-20 h-20 rounded-xl flex flex-col items-center justify-center border"
                  style={{
                    background: (CATEGORY_COLORS[selected.category] ?? '#666') + '22',
                    borderColor: (CATEGORY_COLORS[selected.category] ?? '#666') + '55',
                  }}>
                  <span className="text-xs text-gray-500">{selected.number}</span>
                  <span className="text-3xl font-bold" style={{ color: CATEGORY_COLORS[selected.category] ?? '#fff' }}>
                    {selected.symbol}
                  </span>
                  <span className="text-xs text-gray-500 truncate">{selected.nameFr}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selected.nameFr}</h2>
                  <div className="text-sm" style={{ color: CATEGORY_COLORS[selected.category] ?? '#fff' }}>
                    {CATEGORY_LABELS[selected.category]}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Masse: {selected.mass} u/mol · Période {selected.period}, Groupe {selected.group ?? 'f-block'}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">{selected.electronConfig}</div>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed mb-4">{selected.description}</p>

              {/* Data grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: 'Fusion (K)', value: selected.meltingPoint ? `${selected.meltingPoint} K` : '—' },
                  { label: 'Ébullition (K)', value: selected.boilingPoint ? `${selected.boilingPoint} K` : '—' },
                  { label: 'Densité (g/cm³)', value: selected.density ? `${selected.density}` : '—' },
                  { label: 'Électronégativité', value: selected.electronegativity ? `${selected.electronegativity}` : '—' },
                  { label: 'Abondance Univers', value: selected.abundanceUniverse != null ? `${selected.abundanceUniverse} ppm` : 'Artificiel' },
                  { label: 'Abondance Terre', value: selected.abundanceEarth != null ? `${selected.abundanceEarth} ppm` : 'Traces/Artificiel' },
                ].map(d => (
                  <div key={d.label} className="bg-white/5 rounded-lg p-2">
                    <div className="text-[10px] text-gray-600 uppercase tracking-wider">{d.label}</div>
                    <div className="text-sm font-mono text-white">{d.value}</div>
                  </div>
                ))}
              </div>

              {/* Origin */}
              <div className="bg-white/5 rounded-lg p-3 mb-4">
                <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Origine cosmique</div>
                <div className="text-sm text-violet-300">{selected.origin}</div>
              </div>

              {/* Uses */}
              {selected.uses?.length > 0 && (
                <div className="mb-4">
                  <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2">Utilisations</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.uses.map(use => (
                      <span key={use} className="bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-xs text-gray-300">
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Discovery */}
              <div className="text-xs text-gray-600">
                Découvert par {selected.discoveredBy}
                {selected.yearDiscovered ? ` en ${selected.yearDiscovered}` : ' (préhistoire)'}
              </div>

              <Link href={`/atoms/element/${selected.symbol.toLowerCase()}`}
                className="mt-4 block text-center py-2 rounded-lg text-sm font-medium transition-all hover:brightness-110"
                style={{
                  background: (CATEGORY_COLORS[selected.category] ?? '#666') + '33',
                  border: `1px solid ${CATEGORY_COLORS[selected.category] ?? '#666'}55`,
                  color: CATEGORY_COLORS[selected.category] ?? '#fff',
                }}>
                Page complète →
              </Link>
            </div>
          </div>
        )}
      </div>
    </AtomicLayout>
  );
}
