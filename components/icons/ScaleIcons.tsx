// components/ScaleIcons.tsx
// Simple line-style SVG icons for the /echelles page (Planck length -> observable universe).
// currentColor-based so they inherit the domain accent color passed via CSS `color`.

type IconProps = { size?: number };

export function PlanckIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="2" fill="currentColor" />
      <circle cx="16" cy="16" r="9" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.6" />
    </svg>
  );
}

export function QuarkIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="4" fill="currentColor" />
    </svg>
  );
}

export function NucleusIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="14" r="4.5" fill="currentColor" opacity="0.9" />
      <circle cx="19" cy="18" r="4.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function AtomIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.3" />
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.3" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="13" ry="5" stroke="currentColor" strokeWidth="1.3" transform="rotate(120 16 16)" />
    </svg>
  );
}

export function DnaIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 4 Q16 10 11 16 Q6 22 11 28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M21 4 Q16 10 21 16 Q26 22 21 28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M11.5 7H20.5M9.5 16H22.5M11.5 25H20.5" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
    </svg>
  );
}

export function VirusIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.3" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 16 + Math.cos(a) * 7, y1 = 16 + Math.sin(a) * 7;
        const x2 = 16 + Math.cos(a) * 11, y2 = 16 + Math.sin(a) * 11;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function CellIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="16" rx="12" ry="9" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="14" cy="15" r="3.4" fill="currentColor" opacity="0.85" />
      <circle cx="21" cy="19" r="1.4" fill="currentColor" opacity="0.6" />
      <circle cx="9" cy="19" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function AntIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="14" r="2.6" fill="currentColor" />
      <circle cx="16" cy="17" r="3.4" fill="currentColor" />
      <circle cx="23" cy="20" r="4" fill="currentColor" />
      <path d="M8 11 L5 8M8 11 L5 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M14 21 L11 26M16 22 L15 27M19 21 L21 26" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function HumanIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="7" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16 11 V20M16 14 L9 12M16 14 L23 12M16 20 L10 28M16 20 L22 28" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MountainIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 24 L12 10 L17 18 L21 12 L28 24 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M12 10 L14.5 14.5 L9.5 14.5 Z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

export function EarthIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 16H27M16 5C19 9 20.5 12.5 20.5 16C20.5 19.5 19 23 16 27M16 5C13 9 11.5 12.5 11.5 16C11.5 19.5 13 23 16 27"
        stroke="currentColor" strokeWidth="1" opacity="0.55" />
    </svg>
  );
}

export function SunIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="6.5" fill="currentColor" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = 16 + Math.cos(a) * 10, y1 = 16 + Math.sin(a) * 10;
        const x2 = 16 + Math.cos(a) * 14, y2 = 16 + Math.sin(a) * 14;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function LightRayIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3 L18 13 L28 16 L18 19 L16 29 L14 19 L4 16 L14 13 Z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

export function GalaxyDiskIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="2.6" fill="currentColor" />
      <path d="M16 16 C 21 13, 26 15, 25 20 C 24 24, 18 24, 16 21" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M16 16 C 11 19, 6 17, 7 12 C 8 8, 14 8, 16 11" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function SuperclusterIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="10" r="2" fill="currentColor" />
      <circle cx="22" cy="8" r="1.6" fill="currentColor" />
      <circle cx="24" cy="20" r="2.2" fill="currentColor" />
      <circle cx="11" cy="23" r="1.6" fill="currentColor" />
      <circle cx="16" cy="16" r="1.3" fill="currentColor" opacity="0.8" />
      <path d="M9 10 L16 16 L22 8M16 16 L24 20M16 16 L11 23" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

export function UniverseIcon({ size = 32 }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12.5" stroke="currentColor" strokeWidth="1.3" strokeDasharray="1.5 2.6" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
      <circle cx="10" cy="11" r="0.9" fill="currentColor" opacity="0.8" />
      <circle cx="22" cy="13" r="0.7" fill="currentColor" opacity="0.7" />
      <circle cx="20" cy="21" r="1" fill="currentColor" opacity="0.75" />
      <circle cx="11" cy="21" r="0.7" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
