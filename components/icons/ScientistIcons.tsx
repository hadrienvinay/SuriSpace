// components/ScientistIcons.tsx
// SVG icons for each scientist — keyed by scientist id
import { TelescopeIcon, AtomIcon } from '@/components/icons/UniverseIcons';
import { FlaskIcon, RadiationIcon } from '@/components/icons/AtomsIcons';

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

function IcoThales({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="13" r="9" stroke="currentColor" strokeWidth="1.1" opacity="0.5"/>
      <path d="M 3 13 L 21 13 L 12 3 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12"/>
      <circle cx="12" cy="13" r="1.3" fill="currentColor"/>
      <path d="M 8.5 13 A 3.5 3.5 0 0 0 12 9.6" stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="none"/>
    </svg>
  );
}

function IcoPythagoras({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 4 20 L 4 8 L 16 20 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1"/>
      <rect x="-4" y="-4" width="4" height="4" transform="translate(8 8) rotate(90)" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.15" opacity="0.7"/>
      <rect x="0" y="20" width="12" height="4" transform="translate(4 -4)" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.15" opacity="0.7"/>
      <path d="M 4 8 L -4.5 4.5 L -1 -4 L 7.5 -0.5 Z" transform="translate(4 8)" stroke="currentColor" strokeWidth="0.9" fill="currentColor" fillOpacity="0.15" opacity="0.7"/>
    </svg>
  );
}

function IcoAristotle({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="4" width="14" height="17" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08"/>
      <line x1="9" y1="4" x2="9" y2="21" stroke="currentColor" strokeWidth="0.9" opacity="0.5"/>
      <line x1="7.5" y1="8"  x2="17" y2="8"  stroke="currentColor" strokeWidth="0.9" opacity="0.6"/>
      <line x1="7.5" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="0.9" opacity="0.6"/>
      <line x1="7.5" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="0.9" opacity="0.6"/>
      <circle cx="17.5" cy="18.5" r="3" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2"/>
    </svg>
  );
}

function IcoEuclid({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12 3 L 5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 12 3 L 19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 12 3 L 12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M 8.3 13 L 15.7 13" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <path d="M 9.3 9.5 A 4 4 0 0 1 12 8" stroke="currentColor" strokeWidth="0.8" opacity="0.5" fill="none"/>
      <circle cx="12" cy="3" r="1.3" fill="currentColor"/>
    </svg>
  );
}

function IcoHipparchus({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1" opacity="0.5" fill="none"/>
      <ellipse cx="12" cy="12" rx="8.5" ry="3.2" stroke="currentColor" strokeWidth="0.9" opacity="0.55" fill="none"/>
      <ellipse cx="12" cy="12" rx="3.2" ry="8.5" stroke="currentColor" strokeWidth="0.9" opacity="0.55" fill="none"/>
      <circle cx="12" cy="3.5"  r="1.1" fill="currentColor"/>
      <circle cx="19" cy="8"    r="1.1" fill="currentColor" opacity="0.8"/>
      <circle cx="6"  cy="17"   r="1.1" fill="currentColor" opacity="0.8"/>
      <circle cx="12" cy="12"   r="1.4" fill="currentColor"/>
    </svg>
  );
}

function IcoDescartes({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <line x1="12" y1="21" x2="12" y2="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
      <path d="M 4 18 Q 12 2 20 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <circle cx="14" cy="7.4" r="1.3" fill="currentColor"/>
      <circle cx="8.3" cy="14.5" r="1.3" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function IcoHarvey({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20 C 4 14 4 7 9 5.5 C 11 5 12 7 12 8 C 12 7 13 5 15 5.5 C 20 7 20 14 12 20 Z"
        stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.15"/>
      <path d="M 3 12 A 9 9 0 0 1 12 3.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.6" opacity="0.5" fill="none"/>
      <path d="M 21 12 A 9 9 0 0 1 12 20.5" stroke="currentColor" strokeWidth="1" strokeDasharray="2 1.6" opacity="0.5" fill="none"/>
      <path d="M 11 12 L 13 12 L 12 14.5 Z" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function IcoCarnot({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="10" height="16" rx="1" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.06"/>
      <rect x="5" y="11" width="8" height="8" fill="currentColor" opacity="0.35"/>
      <line x1="5" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.4"/>
      <line x1="9" y1="11" x2="9" y2="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7"/>
      <path d="M 16 8 C 19 8 21 10 21 13 C 21 16 19 18 16 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" fill="none"/>
      <path d="M 16 18 L 17.5 16.5 M 16 18 L 17 19.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.55"/>
    </svg>
  );
}

function IcoFaraday({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[6, 9.5, 13, 16.5].map((x, i) => (
        <ellipse key={x} cx={x} cy="12" rx="2.2" ry="8" stroke="currentColor" strokeWidth="1" opacity={0.35 + i * 0.08} fill="none"/>
      ))}
      <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="2" cy="12" r="1.3" fill="currentColor"/>
      <circle cx="22" cy="12" r="1.3" fill="currentColor"/>
    </svg>
  );
}

function IcoMendel({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="1.2" stroke="currentColor" strokeWidth="1.1" opacity="0.5" fill="none"/>
      <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="0.9" opacity="0.4"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="0.9" opacity="0.4"/>
      <circle cx="7.5"  cy="7.5"  r="2.3" fill="currentColor" opacity="0.85"/>
      <circle cx="16.5" cy="7.5"  r="2.3" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="7.5"  cy="16.5" r="2.3" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="16.5" cy="16.5" r="2.3" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function IcoPlanck({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 3 20 L 3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M 3 20 L 21 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M 3 19 C 8 19 8 6 13 6 C 17 6 16 12 21 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <rect x="12" y="9" width="2.4" height="2.4" fill="currentColor"/>
      <rect x="15.5" y="9" width="2.4" height="2.4" fill="currentColor" opacity="0.6"/>
      <rect x="8.5" y="9" width="2.4" height="2.4" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

function IcoSchrodinger({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2.5 2" opacity="0.55" fill="none"/>
      <path d="M 5 12 C 7 6 9 18 11 12 C 13 6 15 18 17 12 C 18 9.5 18.5 9 19 8.5"
        stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="0.9" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function IcoDirac({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 3 6 C 7 6 7 12 12 12 C 17 12 17 6 21 6" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      <path d="M 3 18 C 7 18 7 12 12 12 C 17 12 17 18 21 18" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.55"/>
      <circle cx="12" cy="12" r="1.4" fill="currentColor"/>
      <circle cx="21" cy="6" r="1.1" fill="currentColor" opacity="0.7"/>
      <circle cx="21" cy="18" r="1.1" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

function IcoFranklin({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" opacity="0.35" fill="none"/>
      <path d="M 12 3 L 12 21 M 3 12 L 21 12 M 5.5 5.5 L 18.5 18.5 M 18.5 5.5 L 5.5 18.5"
        stroke="currentColor" strokeWidth="0.8" opacity="0.35"/>
      {[[12,4],[7,7],[17,7],[5,12],[19,12],[7,17],[17,17],[12,20]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="1.1" fill="currentColor" opacity={0.4 + (i % 3) * 0.2}/>
      ))}
      <circle cx="12" cy="12" r="1.6" fill="currentColor"/>
    </svg>
  );
}

function IcoShannon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.7"/>
      <rect x="17" y="4" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.7"/>
      <rect x="17" y="15" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.7"/>
      <path d="M 7 11.5 L 17 6.5 M 7 11.5 L 17 17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

function IcoMonod({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="2" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="4" y="9" width="4" height="5" rx="0.8" fill="currentColor" opacity="0.4"/>
      <rect x="9.5" y="9" width="4" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.15"/>
      <rect x="15" y="9" width="4" height="5" rx="0.8" fill="currentColor" opacity="0.85"/>
      <path d="M 17 9 L 17 4 L 20 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" fill="none"/>
      <circle cx="20" cy="4" r="1" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function IcoCrispr({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 5 4 L 19 18 M 5 4 C 5 7 7 8 8.5 9.5 M 19 4 C 19 7 17 8 15.5 9.5"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M 19 4 L 5 18 M 19 4 C 19 7 17 8 15.5 9.5 M 5 4 C 5 7 7 8 8.5 9.5"
        stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.55"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <path d="M 5 20 L 8 18 M 19 20 L 16 18" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

function IcoNeuralNet({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[5, 12, 19].map(y => <circle key={`a${y}`} cx="4" cy={y} r="1.6" fill="currentColor" opacity="0.7"/>)}
      {[3.5, 9, 15, 20.5].map(y => <circle key={`b${y}`} cx="12" cy={y} r="1.6" fill="currentColor" opacity="0.85"/>)}
      {[8.5, 15.5].map(y => <circle key={`c${y}`} cx="20" cy={y} r="1.6" fill="currentColor"/>)}
      {[5,12,19].flatMap(y1 => [3.5,9,15,20.5].map(y2 => (
        <line key={`${y1}-${y2}`} x1="4" y1={y1} x2="12" y2={y2} stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      )))}
      {[3.5,9,15,20.5].flatMap(y1 => [8.5,15.5].map(y2 => (
        <line key={`d${y1}-${y2}`} x1="12" y1={y1} x2="20" y2={y2} stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
      )))}
    </svg>
  );
}

function IcoAlKhwarizmi({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="3" y="16" fontSize="10" fontWeight="700" fill="currentColor" opacity="0.9">x²</text>
      <path d="M 10 13 L 14 13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <text x="14.5" y="16" fontSize="10" fontWeight="700" fill="currentColor" opacity="0.6">=0</text>
      <circle cx="3.5" cy="4.5" r="1.3" fill="currentColor" opacity="0.5"/>
      <circle cx="8.5" cy="4.5" r="1.3" fill="currentColor" opacity="0.5"/>
      <circle cx="13.5" cy="4.5" r="1.3" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

function IcoAryabhata({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none"/>
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="0.9" opacity="0.4"/>
      <path d="M 18.4 12 A 6.4 6.4 0 0 0 12 5.6" stroke="currentColor" strokeWidth="1.3" fill="none" opacity="0.7"/>
      <line x1="18.4" y1="12" x2="18.4" y2="5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="18.4" y1="12" x2="12" y2="5.6" stroke="currentColor" strokeWidth="0.9" strokeDasharray="1.5 1.3" opacity="0.6"/>
      <circle cx="12" cy="12" r="1.3" fill="currentColor"/>
    </svg>
  );
}

function IcoGauss({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="2" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M 2 19 C 6 19 8 5 12 5 C 16 5 18 19 22 19" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
      <line x1="12" y1="19" x2="12" y2="5" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.3" opacity="0.5"/>
    </svg>
  );
}

function IcoLovelace({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="7" width="20" height="10" rx="1" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.06"/>
      {[5, 8.5, 12, 15.5, 19].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 === 0 ? 10 : 14} r="1.1" fill="currentColor" opacity={0.5 + (i % 3) * 0.15}/>
      ))}
      <path d="M 12 3 L 12 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      <path d="M 12 17 L 12 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function IcoNoether({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="0.9" strokeDasharray="2 1.5" opacity="0.5"/>
      <path d="M 4 8 L 9 8 L 6 15 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
      <path d="M 20 8 L 15 8 L 18 15 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" opacity="0.7"/>
      <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M 12 18 L 12 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}

function IcoAnning({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 12 20 A 8 8 0 1 1 19.5 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <path d="M 12 17 A 5 5 0 1 1 17 10.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7"/>
      <path d="M 12 14 A 2.2 2.2 0 1 1 14.3 12" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.55"/>
      <circle cx="19.5" cy="9" r="1.2" fill="currentColor"/>
    </svg>
  );
}

function IcoVonNeumann({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.15"/>
      <rect x="14" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.15"/>
      <rect x="8.5" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.4"/>
      <path d="M 6.5 11 L 6.5 17.5 L 8.5 17.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M 17.5 11 L 17.5 17.5 L 15.5 17.5" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
    </svg>
  );
}

function IcoPauling({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7" cy="9" r="3.6" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="16" cy="15" r="3.6" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15"/>
      <path d="M 9.5 11.2 L 13.5 12.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M 9.7 10 L 13.3 14" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

function IcoWu({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15"/>
      <path d="M 9.5 12 L 19 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 9.5 12 L 16 19" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="1.5 1.3" opacity="0.4"/>
      <circle cx="19" cy="6" r="1.3" fill="currentColor"/>
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
  'thales':        IcoThales,
  'pythagoras':    IcoPythagoras,
  'aristotle':     IcoAristotle,
  'euclid':        IcoEuclid,
  'hipparchus':    IcoHipparchus,
  'descartes':     IcoDescartes,
  'harvey':        IcoHarvey,
  'carnot':        IcoCarnot,
  'faraday':       IcoFaraday,
  'mendel':        IcoMendel,
  'planck':        IcoPlanck,
  'schrodinger':   IcoSchrodinger,
  'dirac':         IcoDirac,
  'franklin':      IcoFranklin,
  'shannon':       IcoShannon,
  'monod':         IcoMonod,
  'doudna':        IcoCrispr,
  'charpentier':   IcoCrispr,
  'lecun':         IcoNeuralNet,
  'hinton':        IcoNeuralNet,
  'al-khwarizmi':  IcoAlKhwarizmi,
  'aryabhata':     IcoAryabhata,
  'gauss':         IcoGauss,
  'lovelace':      IcoLovelace,
  'noether':       IcoNoether,
  'anning':        IcoAnning,
  'von-neumann':   IcoVonNeumann,
  'pauling':       IcoPauling,
  'wu':            IcoWu,
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
