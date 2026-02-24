// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/posts',        label: 'Articles'   },
  { href: '/projects',     label: 'Projets'    },
  { href: '/solar-system', label: 'Espace'     },
  { href: '/sciences',     label: 'Sciences'   },
  { href: '/atoms',        label: 'Atomes'     },
  { href: '/about',        label: 'À propos'   },
  { href: '/contact',      label: 'Contact'    },
];

export default function Footer() {
  return (
    <footer
      className="relative z-10 mt-8 border-t"
      style={{
        borderColor: 'rgba(255,255,255,0.07)',
        background: 'rgba(2,8,23,0.80)',
        backdropFilter: 'blur(16px)',
        fontFamily: "'Exo 2', 'Space Grotesk', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">

        {/* Brand */}
        <Link href="/" className="inline-flex items-center gap-2 group shrink-0">
          <Image
            src="/marsu.png"
            alt="Logo"
            width={25}
            height={25}
            className="rounded opacity-70 group-hover:opacity-100 transition-opacity"
          />
          <span
            className="text-md font-bold"
            style={{
              background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Suri&apos;s Blog
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-gray-600 hover:text-gray-300 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right: copyright + GitHub */}
        <div className="flex items-center gap-3 shrink-0">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Hadrien Vinay
          </p>
          <Link
            href="https://github.com/hadrienvinay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </Link>
        </div>

      </div>
    </footer>
  );
}
