import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt     = 'Suri Space — Portfolio d\'Hadrien Vinay';
export const size    = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #020817 0%, #0a1628 60%, #12082e 100%)',
        fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Stars */}
      {[...Array(60)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 5 === 0 ? 3 : 1.5, height: i % 5 === 0 ? 3 : 1.5,
          borderRadius: '50%',
          background: `rgba(255,255,255,${0.2 + ((i * 37) % 60) / 100})`,
          left: `${(i * 17.3) % 100}%`,
          top:  `${(i * 11.7) % 100}%`,
        }} />
      ))}

      {/* Glow blobs */}
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)', left: -100, top: -100 }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)', right: -80, bottom: -80 }} />

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, padding: '0 80px', textAlign: 'center' }}>
        <div style={{ fontSize: 22, color: 'rgba(167,139,250,0.8)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
          suri-space.vercel.app
        </div>
        <div style={{
          fontSize: 72, fontWeight: 800, lineHeight: 1.1,
          background: 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #34D399 100%)',
          backgroundClip: 'text', color: 'transparent',
        }}>
          Suri&apos;s Blog
        </div>
        <div style={{ fontSize: 26, color: 'rgba(156,163,175,0.85)', maxWidth: 700, lineHeight: 1.5 }}>
          Espace · Sciences · Atomes · Nature · Projets
        </div>
        <div style={{ marginTop: 8, fontSize: 18, color: 'rgba(107,114,128,0.7)' }}>
          Hadrien Vinay — Ingénieur aéronautique
        </div>
      </div>
    </div>,
    { ...size }
  );
}
