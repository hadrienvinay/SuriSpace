// components/SolarBodyIcons.tsx
// Visual icons for CelestialBody (colored sphere) and Mission (type-based SVG)
import { IcoDish, IcoFlyby, IcoOrbiter, IcoLander, IcoRover, IcoSampleReturn, IcoAstronaut, IcoShootingStar, IcoSunStar } from '@/components/SolarIcons';
import { RocketIcon } from '@/components/SpaceIcons';
import { TelescopeIcon } from '@/components/UniverseIcons';

// ── Celestial body — gradient sphere using body.color ─────────────────────────
export function BodyIcon({ color, size = 28 }: { color: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 33% 33%, ${color}ee 0%, ${color}88 55%, ${color}33 100%)`,
        boxShadow: `0 0 ${Math.round(size * 0.35)}px ${color}55`,
        flexShrink: 0,
      }}
    />
  );
}

// ── Mission — icon based on mission type ──────────────────────────────────────
type IconFn = (p: { size?: number }) => React.JSX.Element;

const MISSION_TYPE_ICONS: Record<string, IconFn> = {
  flyby:           IcoFlyby,
  orbiter:         IcoOrbiter,
  lander:          IcoLander,
  rover:           IcoRover,
  probe:           IcoDish,
  'sample-return': IcoSampleReturn,
  crewed:          IcoAstronaut,
};

// Special-case overrides by name keywords (fallback to type)
export function MissionIcon({ type, name, size = 22, color }: { type: string; name?: string; size?: number; color?: string }) {
  // Detect special types by name
  if (name) {
    const n = name.toLowerCase();
    if (n.includes('telescope') || n.includes('hubble') || n.includes('jwst') || n.includes('kepler') || n.includes('spitzer') || n.includes('chandra') || n.includes('tess')) {
      return <span style={{ color: color ?? 'currentColor' }}><TelescopeIcon size={size} /></span>;
    }
    if (n.includes('solar') || n.includes('helios') || n.includes('ulysses') || n.includes('parker')) {
      return <span style={{ color: color ?? 'currentColor' }}><IcoSunStar size={size} /></span>;
    }
    if (n.includes('comet') || n.includes('stardust') || n.includes('deep impact') || n.includes('rosetta') || n.includes('hyabusa')) {
      return <span style={{ color: color ?? 'currentColor' }}><IcoShootingStar size={size} /></span>;
    }
    if (n.includes('apollo') || n.includes('artemis') || n.includes('crew') || n.includes('soyuz') || n.includes('orion') || n.includes('falcon')) {
      return <span style={{ color: color ?? 'currentColor' }}><RocketIcon size={size} /></span>;
    }
  }

  const Icon = MISSION_TYPE_ICONS[type] ?? IcoDish;
  return <span style={{ color: color ?? 'currentColor' }}><Icon size={size} /></span>;
}
