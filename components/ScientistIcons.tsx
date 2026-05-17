// components/ScientistIcons.tsx
// SVG icons for each scientist — keyed by scientist id
import { TelescopeIcon, AtomIcon } from '@/components/UniverseIcons';
import { FlaskIcon, RadiationIcon } from '@/components/AtomsIcons';

type IconFn = (props: { size?: number }) => React.JSX.Element;

// ── Individual SVG icons ──────────────────────────────────────────────────────

function IcoArchimedes({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="21" x2="12" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <polygon points="12,21 9.5,24 14.5,24" fill="currentColor" opacity="0.7"/>
      <line x1="3" y1="13" x2="21" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="3.5" cy="10.5" r="2.5" fill="currentColor" opacity="0.75"/>
      <circle cx="20.5" cy="10.5" r="2.5" fill="currentColor" opacity="0.75"/>
      <line x1="3.5" y1="13" x2="3.5" y2="11" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="20.5" y1="13" x2="20.5" y2="11" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function IcoEye({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 2 12 Q 12 4 22 12 Q 12 20 2 12 Z" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.12" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.8"/>
      <circle cx="13" cy="11" r="1" fill="white" opacity="0.5"/>
      <line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function IcoCopernicus({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.85"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
        const r = Math.PI * a / 180;
        return <line key={a} x1={12 + Math.cos(r) * 3.5} y1={12 + Math.sin(r) * 3.5} x2={12 + Math.cos(r) * 5} y2={12 + Math.sin(r) * 5} stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>;
      })}
      <ellipse cx="12" cy="12" rx="10" ry="5.5" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" fill="none" opacity="0.6"/>
      <circle cx="22" cy="12" r="2" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

function IcoKepler({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="11" cy="12" rx="9" ry="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <circle cx="5" cy="12" r="2" fill="currentColor" opacity="0.85"/>
      <circle cx="20" cy="12" r="1.5" fill="currentColor" opacity="0.55"/>
      <line x1="5" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 2" opacity="0.3"/>
    </svg>
  );
}

function IcoNewton({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 9 Q 4 9 4 15 Q 4 20 8 21 Q 11 22 12 21 Q 13 22 16 21 Q 20 20 20 15 Q 20 9 16 9 Q 13 7 12 9 Q 11 7 8 9 Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M 12 9 Q 14 6 16 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="14" y1="6.5" x2="16" y2="5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M 12 22 L 12 26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M 10 25 L 12 27 L 14 25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
    </svg>
  );
}

function IcoDarwin({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="22" x2="12" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="12" y1="14" x2="6" y2="9"  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="12" y1="14" x2="18" y2="9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="6"  y1="9"  x2="3"  y2="5" stroke="currentColor" strokeWidth="1"   strokeLinecap="round"/>
      <line x1="6"  y1="9"  x2="9"  y2="5" stroke="currentColor" strokeWidth="1"   strokeLinecap="round"/>
      <line x1="18" y1="9"  x2="15" y2="5" stroke="currentColor" strokeWidth="1"   strokeLinecap="round"/>
      <line x1="18" y1="9"  x2="21" y2="5" stroke="currentColor" strokeWidth="1"   strokeLinecap="round"/>
      <circle cx="3"  cy="4"  r="1.5" fill="currentColor"/>
      <circle cx="9"  cy="4"  r="1.5" fill="currentColor"/>
      <circle cx="15" cy="4"  r="1.5" fill="currentColor"/>
      <circle cx="21" cy="4"  r="1.5" fill="currentColor"/>
    </svg>
  );
}

function IcoMaxwell({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 1 12 C 3 8 5 16 7 12 C 9 8 11 16 13 12 C 15 8 17 16 19 12 C 21 8 23 16 25 12" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <path d="M 1 12 C 3 8 5 16 7 12 C 9 8 11 16 13 12 C 15 8 17 16 19 12 C 21 8 23 16 25 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" transform="rotate(90 12 12) scale(0.65) translate(4.2)"/>
    </svg>
  );
}

function IcoPasteur({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="6" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.2"/>
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map(a => {
        const r = Math.PI * a / 180;
        return <line key={a} x1={12 + Math.cos(r) * 6} y1={12 + Math.sin(r) * 6} x2={12 + Math.cos(r) * 9.5} y2={12 + Math.sin(r) * 9.5} stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>;
      })}
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function IcoMendeleev({ size = 24 }: { size?: number }) {
  const cells = [];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const highlight = (r === 0 && c === 0) || (r === 2 && c === 1);
      cells.push(
        <rect key={`${r}-${c}`} x={2 + c * 5.5} y={2 + r * 5.5} width="4.5" height="4.5" rx="0.8"
          fill={highlight ? 'currentColor' : 'none'}
          fillOpacity={highlight ? 0.7 : 0}
          stroke="currentColor" strokeWidth="0.8" opacity={highlight ? 1 : 0.5}/>
      );
    }
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">{cells}</svg>;
}

function IcoBohr({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.85"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.7"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.7" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.7" transform="rotate(120 12 12)"/>
      <circle cx="22" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="17.2" cy="3.6" r="1.5" fill="currentColor"/>
      <circle cx="6.8" cy="3.6" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function IcoHeisenberg({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 2 12 C 4 6 6 18 8 12 C 10 6 12 18 14 12 C 16 6 18 18 20 12 C 22 6 24 18 26 12" stroke="currentColor" strokeWidth="1.3" fill="none" opacity="0.8"/>
      <rect x="9" y="5" width="6" height="14" rx="1" stroke="currentColor" strokeWidth="0.8" fill="currentColor" fillOpacity="0.12" strokeDasharray="2 1.5"/>
      <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
    </svg>
  );
}

function IcoTuring({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="9" width="22" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08"/>
      <line x1="6.3"  y1="9" x2="6.3"  y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <line x1="11.6" y1="9" x2="11.6" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <line x1="16.9" y1="9" x2="16.9" y2="16" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <rect x="2.5" y="10.5" width="2.8" height="4" rx="0.5" fill="currentColor" opacity="0.7"/>
      <rect x="12.7" y="10.5" width="2.8" height="4" rx="0.5" fill="currentColor" opacity="0.7"/>
      <path d="M 11.6 3 L 11.6 8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M 9.5 5.5 L 11.6 3 L 13.7 5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IcoFeynman({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3"  y1="21" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="3"  y1="3"  x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.85"/>
      <path d="M 12 12 C 14.5 10 16.5 14 19 12 C 21.5 10 23 14 25 12" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function IcoDna({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 8 3 C 18 7 6 13 18 17 C 6 21 18 25 8 27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
      <path d="M 16 3 C 6 7 18 13 6 17 C 18 21 6 25 16 27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.55"/>
      <line x1="9"  y1="6.5"  x2="15" y2="8.5"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="8"  y1="12.5" x2="16" y2="13"   stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      <line x1="9"  y1="18"   x2="15" y2="16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function IcoHawking({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="7" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity="0.85"/>
      <ellipse cx="12" cy="12" rx="10.5" ry="3" stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.4"/>
      <circle cx="4"  cy="6"  r="1.2" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="6"  r="1.2" fill="currentColor" opacity="0.5"/>
      <circle cx="4"  cy="18" r="1.2" fill="currentColor" opacity="0.5"/>
      <circle cx="20" cy="18" r="1.2" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

// ── Lookup map ────────────────────────────────────────────────────────────────

export const SCIENTIST_ICONS: Record<string, IconFn> = {
  'archimedes':    IcoArchimedes,
  'ibn-al-haytham': IcoEye,
  'copernicus':    IcoCopernicus,
  'galileo':       (p) => <TelescopeIcon {...p} />,
  'kepler':        IcoKepler,
  'newton':        IcoNewton,
  'lavoisier':     (p) => <FlaskIcon {...p} />,
  'darwin':        IcoDarwin,
  'maxwell':       IcoMaxwell,
  'pasteur':       IcoPasteur,
  'mendeleev':     IcoMendeleev,
  'curie':         (p) => <RadiationIcon {...p} />,
  'einstein':      (p) => <AtomIcon {...p} />,
  'bohr':          IcoBohr,
  'heisenberg':    IcoHeisenberg,
  'turing':        IcoTuring,
  'feynman':       IcoFeynman,
  'crick-watson':  IcoDna,
  'hawking':       IcoHawking,
};

// ── Helper component ──────────────────────────────────────────────────────────

export function ScientistIcon({ id, size = 24, className }: { id: string; size?: number; className?: string }) {
  const Icon = SCIENTIST_ICONS[id];
  if (!Icon) return null;
  return (
    <span className={className} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <Icon size={size} />
    </span>
  );
}
