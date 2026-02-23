'use client';
import AtomicLayout from '@/components/AtomicLayout';
import { useState, useEffect, useRef } from 'react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

type ParticleFamily = 'quark' | 'lepton' | 'gauge-boson' | 'scalar-boson';

interface Particle {
  id: string;
  symbol: string;
  name: string;
  nameFr: string;
  family: ParticleFamily;
  generation?: 1 | 2 | 3;
  mass: string;
  charge: string;
  spin: string;
  color: string;
  glowColor: string;
  antiparticle?: string;
  description: string;
  discovered: string;
  facts: string[];
  force?: string;
}

const PARTICLES: Particle[] = [
  // ── Quarks ──────────────────────────────────────────────────────────────────
  {
    id: 'up', symbol: 'u', name: 'Up', nameFr: 'Up', family: 'quark', generation: 1,
    mass: '2.2 MeV/c²', charge: '+²⁄₃', spin: '½',
    color: '#38bdf8', glowColor: '#0ea5e9',
    antiparticle: 'ū',
    description: "Le quark le plus léger. Deux quarks up et un down forment le proton. Essentiel à toute matière stable de l'univers.",
    discovered: '1968 — Stanford Linear Accelerator',
    facts: ['Constituant du proton (uud)', 'Jamais observé isolément (confinement)', 'Masse ~470× plus légère que l\'électron'],
  },
  {
    id: 'down', symbol: 'd', name: 'Down', nameFr: 'Down', family: 'quark', generation: 1,
    mass: '4.7 MeV/c²', charge: '−¹⁄₃', spin: '½',
    color: '#38bdf8', glowColor: '#0ea5e9',
    antiparticle: 'd̄',
    description: "Compagnon du quark up dans les nucléons. Un up et deux downs forment le neutron. La désintégration beta transforme un down en up.",
    discovered: '1968 — Stanford',
    facts: ['Constituant du neutron (udd)', 'La désintégration β⁻ : d→u+e⁻+ν̄ₑ', 'Charge fractionnaire −1/3'],
  },
  {
    id: 'charm', symbol: 'c', name: 'Charm', nameFr: 'Charme', family: 'quark', generation: 2,
    mass: '1.27 GeV/c²', charge: '+²⁄₃', spin: '½',
    color: '#34d399', glowColor: '#10b981',
    antiparticle: 'c̄',
    description: "Découvert en 1974 simultanément à Stanford et Brookhaven (\"Novembre révolutionnaire\"). Sa découverte confirma le Modèle Standard.",
    discovered: '1974 — SLAC & BNL (\"particule J/ψ\")',
    facts: ['Découverte double → Prix Nobel 1976 (Ting & Richter)', 'Forme les mésons D', 'Masse ~1 270× celle du proton'],
  },
  {
    id: 'strange', symbol: 's', name: 'Strange', nameFr: 'Étrange', family: 'quark', generation: 2,
    mass: '96 MeV/c²', charge: '−¹⁄₃', spin: '½',
    color: '#34d399', glowColor: '#10b981',
    antiparticle: 's̄',
    description: "Donne leur \"étrangeté\" aux kaons et hypérons. Sa désintégration lente suggéra une règle de sélection — la première indice d'une physique plus profonde.",
    discovered: '1947 — C.F. Powell (rayons cosmiques)',
    facts: ['À l\'origine du concept de "strangeness"', 'Se désintègre via interaction faible (lente)', 'Présent dans les noyaux hyperoniques'],
  },
  {
    id: 'top', symbol: 't', name: 'Top', nameFr: 'Top', family: 'quark', generation: 3,
    mass: '172.76 GeV/c²', charge: '+²⁄₃', spin: '½',
    color: '#f59e0b', glowColor: '#d97706',
    antiparticle: 't̄',
    description: "La particule fondamentale la plus massive connue — plus lourde qu'un atome de tungstène. Se désintègre avant de s'hadroniser, permettant une étude directe.",
    discovered: '1995 — Fermilab Tevatron',
    facts: ['173 GeV/c² — plus lourd qu\'un noyau d\'or', 'Durée de vie ~5×10⁻²⁵ s', 'Trop lourd pour former des hadrons stables'],
  },
  {
    id: 'bottom', symbol: 'b', name: 'Bottom', nameFr: 'Bas', family: 'quark', generation: 3,
    mass: '4.18 GeV/c²', charge: '−¹⁄₃', spin: '½',
    color: '#f59e0b', glowColor: '#d97706',
    antiparticle: 'b̄',
    description: "Forme les mésons B, essentiels pour étudier la violation CP — l'asymétrie matière/antimatière qui a permis l'existence de notre univers.",
    discovered: '1977 — Fermilab (Lederman)',
    facts: ['Mésons B utilisés pour étudier la violation CP', 'Clé de l\'asymétrie matière/antimatière', 'Prix Nobel 2008 (Kobayashi & Maskawa)'],
  },

  // ── Leptons ─────────────────────────────────────────────────────────────────
  {
    id: 'electron', symbol: 'e⁻', name: 'Electron', nameFr: 'Électron', family: 'lepton', generation: 1,
    mass: '0.511 MeV/c²', charge: '−1', spin: '½',
    color: '#a78bfa', glowColor: '#8b5cf6',
    antiparticle: 'e⁺',
    description: "La particule chargée la plus légère et stable. Définit les propriétés chimiques des atomes. Son antiparticule, le positron, fut la première antimatière découverte.",
    discovered: '1897 — J.J. Thomson',
    facts: ['Première particule subatomique découverte', 'Spin ½ → obéit à l\'équation de Dirac', 'Positron prédit par Dirac (1928), découvert 1932'],
  },
  {
    id: 'electron-neutrino', symbol: 'νₑ', name: 'Electron neutrino', nameFr: 'Neutrino électronique', family: 'lepton', generation: 1,
    mass: '< 1.1 eV/c²', charge: '0', spin: '½',
    color: '#a78bfa', glowColor: '#8b5cf6',
    description: "Presque sans masse, presque sans interaction. 65 milliards de neutrinos solaires traversent chaque cm² de votre corps chaque seconde sans rien toucher.",
    discovered: '1956 — Reines & Cowan',
    facts: ['65 milliards/cm²/s depuis le Soleil', 'Oscillation entre saveurs → masse non nulle', 'Plus difficile à détecter que tout autre particule'],
  },
  {
    id: 'muon', symbol: 'μ⁻', name: 'Muon', nameFr: 'Muon', family: 'lepton', generation: 2,
    mass: '105.66 MeV/c²', charge: '−1', spin: '½',
    color: '#ec4899', glowColor: '#db2777',
    antiparticle: 'μ⁺',
    description: "\"Qui a commandé ça?\" dit Rabi en 1936. Le muon est un électron 207× plus lourd, instable (2.2 μs). Sa longévité relativiste permet de valider la dilatation du temps.",
    discovered: '1936 — Anderson & Neddermeyer',
    facts: ['"Who ordered that?" — I.I. Rabi', 'Durée de vie 2.2 μs — preuve de la relativité', 'g-2 du muon : anomalie possible au-delà du MS'],
  },
  {
    id: 'muon-neutrino', symbol: 'ν_μ', name: 'Muon neutrino', nameFr: 'Neutrino muonique', family: 'lepton', generation: 2,
    mass: '< 0.19 MeV/c²', charge: '0', spin: '½',
    color: '#ec4899', glowColor: '#db2777',
    description: "Neutrino associé au muon. Sa distinction du neutrino électronique — prouvée en 1962 — valut le prix Nobel. Les neutrinos oscillent entre ces trois saveurs.",
    discovered: '1962 — Lederman, Schwartz, Steinberger (Prix Nobel 1988)',
    facts: ['Preuve qu\'il existe plusieurs saveurs de neutrinos', 'Prix Nobel 1988', 'Oscille en νₑ et ν_τ'],
  },
  {
    id: 'tau', symbol: 'τ⁻', name: 'Tau', nameFr: 'Tau', family: 'lepton', generation: 3,
    mass: '1776.86 MeV/c²', charge: '−1', spin: '½',
    color: '#f97316', glowColor: '#ea580c',
    antiparticle: 'τ⁺',
    description: "Le lepton chargé le plus lourd — 3477× la masse de l'électron, 17× celle du muon. Se désintègre en 2.9×10⁻¹³ s. Peut se désintégrer en hadrons, seul lepton à le faire.",
    discovered: '1975 — Martin Perl, SLAC',
    facts: ['Seul lepton pouvant se désintégrer en hadrons', 'Durée de vie ~2.9×10⁻¹³ s', 'Prix Nobel 1995 (Perl)'],
  },
  {
    id: 'tau-neutrino', symbol: 'ν_τ', name: 'Tau neutrino', nameFr: 'Neutrino tauique', family: 'lepton', generation: 3,
    mass: '< 18.2 MeV/c²', charge: '0', spin: '½',
    color: '#f97316', glowColor: '#ea580c',
    description: "Dernière particule du Modèle Standard à avoir été directement observée. Sa détection en 2000 au Fermilab compléta le puzzle des leptons.",
    discovered: '2000 — Expérience DONUT, Fermilab',
    facts: ['Dernière particule du MS à être détectée directement', 'Seulement 9 interactions observées en 2000', 'Prédit depuis 1975'],
  },

  // ── Gauge Bosons ─────────────────────────────────────────────────────────────
  {
    id: 'photon', symbol: 'γ', name: 'Photon', nameFr: 'Photon', family: 'gauge-boson',
    mass: '0', charge: '0', spin: '1',
    color: '#fde68a', glowColor: '#fbbf24',
    force: 'Électromagnétique',
    description: "Médiateur de la force électromagnétique — la lumière elle-même. Portée infinie, masse nulle. Décrit par Maxwell, quantifié par Einstein en 1905 (effet photoélectrique).",
    discovered: '1905 — Einstein (concept), 1923 — Compton (confirmation)',
    facts: ['Voyage à c = 299 792 458 m/s', 'Masse nulle → portée infinie de l\'EM', 'Prix Nobel 1921 Einstein (effet photoélectrique)'],
  },
  {
    id: 'gluon', symbol: 'g', name: 'Gluon', nameFr: 'Gluon', family: 'gauge-boson',
    mass: '0', charge: '0', spin: '1',
    color: '#86efac', glowColor: '#22c55e',
    force: 'Forte (QCD)',
    description: "Médiateur de la force forte. Porte lui-même la \"charge de couleur\", il s'auto-couple. C'est pourquoi la force forte augmente avec la distance (confinement).",
    discovered: '1979 — Expérience PETRA, DESY (Hamburg)',
    facts: ['8 gluons indépendants (base de SU(3))', 'S\'auto-couple → confinement des quarks', 'Observé via jets à 3 corps dans e⁺e⁻'],
  },
  {
    id: 'w-boson', symbol: 'W±', name: 'W boson', nameFr: 'Boson W', family: 'gauge-boson',
    mass: '80.377 GeV/c²', charge: '±1', spin: '1',
    color: '#f87171', glowColor: '#ef4444',
    force: 'Faible',
    description: "Médiateur de l'interaction faible chargée. Permet aux quarks de changer de saveur (β radioactivité). Sa masse énorme (~80 GeV) explique la courte portée de la force faible.",
    discovered: '1983 — UA1 & UA2 (CERN) — Carlo Rubbia',
    facts: ['Masse ~80× celle du proton', 'Portée ~10⁻¹⁸ m (10 000× plus petit qu\'un proton)', 'Prix Nobel 1984 (Rubbia & van der Meer)'],
  },
  {
    id: 'z-boson', symbol: 'Z⁰', name: 'Z boson', nameFr: 'Boson Z', family: 'gauge-boson',
    mass: '91.1876 GeV/c²', charge: '0', spin: '1',
    color: '#fb923c', glowColor: '#f97316',
    force: 'Faible',
    description: "Médiateur des courants neutres faibles. Sa découverte prouva l'unification électrofaible. Le nombre de générations de neutrinos (3) est mesuré à partir de sa largeur de désintégration.",
    discovered: '1983 — UA1 & UA2 (CERN)',
    facts: ['Prouve qu\'il existe exactement 3 générations de leptons légers', 'Masse 91.2 GeV — le \"poteau de buts\" du LEP', 'Largeur Γ ≈ 2.5 GeV → 3 saveurs de neutrinos'],
  },

  // ── Scalar Boson ─────────────────────────────────────────────────────────────
  {
    id: 'higgs', symbol: 'H⁰', name: 'Higgs boson', nameFr: 'Boson de Higgs', family: 'scalar-boson',
    mass: '125.25 GeV/c²', charge: '0', spin: '0',
    color: '#e879f9', glowColor: '#d946ef',
    force: 'Champ de Higgs (masse)',
    description: "La particule de Dieu — le quantum du champ de Higgs qui donne leur masse aux particules fondamentales. Sa découverte en 2012 au LHC compléta le Modèle Standard après 48 ans de recherche.",
    discovered: '2012 — LHC (ATLAS & CMS), CERN',
    facts: ['Prédit en 1964 (Higgs, Brout, Englert)', 'Découvert le 4 juillet 2012 au LHC', 'Prix Nobel 2013 (Higgs & Englert)', 'Seul boson scalaire (spin 0) connu'],
  },
];

const FAMILIES = [
  { id: 'quark',        label: 'Quarks',         icon: '⬡', desc: '6 quarks en 3 générations',      color: '#38bdf8', bg: 'rgba(56,189,248,0.08)'   },
  { id: 'lepton',       label: 'Leptons',         icon: '○', desc: '6 leptons en 3 générations',     color: '#a78bfa', bg: 'rgba(167,139,250,0.08)'  },
  { id: 'gauge-boson',  label: 'Bosons de jauge', icon: '◈', desc: '4 bosons médiateurs de force',   color: '#fde68a', bg: 'rgba(253,230,138,0.08)'  },
  { id: 'scalar-boson', label: 'Boson scalaire',  icon: '◆', desc: 'Le boson de Higgs',              color: '#e879f9', bg: 'rgba(232,121,249,0.08)'  },
];

const FORCES = [
  { name: 'Forte',             color: '#22c55e', boson: 'Gluon (g)',              range: '~10⁻¹⁵ m', coupling: '~1',      desc: 'Lie les quarks dans les hadrons. 100× plus forte que l\'EM. Couleur QCD.',                      emoji: '💚' },
  { name: 'Électromagnétique', color: '#fbbf24', boson: 'Photon (γ)',             range: '∞',         coupling: '~1/137',  desc: 'Lumière, électricité, chimie. Agit sur les charges électriques.',                             emoji: '⚡' },
  { name: 'Faible',            color: '#f97316', boson: 'W±, Z⁰',                range: '~10⁻¹⁸ m', coupling: '~10⁻⁶',  desc: 'Radioactivité β. Change la saveur des quarks. Brise la symétrie CP.',                          emoji: '☢️' },
  { name: 'Gravitation',       color: '#94a3b8', boson: 'Graviton ? (non découvert)', range: '∞',     coupling: '~10⁻³⁹', desc: 'La plus faible mais portée infinie. Pas intégrée dans le Modèle Standard.', emoji: '🌌' },
];

const GENERATION_COLS = [1, 2, 3];

// ─── Animated background canvas ──────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animFrame: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      color: ['#38bdf8', '#a78bfa', '#fde68a', '#e879f9', '#86efac'][Math.floor(Math.random() * 5)],
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 1.5 + p.pulse));
        particles.slice(i + 1, i + 5).forEach(p2 => {
          const dx = p2.x - p.x, dy = p2.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255,255,255,${0.03 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animFrame); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }} />;
}

// ─── Particle Card ────────────────────────────────────────────────────────────
function ParticleCard({ p, isSelected, onClick }: { p: Particle; isSelected: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: isSelected
          ? `linear-gradient(135deg, ${p.glowColor}20, ${p.glowColor}08)`
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${isSelected ? p.glowColor + '60' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 14,
        padding: '14px 16px',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isSelected ? `0 0 24px ${p.glowColor}30, 0 4px 16px rgba(0,0,0,0.4)` : undefined,
      }}
    >
      {isSelected && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${p.glowColor}80, transparent)`,
        }} />
      )}

      {/* Symbol */}
      <div style={{
        fontFamily: "'Exo 2', sans-serif",
        fontSize: 30,
        fontWeight: 700,
        color: p.color,
        lineHeight: 1,
        marginBottom: 8,
        textShadow: `0 0 20px ${p.glowColor}80`,
        letterSpacing: '-0.02em',
      }}>
        {p.symbol}
      </div>

      {/* Name */}
      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2, letterSpacing: '0.03em' }}>
        {p.nameFr}
      </div>

      {/* Mass */}
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontVariantNumeric: 'tabular-nums', fontFamily: 'monospace' }}>
        {p.mass}
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 4, marginTop: 10, flexWrap: 'wrap' }}>
        <Tag label={`q=${p.charge}`} color={p.color} />
        <Tag label={`s=${p.spin}`} color="rgba(255,255,255,0.3)" />
      </div>
    </div>
  );
}

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      padding: '2px 8px',
      borderRadius: 8,
      fontSize: 11,
      fontFamily: 'monospace',
      background: `${color}18`,
      color: color,
      border: `1px solid ${color}30`,
      letterSpacing: '0.04em',
    }}>
      {label}
    </span>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ p, onClose }: { p: Particle; onClose: () => void }) {
  const familyLabel = FAMILIES.find(f => f.id === p.family)?.label ?? p.family;

  return (
    <div style={{
      background: 'linear-gradient(160deg, rgba(10,14,28,0.98) 0%, rgba(5,8,16,0.99) 100%)',
      border: `1px solid ${p.glowColor}40`,
      borderRadius: 20,
      padding: '28px 30px',
      boxShadow: `0 0 60px ${p.glowColor}20, 0 20px 60px rgba(0,0,0,0.6)`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 180, height: 180, borderRadius: '50%',
        background: `radial-gradient(circle, ${p.glowColor}15, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: 16, right: 16,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8,
        color: 'rgba(255,255,255,0.5)',
        cursor: 'pointer',
        width: 30, height: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, fontFamily: 'monospace',
      }}>×</button>

      {/* Header */}
      <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', marginBottom: 22 }}>
        <div style={{
          width: 76, height: 76,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `radial-gradient(circle, ${p.glowColor}25, ${p.glowColor}05 70%)`,
          border: `1px solid ${p.glowColor}40`,
          borderRadius: 16, flexShrink: 0,
        }}>
          <span style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: 38,
            fontWeight: 700,
            color: p.color,
            textShadow: `0 0 24px ${p.glowColor}`,
            lineHeight: 1,
          }}>
            {p.symbol}
          </span>
        </div>

        <div>
          <div style={{ fontFamily: "'Exo 2', sans-serif", fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
            {p.nameFr}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
            {p.name}
            {p.antiparticle && <span style={{ marginLeft: 10, color: p.color + 'aa' }}>antipart. : {p.antiparticle}</span>}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            <span style={{ padding: '3px 10px', borderRadius: 10, fontSize: 11, background: `${p.glowColor}20`, color: p.color, border: `1px solid ${p.glowColor}40`, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {familyLabel}
            </span>
            {p.generation && (
              <span style={{ padding: '3px 10px', borderRadius: 10, fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                Génération {p.generation}
              </span>
            )}
            {p.force && (
              <span style={{ padding: '3px 10px', borderRadius: 10, fontSize: 11, background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                Force : {p.force}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
        {[
          { label: 'Masse', value: p.mass },
          { label: 'Charge', value: p.charge },
          { label: 'Spin', value: p.spin },
        ].map(({ label, value }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10, padding: '10px 12px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 15, color: '#fff', fontWeight: 500 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 18 }}>
        {p.description}
      </p>

      {/* Facts */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
          Propriétés notables
        </div>
        {p.facts.map((f, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 7 }}>
            <span style={{ color: p.color, fontSize: 13, flexShrink: 0, marginTop: 1 }}>◈</span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* Discovery */}
      <div style={{
        padding: '10px 14px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10, fontSize: 13,
        color: 'rgba(255,255,255,0.4)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <span style={{ opacity: 0.5 }}>🔭</span>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>Découverte :</span>
        <span style={{ color: 'rgba(255,255,255,0.65)' }}>{p.discovered}</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ParticulesPage() {
  const [selected, setSelected] = useState<Particle | null>(null);
  const [activeFamily, setActiveFamily] = useState<string>('all');
  const [tab, setTab] = useState<'particles' | 'forces' | 'standard-model'>('particles');

  const quarks      = PARTICLES.filter(p => p.family === 'quark');
  const leptons     = PARTICLES.filter(p => p.family === 'lepton');
  const gaugeBosons = PARTICLES.filter(p => p.family === 'gauge-boson');
  const scalarBoson = PARTICLES.filter(p => p.family === 'scalar-boson');
  const filtered    = activeFamily === 'all' ? PARTICLES : PARTICLES.filter(p => p.family === activeFamily);

  return (
    <AtomicLayout>
      <div className="relative" style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}>
        <style>{`
          .tab-btn {
            padding: 9px 22px;
            border: none;
            background: transparent;
            color: rgba(255,255,255,0.4);
            cursor: pointer;
            font-family: 'Exo 2', sans-serif;
            font-size: 14px;
            font-weight: 600;
            border-bottom: 2px solid transparent;
            transition: all 0.2s;
            white-space: nowrap;
          }
          .tab-btn:hover { color: rgba(255,255,255,0.8); }
          .tab-btn.active { color: #fff; border-bottom-color: #a78bfa; }

          .family-btn {
            padding: 7px 15px;
            border-radius: 20px;
            border: 1px solid rgba(255,255,255,0.1);
            background: transparent;
            color: rgba(255,255,255,0.5);
            cursor: pointer;
            font-family: 'Exo 2', sans-serif;
            font-size: 12px;
            font-weight: 600;
            transition: all 0.15s;
            white-space: nowrap;
          }
          .family-btn:hover { border-color: rgba(255,255,255,0.25); color: rgba(255,255,255,0.8); }
          .family-btn.active { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.07); color: #fff; }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .anim-in { animation: fadeInUp 0.5s ease both; }

          .gen-header {
            font-family: monospace;
            font-size: 11px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.25);
            text-align: center;
            padding: 8px 0 6px;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            margin-bottom: 10px;
          }

          .force-card {
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.07);
            border-radius: 16px;
            padding: 22px 24px;
            transition: all 0.2s;
          }
          .force-card:hover {
            border-color: rgba(255,255,255,0.15);
            background: rgba(255,255,255,0.04);
            transform: translateY(-2px);
          }
        `}</style>

        <ParticleCanvas />

        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* ── Hero ── */}
          <div className="mb-2">
            <span style={{ fontSize: 11, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
              Physique des particules · Modèle Standard
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "'Exo 2', sans-serif", letterSpacing: '-0.5px' }}>
            Particules Élémentaires
          </h1>
          <p className="text-base text-gray-400 mb-8" style={{ maxWidth: 560, lineHeight: 1.65 }}>
            Les constituants fondamentaux de la matière et les médiateurs des forces. 17 particules,
            4 forces, une théorie — le Modèle Standard.
          </p>
          {/* Summary stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Particules', count: 17, color: '#60A5FF', icon: '✴️' },
              { label: 'Forces', count: 4, color: '#fce803', icon: '💪' },
              { label: 'Théorie', count: 1, color: '#5a03fc', icon: '📖' },
              { label: 'Découverte du proton', count: 1914, color: '#c41d7c', icon: '📆' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center">
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-2xl font-bold" style={{ color: s.color }}>{s.count}</div>
                <div className="text-xs text-gray-600 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', gap: 0, marginBottom: 0 }}>
            {[
              { id: 'particles',       label: 'Particules' },
              { id: 'standard-model',  label: 'Tableau du Modèle Standard' },
              { id: 'forces',          label: 'Les 4 Forces' },
            ].map(t => (
              <button key={t.id} className={`tab-btn ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id as typeof tab)}>
                {t.label}
              </button>
            ))}
          </div>

          {/* ═══════════════════════ TAB: PARTICLES ══════════════════════════ */}
          {tab === 'particles' && (
            <div className="py-8">
              {/* Family filter */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                <button className={`family-btn ${activeFamily === 'all' ? 'active' : ''}`} onClick={() => setActiveFamily('all')}>
                  Toutes ({PARTICLES.length})
                </button>
                {FAMILIES.map(f => (
                  <button key={f.id} className={`family-btn ${activeFamily === f.id ? 'active' : ''}`}
                    onClick={() => setActiveFamily(f.id)}
                    style={{ borderColor: activeFamily === f.id ? f.color + '50' : undefined, color: activeFamily === f.id ? f.color : undefined }}>
                    {f.icon} {f.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                {/* Cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))', gap: 12, flex: 1 }}>
                  {filtered.map((p, i) => (
                    <div key={p.id} className="anim-in" style={{ animationDelay: `${i * 0.04}s` }}>
                      <ParticleCard p={p} isSelected={selected?.id === p.id}
                        onClick={() => setSelected(prev => prev?.id === p.id ? null : p)} />
                    </div>
                  ))}
                </div>
                {/* Detail panel */}
                {selected && (
                  <div style={{ width: 390, flexShrink: 0 }} className="anim-in">
                    <div style={{ position: 'sticky', top: 24 }}>
                      <DetailPanel p={selected} onClose={() => setSelected(null)} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════════════ TAB: STANDARD MODEL ═════════════════════ */}
          {tab === 'standard-model' && (
            <div className="py-8">
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

                {/* Row labels */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 42 }}>
                  {[
                    { label: 'Quarks',  color: '#38bdf8' },
                    { label: 'Leptons', color: '#a78bfa' },
                  ].map(({ label, color }) => (
                    <div key={label} style={{ height: 198, display: 'flex', alignItems: 'center' }}>
                      <span style={{
                        fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color, writingMode: 'vertical-rl',
                        transform: 'rotate(180deg)', opacity: 0.6,
                      }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 3 generations + bosons */}
                <div style={{ flex: 1, overflowX: 'auto' }}>
                  <div style={{ display: 'flex', gap: 12, minWidth: 760 }}>
                    {GENERATION_COLS.map(gen => {
                      const qGen = quarks.filter(p => p.generation === gen);
                      const lGen = leptons.filter(p => p.generation === gen);
                      return (
                        <div key={gen} style={{ flex: 1 }}>
                          <div className="gen-header">Génération {gen}</div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
                            {qGen.map(p => (
                              <ParticleCard key={p.id} p={p} isSelected={selected?.id === p.id}
                                onClick={() => setSelected(prev => prev?.id === p.id ? null : p)} />
                            ))}
                          </div>
                          <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 12 }} />
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                            {lGen.map(p => (
                              <ParticleCard key={p.id} p={p} isSelected={selected?.id === p.id}
                                onClick={() => setSelected(prev => prev?.id === p.id ? null : p)} />
                            ))}
                          </div>
                        </div>
                      );
                    })}

                    <div style={{ width: 1, background: 'rgba(255,255,255,0.06)', margin: '40px 0' }} />

                    {/* Bosons */}
                    <div style={{ width: 170 }}>
                      <div className="gen-header">Bosons de jauge</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                        {gaugeBosons.map(p => (
                          <ParticleCard key={p.id} p={p} isSelected={selected?.id === p.id}
                            onClick={() => setSelected(prev => prev?.id === p.id ? null : p)} />
                        ))}
                      </div>
                      <div style={{ height: 1, background: 'rgba(255,255,255,0.04)', marginBottom: 12 }} />
                      <div className="gen-header">Boson scalaire</div>
                      {scalarBoson.map(p => (
                        <ParticleCard key={p.id} p={p} isSelected={selected?.id === p.id}
                          onClick={() => setSelected(prev => prev?.id === p.id ? null : p)} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {selected && (
                <div style={{ marginTop: 24 }} className="anim-in">
                  <DetailPanel p={selected} onClose={() => setSelected(null)} />
                </div>
              )}

              {/* Legend */}
              <div style={{
                marginTop: 36, display: 'flex', gap: 24, flexWrap: 'wrap',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 12, fontSize: 13,
                color: 'rgba(255,255,255,0.4)',
              }}>
                {[
                  { label: 'Quarks',                  color: '#38bdf8' },
                  { label: 'Leptons',                  color: '#a78bfa' },
                  { label: 'Bosons de jauge',          color: '#fde68a' },
                  { label: 'Boson scalaire (Higgs)',   color: '#e879f9' },
                ].map(({ label, color }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: color + '26', border: `1px solid ${color}50` }} />
                    <span>{label}</span>
                  </div>
                ))}
                <span style={{ marginLeft: 'auto', fontSize: 12 }}>Cliquer sur une particule pour plus de détails</span>
              </div>
            </div>
          )}

          {/* ═══════════════════════ TAB: FORCES ═════════════════════════════ */}
          {tab === 'forces' && (
            <div className="py-8">

              {/* Force cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
                {FORCES.map((force, i) => (
                  <div key={force.name} className="force-card anim-in" style={{ animationDelay: `${i * 0.08}s`, borderColor: `${force.color}25` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: force.color, marginBottom: 4 }}>
                          {force.emoji} Force {force.name}
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                          Médiateur : {force.boson}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 18 }}>
                      {force.desc}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Portée</div>
                        <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#fff' }}>{force.range}</div>
                      </div>
                      <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Couplage relatif</div>
                        <div style={{ fontFamily: 'monospace', fontSize: 14, color: force.color }}>{force.coupling}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Intensity bar */}
              <div style={{
                padding: '28px 30px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20, marginBottom: 32,
              }}>
                <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
                  Intensité relative des forces (échelle logarithmique)
                </div>
                {[
                  { name: 'Forte',            pct: 100, color: '#22c55e', value: '1'       },
                  { name: 'Électromagnétique', pct: 73,  color: '#fbbf24', value: '~10⁻²'  },
                  { name: 'Faible',            pct: 42,  color: '#f97316', value: '~10⁻⁶'  },
                  { name: 'Gravitation',       pct: 4,   color: '#94a3b8', value: '~10⁻³⁹' },
                ].map((f, i) => (
                  <div key={f.name} className="anim-in" style={{ marginBottom: 16, animationDelay: `${i * 0.1}s` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{f.name}</span>
                      <span style={{ fontFamily: 'monospace', fontSize: 13, color: f.color }}>{f.value}</span>
                    </div>
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${f.pct}%`,
                        background: `linear-gradient(90deg, ${f.color}, ${f.color}70)`,
                        borderRadius: 4, transition: 'width 1s ease',
                        boxShadow: `0 0 8px ${f.color}60`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Gauge bosons */}
              <div>
                <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
                  Les bosons médiateurs
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                  {[...gaugeBosons, ...scalarBoson].map((p, i) => (
                    <div key={p.id} className="anim-in" style={{ animationDelay: `${i * 0.06}s` }}>
                      <ParticleCard p={p} isSelected={selected?.id === p.id}
                        onClick={() => setSelected(prev => prev?.id === p.id ? null : p)} />
                    </div>
                  ))}
                </div>
                {selected && (
                  <div style={{ marginTop: 20 }} className="anim-in">
                    <DetailPanel p={selected} onClose={() => setSelected(null)} />
                  </div>
                )}
              </div>

              {/* Beyond SM */}
              <div style={{
                marginTop: 40, padding: '22px 26px',
                background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(99,102,241,0.05))',
                border: '1px solid rgba(168,85,247,0.2)', borderRadius: 16,
              }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#a855f7', marginBottom: 10, letterSpacing: '0.04em' }}>
                  ✦ Au-delà du Modèle Standard
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75 }}>
                  Le Modèle Standard n'intègre pas la <strong style={{ color: 'rgba(255,255,255,0.7)' }}>gravitation</strong> — le graviton (spin 2) reste hypothétique.
                  La <strong style={{ color: 'rgba(255,255,255,0.7)' }}>matière noire</strong> (~27% de l'énergie-matière totale) ne correspond à aucune particule connue.
                  La <strong style={{ color: 'rgba(255,255,255,0.7)' }}>supersymétrie (SUSY)</strong>, la <strong style={{ color: 'rgba(255,255,255,0.7)' }}>théorie des cordes</strong> et les
                  extensions GUT cherchent à unifier toutes les forces en une théorie du tout (TOE).
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                  {['Graviton (hypothétique)', 'WIMPs (matière noire)', 'Axion', 'Sterile neutrino', 'Sparticules SUSY'].map(x => (
                    <span key={x} style={{ padding: '4px 11px', borderRadius: 10, fontSize: 12, background: 'rgba(168,85,247,0.1)', color: 'rgba(168,85,247,0.7)', border: '1px solid rgba(168,85,247,0.2)' }}>
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </AtomicLayout>
  );
}
