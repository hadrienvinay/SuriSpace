// Animated SVG icons for the /atoms page.
// Uses SMIL — no JS runtime.

type IconProps = { size?: number };

export function FlaskIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="flaskLiquid">
          <path d="M 42 32 L 42 46 L 26 82 Q 26 90 36 90 L 64 90 Q 74 90 74 82 L 58 46 L 58 32 Z" />
        </clipPath>
      </defs>

      {/* Neck rim */}
      <rect x="38" y="14" width="24" height="4" rx="1" fill="#60A5FA" />
      <rect x="42" y="18" width="16" height="2" fill="#93C5FD" />

      {/* Flask outline */}
      <path
        d="M 42 20 L 42 46 L 26 82 Q 26 90 36 90 L 64 90 Q 74 90 74 82 L 58 46 L 58 20"
        fill="rgba(96,165,250,0.10)"
        stroke="#60A5FA"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Liquid (clipped) */}
      <g clipPath="url(#flaskLiquid)">
        <rect x="20" y="58" width="60" height="40" fill="rgba(59,130,246,0.5)" />
        <path d="M 20 58 Q 35 54 50 58 T 80 58 L 80 70 L 20 70 Z" fill="rgba(96,165,250,0.35)">
          <animate attributeName="d"
            values="M 20 58 Q 35 54 50 58 T 80 58 L 80 70 L 20 70 Z;
                    M 20 58 Q 35 62 50 58 T 80 58 L 80 70 L 20 70 Z;
                    M 20 58 Q 35 54 50 58 T 80 58 L 80 70 L 20 70 Z"
            dur="3s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Bubbles */}
      <circle cx="40" cy="82" r="2" fill="rgba(219,234,254,0.9)">
        <animate attributeName="cy" values="85;58" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="55" cy="82" r="1.4" fill="rgba(219,234,254,0.9)">
        <animate attributeName="cy" values="85;58" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="48" cy="82" r="1.7" fill="rgba(219,234,254,0.9)">
        <animate attributeName="cy" values="85;58" dur="3.4s" begin="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="3.4s" begin="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="62" cy="82" r="1.2" fill="rgba(219,234,254,0.9)">
        <animate attributeName="cy" values="85;58" dur="2.7s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;0" dur="2.7s" begin="0.3s" repeatCount="indefinite" />
      </circle>

      {/* Glass highlight */}
      <path d="M 46 50 L 38 78" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function RadiationIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <circle cx="0" cy="0" r="42" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="1" strokeDasharray="3 3" />

      {/* Pulsing glow */}
      <circle cx="0" cy="0" r="15" fill="rgba(251,191,36,0.15)">
        <animate attributeName="r" values="12;20;12" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Trefoil rotates slowly */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="14s" repeatCount="indefinite" />
        {[0, 120, 240].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            {/* Sector blade: a circular arc filled with color */}
            <path
              d="M 0 -10
                 L 18 -32
                 A 38 38 0 0 1 -18 -32
                 Z"
              fill="#FBBF24"
            />
          </g>
        ))}
      </g>

      {/* Central dot */}
      <circle cx="0" cy="0" r="7" fill="#F59E0B" stroke="#78350F" strokeWidth="1" />
      <circle cx="0" cy="0" r="3" fill="#FDE68A" />
    </svg>
  );
}

export function ExplosionIcon({ size = 72 }: IconProps) {
  const rays = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer shockwave */}
      <circle cx="0" cy="0" r="10" fill="none" stroke="#F87171" strokeWidth="1.5">
        <animate attributeName="r" values="6;40;6" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="0" cy="0" r="5" fill="none" stroke="#FCA5A5" strokeWidth="1.2">
        <animate attributeName="r" values="3;32;3" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
      </circle>

      {/* Radiating rays */}
      {rays.map((a, i) => (
        <g key={a} transform={`rotate(${a})`}>
          <line x1="0" y1="0" x2="0" y2="-28" stroke="#F97316" strokeWidth="2" strokeLinecap="round">
            <animate attributeName="y2" values="-10;-38;-10" dur="2s" begin={`${i * 0.08}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;1;0" dur="2s" begin={`${i * 0.08}s`} repeatCount="indefinite" />
          </line>
        </g>
      ))}

      {/* Core burst */}
      <circle cx="0" cy="0" r="8" fill="#FBBF24">
        <animate attributeName="r" values="6;10;6" dur="0.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="0" cy="0" r="4" fill="#FEF3C7">
        <animate attributeName="r" values="3;5;3" dur="0.6s" repeatCount="indefinite" />
      </circle>

      {/* Ejected particles */}
      <circle cx="0" cy="0" r="1.5" fill="#FDE68A">
        <animate attributeName="cx" values="0;25" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="cy" values="0;-18" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="0" cy="0" r="1.2" fill="#FDE68A">
        <animate attributeName="cx" values="0;-20" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="cy" values="0;-22" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="1.8s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="0" cy="0" r="1.5" fill="#FDE68A">
        <animate attributeName="cx" values="0;18" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="cy" values="0;20" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function BarChartIcon({ size = 72 }: IconProps) {
  const bars = [
    { x: 20, color: '#10B981', minH: 20, maxH: 46, dur: 2.4 },
    { x: 34, color: '#34D399', minH: 35, maxH: 62, dur: 2.0 },
    { x: 48, color: '#6EE7B7', minH: 28, maxH: 52, dur: 2.8 },
    { x: 62, color: '#34D399', minH: 42, maxH: 68, dur: 1.8 },
    { x: 76, color: '#10B981', minH: 18, maxH: 40, dur: 2.6 },
  ];
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Axes */}
      <line x1="14" y1="14" x2="14" y2="86" stroke="rgba(52,211,153,0.4)" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="14" y1="86" x2="90" y2="86" stroke="rgba(52,211,153,0.4)" strokeWidth="1.4" strokeLinecap="round" />

      {/* Grid */}
      {[30, 50, 70].map((y) => (
        <line key={y} x1="14" y1={y} x2="90" y2={y} stroke="rgba(52,211,153,0.1)" strokeWidth="0.5" strokeDasharray="2 3" />
      ))}

      {/* Bars */}
      {bars.map((b, i) => (
        <rect key={i} x={b.x} width="8" rx="1" fill={b.color}>
          <animate attributeName="y"
            values={`${86 - b.minH};${86 - b.maxH};${86 - b.minH}`}
            dur={`${b.dur}s`} repeatCount="indefinite" />
          <animate attributeName="height"
            values={`${b.minH};${b.maxH};${b.minH}`}
            dur={`${b.dur}s`} repeatCount="indefinite" />
        </rect>
      ))}

      {/* Trend line */}
      <polyline
        points="24,60 38,42 52,50 66,32 80,54"
        fill="none"
        stroke="#6EE7B7"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function GalaxyIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="galaxyCore" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="40%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="rgba(251,191,36,0)" />
        </radialGradient>
      </defs>

      {/* Slow-rotating full disk */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="30s" repeatCount="indefinite" />

        {/* Dust disk */}
        <ellipse cx="0" cy="0" rx="42" ry="10" fill="rgba(167,139,250,0.08)" />
        <ellipse cx="0" cy="0" rx="35" ry="8" fill="rgba(167,139,250,0.12)" />

        {/* Spiral arms — two logarithmic curves */}
        <path
          d="M 0 0 C 14 -6 28 -8 38 -2 C 28 4 14 6 0 0"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 0 0 C -14 6 -28 8 -38 2 C -28 -4 -14 -6 0 0"
          fill="none"
          stroke="#A78BFA"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M 0 0 C 10 -9 22 -10 32 -6"
          fill="none"
          stroke="#C4B5FD"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 0 0 C -10 9 -22 10 -32 6"
          fill="none"
          stroke="#C4B5FD"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Star sprinkle along arms */}
        <circle cx="24" cy="-5" r="1" fill="#F5F3FF" />
        <circle cx="32" cy="-2" r="0.8" fill="#F5F3FF" />
        <circle cx="-28" cy="3" r="1" fill="#F5F3FF" />
        <circle cx="-18" cy="6" r="0.8" fill="#F5F3FF" />
        <circle cx="14" cy="-7" r="0.7" fill="#DDD6FE" />
        <circle cx="-12" cy="7" r="0.7" fill="#DDD6FE" />
      </g>

      {/* Bright core (not rotating, pulsing) */}
      <circle cx="0" cy="0" r="16" fill="url(#galaxyCore)" />
      <circle cx="0" cy="0" r="4" fill="#FEF3C7">
        <animate attributeName="r" values="3.5;5;3.5" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function ColliderIcon({ size = 72 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="colliderGlow" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="rgba(252,211,77,0)" />
        </radialGradient>
      </defs>

      {/* Outer glow */}
      <circle cx="50" cy="50" r="46" fill="rgba(96,165,250,0.06)" />

      {/* Accelerator ring (dashed, like a tunnel seen from above) */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="#60A5FA" strokeWidth="2.2" strokeDasharray="6 4" opacity="0.55">
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="18s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="34" fill="none" stroke="#93C5FD" strokeWidth="1" opacity="0.25" />

      {/* Detector ring (inner, thicker) */}
      <circle cx="50" cy="50" r="20" fill="none" stroke="#A78BFA" strokeWidth="1.4" opacity="0.4" />

      {/* Two counter-rotating particle beams */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite" />
        <circle cx="84" cy="50" r="3" fill="#60A5FA" />
      </g>
      <g>
        <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="3.6s" repeatCount="indefinite" />
        <circle cx="16" cy="50" r="3" fill="#F472B6" />
      </g>

      {/* Collision point flash */}
      <circle cx="50" cy="50" r="10" fill="url(#colliderGlow)">
        <animate attributeName="r" values="6;13;6" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.4;0.95;0.4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="50" r="3" fill="#FEF3C7" />

      {/* Collision sparks */}
      {[0, 60, 120, 180, 240, 300].map((a) => {
        const r1 = Math.PI * a / 180;
        const x1 = 50 + 6 * Math.cos(r1), y1 = 50 + 6 * Math.sin(r1);
        const x2 = 50 + 13 * Math.cos(r1), y2 = 50 + 13 * Math.sin(r1);
        return (
          <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FDE68A" strokeWidth="1.4" strokeLinecap="round" opacity="0.8">
            <animate attributeName="opacity" values="0;0.9;0" dur="1.8s" repeatCount="indefinite" />
          </line>
        );
      })}
    </svg>
  );
}
