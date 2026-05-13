'use client';

import Image from 'next/image';
import { useState } from 'react';
import MyMap from "@/components/Map_Suri";
import { SportCarousel, TripCarousel } from "@/components/Carousel";
import CVButton, { CVModal } from "@/components/CVButton";

// ─── Data ─────────────────────────────────────────────────────────────────────

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
  { icon: '', label: 'Âge',          value: '29 ans' },
  { icon: '', label: 'Localisation', value: 'Arcachon, France' },
  { icon: '', label: 'Formation',    value: 'Ingénieur SI & Embarqué' },
  { icon: '', label: 'Contact',      value: 'hadrien.vinay@yahoo.fr' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  const [cvOpen, setCvOpen] = useState(false);

  return (
    <>
      {cvOpen && <CVModal onClose={() => setCvOpen(false)} />}

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 20px 100px' }}>

        {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
        <div style={{ position: 'relative', marginBottom: 80 }}>

          {/* Cover image */}
          <div style={{ position: 'relative', height: 280, borderRadius: '0 0 28px 28px', overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxlYXJ0aHxlbnwwfDB8fHwxNzQ2NTM0MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Cover"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(2,8,23,0.1) 0%, rgba(2,8,23,0.98) 100%)',
            }} />
          </div>

          {/* Profile section — overlapping hero */}
          <div style={{
            position: 'absolute', bottom: -48, left: 0, right: 0,
            padding: '0 32px',
            display: 'flex', alignItems: 'flex-end', gap: 22,
          }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Image
                src="/uploads/profil/profil.png"
                width={150} height={150}
                alt="Hadrien Vinay"
                style={{
                  borderRadius: 18,
                  border: '2.5px solid rgba(96,165,250,0.55)',
                  boxShadow: '0 0 0 4px rgba(59,130,246,0.12), 0 8px 32px rgba(0,0,0,0.5)',
                }}
              />
              {/* Online dot */}
              <div style={{
                position: 'absolute', bottom: 7, right: 7,
                width: 11, height: 11, borderRadius: '50%',
                background: '#22c55e', border: '2px solid rgba(2,8,23,0.95)',
                boxShadow: '0 0 6px #22c55e',
              }} />
            </div>

            {/* Name + title */}
            <div style={{ paddingBottom: 4 }}>
              <h1 style={{
                fontSize: 40, fontWeight: 800, color: '#fff',
                margin: 0, lineHeight: 1.15,
                fontFamily: "'Exo 2', sans-serif",
                letterSpacing: '-0.5px',
                textShadow: '0 2px 24px rgba(0,0,0,0.8)',
              }}>
                Hadrien Vinay
              </h1>
              <p style={{
                fontSize: 20, color: 'rgba(255,255,255,0.45)',
                margin: '5px 0 0', fontFamily: 'monospace', letterSpacing: '0.04em',
              }}>
                Ingénieur · Systèmes d&apos;Information & Embarqués
              </p>
            </div>
          </div>
        </div>

        {/* ══ ACTION BUTTONS ════════════════════════════════════════════════════ */}
        <div className="flex flex-wrap gap-3 mb-12 px-1">
          <CVButton />
          <a
            href="https://www.linkedin.com/in/hadrien-vinay/"
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '9px 20px', borderRadius: 10, textDecoration: 'none',
              background: 'rgba(10,102,194,0.12)', border: '1px solid rgba(10,102,194,0.3)',
              color: '#60a5fa', fontSize: 14, transition: 'all 0.2s',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
              <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/hadrienvinay"
            target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '9px 20px', borderRadius: 10, textDecoration: 'none',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.65)', fontSize: 14, transition: 'all 0.2s',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>

        {/* ══ STATS ROW ════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {STATS.map(s => (
            <div key={s.label} style={{
              padding: '18px 20px',
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16,
            }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 5 }}>{s.label}</div>
              <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* ══ BIO + DOMAINS ═════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">

          {/* Bio */}
          <div style={{
            padding: '28px 30px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20,
          }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 18 }}>
              À propos
            </div>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.52)', lineHeight: 1.82, margin: '0 0 14px' }}>
              Jeune Ingénieur de 29 ans, spécialisé dans les{' '}
              <span >systèmes d&apos;information</span> et les{' '}
              <span >systèmes embarqués</span>.
            </p>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.52)', lineHeight: 1.82, margin: '0 0 14px' }}>
              Féru de connaissances, j&apos;ai à cœur de découvrir et de partager de nouvelles idées, opportunités, histoires
              et actualités sur le monde passionant qui nous entoure.
            </p>
            <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.52)', lineHeight: 1.82, margin: 0 }}>
              Je partage ici mes projets, idées, recherches, activités et voyages mais également des connaissances sur notre
              univers, en développant une section Espace, Sciences et Matières pensé et désigné comme une mini Encyclopédie moderne.
            
            </p>
          </div>

          {/* Domains of interest */}
          <div style={{
            padding: '28px 30px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 20,
          }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 18 }}>
              Domaines d&apos;intérêt
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
              {DOMAINS.map(d => (
                <span key={d.name} style={{
                  padding: '7px 15px', borderRadius: 8, fontSize: 15,
                  fontFamily: 'monospace',
                  background: `${d.color}10`,
                  border: `1px solid ${d.color}28`,
                  color: d.color,
                }}>
                  {d.name}
                </span>
              ))}
            </div>

            {/* Contact info */}
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 14 }}>
                Contact
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Tel', value: '+33 6 43 07 95 12' },
                  { label: 'Email', value: 'hadrien.vinay@yahoo.fr' },
                  { label: 'Site', value: 'suri-space.vercel.app', href: 'https://suri-space.vercel.app/' },
                ].map(c => (
                  <div key={c.label} style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace', width: 38, flexShrink: 0 }}>{c.label}</span>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noreferrer" style={{ fontSize: 15, color: '#60a5fa', textDecoration: 'none' }}>{c.value}</a>
                      : <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>{c.value}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ ACTIVITIES ════════════════════════════════════════════════════════ */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 20 }}>
            Activités
          </div>

          {/* Sports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
              <SportCarousel />
            </div>
            <div style={{
              padding: '28px 30px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12,
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Sports</h3>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.78, margin: 0 }}>
                Triathlète depuis peu, j&apos;aime me dépasser et découvrir de nouveaux horizons,
                tout en m&apos;entraînant régulièrement à la course à pied, au vélo et à la natation
                dans le bassin d&apos;Arcachon. Amateur d&apos;escalade, je me suis confronté aux falaises
                naturelles notamment en Espagne et en France.
              </p>
            </div>
          </div>

          {/* Voyages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div style={{
              padding: '28px 30px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 20,
              display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12,
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>Voyage & Randonnées</h3>
              <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.48)', lineHeight: 1.78, margin: 0 }}>
                J&apos;adore voyager en autonomie à travers la France et l&apos;Europe — à vélo ou à pied
                avec un sac à dos. Les Alpes, la Corse, les Dolomites, le chemin de Stevenson
                sont quelques-unes de mes plus belles expériences. Mon rêve : traverser les Pyrénées
                (GR10) et faire le tour d&apos;Espagne à vélo.
              </p>
            </div>
            <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
              <TripCarousel />
            </div>
          </div>
        </div>

        {/* ══ MAP ═══════════════════════════════════════════════════════════════ */}
        <div style={{
          borderRadius: 20, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.07)',
          height: 320,
        }}>
          <MyMap />
        </div>

      </section>

      {/* ── Fixed social sidebar ────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed', right: 14, top: 160,
        display: 'flex', flexDirection: 'column',
        borderRadius: 12,
        background: 'rgba(8,14,32,0.88)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(14px)',
        overflow: 'hidden',
      }}>
        <a href="https://www.linkedin.com/in/hadrien-vinay/" target="_blank" rel="noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '11px 13px', color: '#60a5fa',
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
            <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
          </svg>
        </a>
        <a href="https://github.com/hadrienvinay" target="_blank" rel="noreferrer" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '11px 13px', color: '#34d399',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <button
          onClick={() => setCvOpen(true)}
          title="Voir CV"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '11px 13px', background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.45)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Image src="/file.svg" alt="CV" width={17} height={17} style={{ opacity: 0.5 }} />
        </button>
      </div>
    </>
  );
}
