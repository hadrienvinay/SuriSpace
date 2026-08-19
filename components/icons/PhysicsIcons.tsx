// components/PhysicsIcons.tsx
// SVG icons for physics categories and SI base units
import { EarthIcon } from '@/components/icons/SpaceIcons';
import { FlaskIcon } from '@/components/icons/AtomsIcons';
import { ClockIcon } from '@/components/icons/SciencesIcons';

type IconFn = (props: { size?: number }) => React.JSX.Element;

// ── Category icons ────────────────────────────────────────────────────────────

function IcoGear({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[0,45,90,135,180,225,270,315].map(a => (
        <rect key={a} x="9.5" y="0.5" width="3" height="3.5" rx="0.8"
          fill="currentColor" transform={`rotate(${a} 11 11)`}/>
      ))}
      <circle cx="11" cy="11" r="5.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12"/>
      <circle cx="11" cy="11" r="2.5" fill="currentColor" opacity="0.85"/>
    </svg>
  );
}

function IcoLightningBolt({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 14 2 L 6 12 H 11.5 L 8 20 L 16 10 H 10.5 Z"
        fill="currentColor" stroke="currentColor" strokeWidth="0.4" strokeLinejoin="round" opacity="0.9"/>
    </svg>
  );
}

function IcoFlame({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 11 2 C 11 2 17 8 16 14 C 19 10 18 6 17 4 C 21 9 21 16 17 20 C 15 22 13 22 11 22 C 9 22 7 21 5.5 20 C 1 16 1 9 6 4 C 5 8 7.5 12 10 14 C 9 8 10 4 11 2 Z"
        fill="currentColor" fillOpacity="0.75" stroke="currentColor" strokeWidth="0.5" strokeLinejoin="round"/>
    </svg>
  );
}

function IcoLightCone({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 11 11 L 20 21 L 2 21 Z" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.1" strokeLinejoin="round"/>
      <path d="M 11 11 L 20 1 L 2 1 Z"  stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.06" strokeLinejoin="round"/>
      <circle cx="11" cy="11" r="2" fill="currentColor" opacity="0.9"/>
      <path d="M 2 14 Q 11 9 20 14" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function IcoWaveFunction({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="11" cy="11" rx="9" ry="5.5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2.5 2" fill="none" opacity="0.45"/>
      <path d="M 2 11 C 3.7 7 5.5 15 7.3 11 C 9 7 10.8 15 12.5 11 C 14.2 7 16 15 17.7 11 C 19.4 7 21 15 22 11"
        stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="11" cy="11" r="1.5" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function IcoPrism({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 11 2 L 20 19 L 2 19 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12" strokeLinejoin="round"/>
      <line x1="2" y1="10" x2="8.5" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="13.5" y1="14" x2="20" y2="11" stroke="#F87171" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="13.5" y1="15.5" x2="20" y2="15.5" stroke="#FBBF24" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="13.5" y1="17" x2="20" y2="20" stroke="#34D399" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}

// ── SI unit icons ─────────────────────────────────────────────────────────────

export function IcoRuler({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 1.5 16.5 L 16.5 16.5 L 1.5 2 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <line x1="9"  y1="16.5" x2="9"  y2="13" stroke="currentColor" strokeWidth="0.9" opacity="0.55"/>
      <line x1="5"  y1="16.5" x2="5"  y2="14" stroke="currentColor" strokeWidth="0.9" opacity="0.4"/>
      <line x1="13" y1="16.5" x2="13" y2="14" stroke="currentColor" strokeWidth="0.9" opacity="0.4"/>
    </svg>
  );
}

export function IcoBalance({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="9" y1="16" x2="9" y2="10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <polygon points="9,16 7,18 11,18" fill="currentColor" opacity="0.7"/>
      <line x1="3" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="3"  cy="7.5" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9"/>
      <circle cx="15" cy="7.5" r="2.5" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.9"/>
      <line x1="3"  y1="10" x2="3"  y2="8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
      <line x1="15" y1="10" x2="15" y2="8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  );
}

export function IcoThermometer({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="2" width="4" height="10" rx="2" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.1"/>
      <line x1="9" y1="4" x2="9" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <circle cx="9" cy="14" r="3.5" fill="currentColor" opacity="0.8"/>
      <line x1="11" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
      <line x1="11" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function IcoBulb({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 6 14 L 6.5 17 L 11.5 17 L 12 14 Q 15 11 15 7.5 A 6 6 0 0 0 3 7.5 Q 3 11 6 14 Z"
        stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.15"/>
      <path d="M 7 14.5 L 7 13 L 9 11.5 L 11 13 L 11 14.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="7.5" y1="17" x2="10.5" y2="17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

// ── Lookup maps ───────────────────────────────────────────────────────────────

export const CATEGORY_ICONS: Record<string, IconFn> = {
  mecanique:       IcoGear,
  gravitation:     (p) => <EarthIcon {...p} />,
  electromagnetisme: IcoLightningBolt,
  thermodynamique: IcoFlame,
  relativite:      IcoLightCone,
  quantique:       IcoWaveFunction,
  optique:         IcoPrism,
};

export const SI_UNIT_ICONS: Record<string, IconFn> = {
  m:   IcoRuler,
  kg:  IcoBalance,
  s:   (p) => <ClockIcon {...p} />,
  A:   IcoLightningBolt,
  K:   IcoThermometer,
  mol: (p) => <FlaskIcon {...p} />,
  cd:  IcoBulb,
};

// ── Helper components ─────────────────────────────────────────────────────────

export function CategoryIcon({ id, size = 22 }: { id: string; size?: number }) {
  const Icon = CATEGORY_ICONS[id];
  return Icon ? <Icon size={size} /> : null;
}

export function SIUnitIcon({ symbol, size = 18 }: { symbol: string; size?: number }) {
  const Icon = SI_UNIT_ICONS[symbol];
  return Icon ? <Icon size={size} /> : null;
}
