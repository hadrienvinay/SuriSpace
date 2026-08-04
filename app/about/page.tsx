'use client';

import Image from 'next/image';
import { useState } from 'react';
import MyMap from "@/components/Map_Suri";
import { SportCarousel, TripCarousel } from "@/components/Carousel";
import { CVModal } from "@/components/CVButton";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CURRENT_FOCUS = {
  badge: 'disponible',
  seeking: 'Missions ingénierie logicielle embarquée, spatiale, avionique ou R&D — freelance ou CDI',
  working: 'Encyclopédie Suri Space · projets IA et systèmes embarqués personnels',
  location: 'Bordeaux / Toulouse · Mobilité France & Europe',
};

type SkillCategory = 'languages' | 'embedded' | 'web' | 'tools';
type Skill = { name: string; years: number; level: number; category: SkillCategory };

const SKILLS: Skill[] = [
  { name: 'C / C++',           years: 7, level: 4, category: 'languages' },
  { name: 'Python',             years: 5, level: 4, category: 'languages' },
  { name: 'TypeScript / JS',    years: 3, level: 4, category: 'languages' },
  { name: 'SQL',                years: 4, level: 3, category: 'languages' },
  { name: 'RTOS / ESP32',       years: 3, level: 3, category: 'embedded' },
  { name: 'CAN / UART / ARINC', years: 3, level: 3, category: 'embedded' },
  { name: 'DO-178C',            years: 3, level: 3, category: 'embedded' },
  { name: 'Next.js / React',    years: 4, level: 4, category: 'web' },
  { name: 'PostgreSQL / Prisma',years: 3, level: 3, category: 'web' },
  { name: 'Docker / CI-CD',     years: 2, level: 3, category: 'web' },
  { name: 'REST API design',    years: 6, level: 4, category: 'web' },
  { name: 'Git',                 years: 7, level: 4, category: 'tools' },
  { name: 'Linux / Bash',        years: 6, level: 4, category: 'tools' },
  { name: 'LLM / IA générative', years: 2, level: 3, category: 'tools' },
  { name: 'Jira/Confluence',     years: 4, level: 4, category: 'tools' },
];

const SKILL_CATEGORIES: { key: SkillCategory; label: string; color: string }[] = [
  { key: 'languages', label: 'langages',   color: '#A78BFA' },
  { key: 'embedded',  label: 'embarqué',   color: '#60A5FA' },
  { key: 'web',       label: 'web & data', color: '#34D399' },
  { key: 'tools',     label: 'outils',     color: '#FB923C' },
];

const DOMAINS = [
  { name: "Systèmes d'Information", color: '#a78bfa' },
  { name: 'Systèmes Embarqués',     color: '#fb923c' },
  { name: 'Physique Nucléaire',     color: '#60a5fa' },
  { name: 'Mécanique Céleste',      color: '#38bdf8' },
  { name: 'Informatique',           color: '#34d399' },
  { name: 'Économie',               color: '#fde68a' },
  { name: 'Géopolitique',           color: '#f472b6' },
  { name: 'Histoire',               color: '#86efac' },
];

const STATS = [
  { label: 'Âge',          value: '29' },
  { label: 'Base',         value: 'Bordeaux' },
  { label: 'Diplôme',      value: 'Ing. SI/EMB' },
];

type TlType = 'formation' | 'pro' | 'projet' | 'stage';

const TIMELINE: {
  type: TlType; period: string; title: string; role: string; desc: string;
  color: string; achievements: string[];
}[] = [
  {
    type: 'projet',
    period: '2023 – 2026',
    title: 'Projets personnels',
    role: 'Full-stack & Embarqué',
    desc: "Portfolio web, simulation 3D du système solaire (Python/OpenGL), serveur home lab (Raspberry Pi, Docker), plateformes web Next.js et PostgreSQL.",
    color: '#34D399',
    achievements: [
      "Suri Space : encyclopédie interactive (80+ pages) — Next.js 16, React 19, PostgreSQL, Vercel",
      "Simulation 3D système solaire — Python/OpenGL, calculs kepleriens temps réel",
      "Home lab Raspberry Pi — Docker, reverse proxy Nginx, services web",
      "App gestion de portefeuille — Next.js, Prisma, APIs, Bot automatique",
      "Mini projet embarqué — RTOS, récepteurs GPS et Radio",
    ],
  },
  {
    type: 'pro',
    period: 'Déc. 2024 – Juil. 2026',
    title: "Vélos d'Albret",
    role: 'Technicien Polyvalent — CDD',
    desc: "Gestion autonome d'un magasin de vélos : mécanique cycle, relation clientèle et gestion des stocks.",
    color: '#FB923C',
    achievements: ["Location, gestion des stocks, relation clientèle, réparation vélos"],
  },
  {
    type: 'pro',
    period: 'Jan. 2020 – Sept. 2022',
    title: 'Scalian · Dassault Aviation',
    role: 'Ingénieur Systèmes Embarqués — CDI',
    desc: "Mission avionique DO-178 : développement et maintenance de bancs de test, scripts C/Python, intégration continue et documentation technique.",
    color: '#60A5FA',
    achievements: [
      "Développement bancs de test avionique C/Python — certification DO-178C niveau B (Falcon 6X)",
      "Maintenance et intégration continue",
      "Automatisation des processus de validation et de génération de rapports",
      "Campagne de tests officiels avant certification de l'avion",
    ],
  },
  {
    type: 'stage',
    period: 'Jan. – Juil. 2019',
    title: 'GALITT',
    role: 'Ingénieur Logiciel R&D — Stage',
    desc: "Conseil en système de paiement sécurisé. Étude Open Banking et automatisation de tests d'API sur Kanest.",
    color: '#60A5FA',
    achievements: ["Automatisation de suites de tests REST API (Kanest)"],
  },
  {
    type: 'stage',
    period: 'Jan. – Mai 2018',
    title: 'SETEC ITS',
    role: 'Ingénieur Mobilité — Stage',
    desc: "Cabinet d'études transports à Paris. Rédaction d'un cahier des charges sur l'architecture embarquée de nouveaux bus RATP.",
    color: '#38BDF8',
    achievements: ["Cahier des charges architecture embarquée bus RATP — livrée à l'équipe R&D"],
  },
  {
    type: 'formation',
    period: '2014 – 2019',
    title: 'ECE Paris',
    role: "École d'ingénieurs — Majeure Systèmes Embarqués",
    desc: "Formation informatique et électronique : C, C++, Java, microcontrôleurs, DSP et temps réel.",
    color: '#A78BFA',
    achievements: [],
  },
];

const TL_TYPE: Record<TlType, string> = { formation: 'formation', pro: 'pro', projet: 'projet', stage: 'stage' };

// ─── Small components ───────────────────────────────────────────────────────

function TlRow({ item }: { item: (typeof TIMELINE)[number] }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-[110px_1fr] gap-x-5 gap-y-1 py-4"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontFamily: "'Courier New', monospace" }}
    >
      <div style={{ fontSize: 11.5, color: '#60A5FA', paddingTop: 2 }}>
        [{item.period}]
      </div>
      <div style={{ fontFamily: "'Exo 2', sans-serif" }}>
        <span
          style={{
            display: 'inline-block', fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            padding: '2px 7px', borderRadius: 5, marginBottom: 6,
            background: `${item.color}18`, color: item.color,
          }}
        >
          {TL_TYPE[item.type]}
        </span>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#eef0f5' }}>{item.title}</div>
        <div style={{ fontSize: 12.5, color: item.color, fontWeight: 600, margin: '2px 0 6px' }}>{item.role}</div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
        {item.achievements.length > 0 && (
          <ul style={{ margin: '8px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {item.achievements.map((a, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.55 }}>
                <span style={{ color: item.color, flexShrink: 0, opacity: 0.85 }}>→</span>
                {a}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function SkillGauge({ skill, color }: { skill: Skill; color: string }) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3, color: 'rgba(255,255,255,0.7)' }}>
        <span>{skill.name}</span>
        <span>{skill.years} ans</span>
      </div>
      <div style={{ height: 4, borderRadius: 3, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%', borderRadius: 3, width: `${(skill.level / 5) * 100}%`,
            background: `repeating-linear-gradient(90deg, ${color} 0, ${color} 3px, ${color}4D 3px, ${color}4D 5px)`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  const [cvOpen, setCvOpen] = useState(false);
  const mono = "'Courier New', monospace";

  return (
    <>
      {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}

      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 20px 100px', fontFamily: "'Exo 2', sans-serif" }}>

        {/* ══ BOOT SEQUENCE ═══════════════════════════════════════════════════ */}
        <div style={{ fontFamily: mono, fontSize: 11.5, color: 'rgba(96,165,250,0.55)', lineHeight: 1.85, marginBottom: 24 }}>
          $ whoami<br />
          <span style={{ color: '#22C55E' }}>✓</span> hadrien.vinay — ingénieur systèmes embarqués &amp; spatial<br />
          $ status --check<br />
          <span style={{ color: '#22C55E' }}>✓</span> disponible pour missions freelance / CDI
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-12 items-start">

          {/* ══ SIDEBAR ═══════════════════════════════════════════════════════ */}
          <div
            className="md:sticky"
            style={{
              top: 88, border: '1px solid rgba(96,165,250,0.15)', borderRadius: 16,
              padding: 22, background: 'rgba(96,165,250,0.02)',
            }}
          >
            <div style={{ fontFamily: mono, fontSize: 10, color: 'rgba(96,165,250,0.5)', textAlign: 'center', marginBottom: 14, letterSpacing: '0.1em' }}>
              [ profil_operateur ]
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 16px' }}>
                <Image
                  src="/uploads/profil/profil.png"
                  width={140} height={140}
                  alt="Hadrien Vinay"
                  style={{
                    borderRadius: 20, border: '2px solid rgba(96,165,250,0.4)',
                    width: 140, height: 140, objectFit: 'cover',
                  }}
                />
                <div
                  aria-hidden
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 20, pointerEvents: 'none',
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(96,165,250,0.09) 3px)',
                  }}
                />
                <div style={{
                  position: 'absolute', bottom: 6, right: 6, width: 12, height: 12, borderRadius: '50%',
                  background: '#22C55E', border: '2px solid #020817', boxShadow: '0 0 8px #22C55E',
                }} />
              </div>
              <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, color: '#eef0f5', marginBottom: 4 }}>
                Hadrien Vinay
              </div>
              <div style={{ fontSize: 13, color: '#7C8699', lineHeight: 1.5, marginBottom: 18 }}>
                Ingénieur · Systèmes d&apos;Information &amp; Embarqués
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
                <button
                  onClick={() => setCvOpen(true)}
                  style={{
                    flex: 1, padding: '9px 0', textAlign: 'center', borderRadius: 9, fontSize: 12.5, fontWeight: 600,
                    border: 'none', color: '#fff', background: 'linear-gradient(135deg, #3B82F6, #6366F1)', cursor: 'pointer',
                  }}
                >
                  CV
                </button>
                <a
                  href="https://www.linkedin.com/in/hadrien-vinay/" target="_blank" rel="noreferrer"
                  style={{ flex: 1, padding: '9px 0', textAlign: 'center', borderRadius: 9, fontSize: 12.5, fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)', color: '#7C8699' }}
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/hadrienvinay" target="_blank" rel="noreferrer"
                  style={{ flex: 1, padding: '9px 0', textAlign: 'center', borderRadius: 9, fontSize: 12.5, fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)', color: '#7C8699' }}
                >
                  GitHub
                </a>
              </div>
            </div>

            <div style={{ paddingTop: 22, marginTop: 22, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', color: '#7C8699', marginBottom: 14 }}>
                <span style={{ color: '#60A5FA' }}>&gt; </span>contact
              </div>
              {[
                { k: 'tel', v: '+33 6 43 07 95 12' },
                { k: 'mail', v: 'hadrien.vinay@yahoo.fr' },
                { k: 'web', v: 'suri-space.vercel.app', href: 'https://suri-space.vercel.app/' },
              ].map(c => (
                <div key={c.k} style={{ display: 'flex', gap: 10, fontSize: 13, padding: '5px 0', color: 'rgba(255,255,255,0.7)' }}>
                  <span style={{ color: '#60A5FA', width: 40, flexShrink: 0, fontFamily: mono, fontSize: 11 }}>{c.k}</span>
                  {c.href
                    ? <a href={c.href} target="_blank" rel="noreferrer" style={{ color: '#60A5FA' }}>{c.v}</a>
                    : <span>{c.v}</span>}
                </div>
              ))}
            </div>

            <div style={{ paddingTop: 22, marginTop: 22, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', color: '#7C8699', marginBottom: 14 }}>
                <span style={{ color: '#60A5FA' }}>&gt; </span>info --sys
              </div>
              {STATS.map(s => (
                <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, padding: '4px 0' }}>
                  <span style={{ color: '#7C8699' }}>{s.label}</span>
                  <span style={{ color: '#60A5FA', fontFamily: mono, fontWeight: 600 }}>{s.value}</span>
                </div>
              ))}
            </div>

            <div style={{ paddingTop: 22, marginTop: 22, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontFamily: mono, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.18em', color: '#7C8699', marginBottom: 14 }}>
                <span style={{ color: '#60A5FA' }}>&gt; </span>skills --diag
              </div>
              {SKILL_CATEGORIES.map(cat => (
                <div key={cat.key} style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8, color: cat.color }}>
                    {cat.label}
                  </div>
                  {SKILLS.filter(s => s.category === cat.key).map(skill => (
                    <SkillGauge key={skill.name} skill={skill} color={cat.color} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* ══ MAIN ═════════════════════════════════════════════════════════ */}
          <div>

            {/* Focus */}
            <div style={{
              padding: '18px 22px', borderRadius: 10, background: 'rgba(34,197,94,0.05)',
              border: '1px solid rgba(34,197,94,0.15)', marginBottom: 28,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 700, color: '#22C55E', marginBottom: 10, fontFamily: mono }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 6px #22C55E', display: 'inline-block' }} />
                {CURRENT_FOCUS.badge}
              </div>
              {[
                { k: 'cherche', v: CURRENT_FOCUS.seeking },
                { k: 'en_cours', v: CURRENT_FOCUS.working },
                { k: 'mobilité', v: CURRENT_FOCUS.location },
              ].map(r => (
                <div key={r.k} style={{ display: 'flex', gap: 10, fontSize: 12.5, padding: '3px 0' }}>
                  <span style={{ width: 100, flexShrink: 0, color: '#7C8699', textTransform: 'uppercase', fontSize: 10, letterSpacing: '0.08em', fontFamily: mono, paddingTop: 2 }}>
                    &gt; {r.k}
                  </span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>{r.v}</span>
                </div>
              ))}
            </div>

            {/* À propos */}
            <div style={{ marginBottom: 34 }}>
              <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#7C8699', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#60A5FA' }}>&gt; </span>à_propos
              </div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '0 0 12px' }}>
                Ingénieur systèmes d&apos;information et systèmes embarqués, avec 4 ans d&apos;expérience professionnelle
                dont une mission avionique critique chez Dassault Aviation (certification DO-178C, Falcon 6X).
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: '0 0 12px' }}>
                Je conçois et développe des solutions techniques de bout en bout, du firmware embarqué aux applications web
                full-stack.
              </p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, margin: 0 }}>
                Ce portfolio présente mes projets professionnels et personnels, incluant Suri Space, une encyclopédie
                scientifique interactive développée en autonomie sur Next.js.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
                {DOMAINS.map(d => (
                  <span key={d.name} style={{
                    fontSize: 12.5, fontFamily: mono, padding: '6px 13px', borderRadius: 7,
                    color: d.color, background: `${d.color}10`, border: `1px solid ${d.color}28`,
                  }}>
                    {d.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Parcours */}
            <div style={{ marginBottom: 34 }}>
              <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#7C8699', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#60A5FA' }}>&gt; </span>parcours --log --all
              </div>
              {TIMELINE.map((item, i) => <TlRow key={i} item={item} />)}
            </div>

            {/* Activités */}
            <div style={{ marginBottom: 34 }}>
              <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#7C8699', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#60A5FA' }}>&gt; </span>activités --telemetry
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <SportCarousel />
                </div>
                <div style={{ padding: '22px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
                  <h4 style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, margin: 0, color: '#eef0f5' }}>
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>// </span>sports.dat
                  </h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                    Triathlète depuis peu, j&apos;aime me dépasser et découvrir de nouveaux horizons, tout en m&apos;entraînant
                    régulièrement à la course à pied, au vélo et à la natation dans le bassin d&apos;Arcachon. Amateur d&apos;escalade,
                    je me suis confronté aux falaises naturelles notamment en Espagne et en France.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div style={{ padding: '22px 24px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
                  <h4 style={{ fontFamily: mono, fontSize: 13, fontWeight: 700, margin: 0, color: '#eef0f5' }}>
                    <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 400 }}>// </span>travel.dat
                  </h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                    J&apos;adore voyager en autonomie à travers la France et l&apos;Europe — à vélo ou à pied avec un sac à dos.
                    Les Alpes, la Corse, les Dolomites, le chemin de Stevenson sont quelques-unes de mes plus belles expériences.
                    Mon rêve : traverser les Pyrénées (GR10) et faire le tour d&apos;Espagne à vélo.
                  </p>
                </div>
                <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <TripCarousel />
                </div>
              </div>
            </div>

            {/* Localisation */}
            <div>
              <div style={{ fontFamily: mono, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: '#7C8699', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#60A5FA' }}>&gt; </span>localisation --map
              </div>
              <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', height: 320 }}>
                <MyMap />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
