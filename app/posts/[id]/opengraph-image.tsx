import { ImageResponse } from 'next/og';
import prisma from '@/lib/prisma';

export const runtime = 'nodejs'; // needs Prisma
export const size    = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    select: { title: true, resume: true },
  });

  const title = post?.title ?? 'Article';
  const desc  = post?.resume ?? '';

  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: 'linear-gradient(135deg, #020817 0%, #0a1628 60%, #12082e 100%)',
      fontFamily: 'sans-serif', position: 'relative', overflow: 'hidden',
    }}>
      {/* Stars */}
      {[...Array(40)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', width: 1.5, height: 1.5, borderRadius: '50%',
          background: `rgba(255,255,255,${0.15 + ((i * 41) % 55) / 100})`,
          left: `${(i * 16.7) % 100}%`, top: `${(i * 13.3) % 100}%`,
        }} />
      ))}

      {/* Glow */}
      <div style={{ position: 'absolute', width: 600, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%)', right: -100, top: -50 }} />

      {/* Top accent bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #60A5FA, #A78BFA, #34D399)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '64px 80px' }}>
        {/* Article label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#A78BFA' }} />
          <span style={{ fontSize: 18, color: 'rgba(167,139,250,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Article · Suri Space
          </span>
        </div>

        {/* Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            fontSize: title.length > 40 ? 52 : 64, fontWeight: 800, lineHeight: 1.15,
            color: '#FFFFFF', maxWidth: 900,
          }}>
            {title}
          </div>
          {desc && (
            <div style={{ fontSize: 22, color: 'rgba(156,163,175,0.8)', maxWidth: 800, lineHeight: 1.5 }}>
              {desc.length > 120 ? desc.slice(0, 120) + '…' : desc}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 18, color: 'rgba(107,114,128,0.7)' }}>Hadrien Vinay</span>
          <span style={{ fontSize: 18, color: 'rgba(107,114,128,0.5)' }}>suri-space.vercel.app</span>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
