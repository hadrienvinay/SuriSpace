// pages/solar-system/missions/[id].tsx
import Link from 'next/link';
import SolarLayout from '@/components/SolarLayout';
import { missions, solarSystem } from '@/data/solar-system';

const STATUS_STYLES = {
  active: { bg: '#052e16', border: '#166534', text: '#4ade80', label: '● MISSION ACTIVE' },
  completed: { bg: '#111827', border: '#374151', text: '#9CA3AF', label: '✓ MISSION TERMINÉE' },
  lost: { bg: '#1f0f0f', border: '#7f1d1d', text: '#f87171', label: '✗ CONTACT PERDU' },
  planned: { bg: '#0c1445', border: '#1e3a8a', text: '#60a5fa', label: '◎ PLANIFIÉE' },
};

const TYPE_LABELS: Record<string, string> = {
  flyby: '✈️ Survol',
  orbiter: '🔄 Orbiteur',
  lander: '🛬 Atterrisseur',
  rover: '🤖 Rover',
  probe: '📡 Sonde',
  'sample-return': '🧪 Retour d\'échantillons',
  crewed: '👨‍🚀 Équipage humain',
};

export default async function MissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const mission = missions.find(m => m.id === id);

  if (!mission) {
    return (
      <SolarLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-5xl mb-4">🔭</p>
            <p className="text-gray-400 text-lg">Mission introuvable</p>
            <Link href="/solar-system/missions" className="text-blue-400 underline mt-3 block text-base">
              Retour à la liste des missions
            </Link>
          </div>
        </div>
      </SolarLayout>
    );
  }

  const sc = STATUS_STYLES[mission.status];
  const targetBodies = mission.target.map(t => solarSystem.find(b => b.id === t)).filter(Boolean);

  // Adjacent missions
  const missionIdx = missions.findIndex(m => m.id === mission.id);
  const prevMission = missions[missionIdx - 1];
  const nextMission = missions[missionIdx + 1];

  // Timeline events
  const timelineEvents = [
    { date: mission.launched, label: '🚀 Lancement', desc: `Lancé depuis la Terre le ${mission.launched}` },
    ...(mission.arrived ? [{ date: mission.arrived, label: '🎯 Arrivée', desc: `Arrivée à destination le ${mission.arrived}` }] : []),
    ...(mission.ended ? [{ date: mission.ended, label: mission.status === 'lost' ? '📡 Perte de signal' : '✅ Fin de mission', desc: mission.status === 'lost' ? 'Contact perdu' : `Mission terminée le ${mission.ended}` }] : []),
    ...(mission.status === 'active' && !mission.ended ? [{ date: 'Aujourd\'hui', label: '● En cours', desc: mission.currentLocation ?? 'Mission active' }] : []),
  ];

  return (
    <SolarLayout>
      <div className="max-w-4xl mx-auto px-5 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-mono mb-8">
          <Link href="/solar-system/missions" className="hover:text-white transition-colors">🚀 Missions</Link>
          <span>›</span>
          <span style={{ color: mission.color }}>{mission.name}</span>
        </div>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="relative rounded-3xl border overflow-hidden mb-8 p-7 sm:p-10"
          style={{
            borderColor: `${mission.color}30`,
            background: `radial-gradient(ellipse at 20% 50%, ${mission.color}14, rgba(2,8,23,0.98))`,
          }}>
          {/* Deco glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-60"
            style={{ background: `radial-gradient(circle, ${mission.color}12, transparent 70%)`, transform: 'translate(30%,-30%)' }} />

          <div className="relative flex flex-col sm:flex-row items-start gap-6">
            {/* Big emoji */}
            <div className="shrink-0 text-6xl sm:text-8xl" style={{ filter: `drop-shadow(0 0 20px ${mission.color}60)` }}>
              {mission.emoji}
            </div>

            <div className="flex-1">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold mb-3"
                style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}>
                {sc.label}
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 leading-tight"
                style={{ fontFamily: "'Exo 2', sans-serif" }}>
                {mission.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
                <span className="text-gray-400">
                  {mission.country} <span className="text-white font-semibold">{mission.agency}</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg border border-white/10 text-gray-400">
                  {TYPE_LABELS[mission.type]}
                </span>
                <span className="text-gray-500 font-mono">Lancé le {mission.launched}</span>
              </div>

              <p className="text-base text-gray-300 leading-relaxed max-w-2xl">{mission.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

          {/* ── Key data ────────────────────────────────────────── */}
          <div className="rounded-2xl border border-white/8 p-5 bg-white/2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Données de mission</h2>
            <div className="space-y-3">
              {[
                { icon: '📅', label: 'Lancement', value: mission.launched },
                ...(mission.arrived ? [{ icon: '🎯', label: 'Arrivée', value: mission.arrived }] : []),
                ...(mission.ended ? [{ icon: '🏁', label: 'Fin', value: mission.ended }] : []),
                { icon: '🏛️', label: 'Agence', value: `${mission.country} ${mission.agency}` },
                { icon: '🔭', label: 'Type', value: TYPE_LABELS[mission.type] },
                ...(mission.distanceFromSun ? [{ icon: '☀️', label: 'Distance Soleil', value: `${mission.distanceFromSun} UA (${(mission.distanceFromSun * 149.6).toFixed(0)} M km)` }] : []),
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-600 uppercase tracking-wide">{item.label}</div>
                    <div className="text-sm font-semibold text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Target bodies ────────────────────────────────────── */}
          <div className="rounded-2xl border border-white/8 p-5 bg-white/2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Destinations & Cibles</h2>
            <div className="space-y-2.5">
              {targetBodies.map(tb => tb && (
                <Link key={tb.id} href={`/solar-system/bodys/${tb.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl border border-white/8 hover:bg-white/6 transition-all group">
                  <div className="w-8 h-8 rounded-full shrink-0"
                    style={{ background: `radial-gradient(circle at 35% 35%, ${tb.colorGradient?.[0] ?? tb.color}, ${tb.color})` }} />
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white group-hover:underline">{tb.nameFr}</div>
                    <div className="text-xs text-gray-500 capitalize">{tb.type}</div>
                  </div>
                  <span className="text-gray-600 group-hover:text-white text-sm">→</span>
                </Link>
              ))}
            </div>

            {mission.currentLocation && (
              <div className="mt-4 p-3 rounded-xl bg-green-950/40 border border-green-800/30">
                <div className="text-xs text-green-600 uppercase tracking-wide mb-1">📍 Localisation actuelle</div>
                <div className="text-sm text-green-300 font-medium">{mission.currentLocation}</div>
              </div>
            )}
          </div>
        </div>

        {/* ── Timeline ────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/8 p-5 bg-white/2 mb-8">
          <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-5">Chronologie</h2>
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px" style={{ background: `linear-gradient(to bottom, ${mission.color}80, transparent)` }} />
            <div className="space-y-4">
              {timelineEvents.map((ev, i) => (
                <div key={i} className="flex items-start gap-4 pl-2">
                  <div className="w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 z-10"
                    style={{ borderColor: mission.color, background: i === timelineEvents.length - 1 ? mission.color : 'rgba(2,8,23,1)', boxShadow: i === timelineEvents.length - 1 ? `0 0 8px ${mission.color}60` : 'none' }} />
                  <div className="flex-1 pb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-base font-bold text-white">{ev.label}</span>
                      <span className="text-xs font-mono text-gray-500">{ev.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-0.5">{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Key Discoveries ─────────────────────────────────────── */}
        {mission.keyDiscoveries && mission.keyDiscoveries.length > 0 && (
          <div className="rounded-2xl border p-6 mb-8"
            style={{ borderColor: `${mission.color}30`, background: `${mission.color}08` }}>
            <h2 className="text-base font-bold text-white mb-5">⭐ Découvertes & Faits marquants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mission.keyDiscoveries.map((d, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                  <span className="text-base shrink-0 mt-0.5" style={{ color: mission.color }}>◆</span>
                  <span className="text-sm text-gray-200 leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Back + prev/next ────────────────────────────────────── */}
        <div className="flex justify-between items-center pt-4 border-t border-white/8">
          {prevMission ? (
            <Link href={`/solar-system/missions/${prevMission.id}`}
              className="flex items-center gap-3 group rounded-xl border border-white/8 bg-white/3 px-5 py-3 hover:bg-white/7 transition-all">
              <span className="text-xl">{prevMission.emoji}</span>
              <div>
                <div className="text-xs text-gray-600">← Précédent</div>
                <div className="text-sm font-bold text-white group-hover:underline">{prevMission.name}</div>
              </div>
            </Link>
          ) : <div />}

          <Link href="/solar-system/missions"
            className="text-sm text-gray-500 hover:text-white transition-colors font-mono px-3">
            🚀 Toutes les missions
          </Link>

          {nextMission ? (
            <Link href={`/solar-system/missions/${nextMission.id}`}
              className="flex items-center gap-3 text-right group rounded-xl border border-white/8 bg-white/3 px-5 py-3 hover:bg-white/7 transition-all">
              <div>
                <div className="text-xs text-gray-600">Suivant →</div>
                <div className="text-sm font-bold text-white group-hover:underline">{nextMission.name}</div>
              </div>
              <span className="text-xl">{nextMission.emoji}</span>
            </Link>
          ) : <div />}
        </div>

      </div>
    </SolarLayout>
  );
}

