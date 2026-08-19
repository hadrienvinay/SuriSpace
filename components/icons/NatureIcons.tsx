// Animated SVG icons for the /nature section.
// Uses SMIL — no JS runtime.

type IconProps = { size?: number };

export function LeafIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Glow */}
      <circle cx="0" cy="0" r="36" fill="rgba(52,211,153,0.08)" />

      {/* Leaf shape — gentle sway */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-4 0 10; 4 0 10; -4 0 10"
          dur="4s"
          repeatCount="indefinite"
        />
        {/* Main leaf */}
        <path
          d="M 0 28 C -28 20 -34 -8 -10 -30 Q 0 -40 10 -30 C 34 -8 28 20 0 28 Z"
          fill="rgba(34,197,94,0.30)"
          stroke="#22C55E"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Central vein */}
        <line x1="0" y1="28" x2="0" y2="-32" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" />
        {/* Side veins */}
        {[-20, -8, 4, 16].map((y, i) => (
          <g key={i}>
            <line x1="0" y1={y} x2={-14 + i * 2} y2={y - 8} stroke="#16A34A" strokeWidth="0.7" strokeLinecap="round" opacity="0.8" />
            <line x1="0" y1={y} x2={14 - i * 2} y2={y - 8} stroke="#16A34A" strokeWidth="0.7" strokeLinecap="round" opacity="0.8" />
          </g>
        ))}
        {/* Dew drop */}
        <ellipse cx="14" cy="10" rx="2.2" ry="3" fill="rgba(147,197,253,0.8)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5">
          <animate attributeName="ry" values="3;4;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
        </ellipse>
      </g>

      {/* Stem */}
      <path d="M 0 28 Q 4 36 2 44" fill="none" stroke="#15803D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SproutIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Soil */}
      <ellipse cx="50" cy="82" rx="30" ry="5" fill="rgba(120,83,52,0.5)" />
      <path d="M 20 82 Q 50 79 80 82 L 80 90 Q 50 93 20 90 Z" fill="rgba(92,64,40,0.5)" />

      {/* Main stem */}
      <path d="M 50 80 Q 50 62 50 44" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" fill="none">
        <animate attributeName="d" values="M 50 80 Q 50 72 50 70;M 50 80 Q 50 62 50 44;M 50 80 Q 50 62 50 44" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Left leaf */}
      <path d="M 50 58 C 36 52 28 40 34 30 C 38 24 48 30 50 44">
        <animate attributeName="d"
          values="M 50 58 C 50 58 50 58 50 58;M 50 58 C 36 52 28 40 34 30 C 38 24 48 30 50 44;M 50 58 C 36 52 28 40 34 30 C 38 24 48 30 50 44"
          dur="3s" repeatCount="indefinite" />
        <animate attributeName="fill" values="rgba(34,197,94,0);rgba(34,197,94,0.35);rgba(34,197,94,0.35)" dur="3s" repeatCount="indefinite" />
        <animate attributeName="stroke" values="#22C55E;#22C55E;#22C55E" dur="3s" repeatCount="indefinite" />
      </path>
      <path d="M 50 58 C 36 52 28 40 34 30 C 38 24 48 30 50 44"
            fill="rgba(34,197,94,0.35)" stroke="#22C55E" strokeWidth="1.5" strokeLinejoin="round">
        <animate attributeName="opacity" values="0;0;1" dur="3s" repeatCount="indefinite" />
      </path>

      {/* Right leaf */}
      <path d="M 50 52 C 64 46 72 34 66 24 C 62 18 52 24 50 38"
            fill="rgba(74,222,128,0.35)" stroke="#4ADE80" strokeWidth="1.5" strokeLinejoin="round">
        <animate attributeName="opacity" values="0;0;1" dur="3s" begin="0.5s" repeatCount="indefinite" />
      </path>

      {/* Top bud */}
      <ellipse cx="50" cy="44" rx="3.5" ry="5" fill="#86EFAC">
        <animate attributeName="ry" values="0;5;5" dur="3s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

export function SunIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer halo */}
      <circle cx="0" cy="0" r="38" fill="rgba(251,191,36,0.08)">
        <animate attributeName="r" values="34;42;34" dur="3.5s" repeatCount="indefinite" />
      </circle>

      {/* Rotating rays */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
          <line key={a}
            x1={i % 3 === 0 ? 18 : 16} y1="0"
            x2={i % 3 === 0 ? 28 : 24} y2="0"
            stroke="#FCD34D"
            strokeWidth={i % 3 === 0 ? 2 : 1.2}
            strokeLinecap="round"
            transform={`rotate(${a})`}
            opacity="0.85"
          >
            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" begin={`${i * 0.12}s`} repeatCount="indefinite" />
          </line>
        ))}
      </g>

      {/* Sun disk */}
      <circle cx="0" cy="0" r="14" fill="#FBBF24">
        <animate attributeName="r" values="13;15;13" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="-4" cy="-4" r="5" fill="#FEF3C7" opacity="0.5" />
    </svg>
  );
}

export function AppleIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="appleSkin" cx="0.35" cy="0.3">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="60%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
      </defs>

      {/* Glow */}
      <ellipse cx="50" cy="80" rx="22" ry="5" fill="rgba(239,68,68,0.2)" />

      {/* Leaf + stem */}
      <path d="M 50 20 Q 50 12 58 10 Q 58 18 50 20 Z" fill="#22C55E" stroke="#15803D" strokeWidth="0.8">
        <animateTransform attributeName="transform" type="rotate" values="-5 50 15; 5 50 15; -5 50 15" dur="3s" repeatCount="indefinite" />
      </path>
      <line x1="50" y1="22" x2="50" y2="28" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

      {/* Apple body */}
      <path
        d="M 50 28 C 28 28 18 42 18 56 C 18 72 30 82 42 82 C 46 82 48 80 50 80 C 52 80 54 82 58 82 C 70 82 82 72 82 56 C 82 42 72 28 50 28 Z"
        fill="url(#appleSkin)"
        stroke="#991B1B"
        strokeWidth="0.8"
      />

      {/* Specular shine */}
      <ellipse cx="36" cy="44" rx="7" ry="10" fill="rgba(255,255,255,0.25)" transform="rotate(-20 36 44)" />
      <ellipse cx="32" cy="40" rx="2.5" ry="4" fill="rgba(255,255,255,0.45)" transform="rotate(-20 32 40)" />

      {/* Bite reflection pulse */}
      <ellipse cx="36" cy="44" rx="7" ry="10" fill="rgba(255,255,255,0.10)" transform="rotate(-20 36 44)">
        <animate attributeName="rx" values="6;9;6" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
      </ellipse>
    </svg>
  );
}

export function GardenIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Ground */}
      <path d="M 10 72 Q 50 68 90 72 L 90 90 Q 50 88 10 90 Z" fill="rgba(92,64,40,0.6)" stroke="rgba(120,83,52,0.5)" strokeWidth="0.6" />

      {/* Bed rows */}
      <line x1="14" y1="76" x2="86" y2="76" stroke="rgba(165,120,85,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="14" y1="82" x2="86" y2="82" stroke="rgba(165,120,85,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Left tall plant */}
      <line x1="26" y1="72" x2="26" y2="44" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M 26 56 C 14 50 10 38 16 32 C 20 28 26 36 26 50" fill="rgba(34,197,94,0.4)" stroke="#22C55E" strokeWidth="1.2" />
      <path d="M 26 52 C 38 46 42 34 36 28 C 32 24 26 32 26 46" fill="rgba(74,222,128,0.4)" stroke="#4ADE80" strokeWidth="1.2" />
      <ellipse cx="26" cy="42" rx="4" ry="3" fill="#F472B6" stroke="#DB2777" strokeWidth="0.8">
        <animate attributeName="ry" values="2;3.5;2" dur="2.4s" repeatCount="indefinite" />
      </ellipse>

      {/* Centre small plant */}
      <line x1="50" y1="72" x2="50" y2="54" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 64 C 42 58 40 50 44 46 C 46 44 50 48 50 56" fill="rgba(34,197,94,0.4)" stroke="#22C55E" strokeWidth="1.2" />
      <path d="M 50 62 C 58 56 60 48 56 44 C 54 42 50 46 50 54" fill="rgba(74,222,128,0.4)" stroke="#4ADE80" strokeWidth="1.2" />

      {/* Right bushy plant */}
      <line x1="74" y1="72" x2="74" y2="50" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="74" cy="48" rx="12" ry="9" fill="rgba(22,163,74,0.35)" stroke="#22C55E" strokeWidth="1.2" />
      <ellipse cx="68" cy="45" rx="7" ry="6" fill="rgba(74,222,128,0.3)" stroke="#4ADE80" strokeWidth="0.8" />
      <ellipse cx="80" cy="46" rx="7" ry="6" fill="rgba(74,222,128,0.3)" stroke="#4ADE80" strokeWidth="0.8" />
      <ellipse cx="74" cy="42" rx="6" ry="5" fill="rgba(134,239,172,0.35)" stroke="#86EFAC" strokeWidth="0.8" />

      {/* Watering can */}
      <g transform="translate(86 60)">
        <animateTransform attributeName="transform" type="rotate" values="-10 86 60; -25 86 60; -10 86 60" dur="4s" repeatCount="indefinite" />
        <rect x="-8" y="-4" width="16" height="9" rx="2" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="0.8" />
        <path d="M 8 -1 L 14 -6" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -8 2 L -14 0 L -14 5" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Water drops */}
        <circle cx="14" cy="-6" r="0.8" fill="#93C5FD">
          <animate attributeName="cy" values="-6;0" dur="0.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0" dur="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="16" cy="-4" r="0.6" fill="#93C5FD">
          <animate attributeName="cy" values="-4;2" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0" dur="0.8s" begin="0.3s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}
