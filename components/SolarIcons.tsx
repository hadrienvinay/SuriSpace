// components/SolarIcons.tsx — Small SVG icons for the solar-system section

export function IcoSearch({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
      <line x1="9.5" y1="9.5" x2="13" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

export function IcoPin({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M 7 1 A 4 4 0 0 1 11 5 C 11 8 7 13 7 13 C 7 13 3 8 3 5 A 4 4 0 0 1 7 1 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="7" cy="5" r="1.5" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}

export function IcoDocument({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M 2 2 L 9 2 L 12 5 L 12 12 L 2 12 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.08" strokeLinejoin="round"/>
      <path d="M 9 2 L 9 5 L 12 5" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/>
      <line x1="4" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <line x1="4" y1="9" x2="8" y2="9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}

export function IcoDish({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 2 10 A 7 7 0 0 1 12 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M 4 11 A 5 5 0 0 1 11 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.9"/>
      <line x1="8" y1="9.5" x2="8" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="5" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function IcoOrbiter({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.7"/>
      <path d="M 8 2 A 6 6 0 0 1 14 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M 14 8 A 6 6 0 0 1 8 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M 8 14 A 6 6 0 0 1 2 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5"/>
      <path d="M 2 8 A 6 6 0 0 1 8 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" opacity="0.5"/>
      <polygon points="8,2 6,4 10,4" fill="currentColor"/>
    </svg>
  );
}

export function IcoLander({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="5" y="3" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15"/>
      <line x1="8" y1="8" x2="8" y2="11" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="8" y1="11" x2="4" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="8" y1="11" x2="12" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4" y1="13" x2="4" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12" y1="13" x2="12" y2="15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function IcoRover({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="3" y="4" width="10" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12"/>
      <circle cx="4.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="11.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.2"/>
      <line x1="6" y1="3" x2="11" y2="1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="11.5" cy="1.5" r="1" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

export function IcoFlyby({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 2 11 Q 8 5 14 9" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
      <polygon points="14,9 11,7 13,11" fill="currentColor" opacity="0.85"/>
      <circle cx="5" cy="10" r="1.5" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}

export function IcoAstronaut({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15"/>
      <circle cx="8" cy="5" r="1.5" fill="currentColor" opacity="0.6"/>
      <path d="M 4 9 Q 4 14 8 14 Q 12 14 12 9" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12"/>
      <line x1="2" y1="9" x2="4" y2="10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      <line x1="14" y1="9" x2="12" y2="10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  );
}

export function IcoSampleReturn({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 6 13 L 7 8 L 5 7 L 5 4 Q 5 2 8 2 Q 11 2 11 4 L 11 7 L 9 8 L 10 13 Z" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round"/>
      <line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="0.9" opacity="0.5"/>
      <path d="M 12 11 L 14 9 L 14 13 Z" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

export function IcoPlanetRing({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="4" fill="currentColor" opacity="0.7"/>
      <ellipse cx="9" cy="9" rx="8" ry="3" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6"/>
    </svg>
  );
}

export function IcoMoon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 8 2 A 6 6 0 1 0 8 14 A 4 4 0 1 1 8 2 Z" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

export function IcoSunStar({ size = 18 }: { size?: number }) {
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <circle cx={c} cy={c} r={size * 0.28} fill="currentColor" opacity="0.85"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
        const r = Math.PI * a / 180;
        return <line key={a} x1={c + Math.cos(r) * size * 0.34} y1={c + Math.sin(r) * size * 0.34} x2={c + Math.cos(r) * (size / 2 - 1)} y2={c + Math.sin(r) * (size / 2 - 1)} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>;
      })}
    </svg>
  );
}

export function IcoEye({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 1 8 Q 8 2 15 8 Q 8 14 1 8 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" strokeLinejoin="round"/>
      <circle cx="8" cy="8" r="2.5" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

export function IcoCalendar({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1" y="3" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <line x1="1" y1="7" x2="15" y2="7" stroke="currentColor" strokeWidth="1"/>
      <line x1="5" y1="1" x2="5" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="11" y1="1" x2="11" y2="5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="5.5" cy="10.5" r="1" fill="currentColor" opacity="0.7"/>
      <circle cx="10.5" cy="10.5" r="1" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

export function IcoMountain({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 1 14 L 6 5 L 9 9 L 11 6 L 15 14 Z" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.15" strokeLinejoin="round"/>
      <path d="M 5.5 5.5 L 6.5 4.5 L 7.5 5.5" stroke="currentColor" strokeWidth="0.9" fill="white" fillOpacity="0.3" strokeLinejoin="round"/>
    </svg>
  );
}

export function IcoShootingStar({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="12" cy="4" r="2" fill="currentColor" opacity="0.9"/>
      <line x1="1" y1="15" x2="10.5" y2="5.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7"/>
      <line x1="1" y1="12" x2="7" y2="6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
      <line x1="4" y1="15" x2="9" y2="10" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

export function IcoSnowflake({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <line x1="8" y1="1" x2="8" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="3.1" y1="3.1" x2="12.9" y2="12.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="12.9" y1="3.1" x2="3.1" y2="12.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
    </svg>
  );
}

export function IcoFlower({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      {[0, 60, 120, 180, 240, 300].map(a => {
        const r = Math.PI * a / 180;
        return <ellipse key={a} cx={8 + Math.cos(r) * 3.2} cy={8 + Math.sin(r) * 3.2} rx="2" ry="1.2" fill="currentColor" opacity="0.65" transform={`rotate(${a} ${8 + Math.cos(r) * 3.2} ${8 + Math.sin(r) * 3.2})`}/>;
      })}
      <circle cx="8" cy="8" r="2.2" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}

export function IcoLeaf({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 3 13 Q 3 5 13 3 Q 13 11 3 13 Z" fill="currentColor" fillOpacity="0.7" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
      <line x1="3" y1="13" x2="11" y2="5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function IcoWind({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 1 5 Q 8 5 10 5 Q 13 5 13 3 Q 13 1 11 1 Q 9 1 9 3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M 1 8 L 12 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 1 11 Q 7 11 9 11 Q 12 11 12 13 Q 12 15 10 15 Q 8 15 8 13" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

export function IcoLayers({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <ellipse cx="8" cy="4.5" rx="6" ry="2" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.1"/>
      <ellipse cx="8" cy="8" rx="6" ry="2" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.1"/>
      <ellipse cx="8" cy="11.5" rx="6" ry="2" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.1"/>
    </svg>
  );
}

export function IcoNebula({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <ellipse cx="5" cy="8" rx="4" ry="3" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="0.8"/>
      <ellipse cx="11" cy="7" rx="4" ry="2.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="0.8"/>
      <ellipse cx="8" cy="10" rx="3" ry="2" fill="currentColor" fillOpacity="0.25"/>
      {[0, 4, 8, 12].map(i => (
        <circle key={i} cx={3 + i * 2.5} cy={6 + (i % 3)} r="0.7" fill="white" opacity={0.3 + i * 0.05}/>
      ))}
    </svg>
  );
}

export function IcoGlobeEarth({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1"/>
      <ellipse cx="8" cy="8" rx="3" ry="6" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <line x1="3" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="0.7" opacity="0.35"/>
      <line x1="3" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="0.7" opacity="0.35"/>
    </svg>
  );
}

export function IcoMap({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 1 3 L 6 1 L 10 3 L 15 1 L 15 13 L 10 15 L 6 13 L 1 15 Z" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.08" strokeLinejoin="round"/>
      <line x1="6" y1="1" x2="6" y2="13" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
      <line x1="10" y1="3" x2="10" y2="15" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
}

export function IcoTarget({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.1" opacity="0.5"/>
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.1" opacity="0.7"/>
      <circle cx="8" cy="8" r="1.8" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}

export function IcoCheckmark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.1"/>
      <path d="M 4 7 L 6.5 9.5 L 10 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IcoAgency({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <rect x="1" y="5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" fill="currentColor" fillOpacity="0.08"/>
      <path d="M 3.5 5 L 3.5 3 Q 3.5 1 7 1 Q 10.5 1 10.5 3 L 10.5 5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
      <line x1="1" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="0.8" opacity="0.5"/>
    </svg>
  );
}

export function IcoFinish({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <line x1="3" y1="1" x2="3" y2="13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M 3 1 L 10 3 L 3 5 L 10 7 L 3 9" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}
