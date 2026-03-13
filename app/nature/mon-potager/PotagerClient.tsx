'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Plant, PlantType,
  PLANT_TYPE_LABELS, MONTH_LABELS,
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
const STORAGE_KEY = 'myspace-potager';

type GardenEntry = { plantId: string; quantity: number };

function parseSpacingCm(spacing?: string): number {
  if (!spacing) return 40;
  const nums = spacing.match(/\d+/g);
  if (!nums) return 40;
  const values = nums.map(Number);
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function estimateSurfaceM2(plant: Plant, qty: number): number {
  const spacingCm = parseSpacingCm(plant.spacing);
  return (spacingCm / 100) * (spacingCm / 100) * qty;
}

export default function PotagerClient({ plants }: { plants: Plant[] }) {
  const [garden, setGarden] = useState<GardenEntry[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<PlantType | 'all'>('all');
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setGarden(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(garden));
  }, [garden, loaded]);

  const plantsMap = useMemo(() => {
    const m = new Map<string, Plant>();
    plants.forEach(p => m.set(p.id, p));
    return m;
  }, [plants]);

  const gardenMap = useMemo(() => {
    const m = new Map<string, number>();
    garden.forEach(e => m.set(e.plantId, e.quantity));
    return m;
  }, [garden]);

  const setQuantity = (plantId: string, qty: number) => {
    setGarden(prev => {
      if (qty <= 0) return prev.filter(e => e.plantId !== plantId);
      const exists = prev.find(e => e.plantId === plantId);
      if (exists) return prev.map(e => e.plantId === plantId ? { ...e, quantity: qty } : e);
      return [...prev, { plantId, quantity: qty }];
    });
  };

  const filteredPlants = useMemo(() => plants.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.nameLatin?.toLowerCase().includes(q);
    const matchType = typeFilter === 'all' || p.type === typeFilter;
    return matchSearch && matchType;
  }), [plants, search, typeFilter]);

  // Stats
  const stats = useMemo(() => {
    let totalPlants = 0;
    let varieties = 0;
    let yieldMin = 0;
    let yieldMax = 0;
    let surfaceM2 = 0;
    const harvestByMonth: Record<number, { plant: Plant; qty: number }[]> = {};
    const byType: Record<string, number> = {};

    for (const entry of garden) {
      const plant = plantsMap.get(entry.plantId);
      if (!plant) continue;
      totalPlants += entry.quantity;
      varieties++;
      if (plant.yieldKgMin) yieldMin += plant.yieldKgMin * entry.quantity;
      if (plant.yieldKgMax) yieldMax += plant.yieldKgMax * entry.quantity;
      surfaceM2 += estimateSurfaceM2(plant, entry.quantity);
      byType[plant.type] = (byType[plant.type] || 0) + entry.quantity;

      if (plant.harvest) {
        for (const m of plant.harvest) {
          if (!harvestByMonth[m]) harvestByMonth[m] = [];
          harvestByMonth[m].push({ plant, qty: entry.quantity });
        }
      }
    }

    return { totalPlants, varieties, yieldMin, yieldMax, surfaceM2, harvestByMonth, byType };
  }, [garden, plantsMap]);

  const formatKg = (kg: number) => {
    if (kg >= 1000) return `${(kg / 1000).toFixed(1)}t`;
    if (kg >= 10) return `${Math.round(kg)} kg`;
    return `${kg.toFixed(1)} kg`;
  };

  if (!loaded) return null;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, rgba(5,8,20,1) 0%, rgba(10,18,10,1) 100%)' }}>
      <div className="max-w-screen-2xl mx-auto px-4 py-8" style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 font-mono mb-6">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <span>›</span>
          <Link href="/nature" className="hover:text-white transition-colors">Nature</Link>
          <span>›</span>
          <span className="text-gray-400">Mon Potager</span>
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
            Mon Potager
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-gray-400 text-base max-w-2xl">
              Composez votre potager en sélectionnant des plantes et leurs quantités. Visualisez vos récoltes estimées, la surface nécessaire et le calendrier de production.
            </p>
            {garden.length > 0 && (
              <Link
                href="/nature/mon-potager/ce-mois"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
                style={{ background: 'rgba(251,191,36,0.12)', borderColor: 'rgba(251,191,36,0.35)', color: '#FCD34D' }}
              >
                📅 Ce mois-ci
              </Link>
            )}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Plants total', value: stats.totalPlants.toString(), icon: '🌱', color: '#22C55E' },
            { label: 'Variétés', value: stats.varieties.toString(), icon: '🌿', color: '#4ADE80' },
            { label: 'Récolte estimée / an', value: stats.yieldMin > 0 ? `${formatKg(stats.yieldMin)} – ${formatKg(stats.yieldMax)}` : '—', icon: '🌾', color: '#F59E0B' },
            { label: 'Surface estimée', value: stats.surfaceM2 > 0 ? `${Math.round(stats.surfaceM2)} m²` : '—', icon: '📐', color: '#60A5FA' },
          ].map(card => (
            <div
              key={card.label}
              className="rounded-2xl border p-4"
              style={{ background: `${card.color}08`, borderColor: `${card.color}25` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{card.icon}</span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">{card.label}</span>
              </div>
              <div className="text-xl font-bold font-mono" style={{ color: card.color }}>{card.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col xl:flex-row gap-6">

          {/* Left — Plant picker */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-3 mb-4 items-center">
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {filteredPlants.map(plant => {
                const qty = gardenMap.get(plant.id) || 0;
                const inGarden = qty > 0;
                const typeColor = TYPE_COLORS[plant.type];
                return (
                  <div
                    key={plant.id}
                    className="rounded-xl border p-3 transition-all"
                    style={{
                      background: inGarden ? `${plant.color}10` : 'rgba(255,255,255,0.02)',
                      borderColor: inGarden ? `${plant.color}40` : 'rgba(255,255,255,0.07)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-xl border shrink-0"
                        style={{ background: `${plant.color}18`, borderColor: `${plant.color}35` }}
                      >
                        {plant.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-white truncate">{plant.name}</div>
                        <div className="flex items-center gap-2 text-xs">
                          <span style={{ color: typeColor }}>{PLANT_TYPE_LABELS[plant.type]}</span>
                          {plant.yieldPerPlant && (
                            <span className="text-gray-600">~{plant.yieldPerPlant}/plant</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setQuantity(plant.id, qty - 1)}
                          disabled={qty === 0}
                          className="w-7 h-7 rounded-lg border flex items-center justify-center text-sm font-bold transition-all disabled:opacity-20"
                          style={{
                            borderColor: qty > 0 ? `${plant.color}50` : 'rgba(255,255,255,0.1)',
                            color: qty > 0 ? plant.color : 'rgba(255,255,255,0.3)',
                            background: qty > 0 ? `${plant.color}15` : 'transparent',
                          }}
                        >
                          −
                        </button>
                        <span
                          className="w-8 text-center text-sm font-bold font-mono"
                          style={{ color: qty > 0 ? plant.color : 'rgba(255,255,255,0.2)' }}
                        >
                          {qty}
                        </span>
                        <button
                          onClick={() => setQuantity(plant.id, qty + 1)}
                          className="w-7 h-7 rounded-lg border flex items-center justify-center text-sm font-bold transition-all hover:scale-110"
                          style={{
                            borderColor: `${plant.color}50`,
                            color: plant.color,
                            background: `${plant.color}15`,
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Dashboard */}
          <div className="xl:w-[420px] shrink-0">
            <div className="xl:sticky xl:top-20 space-y-5">

              {/* Mon jardin — list */}
              <div className="rounded-2xl border p-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Mon Jardin</h2>
                  {garden.length > 0 && (
                    <button
                      onClick={() => setGarden([])}
                      className="text-xs text-red-500/60 hover:text-red-400 transition-colors"
                    >
                      Tout vider
                    </button>
                  )}
                </div>

                {garden.length === 0 ? (
                  <p className="text-sm text-gray-600 py-4 text-center">
                    Ajoutez des plantes avec les boutons + pour composer votre potager.
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                    {garden.map(entry => {
                      const plant = plantsMap.get(entry.plantId);
                      if (!plant) return null;
                      const yieldStr = plant.yieldKgMin && plant.yieldKgMax
                        ? `${formatKg(plant.yieldKgMin * entry.quantity)} – ${formatKg(plant.yieldKgMax * entry.quantity)}`
                        : null;
                      return (
                        <div
                          key={entry.plantId}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-white/5 transition-all group"
                        >
                          <span className="text-lg">{plant.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white truncate">{plant.name}</div>
                            {yieldStr && <div className="text-xs text-gray-600">{yieldStr}/an</div>}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setQuantity(plant.id, entry.quantity - 1)}
                              className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-xs text-gray-500 hover:text-white hover:border-white/30 transition-all opacity-0 group-hover:opacity-100"
                            >
                              −
                            </button>
                            <span className="text-sm font-bold font-mono w-6 text-center" style={{ color: plant.color }}>
                              {entry.quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(plant.id, entry.quantity + 1)}
                              className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-xs text-gray-500 hover:text-white hover:border-white/30 transition-all opacity-0 group-hover:opacity-100"
                            >
                              +
                            </button>
                            <button
                              onClick={() => setQuantity(plant.id, 0)}
                              className="w-6 h-6 rounded flex items-center justify-center text-xs text-red-500/50 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Calendrier des récoltes */}
              {garden.length > 0 && (
                <div className="rounded-2xl border p-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Calendrier des récoltes</h2>
                  <div className="space-y-1">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => {
                      const items = stats.harvestByMonth[month];
                      const currentMonth = new Date().getMonth() + 1;
                      const isCurrent = month === currentMonth;
                      return (
                        <div key={month} className="flex items-start gap-2">
                          <span
                            className={`text-xs font-mono w-10 shrink-0 pt-0.5 ${isCurrent ? 'text-green-400 font-bold' : 'text-gray-600'}`}
                          >
                            {MONTH_LABELS[month]}
                          </span>
                          <div className="flex-1">
                            {items && items.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {items.map(({ plant, qty }) => (
                                  <span
                                    key={plant.id}
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs"
                                    style={{ background: `${plant.color}18`, color: plant.color }}
                                    title={`${plant.name} ×${qty}`}
                                  >
                                    {plant.icon} {qty > 1 && `×${qty}`}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <div className="h-6 flex items-center">
                                <div className="h-px flex-1 bg-white/5" />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Répartition par type */}
              {garden.length > 0 && (
                <div className="rounded-2xl border p-4" style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-3">Répartition par type</h2>
                  <div className="space-y-2">
                    {ALL_TYPES.filter(t => stats.byType[t]).map(t => {
                      const count = stats.byType[t] || 0;
                      const pct = stats.totalPlants > 0 ? (count / stats.totalPlants) * 100 : 0;
                      return (
                        <div key={t} className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 w-28 truncate">{PLANT_TYPE_LABELS[t]}</span>
                          <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%`, background: TYPE_COLORS[t] }}
                            />
                          </div>
                          <span className="text-xs font-mono text-gray-500 w-8 text-right">{count}</span>
                        </div>
                      );
                    })}
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
