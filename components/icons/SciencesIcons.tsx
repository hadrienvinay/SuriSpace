// Animated SVG icons for the /sciences page.
// Uses SMIL — no JS runtime.

type IconProps = { size?: number };

export function ClockIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow */}
      <circle cx="50" cy="50" r="42" fill="rgba(165,180,252,0.08)" />

      {/* Dial */}
      <circle cx="50" cy="50" r="36" fill="rgba(99,102,241,0.06)" stroke="#A5B4FC" strokeWidth="2.5" />

      {/* Hour markers */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <line
          key={i}
          x1="50"
          y1="18"
          x2="50"
          y2={i % 3 === 0 ? 24 : 21}
          stroke="#A5B4FC"
          strokeWidth={i % 3 === 0 ? 2 : 1.2}
          strokeLinecap="round"
          transform={`rotate(${i * 30} 50 50)`}
        />
      ))}

      {/* Hour hand */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="60s" repeatCount="indefinite" />
        <line x1="50" y1="50" x2="50" y2="32" stroke="#818CF8" strokeWidth="2.8" strokeLinecap="round" />
      </g>

      {/* Minute hand */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="12s" repeatCount="indefinite" />
        <line x1="50" y1="50" x2="50" y2="22" stroke="#C7D2FE" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Second hand */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite" />
        <line x1="50" y1="52" x2="50" y2="18" stroke="#F472B6" strokeWidth="1" strokeLinecap="round" />
        <circle cx="50" cy="20" r="1.6" fill="#F472B6" />
      </g>

      {/* Center cap */}
      <circle cx="50" cy="50" r="2.4" fill="#818CF8" />
      <circle cx="50" cy="50" r="1" fill="#1E1B4B" />
    </svg>
  );
}

export function LightbulbIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Soft outer glow */}
      <circle cx="50" cy="42" r="28" fill="rgba(250,204,21,0.12)">
        <animate attributeName="r" values="24;30;24" dur="2.6s" repeatCount="indefinite" />
      </circle>

      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <g key={a} transform={`rotate(${a} 50 42)`}>
          <line x1="50" y1="10" x2="50" y2="5" stroke="#FCD34D" strokeWidth="1.6" strokeLinecap="round">
            <animate attributeName="opacity" values="0.25;1;0.25" dur="2.2s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
          </line>
        </g>
      ))}

      {/* Bulb glass */}
      <path
        d="M 34 44 Q 34 24 50 24 Q 66 24 66 44 Q 66 55 59 62 L 59 66 L 41 66 L 41 62 Q 34 55 34 44 Z"
        fill="rgba(252,211,77,0.22)"
        stroke="#FDE68A"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Filament */}
      <path d="M 44 48 Q 47 42 50 48 Q 53 54 56 48" fill="none" stroke="#FCD34D" strokeWidth="1.8" strokeLinecap="round">
        <animate attributeName="stroke" values="#FCD34D;#FEF3C7;#FCD34D" dur="1.4s" repeatCount="indefinite" />
      </path>
      <line x1="44" y1="48" x2="42" y2="58" stroke="#FCD34D" strokeWidth="1" />
      <line x1="56" y1="48" x2="58" y2="58" stroke="#FCD34D" strokeWidth="1" />

      {/* Screw base */}
      <rect x="41" y="66" width="18" height="3" fill="#D1D5DB" />
      <rect x="42" y="69" width="16" height="1.5" fill="#9CA3AF" />
      <rect x="42" y="71" width="16" height="1.5" fill="#9CA3AF" />
      <rect x="42" y="73" width="16" height="1.5" fill="#9CA3AF" />
      <path d="M 44 76 L 56 76 L 54 80 L 46 80 Z" fill="#6B7280" />
    </svg>
  );
}

export function SigmaIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Central glow */}
      <circle cx="0" cy="0" r="12" fill="rgba(103,232,249,0.12)">
        <animate attributeName="r" values="10;14;10" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Sigma symbol */}
      <text
        x="0"
        y="12"
        fontSize="52"
        fontWeight="bold"
        fill="#67E8F9"
        textAnchor="middle"
        fontFamily="'Times New Roman', serif"
      >
        ∑
      </text>

      {/* Orbiting variables */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="9s" repeatCount="indefinite" />
        <text x="34" y="4" fontSize="10" fill="#A5F3FC" fontStyle="italic" fontFamily="'Times New Roman', serif">x</text>
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="140 0 0" to="500 0 0" dur="13s" repeatCount="indefinite" />
        <text x="38" y="4" fontSize="9" fill="#22D3EE" fontStyle="italic" fontFamily="'Times New Roman', serif">n</text>
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="260 0 0" to="620 0 0" dur="7s" repeatCount="indefinite" />
        <text x="36" y="4" fontSize="10" fill="#67E8F9" fontStyle="italic" fontFamily="'Times New Roman', serif">π</text>
      </g>

      {/* Orbit ring */}
      <circle cx="0" cy="0" r="38" fill="none" stroke="rgba(103,232,249,0.15)" strokeWidth="0.6" strokeDasharray="2 3" />
    </svg>
  );
}

export function MicroscopeIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="microBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <radialGradient id="microLens" cx="0.35" cy="0.35">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#4C1D95" />
        </radialGradient>
      </defs>

      {/* Base */}
      <path d="M 22 84 L 78 84 L 74 92 L 26 92 Z" fill="#6D28D9" />
      <rect x="20" y="82" width="60" height="3" rx="1" fill="#5B21B6" />

      {/* Stage */}
      <rect x="34" y="70" width="32" height="5" rx="1" fill="#A78BFA" />
      <rect x="36" y="75" width="28" height="2" fill="#6D28D9" />
      {/* Specimen slide */}
      <rect x="44" y="70" width="12" height="1.5" fill="#F5F3FF" />

      {/* Arm (curved) */}
      <path d="M 50 30 Q 68 34 68 56 L 68 70 L 64 70 L 64 58 Q 64 42 50 38 Z"
            fill="url(#microBody)" stroke="#4C1D95" strokeWidth="0.6" />

      {/* Eyepiece tube */}
      <rect x="44" y="22" width="14" height="16" rx="2" fill="url(#microBody)" stroke="#4C1D95" strokeWidth="0.6" />
      <rect x="46" y="18" width="10" height="5" rx="1" fill="#A78BFA" />
      <rect x="47" y="14" width="8" height="5" rx="1" fill="#6D28D9" />

      {/* Objective turret */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 54 48; 0 54 48; -30 54 48; -30 54 48" dur="5s" repeatCount="indefinite" />
        <circle cx="54" cy="48" r="7" fill="#4C1D95" stroke="#A78BFA" strokeWidth="0.8" />
        <rect x="52" y="54" width="4" height="7" rx="0.8" fill="#5B21B6" />
        <rect x="46" y="51" width="4" height="7" rx="0.8" transform="rotate(-45 48 54)" fill="#6D28D9" />
        <rect x="58" y="51" width="4" height="7" rx="0.8" transform="rotate(45 60 54)" fill="#6D28D9" />
      </g>

      {/* Light beam to specimen */}
      <path d="M 54 62 L 52 68 L 56 68 Z" fill="rgba(252,211,77,0.5)">
        <animate attributeName="fill" values="rgba(252,211,77,0.3);rgba(252,211,77,0.7);rgba(252,211,77,0.3)" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Eyepiece lens glint */}
      <circle cx="51" cy="16.5" r="1.2" fill="#F5F3FF" opacity="0.7" />

      {/* Focus knobs */}
      <circle cx="72" cy="62" r="3" fill="#A78BFA" stroke="#4C1D95" strokeWidth="0.6" />
      <circle cx="72" cy="62" r="1" fill="#4C1D95" />
      <circle cx="72" cy="70" r="2" fill="#A78BFA" stroke="#4C1D95" strokeWidth="0.6" />

      {/* Specimen particles (moving) */}
      <circle cx="48" cy="72" r="0.8" fill="#FCD34D">
        <animate attributeName="cx" values="46;54;46" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="52" cy="72" r="0.6" fill="#F472B6">
        <animate attributeName="cx" values="54;46;54" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.4;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function ScientistIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Thought bubble glow */}
      <circle cx="72" cy="26" r="14" fill="rgba(168,85,247,0.10)">
        <animate attributeName="r" values="12;16;12" dur="2.8s" repeatCount="indefinite" />
      </circle>

      {/* Head */}
      <circle cx="42" cy="36" r="14" fill="#FDE68A" stroke="#B45309" strokeWidth="0.8" />

      {/* Hair (Einstein-style wild hair) */}
      <path d="M 28 32 Q 26 22 32 20 Q 34 16 40 18 Q 44 14 50 18 Q 56 16 58 22 Q 60 24 58 30"
            fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.6" />
      <path d="M 28 30 Q 24 34 26 38" fill="none" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
      <path d="M 56 30 Q 60 34 58 38" fill="none" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />

      {/* Glasses */}
      <circle cx="37" cy="36" r="3.5" fill="none" stroke="#1F2937" strokeWidth="1.2" />
      <circle cx="47" cy="36" r="3.5" fill="none" stroke="#1F2937" strokeWidth="1.2" />
      <line x1="40.5" y1="36" x2="43.5" y2="36" stroke="#1F2937" strokeWidth="1.2" />

      {/* Mustache */}
      <path d="M 37 44 Q 42 46 47 44 Q 46 48 42 48 Q 38 48 37 44 Z" fill="#9CA3AF" />

      {/* Lab coat collar / body */}
      <path d="M 28 50 L 42 58 L 56 50 L 62 88 L 22 88 Z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="0.8" />
      {/* Coat lapels */}
      <path d="M 42 58 L 38 72 L 42 68 L 46 72 Z" fill="#E5E7EB" />
      {/* Buttons */}
      <circle cx="42" cy="68" r="0.8" fill="#6B7280" />
      <circle cx="42" cy="76" r="0.8" fill="#6B7280" />
      <circle cx="42" cy="84" r="0.8" fill="#6B7280" />

      {/* Pocket with pen */}
      <rect x="48" y="68" width="8" height="10" fill="none" stroke="#9CA3AF" strokeWidth="0.6" />
      <rect x="51" y="66" width="1.5" height="6" fill="#3B82F6" />

      {/* Thought bubbles trail */}
      <circle cx="56" cy="44" r="1.5" fill="rgba(168,85,247,0.4)" />
      <circle cx="60" cy="38" r="2" fill="rgba(168,85,247,0.55)" />
      <circle cx="66" cy="32" r="2.8" fill="rgba(168,85,247,0.7)" />

      {/* Equation in thought bubble */}
      <circle cx="74" cy="24" r="10" fill="rgba(15,23,42,0.85)" stroke="#A78BFA" strokeWidth="0.8" />
      <text x="74" y="28" fontSize="9" fill="#A78BFA" textAnchor="middle" fontFamily="'Times New Roman', serif" fontStyle="italic">
        E=mc²
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </text>
    </svg>
  );
}

export function InfinityIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow */}
      <ellipse cx="50" cy="50" rx="36" ry="18" fill="rgba(52,211,153,0.10)">
        <animate attributeName="rx" values="34;38;34" dur="3s" repeatCount="indefinite" />
      </ellipse>

      {/* Infinity path */}
      <path
        id="infinityPath"
        d="M 26 50 C 26 34 42 34 50 50 C 58 66 74 66 74 50 C 74 34 58 34 50 50 C 42 66 26 66 26 50 Z"
        fill="none"
        stroke="#34D399"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Traveling dot */}
      <circle r="3.5" fill="#6EE7B7">
        <animateMotion dur="5s" repeatCount="indefinite">
          <mpath href="#infinityPath" />
        </animateMotion>
      </circle>

      {/* Trailing ghost */}
      <circle r="2.5" fill="#34D399" opacity="0.6">
        <animateMotion dur="5s" repeatCount="indefinite" begin="-0.2s">
          <mpath href="#infinityPath" />
        </animateMotion>
      </circle>
      <circle r="1.8" fill="#10B981" opacity="0.35">
        <animateMotion dur="5s" repeatCount="indefinite" begin="-0.4s">
          <mpath href="#infinityPath" />
        </animateMotion>
      </circle>
    </svg>
  );
}
