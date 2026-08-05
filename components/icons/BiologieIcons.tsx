// SVG icons for the /biologie section — no <defs> gradient ids, SMIL animations only.
// All use currentColor or explicit props; safe for simultaneous rendering.

type P = { size?: number; color?: string };

export function HeartIcon({ size = 48, color = '#10B981' }: P) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 40 C24 40 6 28 6 16 C6 10 10.5 6 16 6 C19.5 6 22.5 7.8 24 10.5 C25.5 7.8 28.5 6 32 6 C37.5 6 42 10 42 16 C42 28 24 40 24 40 Z"
        fill={`${color}30`}
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <animate attributeName="d"
          values="M24 40 C24 40 6 28 6 16 C6 10 10.5 6 16 6 C19.5 6 22.5 7.8 24 10.5 C25.5 7.8 28.5 6 32 6 C37.5 6 42 10 42 16 C42 28 24 40 24 40 Z;M24 42 C24 42 4 30 4 16 C4 9 9 4 16 4 C20 4 23 6 24 9 C25 6 28 4 32 4 C39 4 44 9 44 16 C44 30 24 42 24 42 Z;M24 40 C24 40 6 28 6 16 C6 10 10.5 6 16 6 C19.5 6 22.5 7.8 24 10.5 C25.5 7.8 28.5 6 32 6 C37.5 6 42 10 42 16 C42 28 24 40 24 40 Z"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
      <circle cx="16" cy="14" r="2" fill={color} opacity="0.5" />
    </svg>
  );
}

export function DnaIcon({ size = 48, color = '#06B6D4' }: P) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 14 4 C 32 10 14 20 32 28 C 14 36 32 44 14 44"
        stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 34 4 C 16 10 34 20 16 28 C 34 36 16 44 34 44"
        stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="16" y1="9"  x2="32" y2="12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14" y1="18" x2="34" y2="19" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14" y1="28" x2="34" y2="27" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="37" x2="32" y2="36" stroke="rgba(255,255,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function CellIcon({ size = 48, color = '#10B981' }: P) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cell membrane */}
      <ellipse cx="24" cy="24" rx="20" ry="16" fill={`${color}10`} stroke={color} strokeWidth="1.5" strokeDasharray="3 2">
        <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="20s" repeatCount="indefinite" />
      </ellipse>
      {/* Nucleus */}
      <ellipse cx="24" cy="24" rx="8" ry="7" fill={`${color}25`} stroke={color} strokeWidth="1.5" />
      {/* Chromatin */}
      <path d="M21 22 Q24 20 27 22 Q24 24 21 22 Z" fill={color} opacity="0.6" />
      <path d="M21 26 Q24 24 27 26 Q24 28 21 26 Z" fill={color} opacity="0.4" />
      {/* Organites */}
      <ellipse cx="10" cy="16" rx="3" ry="2" fill={`${color}40`} stroke={color} strokeWidth="0.8" />
      <ellipse cx="38" cy="30" rx="3" ry="2" fill={`${color}40`} stroke={color} strokeWidth="0.8" />
      <circle cx="12" cy="32" r="2" fill={`${color}35`} stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

export function TreeOfLifeIcon({ size = 48, color = '#10B981' }: P) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trunk */}
      <line x1="24" y1="44" x2="24" y2="24" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Main branches */}
      <line x1="24" y1="30" x2="14" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="30" x2="34" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="24" x2="24" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Sub-branches */}
      <line x1="14" y1="20" x2="8" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <line x1="14" y1="20" x2="18" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <line x1="34" y1="20" x2="30" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <line x1="34" y1="20" x2="40" y2="12" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <line x1="24" y1="14" x2="20" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <line x1="24" y1="14" x2="28" y2="8" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      {/* Leaf endpoints */}
      {[[8,12],[18,12],[30,12],[40,12],[20,8],[28,8]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill={`${color}60`} stroke={color} strokeWidth="0.8" />
      ))}
    </svg>
  );
}

export function BodySilhouetteIcon({ size = 80, color = '#10B981' }: P) {
  return (
    <svg viewBox="0 0 80 200" width={size * 0.4} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="20" r="16" fill={`${color}20`} stroke={color} strokeWidth="1.5" />
      {/* Neck */}
      <rect x="34" y="34" width="12" height="8" rx="3" fill={`${color}15`} stroke={color} strokeWidth="1" />
      {/* Torso */}
      <path d="M22 42 Q20 80 24 110 L56 110 Q60 80 58 42 Z" fill={`${color}15`} stroke={color} strokeWidth="1.5" />
      {/* Arms */}
      <path d="M22 45 Q10 60 12 90" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M58 45 Q70 60 68 90" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="12" cy="93" r="5" fill={`${color}15`} stroke={color} strokeWidth="1" />
      <circle cx="68" cy="93" r="5" fill={`${color}15`} stroke={color} strokeWidth="1" />
      {/* Legs */}
      <path d="M30 110 Q28 150 30 185" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M50 110 Q52 150 50 185" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="30" cy="189" rx="8" ry="5" fill={`${color}15`} stroke={color} strokeWidth="1" />
      <ellipse cx="50" cy="189" rx="8" ry="5" fill={`${color}15`} stroke={color} strokeWidth="1" />
    </svg>
  );
}
