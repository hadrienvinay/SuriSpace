// app/contact/page.tsx
import type { Metadata } from 'next';
import CreateMessageForm from '@/components/forms/addMessage';
import { IcoDish, IcoGlobeEarth } from '@/components/icons/SolarIcons';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Contactez Hadrien Vinay — ingénieur passionné d'aéronautique et d'espace, basé sur Arcachon. Email, téléphone ou formulaire.",
  keywords: ['contact', 'Hadrien Vinay', 'ingénieur aéronautique', 'Bordeaux', 'Arcachon'],
  openGraph: {
    title: 'Contact | Suri Space',
    description: "Envoyez un message à Hadrien Vinay — réponse sous 24h.",
    url: 'https://suri-space.vercel.app/contact',
  },
};

// Small inline icons matching the app's existing icon language (thin currentColor
// strokes, ~16px viewBox) — no equivalents for these three in SolarIcons yet.
function IcoMail({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M 2.5 4.5 L 8 9 L 13.5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcoPhone({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 3.5 2.5 C 3 4.5 3.5 8.5 6 11 C 8.5 13.5 11.5 14 13.5 12.5 L 12 10 C 11.5 10.5 10.5 10.5 9.5 9.5 C 8.5 8.5 8.5 7.5 9 7 L 6.5 3.5 C 5.5 2.5 4 2 3.5 2.5 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
function IcoLink({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M 6.5 9.5 L 9.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 8 4.5 L 9.5 3 A 2.6 2.6 0 0 1 13 6.5 L 11.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M 8 11.5 L 6.5 13 A 2.6 2.6 0 0 1 3 9.5 L 4.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const CONTACT_INFO = [
  {
    icon: IcoMail,
    label: 'Email',
    value: 'hadrien.vinay@yahoo.fr',
    href: 'mailto:hadrien.vinay@yahoo.fr',
    color: '#60A5FA',
  },
  {
    icon: IcoPhone,
    label: 'Téléphone',
    value: '+33 6 43 07 95 12',
    href: 'tel:+33643079512',
    color: '#34D399',
  },
  {
    icon: IcoLink,
    label: 'LinkedIn',
    value: 'linkedin.com/in/hadrien-vinay',
    href: 'https://www.linkedin.com/in/hadrien-vinay',
    color: '#A78BFA',
  },
  {
    icon: IcoGlobeEarth,
    label: 'Position',
    value: 'Arcachon → Bordeaux',
    color: '#FB923C',
  },
];

export default function Contact() {
  return (
    <div
      className="min-h-screen text-white relative z-10"
      style={{ fontFamily: "'Exo 2', 'Space Grotesk', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-16">

        {/* ── Console header ── */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full border font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ borderColor: 'rgba(96,165,250,0.3)', background: 'rgba(96,165,250,0.06)', color: '#93C5FD' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: '#5CE1E6' }} />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: '#5CE1E6' }} />
            </span>
            Canal de communication — actif
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Ouvrir une liaison
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            Une mission, une question technique, une opportunité ? Transmettez les coordonnées ci-dessous et je reviens vers vous sous 24h.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left — Telemetry panel */}
          <div className="lg:col-span-2">
            <div
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              {/* Panel label */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8">
                <span className="text-blue-300"><IcoDish size={14} /></span>
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-gray-500">Télémétrie</span>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  Actuellement basé sur <span className="text-white font-medium">Arcachon</span>,
                  je suis mobile sur la <span className="text-white font-medium">France</span>{' '}
                  pour travailler dans l&apos;industrie <span className="text-blue-300">aéronautique et spatiale</span>.
                </p>

                <div className="space-y-1">
                  {CONTACT_INFO.map((info, i) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.label}>
                        {i > 0 && <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />}
                        <div className="flex items-center gap-3.5 py-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${info.color}12`, border: `1px solid ${info.color}25`, color: info.color }}
                          >
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0 flex-1 flex items-baseline justify-between gap-3">
                            <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-gray-600 shrink-0">
                              {info.label}
                            </span>
                            {info.href ? (
                              <a
                                href={info.href}
                                target={info.href.startsWith('http') ? '_blank' : undefined}
                                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className="text-sm font-medium text-white hover:underline truncate text-right"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <span className="text-sm font-medium text-white truncate text-right">
                                {info.value}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status footer */}
              <div className="flex items-center gap-2 px-5 py-3 border-t border-white/8" style={{ background: 'rgba(96,165,250,0.03)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#34D399', boxShadow: '0 0 6px #34D399' }} />
                <span className="text-[11px] font-mono text-gray-500 tracking-wide">Signal nominal — réponse sous 24h</span>
              </div>
            </div>
          </div>

          {/* Right — Transmission form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-center gap-2 px-6 py-3 border-b border-white/8">
                <span className="text-violet-300 font-mono text-[13px]">▲</span>
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-gray-500">Transmission</span>
              </div>
              <div className="p-6 sm:p-8">
                <CreateMessageForm />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
