'use client';

export default function NatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif", background: '#020C06' }}
    >
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Gradient blobs */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 15% 40%, rgba(20,83,45,0.25) 0%, transparent 55%), radial-gradient(ellipse at 85% 20%, rgba(5,150,105,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 90%, rgba(6,78,59,0.20) 0%, transparent 60%)',
          }}
        />

        {/* Floating particles (pollen / spores) */}
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i % 4 === 0 ? 3 : 1.5,
              height: i % 4 === 0 ? 3 : 1.5,
              background: `rgba(${i % 3 === 0 ? '134,239,172' : i % 3 === 1 ? '52,211,153' : '167,243,208'},${0.12 + ((i * 41) % 55) / 100})`,
              left: `${(i * 16.7) % 100}%`,
              top: `${(i * 13.3) % 100}%`,
              boxShadow: i % 7 === 0 ? '0 0 5px rgba(52,211,153,0.4)' : 'none',
            }}
          />
        ))}

        {/* Deep forest glow zones */}
        <div
          className="absolute top-1/3 left-1/5 w-96 h-96 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #065F46, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #14532D, transparent 70%)' }}
        />
        <div
          className="absolute top-2/3 left-2/3 w-64 h-64 rounded-full opacity-6"
          style={{ background: 'radial-gradient(circle, #064E3B, transparent 70%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
