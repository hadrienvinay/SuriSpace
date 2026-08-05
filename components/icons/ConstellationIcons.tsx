// components/ConstellationIcons.tsx — SVG icons for each constellation

type IconFn = (props: { size?: number }) => React.JSX.Element;

function IcoOrion({ size = 24 }: { size?: number }) { // bow & arrow
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 4 20 Q 2 12 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <line x1="4" y1="4" x2="20" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="4" y1="20" x2="20" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="14" y1="9" x2="22" y2="12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <polygon points="22,12 19,10 19,14" fill="currentColor" opacity="0.9"/>
    </svg>
  );
}

function IcoBear({ size = 24 }: { size?: number }) { // bear paw
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="15" rx="6" ry="5" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.2"/>
      {[6, 10, 14, 18].map((x, i) => (
        <circle key={i} cx={x} cy="8" r="2.2" fill="currentColor" opacity="0.8"/>
      ))}
    </svg>
  );
}

function IcoScorpion({ size = 24 }: { size?: number }) { // scorpion tail
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 4 18 L 8 14 L 12 16 L 16 10 L 20 8 Q 22 6 21 4 Q 20 2 18 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="4" cy="18" r="2" fill="currentColor" opacity="0.75"/>
    </svg>
  );
}

function IcoLion({ size = 24 }: { size?: number }) { // lion sickle
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.12"/>
      <path d="M 10 13 Q 6 16 5 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M 9 6 Q 7 3 5 5 Q 4 7 7 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none"/>
      <circle cx="15" cy="10" r="1.5" fill="currentColor" opacity="0.7"/>
    </svg>
  );
}

function IcoWheat({ size = 24 }: { size?: number }) { // wheat stalk
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="22" x2="12" y2="4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      {[-1, 1].map((side, i) => (
        [8, 12, 16].map((y, j) => (
          <ellipse key={`${i}-${j}`} cx={12 + side * 3.5} cy={y} rx="2.5" ry="1.2" fill="currentColor" opacity="0.7" transform={`rotate(${side * 30} ${12 + side * 3.5} ${y})`}/>
        ))
      ))}
    </svg>
  );
}

function IcoTwins({ size = 24 }: { size?: number }) { // II gemini symbol
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="8"  y1="4" x2="8"  y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="16" y1="4" x2="16" y2="20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="8"  y1="4"  x2="16" y2="4"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="8"  y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function IcoBullHorns({ size = 24 }: { size?: number }) { // taurus horns
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="15" r="5" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.12"/>
      <path d="M 7 13 Q 3 8 4 4 Q 5 2 7 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
      <path d="M 17 13 Q 21 8 20 4 Q 19 2 17 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function IcoCross({ size = 24 }: { size?: number }) { // cygnus northern cross
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="4"  y1="9" x2="20" y2="9"  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      {[[12,2],[12,22],[4,9],[20,9]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="1.8" fill="currentColor"/>
      ))}
    </svg>
  );
}

function IcoLyre({ size = 24 }: { size?: number }) { // lyre frame
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 7 4 Q 4 8 4 14 L 4 20 L 20 20 L 20 14 Q 20 8 17 4" stroke="currentColor" strokeWidth="1.3" fill="currentColor" fillOpacity="0.1" strokeLinejoin="round"/>
      <line x1="7"  y1="4"  x2="17" y2="4"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      {[9, 12, 15].map((x,i) => (
        <line key={i} x1={x} y1="4" x2={x} y2="20" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.6"/>
      ))}
    </svg>
  );
}

function IcoEagle({ size = 24 }: { size?: number }) { // eagle wings spread
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 2 10 Q 7 6 12 10 Q 17 6 22 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M 12 10 L 12 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M 9 16 L 12 20 L 15 16" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="8" r="2" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

function IcoStaff({ size = 24 }: { size?: number }) { // shepherd staff / bootes
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 8 4 Q 4 4 4 8 Q 4 12 8 12 L 16 12 L 16 22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

function IcoCrown({ size = 24 }: { size?: number }) { // cassiopeia W/crown
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 2 18 L 6 8 L 12 14 L 18 8 L 22 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {[2,6,12,18,22].map((x,i) => (
        <circle key={i} cx={x} cy={i===2||i===4?18:i===1||i===3?8:14} r="1.8" fill="currentColor"/>
      ))}
    </svg>
  );
}

function IcoSword({ size = 24 }: { size?: number }) { // perseus sword
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="2" x2="12" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="7"  y1="14" x2="17" y2="14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M 10 18 Q 12 22 14 18" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.2" strokeLinecap="round"/>
    </svg>
  );
}

function IcoWheel({ size = 24 }: { size?: number }) { // auriga chariot wheel
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.3"/>
      <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.8"/>
      {[0,45,90,135].map(a => {
        const r = Math.PI * a / 180;
        return <line key={a} x1={12+Math.cos(r)*2.5} y1={12+Math.sin(r)*2.5} x2={12+Math.cos(r)*9} y2={12+Math.sin(r)*9} stroke="currentColor" strokeWidth="1"/>;
      })}
    </svg>
  );
}

function IcoPaw({ size = 24 }: { size?: number }) { // dog paw
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="15" rx="5" ry="4" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.1"/>
      <circle cx="7"  cy="8"  r="2" fill="currentColor" opacity="0.75"/>
      <circle cx="12" cy="6"  r="2" fill="currentColor" opacity="0.75"/>
      <circle cx="17" cy="8"  r="2" fill="currentColor" opacity="0.75"/>
    </svg>
  );
}

function IcoCentaur({ size = 24 }: { size?: number }) { // centaurus half-man half-horse
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1"/>
      <path d="M 6 8 L 4 14 L 2 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M 10 8 L 12 12 L 18 10 L 22 14 L 22 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M 12 12 L 16 18 L 14 20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

function IcoSerpent({ size = 24 }: { size?: number }) { // ophiuchus snake
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M 12 2 Q 18 5 16 10 Q 14 14 18 16 Q 22 18 20 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M 12 2 Q 6 5 8 10 Q 10 14 6 16 Q 2 18 4 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <circle cx="12" cy="2" r="2" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

// ── Lookup map ────────────────────────────────────────────────────────────────

export const CONSTELLATION_ICONS: Record<string, IconFn> = {
  'orion':       IcoOrion,
  'ursa-major':  IcoBear,
  'ursa-minor':  IcoBear,
  'scorpius':    IcoScorpion,
  'leo':         IcoLion,
  'virgo':       IcoWheat,
  'gemini':      IcoTwins,
  'taurus':      IcoBullHorns,
  'cygnus':      IcoCross,
  'lyra':        IcoLyre,
  'aquila':      IcoEagle,
  'bootes':      IcoStaff,
  'cassiopeia':  IcoCrown,
  'perseus':     IcoSword,
  'auriga':      IcoWheel,
  'canis-major': IcoPaw,
  'centaurus':   IcoCentaur,
  'ophiuchus':   IcoSerpent,
};

// ── Helper component ──────────────────────────────────────────────────────────

export function ConstellationIcon({ id, size = 24, color }: { id: string; size?: number; color?: string }) {
  const Icon = CONSTELLATION_ICONS[id];
  if (!Icon) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', color: color ?? 'currentColor' }}>
      <Icon size={size} />
    </span>
  );
}
