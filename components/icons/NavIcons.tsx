// Small SVG icons for the navbar — no <defs> gradient ids, safe for simultaneous rendering.
// All use inline fills/strokes only. Subtle SMIL animations ok.

type P = { size?: number; color?: string };

// ── Top-level dropdown icons (20px) ──────────────────────────

export function NavPlanetIcon({ size = 20, color = '#60A5FA' }: P) {
  return (
    <svg viewBox="-20 -20 40 40" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="7" fill={color} fillOpacity="0.9" />
      <circle cx="-2" cy="-2" r="2.2" fill="white" opacity="0.35" />
      <ellipse cx="0" cy="0" rx="14" ry="5" fill="none" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
        <circle cx="14" cy="0" r="2.5" fill={color} fillOpacity="0.85" />
      </g>
    </svg>
  );
}

export function NavScienceIcon({ size = 20, color = '#A78BFA' }: P) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Beaker body */}
      <path d="M7 2 L7 9 L3 16 Q2.5 18 4.5 18 L15.5 18 Q17.5 18 17 16 L13 9 L13 2 Z"
        fill={`${color}20`} stroke={color} strokeWidth="1.3" strokeLinejoin="round" />
      {/* Neck */}
      <rect x="7" y="1" width="6" height="1.5" rx="0.5" fill={color} fillOpacity="0.7" />
      {/* Liquid */}
      <path d="M5 14 Q10 12 15 14 L17 18 Q17.5 18 4.5 18 Z" fill={color} fillOpacity="0.3" />
      {/* Bubble */}
      <circle cx="9" cy="15.5" r="1" fill={color} fillOpacity="0.7">
        <animate attributeName="cy" values="15.5;11;15.5" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function NavAtomIcon({ size = 20, color = '#34D399' }: P) {
  return (
    <svg viewBox="-20 -20 40 40" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="0" cy="0" r="4" fill={color}>
        <animate attributeName="r" values="3.5;4.5;3.5" dur="2s" repeatCount="indefinite" />
      </circle>
      {[0, 60, 120].map((tilt) => (
        <g key={tilt} transform={`rotate(${tilt}) scale(1 0.38)`}>
          <circle cx="0" cy="0" r="16" stroke={color} strokeWidth="1.2" strokeOpacity="0.55" />
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={`${2.5 + tilt / 60}s`} repeatCount="indefinite" />
            <circle cx="16" cy="0" r="2.5" fill={color} fillOpacity="0.9" />
          </g>
        </g>
      ))}
    </svg>
  );
}

export function NavLeafIcon({ size = 20, color = '#22C55E' }: P) {
  return (
    <svg viewBox="-20 -20 40 40" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-5 0 8; 5 0 8; -5 0 8" dur="3s" repeatCount="indefinite" />
        <path d="M0 14 C-12 8 -14 -4 -4 -14 Q0 -18 4 -14 C14 -4 12 8 0 14 Z"
          fill={`${color}35`} stroke={color} strokeWidth="1.4" strokeLinejoin="round" />
        <line x1="0" y1="14" x2="0" y2="-14" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1="0" y1="4" x2="-6" y2="-2" stroke={color} strokeWidth="0.7" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="0" y1="4" x2="6" y2="-2" stroke={color} strokeWidth="0.7" strokeLinecap="round" strokeOpacity="0.6" />
      </g>
    </svg>
  );
}

// ── Dropdown item icons (16px) ────────────────────────────────

export function IcoHome({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M2 7 L8 2 L14 7 L14 14 L10 14 L10 10 L6 10 L6 14 L2 14 Z" stroke={color} strokeWidth="1.3" strokeLinejoin="round" fillOpacity="0.15" fill={color} /></svg>;
}
export function IcoMap({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2" /><ellipse cx="8" cy="8" rx="3" ry="6" stroke={color} strokeWidth="0.9" /><line x1="2" y1="8" x2="14" y2="8" stroke={color} strokeWidth="0.9" /></svg>;
}
export function IcoGlobe({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2" fill={`${color}18`} /><path d="M5 5 Q6 3 8 5 Q10 7 9 9 Q8 11 7 10 Q5 9 5 5 Z" fill={color} fillOpacity="0.5" /></svg>;
}
export function IcoGalaxy({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><ellipse cx="8" cy="8" rx="6" ry="2" stroke={color} strokeWidth="1" strokeOpacity="0.5" /><path d="M4 5 Q7 4 10 7 Q13 10 12 12" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" /><circle cx="8" cy="8" r="1.5" fill={color} /></svg>;
}
export function IcoRocket({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M8 2 L6 8 L10 8 Z" fill={color} /><rect x="6" y="8" width="4" height="4" rx="0.5" fill={color} fillOpacity="0.7" /><path d="M6 10 L4 12" stroke={color} strokeWidth="1" strokeLinecap="round" /><path d="M10 10 L12 12" stroke={color} strokeWidth="1" strokeLinecap="round" /><path d="M6 12 L7 15 L9 15 L10 12" stroke={color} strokeWidth="0.8" fill={`${color}40`} /></svg>;
}
export function IcoTelescope({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><rect x="3" y="6" width="10" height="3" rx="1" fill={color} fillOpacity="0.7" /><path d="M3 7.5 L1 6 L1 9 Z" fill={color} /><path d="M13 7.5 L15 5 L15 10 Z" fill={color} fillOpacity="0.8" /><line x1="8" y1="9" x2="8" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" /></svg>;
}
export function IcoStar({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><polygon points="8,2 9.6,6.4 14,6.4 10.4,9.2 11.8,14 8,11.2 4.2,14 5.6,9.2 2,6.4 6.4,6.4" fill={color} fillOpacity="0.85" /></svg>;
}
export function IcoClock({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2" fill={`${color}15`} /><line x1="8" y1="8" x2="8" y2="4" stroke={color} strokeWidth="1.2" strokeLinecap="round" /><line x1="8" y1="8" x2="11" y2="8" stroke={color} strokeWidth="1.2" strokeLinecap="round" /></svg>;
}
export function IcoUser({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="5" r="3" stroke={color} strokeWidth="1.2" fill={`${color}25`} /><path d="M2 14 Q2 10 8 10 Q14 10 14 14" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" /></svg>;
}
export function IcoSigma({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M13 3 L4 3 L9 8 L4 13 L13 13" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>;
}
export function IcoInfinity({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M6 8 C6 5 2 5 2 8 C2 11 6 11 8 8 C10 5 14 5 14 8 C14 11 10 11 8 8 Z" stroke={color} strokeWidth="1.3" fill="none" /></svg>;
}
export function IcoFlask({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M6 2 L6 7 L2 14 Q2 15 4 15 L12 15 Q14 15 14 14 L10 7 L10 2 Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" fill={`${color}18`} /><rect x="6" y="1" width="4" height="1.5" fill={color} fillOpacity="0.7" rx="0.3" /></svg>;
}
export function IcoExplosion({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="3.5" fill={color} fillOpacity="0.85" />{[0,45,90,135,180,225,270,315].map((a,i) => { const r=Math.PI*a/180; return <line key={i} x1={8+3.5*Math.cos(r)} y1={8+3.5*Math.sin(r)} x2={8+6.5*Math.cos(r)} y2={8+6.5*Math.sin(r)} stroke={color} strokeWidth="1.2" strokeLinecap="round" />; })}</svg>;
}
export function IcoChart({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><line x1="2" y1="2" x2="2" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" /><line x1="2" y1="14" x2="14" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" /><rect x="4" y="8" width="2.5" height="6" fill={color} fillOpacity="0.7" rx="0.5" /><rect x="7.5" y="5" width="2.5" height="9" fill={color} rx="0.5" /><rect x="11" y="9" width="2.5" height="5" fill={color} fillOpacity="0.7" rx="0.5" /></svg>;
}
export function IcoRadiation({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="2" fill={color} />{[0,120,240].map((a,i) => { const r=Math.PI*a/180; const x1=8+2.2*Math.cos(r), y1=8+2.2*Math.sin(r); const x2=8+6*Math.cos(r), y2=8+6*Math.sin(r); return <path key={i} d={`M ${x1} ${y1} L ${x2} ${y2}`} stroke={color} strokeWidth="2.5" strokeLinecap="round" />; })}</svg>;
}
export function IcoLeaf({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M8 14 C2 10 2 4 8 2 C14 4 14 10 8 14 Z" stroke={color} strokeWidth="1.2" fill={`${color}25`} /><line x1="8" y1="14" x2="8" y2="2" stroke={color} strokeWidth="0.9" strokeLinecap="round" /></svg>;
}
export function IcoSprout({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><line x1="8" y1="15" x2="8" y2="5" stroke={color} strokeWidth="1.3" strokeLinecap="round" /><path d="M8 9 C5 8 3 5 5 3 C6 2 8 4 8 7" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.8" /><path d="M8 7 C11 6 13 3 11 1 C10 0 8 2 8 5" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="0.8" /></svg>;
}
export function IcoHouse({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M1 8 L8 2 L15 8" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /><rect x="4" y="8" width="8" height="6" rx="0.5" stroke={color} strokeWidth="1.2" fill={`${color}18`} /><rect x="6.5" y="10" width="3" height="4" fill={color} fillOpacity="0.5" rx="0.5" /></svg>;
}
export function IcoSun({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="3" fill={color} />{[0,45,90,135,180,225,270,315].map((a,i) => { const r=Math.PI*a/180; return <line key={i} x1={8+3.8*Math.cos(r)} y1={8+3.8*Math.sin(r)} x2={8+5.5*Math.cos(r)} y2={8+5.5*Math.sin(r)} stroke={color} strokeWidth="1.2" strokeLinecap="round" />; })}</svg>;
}
export function IcoApple({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M8 4 C4 4 2 8 2 10 C2 13 4 15 6.5 15 C7.5 15 8 14 8 14 C8 14 8.5 15 9.5 15 C12 15 14 13 14 10 C14 8 12 4 8 4 Z" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="0.8" /><path d="M8 4 Q9 1 11 2" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" /><path d="M8 4 Q8 2 9 1" stroke={color} strokeWidth="1" strokeLinecap="round" fill="none" /></svg>;
}
export function IcoHeart({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M8 13 C8 13 2 9 2 5.5 C2 3.5 3.5 2 5.5 2 C6.8 2 7.8 2.8 8 4 C8.2 2.8 9.2 2 10.5 2 C12.5 2 14 3.5 14 5.5 C14 9 8 13 8 13 Z" fill={color} fillOpacity="0.7" stroke={color} strokeWidth="0.9" /></svg>;
}
export function IcoDna({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M5 2 C11 4 5 8 11 10 C5 12 11 14 5 14" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" /><path d="M11 2 C5 4 11 8 5 10 C11 12 5 14 11 14" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.6" /></svg>;
}
export function IcoCell({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><ellipse cx="8" cy="8" rx="6" ry="5" fill={`${color}18`} stroke={color} strokeWidth="1.1" /><ellipse cx="8" cy="8" rx="3" ry="2.5" fill={`${color}35`} stroke={color} strokeWidth="0.9" /></svg>;
}
export function IcoTree({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><line x1="8" y1="14" x2="8" y2="7" stroke={color} strokeWidth="1.4" strokeLinecap="round" /><line x1="8" y1="9" x2="4" y2="6" stroke={color} strokeWidth="1.2" strokeLinecap="round" /><line x1="8" y1="9" x2="12" y2="6" stroke={color} strokeWidth="1.2" strokeLinecap="round" /><line x1="8" y1="7" x2="8" y2="4" stroke={color} strokeWidth="1.1" strokeLinecap="round" /><line x1="4" y1="6" x2="2" y2="3" stroke={color} strokeWidth="0.9" strokeLinecap="round" /><line x1="12" y1="6" x2="14" y2="3" stroke={color} strokeWidth="0.9" strokeLinecap="round" /></svg>;
}

export function IcoGene({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M5 2 C11 4 5 8 11 10 C5 12 11 14 5 14" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" /><path d="M11 2 C5 4 11 8 5 10 C11 12 5 14 11 14" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" /><circle cx="11" cy="8" r="2" fill={color} fillOpacity="0.9" /><line x1="9" y1="7" x2="13" y2="7" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" /><line x1="9" y1="9" x2="13" y2="9" stroke="rgba(0,0,0,0.4)" strokeWidth="0.6" /></svg>;
}
export function IcoShield({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M8 2 L2 4.5 L2 9 Q2 13 8 15 Q14 13 14 9 L14 4.5 Z" fill={`${color}18`} stroke={color} strokeWidth="1.2" strokeLinejoin="round" /><path d="M5 8 L7 10 L11 6" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function IcoEarth({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="6" stroke={color} strokeWidth="1.2" fill={`${color}10`} /><ellipse cx="8" cy="8" rx="3" ry="6" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" /><line x1="2" y1="8" x2="14" y2="8" stroke={color} strokeWidth="0.8" strokeOpacity="0.5" /><path d="M6 3 Q7 4 6 5 Q7 6 6 7" stroke={color} strokeWidth="0.7" strokeLinecap="round" fill="none" opacity="0.6" /></svg>;
}

export function IcoScroll({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><rect x="3" y="2" width="10" height="12" rx="2" stroke={color} strokeWidth="1.2" fill={`${color}15`} /><line x1="5.5" y1="5" x2="10.5" y2="5" stroke={color} strokeWidth="0.9" strokeLinecap="round" /><line x1="5.5" y1="7.5" x2="10.5" y2="7.5" stroke={color} strokeWidth="0.9" strokeLinecap="round" /><line x1="5.5" y1="10" x2="9" y2="10" stroke={color} strokeWidth="0.9" strokeLinecap="round" /></svg>;
}
export function IcoExoplanet({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><circle cx="8" cy="8" r="4.5" fill={`${color}18`} stroke={color} strokeWidth="1.2" /><circle cx="4" cy="4" r="1.2" fill={color} opacity="0.55" /><circle cx="13" cy="3" r="0.8" fill={color} opacity="0.35" /><ellipse cx="8" cy="8" rx="7" ry="2.2" stroke={color} strokeWidth="0.8" opacity="0.35" /></svg>;
}

export function IcoEvolution({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M8 13 Q4 13 3 10 Q2 7 5 6 Q7 5 8 8 Q9 11 12 10 Q15 9 14 6 Q13 3 10 3" stroke={color} strokeWidth="1.3" strokeLinecap="round" fill="none" /><circle cx="10" cy="3" r="1.2" fill={color} /></svg>;
}
export function IcoAtp({ color }: { color: string }) {
  return <svg viewBox="0 0 16 16" width="14" height="14" fill="none"><path d="M9 2 L5 8 H8 L5 14 L13 7 H10 Z" fill={color} fillOpacity="0.85" /><circle cx="3" cy="8" r="1.5" fill={color} opacity="0.5" /><circle cx="13" cy="4" r="1" fill={color} opacity="0.4" /></svg>;
}

export function NavBiologieIcon({ size = 20, color = '#34D399' }: P) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Heart */}
      <path d="M10 16 C10 16 3 11 3 6.5 C3 4.5 4.8 3 7 3 C8.4 3 9.5 3.8 10 5 C10.5 3.8 11.6 3 13 3 C15.2 3 17 4.5 17 6.5 C17 11 10 16 10 16 Z"
        fill={`${color}25`} stroke={color} strokeWidth="1.2" strokeLinejoin="round">
        <animate attributeName="d"
          values="M10 16 C10 16 3 11 3 6.5 C3 4.5 4.8 3 7 3 C8.4 3 9.5 3.8 10 5 C10.5 3.8 11.6 3 13 3 C15.2 3 17 4.5 17 6.5 C17 11 10 16 10 16 Z;M10 17 C10 17 2 12 2 6.5 C2 4 4 2 7 2 C8.5 2 9.6 3 10 4.5 C10.4 3 11.5 2 13 2 C16 2 18 4 18 6.5 C18 12 10 17 10 17 Z;M10 16 C10 16 3 11 3 6.5 C3 4.5 4.8 3 7 3 C8.4 3 9.5 3.8 10 5 C10.5 3.8 11.6 3 13 3 C15.2 3 17 4.5 17 6.5 C17 11 10 16 10 16 Z"
          dur="1s" repeatCount="indefinite" />
      </path>
      {/* DNA helix accent */}
      <path d="M8 8 Q10 6 12 8" stroke={color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M8 10 Q10 8 12 10" stroke={color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
    </svg>
  );
}
