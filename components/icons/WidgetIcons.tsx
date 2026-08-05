// Small inline animated icons for the home page widget headers.
// Uses SMIL — no JS runtime.

type IconProps = { size?: number };

export function SunriseIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 100 60" width={size * (100 / 60)} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Soft sky glow */}
      <ellipse cx="50" cy="50" rx="36" ry="18" fill="rgba(252,211,77,0.15)">
        <animate attributeName="rx" values="32;40;32" dur="3s" repeatCount="indefinite" />
      </ellipse>

      {/* Rising sun */}
      <g>
        <circle cx="50" cy="50" r="12" fill="#FBBF24">
          <animate attributeName="cy" values="54;44;54" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="50" r="7" fill="#FEF3C7">
          <animate attributeName="cy" values="54;44;54" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Sun rays */}
      {[
        { x1: 50, y1: 20, x2: 50, y2: 10 },
        { x1: 30, y1: 30, x2: 24, y2: 24 },
        { x1: 70, y1: 30, x2: 76, y2: 24 },
        { x1: 20, y1: 50, x2: 10, y2: 50 },
        { x1: 80, y1: 50, x2: 90, y2: 50 },
      ].map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="#FCD34D"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.7"
        >
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Horizon */}
      <line x1="5" y1="50" x2="95" y2="50" stroke="#F472B6" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function MetroIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="0 0 100 60" width={size * (100 / 60)} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Tunnel arch */}
      <path d="M 8 52 Q 8 16 50 16 Q 92 16 92 52" fill="none" stroke="rgba(96,165,250,0.25)" strokeWidth="1.2" />

      {/* Rails */}
      <line x1="4" y1="52" x2="96" y2="52" stroke="#6B7280" strokeWidth="0.8" />
      <line x1="4" y1="55" x2="96" y2="55" stroke="#6B7280" strokeWidth="0.8" />

      {/* Moving train */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="-50 0; 120 0"
          dur="3.2s"
          repeatCount="indefinite"
        />

        {/* Headlight glow */}
        <ellipse cx="38" cy="42" rx="8" ry="4" fill="rgba(252,211,77,0.35)" />

        {/* Train body */}
        <rect x="-2" y="28" width="40" height="20" rx="4" fill="#60A5FA" stroke="#1E3A8A" strokeWidth="0.8" />
        {/* Nose slope */}
        <path d="M 34 28 L 42 34 L 42 46 L 38 48 L 34 48 Z" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="0.8" />

        {/* Windows */}
        <rect x="2" y="32" width="6" height="6" rx="1" fill="#DBEAFE" />
        <rect x="11" y="32" width="6" height="6" rx="1" fill="#DBEAFE" />
        <rect x="20" y="32" width="6" height="6" rx="1" fill="#DBEAFE" />
        <rect x="29" y="32" width="4" height="6" rx="1" fill="#DBEAFE" />

        {/* Door line */}
        <rect x="17" y="38" width="2" height="10" fill="#1E3A8A" />

        {/* Wheels */}
        <circle cx="6" cy="50" r="2.5" fill="#1F2937" stroke="#4B5563" strokeWidth="0.6" />
        <circle cx="30" cy="50" r="2.5" fill="#1F2937" stroke="#4B5563" strokeWidth="0.6" />

        {/* Headlight */}
        <circle cx="40" cy="42" r="1.6" fill="#FEF3C7" />
      </g>

      {/* Station pillars */}
      <rect x="2" y="14" width="2" height="38" fill="rgba(96,165,250,0.25)" />
      <rect x="96" y="14" width="2" height="38" fill="rgba(96,165,250,0.25)" />
    </svg>
  );
}

export function SparkIcon({ size = 24 }: IconProps) {
  return (
    <svg viewBox="-30 -30 60 60" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow */}
      <circle cx="0" cy="0" r="20" fill="rgba(167,139,250,0.12)">
        <animate attributeName="r" values="16;22;16" dur="1.8s" repeatCount="indefinite" />
      </circle>

      {/* Lightning bolt */}
      <path d="M 2 -22 L -8 2 L -2 2 L -6 22 L 10 -4 L 2 -4 L 8 -22 Z"
            fill="#FBBF24"
            stroke="#F59E0B"
            strokeWidth="0.8"
            strokeLinejoin="round">
        <animate attributeName="fill" values="#FBBF24;#FEF3C7;#FBBF24" dur="0.6s" repeatCount="indefinite" />
      </path>

      {/* Electric sparks */}
      <circle cx="-18" cy="-12" r="1" fill="#FEF3C7">
        <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="6" r="0.8" fill="#FEF3C7">
        <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite" />
      </circle>
      <circle cx="-14" cy="16" r="0.7" fill="#FDE68A">
        <animate attributeName="opacity" values="0;1;0" dur="0.9s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="16" cy="-16" r="0.6" fill="#FDE68A">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" begin="0.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
