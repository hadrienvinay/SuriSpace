import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page introuvable',
  robots: { index: false, follow: false },
};

// Animated SVG: a telescope scanning an empty sky
function TelescopeSearching() {
  return (
    <svg viewBox="0 0 200 200" width="180" height="180" xmlns="http://www.w3.org/2000/svg">
      {/* Stars — some twinkling */}
      {[
        [30, 25, 0.9, 1.8], [160, 20, 0.7, 2.4], [180, 60, 0.8, 1.6],
        [15, 80, 0.6, 2.1], [170, 90, 0.9, 1.9], [55, 15, 0.7, 2.6],
        [140, 45, 0.8, 2.0], [85, 30, 0.6, 1.7], [195, 130, 0.5, 2.3],
      ].map(([x, y, op, dur], i) => (
        <circle key={i} cx={x} cy={y} r="1.4" fill="#A78BFA" opacity={op}>
          <animate attributeName="opacity" values={`${op};${Number(op) * 0.3};${op}`} dur={`${dur}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* Question mark floating */}
      <text x="100" y="55" fontSize="36" fontWeight="bold" fill="none"
        stroke="#60A5FA" strokeWidth="1.5" textAnchor="middle"
        fontFamily="'Exo 2', sans-serif" opacity="0.7">
        ?
        <animateTransform attributeName="transform" type="translate"
          values="0 0; 0 -6; 0 0" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0.4;0.7" dur="3s" repeatCount="indefinite" />
      </text>

      {/* Tripod */}
      <line x1="100" y1="155" x2="72" y2="190" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="155" x2="128" y2="190" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="100" y1="155" x2="100" y2="192" stroke="#4C1D95" strokeWidth="2.5" strokeLinecap="round" />

      {/* Mount column */}
      <rect x="96" y="138" width="8" height="18" rx="2" fill="#5B21B6" />

      {/* Telescope assembly — sweeping left/right */}
      <g transform="translate(100 138)">
        <animateTransform attributeName="transform" type="rotate"
          values="-30 0 0; 30 0 0; -30 0 0" dur="5s" repeatCount="indefinite"
          additive="sum" />
        <g transform="translate(100 138)">
          {/* Main tube */}
          <rect x="-28" y="-6" width="56" height="12" rx="3"
            fill="url(#tubeGrad404)" stroke="#4C1D95" strokeWidth="0.8" />
          {/* Bands */}
          <rect x="-16" y="-6" width="2" height="12" fill="#5B21B6" opacity="0.7" />
          <rect x="8"  y="-6" width="2" height="12" fill="#5B21B6" opacity="0.7" />
          {/* Aperture */}
          <rect x="22" y="-8" width="7" height="16" rx="1.5" fill="#6D28D9" />
          {/* Lens — glinting */}
          <circle cx="25.5" cy="0" r="5" fill="url(#lensGrad404)" />
          <circle cx="24"   cy="-1.5" r="1.5" fill="#FFFFFF" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Back cap + eyepiece */}
          <rect x="-32" y="-6" width="5" height="12" rx="1.5" fill="#5B21B6" />
          <rect x="-24" y="5" width="4" height="9" rx="1" fill="#5B21B6" />
          <rect x="-26" y="13" width="7" height="3" rx="1" fill="#A78BFA" />
        </g>
      </g>

      {/* Search beam */}
      <g opacity="0.25">
        <animateTransform attributeName="transform" type="rotate"
          values="-30 100 138; 30 100 138; -30 100 138" dur="5s" repeatCount="indefinite" />
        <path d="M 126 138 L 195 85 L 200 95 Z" fill="#60A5FA" />
      </g>

      <defs>
        <linearGradient id="tubeGrad404" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <radialGradient id="lensGrad404" cx="0.35" cy="0.35">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#6D28D9" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const SUGGESTIONS = [
  { href: '/',               label: 'Accueil'         },
  { href: '/space',   label: 'Espace'          },
  { href: '/sciences',       label: 'Sciences'        },
  { href: '/atoms',          label: 'Atomes'          },
  { href: '/biologie',       label: 'Biologie'        },
  { href: '/nature',         label: 'Nature'          },
  { href: '/posts',          label: 'Articles'        },
  { href: '/projects',       label: 'Projets'         },
];

export default function NotFound() {
  return (
    <div
      className=" flex flex-col items-center justify-center px-4 py-6 text-center"
      style={{
        fontFamily: "'Exo 2', 'Space Grotesk', sans-serif",
        background: 'radial-gradient(ellipse at 30% 40%, rgba(30,58,138,0.15) 0%, transparent 55%), radial-gradient(ellipse at 75% 20%, rgba(88,28,135,0.10) 0%, transparent 50%)',
      }}
    >
      {/* Animated telescope */}
      <div style={{ filter: 'drop-shadow(0 0 28px rgba(167,139,250,0.35))' }}>
        <TelescopeSearching />
      </div>

      {/* 404 number */}
      <div
        className="text-6:qqxl sm:text-6xl font-extrabold mb-1 leading-none"
        style={{
          background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-4px',
        }}
      >
        404
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
        Page introuvable
      </h1>
      <p className="text-gray-500 text-base max-w-md mb-10 leading-relaxed">
        Cette page n&apos;existe pas (ou plus). Peut-être cherchez-vous&nbsp;:
      </p>

      {/* Navigation suggestions */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {SUGGESTIONS.map(s => (
          <Link
            key={s.href}
            href={s.href}
            className="px-4 py-2 rounded-xl text-sm font-semibold border border-white/8 text-gray-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-900/20 transition-all"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            {s.label}
          </Link>
        ))}
      </div>

      <p className="mt-8 text-xs text-gray-700 font-mono">
        Erreur 404 — suri-space.vercel.app
      </p>
    </div>
  );
}
