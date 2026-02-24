'use client'
// pages/atoms/histoire.tsx
import Link from 'next/link';
import AtomicLayout from '@/components/AtomicLayout';

const timeline = [
  {
    time: 'T + 10⁻⁴³ s',
    label: 'Époque de Planck',
    color: '#A78BFA',
    emoji: '🌑',
    title: 'Singularité initiale',
    description: 'L\'univers est plus petit qu\'un proton. Les quatre forces fondamentales sont unifiées. Toute la physique connue cesse de fonctionner. Température: 10³² K.',
    atoms: null,
  },
  {
    time: 'T + 10⁻⁶ s',
    label: '1 microseconde',
    color: '#F472B6',
    emoji: '🔥',
    title: 'Quarks → Protons & Neutrons',
    description: 'Les quarks se "hadronisent" : trois quarks s\'assemblent en protons (uud) et neutrons (udd). La matière l\'emporte légèrement sur l\'antimatière (1 sur 10 milliards) — nous sommes ce résidu.',
    atoms: null,
  },
  {
    time: 'T + 3 min',
    label: '3 minutes',
    color: '#FB923C',
    emoji: '⚛️',
    title: 'Nucléosynthèse primordiale — H & He naissent',
    description: 'Température suffisamment basse (10⁹ K) pour que les noyaux se forment et survivent. En 3 minutes: 75% H, 25% He, traces de D, He-3, Li-7. Ces proportions sont encore mesurables aujourd\'hui.',
    atoms: ['H', 'He', 'Li'],
  },
  {
    time: 'T + 380 000 ans',
    label: '380 000 ans',
    color: '#FCD34D',
    emoji: '🌅',
    title: 'Recombinaison — Les premiers atomes',
    description: 'L\'univers se refroidit à 3000 K. Les électrons rejoignent les noyaux : les premiers atomes neutres se forment. L\'univers devient transparent pour la première fois. La lumière peut enfin voyager librement — c\'est le Fond Diffus Cosmologique, observable aujourd\'hui à 2.7 K.',
    atoms: ['H', 'He'],
  },
  {
    time: 'T + 200 Ma',
    label: '200 millions d\'années',
    color: '#34D399',
    emoji: '⭐',
    title: 'Les premières étoiles — Population III',
    description: 'Les premières étoiles, dites Population III, se forment. Massives (10-300 masses solaires), elles ne contiennent que H et He. Leur courte vie (quelques millions d\'années) les conduit à des supernovae violentes qui dispersent les premiers éléments lourds dans l\'univers.',
    atoms: ['C', 'N', 'O', 'Fe'],
  },
  {
    time: 'T + 1-13 Ga',
    label: 'Milliards d\'années',
    color: '#60A5FA',
    emoji: '🌌',
    title: 'Enrichissement progressif de la galaxie',
    description: 'Les générations successives d\'étoiles (Pop III → Pop II → Pop I) enrichissent le milieu interstellaire. Les étoiles AGB répandent leurs couches via des nébuleuses planétaires. Les supernovae de type Ia dispersent le fer. Les kilonovae sporadiques ajoutent or, platine, uranium.',
    atoms: ['Si', 'Mg', 'Ca', 'Au', 'Pt', 'U'],
  },
  {
    time: 'T + 9.1 Ga',
    label: '9,1 milliards d\'années après le BB',
    color: '#F59E0B',
    emoji: '☀️',
    title: 'Formation du Système Solaire',
    description: 'Un nuage moléculaire — déjà enrichi de plusieurs générations stellaires — s\'effondre. Le Soleil se forme au centre, les planètes dans le disque d\'accrétion. La Terre hérite d\'une collection complète d\'éléments issus de supernovae, kilonovae, AGB et rayons cosmiques.',
    atoms: ['Fe', 'O', 'Si', 'Mg', 'Al', 'Ca', 'Ni'],
  },
  {
    time: 'T + 9.1 Ga + 0.5 Ga',
    label: '4,1 milliards d\'années avant JC',
    color: '#86EFAC',
    emoji: '🧬',
    title: 'L\'apparition de la vie',
    description: 'Dans les océans primitifs, les molécules organiques (C, H, N, O, P, S — tous forgés dans les étoiles) s\'assemblent. La vie émerge. Pendant 3.5 milliards d\'années, la photosynthèse transforme l\'atmosphère en libérant de l\'oxygène libre.',
    atoms: ['C', 'H', 'O', 'N', 'P', 'S'],
  },
  {
    time: 'Aujourd\'hui',
    label: 'T + 13,8 milliards d\'années',
    color: '#E879F9',
    emoji: '🫵',
    title: 'Vous, fait d\'étoiles',
    description: 'Les atomes dans votre corps ont des histoires de milliards d\'années. L\'oxygène que vous respirez a été forgé dans une étoile morte avant le Soleil. Le fer dans votre sang est l\'acte terminal de la fusion stellaire. Le calcium de vos os, les supernovae. Et l\'or dans votre bague — une collision d\'étoiles à neutrons, il y a des milliards d\'années.',
    atoms: ['O', 'C', 'H', 'N', 'Ca', 'P', 'Fe'],
  },
];

export default function Histoire() {
  return (
    <AtomicLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[16px] text-gray-600 font-mono mb-6">
          <Link href="/atoms" className="hover:text-white transition-colors">Atomes</Link>
          <span>›</span>
          <span className="text-gray-400">Histoire</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Histoire Cosmique des Éléments</h1>
          <p className="text-gray-500 text-sm">13,8 milliards d'années en 9 étapes</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          <div className="space-y-0">
            {timeline.map((event, i) => (
              <div key={i} className="relative pl-16 pb-10">
                {/* Node */}
                <div className="absolute left-3 w-5 h-5 rounded-full border-2 flex items-center justify-center"
                  style={{
                    borderColor: event.color,
                    background: `${event.color}22`,
                    boxShadow: `0 0 8px ${event.color}55`,
                    top: '4px',
                  }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: event.color }} />
                </div>

                {/* Time label */}
                <div className="absolute left-12 font-mono text-[9px] uppercase tracking-wider"
                  style={{ color: event.color, top: '8px' }}>
                  {event.time}
                </div>

                {/* Card */}
                <div className="mt-7 rounded-xl border p-5 transition-all hover:brightness-105"
                  style={{
                    background: `${event.color}08`,
                    borderColor: `${event.color}25`,
                  }}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">{event.emoji}</span>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-wider mb-0.5"
                        style={{ color: event.color }}>
                        {event.label}
                      </div>
                      <h2 className="text-base font-bold text-white leading-tight">{event.title}</h2>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed mb-3">
                    {event.description}
                  </p>

                  {event.atoms && (
                    <div className="flex flex-wrap gap-1.5">
                      {event.atoms.map(sym => (
                        <span key={sym} className="px-2 py-0.5 rounded font-mono text-xs font-bold"
                          style={{
                            background: `${event.color}20`,
                            color: event.color,
                            border: `1px solid ${event.color}40`,
                          }}>
                          {sym}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing quote */}
        <div className="mt-8 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-8 text-center">
          <blockquote className="text-lg text-gray-300 italic leading-relaxed">
            "L'azote dans notre ADN, le calcium dans nos dents, le fer dans notre sang,
            le carbone dans nos tartes aux pommes ont été fabriqués dans l'intérieur
            d'étoiles en train de s'effondrer. Nous sommes tous faits de poussière d'étoiles."
          </blockquote>
          <cite className="text-sm text-gray-600 mt-3 block">— Carl Sagan</cite>
        </div>
      </div>
    </AtomicLayout>
  );
}
