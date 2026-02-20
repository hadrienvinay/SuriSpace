'use client'
// pages/atoms/abondance.tsx
import { useState } from 'react';
import AtomicLayout from '@/components/AtomicLayout';
import { allElements, CATEGORY_COLORS } from '@/data/elements';

const universeTop = allElements
  .filter(e => e.abundanceUniverse != null && e.abundanceUniverse! > 0)
  .sort((a, b) => (b.abundanceUniverse ?? 0) - (a.abundanceUniverse ?? 0))
  .slice(0, 12);

const earthTop = allElements
  .filter(e => e.abundanceEarth != null && e.abundanceEarth! > 0)
  .sort((a, b) => (b.abundanceEarth ?? 0) - (a.abundanceEarth ?? 0))
  .slice(0, 12);

// Pie slices for top 6 universe (H, He dominate)
const universeTopPie = universeTop.slice(0, 7);
const universeTotal = universeTopPie.reduce((s, e) => s + (e.abundanceUniverse ?? 0), 0);

const earthTopPie = earthTop.slice(0, 7);
const earthTotal = earthTopPie.reduce((s, e) => s + (e.abundanceEarth ?? 0), 0);

function BarChart({
  data,
  valueKey,
  maxValue,
  unit,
  colorFn,
}: {
  data: typeof universeTop;
  valueKey: 'abundanceUniverse' | 'abundanceEarth';
  maxValue: number;
  unit: string;
  colorFn: (el: typeof data[0]) => string;
}) {
  const [tooltip, setTooltip] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {data.map(el => {
        const value = (el[valueKey] ?? 0);
        const pct = (value / maxValue) * 100;
        const color = colorFn(el);
        const formattedValue = value >= 1000
          ? `${(value / 1000).toFixed(1)}k ppm`
          : `${value} ppm`;

        return (
          <div key={el.number}
            className="group relative"
            onMouseEnter={() => setTooltip(el.number.toString())}
            onMouseLeave={() => setTooltip(null)}>
            <div className="flex items-center gap-3">
              <div className="w-8 text-right font-mono font-bold text-sm flex-shrink-0"
                style={{ color }}>
                {el.symbol}
              </div>
              <div className="flex-1 relative h-7 bg-white/5 rounded overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded transition-all duration-500"
                  style={{
                    width: `${Math.max(pct, 1)}%`,
                    background: `linear-gradient(to right, ${color}AA, ${color})`,
                  }}
                />
                <div className="absolute inset-0 flex items-center px-2">
                  <span className="text-xs text-white/80 font-mono">{formattedValue}</span>
                </div>
              </div>
              <div className="w-16 text-right text-xs text-gray-600 flex-shrink-0">
                {pct.toFixed(1)}%
              </div>
            </div>
            {tooltip === el.number.toString() && (
              <div className="absolute left-12 -top-8 z-10 bg-gray-900 border border-white/20 rounded px-2 py-1 text-xs text-white whitespace-nowrap">
                {el.nameFr} — {formattedValue} par masse
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DonutChart({ data, total, colorFn }: {
  data: typeof universeTop;
  total: number;
  colorFn: (el: typeof data[0]) => string;
}) {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const inner = 40;

  let cumAngle = -Math.PI / 2;
  const slices = data.map(el => {
    const frac = (el.abundanceUniverse ?? el.abundanceEarth ?? 0) / total;
    const angle = frac * 2 * Math.PI;
    const startAngle = cumAngle;
    cumAngle += angle;
    return { el, frac, startAngle, endAngle: cumAngle };
  });

  const arc = (startAngle: number, endAngle: number, r: number, inner: number) => {
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const ix1 = cx + inner * Math.cos(endAngle);
    const iy1 = cy + inner * Math.sin(endAngle);
    const ix2 = cx + inner * Math.cos(startAngle);
    const iy2 = cy + inner * Math.sin(startAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${inner} ${inner} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;
  };

  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} className="overflow-visible">
        {slices.map(({ el, startAngle, endAngle, frac }) => {
          const color = colorFn(el);
          const isHovered = hovered === el.symbol;
          const midAngle = (startAngle + endAngle) / 2;
          const scale = isHovered ? 1.05 : 1;
          const tx = isHovered ? Math.cos(midAngle) * 5 : 0;
          const ty = isHovered ? Math.sin(midAngle) * 5 : 0;
          return (
            <path
              key={el.symbol}
              d={arc(startAngle, endAngle, r, inner)}
              fill={color}
              opacity={isHovered ? 1 : 0.8}
              style={{ transition: 'all 0.2s', transform: `translate(${tx}px, ${ty}px)`, cursor: 'pointer' }}
              onMouseEnter={() => setHovered(el.symbol)}
              onMouseLeave={() => setHovered(null)}
            >
              <title>{el.nameFr}: {(frac * 100).toFixed(2)}%</title>
            </path>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full max-w-xs">
        {slices.map(({ el, frac }) => (
          <div key={el.symbol} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm flex-shrink-0"
              style={{ background: colorFn(el) }} />
            <span className="text-xs text-gray-400 truncate">
              {el.symbol} <span className="text-gray-600">{(frac * 100).toFixed(1)}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const universeColorFn = (el: typeof universeTop[0]) => CATEGORY_COLORS[el.category] ?? '#666';
const earthColorFn = (el: typeof earthTop[0]) => CATEGORY_COLORS[el.category] ?? '#666';

export default function Abondance() {
  const [view, setView] = useState<'universe' | 'earth' | 'compare'>('universe');

  return (
    <AtomicLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Abondance des Éléments</h1>
          <p className="text-gray-500 text-sm">Distribution en ppm (parties par million de masse)</p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'universe', label: '🌌 Univers', color: '#A78BFA' },
            { id: 'earth', label: '🌍 Croûte Terrestre', color: '#34D399' },
            { id: 'compare', label: '🔀 Comparaison', color: '#FB923C' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${view === tab.id ? '' : 'opacity-50 hover:opacity-70'}`}
              style={{
                background: view === tab.id ? `${tab.color}22` : 'rgba(255,255,255,0.03)',
                borderColor: view === tab.id ? `${tab.color}55` : 'rgba(255,255,255,0.08)',
                color: view === tab.id ? tab.color : '#9CA3AF',
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {view === 'universe' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">Abondance dans l'Univers</h2>
              <BarChart data={universeTop} valueKey="abundanceUniverse" maxValue={universeTop[0].abundanceUniverse ?? 1} unit="ppm" colorFn={universeColorFn} />
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-gray-400">
                  <span className="text-violet-300 font-bold">H et He</span> représentent ensemble environ{' '}
                  <span className="text-white">98% de la masse de l'univers</span>.
                  L'hydrogène seul (739 000 ppm) domine la composition cosmique — il est le
                  carburant des étoiles et le point de départ de toute la chimie stellaire.
                </p>
              </div>
            </div>
            <DonutChart data={universeTopPie} total={universeTotal} colorFn={universeColorFn} />
          </div>
        )}

        {view === 'earth' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-4">Abondance dans la Croûte Terrestre</h2>
              <BarChart data={earthTop} valueKey="abundanceEarth" maxValue={earthTop[0].abundanceEarth ?? 1} unit="ppm" colorFn={earthColorFn} />
              <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-gray-400">
                  Sur Terre, <span className="text-emerald-300 font-bold">l'oxygène</span> domine la croûte terrestre (461 000 ppm) —
                  principalement sous forme de silicates, oxydes et carbonates. L'hydrogène,
                  si abondant dans l'univers, est ici moins représenté car il s'échappe facilement.
                </p>
              </div>
            </div>
            <DonutChart data={earthTopPie} total={earthTotal} colorFn={earthColorFn} />
          </div>
        )}

        {view === 'compare' && (
          <div className="space-y-6">
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">Comparaison Univers vs Terre (log scale)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Interesting contrasts */}
              {[
                { symbol: 'H', univers: 739000, terre: 1500, note: 'L\'H fuit l\'atmosphère terrestre' },
                { symbol: 'He', univers: 240000, terre: 0.008, note: 'Hélium presque absent sur Terre' },
                { symbol: 'O', univers: 10400, terre: 461000, note: 'L\'O domine les roches terrestres' },
                { symbol: 'Fe', univers: 1090, terre: 56300, note: 'Le Fe se concentre dans le noyau' },
                { symbol: 'Si', univers: 650, terre: 282000, note: 'Si: base des minéraux terrestres' },
                { symbol: 'C', univers: 4600, terre: 200, note: 'Le C s\'échappe en CO₂ ou rejoint la biosphère' },
                { symbol: 'Au', univers: 0.0006, terre: 0.004, note: 'L\'or concentré par impacts météoritiques' },
                { symbol: 'Ar', univers: 153, terre: 3500, note: 'Ar terrestre vient de la radioactivité K-40' },
              ].map(d => {
                const el = allElements.find(e => e.symbol === d.symbol);
                if (!el) return null;
                const color = CATEGORY_COLORS[el.category] ?? '#666';
                const maxVal = Math.max(d.univers, d.terre);
                const uPct = (Math.log10(d.univers + 1) / Math.log10(maxVal + 1)) * 100;
                const ePct = (Math.log10(d.terre + 1) / Math.log10(maxVal + 1)) * 100;
                return (
                  <div key={d.symbol} className="rounded-xl border border-white/10 p-4 bg-white/3">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold font-mono" style={{ color }}>{d.symbol}</span>
                      <span className="text-xs text-gray-500">{el.nameFr}</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-600 w-16 flex-shrink-0">🌌 Univers</span>
                        <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden">
                          <div className="h-full rounded" style={{ width: `${uPct}%`, background: '#A78BFA' }} />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 w-20 text-right">{d.univers} ppm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-600 w-16 flex-shrink-0">🌍 Terre</span>
                        <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden">
                          <div className="h-full rounded" style={{ width: `${ePct}%`, background: '#34D399' }} />
                        </div>
                        <span className="text-[10px] font-mono text-gray-500 w-20 text-right">{d.terre} ppm</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-600 mt-2 italic">{d.note}</p>
                  </div>
                );
              })}
            </div>
            <div className="p-5 rounded-xl border border-orange-500/20 bg-orange-500/5">
              <h3 className="text-sm font-bold text-orange-300 mb-2">Pourquoi ces différences?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                La Terre n'est pas un échantillon représentatif de l'univers. Elle s'est formée par
                accrétion de poussières et roches dans la nébuleuse solaire — les gaz légers (H, He)
                ont été soufflés par le vent solaire. Le fer lourd a coulé vers le noyau.
                La radioactivité de K-40 a enrichi l'atmosphère en argon. La vie a transformé
                l'oxygène libre. Chaque planète est une version filtrée et transformée de la
                composition cosmique originelle.
              </p>
            </div>
          </div>
        )}
      </div>
    </AtomicLayout>
  );
}
