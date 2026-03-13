'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plant, PlantType,
  PLANT_TYPE_LABELS, MONTH_LABELS,
  SUN_LABELS, WATER_LABELS,
  DIFFICULTY_LABELS, DIFFICULTY_COLORS,
} from '@/data/plants';

const TYPE_COLORS: Record<PlantType, string> = {
  'legume':         '#22C55E',
  'fruit':          '#F59E0B',
  'arbre-fruitier': '#84CC16',
  'arbre':          '#166534',
  'arbuste':        '#6EE7B7',
  'aromatique':     '#A78BFA',
  'fleur':          '#F472B6',
};

const ALL_TYPES: PlantType[] = ['legume', 'aromatique', 'fruit', 'arbre-fruitier', 'arbuste', 'arbre'];
const CURRENT_MONTH = new Date().getMonth() + 1;

function MonthBar({ months, color, label }: { months?: number[]; color: string; label: string }) {
  if (!months?.length) return null;
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-gray-500 w-14 shrink-0">{label}</span>
      <div className="flex gap-0.5 flex-1">
        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
          <div
            key={m}
            className="h-4 flex-1 rounded-sm"
            title={MONTH_LABELS[m]}
            style={{
              background: months.includes(m) ? color : 'rgba(255,255,255,0.06)',
              opacity: months.includes(m) ? (m === CURRENT_MONTH ? 1 : 0.7) : 1,
              outline: m === CURRENT_MONTH && months.includes(m) ? `1px solid ${color}` : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PlantCard({ plant, onClick, selected }: { plant: Plant; onClick: () => void; selected: boolean }) {
  const typeColor = TYPE_COLORS[plant.type];
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl border p-4 transition-all duration-200 hover:scale-[1.01] focus:outline-none w-full"
      style={{
        background: selected ? `${plant.color}10` : 'rgba(255,255,255,0.02)',
        borderColor: selected ? `${plant.color}50` : 'rgba(255,255,255,0.07)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border shrink-0"
          style={{ background: `${plant.color}18`, borderColor: `${plant.color}35` }}
        >
          {plant.icon}
        </div>
        <div className="text-right flex flex-col items-end gap-1">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: `${typeColor}18`, color: typeColor }}
          >
            {PLANT_TYPE_LABELS[plant.type]}
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: DIFFICULTY_COLORS[plant.difficulty] }}
          >
            {DIFFICULTY_LABELS[plant.difficulty]}
          </span>
        </div>
      </div>

      {/* Name */}
      <div className="text-sm font-bold text-white mb-0.5">{plant.name}</div>
      {plant.nameLatin && (
        <div className="text-xs text-gray-600 italic mb-3">{plant.nameLatin}</div>
      )}

      {/* Month bars */}
      <div className="space-y-1.5 mb-3">
        <MonthBar months={plant.semisIndoor} color="#60A5FA" label="Semis ♨" />
        <MonthBar months={plant.semisOutdoor} color="#34D399" label="Semis 🌱" />
        <MonthBar months={plant.plantation} color="#A78BFA" label="Plantat." />
        <MonthBar months={plant.harvest} color="#F59E0B" label="Récolte" />
      </div>

      {/* Quick info */}
      <div className="flex gap-3 text-xs text-gray-500">
        <span title="Ensoleillement">{plant.sun === 'plein-soleil' ? '☀️' : plant.sun === 'mi-ombre' ? '⛅' : '🌥️'} {SUN_LABELS[plant.sun]}</span>
        <span title="Arrosage">💧 {WATER_LABELS[plant.watering]}</span>
      </div>
    </button>
  );
}

function DetailPanel({ plant, onClose }: { plant: Plant; onClose: () => void }) {
  const typeColor = TYPE_COLORS[plant.type];
  return (
    <div
      className="rounded-2xl border p-5 space-y-5"
      style={{ background: `${plant.color}08`, borderColor: `${plant.color}35` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border shrink-0"
            style={{ background: `${plant.color}20`, borderColor: `${plant.color}40` }}
          >
            {plant.icon}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{plant.name}</h2>
            {plant.nameLatin && (
              <p className="text-xs text-gray-500 italic">{plant.nameLatin}</p>
            )}
            <div className="flex gap-2 mt-1 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${typeColor}20`, color: typeColor }}>
                {PLANT_TYPE_LABELS[plant.type]}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: `${DIFFICULTY_COLORS[plant.difficulty]}20`, color: DIFFICULTY_COLORS[plant.difficulty] }}>
                {DIFFICULTY_LABELS[plant.difficulty]}
              </span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-600 hover:text-white transition-colors text-xl shrink-0 ml-2">×</button>
      </div>

      {/* Calendrier */}
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Calendrier</div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-700 font-mono mb-1 px-0.5">
            {MONTH_LABELS.slice(1).map((m, i) => (
              <span key={i} className={`flex-1 text-center ${i + 1 === CURRENT_MONTH ? 'text-white font-bold' : ''}`}>{m.slice(0, 1)}</span>
            ))}
          </div>
          <MonthBar months={plant.semisIndoor} color="#60A5FA" label="Semis ♨️" />
          <MonthBar months={plant.semisOutdoor} color="#34D399" label="Semis 🌱" />
          <MonthBar months={plant.plantation} color="#A78BFA" label="Plantation" />
          <MonthBar months={plant.harvest} color="#F59E0B" label="Récolte 🌾" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-3 text-xs">
          {plant.semisIndoor && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#60A5FA' }} /> Semis abri/intérieur</span>}
          {plant.semisOutdoor && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#34D399' }} /> Semis pleine terre</span>}
          {plant.plantation && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#A78BFA' }} /> Plantation</span>}
          {plant.harvest && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#F59E0B' }} /> Récolte</span>}
        </div>
      </div>

      {/* Durées */}
      {(plant.germinationDays || plant.growthWeeks) && (
        <div>
          <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Durées de croissance</div>
          <div className="grid grid-cols-2 gap-3">
            {plant.germinationDays && (
              <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-lg font-bold font-mono" style={{ color: plant.color }}>
                  {plant.germinationDays[0]}–{plant.germinationDays[1]}j
                </div>
                <div className="text-xs text-gray-500">Germination</div>
              </div>
            )}
            {plant.growthWeeks && (
              <div className="rounded-xl p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-lg font-bold font-mono" style={{ color: plant.color }}>
                  {plant.growthWeeks[0] < 52
                    ? `${plant.growthWeeks[0]}–${plant.growthWeeks[1]}sem`
                    : `${Math.round(plant.growthWeeks[0] / 52)}–${Math.round(plant.growthWeeks[1] / 52)}ans`}
                </div>
                <div className="text-xs text-gray-500">Première récolte</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Besoins */}
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Besoins & culture</div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-base">{plant.sun === 'plein-soleil' ? '☀️' : plant.sun === 'mi-ombre' ? '⛅' : '🌥️'}</span>
            <span className="text-gray-400">{SUN_LABELS[plant.sun]}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base">💧</span>
            <span className="text-gray-400">Arrosage {WATER_LABELS[plant.watering].toLowerCase()}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-base shrink-0">🪴</span>
            <span className="text-gray-400">{plant.soil}</span>
          </div>
          {plant.spacing && (
            <div className="flex items-center gap-2">
              <span className="text-base">↔️</span>
              <span className="text-gray-400">Espacement : {plant.spacing}</span>
            </div>
          )}
          {plant.depth && (
            <div className="flex items-center gap-2">
              <span className="text-base">↕️</span>
              <span className="text-gray-400">Profondeur : {plant.depth}</span>
            </div>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">Conseils</div>
        <p className="text-sm text-gray-300 leading-relaxed">{plant.notes}</p>
      </div>
    </div>
  );
}

type ActionKey = 'semisIndoor' | 'semisOutdoor' | 'plantation' | 'harvest';

export default function NatureClient({ plants }: { plants: Plant[] }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PlantType | 'all'>('all');
  const [monthFilter, setMonthFilter] = useState<number | 'all'>('all');
  const [actionFilter, setActionFilter] = useState<ActionKey | null>(null);
  const [selected, setSelected] = useState<Plant | null>(null);

  const filtered = useMemo(() => plants.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.nameLatin?.toLowerCase().includes(q);
    const matchType = typeFilter === 'all' || p.type === typeFilter;
    const matchMonth = monthFilter === 'all'
      ? true
      : actionFilter
        ? (p[actionFilter] as number[] | undefined)?.includes(monthFilter as number) ?? false
        : [
            ...(p.semisIndoor ?? []),
            ...(p.semisOutdoor ?? []),
            ...(p.plantation ?? []),
            ...(p.harvest ?? []),
          ].includes(monthFilter as number);
    return matchSearch && matchType && matchMonth;
  }), [plants, search, typeFilter, monthFilter, actionFilter]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgba(5,8,20,1) 0%, rgba(10,18,10,1) 100%)' }}>
      <div className="max-w-screen-2xl mx-auto px-4 py-8" style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-mono mb-6">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>›</span>
          <span className="text-gray-400">Nature</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-2"
            style={{
              fontFamily: "'Exo 2', sans-serif",
              background: 'linear-gradient(135deg, #4ADE80, #22C55E, #84CC16)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Jardinage & Nature
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-gray-400 text-base max-w-2xl">
              Calendrier de plantation pour la France — {plants.length} plantes et arbres avec leurs besoins, durées de croissance et conseils de culture.
            </p>
            <Link
              href="/nature/mon-potager"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
              style={{ background: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.35)', color: '#4ADE80' }}
            >
              🏡 Mon Potager
            </Link>
          </div>
        </div>

        {/* Mois courant */}
        <div
          className="rounded-2xl border p-4 mb-6 flex flex-wrap gap-4 items-center"
          style={{ background: 'rgba(34,197,94,0.06)', borderColor: 'rgba(34,197,94,0.2)' }}
        >
          <div className="text-sm font-semibold text-green-400">
            📅 {MONTH_LABELS[CURRENT_MONTH]} — Ce mois-ci vous pouvez :
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {([
              { key: 'semisIndoor',  label: 'Semer (abri)', color: '#60A5FA' },
              { key: 'semisOutdoor', label: 'Semer (ext.)', color: '#34D399' },
              { key: 'plantation',   label: 'Planter',       color: '#A78BFA' },
              { key: 'harvest',      label: 'Récolter',      color: '#F59E0B' },
            ] as { key: ActionKey; label: string; color: string }[]).map(({ key, label, color }) => {
              const count = plants.filter(p => (p[key] as number[] | undefined)?.includes(CURRENT_MONTH)).length;
              const isActive = actionFilter === key && monthFilter === CURRENT_MONTH;
              return count > 0 ? (
                <button
                  key={key}
                  onClick={() => {
                    if (isActive) {
                      setMonthFilter('all');
                      setActionFilter(null);
                    } else {
                      setMonthFilter(CURRENT_MONTH);
                      setActionFilter(key);
                    }
                  }}
                  className="px-2.5 py-1 rounded-full font-semibold border transition-all hover:scale-105"
                  style={{
                    background: isActive ? `${color}35` : `${color}18`,
                    color,
                    borderColor: isActive ? color : `${color}40`,
                    boxShadow: isActive ? `0 0 8px ${color}40` : undefined,
                  }}
                >
                  {label} ({count})
                </button>
              ) : null;
            })}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          {/* Search */}
          <div className="relative">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Chercher une plante…"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-600 w-52"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white text-xs">✕</button>
            )}
          </div>

          {/* Type filters */}
          {(['all', ...ALL_TYPES] as const).map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                typeFilter === t ? 'scale-105' : 'border-white/10 text-gray-500 hover:text-white hover:border-white/20'
              }`}
              style={typeFilter === t && t !== 'all'
                ? { background: `${TYPE_COLORS[t]}20`, borderColor: `${TYPE_COLORS[t]}50`, color: TYPE_COLORS[t] }
                : typeFilter === t ? { background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.3)', color: 'white' } : {}}
            >
              {t === 'all' ? '🌱 Tous' : PLANT_TYPE_LABELS[t]}
            </button>
          ))}

          {/* Month filter */}
          <select
            value={monthFilter}
            onChange={e => { setMonthFilter(e.target.value === 'all' ? 'all' : Number(e.target.value)); setActionFilter(null); }}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-400 focus:outline-none focus:border-green-600"
          >
            <option value="all">Tous les mois</option>
            {MONTH_LABELS.slice(1).map((m, i) => (
              <option key={i + 1} value={i + 1}>{m}</option>
            ))}
          </select>

          <span className="text-sm text-gray-600 font-mono ml-auto">{filtered.length} plante{filtered.length > 1 ? 's' : ''}</span>
        </div>

        {/* Main layout */}
        <div className="flex flex-col xl:flex-row gap-6">

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map(p => (
                <PlantCard
                  key={p.id}
                  plant={p}
                  selected={selected?.id === p.id}
                  onClick={() => setSelected(prev => prev?.id === p.id ? null : p)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-600">
                <div className="text-4xl mb-2">🌱</div>
                Aucune plante ne correspond.
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div className="xl:w-[380px] shrink-0">
            <div className="xl:sticky xl:top-20">
              {selected ? (
                <DetailPanel plant={selected} onClose={() => setSelected(null)} />
              ) : (
                <div className="rounded-2xl border border-white/8 p-5" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <h2 className="text-base font-bold text-gray-300 mb-3 uppercase tracking-wider">Guide de culture</h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">
                    Cliquez sur une plante pour voir son calendrier complet, ses besoins en eau, sol, ensoleillement, les durées de germination et de croissance, et des conseils pratiques.
                  </p>

                  {/* Legend */}
                  <div className="space-y-2 text-xs text-gray-500 mb-5">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#60A5FA' }} /> Semis sous abri / intérieur</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#34D399' }} /> Semis pleine terre</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#A78BFA' }} /> Plantation (plants, bulbes, boutures)</div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#F59E0B' }} /> Période de récolte</div>
                  </div>

                  {/* Type stats */}
                  <div className="space-y-1.5">
                    {ALL_TYPES.map(t => (
                      <button
                        key={t}
                        onClick={() => setTypeFilter(t === typeFilter ? 'all' : t)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all text-left"
                      >
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: TYPE_COLORS[t] }} />
                        <span className="text-sm text-gray-400">{PLANT_TYPE_LABELS[t]}</span>
                        <span className="ml-auto text-xs font-mono text-gray-600">{plants.filter(p => p.type === t).length}</span>
                      </button>
                    ))}
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
