'use client';
// components/ScienceLayout.tsx

export default function ScienceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif", background: '#020817' }}
    >
      {/* Deep space background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 15% 40%, rgba(99,102,241,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 70%, rgba(168,85,247,0.10) 0%, transparent 50%), radial-gradient(ellipse at 50% 10%, rgba(34,211,238,0.06) 0%, transparent 40%)',
          }}
        />
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 5 === 0 ? 2.5 : 1.5,
              height: i % 5 === 0 ? 2.5 : 1.5,
              background: `rgba(255,255,255,${0.12 + ((i * 41) % 55) / 100})`,
              left: `${(i * 13.7) % 100}%`,
              top: `${(i * 7.3) % 100}%`,
              boxShadow: i % 7 === 0 ? '0 0 4px rgba(255,255,255,0.3)' : 'none',
            }}
          />
        ))}
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
