'use client';
// components/AtomicLayout.tsx

export default function AtomicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen bg-[#050A18] text-white relative overflow-hidden"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif", background: '#020817' }}
    >
      {/* Starfield bg */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 space-background"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(30,58,138,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(88,28,135,0.12) 0%, transparent 50%)',
          }}
        />
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? 2.5 : 1.5,
              height: i % 5 === 0 ? 2.5 : 1.5,
              background: `rgba(255,255,255,${0.15 + ((i * 37) % 60) / 100})`,
              left: `${(i * 17.3) % 100}%`,
              top: `${(i * 11.7) % 100}%`,
              boxShadow: i % 6 === 0 ? '0 0 4px rgba(255,255,255,0.4)' : 'none',
            }}
          />
        ))}
        {/* Nebula glow */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #1D4ED8, transparent 70%)' }}
        />
        <div
          className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #DB2777, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
