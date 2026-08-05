// Animated SVG icons for the "Univers à explorer" section.
// Uses SMIL (native SVG animation) — no JS runtime, works in server components.

export function SolarSystemIcon({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Orbit guides */}
      <circle cx="0" cy="0" r="17" fill="none" stroke="rgba(96,165,250,0.18)" strokeWidth="0.5" />
      <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(96,165,250,0.18)" strokeWidth="0.5" />
      <circle cx="0" cy="0" r="40" fill="none" stroke="rgba(96,165,250,0.18)" strokeWidth="0.5" />

      {/* Sun with soft glow */}
      <circle cx="0" cy="0" r="10" fill="rgba(252,211,77,0.18)" />
      <circle cx="0" cy="0" r="6" fill="#FCD34D">
        <animate attributeName="r" values="5.5;6.5;5.5" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Planet 1 (fast inner) */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="5s" repeatCount="indefinite" />
        <circle cx="17" cy="0" r="2" fill="#93C5FD" />
      </g>

      {/* Planet 2 (medium) */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="120 0 0" to="480 0 0" dur="10s" repeatCount="indefinite" />
        <circle cx="28" cy="0" r="2.6" fill="#60A5FA" />
      </g>

      {/* Planet 3 (slow outer, with ring) */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="240 0 0" to="600 0 0" dur="16s" repeatCount="indefinite" />
        <ellipse cx="40" cy="0" rx="5" ry="1.3" fill="none" stroke="rgba(147,197,253,0.5)" strokeWidth="0.6" />
        <circle cx="40" cy="0" r="3" fill="#3B82F6" />
      </g>
    </svg>
  );
}

export function TelescopeIcon({ size = 72 }: { size?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tubeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="45%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#5B21B6" />
        </linearGradient>
        <radialGradient id="lensGrad" cx="0.35" cy="0.35">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#6D28D9" />
        </radialGradient>
      </defs>

      {/* Ambient twinkling stars */}
      <circle cx="15" cy="18" r="0.8" fill="#E9D5FF">
        <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="85" cy="22" r="1" fill="#DDD6FE">
        <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="88" cy="44" r="0.7" fill="#E9D5FF">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="10" cy="45" r="0.6" fill="#C4B5FD">
        <animate attributeName="opacity" values="1;0.2;1" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="12" r="0.7" fill="#E9D5FF">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
      </circle>

      {/* Bright target star the scope tracks */}
      <g>
        <circle cx="50" cy="14" r="3.5" fill="rgba(245,243,255,0.25)">
          <animate attributeName="r" values="3;4.5;3" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="14" r="1.6" fill="#F5F3FF">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Tripod legs (splayed, with feet) */}
      <line x1="50" y1="74" x2="28" y2="94" stroke="#6D28D9" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="50" y1="74" x2="72" y2="94" stroke="#6D28D9" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="50" y1="74" x2="50" y2="95" stroke="#6D28D9" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="28" cy="94" r="1.3" fill="#5B21B6" />
      <circle cx="72" cy="94" r="1.3" fill="#5B21B6" />
      <circle cx="50" cy="95" r="1.3" fill="#5B21B6" />

      {/* Mount column + fork */}
      <rect x="47" y="62" width="6" height="14" rx="1" fill="#5B21B6" />
      <path d="M 43 64 Q 50 57 57 64" fill="none" stroke="#A78BFA" strokeWidth="1.8" strokeLinecap="round" />

      {/* Telescope assembly — pivots around the mount top (50, 62) */}
      <g transform="translate(50 62)">
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-70;-55;-70;-95;-70"
            dur="9s"
            repeatCount="indefinite"
          />

          {/* Main tube */}
          <rect x="-20" y="-5" width="40" height="10" rx="2" fill="url(#tubeGrad)" />
          {/* Decorative bands */}
          <rect x="-12" y="-5" width="1.5" height="10" fill="#5B21B6" opacity="0.7" />
          <rect x="6" y="-5" width="1.5" height="10" fill="#5B21B6" opacity="0.7" />

          {/* Aperture collar (front) */}
          <rect x="16" y="-6.5" width="5" height="13" rx="1" fill="#6D28D9" />
          {/* Objective lens */}
          <circle cx="20.5" cy="0" r="4" fill="url(#lensGrad)" />
          <circle cx="19" cy="-1.5" r="1" fill="#FFFFFF" opacity="0.85" />

          {/* Back cap */}
          <rect x="-22" y="-5" width="3.5" height="10" rx="1" fill="#5B21B6" />

          {/* Eyepiece (perpendicular stub) */}
          <rect x="-17" y="4" width="3" height="7" rx="0.5" fill="#5B21B6" />
          <rect x="-18" y="10" width="5" height="2.5" rx="0.5" fill="#A78BFA" />

          {/* Finder scope on top */}
          <rect x="-4" y="-11" width="14" height="3" rx="1" fill="#6D28D9" />
          <circle cx="10" cy="-9.5" r="1.8" fill="#F5F3FF" />
          <rect x="-5" y="-12" width="2" height="5" rx="0.4" fill="#5B21B6" />

          {/* Cradle / saddle attaching tube to mount */}
          <rect x="-3" y="-6" width="6" height="12" rx="1" fill="#6D28D9" />
          <rect x="-3.5" y="4" width="7" height="2" rx="0.5" fill="#5B21B6" />
        </g>
      </g>

      {/* Ground line */}
      <line x1="22" y1="97" x2="78" y2="97" stroke="rgba(167,139,250,0.25)" strokeWidth="0.8" strokeDasharray="2 2" />
    </svg>
  );
}

export function AtomIcon({ size = 72 }: { size?: number }) {
  const orbits = [
    { tilt: 0,    speed: 3 },
    { tilt: 60,   speed: 4.5 },
    { tilt: -60,  speed: 6 },
  ];
  return (
    <svg viewBox="-50 -50 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      {/* Outer glow */}
      <circle cx="0" cy="0" r="10" fill="rgba(52,211,153,0.15)" />

      {/* Nucleus (pulsing) */}
      <circle cx="0" cy="0" r="5" fill="#10B981">
        <animate attributeName="r" values="4.5;5.8;4.5" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="-1.5" cy="-1.5" r="1.5" fill="#6EE7B7" opacity="0.7" />

      {/* 3 orbits at different tilts */}
      {orbits.map(({ tilt, speed }) => (
        <g key={tilt} transform={`rotate(${tilt}) scale(1 0.38)`}>
          <circle
            cx="0"
            cy="0"
            r="38"
            fill="none"
            stroke="rgba(52,211,153,0.35)"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
          />
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 0 0"
              to="360 0 0"
              dur={`${speed}s`}
              repeatCount="indefinite"
            />
            <circle cx="38" cy="0" r="3.2" fill="#6EE7B7" />
          </g>
        </g>
      ))}
    </svg>
  );
}
