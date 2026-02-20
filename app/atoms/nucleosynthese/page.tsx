'use client'
// pages/atoms/nucleosynthese.tsx
import { useState } from 'react';
import AtomicLayout from '@/components/AtomicLayout';

const events = [
  {
    id: 'bigbang',
    time: '0 — 3 minutes',
    era: 'Big Bang',
    title: 'La Nucléosynthèse Primordiale',
    subtitle: '13.8 milliards d\'années ago',
    color: '#A78BFA',
    glow: 'rgba(167,139,250,0.3)',
    icon: '🌌',
    elements: ['H', 'He', 'Li'],
    content: `Dans la première fraction de seconde, l'univers était une soupe de quarks et gluons à des températures inimaginables (10^32 K). En quelques microsecondes, des protons et neutrons se forment.

Entre 1 seconde et 3 minutes, la nucléosynthèse primordiale produit les premiers noyaux atomiques. L'univers ressemble à un réacteur nucléaire en expansion rapide.

Résultat: **~75% d'hydrogène** (H-1), **~25% d'hélium** (He-4), des traces de deutérium (H-2), hélium-3 et lithium-7. Le tout en 3 minutes.

Ensuite pendant 380 000 ans, l'univers était trop chaud pour que les électrons s'attachent aux noyaux. Puis vint la "recombinaison" — les premiers atomes neutres apparurent, et le cosmos devint transparent pour la première fois.`,
    visual: 'bigbang',
  },
  {
    id: 'stars',
    time: '200 Ma — Aujourd\'hui',
    era: 'Fusion Stellaire',
    title: 'Le Feu des Étoiles',
    subtitle: 'Nucléosynthèse stellaire — processus CNO et pp',
    color: '#FCD34D',
    glow: 'rgba(252,211,77,0.3)',
    icon: '⭐',
    elements: ['C', 'N', 'O', 'Ne', 'Mg', 'Si', 'S', 'Ca', 'Fe'],
    content: `200 millions d'années après le Big Bang, les premiers amas de gaz commencent à s'effondrer sous leur propre gravité. La pression et la chaleur au cœur atteignent 10 millions de degrés: la fusion commence.

**Dans les étoiles comme le Soleil** (chaîne proton-proton):
4H → He-4 + énergie (4 × 10^-13 J par réaction)

**Dans les étoiles massives** (cycles CNO, triple-alpha):
- 3 He-4 → C-12 (processus triple-alpha)
- C-12 + He → O-16, puis Ne, Mg, Si…

**La "combustion du silicium"** dans les étoiles massives fusionne le silicium en fer-56. Le **fer** (Fe) est le terminus: son noyau est le plus stable qui soit — aucune énergie ne peut être extraite de sa fusion. Il s'accumule dans le cœur.`,
    visual: 'star',
  },
  {
    id: 'supernova',
    time: 'Effondrement en <1 seconde',
    era: 'Supernovae',
    title: 'La Mort Explosive des Étoiles',
    subtitle: 'Type II (Core Collapse) & Type Ia',
    color: '#FB923C',
    glow: 'rgba(251,146,60,0.3)',
    icon: '💥',
    elements: ['Na', 'Al', 'P', 'Cl', 'K', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Co', 'Ni', 'Cu', 'Zn'],
    content: `Quand le cœur de fer dépasse 1.4 masse solaire (limite de Chandrasekhar), **rien ne peut l'arrêter**. En moins d'une seconde, il s'effondre de la taille de la Terre à 20 km de diamètre — une étoile à neutrons est née.

L'onde de choc qui repart vers l'extérieur est d'une violence inouïe. **En quelques secondes, une supernova libère plus d'énergie que le Soleil en sa vie entière**.

**Processus-r** (capture rapide de neutrons): dans les quelques secondes de l'explosion, les neutrons bombardent les noyaux existants plus vite qu'ils ne se désintègrent. Des éléments lourds (jusqu'au baryum, certains terres rares) se forment en quelques secondes.

**Type Ia** (naine blanche + étoile compagnon): thermiquement instable, la naine blanche explose entièrement, produisant des quantités massives de nickel-56 (qui se désintègre en cobalt-56 puis fer-56).

Ces explosions *ensèment* le milieu interstellaire de tous ces nouveaux atomes.`,
    visual: 'supernova',
  },
  {
    id: 'agb',
    time: 'Milliards d\'années',
    era: 'Étoiles AGB',
    title: 'Les Géantes Asymptotiques',
    subtitle: 'Processus-s (capture lente de neutrons)',
    color: '#34D399',
    glow: 'rgba(52,211,153,0.3)',
    icon: '🔴',
    elements: ['Sr', 'Ba', 'Ce', 'Pb', 'Sn', 'Se', 'Te'],
    content: `Les étoiles de masse intermédiaire (1-8 masses solaires) passent par une phase **AGB** (Asymptotic Giant Branch) lors de leur vieillissement. Leur cœur pulse de manière répétée, créant des flux de neutrons modérés.

**Processus-s** (s = slow): les noyaux capturent des neutrons lentement — assez lentement pour permettre les désintégrations bêta entre chaque capture. Cela produit des noyaux stables en remontant la courbe de stabilité.

Les éléments produits incluent: strontium (Sr), baryum (Ba), cérium (Ce), plomb (Pb), étain (Sn), et une part des terres rares.

Ces étoiles *soufflent* ensuite leurs couches externes dans des nébuleuses planétaires — de magnifiques structures gazeuses qui enrichissent progressivement la galaxie en éléments lourds.`,
    visual: 'agb',
  },
  {
    id: 'kilonova',
    time: '~1.7 secondes après fusion',
    era: 'Kilonovæ',
    title: 'Collision d\'Étoiles à Neutrons',
    subtitle: 'L\'origine de l\'or, du platine et de l\'uranium',
    color: '#EC4899',
    glow: 'rgba(236,72,153,0.3)',
    icon: '💫',
    elements: ['Ag', 'Au', 'Pt', 'Ir', 'Os', 'U', 'Th', 'Pb'],
    content: `**17 août 2017**: les détecteurs LIGO/Virgo captent les ondes gravitationnelles d'une fusion de deux étoiles à neutrons à 130 millions d'années-lumière. Une kilonova est observée pour la première fois.

L'or et le platine produits en quelques secondes: **des masses équivalant à plusieurs fois celle de la Terre** en métaux précieux dispersés dans l'espace.

**Processus-r** extrême: dans la matière ultra-dense éjectée, les neutrons bombardent les noyaux à une vitesse prodigieuse. Des noyaux avec 180-200 neutrons se forment, se désintègrent ensuite vers les éléments stables les plus lourds.

C'est ainsi que sont nés: or (Au), platine (Pt), iridium (Ir), osmium (Os), rhodium (Rh), argent (Ag), et les actinides comme l'uranium (U) et le thorium (Th).

*Environ 50% des éléments plus lourds que le fer proviennent de ces événements rarissimes — une fusion de deux étoiles compactes ne se produit que quelques fois par million d'années dans une galaxie.*`,
    visual: 'kilonova',
  },
  {
    id: 'cosmic-rays',
    time: 'Continu',
    era: 'Rayons Cosmiques',
    title: 'Spallation par Rayons Cosmiques',
    subtitle: 'L\'origine du lithium, bore et béryllium',
    color: '#60A5FA',
    glow: 'rgba(96,165,250,0.3)',
    icon: '⚡',
    elements: ['Li', 'Be', 'B'],
    content: `Les éléments **lithium (Li), béryllium (Be) et bore (B)** posent une énigme: les étoiles les détruisent plus vite qu'elles ne les produisent. Leur abondance dans l'univers est mystérieusement basse mais non nulle.

La réponse vient des **rayons cosmiques** — des protons et noyaux atomiques voyageant à des vitesses relativistes dans la galaxie, issus principalement des supernovae.

Quand un rayon cosmique frappe un noyau de carbone ou d'oxygène dans le milieu interstellaire, il le fragmente (spallation). Les fragments résultants incluent Li, Be et B.

Ce processus lent mais continu depuis des milliards d'années explique l'abondance actuelle de ces trois éléments fragiles.`,
    visual: 'cosmic',
  },
];

function VisualBigBang() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl"
      style={{ background: 'radial-gradient(circle at 50% 50%, #A78BFA, #7C3AED, #1e1b4b, #050A18)' }}>
      {[...Array(16)].map((_, i) => (
        <div key={i} className="absolute rounded-full animate-ping"
          style={{
            width: `${(i % 4 + 1) * 8}px`,
            height: `${(i % 4 + 1) * 8}px`,
            background: `rgba(${167 - i * 5}, ${139 - i * 3}, ${250 - i * 10}, ${0.7 - i * 0.03})`,
            left: `${50 + Math.cos(i * 22.5 * Math.PI / 180) * (10 + i * 4)}%`,
            top: `${50 + Math.sin(i * 22.5 * Math.PI / 180) * (10 + i * 4)}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '2s',
          }} />
      ))}
      <span className="text-5xl z-10" style={{ filter: 'drop-shadow(0 0 20px #fff)' }}>🌌</span>
    </div>
  );
}

function VisualStar() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl"
      style={{ background: 'radial-gradient(circle at 50% 50%, #FCD34D33, #F97316, #7C2D12, #050A18)' }}>
      <div className="absolute rounded-full animate-pulse"
        style={{ width: 80, height: 80, background: 'radial-gradient(circle, #FFF7, #FCD34D, #F97316)', filter: 'blur(4px)' }} />
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute"
          style={{
            width: 2,
            height: `${20 + i * 5}px`,
            background: 'linear-gradient(to top, transparent, #FCD34D)',
            left: '50%',
            top: '50%',
            transformOrigin: '50% 0',
            transform: `rotate(${i * 45}deg) translateY(-50%)`,
          }} />
      ))}
    </div>
  );
}

function VisualSupernova() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl"
      style={{ background: 'radial-gradient(circle at 50% 50%, #FB923C44, #EF4444, #7f1d1d, #050A18)' }}>
      {[...Array(20)].map((_, i) => {
        const angle = (i / 20) * 360;
        const r = 30 + (i % 3) * 20;
        return (
          <div key={i} className="absolute animate-ping"
            style={{
              width: `${3 + i % 4}px`,
              height: `${3 + i % 4}px`,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#FB923C' : '#FCD34D',
              left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * r}px)`,
              top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * r}px)`,
              animationDuration: `${1 + (i % 3) * 0.5}s`,
              animationDelay: `${i * 0.05}s`,
            }} />
        );
      })}
      <div className="absolute w-8 h-8 rounded-full"
        style={{ background: 'radial-gradient(circle, white, #FB923C)', filter: 'blur(2px)' }} />
    </div>
  );
}

function VisualKilonova() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl"
      style={{ background: 'radial-gradient(circle at 50% 50%, #EC489944, #7C3AED, #1e1b4b, #050A18)' }}>
      {/* Two neutron stars orbiting */}
      {[0, 1].map(i => (
        <div key={i} className="absolute rounded-full"
          style={{
            width: 16, height: 16,
            background: `radial-gradient(circle, ${i === 0 ? '#F0F9FF' : '#E0F2FE'}, ${i === 0 ? '#7DD3FC' : '#60A5FA'})`,
            boxShadow: `0 0 12px ${i === 0 ? '#7DD3FC' : '#60A5FA'}`,
            left: `calc(50% + ${i === 0 ? -30 : 30}px)`,
            top: '50%',
            transform: 'translateY(-50%)',
          }} />
      ))}
      {/* Gold particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute rounded-full animate-ping"
          style={{
            width: 4, height: 4,
            background: '#FCD34D',
            left: `${30 + Math.random() * 40}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDuration: `${1.5 + Math.random()}s`,
            animationDelay: `${Math.random()}s`,
          }} />
      ))}
      <div className="absolute text-xs text-pink-300 font-mono bottom-3 left-0 right-0 text-center opacity-70">
        GW170817 — L'or se forme en quelques secondes
      </div>
    </div>
  );
}

function VisualAGB() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl"
      style={{ background: 'radial-gradient(circle at 50% 50%, #34D39933, #059669, #064e3b, #050A18)' }}>
      <div className="absolute rounded-full animate-pulse"
        style={{ width: 100, height: 100, background: 'radial-gradient(circle, #FCA5A5, #F87171, #EF4444, #B91C1C)', filter: 'blur(2px)' }} />
      <div className="absolute rounded-full opacity-40"
        style={{ width: 160, height: 160, border: '2px dashed #34D399', borderRadius: '50%' }} />
      <div className="absolute rounded-full opacity-20"
        style={{ width: 220, height: 220, border: '1px solid #34D399', borderRadius: '50%' }} />
    </div>
  );
}

function VisualCosmic() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center overflow-hidden rounded-xl"
      style={{ background: 'linear-gradient(135deg, #050A18, #172554, #050A18)' }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="absolute"
          style={{
            width: `${200 - i * 30}px`,
            height: 2,
            background: `linear-gradient(to right, transparent, #60A5FA, transparent)`,
            top: `${20 + i * 15}%`,
            left: `${i * 5}%`,
            opacity: 0.6 - i * 0.1,
            transform: `rotate(${-15 + i * 5}deg)`,
          }} />
      ))}
      <div className="z-10 text-center">
        <div className="text-3xl mb-1">⚡</div>
        <div className="text-xs text-blue-300 font-mono">Spallation ~ c</div>
      </div>
    </div>
  );
}

const Visuals: Record<string, () => React.JSX.Element> = {
  bigbang: VisualBigBang,
  star: VisualStar,
  supernova: VisualSupernova,
  kilonova: VisualKilonova,
  agb: VisualAGB,
  cosmic: VisualCosmic,
};

export default function Nucleosynthese() {
  const [activeId, setActiveId] = useState('bigbang');
  const active = events.find(e => e.id === activeId) ?? events[0];
  const Visual = Visuals[active.visual] ?? VisualBigBang;

  return (
    <AtomicLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Nucléosynthèse</h1>
          <p className="text-gray-500 text-sm">La forge cosmique des éléments — du Big Bang aux collisions d'étoiles</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline sidebar */}
          <div className="space-y-2">
            {events.map(ev => (
              <button
                key={ev.id}
                onClick={() => setActiveId(ev.id)}
                className={`w-full text-left rounded-xl border p-3 transition-all ${activeId === ev.id ? 'scale-[1.02]' : 'opacity-60 hover:opacity-80'}`}
                style={{
                  background: activeId === ev.id ? `${ev.color}18` : 'rgba(255,255,255,0.03)',
                  borderColor: activeId === ev.id ? `${ev.color}55` : 'rgba(255,255,255,0.07)',
                  boxShadow: activeId === ev.id ? `0 0 16px ${ev.glow}` : 'none',
                }}>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{ev.icon}</span>
                  <div>
                    <div className="text-xs font-bold" style={{ color: ev.color }}>{ev.era}</div>
                    <div className="text-[10px] text-gray-600">{ev.time}</div>
                  </div>
                </div>
                {/* Elements produced */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {ev.elements.slice(0, 6).map(sym => (
                    <span key={sym} className="text-[9px] font-mono px-1 rounded"
                      style={{ background: `${ev.color}22`, color: ev.color }}>
                      {sym}
                    </span>
                  ))}
                  {ev.elements.length > 6 && (
                    <span className="text-[9px] text-gray-600">+{ev.elements.length - 6}</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="lg:col-span-2 space-y-4">
            <Visual />

            <div className="rounded-xl border p-6"
              style={{
                background: `${active.color}08`,
                borderColor: `${active.color}33`,
              }}>
              <div className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: active.color }}>
                {active.era} · {active.time}
              </div>
              <h2 className="text-xl font-bold text-white mb-1">{active.title}</h2>
              <p className="text-xs text-gray-500 mb-4">{active.subtitle}</p>

              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line space-y-3">
                {active.content.split('\n\n').map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                  }} />
                ))}
              </div>

              {/* Elements badge list */}
              <div className="mt-5 pt-4 border-t" style={{ borderColor: `${active.color}22` }}>
                <div className="text-[10px] text-gray-600 uppercase tracking-wider mb-2">Éléments principaux produits</div>
                <div className="flex flex-wrap gap-1.5">
                  {active.elements.map(sym => (
                    <span key={sym}
                      className="px-2 py-0.5 rounded font-mono text-xs font-bold"
                      style={{ background: `${active.color}22`, color: active.color, border: `1px solid ${active.color}44` }}>
                      {sym}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AtomicLayout>
  );
}
