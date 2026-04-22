// Animated SVG icons for the /projects page.
// Uses SMIL — no JS runtime.

type IconProps = { size?: number };

export function CodeIcon({ size = 96 }: IconProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="codeWindow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(30,41,59,0.95)" />
          <stop offset="100%" stopColor="rgba(15,23,42,0.95)" />
        </linearGradient>
      </defs>

      {/* Outer glow */}
      <rect x="10" y="18" width="80" height="68" rx="6" fill="rgba(59,130,246,0.12)" />

      {/* Window */}
      <rect x="12" y="20" width="76" height="64" rx="5" fill="url(#codeWindow)" stroke="#60A5FA" strokeWidth="1" />

      {/* Title bar */}
      <rect x="12" y="20" width="76" height="10" rx="5" fill="rgba(59,130,246,0.18)" />
      <rect x="12" y="26" width="76" height="4" fill="rgba(59,130,246,0.18)" />
      <circle cx="18" cy="25" r="1.4" fill="#EF4444" />
      <circle cx="23" cy="25" r="1.4" fill="#FBBF24" />
      <circle cx="28" cy="25" r="1.4" fill="#10B981" />

      {/* Code line 1: prompt + "function" */}
      <text x="18" y="42" fontSize="6" fill="#64748B" fontFamily="'Courier New', monospace">1</text>
      <text x="26" y="42" fontSize="6" fill="#C084FC" fontFamily="'Courier New', monospace">const</text>
      <text x="40" y="42" fontSize="6" fill="#60A5FA" fontFamily="'Courier New', monospace">build</text>
      <text x="56" y="42" fontSize="6" fill="#E5E7EB" fontFamily="'Courier New', monospace">= ()</text>
      <text x="72" y="42" fontSize="6" fill="#C084FC" fontFamily="'Courier New', monospace">{'=>'}</text>

      {/* Code line 2 (typing animation via dashoffset) */}
      <text x="18" y="52" fontSize="6" fill="#64748B" fontFamily="'Courier New', monospace">2</text>
      <g>
        <rect x="26" y="47" width="56" height="7" fill="transparent" />
        <text x="30" y="52" fontSize="6" fill="#34D399" fontFamily="'Courier New', monospace">
          <tspan fill="#F472B6">return</tspan>
          <tspan fill="#E5E7EB"> </tspan>
          <tspan fill="#FBBF24">"✓ ready"</tspan>
          <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
        </text>
      </g>

      {/* Code line 3 */}
      <text x="18" y="62" fontSize="6" fill="#64748B" fontFamily="'Courier New', monospace">3</text>
      <text x="26" y="62" fontSize="6" fill="#E5E7EB" fontFamily="'Courier New', monospace">{'}'}</text>

      {/* Code line 4: blinking cursor */}
      <text x="18" y="72" fontSize="6" fill="#64748B" fontFamily="'Courier New', monospace">4</text>
      <text x="26" y="72" fontSize="6" fill="#60A5FA" fontFamily="'Courier New', monospace">{'>'}</text>
      <rect x="31" y="67" width="3" height="6" fill="#60A5FA">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="1s" repeatCount="indefinite" />
      </rect>

      {/* Scanning highlight sweep */}
      <rect x="12" y="30" width="76" height="3" fill="rgba(96,165,250,0.2)">
        <animate attributeName="y" values="30;80;30" dur="3.5s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

export function ToolsIcon({ size = 96 }: IconProps) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wrenchGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="screwGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <radialGradient id="sparkGlow" cx="0.5" cy="0.5">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="rgba(252,211,77,0)" />
        </radialGradient>
      </defs>

      {/* Outer glow */}
      <circle cx="0" cy="0" r="42" fill="rgba(52,211,153,0.08)" />

      {/* Rotating gear (background) */}
      <g opacity="0.55">
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="14s" repeatCount="indefinite" />
        {/* 8-tooth gear */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect key={a} x="-3" y="-34" width="6" height="8" rx="1" fill="#34D399" transform={`rotate(${a})`} />
        ))}
        <circle cx="0" cy="0" r="26" fill="rgba(16,185,129,0.18)" stroke="#34D399" strokeWidth="1.6" />
        <circle cx="0" cy="0" r="8" fill="none" stroke="#34D399" strokeWidth="1.4" />
      </g>

      {/* Crossed tools — gentle rock */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-4 0 0; 4 0 0; -4 0 0"
          dur="3s"
          repeatCount="indefinite"
        />

        {/* Screwdriver (behind, tilted ↘) */}
        <g transform="rotate(45)">
          {/* Blade */}
          <rect x="-1.4" y="-28" width="2.8" height="22" fill="#E5E7EB" stroke="#6B7280" strokeWidth="0.5" />
          {/* Tip */}
          <path d="M -1.4 -28 L 1.4 -28 L 0.8 -31 L -0.8 -31 Z" fill="#D1D5DB" />
          {/* Ferrule */}
          <rect x="-2.2" y="-8" width="4.4" height="3" fill="#9CA3AF" />
          {/* Handle */}
          <rect x="-4" y="-5" width="8" height="20" rx="1.5" fill="url(#screwGrad)" stroke="#1E3A8A" strokeWidth="0.6" />
          <rect x="-4" y="0" width="8" height="1" fill="rgba(0,0,0,0.25)" />
          <rect x="-4" y="4" width="8" height="1" fill="rgba(0,0,0,0.25)" />
          <rect x="-4" y="8" width="8" height="1" fill="rgba(0,0,0,0.25)" />
        </g>

        {/* Wrench (in front, tilted ↙) */}
        <g transform="rotate(-45)">
          {/* Handle */}
          <rect x="-2.6" y="-4" width="5.2" height="28" rx="1" fill="url(#wrenchGrad)" stroke="#065F46" strokeWidth="0.6" />
          {/* Grip lines */}
          <line x1="-2.6" y1="6" x2="2.6" y2="6" stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" />
          <line x1="-2.6" y1="11" x2="2.6" y2="11" stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" />
          <line x1="-2.6" y1="16" x2="2.6" y2="16" stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" />
          {/* Open jaw head */}
          <path d="M -7 -18 Q -7 -6 -2.6 -4 L 2.6 -4 Q 7 -6 7 -18 L 3 -16 L 3 -10 L -3 -10 L -3 -16 Z"
                fill="url(#wrenchGrad)" stroke="#065F46" strokeWidth="0.6" strokeLinejoin="round" />
        </g>
      </g>

      {/* Spark bursts near wrench jaw */}
      <g transform="rotate(-45) translate(0 -18)">
        <circle r="4" fill="url(#sparkGlow)">
          <animate attributeName="r" values="2;6;2" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <line x1="0" y1="-6" x2="0" y2="-10" stroke="#FCD34D" strokeWidth="1" strokeLinecap="round">
          <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite" />
        </line>
        <line x1="-5" y1="-2" x2="-8" y2="-3" stroke="#FCD34D" strokeWidth="1" strokeLinecap="round">
          <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
        </line>
        <line x1="5" y1="-2" x2="8" y2="-3" stroke="#FCD34D" strokeWidth="1" strokeLinecap="round">
          <animate attributeName="opacity" values="0;1;0" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Flying sparks */}
      <circle cx="-20" cy="-16" r="1" fill="#FCD34D">
        <animate attributeName="cx" values="-12;-28" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-12;-22" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="-14" r="0.9" fill="#FCD34D">
        <animate attributeName="cx" values="14;28" dur="1.3s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="cy" values="-10;-20" dur="1.3s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="1.3s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <circle cx="0" cy="-30" r="0.8" fill="#FEF3C7">
        <animate attributeName="cy" values="-26;-38" dur="1.6s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="1.6s" begin="0.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
