// pages/solar-system/bodys/[id].tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import { solarSystem, getMoons, getMissionsForTarget } from '@/data/solar-system';
import { IcoMoon, IcoWind, IcoLayers, IcoMap } from '@/components/SolarIcons';
import { RocketIcon } from '@/components/SpaceIcons';
import { MissionIcon } from '@/components/SolarBodyIcons';

const BODY_TYPE_LABELS: Record<string, string> = {
  star: 'étoile', planet: 'planète', 'dwarf-planet': 'planète naine', moon: 'lune', asteroid: 'astéroïde',
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const body = solarSystem.find(b => b.id === id);
  if (!body) return { title: 'Corps céleste introuvable' };

  const typeLabel = BODY_TYPE_LABELS[body.type] ?? body.type;
  return {
    title: `${body.nameFr} — ${typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)}`,
    description: `${body.nameFr} (${body.name}) : rayon ${body.radius} km, masse ${body.mass}×10²⁴ kg. Caractéristiques physiques et orbitales complètes.`,
    alternates: { canonical: `/solar-system/bodys/${id}` },
  };
}

function CompositionBar({ label, percent, color }: { label: string; percent: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-[14px] mb-0.5">
          <span className="text-gray-400 truncate">{label}</span>
          <span className="text-gray-500 font-mono shrink-0 ml-2">{percent.toFixed(1)}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded overflow-hidden">
          <div className="h-full rounded" style={{ width: `${percent}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}

export default async function BodyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id)

  //const bodyData = getBody((id as string)?.toLowerCase());
  const bodyData = solarSystem.find(b => b.id === id)
  if (!bodyData) {
    return (
      <SolarLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="flex justify-center mb-4 text-gray-600"><IcoMoon size={64} /></div>
            <p className="text-gray-500">Corps céleste introuvable</p>
            <Link href="/solar-system/bodys" className="text-blue-400 underline mt-3 block">
              Retour aux corps du système solaire
            </Link>
          </div>
        </div>
      </SolarLayout>
    );
  }

  const bodyMoons = getMoons(bodyData.id);
  const bodyMissions = getMissionsForTarget(bodyData.id);
  const color = bodyData.color;

  // Get next/prev body
  const allMainBodies = solarSystem.filter(b => b.type !== 'moon');
  const idx = allMainBodies.findIndex(b => b.id === bodyData.id);
  const prev = allMainBodies[idx - 1];
  const next = allMainBodies[idx + 1];

  return (
    <SolarLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/solar-system" className="hover:text-white transition-colors">Espace</Link>
          <span>›</span>
          <Link href="/solar-system/carte" className="hover:text-white transition-colors">Système solaire</Link>
          <span>›</span>
          <Link href="/solar-system/bodys" className="hover:text-white transition-colors">Corps du système solaire</Link>
          {bodyData.parent && (
            <>
              <span>›</span>
              <Link href={`/solar-system/bodys/${bodyData.parent}`} className="hover:text-white transition-colors capitalize">
                {bodyData.parent}
              </Link>
            </>
          )}
          <span>›</span>
          <span style={{ color }}>{bodyData.nameFr}</span>
        </div>

        {/* Hero header */}
        <div className="relative rounded-3xl border overflow-hidden mb-6 p-6 sm:p-8"
          style={{
            borderColor: `${color}30`,
            background: `radial-gradient(ellipse at 30% 40%, ${color}12, rgba(2,8,23,0.97))`,
          }}>
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${color}15, transparent 70%)`, transform: 'translate(40%, -40%)' }} />

          <div className="relative flex flex-col sm:flex-row items-start gap-6">
            {/* Planet visual */}
            <div className="shrink-0">
              {/* SVG planet with gradient */}
              <svg width={100} height={120} className="mx-auto">
                <defs>
                  <radialGradient id="hero-grad" cx="35%" cy="30%" r="65%">
                    {bodyData.colorGradient?.map((c, i) => (
                      <stop key={i} offset={`${(i / (bodyData.colorGradient!.length - 1)) * 100}%`} stopColor={c} />
                    )) ?? <stop offset="0%" stopColor={color} />}
                  </radialGradient>
                  <filter id="hero-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {bodyData.id === 'saturn' && (
                  <ellipse cx={50} cy={52} rx={42} ry={10}
                    fill="none" stroke={color} strokeOpacity={0.5} strokeWidth={4} />
                )}
                <circle cx={50} cy={50} r={bodyData.type === 'star' ? 38 : 30}
                  fill="url(#hero-grad)"
                  filter={bodyData.type === 'star' ? 'url(#hero-glow)' : undefined} />
                {bodyData.rings && bodyData.id !== 'saturn' && (
                  <ellipse cx={50} cy={52} rx={38} ry={8}
                    fill="none" stroke={color} strokeOpacity={0.3} strokeWidth={2.5} />
                )}
              </svg>
            </div>

            <div className="flex-1">
              <div className="text-[11px] uppercase tracking-widest font-mono mb-1" style={{ color }}>
                {bodyData.type === 'star' ? 'Étoile' :
                 bodyData.type === 'planet' ? 'Planète' :
                 bodyData.type === 'dwarf-planet' ? 'Planète naine' :
                 bodyData.type === 'moon' ? 'Satellite naturel' : ''}
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-1"
                style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {bodyData.nameFr}
              </h1>
              <p className="text-gray-500 text-md mb-4 font-mono">{bodyData.name}</p>
              <p className="text-gray-300 text-md leading-relaxed max-w-xl">{bodyData.description}</p>

              {/* Quick orbital info */}
              {bodyData.semiMajorAxis && (
                <div className="flex gap-4 mt-4 text-s font-mono">
                  {bodyData.type === 'moon' ? (
                    <>
                      <div><span className="text-gray-600">Distance parent:</span> <span className="text-white">{(bodyData.semiMajorAxis / 1000).toFixed(0)}k km</span></div>
                      <div><span className="text-gray-600">Période:</span> <span className="text-white">{bodyData.orbitalPeriod?.toFixed(2)} j</span></div>
                    </>
                  ) : (
                    <>
                      <div><span className="text-gray-600">Distance Soleil:</span> <span className="text-white">{bodyData.semiMajorAxis} UA</span></div>
                      <div><span className="text-gray-600">Période orbitale:</span> <span className="text-white">
                        {bodyData.orbitalPeriod! > 400 ? `${(bodyData.orbitalPeriod! / 365.25).toFixed(1)} ans` : `${bodyData.orbitalPeriod?.toFixed(1)} j`}
                      </span></div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Rayon', value: bodyData.radius >= 10000 ? `${(bodyData.radius / 1000).toFixed(1)}k km` : `${bodyData.radius.toLocaleString()} km` },
            { label: 'Masse', value: `${bodyData.mass} ×10²⁴ kg` },
            { label: 'Densité', value: bodyData.density ? `${bodyData.density} g/cm³` : '—' },
            { label: 'Gravité surf.', value: bodyData.gravity ? `${bodyData.gravity} m/s²` : '—' },
            { label: 'Vitesse échap.', value: bodyData.escapeVelocity ? `${bodyData.escapeVelocity} km/s` : '—' },
            { label: 'Rotation', value: bodyData.rotationPeriod ? `${Math.abs(bodyData.rotationPeriod).toFixed(1)}h${bodyData.rotationPeriod < 0 ? ' ↺' : ''}` : '—' },
            { label: 'Inclinaison axe', value: bodyData.axialTilt !== undefined ? `${bodyData.axialTilt}°` : '—' },
            { label: 'Temp. moy.', value: bodyData.tempMean ? `${bodyData.tempMean} K (${(bodyData.tempMean - 273.15).toFixed(0)} °C)` : '—' },
            ...(bodyData.tempMin ? [{ label: 'Temp. min', value: `${bodyData.tempMin} K (${(bodyData.tempMin - 273.15).toFixed(0)} °C)` }] : []),
            ...(bodyData.tempMax ? [{ label: 'Temp. max', value: `${bodyData.tempMax} K (${(bodyData.tempMax - 273.15).toFixed(0)} °C)` }] : []),
            ...(bodyData.atmospherePressure !== undefined ? [{ label: 'Pression atm.', value: `${bodyData.atmospherePressure} bar` }] : []),
            ...(bodyData.eccentricity !== undefined ? [{ label: 'Excentricité', value: `${bodyData.eccentricity}` }] : []),
          ].map(stat => (
            <div key={stat.label} className="bg-white/4 rounded-xl border border-white/6 p-3">
              <div className="text-[12px] uppercase tracking-wider text-gray-600 mb-1">{stat.label}</div>
              <div className="text-s font-mono text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Atmosphere */}
          {bodyData.atmosphereComposition && bodyData.atmosphereComposition.length > 0 && (
            <div className="rounded-2xl border border-white/8 p-4 bg-white/2">
              <h2 className="text-[14px] uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-1.5"><IcoWind size={13} /> Composition atmosphérique</h2>
              <div className="space-y-2">
                {bodyData.atmosphereComposition.map(a => (
                  <CompositionBar key={a.element} label={a.element} percent={a.percent} color={color} />
                ))}
              </div>
            </div>
          )}

          {/* Body composition */}
          {bodyData.composition && bodyData.composition.length > 0 && (
            <div className="rounded-2xl border border-white/8 p-4 bg-white/2">
              <h2 className="text-[14px] uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-1.5"><IcoLayers size={13} /> Structure interne</h2>
              <div className="space-y-2">
                {bodyData.composition.map(c => (
                  <CompositionBar key={c.material} label={c.material} percent={c.percent} color={color + 'AA'} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        {bodyData.features && bodyData.features.length > 0 && (
          <div className="rounded-2xl border border-white/8 p-5 mb-6 bg-white/2">
            <h2 className="text-[14px] uppercase tracking-widest text-gray-500 mb-3">Caractéristiques notables</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {bodyData.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[14px] mt-0.5 shrink-0" style={{ color }}>◆</span>
                  <span className="text-md text-gray-300">{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Moons */}
        {bodyMoons.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[14px] uppercase tracking-widest text-gray-500 mb-3">Principaux satellites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bodyMoons.map(moon => (
                <Link key={moon.id} href={`/solar-system/bodys/${moon.id}`}
                  className="group rounded-xl border border-white/8 p-4 bg-white/2 hover:bg-white/5 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full shrink-0 border-2"
                      style={{ background: moon.color, borderColor: moon.color + '60' }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-md font-bold text-white group-hover:underline">{moon.nameFr}</div>
                      <div className="text-[12px] text-gray-600 font-mono">
                        {moon.radius} km · {moon.orbitalPeriod?.toFixed(2)} j
                      </div>
                      <div className="text-[12px] text-gray-500 truncate mt-0.5">
                        {moon.description.slice(0, 60)}…
                      </div>
                    </div>
                    <span className="text-gray-600 group-hover:text-white text-xs">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Missions */}
        {bodyMissions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-[14px] uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-1.5"><RocketIcon size={13} /> Missions ({bodyMissions.length})</h2>
            <div className="space-y-2">
              {bodyMissions.map(m => (
                <a key={m.id} href={`/solar-system/missions/${m.id}`}
                  className="rounded-xl border border-white/8 p-3 bg-white/2 flex items-start gap-3">
                  <MissionIcon type={m.type} name={m.name} size={20} color={m.color} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-md font-bold text-white">{m.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[14px] font-mono ${
                        m.status === 'active' ? 'bg-green-900/40 text-green-400 border border-green-700/40' :
                        m.status === 'completed' ? 'bg-gray-900/40 text-gray-500 border border-gray-700/40' :
                        'bg-red-900/40 text-red-400 border border-red-700/40'
                      }`}>
                        {m.status === 'active' ? '● ACTIF' : m.status === 'completed' ? '✓ TERMINÉ' : '✗ PERDU'}
                      </span>
                      <span className="text-[12px] text-gray-600">{m.country} {m.agency}</span>
                    </div>
                    <p className="text-[14px] text-gray-500 mt-0.5 line-clamp-2">{m.description}</p>
                    <div className="text-[12px] text-gray-700 font-mono mt-0.5">
                      Lancé: {m.launched.slice(0, 4)}
                      {m.arrived && ` · Arrivé: ${m.arrived.slice(0, 4)}`}
                      {m.ended && ` · Fin: ${m.ended.slice(0, 4)}`}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Discovery */}
        {bodyData.discoveredBy && (
          <div className="text-xs text-gray-600 font-mono mb-8">
            Découvert par {bodyData.discoveredBy}{bodyData.yearDiscovered ? ` — ${bodyData.yearDiscovered}` : ''}
          </div>
        )}

        {/* Prev/Next navigation */}
        <div className="flex justify-between items-center border-t border-white/8 pt-6">
          {prev ? (
            <Link href={`/solar-system/bodys/${prev.id}`}
              className="flex items-center gap-2 group rounded-xl border border-white/8 bg-white/3 px-4 py-3 hover:bg-white/8 transition-all">
              <div className="w-5 h-5 rounded-full shrink-0" style={{ background: prev.color }} />
              <div>
                <div className="text-[12px] text-gray-600">← Précédent</div>
                <div className="text-md text-white font-bold">{prev.nameFr}</div>
              </div>
            </Link>
          ) : <div />}

          <Link href="/solar-system"
            className="text-gray-600 hover:text-white transition-colors font-mono flex items-center gap-1.5 text-[14px]">
            <IcoMap size={13} /> Carte
          </Link>

          {next ? (
            <Link href={`/solar-system/bodys/${next.id}`}
              className="flex items-center gap-2 text-right group rounded-xl border border-white/8 bg-white/3 px-4 py-3 hover:bg-white/8 transition-all">
              <div>
                <div className="text-[12px] text-gray-600">Suivant →</div>
                <div className="text-md text-white font-bold">{next.nameFr}</div>
              </div>
              <div className="w-5 h-5 rounded-full shrink-0" style={{ background: next.color }} />
            </Link>
          ) : <div />}
        </div>
      </div>
    </SolarLayout>
  );
}

