// app/contact/page.tsx
import type { Metadata } from 'next';
import CreateMessageForm from '@/components/forms/addMessage';

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

const CONTACT_INFO = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'hadrien.vinay@yahoo.fr',
    href: 'mailto:hadrien.vinay@yahoo.fr',
    color: '#60A5FA',
  },
  {
    icon: '📱',
    label: 'Téléphone',
    value: '+33 6 43 07 95 12',
    href: 'tel:+33643079512',
    color: '#34D399',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'linkedin.com/in/hadrien-vinay',
    href: 'https://www.linkedin.com/in/hadrien-vinay',
    color: '#A78BFA',
  },
  {
    icon: '📍',
    label: 'Localisation',
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
      <div className="max-w-6xl mx-auto px-4 py-16 sm:py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            Discutons ensemble
          </h1>
          <p className="text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
            Une question, un projet, une opportunité ? N&apos;hésitez pas à me contacter 
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left — Contact info */}
          <div className="lg:col-span-2 space-y-4">

            {/* About block */}
            <div
              className="rounded-2xl border border-white/8 p-6"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <p className="text-sm text-gray-400 leading-relaxed">
                Actuellement basé sur <span className="text-white font-medium">Arcachon</span>,
                je suis mobile sur la <span className="text-white font-medium">France</span>{' '}
                pour travailler dans l&apos;industrie <span className="text-blue-300">aéronautique et spatiale</span>.
              </p>
            </div>

            {/* Contact cards */}
            {CONTACT_INFO.map(info => (
              <div
                key={info.label}
                className="rounded-2xl border border-white/8 p-4 flex items-center gap-4 transition-all duration-200 hover:border-white/15"
                style={{ background: `${info.color}06` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${info.color}15`, border: `1px solid ${info.color}25` }}
                >
                  {info.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: `${info.color}90` }}>
                    {info.label}
                  </div>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm font-medium text-white hover:underline truncate block"
                      style={{ color: info.color }}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-sm font-medium" style={{ color: info.color }}>
                      {info.value}
                    </span>
                  )}
                </div>
              </div>
            ))}

          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl border border-white/8 p-6 sm:p-8"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <h2
                className="text-lg font-bold text-white mb-6"
                style={{ fontFamily: "'Exo 2', sans-serif" }}
              >
                Envoyer un message
              </h2>
              <CreateMessageForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
