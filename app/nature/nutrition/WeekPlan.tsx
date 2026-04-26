'use client';

import { useState } from 'react';

type Meal = {
  slot: string;
  items: string[];
  kcal: number;
  prot: number;
  carb: number;
  fat: number;
};

type Day = {
  day: string;
  short: string;
  type: 'force' | 'cardio' | 'endurance' | 'repos';
  totalKcal: number;
  totalProt: number;
  totalCarb: number;
  totalFat: number;
  meals: Meal[];
};

const TYPE_LABEL: Record<Day['type'], string> = {
  force:     'Musculation',
  cardio:    'HIIT / Cardio',
  endurance: 'Endurance',
  repos:     'Repos',
};
const TYPE_COLOR: Record<Day['type'], string> = {
  force:     '#F87171',
  cardio:    '#FBBF24',
  endurance: '#60A5FA',
  repos:     '#6EE7B7',
};
const TYPE_BG: Record<Day['type'], string> = {
  force:     'rgba(248,113,113,0.12)',
  cardio:    'rgba(251,191,36,0.12)',
  endurance: 'rgba(96,165,250,0.12)',
  repos:     'rgba(110,231,183,0.12)',
};

// Profile: homme 66 kg, 30 ans, 4×/semaine — TDEE ~2 520 kcal
// Jours d'entraînement : +200 kcal, glucides ↑ ; jours de repos : maintien léger déficit
// Protéines cible : 2,0 g/kg = 132 g/j
const WEEK: Day[] = [
  {
    day: 'Lundi', short: 'Lun',
    type: 'force',
    totalKcal: 2680, totalProt: 136, totalCarb: 318, totalFat: 76,
    meals: [
      {
        slot: 'Petit-déjeuner',
        items: ['65g flocons d\'avoine + 200ml lait demi-écrémé', '2 œufs brouillés', '1 banane', 'Café sans sucre'],
        kcal: 540, prot: 28, carb: 70, fat: 14,
      },
      {
        slot: 'Collation pré-séance',
        items: ['125g yaourt grec 0%', '20g noix de cajou', '1 pomme'],
        kcal: 255, prot: 14, carb: 26, fat: 9,
      },
      {
        slot: 'Déjeuner',
        items: ['130g blanc de poulet grillé', '130g riz complet cuit', 'Courgettes + poivrons sautés', '8g huile d\'olive'],
        kcal: 575, prot: 44, carb: 64, fat: 14,
      },
      {
        slot: 'Collation post-séance',
        items: ['Shaker 25g whey + 250ml lait écrémé', '1 banane'],
        kcal: 325, prot: 31, carb: 40, fat: 3,
      },
      {
        slot: 'Dîner',
        items: ['120g saumon grillé', '160g patate douce rôtie', 'Épinards à l\'ail', '100g yaourt nature'],
        kcal: 590, prot: 38, carb: 54, fat: 20,
      },
      {
        slot: 'Soirée (optionnel)',
        items: ['150g fromage blanc 0%', '8g miel'],
        kcal: 128, prot: 16, carb: 14, fat: 1,
      },
    ],
  },
  {
    day: 'Mardi', short: 'Mar',
    type: 'repos',
    totalKcal: 2260, totalProt: 126, totalCarb: 254, totalFat: 72,
    meals: [
      {
        slot: 'Petit-déjeuner',
        items: ['2 tranches de pain complet', '2 œufs à la coque', '½ avocat (60g)', '1 verre de jus d\'orange pressé'],
        kcal: 490, prot: 20, carb: 48, fat: 20,
      },
      {
        slot: 'Déjeuner',
        items: ['110g filet de dinde poêlé', '180g lentilles cuites', '70g quinoa cuit', 'Salade verte + vinaigrette moutarde'],
        kcal: 620, prot: 46, carb: 76, fat: 14,
      },
      {
        slot: 'Collation',
        items: ['125g cottage cheese', '80g fruits rouges', '15g amandes'],
        kcal: 250, prot: 18, carb: 18, fat: 10,
      },
      {
        slot: 'Dîner',
        items: ['120g escalope de veau', '110g riz basmati cuit', 'Brocoli vapeur', '8g beurre'],
        kcal: 490, prot: 36, carb: 46, fat: 16,
      },
      {
        slot: 'Soirée (optionnel)',
        items: ['150g skyr nature', '1 kiwi'],
        kcal: 138, prot: 16, carb: 18, fat: 1,
      },
    ],
  },
  {
    day: 'Mercredi', short: 'Mer',
    type: 'cardio',
    totalKcal: 2740, totalProt: 132, totalCarb: 348, totalFat: 74,
    meals: [
      {
        slot: 'Petit-déjeuner',
        items: ['Pancakes avoine-banane (65g flocons + 1 banane + 2 œufs)', '125g fromage blanc 0%', '12g sirop d\'érable'],
        kcal: 580, prot: 26, carb: 86, fat: 12,
      },
      {
        slot: 'Collation pré-séance',
        items: ['2 dattes Medjool', '12g beurre de cacahuète', '1 tranche de pain complet'],
        kcal: 245, prot: 6, carb: 38, fat: 7,
      },
      {
        slot: 'Déjeuner',
        items: ['160g pâtes complètes cuites', '110g thon en boîte (eau)', 'Tomates + concombre + olives', '8g huile d\'olive'],
        kcal: 600, prot: 38, carb: 84, fat: 14,
      },
      {
        slot: 'Collation post-séance',
        items: ['Smoothie : 250ml lait écrémé + 25g whey + 1 banane + 30g flocons d\'avoine'],
        kcal: 420, prot: 34, carb: 58, fat: 5,
      },
      {
        slot: 'Dîner',
        items: ['140g blanc de poulet', '170g pommes de terre vapeur', 'Haricots verts + carottes', '8g huile d\'olive'],
        kcal: 530, prot: 40, carb: 52, fat: 14,
      },
      {
        slot: 'Soirée (optionnel)',
        items: ['150g fromage blanc 0%', '20g noix'],
        kcal: 225, prot: 16, carb: 6, fat: 14,
      },
    ],
  },
  {
    day: 'Jeudi', short: 'Jeu',
    type: 'repos',
    totalKcal: 2240, totalProt: 124, totalCarb: 246, totalFat: 72,
    meals: [
      {
        slot: 'Petit-déjeuner',
        items: ['Omelette 2 blancs + 1 œuf entier + épinards + tomate', '2 tranches de pain complet', '1 orange'],
        kcal: 420, prot: 26, carb: 44, fat: 12,
      },
      {
        slot: 'Déjeuner',
        items: ['130g crevettes décortiquées', '70g quinoa cuit + ½ avocat + concombre + maïs', 'Sauce citronnée + 6g huile d\'olive'],
        kcal: 560, prot: 38, carb: 52, fat: 20,
      },
      {
        slot: 'Collation',
        items: ['20g amandes', '1 pomme', '1 carré chocolat noir 70%'],
        kcal: 235, prot: 6, carb: 22, fat: 13,
      },
      {
        slot: 'Dîner',
        items: ['120g bœuf haché 5%', '140g pâtes complètes cuites', 'Sauce tomate maison + basilic', 'Salade verte'],
        kcal: 575, prot: 44, carb: 62, fat: 16,
      },
      {
        slot: 'Soirée (optionnel)',
        items: ['150g skyr + 8g miel'],
        kcal: 135, prot: 14, carb: 18, fat: 1,
      },
    ],
  },
  {
    day: 'Vendredi', short: 'Ven',
    type: 'force',
    totalKcal: 2700, totalProt: 138, totalCarb: 322, totalFat: 76,
    meals: [
      {
        slot: 'Petit-déjeuner',
        items: ['65g flocons d\'avoine + 25g whey chocolat + 200ml lait', '80g myrtilles', '20g noix du Brésil'],
        kcal: 535, prot: 36, carb: 62, fat: 16,
      },
      {
        slot: 'Collation pré-séance',
        items: ['2 galettes de riz', '15g beurre de cacahuète', '1 banane'],
        kcal: 290, prot: 6, carb: 48, fat: 8,
      },
      {
        slot: 'Déjeuner',
        items: ['140g poulet mariné soja-citron', '130g riz blanc cuit', 'Courgettes + champignons sautés', '8g huile de sésame'],
        kcal: 600, prot: 48, carb: 66, fat: 16,
      },
      {
        slot: 'Collation post-séance',
        items: ['350ml lait écrémé chocolaté', '1 banane', '2 galettes de riz'],
        kcal: 370, prot: 16, carb: 64, fat: 5,
      },
      {
        slot: 'Dîner',
        items: ['120g saumon vapeur', '110g riz complet', 'Brocoli + épinards vapeur', '8g beurre + citron'],
        kcal: 565, prot: 38, carb: 54, fat: 20,
      },
      {
        slot: 'Soirée (optionnel)',
        items: ['150g fromage blanc 0%', '20g noix de cajou'],
        kcal: 225, prot: 18, carb: 10, fat: 12,
      },
    ],
  },
  {
    day: 'Samedi', short: 'Sam',
    type: 'endurance',
    totalKcal: 2840, totalProt: 128, totalCarb: 386, totalFat: 72,
    meals: [
      {
        slot: 'Petit-déjeuner',
        items: ['Pancakes avoine (80g flocons) + 15g miel', '150g fromage blanc 0%', '1 banane + fruits de saison'],
        kcal: 620, prot: 24, carb: 104, fat: 8,
      },
      {
        slot: 'Collation pré-séance',
        items: ['1 banane', '1 tranche de pain complet + confiture', 'Eau + pincée de sel'],
        kcal: 255, prot: 4, carb: 56, fat: 1,
      },
      {
        slot: 'Pendant l\'effort (si > 90 min)',
        items: ['1 gel énergétique ou 1 banane / 45 min', 'Eau régulièrement'],
        kcal: 160, prot: 0, carb: 40, fat: 0,
      },
      {
        slot: 'Déjeuner (récupération)',
        items: ['170g pâtes cuites + 120g bœuf + sauce bolognaise maison', '1 tranche pain complet', 'Salade de légumes'],
        kcal: 700, prot: 44, carb: 92, fat: 20,
      },
      {
        slot: 'Collation post-séance',
        items: ['Smoothie : 250ml lait + 25g whey + banane + 30g flocons d\'avoine + 8g miel'],
        kcal: 450, prot: 34, carb: 64, fat: 6,
      },
      {
        slot: 'Dîner (repas plaisir)',
        items: ['Pizza maison pâte fine (légumes, jambon, mozzarella)', 'Salade verte', '1 yaourt + fruit'],
        kcal: 620, prot: 30, carb: 74, fat: 22,
      },
    ],
  },
  {
    day: 'Dimanche', short: 'Dim',
    type: 'repos',
    totalKcal: 2240, totalProt: 122, totalCarb: 242, totalFat: 74,
    meals: [
      {
        slot: 'Petit-déjeuner (brunch)',
        items: ['Omelette 3 œufs + poivron + champignons + tomate', '2 tranches de pain complet', '1 verre de jus de fruits frais'],
        kcal: 480, prot: 26, carb: 50, fat: 18,
      },
      {
        slot: 'Déjeuner (repas famille)',
        items: ['140g poulet rôti + herbes de Provence', '200g patate douce rôtie', 'Ratatouille ou légumes du marché'],
        kcal: 630, prot: 44, carb: 62, fat: 18,
      },
      {
        slot: 'Collation',
        items: ['150g fromage blanc + 12g miel', '20g noix mélangées'],
        kcal: 280, prot: 16, carb: 24, fat: 12,
      },
      {
        slot: 'Dîner (léger)',
        items: ['Velouté de légumes maison (courgette, carotte)', '2 œufs durs', '2 tranches de pain complet', '1 yaourt nature'],
        kcal: 430, prot: 24, carb: 44, fat: 14,
      },
      {
        slot: 'Soirée (optionnel)',
        items: ['150g skyr + 20g noix de cajou'],
        kcal: 230, prot: 18, carb: 12, fat: 12,
      },
    ],
  },
];

const MACRO_COLORS = { prot: '#F87171', carb: '#FBBF24', fat: '#60A5FA' };

export default function WeekPlan() {
  const [activeDay, setActiveDay] = useState(0);
  const day = WEEK[activeDay];

  return (
    <section>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">
          Programme alimentaire — Homme sportif (66 kg · 30 ans · ~2 650 kcal/j)
        </h2>
        <span className="text-xs text-gray-600 italic">Entraînements : Lun · Mer · Ven · Sam</span>
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {WEEK.map((d, i) => (
          <button
            key={d.day}
            onClick={() => setActiveDay(i)}
            className="flex flex-col items-center px-3 py-2 rounded-xl border transition-all duration-200 min-w-[52px]"
            style={{
              background: activeDay === i ? TYPE_BG[d.type] : 'rgba(255,255,255,0.02)',
              borderColor: activeDay === i ? TYPE_COLOR[d.type] + '80' : 'rgba(255,255,255,0.08)',
              color: activeDay === i ? TYPE_COLOR[d.type] : '#6B7280',
            }}
          >
            <span className="text-xs font-bold">{d.short}</span>
            <span
              className="text-xs mt-0.5 leading-none"
              style={{ color: activeDay === i ? TYPE_COLOR[d.type] : '#4B5563' }}
            >
              {d.type === 'repos' ? 'Repos' : '🏋'}
            </span>
          </button>
        ))}
      </div>

      {/* Day header */}
      <div
        className="rounded-2xl border p-5 mb-5 flex flex-wrap items-center justify-between gap-4"
        style={{
          background: TYPE_BG[day.type],
          borderColor: TYPE_COLOR[day.type] + '50',
        }}
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl font-bold text-white">{day.day}</span>
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold border"
              style={{
                color: TYPE_COLOR[day.type],
                borderColor: TYPE_COLOR[day.type] + '60',
                background: TYPE_COLOR[day.type] + '15',
              }}
            >
              {TYPE_LABEL[day.type]}
            </span>
          </div>
          <div className="text-3xl font-bold" style={{ color: TYPE_COLOR[day.type], fontFamily: "'Exo 2', monospace" }}>
            {day.totalKcal} kcal
          </div>
        </div>
        {/* Macro bars */}
        <div className="flex gap-6">
          {(
            [
              { label: 'Protéines', val: day.totalProt, unit: 'g', color: MACRO_COLORS.prot },
              { label: 'Glucides',  val: day.totalCarb, unit: 'g', color: MACRO_COLORS.carb },
              { label: 'Lipides',   val: day.totalFat,  unit: 'g', color: MACRO_COLORS.fat },
            ] as const
          ).map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-xl font-bold" style={{ color: m.color, fontFamily: "'Exo 2', monospace" }}>
                {m.val}g
              </div>
              <div className="text-xs text-gray-500">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Meals */}
      <div className="space-y-3">
        {day.meals.map((meal) => (
          <div
            key={meal.slot}
            className="rounded-xl border border-white/6 p-4 flex flex-col sm:flex-row gap-4"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            {/* Left: slot + macros */}
            <div className="sm:w-44 shrink-0">
              <div className="text-xs font-bold text-white mb-2">{meal.slot}</div>
              <div className="text-sm font-bold mb-1" style={{ color: TYPE_COLOR[day.type], fontFamily: "'Exo 2', monospace" }}>
                {meal.kcal} kcal
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs font-mono" style={{ color: MACRO_COLORS.prot }}>P {meal.prot}g</span>
                <span className="text-xs font-mono" style={{ color: MACRO_COLORS.carb }}>G {meal.carb}g</span>
                <span className="text-xs font-mono" style={{ color: MACRO_COLORS.fat }}>L {meal.fat}g</span>
              </div>
            </div>
            {/* Right: foods */}
            <div className="flex-1 flex flex-wrap gap-1.5">
              {meal.items.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-lg text-xs text-gray-300 border border-white/6"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly overview bar */}
      <div
        className="mt-6 rounded-2xl border border-white/8 p-5"
        style={{ background: 'rgba(255,255,255,0.02)' }}
      >
        <div className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-4">Vue semaine — calories</div>
        <div className="flex items-end gap-2 h-20">
          {WEEK.map((d, i) => {
            const pct = (d.totalKcal - 2000) / 1400;
            return (
              <button
                key={d.day}
                onClick={() => setActiveDay(i)}
                className="flex-1 flex flex-col items-center gap-1 group"
              >
                <div className="w-full rounded-t-md transition-all duration-200 relative overflow-hidden"
                  style={{
                    height: `${Math.round(pct * 72)}px`,
                    background: activeDay === i ? TYPE_COLOR[d.type] : TYPE_COLOR[d.type] + '50',
                  }}>
                  {activeDay === i && (
                    <div className="absolute inset-0 bg-white/10" />
                  )}
                </div>
                <span className="text-xs" style={{ color: activeDay === i ? TYPE_COLOR[d.type] : '#4B5563' }}>
                  {d.short}
                </span>
                <span className="text-xs font-mono" style={{ color: activeDay === i ? TYPE_COLOR[d.type] : '#374151' }}>
                  {d.totalKcal}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-gray-600 italic mt-4">
        Calculé pour un homme de 66 kg, 30 ans, 4×/semaine (force + HIIT + endurance). TDEE estimé ~2 520 kcal.
        Objectif : maintien/légère prise de masse propre. Protéines : 2,0 g/kg = 132 g/j.
        Jours d&apos;entraînement : glucides ↑, ~2 680–2 840 kcal. Jours de repos : ~2 240–2 260 kcal.
      </p>
    </section>
  );
}
