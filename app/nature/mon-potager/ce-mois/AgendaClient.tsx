'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Plant, MONTH_LABELS } from '@/data/plants';

const STORAGE_KEY = 'myspace-potager';
type GardenEntry = { plantId: string; quantity: number };
type ActionKey = 'semisIndoor' | 'semisOutdoor' | 'plantation' | 'harvest';

const ACTIONS: {
  key: ActionKey;
  label: string;
  verb: string;
  icon: string;
  color: string;
  materials: string[];
  tips: string;
  minutesPerUnit: number;
}[] = [
  {
    key: 'semisIndoor',
    label: 'Semis en intérieur / sous abri',
    verb: 'Semer',
    icon: '🪴',
    color: '#60A5FA',
    materials: ['Semences', 'Terreau à semis', 'Caissettes ou godets', 'Étiquettes', 'Vaporisateur'],
    tips: "Semer dans un endroit lumineux et chaud (18–22°C). Couvrir d'un film plastique ou d'un couvercle pour maintenir l'humidité jusqu'à la levée.",
    minutesPerUnit: 20,
  },
  {
    key: 'semisOutdoor',
    label: 'Semis en pleine terre',
    verb: 'Semer',
    icon: '🌱',
    color: '#34D399',
    materials: ['Semences', 'Râteau', 'Serfouette', 'Arrosoir à pomme fine', 'Ficelle de traçage'],
    tips: 'Ameublir le sol en surface, tracer des sillons droits. Couvrir légèrement et tasser. Arroser en pluie fine sans déplacer les graines.',
    minutesPerUnit: 15,
  },
  {
    key: 'plantation',
    label: 'Plantation',
    verb: 'Planter',
    icon: '🌿',
    color: '#A78BFA',
    materials: ['Plants / bulbes / boutures', 'Pelle ou transplantoir', 'Arrosoir', 'Compost ou fumier', 'Tuteurs si nécessaire'],
    tips: "Tremper les racines nues dans de l'eau avant de planter. Arroser abondamment après la plantation et paillez pour conserver l'humidité.",
    minutesPerUnit: 25,
  },
  {
    key: 'harvest',
    label: 'Récolte',
    verb: 'Récolter',
    icon: '🌾',
    color: '#F59E0B',
    materials: ['Panier ou cagette', 'Couteau ou sécateur', 'Gants de jardinage'],
    tips: "Récolter de préférence le matin, lorsque les légumes sont encore frais et gorgés d'eau. Une récolte régulière stimule la production.",
    minutesPerUnit: 30,
  },
];

function formatTime(minutes: number): string {
  if (minutes < 60) return `~${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `~${h}h` : `~${h}h${m.toString().padStart(2, '0')}`;
}

export default function AgendaClient({ plants }: { plants: Plant[] }) {
  const [garden, setGarden] = useState<GardenEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setGarden(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  const plantsMap = useMemo(() => {
    const m = new Map<string, Plant>();
    plants.forEach(p => m.set(p.id, p));
    return m;
  }, [plants]);

  const currentMonth = new Date().getMonth() + 1;

  // For each action type, compute the tasks to do this month from the user's garden
  const tasksByAction = useMemo(() => {
    return ACTIONS.map(action => {
      const tasks = garden
        .map(entry => {
          const plant = plantsMap.get(entry.plantId);
          if (!plant) return null;
          const months: number[] = (plant[action.key] as number[] | undefined) ?? [];
          if (!months.includes(currentMonth)) return null;
          return { plant, quantity: entry.quantity };
        })
        .filter(Boolean) as { plant: Plant; quantity: number }[];
      return { ...action, tasks };
    });
  }, [garden, plantsMap, currentMonth]);

  const totalTasks = tasksByAction.reduce((acc, a) => acc + a.tasks.length, 0);
  const totalMinutes = tasksByAction.reduce((acc, a) =>
    acc + a.tasks.reduce((s, t) => s + a.minutesPerUnit * t.quantity, 0), 0);

  if (!loaded) return null;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgba(5,8,20,1) 0%, rgba(10,18,10,1) 100%)' }}>
      <div className="max-w-screen-xl mx-auto px-4 py-8" style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-mono mb-6 flex-wrap">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/nature" className="hover:text-white transition-colors">Nature</Link>
          <span>›</span>
          <Link href="/nature/mon-potager" className="hover:text-white transition-colors">Mon Potager</Link>
          <span>›</span>
          <span className="text-gray-400">Ce mois-ci</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1
              className="text-4xl md:text-5xl font-extrabold"
              style={{
                fontFamily: "'Exo 2', sans-serif",
                background: 'linear-gradient(135deg, #4ADE80, #22C55E, #84CC16)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Agenda du mois
            </h1>
          </div>
          <p className="text-gray-400 text-base">
            Tâches à réaliser en <span className="text-green-400 font-semibold">{MONTH_LABELS[currentMonth]}</span> pour votre potager.
          </p>
        </div>

        {/* Empty garden state */}
        {garden.length === 0 && (
          <div
            className="rounded-2xl border p-10 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="text-5xl mb-4">🌱</div>
            <p className="text-gray-400 mb-4">Votre potager est vide. Commencez par ajouter des plantes.</p>
            <Link
              href="/nature/mon-potager"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
              style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.35)', color: '#4ADE80' }}
            >
              ← Composer mon potager
            </Link>
          </div>
        )}

        {/* Nothing to do this month */}
        {garden.length > 0 && totalTasks === 0 && (
          <div
            className="rounded-2xl border p-10 text-center"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="text-5xl mb-4">😌</div>
            <p className="text-gray-400 mb-1">Aucune action particulière ce mois-ci pour vos cultures.</p>
            <p className="text-gray-600 text-sm">Profitez-en pour préparer le sol, désherber et surveiller vos plantes.</p>
          </div>
        )}

        {/* Summary bar */}
        {totalTasks > 0 && (
          <div
            className="rounded-2xl border p-4 mb-8 flex flex-wrap gap-6 items-center"
            style={{ background: 'rgba(34,197,94,0.06)', borderColor: 'rgba(34,197,94,0.2)' }}
          >
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Tâches ce mois</div>
              <div className="text-2xl font-bold font-mono text-green-400">{totalTasks}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Temps estimé total</div>
              <div className="text-2xl font-bold font-mono text-green-400">{formatTime(totalMinutes)}</div>
            </div>
            <div className="flex flex-wrap gap-2 ml-auto">
              {tasksByAction.filter(a => a.tasks.length > 0).map(a => (
                <span
                  key={a.key}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: `${a.color}18`, color: a.color, border: `1px solid ${a.color}40` }}
                >
                  {a.icon} {a.label.split(' ')[0]} ({a.tasks.length})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action sections */}
        <div className="space-y-8">
          {tasksByAction.filter(a => a.tasks.length > 0).map(action => {
            const totalActionMinutes = action.tasks.reduce((s, t) => s + action.minutesPerUnit * t.quantity, 0);
            return (
              <div key={action.key}>
                {/* Section header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
                    style={{ background: `${action.color}15`, borderColor: `${action.color}40` }}
                  >
                    {action.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{action.label}</h2>
                    <div className="text-xs text-gray-500">
                      {action.tasks.length} plante{action.tasks.length > 1 ? 's' : ''} · {formatTime(totalActionMinutes)} estimé
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Plant task cards */}
                  <div className="lg:col-span-2 space-y-3">
                    {action.tasks.map(({ plant, quantity }) => {
                      const time = formatTime(action.minutesPerUnit * quantity);
                      return (
                        <div
                          key={plant.id}
                          className="rounded-xl border p-4 flex gap-4"
                          style={{ background: `${plant.color}08`, borderColor: `${plant.color}30` }}
                        >
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border shrink-0"
                            style={{ background: `${plant.color}18`, borderColor: `${plant.color}40` }}
                          >
                            {plant.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                              <div>
                                <span className="font-bold text-white">{plant.name}</span>
                                <span className="text-gray-500 text-sm ml-2">×{quantity} plant{quantity > 1 ? 's' : ''}</span>
                              </div>
                              <span
                                className="text-xs font-mono px-2 py-0.5 rounded-full"
                                style={{ background: `${action.color}18`, color: action.color }}
                              >
                                {time}
                              </span>
                            </div>
                            <p className="text-sm font-semibold mb-1" style={{ color: action.color }}>
                              {action.verb} {plant.name.toLowerCase()}{quantity > 1 ? ` (${quantity} fois)` : ''}
                            </p>
                            {plant.notes && (
                              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{plant.notes}</p>
                            )}
                            {plant.spacing && (
                              <p className="text-xs text-gray-600 mt-1">↔ Espacement : {plant.spacing}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Materials + tips card */}
                  <div className="space-y-3">
                    <div
                      className="rounded-xl border p-4"
                      style={{ background: `${action.color}08`, borderColor: `${action.color}25` }}
                    >
                      <div className="text-xs uppercase tracking-wider mb-3" style={{ color: action.color }}>
                        Matériel nécessaire
                      </div>
                      <ul className="space-y-1.5">
                        {action.materials.map(m => (
                          <li key={m} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: action.color }} />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="rounded-xl border p-4"
                      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}
                    >
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Conseils</div>
                      <p className="text-sm text-gray-400 leading-relaxed">{action.tips}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom nav */}
        {garden.length > 0 && (
          <div className="mt-12 pt-6 border-t border-white/6 flex flex-wrap gap-3">
            <Link
              href="/nature/mon-potager"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)', color: '#9CA3AF' }}
            >
              ← Mon Potager
            </Link>
            <Link
              href="/nature"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
              style={{ background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.25)', color: '#4ADE80' }}
            >
              Guide des plantes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
