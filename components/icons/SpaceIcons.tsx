// Animated SVG icons for the /space page.
// Uses SMIL — no JS runtime.

type IconProps = { size?: number };

export function MapIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Paper fold shadows */}
      <path d="M 15 22 L 38 16 L 62 24 L 85 18 L 85 82 L 62 88 L 38 80 L 15 86 Z"
            fill="rgba(96,165,250,0.12)" stroke="#60A5FA" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="38" y1="16" x2="38" y2="80" stroke="rgba(96,165,250,0.35)" strokeWidth="0.8" strokeDasharray="2 2" />
      <line x1="62" y1="24" x2="62" y2="88" stroke="rgba(96,165,250,0.35)" strokeWidth="0.8" strokeDasharray="2 2" />

      {/* Dashed route */}
      <path d="M 24 70 Q 40 40 54 52 T 78 34"
            fill="none" stroke="#F472B6" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" values="0;-12" dur="1.6s" repeatCount="indefinite" />
      </path>

      {/* Start pin */}
      <circle cx="24" cy="70" r="2.5" fill="#F472B6" />
      {/* Moving explorer dot */}
      <circle r="3" fill="#FBBF24">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 24 70 Q 40 40 54 52 T 78 34" />
        <animate attributeName="r" values="2.5;3.5;2.5" dur="0.8s" repeatCount="indefinite" />
      </circle>

      {/* Compass rose (top-right) */}
      <g transform="translate(78 22)">
        <circle r="8" fill="rgba(15,23,42,0.7)" stroke="#93C5FD" strokeWidth="0.8" />
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
          <path d="M 0 -6 L 2 0 L 0 6 L -2 0 Z" fill="#F472B6" />
          <path d="M -6 0 L 0 -1.5 L 6 0 L 0 1.5 Z" fill="#93C5FD" />
        </g>
        <circle r="1" fill="#F5F3FF" />
      </g>

      {/* Scattered location markers */}
      <circle cx="46" cy="32" r="1.4" fill="#60A5FA" />
      <circle cx="30" cy="50" r="1.2" fill="#60A5FA" />
      <circle cx="70" cy="60" r="1.4" fill="#60A5FA" />
    </svg>
  );
}

export function EarthIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="earthOcean" cx="0.35" cy="0.35">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
        <clipPath id="earthDisk">
          <circle cx="0" cy="0" r="32" />
        </clipPath>
      </defs>

      {/* Outer glow */}
      <circle cx="0" cy="0" r="40" fill="rgba(96,165,250,0.12)" />

      {/* Ocean disk */}
      <circle cx="0" cy="0" r="32" fill="url(#earthOcean)" />

      {/* Continents (scrolling strip) */}
      <g clipPath="url(#earthDisk)">
        <g>
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-64 0" dur="14s" repeatCount="indefinite" />
          {/* Continent group 1 */}
          <path d="M -28 -14 Q -22 -20 -14 -16 Q -10 -8 -16 -2 Q -22 -4 -28 -14 Z" fill="#34D399" />
          <path d="M -20 6 Q -14 2 -8 8 Q -6 16 -14 18 Q -20 14 -20 6 Z" fill="#10B981" />
          <path d="M 4 -10 Q 12 -14 18 -8 Q 14 -2 8 0 Q 2 -4 4 -10 Z" fill="#34D399" />
          <path d="M 14 8 Q 22 6 26 14 Q 22 20 14 18 Q 10 14 14 8 Z" fill="#10B981" />
          {/* Continent group 2 (duplicate shifted) */}
          <path d="M 36 -14 Q 42 -20 50 -16 Q 54 -8 48 -2 Q 42 -4 36 -14 Z" fill="#34D399" />
          <path d="M 44 6 Q 50 2 56 8 Q 58 16 50 18 Q 44 14 44 6 Z" fill="#10B981" />
          <path d="M 68 -10 Q 76 -14 82 -8 Q 78 -2 72 0 Q 66 -4 68 -10 Z" fill="#34D399" />
          <path d="M 78 8 Q 86 6 90 14 Q 86 20 78 18 Q 74 14 78 8 Z" fill="#10B981" />
        </g>

        {/* Drifting clouds */}
        <g opacity="0.55">
          <animateTransform attributeName="transform" type="translate" from="0 0" to="-64 0" dur="20s" repeatCount="indefinite" />
          <ellipse cx="-16" cy="-20" rx="10" ry="2.2" fill="#F8FAFC" />
          <ellipse cx="10" cy="-6" rx="8" ry="2" fill="#F8FAFC" />
          <ellipse cx="-6" cy="16" rx="9" ry="2" fill="#F8FAFC" />
          <ellipse cx="48" cy="-20" rx="10" ry="2.2" fill="#F8FAFC" />
          <ellipse cx="74" cy="-6" rx="8" ry="2" fill="#F8FAFC" />
          <ellipse cx="58" cy="16" rx="9" ry="2" fill="#F8FAFC" />
        </g>
      </g>

      {/* Specular highlight */}
      <ellipse cx="-10" cy="-12" rx="10" ry="6" fill="rgba(255,255,255,0.18)" />

      {/* Terminator / rim shadow */}
      <circle cx="0" cy="0" r="32" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2" />
    </svg>
  );
}

export function RocketIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="rocketBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D1D5DB" />
          <stop offset="50%" stopColor="#F9FAFB" />
          <stop offset="100%" stopColor="#9CA3AF" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="40%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* Stars */}
      <circle cx="18" cy="20" r="0.9" fill="#F5F3FF">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="82" cy="28" r="0.7" fill="#DDD6FE">
        <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="78" cy="62" r="0.8" fill="#F5F3FF">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="14" cy="54" r="0.7" fill="#DDD6FE">
        <animate attributeName="opacity" values="1;0.2;1" dur="2.2s" repeatCount="indefinite" />
      </circle>

      {/* Rocket (bobbing) */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="1.4s" repeatCount="indefinite" />

        {/* Nose cone */}
        <path d="M 50 14 L 42 32 L 58 32 Z" fill="#EF4444" />

        {/* Body */}
        <rect x="42" y="32" width="16" height="34" rx="2" fill="url(#rocketBody)" stroke="#6B7280" strokeWidth="0.8" />

        {/* Window */}
        <circle cx="50" cy="42" r="3.5" fill="#1E3A8A" stroke="#9CA3AF" strokeWidth="0.8" />
        <circle cx="49" cy="41" r="1.2" fill="rgba(147,197,253,0.8)" />

        {/* Stripe */}
        <rect x="42" y="52" width="16" height="2" fill="#EF4444" />

        {/* Fins */}
        <path d="M 42 58 L 34 70 L 42 68 Z" fill="#EF4444" />
        <path d="M 58 58 L 66 70 L 58 68 Z" fill="#EF4444" />

        {/* Engine bell */}
        <rect x="44" y="66" width="12" height="4" rx="1" fill="#4B5563" />

        {/* Flame */}
        <path d="M 44 70 L 46 74 L 48 70 L 50 76 L 52 70 L 54 74 L 56 70 Q 56 82 50 86 Q 44 82 44 70 Z"
              fill="url(#flameGrad)">
          <animate attributeName="d"
            values="M 44 70 L 46 74 L 48 70 L 50 76 L 52 70 L 54 74 L 56 70 Q 56 82 50 86 Q 44 82 44 70 Z;
                    M 44 70 L 46 72 L 48 70 L 50 78 L 52 70 L 54 72 L 56 70 Q 56 84 50 88 Q 44 84 44 70 Z;
                    M 44 70 L 46 74 L 48 70 L 50 76 L 52 70 L 54 74 L 56 70 Q 56 82 50 86 Q 44 82 44 70 Z"
            dur="0.3s" repeatCount="indefinite" />
        </path>
        <path d="M 46 70 L 48 74 L 50 70 L 52 74 L 54 70 Q 54 80 50 82 Q 46 80 46 70 Z"
              fill="#FEF3C7" opacity="0.85">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="0.3s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Exhaust particles */}
      <circle cx="46" cy="88" r="1.2" fill="#FBBF24">
        <animate attributeName="cy" values="86;96" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="54" cy="88" r="1" fill="#F97316">
        <animate attributeName="cy" values="86;96" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="1.2s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="88" r="0.9" fill="#EF4444">
        <animate attributeName="cy" values="86;96" dur="0.9s" begin="0.15s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="0.9s" begin="0.15s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function StarIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer pulsing halo */}
      <circle cx="0" cy="0" r="30" fill="rgba(251,191,36,0.10)">
        <animate attributeName="r" values="26;34;26" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="0" cy="0" r="18" fill="rgba(252,211,77,0.18)">
        <animate attributeName="r" values="16;22;16" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Diffraction spikes (long + subtle) */}
      <g opacity="0.7">
        <line x1="0" y1="-44" x2="0" y2="44" stroke="#FEF3C7" strokeWidth="0.8" strokeLinecap="round">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.4s" repeatCount="indefinite" />
        </line>
        <line x1="-44" y1="0" x2="44" y2="0" stroke="#FEF3C7" strokeWidth="0.8" strokeLinecap="round">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2.4s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Five-point star (rotating slowly) */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite" />
        <polygon
          points="0,-18 4.3,-5.6 17.1,-5.6 6.9,2.1 10.8,14.5 0,7 -10.8,14.5 -6.9,2.1 -17.1,-5.6 -4.3,-5.6"
          fill="#FBBF24"
          stroke="#F59E0B"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>

      {/* Twinkle center */}
      <circle cx="0" cy="0" r="3" fill="#FEF3C7">
        <animate attributeName="r" values="2;4;2" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* Small companion sparkles */}
      <circle cx="26" cy="-22" r="0.9" fill="#FEF3C7">
        <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="-28" cy="20" r="0.8" fill="#FDE68A">
        <animate attributeName="opacity" values="1;0;1" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="-22" cy="-26" r="0.6" fill="#FEF3C7">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
