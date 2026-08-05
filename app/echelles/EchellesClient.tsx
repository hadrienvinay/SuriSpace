'use client';
// app/echelles/EchellesClient.tsx
import { useEffect, useRef, useState, type ComponentType } from 'react';
import Link from 'next/link';
import ScrollTrajectory from '@/components/widgets/ScrollTrajectory';
import {
  PlanckIcon, QuarkIcon, NucleusIcon, AtomIcon, DnaIcon, VirusIcon, CellIcon,
  AntIcon, HumanIcon, MountainIcon, EarthIcon, SunIcon, LightRayIcon,
  GalaxyDiskIcon, SuperclusterIcon, UniverseIcon,
} from '@/components/icons/ScaleIcons';

type Domain = 'quantum' | 'atomic' | 'life' | 'human' | 'planet' | 'cosmic';

type Stop = {
  expo: number;
  val: string;
  name: string;
  meters: string;
  Icon: ComponentType<{ size?: number }>;
  domain: Domain;
  domainLabel: string;
  desc: string;
  href?: string;
  hrefLabel?: string;
};

const stops: Stop[] = [
  { expo: -35, val: '1,6 × 10⁻³⁵ m', name: 'Longueur de Planck', meters: '1.6 × 10⁻³⁵ m', Icon: PlanckIcon, domain: 'quantum', domainLabel: 'Quantique',
    desc: "La plus petite longueur ayant un sens physique connu — en deçà, l'espace continu s'effondre sous les effets quantiques de la gravité.",
    href: '/atoms/particules', hrefLabel: 'Voir les particules élémentaires' },
  { expo: -18, val: '~10⁻¹⁸ m', name: 'Quark, boson', meters: '1 × 10⁻¹⁸ m', Icon: QuarkIcon, domain: 'quantum', domainLabel: 'Quantique',
    desc: "Limite de résolution des accélérateurs actuels (LHC) — les constituants élémentaires de la matière n'ont pas de taille mesurée.",
    href: '/atoms/particules', hrefLabel: 'Voir les particules élémentaires' },
  { expo: -15, val: '~1 fm', name: 'Proton, noyau atomique', meters: '1 × 10⁻¹⁵ m', Icon: NucleusIcon, domain: 'quantum', domainLabel: 'Quantique',
    desc: "Le noyau atomique concentre 99,9 % de la masse de l'atome dans un volume cent mille fois plus petit que l'atome lui-même.",
    href: '/atoms/nucleosynthese', hrefLabel: 'Voir la nucléosynthèse' },
  { expo: -10, val: '~1 Å', name: "Atome d'hydrogène", meters: '1 × 10⁻¹⁰ m', Icon: AtomIcon, domain: 'atomic', domainLabel: 'Atomique',
    desc: "Le nuage électronique définit la taille de l'atome — un dixième de nanomètre, l'unité de base de toute matière.",
    href: '/atoms/tableau', hrefLabel: 'Voir le tableau périodique' },
  { expo: -9, val: '~2 nm', name: "Double hélice d'ADN", meters: '2 × 10⁻⁹ m', Icon: DnaIcon, domain: 'life', domainLabel: 'Vivant',
    desc: "Le diamètre de la molécule qui porte l'information génétique de toute vie sur Terre.",
    href: '/biologie/genetique', hrefLabel: 'Voir la génétique' },
  { expo: -7, val: '~100 nm', name: 'Virus', meters: '1 × 10⁻⁷ m', Icon: VirusIcon, domain: 'life', domainLabel: 'Vivant',
    desc: "À la frontière entre chimie et biologie — trop petit pour être vu au microscope optique classique.",
    href: '/biologie/vivant', hrefLabel: 'Voir le vivant' },
  { expo: -5, val: '~10 µm', name: 'Cellule humaine', meters: '1 × 10⁻⁵ m', Icon: CellIcon, domain: 'life', domainLabel: 'Vivant',
    desc: "Le corps humain compte environ 37 000 milliards de cellules de cette taille typique.",
    href: '/biologie/cellules', hrefLabel: 'Voir les cellules' },
  { expo: -3, val: '~5 mm', name: 'Fourmi', meters: '5 × 10⁻³ m', Icon: AntIcon, domain: 'human', domainLabel: 'Humain',
    desc: "À cette échelle, la vie devient visible à l'œil nu — le seuil de notre perception directe du monde.",
    href: '/biologie/vivant', hrefLabel: 'Voir le vivant' },
  { expo: 0, val: '~1,7 m', name: 'Être humain', meters: '1,7 m', Icon: HumanIcon, domain: 'human', domainLabel: 'Humain',
    desc: "L'échelle de référence — le point zéro à partir duquel toutes les autres échelles se mesurent par comparaison.",
    href: '/biologie/corps', hrefLabel: 'Voir le corps humain' },
  { expo: 4, val: '~8,8 km', name: 'Everest', meters: '8 849 m', Icon: MountainIcon, domain: 'human', domainLabel: 'Humain',
    desc: "Le plus haut sommet terrestre, même s'il fait pâle figure devant le Mont Olympus sur Mars avec ses 22 kilomètres de haut environ",
    href: '/space/bodys', hrefLabel: 'Voir les corps du système solaire' },
  { expo: 7, val: '~12 742 km', name: 'Diamètre de la Terre', meters: '1,27 × 10⁷ m', Icon: EarthIcon, domain: 'planet', domainLabel: 'Planétaire',
    desc: "12 742 kilomètres, soit un peu plus de quatre fois celle de la lune. C'est la plus grande des planètes rocheuse, juste devant Venus.",
    href: '/space/bodys', hrefLabel: 'Voir les corps du système solaire' },
  { expo: 13, val: '~1 UA', name: 'Distance Terre-Soleil', meters: '1,5 × 10¹¹ m', Icon: SunIcon, domain: 'planet', domainLabel: 'Planétaire',
    desc: "150 millions de kilomètres — la lumière du Soleil met 8 minutes et 20 secondes à nous atteindre.",
    href: '/space/carte', hrefLabel: 'Voir le système solaire' },
  { expo: 16, val: '~1 année-lumière', name: 'Année-lumière', meters: '9,46 × 10¹⁵ m', Icon: LightRayIcon, domain: 'cosmic', domainLabel: 'Cosmique',
    desc: "La distance parcourue par la lumière en une année — l'étoile la plus proche du Soleil, Proxima du Centaure, est à 4,2 années-lumière.",
    href: '/space/stars', hrefLabel: 'Voir la carte du ciel' },
  { expo: 21, val: '~100 000 al', name: 'Voie lactée', meters: '9,5 × 10²⁰ m', Icon: GalaxyDiskIcon, domain: 'cosmic', domainLabel: 'Cosmique',
    desc: "Notre galaxie compte entre 100 et 400 milliards d'étoiles réparties sur un disque spiral de 100 000 années-lumière de diamètre.",
    href: '/space/galaxies', hrefLabel: 'Voir les galaxies' },
  { expo: 24, val: '~500 millions al', name: 'Superamas de Laniakea', meters: '4,7 × 10²⁴ m', Icon: SuperclusterIcon, domain: 'cosmic', domainLabel: 'Cosmique',
    desc: "Le superamas qui abrite la Voie lactée regroupe environ 100 000 galaxies sur 520 millions d'années-lumière.",
    href: '/space/galaxies', hrefLabel: 'Voir les galaxies' },
  { expo: 26, val: '~8,8 × 10²⁶ m', name: 'Univers observable', meters: '8,8 × 10²⁶ m', Icon: UniverseIcon, domain: 'cosmic', domainLabel: 'Cosmique',
    desc: "93 milliards d'années-lumière de diamètre — la limite de ce que la lumière a eu le temps de nous apporter depuis le Big Bang.",
    href: '/space/astronomie', hrefLabel: "Voir l'astronomie" },
];

const domainMeta: Record<Domain, { color: string; bg: string }> = {
  quantum: { color: '#A78BFA', bg: 'rgba(167,139,250,0.14)' },
  atomic: { color: '#22D3EE', bg: 'rgba(34,211,238,0.14)' },
  life: { color: '#34D399', bg: 'rgba(52,211,153,0.14)' },
  human: { color: '#FBBF24', bg: 'rgba(251,191,36,0.14)' },
  planet: { color: '#60A5FA', bg: 'rgba(96,165,250,0.14)' },
  cosmic: { color: '#F472B6', bg: 'rgba(244,114,182,0.14)' },
};

const sectionId = (i: number) => `echelle-stop-${i}`;

// un point de repère par domaine (première occurrence), plus le hero
const trajectoryWaypoints = [
  { id: 'echelle-hero', label: 'Introduction' },
  ...stops
    .reduce<{ id: string; label: string }[]>((acc, s, i) => {
      if (!acc.some((wp) => wp.label === s.domainLabel)) {
        acc.push({ id: sectionId(i), label: s.domainLabel });
      }
      return acc;
    }, []),
];

const WAYPOINTS = [0, 0.16, 0.32, 0.48, 0.64, 0.82, 1];
const WAYPOINT_HUE = [265, 255, 190, 150, 45, 210, 205];

type Particle = {
  orbR: number; orbA: number; orbSpeed: number;
  shellR: number; shellA: number;
  helixT: number; helixStrand: number;
  cloudX: number; cloudY: number;
  gridX: number; gridY: number;
  ringR: number; ringA: number;
  gArm: number; gR: number; gA: number;
  size: number; tw: number; twSpeed: number;
};

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function posAt(p: Particle, wp: number, cx: number, cy: number, scale: number): [number, number] {
  switch (wp) {
    case 0: { const a = p.orbA; return [cx + Math.cos(a) * p.orbR, cy + Math.sin(a) * p.orbR * 0.55]; }
    case 1: { const a = p.shellA; return [cx + Math.cos(a) * p.shellR, cy + Math.sin(a) * p.shellR * 0.85]; }
    case 2: { const t = p.helixT * Math.PI * 8; const strandOff = p.helixStrand ? Math.PI : 0;
      return [cx + Math.sin(t + strandOff) * 60, cy + (p.helixT - 0.5) * scale * 0.9]; }
    case 3: return [cx + p.cloudX * scale, cy + p.cloudY * scale];
    case 4: return [cx + p.gridX * scale, cy + p.gridY * scale];
    case 5: { const a = p.ringA; return [cx + Math.cos(a) * p.ringR * scale, cy + Math.sin(a) * p.ringR * scale * 0.35]; }
    default: { const arm = p.gArm * (Math.PI * 2 / 3); const a = p.gA + p.gR * 10 + arm;
      return [cx + Math.cos(a) * p.gR * scale, cy + Math.sin(a) * p.gR * scale * 0.5]; }
  }
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, DPR = 1;
    const N = 180;
    const particles: Particle[] = [];

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas!.width = W * DPR; canvas!.height = H * DPR;
      canvas!.style.width = W + 'px'; canvas!.style.height = H + 'px';
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function initParticles() {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          orbR: 18 + Math.random() * 22,
          orbA: Math.random() * Math.PI * 2,
          orbSpeed: 0.01 + Math.random() * 0.02,
          shellR: 40 + (i % 4) * 22,
          shellA: Math.random() * Math.PI * 2,
          helixT: Math.random(),
          helixStrand: i % 2,
          cloudX: (Math.random() - 0.5) * 0.7,
          cloudY: (Math.random() - 0.5) * 0.7,
          gridX: ((i % 14) / 13 - 0.5) * 0.55,
          gridY: (Math.floor(i / 14) / 12 - 0.5) * 0.5,
          ringR: 0.28 + (i % 5) * 0.045,
          ringA: Math.random() * Math.PI * 2,
          gArm: i % 3,
          gR: 0.06 + Math.random() * 0.46,
          gA: Math.random() * Math.PI * 2,
          size: 1 + Math.random() * 1.8,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.02 + Math.random() * 0.03,
        });
      }
    }

    resize();
    initParticles();
    window.addEventListener('resize', resize);

    function updateProgress() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / Math.max(1, scrollable)));
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    let rafId = 0;
    function draw() {
      const progress = progressRef.current;
      ctx!.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H * 0.5;
      const scale = Math.min(W, H) * 0.9;

      let seg = 0;
      for (let k = 0; k < WAYPOINTS.length - 1; k++) {
        if (progress >= WAYPOINTS[k] && progress <= WAYPOINTS[k + 1]) { seg = k; break; }
        if (progress > WAYPOINTS[WAYPOINTS.length - 1]) seg = WAYPOINTS.length - 2;
      }
      const segT = (progress - WAYPOINTS[seg]) / Math.max(0.0001, WAYPOINTS[seg + 1] - WAYPOINTS[seg]);
      const hue = lerp(WAYPOINT_HUE[seg], WAYPOINT_HUE[seg + 1], segT);

      const bgGrad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.75);
      bgGrad.addColorStop(0, `hsla(${hue}, 55%, 8%, 1)`);
      bgGrad.addColorStop(1, 'rgba(2,8,23,1)');
      ctx!.fillStyle = bgGrad;
      ctx!.fillRect(0, 0, W, H);

      particles.forEach((p) => {
        p.orbA += p.orbSpeed;
        p.shellA += p.orbSpeed * 0.4;
        p.tw += p.twSpeed;

        const [x1, y1] = posAt(p, seg, cx, cy, scale);
        const [x2, y2] = posAt(p, seg + 1, cx, cy, scale);
        const x = lerp(x1, x2, segT);
        const y = lerp(y1, y2, segT);

        const twinkle = 0.5 + 0.5 * Math.sin(p.tw);
        ctx!.beginPath();
        ctx!.arc(x, y, p.size * (0.7 + twinkle * 0.5), 0, Math.PI * 2);
        ctx!.fillStyle = `hsla(${hue}, 85%, 78%, ${0.35 + twinkle * 0.5})`;
        ctx!.fill();
      });

      let glowAlpha = 0, glowR = 30;
      if (progress < 0.2) { glowAlpha = 1 - progress / 0.2; glowR = 24; }
      else if (progress > 0.78) { glowAlpha = (progress - 0.78) / 0.22; glowR = 100; }
      if (glowAlpha > 0) {
        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, glowR);
        g.addColorStop(0, `hsla(${hue},80%,70%,${0.5 * glowAlpha})`);
        g.addColorStop(1, `hsla(${hue},80%,70%,0)`);
        ctx!.beginPath(); ctx!.arc(cx, cy, glowR, 0, Math.PI * 2); ctx!.fillStyle = g; ctx!.fill();
      }

      rafId = requestAnimationFrame(draw);
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      draw();
    } else {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateProgress);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

export default function EchellesClient() {
  const [current, setCurrent] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => {
    const readoutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.i);
            setCurrent(i);
          }
        });
      },
      { threshold: 0.5 }
    );
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.i);
            setRevealed((prev) => new Set(prev).add(i));
          }
        });
      },
      { threshold: 0.2 }
    );
    sectionRefs.current.forEach((el) => {
      if (el) { readoutObserver.observe(el); revealObserver.observe(el); }
    });
    return () => { readoutObserver.disconnect(); revealObserver.disconnect(); };
  }, []);

  const currentStop = stops[current];

  return (
    <>
      <ParticleBackground />
      <ScrollTrajectory waypoints={trajectoryWaypoints} />

      {/* Hero */}
      <div id="echelle-hero" className="relative z-10 min-h-[76vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <div className="text-xs font-bold tracking-[0.32em] uppercase mb-5" style={{ color: '#60A5FA' }}>
          Encyclopédie · Échelles de l&apos;Univers
        </div>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #34D399)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Exo 2', sans-serif",
          }}
        >
          De Planck à l&apos;Univers observable
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Entre la plus petite longueur physiquement définie et la plus grande distance observable : 62 ordres de grandeur. Plongez à travers les échelles, de
          l&apos;orbite d&apos;un atome jusqu&apos;au fin fond de l'univers.
        </p>
        <div className="mt-14 flex flex-col items-center gap-2.5 text-[11px] uppercase tracking-[0.15em] text-gray-500 animate-bounce">
          Faites défiler
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
            <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 15L8 22L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Sticky readout */}
      <div className="sticky top-20 z-20 max-w-[1120px] mx-auto px-6">
        <div
          className="flex items-center justify-between gap-5 flex-wrap rounded-2xl px-7 py-5"
          style={{ background: 'rgba(6,12,28,0.78)', border: '1px solid rgba(96,165,250,0.22)', backdropFilter: 'blur(18px)' }}
        >
          <div>
            <div className="text-xl font-bold" style={{ color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>
              {currentStop.val}
            </div>
            <div className="text-[10.5px] text-gray-500 uppercase tracking-[0.12em] mt-1">{currentStop.name}</div>
          </div>
          <div
            className="text-[10px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full"
            style={{ color: domainMeta[currentStop.domain].color, background: domainMeta[currentStop.domain].bg }}
          >
            {currentStop.domainLabel}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="relative z-10 max-w-[900px] mx-auto px-6 pt-16 pb-56">
        {stops.map((s, i) => (
          <div
            key={s.expo}
            id={sectionId(i)}
            ref={(el) => { sectionRefs.current[i] = el; }}
            data-i={i}
            className="flex flex-col items-center text-center justify-center min-h-[78vh] py-40 transition-all duration-700 ease-out"
            style={{
              opacity: revealed.has(i) ? 1 : 0,
              transform: revealed.has(i) ? 'translateY(0)' : 'translateY(32px)',
            }}
          >
            <div className="text-[13px] font-bold tracking-[0.18em] mb-5" style={{ color: '#60A5FA', fontFamily: "'JetBrains Mono', monospace" }}>
              10<sup>{s.expo > 0 ? `+${s.expo}` : s.expo}</sup> m
            </div>
            <div className="mb-6" style={{ color: domainMeta[s.domain].color, filter: 'drop-shadow(0 0 20px currentColor)' }}>
              <s.Icon size={52} />
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">{s.name}</div>
            <div className="text-sm text-gray-500 mb-6" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{s.meters}</div>
            <div
              className="text-[10.5px] font-bold uppercase tracking-[0.12em] px-4 py-1.5 rounded-full mb-6"
              style={{ color: domainMeta[s.domain].color, background: domainMeta[s.domain].bg }}
            >
              {s.domainLabel}
            </div>
            <p className="text-base sm:text-[17px] text-gray-300 leading-[1.85] max-w-[580px]">{s.desc}</p>
            {s.href && (
              <Link
                href={s.href}
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold rounded-full px-5 py-2.5 transition-all hover:brightness-110"
                style={{ color: domainMeta[s.domain].color, background: domainMeta[s.domain].bg, border: `1px solid ${domainMeta[s.domain].color}40` }}
              >
                {s.hrefLabel}
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-6 pb-24 text-gray-500 text-sm">
        Fin du voyage — 8,8 × 10²⁶ mètres, la limite de l&apos;observable.
      </div>
    </>
  );
}
