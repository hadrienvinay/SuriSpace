// pages/atoms/element/[symbol].tsx
import Link from 'next/link';
import AtomicLayout from '@/components/AtomicLayout';
import { allElements, CATEGORY_COLORS, CATEGORY_LABELS } from '@/data/elements';

// Simple Bohr atom visualizer via SVG
function BohrAtom({ element, color }: { element: typeof allElements[0]; color: string }) {
  const shells = getShells(element.number);
  const maxElectrons = Math.max(...shells);
  const svgSize = 200;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  return (
    <svg width={svgSize} height={svgSize} className="mx-auto">
      {/* Nucleus */}
      <circle cx={cx} cy={cy} r={12} fill={color} opacity={0.9} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">
        {element.symbol}
      </text>

      {/* Electron shells */}
      {shells.map((count, shellIdx) => {
        const shellRadius = 22 + (shellIdx + 1) * 22;
        if (shellRadius > svgSize / 2 - 8) return null;

        return (
          <g key={shellIdx}>
            <circle cx={cx} cy={cy} r={shellRadius} fill="none" stroke={color} strokeOpacity={0.2} strokeWidth={0.5} strokeDasharray="2 3" />
            {Array.from({ length: count }, (_, eIdx) => {
              const angle = (eIdx / count) * 2 * Math.PI - Math.PI / 2;
              const ex = cx + shellRadius * Math.cos(angle);
              const ey = cy + shellRadius * Math.sin(angle);
              return (
                <circle key={eIdx} cx={ex} cy={ey} r={2.5} fill={color} opacity={0.8} />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function getShells(atomicNumber: number): number[] {
  // Simplified shell filling
  const shellMaxes = [2, 8, 18, 32, 32, 18, 8];
  const shells: number[] = [];
  let remaining = atomicNumber;
  for (const max of shellMaxes) {
    if (remaining <= 0) break;
    const fill = Math.min(remaining, max);
    shells.push(fill);
    remaining -= fill;
  }
  return shells;
}

export  default async function ElementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id)

  const element = allElements.find(
    e => e.symbol.toLowerCase() === (id as string)?.toLowerCase()
  );

  if (!element) {
    return (
      <AtomicLayout>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-500 text-6xl mb-4">?</p>
          <p className="text-white">Élément non trouvé</p>
          <Link href="/atoms/tableau" className="text-violet-400 underline mt-4 block">
            Retour au tableau périodique
          </Link>
        </div>
      </AtomicLayout>
    );
  }

  const color = CATEGORY_COLORS[element.category] ?? '#888';
  const prev = allElements.find(e => e.number === element.number - 1);
  const next = allElements.find(e => e.number === element.number + 1);

  return (
    <AtomicLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-6">
          <Link href="/atoms/tableau" className="hover:text-white transition-colors">Tableau périodique</Link>
          <span>›</span>
          <span style={{ color }}>{element.nameFr}</span>
        </div>

        {/* Header card */}
        <div className="rounded-2xl border p-6 sm:p-8 mb-6"
          style={{
            background: `${color}0A`,
            borderColor: `${color}33`,
            boxShadow: `0 0 40px ${color}15`,
          }}>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Big symbol + Bohr model */}
            <div className="flex-shrink-0 text-center">
              <div className="w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center mb-3"
                style={{ borderColor: color, background: `${color}15` }}>
                <span className="text-[10px] text-gray-500">{element.number}</span>
                <span className="text-4xl font-bold" style={{ color }}>{element.symbol}</span>
                <span className="text-[10px] text-gray-500">{element.mass}</span>
              </div>
              <BohrAtom element={element} color={color} />
            </div>

            <div className="flex-1">
              <div className="text-sm mb-1" style={{ color }}>{CATEGORY_LABELS[element.category]}</div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">{element.nameFr}</h1>
              <p className="text-gray-500 text-sm mb-1 font-mono">{element.name}</p>
              <p className="text-gray-500 text-xs mb-4 font-mono">{element.electronConfig}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{element.description}</p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Numéro atomique', value: element.number.toString() },
            { label: 'Masse atomique', value: `${element.mass} u` },
            { label: 'Période', value: element.period.toString() },
            { label: 'Groupe', value: element.group?.toString() ?? 'f-block' },
            { label: 'Bloc', value: element.block },
            { label: 'Électronégativité', value: element.electronegativity?.toString() ?? '—' },
            { label: 'Point de fusion', value: element.meltingPoint ? `${element.meltingPoint} K\n(${(element.meltingPoint - 273.15).toFixed(1)} °C)` : '—' },
            { label: 'Point d\'ébullition', value: element.boilingPoint ? `${element.boilingPoint} K\n(${(element.boilingPoint - 273.15).toFixed(1)} °C)` : '—' },
            { label: 'Densité', value: element.density ? `${element.density} g/cm³` : '—' },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl bg-white/5 border border-white/8 p-3">
              <div className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">{stat.label}</div>
              <div className="text-sm font-mono text-white whitespace-pre-line">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Abundance + Origin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border p-4" style={{ borderColor: '#A78BFA33', background: '#A78BFA08' }}>
            <div className="text-[10px] uppercase tracking-wider text-violet-500 mb-2">Abondance</div>
            <div className="space-y-2">
              <div>
                <div className="text-[10px] text-gray-600 mb-1">🌌 Univers</div>
                <div className="font-mono text-sm text-white">
                  {element.abundanceUniverse != null ? `${element.abundanceUniverse} ppm` : 'Artificiel / Traces'}
                </div>
                {element.abundanceUniverse && (
                  <div className="mt-1 h-1 bg-white/5 rounded overflow-hidden">
                    <div className="h-full rounded" style={{
                      width: `${Math.min(100, (element.abundanceUniverse / 739000) * 100)}%`,
                      background: '#A78BFA',
                    }} />
                  </div>
                )}
              </div>
              <div>
                <div className="text-[10px] text-gray-600 mb-1">🌍 Croûte Terrestre</div>
                <div className="font-mono text-sm text-white">
                  {element.abundanceEarth != null ? `${element.abundanceEarth} ppm` : 'Artificiel / Traces'}
                </div>
                {element.abundanceEarth && (
                  <div className="mt-1 h-1 bg-white/5 rounded overflow-hidden">
                    <div className="h-full rounded" style={{
                      width: `${Math.min(100, (element.abundanceEarth / 461000) * 100)}%`,
                      background: '#34D399',
                    }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: '#FB923C33', background: '#FB923C08' }}>
            <div className="text-[10px] uppercase tracking-wider text-orange-400 mb-2">Origine Cosmique</div>
            <p className="text-sm text-gray-300">{element.origin}</p>
            <div className="mt-3 text-[10px] text-gray-600">
              Découvert par {element.discoveredBy}
              {element.yearDiscovered ? ` — ${element.yearDiscovered}` : ' (Antiquité/Préhistoire)'}
            </div>
          </div>
        </div>

        {/* Uses */}
        {element.uses?.length > 0 && (
          <div className="rounded-xl border border-white/10 p-5 mb-6">
            <div className="text-[10px] uppercase tracking-wider text-gray-600 mb-3">Utilisations principales</div>
            <div className="flex flex-wrap gap-2">
              {element.uses.map(use => (
                <span key={use} className="px-3 py-1.5 rounded-lg text-sm border border-white/10 bg-white/5 text-gray-300">
                  {use}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation between elements */}
        <div className="flex justify-between items-center mt-8">
          {prev ? (
            <Link href={`/atoms/element/${prev.symbol.toLowerCase()}`}
              className="flex items-center gap-3 group rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-all">
              <div>
                <div className="text-[10px] text-gray-600">← Précédent</div>
                <div className="font-mono font-bold" style={{ color: CATEGORY_COLORS[prev.category] }}>{prev.symbol}</div>
                <div className="text-xs text-gray-500">{prev.nameFr}</div>
              </div>
            </Link>
          ) : <div />}

          <Link href="/atoms/tableau"
            className="text-xs text-gray-600 hover:text-white transition-colors">
            Tableau complet
          </Link>

          {next ? (
            <Link href={`/atoms/element/${next.symbol.toLowerCase()}`}
              className="flex items-center gap-3 text-right group rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-all">
              <div>
                <div className="text-[10px] text-gray-600">Suivant →</div>
                <div className="font-mono font-bold" style={{ color: CATEGORY_COLORS[next.category] }}>{next.symbol}</div>
                <div className="text-xs text-gray-500">{next.nameFr}</div>
              </div>
            </Link>
          ) : <div />}
        </div>
      </div>
    </AtomicLayout>
  );
}


