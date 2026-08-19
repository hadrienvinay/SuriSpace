// Animated SVG icons for the /posts (Articles) page.
// Uses SMIL — no JS runtime.
// uid prop makes gradient IDs unique when the same icon renders twice on one page.

type IconProps = { size?: number; uid?: string };

export function QuillIcon({ size = 64, uid = 'q' }: IconProps) {
  const gId = `quillFeather-${uid}`;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
      </defs>

      {/* Paper */}
      <rect x="14" y="58" width="70" height="32" rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(167,139,250,0.35)" strokeWidth="0.8" />

      {/* Writing lines (drawn by quill) */}
      <line x1="22" y1="68" x2="62" y2="68" stroke="rgba(167,139,250,0.5)" strokeWidth="1" strokeLinecap="round" strokeDasharray="40" strokeDashoffset="40">
        <animate attributeName="stroke-dashoffset" values="40;0" dur="3s" begin="0s" repeatCount="indefinite" />
      </line>
      <line x1="22" y1="74" x2="70" y2="74" stroke="rgba(167,139,250,0.5)" strokeWidth="1" strokeLinecap="round" strokeDasharray="48" strokeDashoffset="48">
        <animate attributeName="stroke-dashoffset" values="48;0" dur="3s" begin="1s" repeatCount="indefinite" />
      </line>
      <line x1="22" y1="80" x2="56" y2="80" stroke="rgba(167,139,250,0.5)" strokeWidth="1" strokeLinecap="round" strokeDasharray="34" strokeDashoffset="34">
        <animate attributeName="stroke-dashoffset" values="34;0" dur="3s" begin="2s" repeatCount="indefinite" />
      </line>

      {/* Quill — gentle sway */}
      <g transform="translate(60 62)">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="-2 0 0; 2 0 0; -2 0 0"
          dur="3s"
          repeatCount="indefinite"
          additive="sum"
        />

        {/* Nib */}
        <path d="M 0 0 L -2 6 L 2 6 Z" fill="#1F2937" />
        <circle cx="0" cy="2" r="0.6" fill="#60A5FA" />

        {/* Shaft */}
        <line x1="0" y1="0" x2="-28" y2="-44" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" />

        {/* Feather vanes */}
        <path d="M -28 -44 Q -20 -42 -12 -38 Q -20 -34 -22 -28 Q -16 -26 -8 -22 Q -18 -20 -18 -12 Q -12 -10 -4 -4"
              fill={`url(#${gId})`} stroke="#4F46E5" strokeWidth="0.8" strokeLinejoin="round" opacity="0.9" />
        <path d="M -28 -44 Q -34 -38 -36 -32 Q -30 -32 -26 -30 Q -30 -26 -30 -20 Q -26 -20 -22 -18"
              fill={`url(#${gId})`} stroke="#4F46E5" strokeWidth="0.8" strokeLinejoin="round" opacity="0.7" />

        {/* Tip highlight */}
        <circle cx="-28" cy="-44" r="1.2" fill="#E0E7FF" />
      </g>

      {/* Ink droplet falling */}
      <circle cx="62" cy="68" r="1.2" fill="#6366F1">
        <animate attributeName="cy" values="64;90" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function BookIcon({ size = 64, uid = 'b' }: IconProps) {
  const pL = `pageL-${uid}`;
  const pR = `pageR-${uid}`;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={pL} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#F5F3FF" />
          <stop offset="100%" stopColor="#C7D2FE" />
        </linearGradient>
        <linearGradient id={pR} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C7D2FE" />
          <stop offset="100%" stopColor="#F5F3FF" />
        </linearGradient>
      </defs>

      {/* Outer glow */}
      <ellipse cx="50" cy="78" rx="36" ry="4" fill="rgba(96,165,250,0.18)" />

      {/* Left page (static) */}
      <path d="M 12 30 L 50 34 L 50 80 L 12 76 Z" fill={`url(#${pL})`} stroke="#818CF8" strokeWidth="0.8" strokeLinejoin="round" />
      <line x1="18" y1="42" x2="46" y2="44" stroke="#A5B4FC" strokeWidth="0.7" />
      <line x1="18" y1="48" x2="44" y2="50" stroke="#A5B4FC" strokeWidth="0.7" />
      <line x1="18" y1="54" x2="46" y2="56" stroke="#A5B4FC" strokeWidth="0.7" />
      <line x1="18" y1="60" x2="42" y2="62" stroke="#A5B4FC" strokeWidth="0.7" />
      <line x1="18" y1="66" x2="44" y2="68" stroke="#A5B4FC" strokeWidth="0.7" />

      {/* Right page (static back) */}
      <path d="M 50 34 L 88 30 L 88 76 L 50 80 Z" fill={`url(#${pR})`} stroke="#818CF8" strokeWidth="0.8" strokeLinejoin="round" />
      <line x1="54" y1="44" x2="82" y2="42" stroke="#A5B4FC" strokeWidth="0.7" />
      <line x1="54" y1="50" x2="80" y2="48" stroke="#A5B4FC" strokeWidth="0.7" />
      <line x1="54" y1="56" x2="82" y2="54" stroke="#A5B4FC" strokeWidth="0.7" />
      <line x1="54" y1="62" x2="78" y2="60" stroke="#A5B4FC" strokeWidth="0.7" />
      <line x1="54" y1="68" x2="80" y2="66" stroke="#A5B4FC" strokeWidth="0.7" />

      {/* Spine */}
      <line x1="50" y1="34" x2="50" y2="80" stroke="#4F46E5" strokeWidth="1.4" />

      {/* Turning page */}
      <path d="M 50 34 L 86 30 L 86 76 L 50 80 Z" fill={`url(#${pR})`} stroke="#818CF8" strokeWidth="0.8" strokeLinejoin="round" opacity="0.95">
        <animate attributeName="d"
          values="M 50 34 L 86 30 L 86 76 L 50 80 Z;
                  M 50 34 L 68 18 L 68 64 L 50 80 Z;
                  M 50 34 L 14 30 L 14 76 L 50 80 Z;
                  M 50 34 L 86 30 L 86 76 L 50 80 Z"
          dur="4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.95;0.75;0.95;0.95" dur="4s" repeatCount="indefinite" />
      </path>

      {/* Floating letters */}
      <text x="28" y="26" fontSize="7" fill="#A78BFA" fontFamily="'Times New Roman', serif" fontStyle="italic">
        A
        <animate attributeName="y" values="26;18;26" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
      </text>
      <text x="64" y="24" fontSize="6" fill="#60A5FA" fontFamily="'Times New Roman', serif" fontStyle="italic">
        b
        <animate attributeName="y" values="24;16;24" dur="3.4s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;1;0.3" dur="3.4s" begin="0.6s" repeatCount="indefinite" />
      </text>
      <text x="46" y="18" fontSize="7" fill="#C4B5FD" fontFamily="'Times New Roman', serif" fontStyle="italic">
        c
        <animate attributeName="y" values="18;10;18" dur="3.2s" begin="1.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;1;0.3" dur="3.2s" begin="1.2s" repeatCount="indefinite" />
      </text>

      {/* Bookmark ribbon */}
      <path d="M 70 34 L 70 56 L 74 52 L 78 56 L 78 33" fill="#F472B6" stroke="#BE185D" strokeWidth="0.6" />
    </svg>
  );
}
